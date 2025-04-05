const fs = require('fs');
const path = require('path');

const foldersToSync = ['sections', 'snippets', 'templates'];

foldersToSync.forEach((folder) => {
  const srcPath = path.join(__dirname, '..', 'src', folder);
  const destPath = path.join(__dirname, '..', folder);

  if (!fs.existsSync(srcPath)) return;

  fs.readdirSync(srcPath).forEach((file) => {
    if (file.endsWith('.liquid')) {
      const source = path.join(srcPath, file);
      const destination = path.join(destPath, file);

      try {
        fs.copyFileSync(source, destination);
        console.log(`✅ Copiado: ${file} a /${folder}`);
      } catch (err) {
        console.warn(`⚠️  No se pudo copiar ${file}: ${err.message}`);
      }
    }
  });
});
