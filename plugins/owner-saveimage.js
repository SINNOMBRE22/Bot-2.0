import fs from 'fs';

let handler = async (m, { text }) => {
  console.log("➡️ saveimage ejecutado");

  if (!text) return m.reply('❌ Debes especificar un nombre para guardar la imagen.');
  if (!m.quoted) return m.reply('❌ Debes citar una imagen para guardarla.');

  try {
    const folder = 'src/images';
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    console.log("⬇️ Intentando descargar media del citado...");
    let media;
    if (m.quoted.download) {
      media = await m.quoted.download();
    }

    if (!media || media.length === 0) {
      console.log("⚠️ Media vacío o nulo");
      return m.reply('❌ No se pudo obtener la imagen del citado.');
    }

    // Detectar extensión desde mimetype si existe
    const mime = m.quoted.mimetype || 'image/jpeg';
    const ext = mime.split('/')[1] || 'jpg';

    // Nombre seguro
    let safeName = text.replace(/[/\\?%*:|"<>]/g, '-');
    if (!safeName.includes('.')) safeName = `${safeName}.${ext}`;

    let path = `${folder}/${safeName}`;

    // Evitar sobrescribir
    let count = 1;
    const basePath = path.replace(/\.[^/.]+$/, '');
    const fileExt = path.split('.').pop();
    while (fs.existsSync(path)) {
      path = `${basePath}_${count}.${fileExt}`;
      count++;
    }

    fs.writeFileSync(path, media);
    console.log(`✅ Imagen guardada en ${path}`);
    m.reply(`✅ Imagen guardada como ${path}`);
  } catch (err) {
    console.error("❌ Error en saveimage:", err);
    m.reply('❌ Ocurrió un error al guardar la imagen.');
  }
};

handler.help = ['saveimage <nombre>'];
handler.tags = ['owner'];
handler.command = /^(saveimage|sp)$/i;
handler.owner = true;

export default handler;
