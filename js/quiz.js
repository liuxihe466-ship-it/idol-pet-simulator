// quiz.js — 问卷系统 + 匹配算法
const Quiz = (() => {
  let currentQuestion = 0;
  let answers = {};
  let topResults = [];

  const questions = [
    {
      id: 'gender',
      title: '你爱豆的性别是？',
      type: 'choice',
      options: [
        { label: '男', value: 'male', icon: '♂' },
        { label: '女', value: 'female', icon: '♀' },
      ],
      tags: {},
    },
    {
      id: 'nickname',
      title: '给你的爱豆起个昵称吧！',
      subtitle: '这将成为你的动物伙伴的名字~',
      type: 'text',
      placeholder: '例如：糯米、小太阳、奶盖...',
      tags: {},
    },
    {
      id: 'height',
      title: '爱豆的身高是多少？',
      subtitle: '输入数字就好（单位：cm）',
      type: 'number',
      placeholder: '例如：175',
      min: 140,
      max: 210,
      tags: {},
    },
    {
      id: 'eyes',
      title: '爱豆的眼睛是什么感觉？',
      type: 'choice',
      options: [
        { label: '圆圆的大眼睛', value: 'round', icon: '◉' },
        { label: '细长狐狸眼', value: 'fox', icon: '◇' },
        { label: '下垂无辜眼', value: 'droop', icon: '◠' },
        { label: '锐利有神眼', value: 'sharp', icon: '◆' },
      ],
      tags: {
        round: { eye_round: 3 },
        fox: { eye_fox: 3 },
        droop: { eye_droop: 3 },
        sharp: { eye_sharp: 3 },
      },
    },
    {
      id: 'face',
      title: '爱豆的脸型更接近？',
      type: 'choice',
      options: [
        { label: '圆脸肉肉的', value: 'round', icon: '●' },
        { label: '瓜子脸 / 尖下巴', value: 'pointed', icon: '▽' },
        { label: '方脸轮廓分明', value: 'square', icon: '■' },
        { label: '鹅蛋脸 / 标准脸', value: 'oval', icon: '⬭' },
      ],
      tags: {
        round: { face_round: 3 },
        pointed: { face_pointed: 3 },
        square: { face_square: 3 },
        oval: { face_oval: 3 },
      },
    },
    {
      id: 'vibe',
      title: '爱豆给人的整体感觉？',
      type: 'choice',
      options: [
        { label: '软萌可爱型', value: 'cute', icon: '❤' },
        { label: '高冷禁欲型', value: 'cool', icon: '❄' },
        { label: '阳光活力型', value: 'sunny', icon: '☀' },
        { label: '性感魅惑型', value: 'sexy', icon: '♠' },
        { label: '温柔治愈型', value: 'gentle', icon: '☁' },
      ],
      tags: {
        cute: { vibe_cute: 3 },
        cool: { vibe_cool: 3 },
        sunny: { vibe_sunny: 3 },
        sexy: { vibe_sexy: 3 },
        gentle: { vibe_gentle: 3 },
      },
    },
    {
      id: 'personality',
      title: '爱豆的性格更偏向？',
      type: 'choice',
      options: [
        { label: '话多社牛，谁都能聊', value: 'social', icon: '☺' },
        { label: '安静内敛，偶尔放飞', value: 'quiet', icon: '☾' },
        { label: '外冷内热，反差萌', value: 'gap', icon: '↕' },
        { label: '天生领导者，气场强', value: 'leader', icon: '★' },
        { label: '天然呆，可爱犯蠢', value: 'silly', icon: '~' },
        { label: '腹黑机灵鬼，小心思多', value: 'cunning', icon: '◈' },
        { label: '毒舌傲娇，嘴硬心软', value: 'tsundere', icon: '♤' },
        { label: '人来疯戏精，综艺感拉满', value: 'dramatic', icon: '♪' },
      ],
      tags: {
        social: { personality_social: 3 },
        quiet: { personality_quiet: 3 },
        gap: { personality_gap: 3 },
        leader: { personality_leader: 3 },
        silly: { personality_silly: 3 },
        cunning: { personality_cunning: 3 },
        tsundere: { personality_tsundere: 3 },
        dramatic: { personality_dramatic: 3 },
      },
    },
    {
      id: 'sense',
      title: 'TA 整体给你的"动物系"直觉？',
      subtitle: '跟着感觉走就好~',
      type: 'choice',
      options: [
        { label: '猫系', value: 'cat', icon: '🐱' },
        { label: '犬系', value: 'dog', icon: '🐶' },
        { label: '兔系', value: 'rabbit', icon: '🐰' },
        { label: '熊系', value: 'bear', icon: '🐻' },
        { label: '狐系', value: 'fox', icon: '🦊' },
        { label: '鸟系', value: 'bird', icon: '🐦' },
        { label: '说不清', value: 'unclear', icon: '？' },
      ],
      tags: {
        cat: { sense_cat: 3 },
        dog: { sense_dog: 3 },
        rabbit: { sense_rabbit: 3 },
        bear: { sense_bear: 3 },
        fox: { sense_fox: 3 },
        bird: { sense_bird: 3 },
        unclear: {},
      },
      weight: 2.0,
    },
  ];

  function getHeightTags(height, gender) {
    const h = parseInt(height);
    if (isNaN(h)) return {};
    if (gender === 'male') {
      if (h < 170) return { height_small: 3 };
      if (h <= 176) return { height_medium: 3 };
      if (h <= 182) return { height_tall: 3 };
      return { height_large: 3 };
    } else {
      if (h < 158) return { height_small: 3 };
      if (h <= 164) return { height_medium: 3 };
      if (h <= 170) return { height_tall: 3 };
      return { height_large: 3 };
    }
  }

  function computeScores() {
    const userTags = {};
    questions.forEach(q => {
      if (q.id === 'nickname' || q.id === 'gender') return;
      if (q.id === 'height') {
        const ht = getHeightTags(answers.height, answers.gender);
        Object.entries(ht).forEach(([k, v]) => { userTags[k] = (userTags[k] || 0) + v; });
        return;
      }
      const val = answers[q.id];
      if (!val || !q.tags[val]) return;
      const weight = q.weight || 1.0;
      Object.entries(q.tags[val]).forEach(([k, v]) => {
        userTags[k] = (userTags[k] || 0) + v * weight;
      });
    });

    const scores = ANIMALS.map(animal => {
      let score = 0;
      let maxPossible = 0;
      Object.entries(userTags).forEach(([tag, userVal]) => {
        const animalVal = animal.tags[tag] || 0;
        score += userVal * animalVal;
        maxPossible += userVal * 3;
      });
      const pct = maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0;
      return { animal, score, matchPercent: Math.min(pct + 15, 99) };
    });

    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, 5);
  }

  function renderQuiz(container) {
    currentQuestion = 0;
    answers = {};
    renderQuestion(container);
  }

  function renderQuestion(container) {
    const q = questions[currentQuestion];
    const total = questions.length;
    const progress = ((currentQuestion) / total) * 100;

    let html = `
      <div class="quiz-header">
        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${progress}%"></div></div>
        <div class="quiz-progress-text">Q${currentQuestion + 1} / ${total}</div>
      </div>
      <div class="quiz-question">
        <h2 class="quiz-title">${q.title}</h2>
        ${q.subtitle ? `<p class="quiz-subtitle">${q.subtitle}</p>` : ''}
    `;

    if (q.type === 'choice') {
      html += '<div class="quiz-options">';
      q.options.forEach(opt => {
        html += `<button class="quiz-option-btn" data-value="${opt.value}">
          <span class="quiz-option-icon">${opt.icon}</span>
          <span class="quiz-option-label">${opt.label}</span>
        </button>`;
      });
      html += '</div>';
    } else if (q.type === 'text') {
      html += `
        <div class="quiz-input-wrap">
          <input type="text" class="quiz-text-input" id="quiz-input" placeholder="${q.placeholder}" maxlength="20" />
          <button class="pixel-btn quiz-next-btn" id="quiz-submit" disabled>确定</button>
        </div>`;
    } else if (q.type === 'number') {
      html += `
        <div class="quiz-input-wrap">
          <input type="number" class="quiz-text-input" id="quiz-input" placeholder="${q.placeholder}" min="${q.min}" max="${q.max}" />
          <span class="quiz-unit">cm</span>
          <button class="pixel-btn quiz-next-btn" id="quiz-submit" disabled>确定</button>
        </div>`;
    }

    if (currentQuestion > 0) {
      html += `<button class="quiz-back-btn" id="quiz-back">← 上一题</button>`;
    }
    html += '</div>';

    container.innerHTML = html;

    // 绑定事件
    if (q.type === 'choice') {
      container.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          Audio8Bit.playSelect();
          answers[q.id] = btn.dataset.value;
          nextQuestion(container);
        });
      });
    } else {
      const input = container.querySelector('#quiz-input');
      const submitBtn = container.querySelector('#quiz-submit');
      input.addEventListener('input', () => {
        const val = input.value.trim();
        if (q.type === 'number') {
          const n = parseInt(val);
          submitBtn.disabled = isNaN(n) || n < q.min || n > q.max;
        } else {
          submitBtn.disabled = val.length === 0;
        }
      });
      submitBtn.addEventListener('click', () => {
        Audio8Bit.playSelect();
        answers[q.id] = input.value.trim();
        nextQuestion(container);
      });
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !submitBtn.disabled) {
          submitBtn.click();
        }
      });
      setTimeout(() => input.focus(), 100);
    }

    const backBtn = container.querySelector('#quiz-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        Audio8Bit.playClick();
        currentQuestion--;
        renderQuestion(container);
      });
    }
  }

  function nextQuestion(container) {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      showResults(container);
    } else {
      renderQuestion(container);
    }
  }

  function showResults(container) {
    topResults = computeScores();
    const top = topResults[0];
    Audio8Bit.playMatch();

    container.innerHTML = `
      <div class="result-page">
        <h2 class="result-title">匹配完成！</h2>
        <div class="result-animal-preview">
          <canvas id="result-canvas" width="160" height="160"></canvas>
        </div>
        <div class="result-info">
          <div class="result-animal-name">${top.animal.name}</div>
          <div class="result-match">匹配度 ${top.matchPercent}%</div>
          <p class="result-desc">${top.animal.description}</p>
        </div>
        <div class="result-question">这只${top.animal.name}像你的爱豆吗？</div>
        <div class="result-buttons">
          <button class="pixel-btn result-btn-yes" id="result-confirm">超像的！就是它！</button>
          <button class="pixel-btn result-btn-alt" id="result-alternatives">有点像但不太对</button>
          <button class="pixel-btn result-btn-no" id="result-reject">完全不像</button>
        </div>
      </div>`;

    // 渲染动物预览
    const canvas = container.querySelector('#result-canvas');
    if (canvas) {
      PixelRenderer.drawAnimal(canvas, top.animal.id, 1, 'idle', 0);
    }

    container.querySelector('#result-confirm').addEventListener('click', () => {
      Audio8Bit.playSelect();
      confirmAnimal(top.animal.id, container);
    });

    container.querySelector('#result-alternatives').addEventListener('click', () => {
      Audio8Bit.playClick();
      showAlternatives(container);
    });

    container.querySelector('#result-reject').addEventListener('click', () => {
      Audio8Bit.playClick();
      showPage('animal-list');
      AnimalList.render(document.getElementById('page-animal-list'), (animalId) => {
        confirmAnimal(animalId, null);
      });
    });
  }

  function showAlternatives(container) {
    const alts = topResults.slice(1, 4);
    let html = `
      <div class="result-page">
        <h2 class="result-title">其他匹配结果</h2>
        <div class="alt-list">`;
    alts.forEach((r, i) => {
      html += `
        <div class="alt-card" data-id="${r.animal.id}">
          <canvas class="alt-canvas" data-animal="${r.animal.id}" width="80" height="80"></canvas>
          <div class="alt-info">
            <div class="alt-name">${r.animal.name}</div>
            <div class="alt-match">匹配度 ${r.matchPercent}%</div>
          </div>
        </div>`;
    });
    html += `</div>
        <div class="alt-buttons">
          <button class="pixel-btn result-btn-no" id="alt-none">都不太像，我自己选</button>
          <button class="quiz-back-btn" id="alt-back">← 返回</button>
        </div>
      </div>`;

    container.innerHTML = html;

    container.querySelectorAll('.alt-canvas').forEach(c => {
      PixelRenderer.drawAnimal(c, c.dataset.animal, 1, 'idle', 0);
    });

    container.querySelectorAll('.alt-card').forEach(card => {
      card.addEventListener('click', () => {
        Audio8Bit.playSelect();
        confirmAnimal(card.dataset.id, container);
      });
    });

    container.querySelector('#alt-none').addEventListener('click', () => {
      Audio8Bit.playClick();
      showPage('animal-list');
      AnimalList.render(document.getElementById('page-animal-list'), (animalId) => {
        confirmAnimal(animalId, null);
      });
    });

    container.querySelector('#alt-back').addEventListener('click', () => {
      Audio8Bit.playClick();
      showResults(container);
    });
  }

  function confirmAnimal(animalId, container) {
    const nickname = answers.nickname || '小宝贝';
    const pet = {
      id: Storage.uuid(),
      animalId,
      nickname,
      level: 1,
      exp: 0,
      hunger: 100,
      mood: 100,
      energy: 100,
      equippedItems: [],
      unlockedItems: ['bib_pink'],
      createdAt: Date.now(),
      lastInteraction: Date.now(),
      lastFeed: 0,
      lastPlay: 0,
      lastSleep: 0,
    };
    Storage.addPet(pet);
    Audio8Bit.playMatch();
    showPage('care');
    PetCare.load(pet.id);
  }

  return { renderQuiz, getAnswers: () => ({ ...answers }) };
})();

// 动物列表页面（手动选择）
const AnimalList = (() => {
  function render(container, onSelect) {
    let html = `
      <div class="animal-list-page">
        <h2 class="page-title">选择你的动物</h2>
        <div class="category-tabs">`;
    CATEGORY_ORDER.forEach((cat, i) => {
      html += `<button class="category-tab ${i === 0 ? 'active' : ''}" data-cat="${cat}">${CATEGORY_NAMES[cat]}</button>`;
    });
    html += `</div><div class="animal-grid" id="animal-grid"></div>
        <button class="quiz-back-btn" id="list-back">← 返回</button>
      </div>`;

    container.innerHTML = html;
    renderCategory(container, CATEGORY_ORDER[0], onSelect);

    container.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        Audio8Bit.playClick();
        container.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCategory(container, tab.dataset.cat, onSelect);
      });
    });

    container.querySelector('#list-back').addEventListener('click', () => {
      Audio8Bit.playClick();
      showPage('quiz');
    });
  }

  function renderCategory(container, category, onSelect) {
    const grid = container.querySelector('#animal-grid');
    const animals = getAnimalsByCategory(category);
    let html = '';
    animals.forEach(a => {
      html += `
        <div class="animal-card" data-id="${a.id}">
          <canvas class="animal-card-canvas" data-animal="${a.id}" width="64" height="64"></canvas>
          <div class="animal-card-name">${a.name}</div>
          <div class="animal-card-desc">${a.description}</div>
        </div>`;
    });
    grid.innerHTML = html;

    grid.querySelectorAll('.animal-card-canvas').forEach(c => {
      PixelRenderer.drawAnimal(c, c.dataset.animal, 1, 'idle', 0);
    });

    grid.querySelectorAll('.animal-card').forEach(card => {
      card.addEventListener('click', () => {
        Audio8Bit.playSelect();
        if (onSelect) onSelect(card.dataset.id);
      });
    });
  }

  return { render };
})();
