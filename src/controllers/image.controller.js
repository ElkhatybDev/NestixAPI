const { createCanvas } = require("canvas");

const generateImage = (req, res) => {
  const width = parseInt(req.query.width) || 200;
  const height = parseInt(req.query.height) || 150;

  const text = req.query.text || "NestixAPI";
  const bg = req.query.bg || "1E3A8A";
  const color = req.query.color || "FFFFFF";
  const radius = parseInt(req.query.radius) || 0;
  const font = req.query.font || "Arial";

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const drawRoundedRect = (x, y, w, h, r) => {
    const radiusValue = Math.min(r, w / 2, h / 2);

    ctx.beginPath();
    ctx.moveTo(x + radiusValue, y);
    ctx.lineTo(x + w - radiusValue, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radiusValue);
    ctx.lineTo(x + w, y + h - radiusValue);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radiusValue, y + h);
    ctx.lineTo(x + radiusValue, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radiusValue);
    ctx.lineTo(x, y + radiusValue);
    ctx.quadraticCurveTo(x, y, x + radiusValue, y);
    ctx.closePath();
  };

ctx.fillStyle = bg;
drawRoundedRect(0, 0, width, height, radius);
ctx.fill();

ctx.fillStyle = color; 
  ctx.font = `bold 36px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(text, width / 2, height / 2);

  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
};

module.exports = {
  generateImage
};