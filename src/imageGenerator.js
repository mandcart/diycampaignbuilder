/**
 * Canvas-based image generator for Social Media and Banner Ad graphics.
 * Renders branded graphics using partner colours, logos, and text.
 */

// ─── Colour helpers ───
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 255, g: 153, b: 0 };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isLightColour(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

// ─── Background style renderers ───
function drawModernGradient(ctx, w, h, primary, secondary) {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, primary);
  grad.addColorStop(1, secondary || primary);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Radial light spots
  for (let i = 0; i < 3; i++) {
    const x = w * (0.2 + i * 0.3);
    const y = h * (0.3 + (i % 2) * 0.4);
    const radius = Math.min(w, h) * 0.3;
    const radGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radGrad.addColorStop(0, rgba('#ffffff', 0.08));
    radGrad.addColorStop(1, rgba('#ffffff', 0));
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, w, h);
  }
}

function drawAbstractGeometric(ctx, w, h, primary, secondary) {
  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, w, h);

  const shapes = 12;
  const seed = w * h; // pseudo-random based on dimensions
  for (let i = 0; i < shapes; i++) {
    const x = ((seed * (i + 1) * 7) % w);
    const y = ((seed * (i + 1) * 13) % h);
    const size = Math.min(w, h) * (0.05 + (i % 4) * 0.04);
    const alpha = 0.06 + (i % 3) * 0.04;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = i % 2 === 0 ? '#ffffff' : (secondary || '#000000');

    if (i % 3 === 0) {
      // Circle
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    } else if (i % 3 === 1) {
      // Triangle
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x - size, y + size);
      ctx.closePath();
      ctx.fill();
    } else {
      // Diagonal line
      ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : (secondary || '#000000');
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - size, y - size);
      ctx.lineTo(x + size, y + size);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawDarkBold(ctx, w, h, primary) {
  const navy = '#232F3E';
  ctx.fillStyle = navy;
  ctx.fillRect(0, 0, w, h);

  // Bold accent stripe
  ctx.fillStyle = rgba(primary, 0.9);
  ctx.fillRect(0, 0, w * 0.03, h);

  // Corner accent
  ctx.beginPath();
  ctx.moveTo(w, 0);
  ctx.lineTo(w, h * 0.3);
  ctx.lineTo(w - w * 0.15, 0);
  ctx.closePath();
  ctx.fillStyle = rgba(primary, 0.7);
  ctx.fill();

  // Dot grid
  ctx.fillStyle = rgba('#ffffff', 0.04);
  const spacing = 30;
  for (let x = 0; x < w; x += spacing) {
    for (let y = 0; y < h; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawLightClean(ctx, w, h, primary) {
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, w, h);

  // Side stripe
  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, w * 0.02, h);

  // Top accent border
  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, w, 4);

  // Bottom accent border
  ctx.fillStyle = rgba(primary, 0.3);
  ctx.fillRect(0, h - 4, w, 4);
}

function drawBackground(ctx, w, h, style, primary, secondary) {
  switch (style) {
    case 'Abstract Geometric':
      drawAbstractGeometric(ctx, w, h, primary, secondary);
      break;
    case 'Dark & Bold':
      drawDarkBold(ctx, w, h, primary);
      break;
    case 'Light & Clean':
      drawLightClean(ctx, w, h, primary);
      break;
    case 'Modern Gradient':
    default:
      drawModernGradient(ctx, w, h, primary, secondary);
      break;
  }
}

function getTextColour(style, primary) {
  if (style === 'Light & Clean') return '#232F3E';
  if (style === 'Dark & Bold') return '#ffffff';
  // For gradient and geometric, check if primary is light
  return isLightColour(primary) ? '#232F3E' : '#ffffff';
}

// ─── Text wrapping helper ───
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// ─── Load image from File or URL ───
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // Don't fail if logo can't load
    if (src instanceof File) {
      img.src = URL.createObjectURL(src);
    } else if (src) {
      img.src = src;
    } else {
      resolve(null);
    }
  });
}

// ─── Draw logo fitted into a box ───
function drawLogo(ctx, img, x, y, maxW, maxH) {
  if (!img) return;
  const scale = Math.min(maxW / img.width, maxH / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, x, y, w, h);
}

// ─── Generate Social Media graphic ───
export async function generateSocialImage({ text, style, primaryColour, secondaryColour, logoFile, badgeFile }) {
  const w = 1200;
  const h = 628;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const primary = primaryColour || '#FF9900';
  const secondary = secondaryColour || '#232F3E';

  // Background
  drawBackground(ctx, w, h, style, primary, secondary);

  // Load images
  const [logo, badge] = await Promise.all([
    loadImage(logoFile),
    loadImage(badgeFile),
  ]);

  // Partner logo — top-left
  drawLogo(ctx, logo, 40, 30, 180, 80);

  // AWS badge — bottom-right
  if (badge) {
    drawLogo(ctx, badge, w - 180, h - 90, 140, 60);
  } else {
    // Draw text badge placeholder
    ctx.font = '600 14px -apple-system, sans-serif';
    ctx.fillStyle = rgba(getTextColour(style, primary), 0.6);
    ctx.textAlign = 'right';
    ctx.fillText('Powered by AWS', w - 40, h - 40);
  }

  // "Powered by AWS" small text
  ctx.font = '500 13px -apple-system, sans-serif';
  ctx.fillStyle = rgba(getTextColour(style, primary), 0.5);
  ctx.textAlign = 'right';
  ctx.fillText('Powered by AWS', w - 40, h - 20);

  // Main text — centred
  const textColour = getTextColour(style, primary);
  const fontSize = 48;
  ctx.font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = textColour;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = wrapText(ctx, text, w * 0.7);
  const lineHeight = fontSize * 1.3;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, startY + i * lineHeight);
  });

  return canvas.toDataURL('image/png');
}

// ─── Generate Banner Ad graphic ───
export async function generateBannerImage({ width, height, headline, ctaText, style, primaryColour, secondaryColour, logoFile, badgeFile }) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const primary = primaryColour || '#FF9900';
  const secondary = secondaryColour || '#232F3E';

  // Background
  drawBackground(ctx, width, height, style, primary, secondary);

  // Load images
  const [logo, badge] = await Promise.all([
    loadImage(logoFile),
    loadImage(badgeFile),
  ]);

  const textColour = getTextColour(style, primary);
  const isLeaderboard = width > height * 3; // 728x90
  const isSkyscraper = height > width * 2; // 160x600

  // Logo positioning
  if (isLeaderboard) {
    drawLogo(ctx, logo, 15, 15, 100, 60);
  } else if (isSkyscraper) {
    drawLogo(ctx, logo, (width - 100) / 2, 20, 100, 50);
  } else {
    drawLogo(ctx, logo, (width - 120) / 2, 15, 120, 50);
  }

  // Badge — bottom-right (small)
  if (badge) {
    const bw = isLeaderboard ? 60 : 80;
    const bh = isLeaderboard ? 30 : 35;
    drawLogo(ctx, badge, width - bw - 10, height - bh - 10, bw, bh);
  }

  // Headline text
  let headlineFontSize;
  if (isLeaderboard) headlineFontSize = 22;
  else if (isSkyscraper) headlineFontSize = 20;
  else headlineFontSize = 24;

  ctx.font = `700 ${headlineFontSize}px -apple-system, sans-serif`;
  ctx.fillStyle = textColour;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxTextWidth = isLeaderboard ? width * 0.5 : width * 0.8;
  const lines = wrapText(ctx, headline, maxTextWidth);
  const lineHeight = headlineFontSize * 1.3;

  let textCenterY;
  if (isLeaderboard) textCenterY = height / 2;
  else if (isSkyscraper) textCenterY = height * 0.4;
  else textCenterY = height * 0.45;

  const textStartY = textCenterY - ((lines.length - 1) * lineHeight) / 2;
  const textCenterX = isLeaderboard ? width * 0.5 : width / 2;

  lines.forEach((line, i) => {
    ctx.fillText(line, textCenterX, textStartY + i * lineHeight);
  });

  // CTA button
  if (ctaText) {
    const btnFontSize = isLeaderboard ? 14 : 16;
    ctx.font = `600 ${btnFontSize}px -apple-system, sans-serif`;
    const btnTextWidth = ctx.measureText(ctaText).width;
    const btnPadX = 16;
    const btnPadY = 8;
    const btnW = btnTextWidth + btnPadX * 2;
    const btnH = btnFontSize + btnPadY * 2;

    let btnX, btnY;
    if (isLeaderboard) {
      btnX = width - btnW - 80;
      btnY = (height - btnH) / 2;
    } else if (isSkyscraper) {
      btnX = (width - btnW) / 2;
      btnY = height * 0.7;
    } else {
      btnX = (width - btnW) / 2;
      btnY = height * 0.72;
    }

    // Button background
    const btnColour = style === 'Light & Clean' ? primary : (secondary || '#FF9900');
    ctx.fillStyle = btnColour;
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 4);
    ctx.fill();

    // Button text
    ctx.fillStyle = isLightColour(btnColour) ? '#232F3E' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ctaText, btnX + btnW / 2, btnY + btnH / 2);
  }

  return canvas.toDataURL('image/png');
}

// ─── Batch generate all images for a campaign ───
export async function generateAllImages(formData, generatedContent) {
  const { details, assetDetails } = formData;
  const primaryColour = details.primaryColour || '#FF9900';
  const secondaryColour = details.secondaryColour || '#232F3E';
  const logoFile = details.partnerLogo || null;
  const badgeFile = details.partnerBadgeFile || null;

  const socialStyle = assetDetails.socialMedia?.graphicStyle || 'Modern Gradient';
  const bannerStyle = assetDetails.bannerAds?.graphicStyle || 'Modern Gradient';

  const images = { socialMedia: {}, bannerAds: [] };

  // Social media images
  if (generatedContent.socialMedia) {
    for (const [platform, posts] of Object.entries(generatedContent.socialMedia)) {
      images.socialMedia[platform] = [];
      for (const post of posts) {
        // Extract short image copy (first 7 words or the imageCopy field trimmed)
        const shortText = post.imageCopy.split(',')[0].trim();
        const dataUrl = await generateSocialImage({
          text: shortText,
          style: socialStyle,
          primaryColour,
          secondaryColour,
          logoFile,
          badgeFile,
        });
        images.socialMedia[platform].push(dataUrl);
      }
    }
  }

  // Banner ad images
  if (generatedContent.bannerAds) {
    const sizeMap = {
      'Leaderboard (728x90)': { width: 728, height: 90 },
      'Medium Rectangle (300x250)': { width: 300, height: 250 },
      'Skyscraper (160x600)': { width: 160, height: 600 },
      'Large Rectangle (336x280)': { width: 336, height: 280 },
    };

    for (const banner of generatedContent.bannerAds) {
      const bannerImages = [];
      for (const sizeName of banner.sizes) {
        const dims = sizeMap[sizeName];
        if (!dims) continue;
        const dataUrl = await generateBannerImage({
          width: dims.width,
          height: dims.height,
          headline: banner.headline,
          ctaText: banner.ctaText,
          style: bannerStyle,
          primaryColour,
          secondaryColour,
          logoFile,
          badgeFile,
        });
        bannerImages.push({ sizeName, dataUrl, ...dims });
      }
      images.bannerAds.push(bannerImages);
    }
  }

  return images;
}
