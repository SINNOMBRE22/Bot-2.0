import fs from 'fs';
import { sticker } from '../src/libraries/sticker.js';
import uploadFile from '../src/libraries/uploadFile.js';
import uploadImage from '../src/libraries/uploadImage.js';
import { webp2png } from '../src/libraries/webp2mp4.js';

const isUrl = (text) => /^https?:\/\/\S+$/i.test(text);

const handler = async (m, { conn, args, usedPrefix, command }) => {
    const datas = global;
    const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje;
    const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`));
    const tradutor = _translate.plugins.sticker_sticker;

    if (usedPrefix.toLowerCase() === 'a') return;

    let stiker = false;

    try {
        // 🔹 Usar getQuotedObj para que funcione incluso con mensajes propios
        const q = m.getQuotedObj?.() || m;

        const mime = q.mediaType || q.mimetype || '';
        const metadata = { isAiSticker: true };

        if (/webp|image|video/i.test(mime)) {
            const img = await q.download?.();
            if (!img) throw `${tradutor.texto1} ${usedPrefix + command}*`;

            let out;
            try {
                stiker = await sticker(img, false, global.packname, global.author, ["✨"], metadata);
            } catch (e) {
                console.error(e);
            } finally {
                if (!stiker) {
                    if (/webp/i.test(mime)) out = await webp2png(img);
                    else if (/image/i.test(mime)) out = await uploadImage(img);
                    else if (/video/i.test(mime)) out = await uploadFile(img);
                    if (typeof out !== 'string') out = await uploadImage(img);
                    stiker = await sticker(false, out, global.packname, global.author, ["✨"], metadata);
                }
            }
        } else if (args[0]) {
            if (isUrl(args[0])) {
                stiker = await sticker(false, args[0], global.packname, global.author, ["✨"], metadata);
            } else {
                return m.reply(`${tradutor.texto2} ${usedPrefix}s https://telegra.ph/file/0dc687c61410765e98de2.jpg*`);
            }
        }
    } catch (e) {
        console.error(e);
        if (!stiker) stiker = e;
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        else return m.reply(`${tradutor.texto3} ${usedPrefix + command}*`);
    }
};

handler.help = ['sfull'];
handler.tags = ['sticker'];
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i;

export default handler;
