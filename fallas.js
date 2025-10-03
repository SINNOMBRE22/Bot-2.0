import fs from 'fs';

const path = './src/languages/es.json'; // tu JSON

try {
  const data = await fs.promises.readFile(path, 'utf-8');
  JSON.parse(data);
  console.log('✅ JSON válido');
} catch (err) {
  console.error('❌ Error de JSON detectado');

  const match = err.message.match(/position (\d+)/);
  if (match) {
    const pos = parseInt(match[1], 10);
    const data = await fs.promises.readFile(path, 'utf-8');
    const lines = data.split(/\r?\n/);

    let charCount = 0;
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 por salto de línea
      if (charCount + lineLength > pos) {
        const col = pos - charCount + 1;
        console.log(`\n📌 Línea con error: ${i + 1}`);
        console.log(`📌 Columna del error: ${col}`);
        console.log(`📌 Contenido de la línea:\n${lines[i]}`);
        console.log(' '.repeat(col - 1) + '^'); // marca el carácter problemático
        console.log(`📌 Mensaje de error original: ${err.message}`);
        break;
      }
      charCount += lineLength;
    }
  } else {
    console.log(err.message);
  }
}
