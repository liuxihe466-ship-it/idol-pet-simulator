// quotes.js — 动物心情语录
const Quotes = (() => {
  // 语气后缀
  const SUFFIXES = {
    dog: ['汪！', '汪~', '！', '~汪'],
    cat: ['喵~', '喵！', '~喵', '...喵'],
    small: ['！', '~', '...', '嘻嘻'],
    wild: ['！', '~', '呀', '哦'],
    bird: ['啾！', '啾~', '~啾', '咕咕'],
    power: ['！', '嗯！', '哼！', '...'],
  };

  const quotes = {
    // 心情好 + 饱
    happy_full: [
      '今天也是元气满满的一天',
      '吃饱饱的感觉太棒了',
      '有你在我好幸福',
      '我是世界上最幸运的小家伙',
      '心情超好！想给你唱首歌',
      '被爱的感觉，暖暖的',
    ],
    // 心情好 + 饿
    happy_hungry: [
      '虽然肚肚有点饿...但心情不错',
      '好像...有点想吃东西了',
      '饿了也不影响好心情！...大概',
      '闻到好香的味道了...',
    ],
    // 心情一般
    normal: [
      '今天天气不错呢',
      '在想你爱豆的事情...',
      '无聊的话就来陪我玩吧',
      '我在这里等你哦',
      '要不要一起发呆',
    ],
    // 心情差
    sad: [
      '主人...是不是忘了我',
      '好久没来看我了...',
      '有点寂寞...',
      '我会乖乖等你回来的',
      '呜...想要抱抱',
    ],
    // 刚喂食
    after_feed: [
      '好好吃！爱你哦',
      '嗝~吃太饱了',
      '谢谢投喂！你是最好的铲屎官',
      '再来一口！...开玩笑的啦',
      '这是什么！太美味了',
    ],
    // 刚玩耍
    after_play: [
      '再来再来！好开心',
      '哈哈哈太好玩了',
      '玩得好累但好快乐',
      '你果然是最会玩的',
      '下次还要一起玩哦',
    ],
    // 刚睡觉
    after_sleep: [
      '哈啊~好困...',
      '晚安...zzZ',
      '做了个梦，梦里有你',
      '困了困了...要睡了...',
    ],
    // 刚休息
    after_rest: [
      '伸个懒腰~',
      '休息一下感觉好多了',
      '啊~舒服~',
    ],
    // 刚摸头
    after_pat: [
      '嘿嘿...好舒服',
      '再摸摸再摸摸',
      '最喜欢你摸我头了',
      '幸福到要融化了',
    ],
    // 刚散步
    after_walk: [
      '外面的空气真好',
      '散步好开心！',
      '看到了好多有趣的东西',
    ],
    // 被逗
    after_poke: [
      '哈哈哈别挠我',
      '你干嘛啦！...再来一次',
      '喂喂喂！好痒',
      '讨厌...才不是在笑呢',
      '嘿嘿嘿停不下来了',
    ],
    // 升级
    level_up: [
      '我又变强了！都是主人的功劳',
      '升级了！是不是更帅/更可爱了',
      '感觉自己在闪闪发光',
      '越来越厉害了呢',
    ],
    // 体力低
    tired: [
      '好累...让我歇一会儿',
      '走不动了...',
      '需要补充能量...',
    ],
  };

  function getCategory(pet) {
    const animal = getAnimalById(pet.animalId);
    return animal ? animal.category : 'small';
  }

  function addSuffix(text, category) {
    const suffixes = SUFFIXES[category] || SUFFIXES.small;
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return text + suffix;
  }

  function pickQuote(pool) {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function getStatusQuote(pet) {
    const cat = getCategory(pet);

    if (pet.energy < 20) {
      return addSuffix(pickQuote(quotes.tired), cat);
    }
    if (pet.mood < 30) {
      return addSuffix(pickQuote(quotes.sad), cat);
    }
    if (pet.mood >= 70 && pet.hunger >= 50) {
      return addSuffix(pickQuote(quotes.happy_full), cat);
    }
    if (pet.mood >= 70 && pet.hunger < 50) {
      return addSuffix(pickQuote(quotes.happy_hungry), cat);
    }
    return addSuffix(pickQuote(quotes.normal), cat);
  }

  function getInteractionQuote(actionId, pet) {
    const cat = getCategory(pet);
    const poolMap = {
      feed: quotes.after_feed,
      play: quotes.after_play,
      sleep: quotes.after_sleep,
      rest: quotes.after_rest,
      pat: quotes.after_pat,
      walk: quotes.after_walk,
      poke: quotes.after_poke,
    };
    const pool = poolMap[actionId] || quotes.normal;
    return addSuffix(pickQuote(pool), cat);
  }

  function showBubble(text) {
    const bubble = document.getElementById('quote-bubble');
    if (!bubble) return;
    bubble.textContent = `「${text}」`;
    bubble.style.display = 'block';
    bubble.classList.add('show');
    setTimeout(() => {
      bubble.classList.remove('show');
      setTimeout(() => { bubble.style.display = 'none'; }, 300);
    }, 4000);
  }

  function showRandomQuote(pet) {
    showBubble(getStatusQuote(pet));
  }

  function showInteractionQuote(actionId, pet) {
    showBubble(getInteractionQuote(actionId, pet));
  }

  function showLevelUpQuote(pet) {
    const cat = getCategory(pet);
    showBubble(addSuffix(pickQuote(quotes.level_up), cat));
  }

  return { showRandomQuote, showInteractionQuote, showLevelUpQuote };
})();
