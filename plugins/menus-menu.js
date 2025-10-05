import { promises as fs } from 'fs';
import axios from 'axios';

const handler = async (m, { conn, usedPrefix, __dirname, isPrems }) => {
    try {
        const idioma = global.db.data.users[m.sender]?.language || global.defaultLenguaje || 'es';
        const _translate = JSON.parse(await fs.readFile(`./src/languages/${idioma}/${m.plugin}.json`));
        const tradutor = _translate.plugins.menu;

        // SOBRESCRIBIR FORMATO - SOLUCIÓN AL PROBLEMA
        tradutor.section_header = "┌───『 @category 』";
        tradutor.command_item = "│ ➤ @cmd";
        tradutor.section_footer = "└────────────✦";

        const username = '@' + m.sender.split('@s.whatsapp.net')[0];
        const name = await conn.getName(m.sender);
        const totalreg = Object.keys(global.db.data.users || {}).length;
        const rtotalreg = Object.values(global.db.data.users).filter(u => u.registered).length;
        const muptime = formatUptime(process.uptime());

        // Datos del usuario
        let user = global.db.data.users[m.sender] || {};
        let exp = user.exp || 0;
        let limit = user.limit || 0;
        let level = user.level || 0;
        let role = user.role || 'Nuevo';
        let money = user.money || 0;
        let joincount = user.joincount || 0;

        // Diseño cabecera IDÉNTICO al original
        let headerInfo = `
╭━━━━━━༺༻━━━━━━╮
${toBold('Nivel:')} ▹ ${level} ◃
${toBold('Exp:')} ▹ ${exp} ◃
${toBold('Rango:')} ▹ ${role} ◃
${toBold('Límite:')} ▹ ${limit} ◃
${toBold('Diamantes:')} ▹ ${money} ◃
${toBold('Registros:')} ▹ ${rtotalreg}/${totalreg} ◃
${toBold('Activo:')} ▹ ${muptime} ◃
╰━━━━━━༺༻━━━━━━╯
╭━━━━━━༺༻━━━━━━╮
「 *EL ARQUITECTO* 」
» https://wa.me/${global.owner?.[0]?.[0] || '5215629885039'}
╰━━━━━━༺༻━━━━━━╯
        *🜲 COMANDOS DISPONIBLES 🜲*`;

        // Preparar traducciones y estructura original
        const more = String.fromCharCode(8206);
        const readMore = more.repeat(1500);

        const d = new Date(new Date().getTime() + 3600000);
        const localeMap = { 'es': 'es-ES', 'en': 'en-US', 'ar': 'ar-SA' };
        const locale = localeMap[idioma.toLowerCase()] || 'es-ES';

        let week, date;
        try {
            week = d.toLocaleDateString(locale, { weekday: 'long' });
            date = d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch {
            week = d.toLocaleDateString('es-ES', { weekday: 'long' });
            date = d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }

        const _uptime = process.uptime() * 1000;
        const uptime = clockString(_uptime);
        const tags = tradutor.tags || {};

        // 🔥 Lista completa de extrasCommands CON %p PARA PREFIJO
        const extrasCommands = {
            'info': [
                `%pmenuaudios`,
                `%pmenuanimes`,
                `%plabiblia`,
                `%plang`,
                `%pinfobot`,
                `%pscript`,
                `%pestado`,
                `%pjoin <wagp_url>`,
                `%pfixmsgespera`,
                `bot (sin prefijo)`
            ],
            'jadibot': [
                `%pserbot --code`
            ],
            'xp': [
                `%pcofre`,
                `%pbalance`,
                `%pclaim`,
                `%plb`,
                `%pmyns`,
                `%pperfil`,
                `%pcrime`
            ],
            'game': [
                `%pmates <noob/easy/medium/hard/extreme/impossible/impossible2>`,
                `%pppt <papel/tijera/piedra>`,
                `%psuitpvp <@tag>`,
                `%pttt`,
                `%pdelttt`,
                `%pakinator`,
                `%pwordfind`,
                `%pcancion`,
                `%ppista`,
                `%pglx (RPG Mundo)`,
                `%pdoxear <nombre / @tag>`
            ],
            'group': [
                `%pgrouptime <tiempo>`,
                `%penable welcome`,
                `%pdisable welcome`,
                `%penable modohorny`,
                `%pdisable modohorny`,
                `%penable antilink`,
                `%pdisable antilink`,
                `%penable antilink2`,
                `%pdisable antilink2`,
                `%penable detect`,
                `%pdisable detect`,
                `%penable audios`,
                `%pdisable audios`,
                `%penable autosticker`,
                `%pdisable autosticker`,
                `%penable antiviewonce`,
                `%pdisable antiviewonce`,
                `%penable antitoxic`,
                `%pdisable antitoxic`,
                `%penable antitraba`,
                `%pdisable antitraba`,
                `%penable antiarabes`,
                `%pdisable antiarabes`,
                `%penable modoadmin`,
                `%pdisable modoadmin`,
                `%penable antidelete`,
                `%pdisable antidelete`
            ],
            'downloader': [
                `%pspotify <txt>`,
                `%pplaydoc <txt>`,
                `%pytmp3doc <url>`,
                `%pytmp4doc <url>`,
                `%pfacebook <url>`,
                `%pinstagram <url>`,
                `%ptiktok <url>`,
                `%ptiktokimg <url>`,
                `%ppptiktok <usr>`,
                `%pmediafire <url>`,
                `%pgitclone <url>`,
                `%pgdrive <url>`,
                `%ptwitter <url>`,
                `%pringtone <txt>`,
                `%psoundcloud <txt>`,
                `%pstickerpack <url>`,
                `%pdapk2 <url>`
            ],
            'search': [
                `%pmodapk <txt>`,
                `%pstickersearch <txt>`,
                `%pstickersearch2 <txt>`,
                `%panimeinfo <txt>`,
                `%pcuevana <text>`,
                `%pcuevanaInfo <link>`
            ],
            'effects': [
                `%plogos <efecto> <txt>`,
                `%plogochristmas <txt>`,
                `%plogocorazon <txt>`,
                `%ppixelar`
            ],
            'img': [
                `%pwpmontaña`,
                `%ppubg`,
                `%pwpgaming`,
                `%pwpaesthetic`,
                `%pwpaesthetic2`,
                `%pwprandom`,
                `%pwallhp`,
                `%pwpvehiculo`,
                `%pwpmoto`,
                `%pcoffee`,
                `%ppentol`,
                `%pcaricatura`,
                `%pciberespacio`,
                `%ptechnology`,
                `%pdoraemon`,
                `%phacker`,
                `%pplaneta`,
                `%prandomprofile`
            ],
            'tools': [
                `%pocr`,
                `%pinspect <wagc_url>`,
                `%pchatgpt <txt>`,
                `%pexploit <txt>`,
                `%pdall-e <txt>`,
                `%pspamwa <num|txt|cant>`,
                `%preadviewonce <img/video>`,
                `%pclima <país> <ciudad>`,
                `%pencuesta <txt1|txt2>`,
                `%pwhatmusic <audio>`,
                `%preadqr <img>`,
                `%pstyletext <txt>`,
                `%pnowa <num>`,
                `%pcovid <pais>`,
                `%phorario`,
                `%pigstalk <usr>`,
                `%pdel <msj>`
            ],
            'converter': [
                `%ptoptt <video / audio>`
            ],
            'sticker': [
                `%pscircle <img>`,
                `%psremovebg <img>`,
                `%psemoji <tipo> <emoji>`,
                `%pattp2 <txt>`,
                `%pattp3 <txt>`,
                `%pttp2 <txt>`,
                `%pttp3 <txt>`,
                `%pttp4 <txt>`,
                `%pttp5 <txt>`,
                `%pslap <@tag>`,
                `%ppat <@tag>`,
                `%pkiss <@tag>`,
                `%pdado`,
                `%pstickermarker <efecto> <img>`,
                `%pstickerfilter <efecto> <img>`
            ],
            'owner': [
                `%pdsowner`,
                `%pautoadmin`,
                `%pleavegc`,
                `%paddowner <@tag / num>`,
                `%pdelowner <@tag / num>`,
                `%pblock <@tag / num>`,
                `%punblock <@tag / num>`,
                `%penable restrict`,
                `%pdisable restrict`,
                `%penable autoread`,
                `%pdisable autoread`,
                `%penable public`,
                `%pdisable public`,
                `%penable pconly`,
                `%pdisable pconly`,
                `%penable gconly`,
                `%pdisable gconly`,
                `%penable anticall`,
                `%pdisable anticall`,
                `%penable antiprivado`,
                `%pdisable antiprivado`,
                `%penable modejadibot`,
                `%pdisable modejadibot`,
                `%penable audios_bot`,
                `%pdisable audios_bot`,
                `%penable antispam`,
                `%pdisable antispam`,
                `%presetuser <@tag>`,
                `%pbanuser <@tag>`,
                `%pdardiamantes <@tag> <cant>`,
                `%pañadirxp <@tag> <cant>`,
                `%pbcbot <txt>`,
                `%pcleartpm`,
                `%pbanlist`,
                `%paddprem2 <@tag> <time>`,
                `%paddprem3 <@tag> <time>`,
                `%paddprem4 <@tag> <time>`,
                `%plistcmd`,
                `%paddcmd <txt>`,
                `%pdelcmd`,
                `%pmsg <txt>`,
                `%psetppbot <reply to img>`
            ]
        };

        const defaultMenu = {
            header: tradutor.section_header,
            body: tradutor.command_item,
            footer: tradutor.section_footer,
        };

        let header = defaultMenu.header;
        let body = defaultMenu.body;
        let footer = defaultMenu.footer;

        // Preparar comandos de plugins
        let help = Object.values(global.plugins)
            .filter(p => !p.disabled)
            .map(p => ({
                help: Array.isArray(p.help) ? p.help : [p.help],
                tags: Array.isArray(p.tags) ? p.tags : [p.tags],
                prefix: 'customPrefix' in p,
                limit: p.limit,
                enabled: !p.disabled
            }));

        // 🔥 FUNCIÓN PARA DETECTAR AUTOMÁTICAMENTE NUEVAS CATEGORÍAS
        const scanPluginsForCategories = () => {
            const allCategories = new Set();
            
            // Escanear todos los plugins
            Object.values(global.plugins).forEach(plugin => {
                if (!plugin.disabled && plugin.tags) {
                    if (Array.isArray(plugin.tags)) {
                        plugin.tags.forEach(tag => allCategories.add(tag));
                    } else {
                        allCategories.add(plugin.tags);
                    }
                }
            });
            
            // Agregar categorías de extrasCommands
            Object.keys(extrasCommands).forEach(tag => allCategories.add(tag));
            
            return Array.from(allCategories);
        };

        // 🔥 GENERAR MENÚ DINÁMICAMENTE CON CATEGORÍAS DETECTADAS
        let menuSections = scanPluginsForCategories().map(tag => {
            let pluginCommands = help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
                return menu.help.map(help => {
                    return body.replace(/@cmd/g, menu.prefix ? help : '%p' + help)
                        .replace(/@islimit/g, menu.limit ? '⭐' : '')
                        .trim();
                }).join('\n');
            });

            let categoryCommands = [...pluginCommands];

            if (extrasCommands[tag]) {
                let existingCommands = new Set();
                pluginCommands.forEach(cmdGroup => {
                    cmdGroup.split('\n').forEach(line => {
                        let match = line.match(/│ ➤ (.+)/);
                        if (match) {
                            let cmd = match[1].replace(/%p/g, usedPrefix).split(' ')[0];
                            existingCommands.add(cmd);
                        }
                    });
                });

                let filteredExtras = extrasCommands[tag].filter(extraCmd => {
                    let baseCmd = extraCmd.split(' ')[0].replace(/%p/g, usedPrefix);
                    return !existingCommands.has(baseCmd);
                });

                if (filteredExtras.length > 0) {
                    categoryCommands.push(
                        ...filteredExtras.map(cmd =>
                            body.replace(/@cmd/g, cmd).replace(/@islimit/g, '').trim()
                        )
                    );
                }
            }

            let sectionText = '';
            if (categoryCommands.length > 0) {
                // Usar traducción si existe, sino usar el nombre del tag con primera letra mayúscula
                const categoryName = tags[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
                sectionText = header.replace(/@category/g, categoryName) + '\n' + 
                             categoryCommands.join('\n') + '\n' + footer;
            }
            return sectionText;

        }).filter(section => section !== '');

        let menuText = headerInfo + '\n' + readMore + '\n' + menuSections.join('\n');

        // REEMPLAZAR TODOS LOS %p POR EL PREFIJO REAL
        menuText = menuText.replace(/%p/g, usedPrefix);

        // Descargar imagen para el diseño
        const thumb = await axios.get('https://i.postimg.cc/zD6LSDZr/IMG-20250509-WA0013.jpg', {
            responseType: 'arraybuffer',
            timeout: 5000
        });

        await conn.sendMessage(m.chat, {
            text: menuText.trim(),
            contextInfo: {
                externalAdReply: {
                    title: 'ㅤㅤㅤ🜲 SYSTEM OF SHADOWS 🜲',
                    body: `ㅤㅤㅤㅤㅤUsuario: ${toBoldUnicode(name)}`,
                    thumbnail: thumb.data,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                }
            }
        }, { quoted: m });

    } catch (e) {
        console.error('Error crítico en el menú:', e);
        await conn.reply(m.chat, `❎ Error crítico al generar el menú:\n${e.message}`, m);
    }
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = /^(menu|help|comandos|commands|cmd|cmds)$/i;
export default handler;

// Funciones auxiliares IDÉNTICAS al original
function clockString(ms) {
    const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

const formatUptime = seconds => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
};

const toBold = text => `*${text}*`;

const toBoldUnicode = text => text.split('').map(c => ({
    A:'𝗔',B:'𝗕',C:'𝗖',D:'𝗗',E:'𝗘',F:'𝗙',G:'𝗚',H:'𝗛',I:'𝗜',J:'𝗝',K:'𝗞',L:'𝗟',M:'𝗠',N:'𝗡',O:'𝗢',P:'𝗣',Q:'𝗤',R:'𝗥',S:'𝗦',T:'𝗧',U:'𝗨',V:'𝗩',W:'𝗪',X:'𝗫',Y:'𝗬',Z:'𝗭',
    a:'𝗮',b:'𝗯',c:'𝗰',d:'𝗱',e:'𝗲',f:'𝗳',g:'𝗴',h:'𝗵',i:'𝗶',j:'𝗷',k:'𝗸',l:'𝗹',m:'𝗺',n:'𝗻',o:'𝗼',p:'𝗽',q:'𝗾',r:'𝗿',s:'𝘀',t:'𝘁',u:'𝘂',v:'𝘃',w:'𝘄',x:'𝘅',y:'𝘆',z:'𝘇',
    0:'𝟬',1:'𝟭',2:'𝟮',3:'𝟯',4:'𝟰',5:'𝟱',6:'𝟲',7:'𝟳',8:'𝟴',9:'𝟵'
}[c] || c)).join('');
