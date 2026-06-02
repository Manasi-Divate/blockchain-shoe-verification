const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function convertAll() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    console.error('Images directory not found:', imagesDir);
    process.exit(1);
  }

  const files = fs.readdirSync(imagesDir).filter(f => /\.(jpe?g|png)$/i.test(f));
  if (!files.length) {
    console.log('No JPG/PNG images found in', imagesDir);
    return;
  }

  for (const file of files) {
    try {
      const filePath = path.join(imagesDir, file);
      const imageBytes = fs.readFileSync(filePath);

      const pdfDoc = await PDFDocument.create();

      const ext = path.extname(file).toLowerCase();
      let embeddedImage;
      if (ext === '.jpg' || ext === '.jpeg') {
        embeddedImage = await pdfDoc.embedJpg(imageBytes);
      } else {
        embeddedImage = await pdfDoc.embedPng(imageBytes);
      }

      const imgWidth = embeddedImage.width;
      const imgHeight = embeddedImage.height;

      const page = pdfDoc.addPage([imgWidth, imgHeight]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: imgWidth,
        height: imgHeight,
      });

      const pdfBytes = await pdfDoc.save();
      const outName = file.replace(/\.(jpe?g|png)$/i, '.pdf');
      const outPath = path.join(imagesDir, outName);
      fs.writeFileSync(outPath, pdfBytes);
      console.log('Wrote', outPath);
    } catch (err) {
      console.error('Failed to convert', file, err);
    }
  }
}

convertAll().catch(err => {
  console.error(err);
  process.exit(1);
});
