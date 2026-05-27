// animals.js — 35种动物数据定义
const ANIMALS = [
  // ==================== 犬类 × 7 ====================
  {
    id: 'shiba', name: '柴犬', category: 'dog',
    description: '忠诚倔强的微笑天使，外冷内热的反差萌代名词',
    tags: {
      eye_round: 0, eye_fox: 3, eye_droop: 0, eye_sharp: 1,
      face_round: 1, face_pointed: 0, face_square: 3, face_oval: 0,
      vibe_cute: 1, vibe_cool: 2, vibe_sunny: 3, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 0, personality_quiet: 1, personality_gap: 3, personality_leader: 1, personality_silly: 1, personality_cunning: 1, personality_tsundere: 2, personality_dramatic: 0,
      height_small: 0, height_medium: 3, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 3, sense_rabbit: 0, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'dog', primaryColor: '#D4A054', secondaryColor: '#FFF5E1', earType: 'triangle_up', tailType: 'curl_up', eyeColor: '#3A2A1A', markings: 'shiba_face' },
  },
  {
    id: 'corgi', name: '柯基', category: 'dog',
    description: '短腿大屁股的快乐源泉，永远元气满满的小电动机',
    tags: {
      eye_round: 2, eye_fox: 1, eye_droop: 0, eye_sharp: 0,
      face_round: 2, face_pointed: 1, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 3, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 3, personality_quiet: 0, personality_gap: 0, personality_leader: 0, personality_silly: 2, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 2,
      height_small: 2, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 3, sense_rabbit: 0, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'dog', primaryColor: '#E8A64C', secondaryColor: '#FFFFFF', earType: 'big_triangle', tailType: 'stub', eyeColor: '#2C1B0E', markings: 'corgi_face' },
  },
  {
    id: 'golden', name: '金毛', category: 'dog',
    description: '温暖的大暖男，对谁都友善，笑起来能融化整个世界',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 1, eye_sharp: 0,
      face_round: 1, face_pointed: 0, face_square: 1, face_oval: 2,
      vibe_cute: 1, vibe_cool: 0, vibe_sunny: 3, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 3, personality_quiet: 0, personality_gap: 0, personality_leader: 0, personality_silly: 1, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 1, height_large: 3,
      sense_cat: 0, sense_dog: 3, sense_rabbit: 0, sense_bear: 1, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'dog', primaryColor: '#DAA545', secondaryColor: '#F5DEB3', earType: 'floppy', tailType: 'long_wag', eyeColor: '#4A3520', markings: 'none' },
  },
  {
    id: 'samoyed', name: '萨摩耶', category: 'dog',
    description: '行走的棉花糖，微笑天使，治愈系白色毛绒绒',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 1,
      vibe_cute: 2, vibe_cool: 0, vibe_sunny: 2, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 3, personality_quiet: 0, personality_gap: 0, personality_leader: 0, personality_silly: 2, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 1,
      height_small: 0, height_medium: 0, height_tall: 1, height_large: 3,
      sense_cat: 0, sense_dog: 3, sense_rabbit: 0, sense_bear: 2, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'dog', primaryColor: '#FFFEF5', secondaryColor: '#F0EDE5', earType: 'triangle_up', tailType: 'fluffy_curl', eyeColor: '#2C2C2C', markings: 'none' },
  },
  {
    id: 'husky', name: '哈士奇', category: 'dog',
    description: '帅气的拆家二哈，舞台上炸裂能量，私下神经大条',
    tags: {
      eye_round: 0, eye_fox: 1, eye_droop: 0, eye_sharp: 3,
      face_round: 0, face_pointed: 1, face_square: 2, face_oval: 0,
      vibe_cute: 0, vibe_cool: 3, vibe_sunny: 2, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 2, personality_quiet: 0, personality_gap: 2, personality_leader: 0, personality_silly: 3, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 3,
      height_small: 0, height_medium: 0, height_tall: 2, height_large: 3,
      sense_cat: 0, sense_dog: 3, sense_rabbit: 0, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'dog', primaryColor: '#7B8FA0', secondaryColor: '#FFFFFF', earType: 'triangle_up', tailType: 'fluffy_curl', eyeColor: '#5DADEC', markings: 'husky_face' },
  },
  {
    id: 'pomeranian', name: '博美', category: 'dog',
    description: '小小一只但气场一米八，精致可爱的毛绒球',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 3, face_pointed: 1, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 2, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 2, personality_quiet: 0, personality_gap: 0, personality_leader: 1, personality_silly: 1, personality_cunning: 1, personality_tsundere: 2, personality_dramatic: 1,
      height_small: 3, height_medium: 1, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 2, sense_rabbit: 1, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'dog', primaryColor: '#F5C67A', secondaryColor: '#FFF8E7', earType: 'tiny_triangle', tailType: 'fluffy_curl', eyeColor: '#1A1A1A', markings: 'none' },
  },
  {
    id: 'beagle', name: '比格犬', category: 'dog',
    description: '垂耳大眼的无辜脸，好奇心旺盛的小探险家',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 3, eye_sharp: 0,
      face_round: 2, face_pointed: 0, face_square: 0, face_oval: 2,
      vibe_cute: 2, vibe_cool: 0, vibe_sunny: 2, vibe_sexy: 0, vibe_gentle: 1,
      personality_social: 2, personality_quiet: 0, personality_gap: 0, personality_leader: 0, personality_silly: 3, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 1,
      height_small: 1, height_medium: 3, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 3, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'dog', primaryColor: '#C8943E', secondaryColor: '#FFFFFF', earType: 'long_floppy', tailType: 'long_wag', eyeColor: '#3D2B1A', markings: 'beagle_tri' },
  },

  // ==================== 猫类 × 7 ====================
  {
    id: 'orange_cat', name: '橘猫', category: 'cat',
    description: '十只橘猫九只胖，慵懒贪吃的幸福肉球',
    tags: {
      eye_round: 2, eye_fox: 1, eye_droop: 0, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 1,
      vibe_cute: 2, vibe_cool: 0, vibe_sunny: 1, vibe_sexy: 0, vibe_gentle: 2,
      personality_social: 1, personality_quiet: 2, personality_gap: 0, personality_leader: 0, personality_silly: 3, personality_cunning: 1, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 0, height_medium: 2, height_tall: 0, height_large: 2,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 0, sense_bear: 1, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'cat', primaryColor: '#E8943A', secondaryColor: '#FFF5E1', earType: 'cat_triangle', tailType: 'cat_long', eyeColor: '#D4A017', markings: 'tabby_stripes' },
  },
  {
    id: 'tuxedo_cat', name: '奶牛猫', category: 'cat',
    description: '黑白配色的戏精本精，一秒安静一秒疯狂的反差王',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 0, eye_sharp: 1,
      face_round: 2, face_pointed: 0, face_square: 0, face_oval: 1,
      vibe_cute: 2, vibe_cool: 1, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 1, personality_quiet: 1, personality_gap: 3, personality_leader: 0, personality_silly: 2, personality_cunning: 1, personality_tsundere: 0, personality_dramatic: 3,
      height_small: 0, height_medium: 3, height_tall: 0, height_large: 0,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'cat', primaryColor: '#1A1A1A', secondaryColor: '#FFFFFF', earType: 'cat_triangle', tailType: 'cat_long', eyeColor: '#4CAF50', markings: 'tuxedo' },
  },
  {
    id: 'british_short', name: '英短', category: 'cat',
    description: '圆脸大眼的蓝胖子，稳重淡定的贵族气质',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 1, face_oval: 0,
      vibe_cute: 1, vibe_cool: 2, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 2,
      personality_social: 0, personality_quiet: 3, personality_gap: 1, personality_leader: 0, personality_silly: 0, personality_cunning: 0, personality_tsundere: 1, personality_dramatic: 0,
      height_small: 0, height_medium: 3, height_tall: 0, height_large: 1,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 0, sense_bear: 1, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'cat', primaryColor: '#8896A7', secondaryColor: '#B0BEC5', earType: 'cat_round', tailType: 'cat_thick', eyeColor: '#F5A623', markings: 'none' },
  },
  {
    id: 'ragdoll', name: '布偶猫', category: 'cat',
    description: '蓝眼仙女猫，温柔优雅，抱起来像个布偶娃娃',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 1, face_pointed: 0, face_square: 0, face_oval: 3,
      vibe_cute: 1, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 1, personality_quiet: 2, personality_gap: 0, personality_leader: 0, personality_silly: 0, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 2, height_large: 2,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 1, sense_bear: 0, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'cat', primaryColor: '#FFF8F0', secondaryColor: '#D4C4B0', earType: 'cat_triangle', tailType: 'cat_fluffy', eyeColor: '#5B9BD5', markings: 'pointed' },
  },
  {
    id: 'siamese', name: '暹罗猫', category: 'cat',
    description: '话多的小醋王，细长优雅的猫中贵族',
    tags: {
      eye_round: 0, eye_fox: 3, eye_droop: 0, eye_sharp: 1,
      face_round: 0, face_pointed: 3, face_square: 0, face_oval: 1,
      vibe_cute: 0, vibe_cool: 2, vibe_sunny: 0, vibe_sexy: 2, vibe_gentle: 0,
      personality_social: 3, personality_quiet: 0, personality_gap: 1, personality_leader: 1, personality_silly: 0, personality_cunning: 2, personality_tsundere: 2, personality_dramatic: 1,
      height_small: 0, height_medium: 2, height_tall: 2, height_large: 0,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'cat', primaryColor: '#F5E6D3', secondaryColor: '#6B4C3B', earType: 'cat_large', tailType: 'cat_thin', eyeColor: '#4FC3F7', markings: 'siamese_points' },
  },
  {
    id: 'russian_blue', name: '俄罗斯蓝猫', category: 'cat',
    description: '翡翠绿眼的优雅绅士，高冷外表下藏着忠诚的心',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 0, eye_sharp: 2,
      face_round: 1, face_pointed: 1, face_square: 0, face_oval: 2,
      vibe_cute: 0, vibe_cool: 3, vibe_sunny: 0, vibe_sexy: 1, vibe_gentle: 1,
      personality_social: 0, personality_quiet: 3, personality_gap: 2, personality_leader: 0, personality_silly: 0, personality_cunning: 2, personality_tsundere: 2, personality_dramatic: 0,
      height_small: 0, height_medium: 2, height_tall: 2, height_large: 0,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'cat', primaryColor: '#7B8FA8', secondaryColor: '#95A8BD', earType: 'cat_large', tailType: 'cat_long', eyeColor: '#2ECC71', markings: 'none' },
  },
  {
    id: 'black_cat', name: '黑猫', category: 'cat',
    description: '神秘魅惑的暗夜精灵，低调又带着致命吸引力',
    tags: {
      eye_round: 0, eye_fox: 1, eye_droop: 0, eye_sharp: 3,
      face_round: 0, face_pointed: 2, face_square: 0, face_oval: 2,
      vibe_cute: 0, vibe_cool: 3, vibe_sunny: 0, vibe_sexy: 3, vibe_gentle: 0,
      personality_social: 0, personality_quiet: 3, personality_gap: 2, personality_leader: 1, personality_silly: 0, personality_cunning: 3, personality_tsundere: 1, personality_dramatic: 0,
      height_small: 0, height_medium: 2, height_tall: 2, height_large: 0,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'cat', primaryColor: '#1A1A2E', secondaryColor: '#16213E', earType: 'cat_triangle', tailType: 'cat_long', eyeColor: '#FFD700', markings: 'none' },
  },

  // ==================== 小动物 × 5 ====================
  {
    id: 'lop_rabbit', name: '垂耳兔', category: 'small',
    description: '垂垂的大耳朵，无辜的大眼睛，软糯糯的温柔小天使',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 3, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 0, personality_quiet: 3, personality_gap: 0, personality_leader: 0, personality_silly: 1, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 2, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 3, sense_bear: 0, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'small', primaryColor: '#F5E6D3', secondaryColor: '#FFFFFF', earType: 'lop_ear', tailType: 'pom', eyeColor: '#8B4513', markings: 'none' },
  },
  {
    id: 'upear_rabbit', name: '竖耳兔', category: 'small',
    description: '竖着耳朵的机灵小可爱，活泼但又乖巧',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 1, eye_sharp: 0,
      face_round: 2, face_pointed: 1, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 2, vibe_sexy: 0, vibe_gentle: 1,
      personality_social: 1, personality_quiet: 2, personality_gap: 0, personality_leader: 0, personality_silly: 2, personality_cunning: 1, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 2, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 3, sense_bear: 0, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'small', primaryColor: '#FFFFFF', secondaryColor: '#FFE4E1', earType: 'rabbit_up', tailType: 'pom', eyeColor: '#FF6B6B', markings: 'none' },
  },
  {
    id: 'hamster', name: '仓鼠', category: 'small',
    description: '塞满腮帮子的小吃货，娇小可爱的掌心宝贝',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 1, vibe_sexy: 0, vibe_gentle: 1,
      personality_social: 0, personality_quiet: 2, personality_gap: 0, personality_leader: 0, personality_silly: 3, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 3, height_medium: 1, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 1, sense_bear: 1, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'small', primaryColor: '#F5DEB3', secondaryColor: '#FFFFFF', earType: 'tiny_round', tailType: 'stub', eyeColor: '#1A1A1A', markings: 'hamster_cheeks' },
  },
  {
    id: 'hedgehog', name: '刺猬', category: 'small',
    description: '外表带刺内心柔软，不善表达的害羞小家伙',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 1, face_pointed: 2, face_square: 0, face_oval: 0,
      vibe_cute: 2, vibe_cool: 1, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 0, personality_quiet: 3, personality_gap: 2, personality_leader: 0, personality_silly: 0, personality_cunning: 0, personality_tsundere: 3, personality_dramatic: 0,
      height_small: 3, height_medium: 1, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'small', primaryColor: '#8B7355', secondaryColor: '#FFF8E7', earType: 'tiny_round', tailType: 'none', eyeColor: '#1A1A1A', markings: 'spines' },
  },
  {
    id: 'chinchilla', name: '龙猫', category: 'small',
    description: '毛茸茸的圆滚滚，呆萌可爱的温柔小精灵',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 2,
      personality_social: 0, personality_quiet: 3, personality_gap: 0, personality_leader: 0, personality_silly: 2, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 2, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 2, sense_bear: 1, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'small', primaryColor: '#A9A9B0', secondaryColor: '#FFFFFF', earType: 'big_round', tailType: 'fluffy_curl', eyeColor: '#1A1A1A', markings: 'none' },
  },

  // ==================== 野生萌系 × 6 ====================
  {
    id: 'fox', name: '狐狸', category: 'wild',
    description: '聪明狡黠的小妖精，一双勾人的狐狸眼',
    tags: {
      eye_round: 0, eye_fox: 3, eye_droop: 0, eye_sharp: 2,
      face_round: 0, face_pointed: 3, face_square: 0, face_oval: 1,
      vibe_cute: 0, vibe_cool: 2, vibe_sunny: 0, vibe_sexy: 3, vibe_gentle: 0,
      personality_social: 1, personality_quiet: 2, personality_gap: 1, personality_leader: 1, personality_silly: 0, personality_cunning: 3, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 0, height_medium: 2, height_tall: 2, height_large: 0,
      sense_cat: 1, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 3, sense_bird: 0,
    },
    render: { baseBody: 'wild', primaryColor: '#E87040', secondaryColor: '#FFFFFF', earType: 'fox_large', tailType: 'fox_fluffy', eyeColor: '#D4A017', markings: 'fox_face' },
  },
  {
    id: 'red_panda', name: '小熊猫', category: 'wild',
    description: '红棕色的软萌小可爱，永远一副好奇宝宝的表情',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 2,
      personality_social: 0, personality_quiet: 2, personality_gap: 1, personality_leader: 0, personality_silly: 3, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 1,
      height_small: 1, height_medium: 3, height_tall: 0, height_large: 0,
      sense_cat: 1, sense_dog: 0, sense_rabbit: 0, sense_bear: 2, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'wild', primaryColor: '#C84C28', secondaryColor: '#3D2B1A', earType: 'round_tipped', tailType: 'ringed_fluffy', eyeColor: '#1A1A1A', markings: 'panda_face' },
  },
  {
    id: 'alpaca', name: '羊驼', category: 'wild',
    description: '蓬松卷毛的呆萌神兽，表情永远云淡风轻',
    tags: {
      eye_round: 1, eye_fox: 0, eye_droop: 2, eye_sharp: 0,
      face_round: 0, face_pointed: 0, face_square: 0, face_oval: 3,
      vibe_cute: 1, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 0, personality_quiet: 2, personality_gap: 0, personality_leader: 0, personality_silly: 3, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 3, height_large: 1,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 1, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'wild', primaryColor: '#FFF8F0', secondaryColor: '#F5E6D3', earType: 'alpaca_ear', tailType: 'stub', eyeColor: '#1A1A1A', markings: 'fluffy_body' },
  },
  {
    id: 'deer', name: '小鹿', category: 'wild',
    description: '清澈鹿眼的森林精灵，纯净优雅的小王子/小公主',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 1, eye_sharp: 0,
      face_round: 0, face_pointed: 2, face_square: 0, face_oval: 2,
      vibe_cute: 1, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 0, personality_quiet: 3, personality_gap: 0, personality_leader: 0, personality_silly: 0, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 1, height_medium: 1, height_tall: 3, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 1, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'wild', primaryColor: '#C8A060', secondaryColor: '#FFF5E1', earType: 'deer_ear', tailType: 'stub', eyeColor: '#4A3520', markings: 'deer_spots' },
  },
  {
    id: 'seal', name: '海豹', category: 'wild',
    description: '圆滚滚的水中精灵，永远一副软乎乎呆萌的样子',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 1, eye_sharp: 0,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 0,
      vibe_cute: 3, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 2,
      personality_social: 1, personality_quiet: 1, personality_gap: 0, personality_leader: 0, personality_silly: 3, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 1,
      height_small: 0, height_medium: 1, height_tall: 0, height_large: 3,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 3, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'wild', primaryColor: '#B0B0B0', secondaryColor: '#E0E0E0', earType: 'none', tailType: 'flipper', eyeColor: '#1A1A1A', markings: 'none' },
  },
  {
    id: 'capybara', name: '水豚', category: 'wild',
    description: '佛系之王，永远不慌不忙，谁都能当好朋友',
    tags: {
      eye_round: 1, eye_fox: 0, eye_droop: 2, eye_sharp: 0,
      face_round: 1, face_pointed: 0, face_square: 2, face_oval: 1,
      vibe_cute: 1, vibe_cool: 0, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 3, personality_quiet: 1, personality_gap: 0, personality_leader: 0, personality_silly: 2, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 0, height_medium: 2, height_tall: 0, height_large: 2,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 2, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'wild', primaryColor: '#8B6F47', secondaryColor: '#A0845C', earType: 'tiny_round', tailType: 'none', eyeColor: '#1A1A1A', markings: 'none' },
  },

  // ==================== 禽鸟类 × 5 ====================
  {
    id: 'parrot', name: '鹦鹉', category: 'bird',
    description: '五彩缤纷的话痨小鸟，舞台上永远最闪亮',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 0, eye_sharp: 1,
      face_round: 1, face_pointed: 2, face_square: 0, face_oval: 0,
      vibe_cute: 1, vibe_cool: 0, vibe_sunny: 3, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 3, personality_quiet: 0, personality_gap: 0, personality_leader: 1, personality_silly: 2, personality_cunning: 1, personality_tsundere: 0, personality_dramatic: 3,
      height_small: 2, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 3,
    },
    render: { baseBody: 'bird', primaryColor: '#4CAF50', secondaryColor: '#FF5722', earType: 'crest', tailType: 'tail_feathers', eyeColor: '#1A1A1A', markings: 'parrot_colors' },
  },
  {
    id: 'duck', name: '鸭子', category: 'bird',
    description: '摇摇摆摆的搞笑担当，嘎嘎嘎制造快乐',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 2, face_pointed: 0, face_square: 0, face_oval: 1,
      vibe_cute: 2, vibe_cool: 0, vibe_sunny: 2, vibe_sexy: 0, vibe_gentle: 0,
      personality_social: 2, personality_quiet: 0, personality_gap: 0, personality_leader: 0, personality_silly: 3, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 3,
      height_small: 2, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 3,
    },
    render: { baseBody: 'bird', primaryColor: '#FFEB3B', secondaryColor: '#FF9800', earType: 'none', tailType: 'duck_tail', eyeColor: '#1A1A1A', markings: 'none' },
  },
  {
    id: 'penguin', name: '企鹅', category: 'bird',
    description: '穿着燕尾服的小绅士，笨拙走路却超级可爱的反差萌',
    tags: {
      eye_round: 2, eye_fox: 0, eye_droop: 0, eye_sharp: 0,
      face_round: 2, face_pointed: 0, face_square: 0, face_oval: 1,
      vibe_cute: 2, vibe_cool: 1, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 1,
      personality_social: 1, personality_quiet: 1, personality_gap: 3, personality_leader: 0, personality_silly: 1, personality_cunning: 0, personality_tsundere: 1, personality_dramatic: 1,
      height_small: 2, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 3,
    },
    render: { baseBody: 'bird', primaryColor: '#1A1A2E', secondaryColor: '#FFFFFF', earType: 'none', tailType: 'stub', eyeColor: '#1A1A1A', markings: 'penguin_belly' },
  },
  {
    id: 'owl', name: '猫头鹰', category: 'bird',
    description: '深邃大眼的智慧化身，安静观察一切的深情歌者',
    tags: {
      eye_round: 3, eye_fox: 0, eye_droop: 0, eye_sharp: 2,
      face_round: 3, face_pointed: 0, face_square: 0, face_oval: 0,
      vibe_cute: 0, vibe_cool: 2, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 1,
      personality_social: 0, personality_quiet: 3, personality_gap: 0, personality_leader: 1, personality_silly: 0, personality_cunning: 3, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 1, height_medium: 2, height_tall: 0, height_large: 0,
      sense_cat: 1, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 3,
    },
    render: { baseBody: 'bird', primaryColor: '#8B6F47', secondaryColor: '#D4C4B0', earType: 'ear_tufts', tailType: 'tail_feathers', eyeColor: '#FF8C00', markings: 'owl_face' },
  },
  {
    id: 'swan', name: '天鹅', category: 'bird',
    description: '优雅从容的湖上仙子，一举一动都是行云流水',
    tags: {
      eye_round: 0, eye_fox: 0, eye_droop: 1, eye_sharp: 1,
      face_round: 0, face_pointed: 1, face_square: 0, face_oval: 3,
      vibe_cute: 0, vibe_cool: 1, vibe_sunny: 0, vibe_sexy: 2, vibe_gentle: 3,
      personality_social: 0, personality_quiet: 3, personality_gap: 0, personality_leader: 1, personality_silly: 0, personality_cunning: 0, personality_tsundere: 1, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 3, height_large: 1,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 3,
    },
    render: { baseBody: 'bird', primaryColor: '#FFFFFF', secondaryColor: '#F5F5F5', earType: 'none', tailType: 'tail_feathers', eyeColor: '#1A1A1A', markings: 'swan_beak' },
  },

  // ==================== 气场系 × 5 ====================
  {
    id: 'lion', name: '狮子', category: 'power',
    description: '百兽之王的霸气，站在那里就是舞台的中心',
    tags: {
      eye_round: 0, eye_fox: 0, eye_droop: 0, eye_sharp: 3,
      face_round: 0, face_pointed: 0, face_square: 3, face_oval: 0,
      vibe_cute: 0, vibe_cool: 2, vibe_sunny: 1, vibe_sexy: 1, vibe_gentle: 0,
      personality_social: 2, personality_quiet: 0, personality_gap: 0, personality_leader: 3, personality_silly: 0, personality_cunning: 1, personality_tsundere: 0, personality_dramatic: 1,
      height_small: 0, height_medium: 0, height_tall: 0, height_large: 3,
      sense_cat: 1, sense_dog: 0, sense_rabbit: 0, sense_bear: 2, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'power', primaryColor: '#DAA520', secondaryColor: '#F5DEB3', earType: 'round_small', tailType: 'lion_tail', eyeColor: '#D4A017', markings: 'mane' },
  },
  {
    id: 'tiger', name: '老虎', category: 'power',
    description: '霸气与美丽并存的山林之王，舞台上炸裂全场',
    tags: {
      eye_round: 0, eye_fox: 1, eye_droop: 0, eye_sharp: 3,
      face_round: 0, face_pointed: 0, face_square: 3, face_oval: 0,
      vibe_cute: 0, vibe_cool: 3, vibe_sunny: 1, vibe_sexy: 1, vibe_gentle: 0,
      personality_social: 0, personality_quiet: 1, personality_gap: 0, personality_leader: 3, personality_silly: 0, personality_cunning: 1, personality_tsundere: 1, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 1, height_large: 3,
      sense_cat: 2, sense_dog: 0, sense_rabbit: 0, sense_bear: 1, sense_fox: 0, sense_bird: 0,
    },
    render: { baseBody: 'power', primaryColor: '#E87040', secondaryColor: '#FFF5E1', earType: 'round_small', tailType: 'cat_long', eyeColor: '#D4A017', markings: 'tiger_stripes' },
  },
  {
    id: 'wolf', name: '狼', category: 'power',
    description: '孤傲的独行者，月下嚎叫的深情灵魂',
    tags: {
      eye_round: 0, eye_fox: 1, eye_droop: 0, eye_sharp: 3,
      face_round: 0, face_pointed: 2, face_square: 1, face_oval: 0,
      vibe_cute: 0, vibe_cool: 3, vibe_sunny: 0, vibe_sexy: 2, vibe_gentle: 0,
      personality_social: 0, personality_quiet: 2, personality_gap: 2, personality_leader: 3, personality_silly: 0, personality_cunning: 2, personality_tsundere: 2, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 2, height_large: 2,
      sense_cat: 0, sense_dog: 2, sense_rabbit: 0, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'power', primaryColor: '#696969', secondaryColor: '#A9A9A9', earType: 'triangle_up', tailType: 'long_down', eyeColor: '#B0C4DE', markings: 'wolf_face' },
  },
  {
    id: 'snow_leopard', name: '雪豹', category: 'power',
    description: '雪山上的孤独美人，冷艳高贵的稀有存在',
    tags: {
      eye_round: 0, eye_fox: 1, eye_droop: 0, eye_sharp: 3,
      face_round: 1, face_pointed: 0, face_square: 1, face_oval: 2,
      vibe_cute: 0, vibe_cool: 3, vibe_sunny: 0, vibe_sexy: 2, vibe_gentle: 0,
      personality_social: 0, personality_quiet: 3, personality_gap: 1, personality_leader: 1, personality_silly: 0, personality_cunning: 2, personality_tsundere: 2, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 3, height_large: 1,
      sense_cat: 3, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 1, sense_bird: 0,
    },
    render: { baseBody: 'power', primaryColor: '#C8C8C8', secondaryColor: '#FFFFFF', earType: 'round_small', tailType: 'fluffy_long', eyeColor: '#87CEEB', markings: 'leopard_spots' },
  },
  {
    id: 'crane', name: '鹤', category: 'power',
    description: '优雅高挑的舞者，每个动作都是一幅画',
    tags: {
      eye_round: 0, eye_fox: 0, eye_droop: 0, eye_sharp: 2,
      face_round: 0, face_pointed: 2, face_square: 0, face_oval: 2,
      vibe_cute: 0, vibe_cool: 1, vibe_sunny: 0, vibe_sexy: 0, vibe_gentle: 3,
      personality_social: 0, personality_quiet: 3, personality_gap: 0, personality_leader: 1, personality_silly: 0, personality_cunning: 0, personality_tsundere: 0, personality_dramatic: 0,
      height_small: 0, height_medium: 0, height_tall: 3, height_large: 1,
      sense_cat: 0, sense_dog: 0, sense_rabbit: 0, sense_bear: 0, sense_fox: 0, sense_bird: 3,
    },
    render: { baseBody: 'power', primaryColor: '#FFFFFF', secondaryColor: '#1A1A1A', earType: 'none', tailType: 'tail_feathers', eyeColor: '#1A1A1A', markings: 'crane_crown' },
  },
];

// 分类名称映射
const CATEGORY_NAMES = {
  dog: '犬类',
  cat: '猫类',
  small: '小动物',
  wild: '野生萌系',
  bird: '禽鸟类',
  power: '气场系',
};

const CATEGORY_ORDER = ['dog', 'cat', 'small', 'wild', 'bird', 'power'];

function getAnimalById(id) {
  return ANIMALS.find(a => a.id === id);
}

function getAnimalsByCategory(cat) {
  return ANIMALS.filter(a => a.category === cat);
}
