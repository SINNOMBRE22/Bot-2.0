import fetch from 'node-fetch';
import fs from 'fs';

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const tradutor = _translate.plugins.menu_audios

  try {
    const pp = imagen4;
    const img = './src/assets/images/menu/languages/es/menu.png';
    const d = new Date(new Date + 3600000);
    const locale = 'es';
    const week = d.toLocaleDateString(locale, {weekday: 'long'});
    const date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'});
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];

    // Primer cuadro de presentación (se mantiene igual)
    const intro = `╭═══〘 ✯✯✯✯✯✯✯✯✯ 〙══╮
║    ◉— *𝐒𝐮𝐧𝐠 𝐉𝐢𝐧-𝐖𝐨𝐨 - 𝐁𝐨𝐭* —◉
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
║➤ *𝗛ola, ${taguser}*
║≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡║
╰═══╡✯✯✯✯✯✯✯✯✯╞═══╯`;

    // Lista de líneas del menú
    const lines = [
      '*〔MENÚ AUDIOS〕*',
      `${_translate.plugins.menu_audios.texto1}`,
      '🔊 Quien es tu sempai botsito 7w7',
      '🔊 Te diagnostico con gay',
      '🔊 No digas eso papu',
      '🔊 A nadie le importa',
      '🔊 Fiesta del admin',
      '🔊 Fiesta del administrador',
      '🔊 Vivan los novios',
      '🔊 Feliz cumpleaños',
      '🔊 Noche de paz',
      '🔊 Buenos días',
      '🔊 Buenas tardes',
      '🔊 Buenas noches',
      '🔊 Audio hentai',
      '🔊 Chica elegante',
      '🔊 Feliz navidad',
      '🔊 Vete a la vrg',
      '🔊 Pasa pack Bot',
      '🔊 Atención grupo',
      '🔊 Marica quien',
      '🔊 Murió el grupo',
      '🔊 Oh me vengo',
      '🔊 Tío que rico',
      '🔊 Viernes',
      '🔊 Baneado',
      '🔊 Sexo',
      '🔊 Hola',
      '🔊 Un pato',
      '🔊 Nyanpasu',
      '🔊 Te amo',
      '🔊 Yamete',
      '🔊 Bañate',
      '🔊 Es puto',
      '🔊 La biblia',
      '🔊 Onichan',
      '🔊 Mierda de Bot',
      '🔊 Siuuu',
      '🔊 Épico',
      '🔊 Shitpost',
      '🔊 Rawr',
      '🔊 UwU',
      '🔊 :c',
      '🔊 a'
    ];

    // Limite máximo de ancho de barra
    const MAX_WIDTH = 18;

    // Calcula la longitud máxima limitada
    const maxLength = Math.min(MAX_WIDTH, Math.max(...lines.map(l => l.length)));
    const horizontal = '━'.repeat(maxLength + 1);

    // Función para ajustar líneas largas
    const formatLine = (l) => l.length > MAX_WIDTH ? l.slice(0, MAX_WIDTH - 3) + '…' : l;

    // Menú ajustable
    const menu = `
┏${horizontal}┓
┃ ${formatLine(lines[0]).padEnd(maxLength)} 
┣${horizontal}┫
${lines.slice(1).map(l => `┣◉ ${formatLine(l).padEnd(maxLength - 2)}`).join('\n')}
┗${horizontal}┛`.trim();

    const str = `${intro}\n${menu}`;

    const fkontak2 = {
      'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'},
      'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}},
      'participant': '0@s.whatsapp.net'
    };

    conn.sendMessage(m.chat, {image: pp, caption: str, mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});

  } catch {
    conn.reply(m.chat, tradutor.texto2, m);
  }
};

handler.command = /^(menu2|audios)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
