import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const handler = (m) => m;

handler.all = async function(m) {
  const chat = global.db.data.chats[m.chat];
  
  // Solo responde si los audios están activados en el chat
  if (!chat.audios) return;

  // Mapeo completo de textos a archivos de audio
  const audioResponses = {
    'hola': '01J673CQ9ZE93TRQKCKN9Q8Z0M.mp3',
    'que no': '01J6745EH5251SV6HT327JJW9G.mp3',
    'a nadie le importa': '01J6734W48PG8EA14QW517QR2K.mp3',
    'ara ara': '01J672TYT2TFVG5NT5QVPJ8XHX.mp3',
    'mierda de bot': '01J673T2Q92H3A0AW5B8RHA2N0.mp3',
    'bañate': '01J672VZBZ488TCVYA7KBB3TFG.mp3',
    'baneado': '01J672WYXHW6JM3T8PCNQHH6MN.mp3',
    'bebito fiu fiu': '01J672XP5MW9J5APRSDFYRTTE9.mp3',
    'buenas noches': '01J672YMA8AS2Z8YFMHB68GBQX.mp3',
    'buenas tardes': '01J672ZCDK26GJZQ5GDP60TZ37.mp3',
    'buenos dias': '01J6730WRS4KJEZ281N2KJR1SV.mp3',
    'chica lgante': '01J6732M2RT3F96FMJ3ZATCJYF.mp3',
    'diagnosticado con gay': '01J6733KMK6VZ3TC806EK2PQV9.mp3',
    'es puto': '01J6737BBJJ3DN78NAMEKG13M8.mp3',
    'feliz cumpleaños': '01J67380VCFHSZ4BCE4CBBQFHC.mp3',
    'fiesta del admin': '01J672T4VQFK8ZSSD1G0MXMPD3.mp3',
    'fiesta del administrador': '01J6738VVZ6SVZRCP5V287SSB2.mp3',
    'fiesta del admin 3': '01J6739GKKKN029YNX1TQ9CZR5.mp3',
    'gemidos': '01J673B4CRSS9Z2CX6E4R8MZPZ.mp3',
    'audio hentai': '01J673BTPKK29A7CVJW9WKXE9T.mp3',
    'sexo': '01J673WHBVDXH4N0Q4WGBM568B.mp3',
    'la oracion': '01J6743DB5T555Y9YRAG5GSPVX.mp3',
    'marica tu': '01J6731R9N6N6453KVHC4MD8X2.mp3',
    'noche de paz': '01J673YX9KHGTQ6V7V3Q3X3A1X.mp3',
    'nyapasu': '01J67441AFAPG1YRQXDQ0VDTZB.mp3',
    'me vengo': '01J674B3P6G2J8WYAV3N4YJ86E.mp3',
    'onichan': '01J6742QGC8P8910A8D990M7W2.mp3',
    'pasa pack': '01J6735MY23DV6ES9XHBP06K9R.mp3',
    'quien es tu senpai botsito': '01J6749NAPVK16F3CEXTTMJAVS.mp3',
    'rawr': '01J674623FTP8T6T00EQCXY5TG.mp3',
    'siu': '01J6747RFN09GR42AXY18VFW10.mp3',
    'te amo': '01J6748B0RYBJWX5TBMWQZYX95.mp3',
    'ooo tio': '01J6741Q3F6EAM5ZCN28DY6XZ4.mp3',
    'un pato': '01J6744PY12JDH4PG59GDHFXV8.mp3',
    'uwu': '01J674A7N7KNER6GY6FCYTTZSR.mp3',
    'vete a la verga': '01J674BPFMHSJTJXN0M00YZ1YN.mp3',
    'fiesta viernes': '01J674CES8KMWCBT6B9E597MFF.mp3',
    'vivan los novios': '01J674D3S12JTFDETTNF12V4W8.mp3',
    'yamete': '01J674DR0CB7BD43HHBN1CBBC8.mp3',
    'epico': '01J6736ABXJQN1GSVF2XHP4NMK.mp3',
    'shitpost': '01J6746X6AJ09V48P28AZC22M2.mp3',
    'no digas eso papu': '01J67413BMA69VV48TWPCVCYS8.mp3'
  };

  const text = m.text?.toLowerCase().trim();
  
  if (text && audioResponses[text]) {
    try {
      const audioFile = audioResponses[text];
      const mp3Path = path.resolve(`./src/assets/audio/${audioFile}`);  
      const oggPath = path.resolve('./src/assets/audio/temp.ogg');  

      // Convertir MP3 a OGG/OPUS usando ffmpeg  
      await new Promise((resolve, reject) => {  
        exec(`ffmpeg -y -i "${mp3Path}" -c:a libopus "${oggPath}"`, (error) => {  
          if (error) reject(error);  
          else resolve();  
        });  
      });  

      // Leer el OGG resultante  
      const audioBuffer = fs.readFileSync(oggPath);  

      // Enviar como nota de voz  
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
    }
  }

  return true;
};

export default handler;
