// share.js — 截图分享功能
const ShareCard = (() => {
  function generate(petId) {
    const pets = Storage.getPets();
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;
    const animal = getAnimalById(pet.animalId);

    // 创建弹窗
    let overlay = document.getElementById('share-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'share-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="share-box">
        <h3 class="share-title">分享卡片</h3>
        <canvas id="share-canvas" width="400" height="500"></canvas>
        <div class="share-buttons">
          <button class="pixel-btn" id="share-download">保存图片</button>
          <button class="pixel-btn share-close-btn" id="share-close">关闭</button>
        </div>
      </div>`;

    overlay.style.display = 'flex';

    const canvas = document.getElementById('share-canvas');
    PixelRenderer.drawShareCard(canvas, pet, animal);

    document.getElementById('share-download').addEventListener('click', () => {
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${pet.nickname}_Lv${pet.level}.png`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('图片已保存！');
      });
    });

    document.getElementById('share-close').addEventListener('click', () => {
      overlay.style.display = 'none';
    });
  }

  return { generate };
})();
