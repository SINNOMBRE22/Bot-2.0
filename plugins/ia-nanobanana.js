import fs from 'fs';
import { img2img } from '../src/libraries/nanobanana.js';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Verificar si hay texto
  if (!text) throw `*Escribe un prompt/descripción para la edición*`;

  // Obtener las imágenes
  const quoted = m.quoted ? m.quoted : m;
  const mime = (quoted.msg || quoted).mimetype || quoted.mediaType || '';
  
  // Array para almacenar las imágenes
  let images = [];

  // Verificar si el mensaje citado es una imagen
  if (/image/g.test(mime)) {
    const data = await quoted.download?.();
    if (data) images.push(data);
  }

  // Buscar imágenes en el mensaje actual (hasta 2)
  if (m.message?.imageMessage) {
    const data = await conn.downloadMediaMessage(m);
    if (data) images.push(data);
  }

  // Verificar que hay al menos una imagen
  if (images.length === 0) throw `*Debes responder a una imagen o enviar una imagen con el comando*`;

  // Limitar a máximo 2 imágenes
  if (images.length > 2) {
    images = images.slice(0, 2);
  }

  try {
    // Emojis de reloj para la animación
    const clockEmojis = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'];
    
    // Enviar mensaje inicial
    const progressMsg = await conn.sendMessage(m.chat, { 
      text: `🕐 Procesando ${images.length} imagen(es)...` 
    }, { quoted: m });

    // Animación del reloj
    let clockIndex = 0;
    const clockInterval = setInterval(async () => {
      clockIndex = (clockIndex + 1) % clockEmojis.length;
      try {
        await conn.relayMessage(m.chat, {
          protocolMessage: {
            key: progressMsg.key,
            type: 14,
            editedMessage: {
              conversation: `${clockEmojis[clockIndex]} Procesando ${images.length} imagen(es)...`
            }
          }
        }, {});
      } catch (e) {
        // Ignorar errores de edición
      }
    }, 2000);

    // Procesar las imágenes
    const results = [];
    for (const imageData of images) {
      try {
        const resultBuffer = await img2img(imageData, text);
        results.push(resultBuffer);
      } catch (error) {
        console.error(error);
        throw `*Error al procesar una de las imágenes*`;
      }
    }

    // Detener la animación
    clearInterval(clockInterval);

    // Enviar resultados
    for (const resultBuffer of results) {
      await conn.sendMessage(m.chat, { 
        image: resultBuffer, 
        caption: 'Aquí tienes tu imagen editada 🖼️' 
      }, { quoted: m });
    }

    // Eliminar mensaje de progreso
    await conn.sendMessage(m.chat, {
      delete: progressMsg.key
    });

  } catch (error) {
    console.error(error);
    throw `*Error al procesar la imagen con NanoBanana*`;
  }
};

handler.help = ['nanobanana <prompt>'];
handler.tags = ['ai', 'converter'];
handler.command = ['nanobanana'];
export default handler;
