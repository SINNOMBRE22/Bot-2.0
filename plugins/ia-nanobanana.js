import fs from 'fs';
import { img2img } from '../src/libraries/nanobanana.js';

const handler = async (m, { conn, text, usedPrefix, command }) => {

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';

  if (!/image/g.test(mime)) throw `*Debes responder a una imagen*`;
  if (!text) throw `*Escribe un prompt/descripción para la edición*`;

  const data = await q.download?.();
  if (!data) throw `*Error al descargar la imagen*`;

  try {
    // Animación de reloj real
    const clockFrames = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'];
    let frameIndex = 0;
    
    const progressMsg = await conn.sendMessage(m.chat, {
      text: `${clockFrames[frameIndex]} Procesando imagen...`
    }, { quoted: m });

    // Actualizar el reloj cada segundo
    const progressInterval = setInterval(async () => {
      frameIndex = (frameIndex + 1) % clockFrames.length;
      try {
        await conn.sendMessage(m.chat, {
          text: `${clockFrames[frameIndex]} Procesando imagen...`,
          edit: progressMsg.key
        });
      } catch (e) {
        // Si falla la edición, no hacer nada
      }
    }, 1000);

    const resultBuffer = await img2img(data, text);

    // Limpiar intervalo y eliminar mensaje de progreso
    clearInterval(progressInterval);
    await conn.sendMessage(m.chat, { delete: progressMsg.key }).catch(() => null);

    console.log(resultBuffer);

    await conn.sendMessage(m.chat, { 
      image: resultBuffer, 
      caption: 'Aquí tienes tu imagen 🖼️' 
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    throw `*Error al procesar la imagen con NanoBanana*`;
  }
};

handler.help = ['nanobanana <prompt>'];
handler.tags = ['ai', 'converter'];
handler.command = ['nanobanana'];
export default handler;
