// pet.js — 养成系统
const PetCare = (() => {
  let currentPetId = null;
  let animFrame = 0;
  let currentAnim = 'idle';
  let animTimer = null;
  let quoteTimer = null;

  // 等级经验表
  const LEVEL_TABLE = [
    0,    // Lv1
    50,   // Lv2 (快速体验升级)
    100,  // Lv3
    180,  // Lv4
    280,  // Lv5
    420,  // Lv6
    600,  // Lv7
    850,  // Lv8
    1150, // Lv9
    1500, // Lv10
    2000, // Lv11
    2600, // Lv12
    3400, // Lv13
    4400, // Lv14
    5600, // Lv15
  ];

  // 升级解锁奖励
  const LEVEL_REWARDS = {
    2:  { items: ['bib_blue', 'bib_yellow'], label: '口水巾（蓝色、黄色）' },
    3:  { items: ['bow'], label: '小蝴蝶结' },
    4:  { action: 'pat', label: '新互动：摸头头' },
    5:  { items: ['hairpin_flower', 'hairpin_star', 'hairpin_heart', 'hairpin_ribbon', 'hairpin_crown_mini'], label: '发卡（5款）' },
    6:  { items: ['scarf'], label: '小围巾' },
    7:  { action: 'walk', label: '新互动：散步' },
    8:  { items: ['sunglasses', 'hat'], label: '墨镜 / 小帽子' },
    9:  { items: ['cheer_banner'], label: '应援手幅' },
    10: { items: ['crown'], label: '换装系统解锁！' },
    11: { items: ['glowstick', 'microphone'], label: '荧光棒 / 麦克风' },
    12: { items: ['crown', 'veil'], label: '皇冠 / 头纱' },
    13: { items: ['wings'], label: '翅膀特效' },
    14: { items: ['stage_bg'], label: '舞台背景' },
    15: { items: ['legend_stick'], label: '传说称号 + 传说应援棒' },
  };

  // 互动定义
  const INTERACTIONS = {
    feed:  { exp: 35, hunger: 30, mood: 5, energy: 0, cooldown: 5 * 60 * 1000, maxBurst: 2, label: '喂食', anim: 'eat', sound: 'playEat', unlockedAt: 1 },
    play:  { exp: 35, hunger: -10, mood: 20, energy: -15, cooldown: 10 * 60 * 1000, label: '玩耍', anim: 'play', sound: 'playPlay', unlockedAt: 1 },
    rest:  { exp: 5, hunger: 0, mood: 5, energy: 25, cooldown: 0, label: '休息', anim: 'idle', sound: 'playRest', unlockedAt: 1 },
    poke:  { exp: 15, hunger: 0, mood: 10, energy: 0, cooldown: 3 * 60 * 1000, label: '逗一逗', anim: 'happy', sound: 'playSelect', unlockedAt: 1 },
    sleep: { exp: 40, hunger: 0, mood: 10, energy: 50, cooldown: 1 * 60 * 60 * 1000, label: '睡觉', anim: 'sleep', sound: 'playSleep', unlockedAt: 1 },
    pat:   { exp: 25, hunger: 0, mood: 15, energy: 0, cooldown: 5 * 60 * 1000, label: '摸头头', anim: 'happy', sound: 'playPat', unlockedAt: 4 },
    walk:  { exp: 50, hunger: -5, mood: 15, energy: -10, cooldown: 15 * 60 * 1000, label: '散步', anim: 'happy', sound: 'playWalk', unlockedAt: 7 },
  };

  function getPet() {
    if (!currentPetId) return null;
    const pets = Storage.getPets();
    return pets.find(p => p.id === currentPetId) || null;
  }

  function updatePetStats(pet) {
    const now = Date.now();
    const elapsed = now - (pet.lastInteraction || now);
    const hours = elapsed / (1000 * 60 * 60);

    // 状态衰减
    pet.hunger = Math.max(0, pet.hunger - hours * 5);
    pet.mood = Math.max(0, pet.mood - hours * 2.5);
    pet.energy = Math.min(100, pet.energy + hours * 3);

    // 饥饿影响心情
    if (pet.hunger <= 0) {
      pet.mood = Math.max(0, pet.mood - hours * 3);
    }

    pet.lastInteraction = now;
    Storage.updatePet(pet.id, pet);
    return pet;
  }

  function interact(actionId) {
    const pet = getPet();
    if (!pet) return;
    const action = INTERACTIONS[actionId];
    if (!action) return;

    // 等级检查
    if (pet.level < action.unlockedAt) {
      showToast(`Lv.${action.unlockedAt} 解锁此互动`);
      Audio8Bit.playError();
      return;
    }

    // 冷却检查（支持连续使用次数）
    const cooldownKey = 'last' + actionId.charAt(0).toUpperCase() + actionId.slice(1);
    const burstKey = actionId + 'Burst';
    if (action.cooldown > 0) {
      if (action.maxBurst) {
        // 连续使用机制：用完 maxBurst 次后进入冷却
        const burstCount = pet[burstKey] || 0;
        if (burstCount >= action.maxBurst && pet[cooldownKey]) {
          const remaining = action.cooldown - (Date.now() - pet[cooldownKey]);
          if (remaining > 0) {
            const mins = Math.ceil(remaining / 60000);
            showToast(`还需等待 ${mins} 分钟`);
            Audio8Bit.playError();
            return;
          }
          // 冷却结束，重置计数
          pet[burstKey] = 0;
        }
      } else if (pet[cooldownKey]) {
        const remaining = action.cooldown - (Date.now() - pet[cooldownKey]);
        if (remaining > 0) {
          const mins = Math.ceil(remaining / 60000);
          showToast(`还需等待 ${mins} 分钟`);
          Audio8Bit.playError();
          return;
        }
      }
    }

    // 体力检查
    if (action.energy < 0 && pet.energy < Math.abs(action.energy)) {
      showToast('体力不足，先休息一下吧~');
      Audio8Bit.playError();
      return;
    }

    // 执行互动
    const moodBonus = pet.mood >= 90 ? 1.5 : 1.0;
    const expGain = Math.round(action.exp * moodBonus);

    pet.hunger = Math.min(100, Math.max(0, pet.hunger + action.hunger));
    pet.mood = Math.min(100, Math.max(0, pet.mood + action.mood));
    pet.energy = Math.min(100, Math.max(0, pet.energy + action.energy));
    pet.exp += expGain;
    // 更新冷却和连续使用计数
    if (action.maxBurst) {
      pet[burstKey] = (pet[burstKey] || 0) + 1;
      if (pet[burstKey] >= action.maxBurst) {
        pet[cooldownKey] = Date.now(); // 用完次数才开始冷却
      }
    } else {
      pet[cooldownKey] = Date.now();
    }
    pet.lastInteraction = Date.now();

    // 播放音效和动画
    if (Audio8Bit[action.sound]) Audio8Bit[action.sound]();
    playAnimation(action.anim, 2000);

    // 显示语录
    Quotes.showInteractionQuote(actionId, pet);

    // 检查升级
    checkLevelUp(pet, expGain);

    Storage.updatePet(pet.id, pet);
    renderCareUI();
  }

  function checkLevelUp(pet, expGain) {
    if (pet.level >= 15) return;

    const nextLevelExp = LEVEL_TABLE[pet.level];
    if (pet.exp >= nextLevelExp) {
      pet.level++;
      pet.exp -= nextLevelExp;
      Audio8Bit.playLevelUp();

      const reward = LEVEL_REWARDS[pet.level];
      let rewardMsg = `升级到 Lv.${pet.level}！`;
      if (reward) {
        if (reward.items) {
          reward.items.forEach(item => {
            if (!pet.unlockedItems.includes(item)) {
              pet.unlockedItems.push(item);
            }
          });
          Audio8Bit.playUnlock();
          rewardMsg += `\n解锁：${reward.label}`;
        }
        if (reward.action) {
          rewardMsg += `\n${reward.label}`;
        }
      }

      setTimeout(() => showModal(rewardMsg), 500);

      // 递归检查是否连续升级
      if (pet.exp >= (LEVEL_TABLE[pet.level] || Infinity)) {
        checkLevelUp(pet, 0);
      }
    }
  }

  function playAnimation(anim, duration) {
    currentAnim = anim;
    setTimeout(() => {
      currentAnim = 'idle';
    }, duration);
  }

  function load(petId) {
    currentPetId = petId;
    let pet = getPet();
    if (!pet) return;
    pet = updatePetStats(pet);
    startAnimLoop();
    startQuoteLoop();
    renderCareUI();
  }

  function unload() {
    if (animTimer) cancelAnimationFrame(animTimer);
    if (quoteTimer) clearInterval(quoteTimer);
    animTimer = null;
    quoteTimer = null;
    currentPetId = null;
  }

  function startAnimLoop() {
    if (animTimer) cancelAnimationFrame(animTimer);
    function loop() {
      animFrame++;
      const pet = getPet();
      if (!pet) return;
      const canvas = document.getElementById('pet-canvas');
      if (canvas) {
        // 根据状态自动切换动画
        let anim = currentAnim;
        if (anim === 'idle' && pet.mood < 20) anim = 'sad';
        PixelRenderer.drawAnimal(canvas, pet.animalId, pet.level, anim, animFrame, pet.equippedItems);
      }
      animTimer = requestAnimationFrame(loop);
    }
    loop();
  }

  function startQuoteLoop() {
    if (quoteTimer) clearInterval(quoteTimer);
    quoteTimer = setInterval(() => {
      const pet = getPet();
      if (pet && currentAnim === 'idle') {
        Quotes.showRandomQuote(pet);
      }
    }, 30000);
  }

  function renderCareUI() {
    const pet = getPet();
    if (!pet) return;
    const animal = getAnimalById(pet.animalId);
    const container = document.getElementById('page-care');
    const stage = PixelRenderer.getStageFromLevel(pet.level);
    const stageNames = ['宝宝期', '成长期', '成熟期', '明星期', '传说期'];
    const nextExp = pet.level < 15 ? LEVEL_TABLE[pet.level] : 0;
    const expPercent = pet.level < 15 ? Math.round((pet.exp / nextExp) * 100) : 100;

    let actionsHtml = '';
    Object.entries(INTERACTIONS).forEach(([id, action]) => {
      const locked = pet.level < action.unlockedAt;
      const cls = locked ? 'action-btn locked' : 'action-btn';
      const lockLabel = locked ? ` (Lv.${action.unlockedAt})` : '';
      actionsHtml += `<button class="${cls}" data-action="${id}" ${locked ? 'disabled' : ''}>${action.label}${lockLabel}</button>`;
    });

    container.innerHTML = `
      <div class="care-page">
        <div class="care-top-bar">
          <button class="back-btn" id="care-back">←</button>
          <div class="pet-name-display">${pet.nickname}</div>
          <div class="care-top-right">
            <button class="icon-btn" id="care-inventory" title="换装">🎒</button>
            <button class="icon-btn" id="care-share" title="分享">📷</button>
            <button class="icon-btn" id="care-release" title="放生">🏠</button>
          </div>
        </div>

        <div class="care-canvas-area">
          <canvas id="pet-canvas" width="192" height="192"></canvas>
          <div class="quote-bubble" id="quote-bubble" style="display:none"></div>
        </div>

        <div class="care-info">
          <div class="care-level">
            <span class="level-text">Lv.${pet.level}</span>
            <span class="stage-text">${stageNames[stage - 1]}</span>
            <span class="animal-type">${animal.name}</span>
          </div>
          <div class="exp-bar">
            <div class="exp-fill" style="width:${expPercent}%"></div>
            <span class="exp-text">${pet.level < 15 ? `${pet.exp}/${nextExp}` : 'MAX'}</span>
          </div>
        </div>

        <div class="status-bars">
          <div class="status-row">
            <span class="status-label">饱食度</span>
            <div class="status-bar"><div class="status-fill hunger" style="width:${pet.hunger}%"></div></div>
            <span class="status-val">${Math.round(pet.hunger)}</span>
          </div>
          <div class="status-row">
            <span class="status-label">心情</span>
            <div class="status-bar"><div class="status-fill mood" style="width:${pet.mood}%"></div></div>
            <span class="status-val">${Math.round(pet.mood)}</span>
          </div>
          <div class="status-row">
            <span class="status-label">体力</span>
            <div class="status-bar"><div class="status-fill energy" style="width:${pet.energy}%"></div></div>
            <span class="status-val">${Math.round(pet.energy)}</span>
          </div>
        </div>

        ${pet.mood >= 90 ? '<div class="mood-bonus">心情满值！经验 x1.5</div>' : ''}

        <div class="action-buttons">${actionsHtml}</div>
      </div>`;

    // 事件绑定
    container.querySelectorAll('.action-btn:not(.locked)').forEach(btn => {
      btn.addEventListener('click', () => interact(btn.dataset.action));
    });

    container.querySelector('#care-back').addEventListener('click', () => {
      Audio8Bit.playClick();
      unload();
      showPage('shelter');
      Shelter.render();
    });

    container.querySelector('#care-inventory').addEventListener('click', () => {
      Audio8Bit.playClick();
      showPage('inventory');
      Inventory.render(currentPetId);
    });

    container.querySelector('#care-share').addEventListener('click', () => {
      Audio8Bit.playClick();
      ShareCard.generate(currentPetId);
    });

    container.querySelector('#care-release').addEventListener('click', () => {
      Audio8Bit.playClick();
      showConfirm(`确定要放生「${pet.nickname}」吗？\n放生后将无法恢复！`, () => {
        Storage.deletePet(currentPetId);
        unload();
        showPage('shelter');
        Shelter.render();
        showToast('已放生，希望它在大自然过得开心~');
      });
    });
  }

  return { load, unload, renderCareUI, getPet: () => getPet(), getCurrentPetId: () => currentPetId };
})();

// Toast 提示
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Modal 弹窗
function showModal(msg) {
  let overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal-box"><div class="modal-content" id="modal-content"></div><button class="pixel-btn modal-close" id="modal-close">好的！</button></div>`;
    document.body.appendChild(overlay);
  }
  document.getElementById('modal-content').textContent = msg;
  overlay.style.display = 'flex';
  document.getElementById('modal-close').onclick = () => {
    overlay.style.display = 'none';
  };
}

// 确认弹窗（带取消按钮）
function showConfirm(msg, onConfirm) {
  let overlay = document.getElementById('confirm-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'confirm-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `<div class="modal-box"><div class="modal-content" id="confirm-content"></div><div class="confirm-buttons"><button class="pixel-btn confirm-yes" id="confirm-yes">确定放生</button><button class="pixel-btn modal-close" id="confirm-no">再想想</button></div></div>`;
    document.body.appendChild(overlay);
  }
  document.getElementById('confirm-content').textContent = msg;
  overlay.style.display = 'flex';
  document.getElementById('confirm-yes').onclick = () => {
    overlay.style.display = 'none';
    onConfirm();
  };
  document.getElementById('confirm-no').onclick = () => {
    overlay.style.display = 'none';
  };
}
