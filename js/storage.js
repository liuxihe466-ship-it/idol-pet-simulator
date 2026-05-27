// storage.js — LocalStorage 数据管理
const Storage = {
  KEYS: {
    PETS: 'idol_pets',
    CHECKIN: 'idol_checkin',
    SETTINGS: 'idol_settings',
    SLOTS: 'idol_slots',
  },

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn('Storage load failed:', e);
      return fallback;
    }
  },

  // 宠物相关
  getPets() {
    return this.load(this.KEYS.PETS, []);
  },

  savePets(pets) {
    this.save(this.KEYS.PETS, pets);
  },

  addPet(pet) {
    const pets = this.getPets();
    pets.push(pet);
    this.savePets(pets);
    return pet;
  },

  updatePet(petId, updates) {
    const pets = this.getPets();
    const idx = pets.findIndex(p => p.id === petId);
    if (idx !== -1) {
      Object.assign(pets[idx], updates);
      this.savePets(pets);
      return pets[idx];
    }
    return null;
  },

  deletePet(petId) {
    const pets = this.getPets().filter(p => p.id !== petId);
    this.savePets(pets);
  },

  // 签到相关
  getCheckin() {
    return this.load(this.KEYS.CHECKIN, {
      history: [],
      consecutiveDays: 0,
      totalStars: 0,
      lastCheckin: null,
      unlockedRewards: [],
    });
  },

  saveCheckin(data) {
    this.save(this.KEYS.CHECKIN, data);
  },

  // 槽位解锁
  getUnlockedSlots() {
    return this.load(this.KEYS.SLOTS, 1);
  },

  saveUnlockedSlots(n) {
    this.save(this.KEYS.SLOTS, n);
  },

  // 设置
  getSettings() {
    return this.load(this.KEYS.SETTINGS, {
      soundEnabled: true,
      bgmEnabled: true,
      volume: 0.5,
    });
  },

  saveSettings(settings) {
    this.save(this.KEYS.SETTINGS, settings);
  },

  // 生成唯一ID
  uuid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  },
};
