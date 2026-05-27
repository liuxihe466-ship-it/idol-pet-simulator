// checkin.js — 签到系统
const Checkin = (() => {
  const MILESTONES = [
    { days: 2, stars: 15, label: '连续2天：+15星星币' },
    { days: 5, stars: 40, item: 'rainbow_scarf', label: '连续5天：七日彩虹围巾 +40星星币' },
    { days: 10, stars: 60, item: 'star_headband', label: '连续10天：星星发箍 +60星星币' },
    { days: 20, stars: 100, item: 'legend_stick', label: '连续20天：传说应援棒 +100星星币' },
  ];

  const SLOT_COSTS = [0, 20, 50, 100, 180]; // 1-5号槽位

  function getToday() {
    return new Date().toISOString().split('T')[0];
  }

  function doCheckin() {
    const data = Storage.getCheckin();
    const today = getToday();

    if (data.lastCheckin === today) {
      showToast('今天已经签到过了~');
      Audio8Bit.playError();
      return false;
    }

    // 判断是否连续
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (data.lastCheckin === yesterdayStr) {
      data.consecutiveDays++;
    } else {
      data.consecutiveDays = 1;
    }

    data.lastCheckin = today;
    if (!data.history.includes(today)) {
      data.history.push(today);
    }

    // 基础奖励
    data.totalStars += 15;
    let bonusMsg = '签到成功！+15星星币';

    // 给当前选中的宠物加经验
    const pets = Storage.getPets();
    if (pets.length > 0) {
      const pet = pets[0]; // 默认第一只
      pet.exp += 50;
      Storage.updatePet(pet.id, { exp: pet.exp });
      bonusMsg += ' +50经验';
    }

    // 里程碑检查
    MILESTONES.forEach(m => {
      if (data.consecutiveDays === m.days) {
        data.totalStars += m.stars;
        bonusMsg += `\n${m.label}`;
        if (m.item) {
          if (!data.unlockedRewards) data.unlockedRewards = [];
          if (!data.unlockedRewards.includes(m.item)) {
            data.unlockedRewards.push(m.item);
            // 给所有宠物解锁此装饰
            pets.forEach(pet => {
              if (!pet.unlockedItems) pet.unlockedItems = [];
              if (!pet.unlockedItems.includes(m.item)) {
                pet.unlockedItems.push(m.item);
                Storage.updatePet(pet.id, { unlockedItems: pet.unlockedItems });
              }
            });
          }
        }
      }
    });

    Storage.saveCheckin(data);
    Audio8Bit.playCheckin();
    showModal(bonusMsg);
    return true;
  }

  function canUnlockSlot(slotIndex) {
    const data = Storage.getCheckin();
    const cost = SLOT_COSTS[slotIndex] || 999999;
    return data.totalStars >= cost;
  }

  function unlockSlot(slotIndex) {
    const data = Storage.getCheckin();
    const cost = SLOT_COSTS[slotIndex];
    if (data.totalStars < cost) {
      showToast(`需要 ${cost} 星星币`);
      Audio8Bit.playError();
      return false;
    }
    data.totalStars -= cost;
    Storage.saveCheckin(data);
    Storage.saveUnlockedSlots(slotIndex + 1);
    Audio8Bit.playUnlock();
    showToast('槽位解锁成功！');
    return true;
  }

  function renderProfile(container) {
    const data = Storage.getCheckin();
    const today = getToday();
    const checkedToday = data.lastCheckin === today;
    const totalDays = data.history.length;

    // 生成日历
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let calHtml = '<div class="cal-grid">';
    const dayLabels = ['日', '一', '二', '三', '四', '五', '六'];
    dayLabels.forEach(d => { calHtml += `<div class="cal-header">${d}</div>`; });

    for (let i = 0; i < firstDay; i++) {
      calHtml += '<div class="cal-empty"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const checked = data.history.includes(dateStr);
      const isToday = d === now.getDate();
      const cls = `cal-day ${checked ? 'checked' : ''} ${isToday ? 'today' : ''}`;
      calHtml += `<div class="${cls}">${d}</div>`;
    }
    calHtml += '</div>';

    // 里程碑进度
    let milestoneHtml = '';
    MILESTONES.forEach(m => {
      const achieved = data.consecutiveDays >= m.days;
      milestoneHtml += `<div class="milestone ${achieved ? 'achieved' : ''}">
        <span class="milestone-days">${m.days}天</span>
        <span class="milestone-label">${m.label}</span>
        ${achieved ? '<span class="milestone-check">✓</span>' : ''}
      </div>`;
    });

    container.innerHTML = `
      <div class="profile-page">
        <div class="care-top-bar">
          <button class="back-btn" id="profile-back">←</button>
          <div class="pet-name-display">档案</div>
        </div>

        <div class="profile-section">
          <h3 class="section-title">每日签到</h3>
          <div class="checkin-info">
            <div class="checkin-stat">
              <span class="stat-value">${totalDays}</span>
              <span class="stat-label">总签到</span>
            </div>
            <div class="checkin-stat">
              <span class="stat-value">${data.consecutiveDays}</span>
              <span class="stat-label">连续天数</span>
            </div>
            <div class="checkin-stat">
              <span class="stat-value">${data.totalStars}</span>
              <span class="stat-label">星星币</span>
            </div>
          </div>
          <button class="pixel-btn checkin-btn ${checkedToday ? 'disabled' : ''}" id="do-checkin" ${checkedToday ? 'disabled' : ''}>
            ${checkedToday ? '今日已签到 ✓' : '签到领奖！'}
          </button>
        </div>

        <div class="profile-section">
          <h3 class="section-title">本月日历</h3>
          ${calHtml}
        </div>

        <div class="profile-section">
          <h3 class="section-title">连续签到奖励</h3>
          <div class="milestones">${milestoneHtml}</div>
        </div>
      </div>`;

    container.querySelector('#profile-back').addEventListener('click', () => {
      Audio8Bit.playClick();
      showPage('shelter');
      Shelter.render();
    });

    const checkinBtn = container.querySelector('#do-checkin');
    if (!checkedToday) {
      checkinBtn.addEventListener('click', () => {
        doCheckin();
        renderProfile(container);
      });
    }
  }

  return { doCheckin, canUnlockSlot, unlockSlot, renderProfile, SLOT_COSTS };
})();
