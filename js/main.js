// main.js — 应用入口 + 页面路由 + 动物小窝
const PAGES = ['home', 'quiz', 'result', 'animal-list', 'shelter', 'care', 'inventory', 'profile'];
let currentPage = 'home';

function showPage(pageId) {
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.style.display = p === pageId ? 'block' : 'none';
  });
  currentPage = pageId;
}

// 动物小窝
const Shelter = (() => {
  function render() {
    const container = document.getElementById('page-shelter');
    const pets = Storage.getPets();
    const unlockedSlots = Storage.getUnlockedSlots();
    const checkinData = Storage.getCheckin();
    const totalSlots = 5;

    let slotsHtml = '';
    for (let i = 0; i < totalSlots; i++) {
      if (i < pets.length) {
        const pet = pets[i];
        const animal = getAnimalById(pet.animalId);
        slotsHtml += `
          <div class="shelter-slot filled" data-pet-id="${pet.id}">
            <canvas class="shelter-canvas" data-animal="${pet.animalId}" data-level="${pet.level}" data-items='${JSON.stringify(pet.equippedItems || [])}' width="80" height="80"></canvas>
            <div class="shelter-pet-name">${pet.nickname}</div>
            <div class="shelter-pet-info">Lv.${pet.level} ${animal ? animal.name : ''}</div>
          </div>`;
      } else if (i < unlockedSlots) {
        slotsHtml += `
          <div class="shelter-slot empty" id="slot-add">
            <div class="slot-add-icon">+</div>
            <div class="slot-add-text">添加新动物</div>
          </div>`;
      } else {
        const cost = Checkin.SLOT_COSTS[i];
        slotsHtml += `
          <div class="shelter-slot locked" data-slot="${i}">
            <div class="slot-lock-icon">🔒</div>
            <div class="slot-lock-cost">${cost} 星星币</div>
            <div class="slot-lock-current">拥有：${checkinData.totalStars}</div>
          </div>`;
      }
    }

    container.innerHTML = `
      <div class="shelter-page">
        <div class="shelter-header">
          <h2 class="shelter-title">动物小窝</h2>
          <div class="shelter-stars">★ ${checkinData.totalStars}</div>
        </div>
        <div class="shelter-slots">${slotsHtml}</div>
        <div class="shelter-bottom">
          <button class="pixel-btn shelter-btn" id="shelter-profile">📋 档案/签到</button>
          <button class="pixel-btn shelter-btn" id="shelter-sound">
            ${Audio8Bit.getSettings().soundEnabled ? '🔊' : '🔇'} 音效
          </button>
          <button class="pixel-btn shelter-btn" id="shelter-bgm">
            ${Audio8Bit.getSettings().bgmEnabled ? '♪ BGM' : '♪ BGM关'}
          </button>
        </div>
      </div>`;

    // 渲染动物缩略图
    container.querySelectorAll('.shelter-canvas').forEach(c => {
      const items = JSON.parse(c.dataset.items || '[]');
      PixelRenderer.drawAnimal(c, c.dataset.animal, parseInt(c.dataset.level), 'idle', 0, items);
    });

    // 点击已有宠物
    container.querySelectorAll('.shelter-slot.filled').forEach(slot => {
      slot.addEventListener('click', () => {
        Audio8Bit.playSelect();
        showPage('care');
        PetCare.load(slot.dataset.petId);
      });
    });

    // 点击空槽位添加
    const addSlot = container.querySelector('#slot-add');
    if (addSlot) {
      addSlot.addEventListener('click', () => {
        Audio8Bit.playSelect();
        showPage('quiz');
        Quiz.renderQuiz(document.getElementById('page-quiz'));
      });
    }

    // 点击锁定槽位
    container.querySelectorAll('.shelter-slot.locked').forEach(slot => {
      slot.addEventListener('click', () => {
        const slotIdx = parseInt(slot.dataset.slot);
        if (Checkin.canUnlockSlot(slotIdx)) {
          if (confirm(`花费 ${Checkin.SLOT_COSTS[slotIdx]} 星星币解锁第 ${slotIdx + 1} 号槽位？`)) {
            if (Checkin.unlockSlot(slotIdx)) {
              render();
            }
          }
        } else {
          showToast(`需要 ${Checkin.SLOT_COSTS[slotIdx]} 星星币`);
          Audio8Bit.playError();
        }
      });
    });

    // 底部按钮
    container.querySelector('#shelter-profile').addEventListener('click', () => {
      Audio8Bit.playClick();
      showPage('profile');
      Checkin.renderProfile(document.getElementById('page-profile'));
    });

    container.querySelector('#shelter-sound').addEventListener('click', () => {
      const enabled = Audio8Bit.toggleSound();
      Storage.saveSettings(Audio8Bit.getSettings());
      render();
    });

    container.querySelector('#shelter-bgm').addEventListener('click', () => {
      const enabled = Audio8Bit.toggleBGM();
      Storage.saveSettings(Audio8Bit.getSettings());
      render();
    });
  }

  return { render };
})();

// 初始化
function initApp() {
  // 加载音频设置
  const settings = Storage.getSettings();
  Audio8Bit.init(settings);

  const pets = Storage.getPets();

  if (pets.length > 0) {
    // 有宠物 → 直接进入小窝
    showPage('shelter');
    Shelter.render();
  } else {
    // 无宠物 → 首页
    showPage('home');
    renderHome();
  }
}

function renderHome() {
  const container = document.getElementById('page-home');
  container.innerHTML = `
    <div class="home-page">
      <div class="home-stars" id="home-stars"></div>
      <div class="home-content">
        <h1 class="home-title">爱豆动物塑</h1>
        <h2 class="home-subtitle">模拟器</h2>
        <p class="home-desc">回答几个问题<br>找到最像你爱豆的动物伙伴！</p>
        <button class="pixel-btn home-start-btn" id="start-btn">开始匹配</button>
      </div>
      <div class="home-footer">
        <div class="home-animals-preview" id="home-preview"></div>
      </div>
    </div>`;

  // 闪烁星星
  const starsContainer = container.querySelector('#home-stars');
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.className = 'pixel-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 60 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.textContent = '★';
    starsContainer.appendChild(star);
  }

  // 底部动物预览
  const previewContainer = container.querySelector('#home-preview');
  const previewAnimals = ['shiba', 'orange_cat', 'hamster', 'penguin', 'fox'];
  previewAnimals.forEach(id => {
    const c = document.createElement('canvas');
    c.width = 48;
    c.height = 48;
    c.className = 'home-preview-animal';
    previewContainer.appendChild(c);
    PixelRenderer.drawAnimal(c, id, 1, 'idle', Math.random() * 10);
  });

  container.querySelector('#start-btn').addEventListener('click', () => {
    Audio8Bit.playMatch();
    showPage('quiz');
    Quiz.renderQuiz(document.getElementById('page-quiz'));
  });
}

// DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
