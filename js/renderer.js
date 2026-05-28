// renderer.js — Canvas 像素动物渲染器
const PixelRenderer = (() => {
  const PX = 4; // 每个像素点的实际大小

  // 颜色工具
  function darken(hex, amount = 30) {
    const c = hexToRgb(hex);
    return rgbToHex(Math.max(0, c.r - amount), Math.max(0, c.g - amount), Math.max(0, c.b - amount));
  }
  function lighten(hex, amount = 30) {
    const c = hexToRgb(hex);
    return rgbToHex(Math.min(255, c.r + amount), Math.min(255, c.g + amount), Math.min(255, c.b + amount));
  }
  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  // 基础绘制：一个像素点
  function px(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * PX, y * PX, PX, PX);
  }

  // 绘制矩形区域
  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * PX, y * PX, w * PX, h * PX);
  }

  // 绘制椭圆（像素化）
  function ellipse(ctx, cx, cy, rx, ry, color) {
    for (let y = -ry; y <= ry; y++) {
      for (let x = -rx; x <= rx; x++) {
        if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) {
          px(ctx, cx + x, cy + y, color);
        }
      }
    }
  }

  // ===== 身体模板 =====
  // 每个模板返回绘制函数，接受 (ctx, colors, stage, frame)
  // stage: 1-5 对应宝宝→传说
  // frame: 动画帧号

  const bodyTemplates = {
    dog(ctx, colors, stage, anim, frame, offsetY) {
      const s = stageScale(stage);
      const headSize = Math.round(5 * s.head);
      const bodyW = Math.round(7 * s.body);
      const bodyH = Math.round(5 * s.body);
      const baseY = 20 + offsetY;
      const baseX = 16;

      // 身体
      ellipse(ctx, baseX, baseY + 2, bodyW >> 1, bodyH >> 1, colors.primary);
      // 肚子
      ellipse(ctx, baseX, baseY + 3, (bodyW >> 1) - 1, (bodyH >> 1) - 1, colors.secondary);
      // 头
      const headY = baseY - bodyH + 2 + (anim === 'eat' ? 2 : 0);
      ellipse(ctx, baseX, headY, headSize >> 1, headSize >> 1, colors.primary);
      // 脸部浅色
      ellipse(ctx, baseX, headY + 1, (headSize >> 1) - 1, (headSize >> 1) - 1, colors.secondary);
      // 眼睛
      const eyeOff = Math.max(1, headSize >> 2);
      if (anim !== 'sleep') {
        px(ctx, baseX - eyeOff, headY - 1, colors.eye);
        px(ctx, baseX + eyeOff, headY - 1, colors.eye);
      } else {
        rect(ctx, baseX - eyeOff - 1, headY - 1, 2, 1, colors.eye);
        rect(ctx, baseX + eyeOff, headY - 1, 2, 1, colors.eye);
      }
      // 鼻子
      px(ctx, baseX, headY + 1, '#1A1A1A');
      // 嘴巴
      if (anim === 'eat' || anim === 'happy') {
        px(ctx, baseX - 1, headY + 2, '#FF6B6B');
        px(ctx, baseX, headY + 2, '#FF6B6B');
        px(ctx, baseX + 1, headY + 2, '#FF6B6B');
      }
      // 腿
      const legY = baseY + (bodyH >> 1);
      rect(ctx, baseX - (bodyW >> 2) - 1, legY, 2, 3, colors.primary);
      rect(ctx, baseX + (bodyW >> 2), legY, 2, 3, colors.primary);

      return { headX: baseX, headY, baseY };
    },

    cat(ctx, colors, stage, anim, frame, offsetY) {
      const s = stageScale(stage);
      const headSize = Math.round(5 * s.head);
      const bodyW = Math.round(6 * s.body);
      const bodyH = Math.round(5 * s.body);
      const baseY = 20 + offsetY;
      const baseX = 16;

      // 身体（更修长）
      ellipse(ctx, baseX, baseY + 2, (bodyW >> 1), (bodyH >> 1) - 1, colors.primary);
      // 头
      const headY = baseY - bodyH + 3 + (anim === 'eat' ? 2 : 0);
      ellipse(ctx, baseX, headY, headSize >> 1, (headSize >> 1), colors.primary);
      // 脸部
      ellipse(ctx, baseX, headY + 1, (headSize >> 1) - 1, (headSize >> 1) - 1, lighten(colors.primary, 15));
      // 猫耳
      const earW = Math.max(2, headSize >> 2);
      for (let i = 0; i < earW; i++) {
        rect(ctx, baseX - (headSize >> 1) + i, headY - (headSize >> 1) - earW + i, 1, 1, colors.primary);
        rect(ctx, baseX + (headSize >> 1) - i, headY - (headSize >> 1) - earW + i, 1, 1, colors.primary);
      }
      // 内耳
      px(ctx, baseX - (headSize >> 1) + 1, headY - (headSize >> 1) - earW + 2, '#FFB6C1');
      px(ctx, baseX + (headSize >> 1) - 1, headY - (headSize >> 1) - earW + 2, '#FFB6C1');
      // 眼睛
      const eyeOff = Math.max(1, headSize >> 2);
      if (anim !== 'sleep') {
        px(ctx, baseX - eyeOff, headY - 1, colors.eye);
        px(ctx, baseX + eyeOff, headY - 1, colors.eye);
        // 猫瞳孔竖线
        px(ctx, baseX - eyeOff, headY, darken(colors.eye, 20));
        px(ctx, baseX + eyeOff, headY, darken(colors.eye, 20));
      } else {
        rect(ctx, baseX - eyeOff - 1, headY, 3, 1, colors.eye);
        rect(ctx, baseX + eyeOff - 1, headY, 3, 1, colors.eye);
      }
      // 鼻子+嘴
      px(ctx, baseX, headY + 1, '#FFB6C1');
      if (anim === 'happy') {
        px(ctx, baseX - 1, headY + 2, '#FF6B6B');
        px(ctx, baseX + 1, headY + 2, '#FF6B6B');
      }
      // 胡须
      rect(ctx, baseX - eyeOff - 3, headY + 1, 2, 1, darken(colors.primary, 40));
      rect(ctx, baseX + eyeOff + 2, headY + 1, 2, 1, darken(colors.primary, 40));
      // 腿
      const legY = baseY + (bodyH >> 1);
      rect(ctx, baseX - (bodyW >> 2), legY - 1, 2, 3, colors.primary);
      rect(ctx, baseX + (bodyW >> 2) - 1, legY - 1, 2, 3, colors.primary);
      // 尾巴
      const tailX = baseX + (bodyW >> 1);
      rect(ctx, tailX, baseY, 1, 1, colors.primary);
      rect(ctx, tailX + 1, baseY - 1, 1, 1, colors.primary);
      rect(ctx, tailX + 2, baseY - 2, 1, 1, colors.primary);

      return { headX: baseX, headY, baseY };
    },

    small(ctx, colors, stage, anim, frame, offsetY) {
      const s = stageScale(stage);
      const headSize = Math.round(6 * s.head);
      const bodyW = Math.round(5 * s.body);
      const bodyH = Math.round(4 * s.body);
      const baseY = 21 + offsetY;
      const baseX = 16;

      // 身体（圆滚滚）
      ellipse(ctx, baseX, baseY + 1, bodyW >> 1, bodyH >> 1, colors.primary);
      ellipse(ctx, baseX, baseY + 2, (bodyW >> 1) - 1, (bodyH >> 1) - 1, colors.secondary);
      // 头（大大的）
      const headY = baseY - bodyH + 3 + (anim === 'eat' ? 1 : 0);
      ellipse(ctx, baseX, headY, headSize >> 1, headSize >> 1, colors.primary);
      // 脸
      ellipse(ctx, baseX, headY + 1, (headSize >> 1) - 1, (headSize >> 1), colors.secondary);
      // 眼睛（大圆眼）
      const eyeOff = Math.max(2, headSize >> 2);
      if (anim !== 'sleep') {
        px(ctx, baseX - eyeOff, headY, colors.eye);
        px(ctx, baseX - eyeOff, headY - 1, colors.eye);
        px(ctx, baseX + eyeOff, headY, colors.eye);
        px(ctx, baseX + eyeOff, headY - 1, colors.eye);
        // 高光
        px(ctx, baseX - eyeOff + 1, headY - 1, '#FFFFFF');
        px(ctx, baseX + eyeOff + 1, headY - 1, '#FFFFFF');
      } else {
        rect(ctx, baseX - eyeOff - 1, headY, 3, 1, colors.eye);
        rect(ctx, baseX + eyeOff - 1, headY, 3, 1, colors.eye);
      }
      // 鼻子
      px(ctx, baseX, headY + 1, '#FFB6C1');
      // 腮红
      px(ctx, baseX - eyeOff - 1, headY + 1, '#FFD1DC');
      px(ctx, baseX + eyeOff + 1, headY + 1, '#FFD1DC');
      // 小脚
      const legY = baseY + (bodyH >> 1);
      px(ctx, baseX - 2, legY, darken(colors.primary, 20));
      px(ctx, baseX + 2, legY, darken(colors.primary, 20));

      return { headX: baseX, headY, baseY };
    },

    wild(ctx, colors, stage, anim, frame, offsetY) {
      const s = stageScale(stage);
      const headSize = Math.round(5 * s.head);
      const bodyW = Math.round(6 * s.body);
      const bodyH = Math.round(5 * s.body);
      const baseY = 20 + offsetY;
      const baseX = 16;

      // 身体
      ellipse(ctx, baseX, baseY + 2, bodyW >> 1, bodyH >> 1, colors.primary);
      ellipse(ctx, baseX, baseY + 3, (bodyW >> 1) - 1, (bodyH >> 1) - 1, colors.secondary);
      // 头
      const headY = baseY - bodyH + 3 + (anim === 'eat' ? 2 : 0);
      ellipse(ctx, baseX, headY, headSize >> 1, (headSize >> 1) + 1, colors.primary);
      ellipse(ctx, baseX, headY + 1, (headSize >> 1) - 1, headSize >> 1, colors.secondary);
      // 眼睛
      const eyeOff = Math.max(1, headSize >> 2);
      if (anim !== 'sleep') {
        px(ctx, baseX - eyeOff, headY - 1, colors.eye);
        px(ctx, baseX + eyeOff, headY - 1, colors.eye);
        px(ctx, baseX - eyeOff, headY, colors.eye);
        px(ctx, baseX + eyeOff, headY, colors.eye);
      } else {
        rect(ctx, baseX - eyeOff - 1, headY, 2, 1, colors.eye);
        rect(ctx, baseX + eyeOff, headY, 2, 1, colors.eye);
      }
      // 鼻子
      px(ctx, baseX, headY + 1, '#1A1A1A');
      // 嘴
      if (anim === 'happy' || anim === 'eat') {
        px(ctx, baseX, headY + 2, '#FF6B6B');
      }
      // 耳朵（尖耳）
      px(ctx, baseX - (headSize >> 1), headY - (headSize >> 1), colors.primary);
      px(ctx, baseX - (headSize >> 1) + 1, headY - (headSize >> 1) - 1, colors.primary);
      px(ctx, baseX + (headSize >> 1), headY - (headSize >> 1), colors.primary);
      px(ctx, baseX + (headSize >> 1) - 1, headY - (headSize >> 1) - 1, colors.primary);
      // 腿
      const legY = baseY + (bodyH >> 1);
      rect(ctx, baseX - (bodyW >> 2), legY, 2, 2, colors.primary);
      rect(ctx, baseX + (bodyW >> 2) - 1, legY, 2, 2, colors.primary);
      // 尾巴
      rect(ctx, baseX + (bodyW >> 1), baseY, 1, 1, colors.primary);
      rect(ctx, baseX + (bodyW >> 1) + 1, baseY - 1, 1, 2, colors.primary);

      return { headX: baseX, headY, baseY };
    },

    bird(ctx, colors, stage, anim, frame, offsetY) {
      const s = stageScale(stage);
      const headSize = Math.round(5 * s.head);
      const bodyW = Math.round(5 * s.body);
      const bodyH = Math.round(5 * s.body);
      const baseY = 20 + offsetY;
      const baseX = 16;

      // 身体（圆润）
      ellipse(ctx, baseX, baseY + 1, bodyW >> 1, bodyH >> 1, colors.primary);
      // 肚子
      ellipse(ctx, baseX, baseY + 2, (bodyW >> 1) - 1, (bodyH >> 1) - 1, colors.secondary);
      // 头
      const headY = baseY - bodyH + 3 + (anim === 'eat' ? 1 : 0);
      ellipse(ctx, baseX, headY, headSize >> 1, headSize >> 1, colors.primary);
      // 眼睛
      const eyeOff = Math.max(1, headSize >> 2);
      if (anim !== 'sleep') {
        px(ctx, baseX - eyeOff, headY - 1, colors.eye);
        px(ctx, baseX + eyeOff, headY - 1, colors.eye);
      } else {
        rect(ctx, baseX - eyeOff - 1, headY - 1, 2, 1, colors.eye);
        rect(ctx, baseX + eyeOff, headY - 1, 2, 1, colors.eye);
      }
      // 喙
      px(ctx, baseX, headY + 1, '#FF9800');
      px(ctx, baseX + 1, headY + 1, '#FF9800');
      if (anim === 'eat') {
        px(ctx, baseX, headY + 2, '#FF9800');
      }
      // 翅膀
      const wingY = baseY;
      rect(ctx, baseX - (bodyW >> 1) - 1, wingY, 1, 2, darken(colors.primary, 20));
      rect(ctx, baseX + (bodyW >> 1) + 1, wingY, 1, 2, darken(colors.primary, 20));
      if (anim === 'play' || anim === 'happy') {
        rect(ctx, baseX - (bodyW >> 1) - 2, wingY - 1, 1, 2, darken(colors.primary, 20));
        rect(ctx, baseX + (bodyW >> 1) + 2, wingY - 1, 1, 2, darken(colors.primary, 20));
      }
      // 脚
      const legY = baseY + (bodyH >> 1);
      px(ctx, baseX - 1, legY, '#FF9800');
      px(ctx, baseX + 1, legY, '#FF9800');
      px(ctx, baseX - 2, legY + 1, '#FF9800');
      px(ctx, baseX + 2, legY + 1, '#FF9800');

      return { headX: baseX, headY, baseY };
    },

    power(ctx, colors, stage, anim, frame, offsetY) {
      const s = stageScale(stage);
      const headSize = Math.round(5 * s.head);
      const bodyW = Math.round(7 * s.body);
      const bodyH = Math.round(6 * s.body);
      const baseY = 19 + offsetY;
      const baseX = 16;

      // 身体（壮实）
      ellipse(ctx, baseX, baseY + 2, bodyW >> 1, bodyH >> 1, colors.primary);
      ellipse(ctx, baseX, baseY + 3, (bodyW >> 1) - 1, (bodyH >> 1) - 1, colors.secondary);
      // 头
      const headY = baseY - bodyH + 3 + (anim === 'eat' ? 2 : 0);
      ellipse(ctx, baseX, headY, (headSize >> 1) + 1, headSize >> 1, colors.primary);
      // 眼睛（锐利）
      const eyeOff = Math.max(2, headSize >> 2);
      if (anim !== 'sleep') {
        px(ctx, baseX - eyeOff, headY - 1, colors.eye);
        px(ctx, baseX - eyeOff - 1, headY - 1, colors.eye);
        px(ctx, baseX + eyeOff, headY - 1, colors.eye);
        px(ctx, baseX + eyeOff + 1, headY - 1, colors.eye);
      } else {
        rect(ctx, baseX - eyeOff - 1, headY, 3, 1, colors.eye);
        rect(ctx, baseX + eyeOff - 1, headY, 3, 1, colors.eye);
      }
      // 鼻子
      px(ctx, baseX, headY + 1, '#1A1A1A');
      px(ctx, baseX - 1, headY + 1, '#1A1A1A');
      // 嘴
      if (anim === 'happy' || anim === 'eat') {
        rect(ctx, baseX - 1, headY + 2, 3, 1, '#FF6B6B');
      }
      // 耳朵
      px(ctx, baseX - (headSize >> 1) - 1, headY - (headSize >> 1), colors.primary);
      px(ctx, baseX + (headSize >> 1) + 1, headY - (headSize >> 1), colors.primary);
      // 腿（粗壮）
      const legY = baseY + (bodyH >> 1) - 1;
      rect(ctx, baseX - (bodyW >> 2) - 1, legY, 3, 3, colors.primary);
      rect(ctx, baseX + (bodyW >> 2) - 1, legY, 3, 3, colors.primary);
      // 尾巴
      rect(ctx, baseX + (bodyW >> 1), baseY + 1, 2, 1, colors.primary);
      px(ctx, baseX + (bodyW >> 1) + 2, baseY, colors.primary);

      return { headX: baseX, headY, baseY };
    },
  };

  function stageScale(stage) {
    const scales = [
      { head: 1.2, body: 0.7 },  // 宝宝 Lv1-3
      { head: 1.1, body: 0.85 }, // 成长 Lv4-6
      { head: 1.0, body: 1.0 },  // 成熟 Lv7-9
      { head: 1.0, body: 1.05 }, // 明星 Lv10-12
      { head: 1.0, body: 1.1 },  // 传说 Lv13-15
    ];
    return scales[Math.min(stage - 1, 4)];
  }

  function getStageFromLevel(level) {
    if (level <= 3) return 1;
    if (level <= 6) return 2;
    if (level <= 9) return 3;
    if (level <= 12) return 4;
    return 5;
  }

  // 动画偏移
  function getAnimOffset(anim, frame) {
    switch (anim) {
      case 'idle': return Math.sin(frame * 0.15) * 0.5;
      case 'eat': return 1;
      case 'play': return -Math.abs(Math.sin(frame * 0.3)) * 3;
      case 'sleep': return 2;
      case 'happy': return -Math.abs(Math.sin(frame * 0.4)) * 2;
      case 'sad': return 1;
      default: return 0;
    }
  }

  // 特效
  function drawEffects(ctx, anim, frame, stage, headX, headY) {
    // 明星阶段光效
    if (stage >= 4) {
      const sparkleFrame = frame % 40;
      if (sparkleFrame < 10) {
        const sx = headX + Math.cos(frame * 0.2) * 8;
        const sy = headY - 5 + Math.sin(frame * 0.3) * 3;
        px(ctx, Math.round(sx), Math.round(sy), '#FFD700');
      }
    }
    // 传说阶段光环
    if (stage >= 5) {
      const haloY = headY - 5;
      for (let i = -3; i <= 3; i++) {
        const alpha = Math.abs(i) < 2 ? '#FFD700' : '#FFF8DC';
        px(ctx, headX + i, haloY, alpha);
      }
    }
    // 动画特效
    if (anim === 'happy') {
      // 爱心
      const hf = frame % 30;
      if (hf < 15) {
        const hy = headY - 6 - (hf >> 2);
        px(ctx, headX + 4, hy, '#FF6B6B');
        px(ctx, headX + 5, hy, '#FF6B6B');
        px(ctx, headX + 3, hy + 1, '#FF6B6B');
        px(ctx, headX + 6, hy + 1, '#FF6B6B');
        px(ctx, headX + 4, hy + 2, '#FF6B6B');
        px(ctx, headX + 5, hy + 2, '#FF6B6B');
      }
    }
    if (anim === 'sad') {
      // 雨滴
      const rf = frame % 20;
      if (rf < 10) {
        px(ctx, headX - 2, headY - 4 + rf, '#87CEEB');
        px(ctx, headX + 3, headY - 6 + rf, '#87CEEB');
      }
    }
    if (anim === 'sleep') {
      // zzZ
      const zf = (frame >> 3) % 3;
      const zx = headX + 4;
      const zy = headY - 4;
      ctx.fillStyle = '#A0A0A0';
      if (zf >= 0) { ctx.fillRect((zx) * PX, (zy) * PX, PX * 2, PX); }
      if (zf >= 1) { ctx.fillRect((zx + 2) * PX, (zy - 2) * PX, PX * 2, PX); }
      if (zf >= 2) { ctx.fillRect((zx + 4) * PX, (zy - 4) * PX, PX * 3, PX); }
    }
  }

  // 装饰品渲染
  function drawDecoration(ctx, itemId, headX, headY, baseY) {
    const decorations = {
      bib_pink: (ctx) => {
        rect(ctx, headX - 2, headY + 3, 5, 2, '#FFB6C1');
        rect(ctx, headX - 1, headY + 5, 3, 1, '#FFB6C1');
      },
      bib_blue: (ctx) => {
        rect(ctx, headX - 2, headY + 3, 5, 2, '#87CEEB');
        rect(ctx, headX - 1, headY + 5, 3, 1, '#87CEEB');
      },
      bib_yellow: (ctx) => {
        rect(ctx, headX - 2, headY + 3, 5, 2, '#FFE4B5');
        rect(ctx, headX - 1, headY + 5, 3, 1, '#FFE4B5');
      },
      bib_purple: (ctx) => {
        rect(ctx, headX - 2, headY + 3, 5, 2, '#B088D0');
        rect(ctx, headX - 1, headY + 5, 3, 1, '#B088D0');
      },
      bow: (ctx) => {
        px(ctx, headX, headY - 4, '#FF6B6B');
        px(ctx, headX - 1, headY - 5, '#FF6B6B');
        px(ctx, headX + 1, headY - 5, '#FF6B6B');
        px(ctx, headX - 2, headY - 4, '#FF6B6B');
        px(ctx, headX + 2, headY - 4, '#FF6B6B');
      },
      hairpin_flower: (ctx) => {
        px(ctx, headX - 3, headY - 3, '#FF69B4');
        px(ctx, headX - 4, headY - 4, '#FF69B4');
        px(ctx, headX - 2, headY - 4, '#FF69B4');
        px(ctx, headX - 3, headY - 5, '#FF69B4');
        px(ctx, headX - 3, headY - 4, '#FFD700');
      },
      hairpin_star: (ctx) => {
        px(ctx, headX - 3, headY - 4, '#FFD700');
        px(ctx, headX - 4, headY - 3, '#FFD700');
        px(ctx, headX - 2, headY - 3, '#FFD700');
        px(ctx, headX - 3, headY - 2, '#FFD700');
        px(ctx, headX - 3, headY - 5, '#FFD700');
      },
      hairpin_heart: (ctx) => {
        px(ctx, headX + 3, headY - 4, '#FF6B6B');
        px(ctx, headX + 2, headY - 5, '#FF6B6B');
        px(ctx, headX + 4, headY - 5, '#FF6B6B');
        px(ctx, headX + 3, headY - 3, '#FF6B6B');
      },
      hairpin_ribbon: (ctx) => {
        rect(ctx, headX - 4, headY - 4, 2, 1, '#9370DB');
        rect(ctx, headX - 3, headY - 3, 1, 2, '#9370DB');
      },
      hairpin_crown_mini: (ctx) => {
        px(ctx, headX - 3, headY - 4, '#FFD700');
        px(ctx, headX - 2, headY - 3, '#FFD700');
        px(ctx, headX - 4, headY - 3, '#FFD700');
      },
      scarf: (ctx) => {
        rect(ctx, headX - 3, headY + 2, 7, 1, '#FF4444');
        rect(ctx, headX - 3, headY + 3, 2, 2, '#FF4444');
        px(ctx, headX - 3, headY + 5, '#CC3333');
      },
      sunglasses: (ctx) => {
        rect(ctx, headX - 3, headY - 2, 3, 2, '#1A1A1A');
        rect(ctx, headX + 1, headY - 2, 3, 2, '#1A1A1A');
        px(ctx, headX, headY - 2, '#1A1A1A');
      },
      hat: (ctx) => {
        rect(ctx, headX - 4, headY - 5, 9, 1, '#4A4A4A');
        rect(ctx, headX - 3, headY - 7, 7, 2, '#4A4A4A');
      },
      cheer_banner: (ctx) => {
        rect(ctx, headX + 5, headY - 2, 1, 6, '#8B4513');
        rect(ctx, headX + 5, headY - 2, 4, 3, '#FF69B4');
        px(ctx, headX + 6, headY - 1, '#FFFFFF');
      },
      crown: (ctx) => {
        rect(ctx, headX - 3, headY - 5, 7, 2, '#FFD700');
        px(ctx, headX - 3, headY - 6, '#FFD700');
        px(ctx, headX, headY - 6, '#FFD700');
        px(ctx, headX + 3, headY - 6, '#FFD700');
        px(ctx, headX - 2, headY - 7, '#FF6B6B');
        px(ctx, headX + 2, headY - 7, '#87CEEB');
        px(ctx, headX, headY - 7, '#FFD700');
      },
      veil: (ctx) => {
        rect(ctx, headX - 3, headY - 5, 7, 1, '#FFFFFF');
        for (let i = -4; i <= 4; i++) {
          const vy = headY - 4 + Math.abs(i);
          px(ctx, headX + i, vy, 'rgba(255,255,255,0.7)');
          px(ctx, headX + i, vy + 1, 'rgba(255,255,255,0.5)');
        }
      },
      glowstick: (ctx) => {
        const colors = ['#FF6B6B', '#FFD700', '#87CEEB', '#98FB98'];
        const c = colors[(Date.now() >> 8) % colors.length];
        rect(ctx, headX + 5, headY, 1, 5, '#CCCCCC');
        rect(ctx, headX + 5, headY - 2, 1, 2, c);
        px(ctx, headX + 4, headY - 3, c);
        px(ctx, headX + 6, headY - 3, c);
      },
      microphone: (ctx) => {
        rect(ctx, headX + 4, headY + 1, 1, 4, '#808080');
        ellipse(ctx, headX + 4, headY, 1, 1, '#333333');
      },
      wings: (ctx) => {
        for (let i = 0; i < 4; i++) {
          px(ctx, headX - 6 - i, baseY - 1 + i, 'rgba(255,255,255,0.8)');
          px(ctx, headX + 6 + i, baseY - 1 + i, 'rgba(255,255,255,0.8)');
          px(ctx, headX - 5 - i, baseY + i, 'rgba(255,255,255,0.6)');
          px(ctx, headX + 5 + i, baseY + i, 'rgba(255,255,255,0.6)');
        }
      },
      stage_bg: (ctx) => {
        // 底部舞台
        rect(ctx, 0, 28, 32, 4, '#4A3580');
        rect(ctx, 0, 29, 32, 1, '#6B4DAA');
        // 灯光
        const lf = (Date.now() >> 9) % 4;
        px(ctx, 4 + lf * 7, 1, '#FFD700');
        px(ctx, 4 + lf * 7, 2, '#FFD70080');
      },
      rainbow_scarf: (ctx) => {
        const rainbow = ['#FF6B6B', '#FFD700', '#98FB98', '#87CEEB', '#9370DB'];
        rainbow.forEach((c, i) => {
          px(ctx, headX - 3, headY + 2 + i, c);
          px(ctx, headX - 2, headY + 2 + i, c);
        });
      },
      star_headband: (ctx) => {
        rect(ctx, headX - 4, headY - 4, 9, 1, '#9370DB');
        px(ctx, headX - 2, headY - 5, '#FFD700');
        px(ctx, headX + 2, headY - 5, '#FFD700');
        px(ctx, headX, headY - 6, '#FFD700');
      },
      legend_stick: (ctx) => {
        rect(ctx, headX + 5, headY, 1, 5, '#DAA520');
        const c = ['#FF6B6B', '#FFD700', '#FF69B4'][(Date.now() >> 7) % 3];
        px(ctx, headX + 4, headY - 1, c);
        px(ctx, headX + 5, headY - 2, c);
        px(ctx, headX + 6, headY - 1, c);
        px(ctx, headX + 5, headY - 1, '#FFFFFF');
      },
    };

    if (decorations[itemId]) {
      decorations[itemId](ctx);
    }
  }

  // 主渲染函数
  // 奶牛猫花纹
  function drawTuxedoMarkings(ctx, pos, colors, stage, anim) {
    const black = '#1A1A1A';
    const s = stageScale(stage);
    const bodyW = Math.round(6 * s.body);
    const bodyH = Math.round(5 * s.body);
    const headSize = Math.round(5 * s.head);
    const hx = pos.headX;
    const hy = pos.headY;
    const by = pos.baseY;
    const hr = headSize >> 1;
    const eyeOff = Math.max(1, headSize >> 2);

    // === 头部 ===
    // 头顶黑色（上半圆覆盖）
    for (let dy = -hr; dy <= -1; dy++) {
      const rowW = Math.round(Math.sqrt(hr * hr - dy * dy));
      for (let dx = -rowW; dx <= rowW; dx++) {
        px(ctx, hx + dx, hy + dy, black);
      }
    }
    // 额头中间留一撮白（奶牛特征）
    px(ctx, hx, hy - 1, '#FFFFFF');
    px(ctx, hx + 1, hy - 1, '#FFFFFF');

    // 耳朵黑色
    const earW = Math.max(2, headSize >> 2);
    for (let i = 0; i < earW; i++) {
      rect(ctx, hx - hr + i, hy - hr - earW + i, 1, 1, black);
      rect(ctx, hx + hr - i, hy - hr - earW + i, 1, 1, black);
    }
    px(ctx, hx - hr + 1, hy - hr - earW + 2, '#FFB6C1');
    px(ctx, hx + hr - 1, hy - hr - earW + 2, '#FFB6C1');

    // 重绘眼睛（保证可见）
    if (anim !== 'sleep') {
      px(ctx, hx - eyeOff, hy - 1, colors.eye);
      px(ctx, hx + eyeOff, hy - 1, colors.eye);
      px(ctx, hx - eyeOff, hy, darken(colors.eye, 20));
      px(ctx, hx + eyeOff, hy, darken(colors.eye, 20));
    }

    // 鼻子重绘
    px(ctx, hx, hy + 1, '#FFB6C1');

    // 胡须用深灰（白底上可见）
    rect(ctx, hx - eyeOff - 3, hy + 1, 2, 1, '#555555');
    rect(ctx, hx + eyeOff + 2, hy + 1, 2, 1, '#555555');

    // 脸颊轮廓（白底需要淡灰勾边）
    px(ctx, hx - hr, hy, '#DDDDDD');
    px(ctx, hx + hr, hy, '#DDDDDD');
    px(ctx, hx - hr, hy + 1, '#DDDDDD');
    px(ctx, hx + hr, hy + 1, '#DDDDDD');

    // === 身体 ===
    const bw2 = bodyW >> 1;
    const bh2 = (bodyH >> 1) - 1;
    // 背部黑色（身体上半部分）
    for (let dy = -bh2; dy <= 0; dy++) {
      const rowW = Math.round(bw2 * Math.sqrt(1 - (dy * dy) / (bh2 * bh2)));
      for (let dx = -rowW; dx <= rowW; dx++) {
        px(ctx, hx + dx, by + 2 + dy, black);
      }
    }
    // 肚皮保持白色（下半部分已经是白色）

    // 右侧身体额外斑块（不对称，更像奶牛）
    px(ctx, hx + bw2 - 1, by + 2, black);
    px(ctx, hx + bw2 - 1, by + 3, black);

    // === 腿 ===
    const legY = by + (bodyH >> 1);
    // 左腿黑色
    rect(ctx, hx - (bodyW >> 2), legY - 1, 2, 3, black);
    // 右腿白色保留，加灰色轮廓
    rect(ctx, hx + (bodyW >> 2) - 1, legY + 1, 2, 1, '#DDDDDD');

    // === 尾巴黑色 ===
    const tailX = hx + bw2;
    rect(ctx, tailX, by, 1, 1, black);
    rect(ctx, tailX + 1, by - 1, 1, 1, black);
    rect(ctx, tailX + 2, by - 2, 1, 1, black);
    rect(ctx, tailX + 2, by - 3, 1, 1, black);
  }

  function drawAnimal(canvas, animalId, level, anim, frame, equippedItems) {
    const animal = getAnimalById(animalId);
    if (!animal) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // 缩放
    const scale = w / (32 * PX);
    ctx.save();
    ctx.clearRect(0, 0, w, h);
    ctx.scale(scale, scale);

    // 动物颜色
    const colors = {
      primary: animal.render.primaryColor,
      secondary: animal.render.secondaryColor,
      eye: animal.render.eyeColor,
    };

    const stage = getStageFromLevel(level || 1);
    const offsetY = Math.round(getAnimOffset(anim, frame));

    // 获取并调用对应骨架
    const bodyType = animal.render.baseBody;
    const template = bodyTemplates[bodyType] || bodyTemplates.wild;
    const pos = template(ctx, colors, stage, anim, frame, offsetY);

    // 特殊花纹
    if (animal.render.markings === 'tuxedo') {
      drawTuxedoMarkings(ctx, pos, colors, stage, anim);
    }

    // 特效
    drawEffects(ctx, anim, frame, stage, pos.headX, pos.headY);

    // 装饰品
    if (equippedItems && equippedItems.length > 0) {
      equippedItems.forEach(itemId => {
        drawDecoration(ctx, itemId, pos.headX, pos.headY, pos.baseY);
      });
    }

    ctx.restore();
  }

  // 绘制分享卡片
  function drawShareCard(canvas, pet, animal) {
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 500;

    // 背景
    ctx.fillStyle = '#FFF0F5';
    ctx.fillRect(0, 0, 400, 500);

    // 像素边框
    ctx.strokeStyle = '#FF69B4';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 384, 484);
    ctx.strokeStyle = '#FFB6C1';
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 14, 372, 472);

    // 标题
    ctx.fillStyle = '#FF69B4';
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('My Idol Pet', 200, 50);

    // 动物画布
    const animalCanvas = document.createElement('canvas');
    animalCanvas.width = 192;
    animalCanvas.height = 192;
    const stage = getStageFromLevel(pet.level);
    drawAnimal(animalCanvas, pet.animalId, pet.level, 'happy', 5, pet.equippedItems);
    ctx.drawImage(animalCanvas, 104, 70, 192, 192);

    // 名字
    ctx.fillStyle = '#333';
    ctx.font = '20px "Press Start 2P", monospace';
    ctx.fillText(pet.nickname, 200, 295);

    // 动物种类
    ctx.fillStyle = '#888';
    ctx.font = '12px "Press Start 2P", monospace';
    ctx.fillText(animal.name, 200, 320);

    // 等级
    ctx.fillStyle = '#FF69B4';
    ctx.font = '14px "Press Start 2P", monospace';
    const stageName = ['宝宝期', '成长期', '成熟期', '明星期', '传说期'][stage - 1];
    ctx.fillText(`Lv.${pet.level} ${stageName}`, 200, 355);

    // 星星装饰
    ctx.fillStyle = '#FFD700';
    for (let i = 0; i < Math.min(pet.level, 15); i++) {
      const sx = 80 + i * 17;
      ctx.fillText('★', sx, 385);
    }

    // 水印
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText('爱豆动物塑模拟器', 200, 470);
  }

  return { drawAnimal, drawShareCard, getStageFromLevel };
})();
