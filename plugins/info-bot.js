import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const handler = (m) => m;

handler.all = async function(m) {
  const chat = global.db.data.chats[m.chat];
  if (/^bot$/i.test(m.text) && !chat.isBanned) {
    try {
      m.conn.sendPresenceUpdate('recording', m.chat);
      await m.reply('*Hola, ¿Cómo puedo ayudarte?*');

      const mp3Path = path.resolve('src/assets/audio/01J67301CY64MEGCXYP1NRFPF1.mp3');
      const oggPath = path.resolve('src/assets/audio/temp.ogg');

      // Convertir MP3 a OGG/OPUS usando ffmpeg
      await new Promise((resolve, reject) => {
        exec(`ffmpeg -y -i "${mp3Path}" -c:a libopus "${oggPath}"`, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      // Leer el OGG resultante
      const audioBuffer = fs.readFileSync(oggPath);

      // Enviar como nota de voz sin miniatura
      await m.conn.sendMessage(
        m.chat,
        {
          audio: audioBuffer,
          mimetype: 'audio/ogg; codecs=opus',
          ptt: true
        },
        { quoted: m }
      );

      // Borrar archivo temporal
      fs.unlinkSync(oggPath);

    } catch (error) {
      console.error('Error enviando nota de voz:', error);
      await m.reply('*Algo salió mal al enviar la nota de voz.*');
    }
  }
  return !0;
};

export default handler;
