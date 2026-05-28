// inventory.js — 背包与换装系统
const Inventory = (() => {
  const ALL_ITEMS = [
    { id: 'bib_pink', name: '粉色口水巾', type: 'neck', unlockLevel: 1 },
    { id: 'bib_blue', name: '蓝色口水巾', type: 'neck', unlockLevel: 2 },
    { id: 'bib_yellow', name: '黄色口水巾', type: 'neck', unlockLevel: 2 },
    { id: 'bib_purple', name: '紫色口水巾', type: 'neck', unlockLevel: 2 },
    { id: 'bow', name: '小蝴蝶结', type: 'head', unlockLevel: 3 },
    { id: 'hairpin_flower', name: '花朵发卡', type: 'head', unlockLevel: 5 },
    { id: 'hairpin_star', name: '星星发卡', type: 'head', unlockLevel: 5 },
    { id: 'hairpin_heart', name: '爱心发卡', type: 'head', unlockLevel: 5 },
    { id: 'hairpin_ribbon', name: '缎带发卡', type: 'head', unlockLevel: 5 },
    { id: 'hairpin_crown_mini', name: '迷你皇冠卡', type: 'head', unlockLevel: 5 },
    { id: 'scarf', name: '小围巾', type: 'neck', unlockLevel: 6 },
    { id: 'sunglasses', name: '墨镜', type: 'face', unlockLevel: 8 },
    { id: 'hat', name: '小帽子', type: 'head', unlockLevel: 8 },
    { id: 'cheer_banner', name: '应援手幅', type: 'hand', unlockLevel: 9 },
    { id: 'crown', name: '皇冠', type: 'head', unlockLevel: 12 },
    { id: 'veil', name: '头纱', type: 'head', unlockLevel: 12 },
    { id: 'glowstick', name: '荧光棒', type: 'hand', unlockLevel: 11 },
    { id: 'microphone', name: '麦克风', type: 'hand', unlockLevel: 11 },
    { id: 'wings', name: '翅膀', type: 'back', unlockLevel: 13 },
    { id: 'stage_bg', name: '舞台背景', type: 'bg', unlockLevel: 14 },
    { id: 'legend_stick', name: '传说应援棒', type: 'hand', unlockLevel: 15 },
    // 签到限定
    { id: 'rainbow_scarf', name: '七日彩虹围巾', type: 'neck', unlockLevel: 0, checkinReward: true },
    { id: 'star_headband', name: '星星发箍', type: 'head', unlockLevel: 0, checkinReward: true },
    // { id: 'legend_cheer', name: '传说应援棒', type: 'hand', unlockLevel: 0, checkinReward: true },
  ];

  const TYPE_NAMES = {
    head: '头饰', neck: '颈部', face: '面部', hand: '手持', back: '背部', bg: '背景',
  };

  function render(petId) {
    const pets = Storage.getPets();
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;

    const container = document.getElementById('page-inventory');
    const unlocked = pet.unlockedItems || [];
    const equipped = pet.equippedItems || [];

    // 按类型分组
    const grouped = {};
    ALL_ITEMS.forEach(item => {
      if (!grouped[item.type]) grouped[item.type] = [];
      grouped[item.type].push({
        ...item,
        isUnlocked: unlocked.includes(item.id),
        isEquipped: equipped.includes(item.id),
      });
    });

    let html = `
      <div class="inventory-page">
        <div class="care-top-bar">
          <button class="back-btn" id="inv-back">←</button>
          <div class="pet-name-display">背包 - ${pet.nickname}</div>
        </div>
        <div class="inv-preview">
          <canvas id="inv-preview-canvas" width="128" height="128"></canvas>
        </div>
        <div class="inv-sections">`;

    Object.entries(grouped).forEach(([type, items]) => {
      html += `<div class="inv-section">
        <div class="inv-section-title">${TYPE_NAMES[type] || type}</div>
        <div class="inv-items">`;
      items.forEach(item => {
        const cls = item.isEquipped ? 'inv-item equipped' : (item.isUnlocked ? 'inv-item unlocked' : 'inv-item locked');
        const statusIcon = item.isEquipped ? '✓' : (item.isUnlocked ? '' : '🔒');
        html += `<button class="${cls}" data-item="${item.id}" ${!item.isUnlocked ? 'disabled' : ''}>
          <span class="inv-item-name">${item.name}</span>
          <span class="inv-item-status">${statusIcon}</span>
        </button>`;
      });
      html += '</div></div>';
    });

    html += '</div></div>';
    container.innerHTML = html;

    // 渲染预览
    const canvas = container.querySelector('#inv-preview-canvas');
    PixelRenderer.drawAnimal(canvas, pet.animalId, pet.level, 'idle', 0, equipped);

    // 事件
    container.querySelector('#inv-back').addEventListener('click', () => {
      Audio8Bit.playClick();
      showPage('care');
      PetCare.load(petId);
    });

    container.querySelectorAll('.inv-item.unlocked, .inv-item.equipped').forEach(btn => {
      btn.addEventListener('click', () => {
        Audio8Bit.playSelect();
        toggleItem(petId, btn.dataset.item);
        render(petId);
      });
    });
  }

  function toggleItem(petId, itemId) {
    const pets = Storage.getPets();
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;

    if (!pet.equippedItems) pet.equippedItems = [];

    const idx = pet.equippedItems.indexOf(itemId);
    if (idx >= 0) {
      pet.equippedItems.splice(idx, 1);
    } else {
      // 同类型只能装一个（head类型除外，可以叠加）
      const item = ALL_ITEMS.find(i => i.id === itemId);
      if (item && item.type !== 'head') {
        pet.equippedItems = pet.equippedItems.filter(eId => {
          const e = ALL_ITEMS.find(i => i.id === eId);
          return !e || e.type !== item.type;
        });
      }
      pet.equippedItems.push(itemId);
    }

    Storage.updatePet(petId, { equippedItems: pet.equippedItems });
  }

  function getItemInfo(itemId) {
    return ALL_ITEMS.find(i => i.id === itemId);
  }

  return { render, getItemInfo, ALL_ITEMS };
})();
