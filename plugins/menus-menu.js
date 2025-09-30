import { promises as fs } from 'fs'
import axios from 'axios'

const nsfwCategories = ['adultos', 'videos']
const invisible = '\u200B'.repeat(1500)

const handler = async (m, { conn, usedPrefix, __dirname, isPrems }) => {
    try {
        const idioma = global.db.data.users[m.sender]?.language || global.defaultLenguaje || 'es'
        const _translate = JSON.parse(await fs.readFile(`./src/languages/${idioma}/${m.plugin}.json`))
        const tradutor = _translate.plugins.menu

        const name = await conn.getName(m.sender)
        const totalreg = Object.keys(global.db.data.users || {}).length
        const muptime = formatUptime(process.uptime())
        const { level = 0 } = global.db.data.users[m.sender] || {}

        // Inicializar chatData
        if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = { modohorny: false }
        const chatData = global.db.data.chats[m.chat]
        if (typeof chatData.modohorny !== 'boolean') chatData.modohorny = false
        const isNSFW = chatData.modohorny === true

        // Categorías
        const tags = {
            'main': '🜲 ACERCA DE',
            'info': '📜 INFO',
            'game': '🎮 JUEGOS',
            'downloader': '📥 DESCARGAS',
            'econ': '💰 ECONOMIA',
            'sticker': '🖼 STICKER',
            'audio': '🎧 AUDIO',
            'search': '🔍 BUSQUEDA',
            'convertidores': '🔄 CONVERTIDORES',
            'group': '👥 GRUPO',
            'tools': '🛠 TOOLS',
            'fun': '🎉 FUN',
            'database': '🗄 DATABASE',
            'xp': '⚔️ NIVEL',
            'owner': '👑 OWNER',
            'netfree': '🌐 TOOLS NETFREE',
        }

        if (isNSFW) {
            tags.adultos = '🔞 ADULTOS'
            tags.videos = '🔞 VIDEOS +18'
        }

        // Agrupar comandos disponibles
        const availableCommands = Object.values(global.plugins || {})
            .filter(p => !p.disabled && p.help && p.tags)
            .filter(p => isNSFW || !p.tags.some(tag => nsfwCategories.includes(tag)))
            .reduce((acc, plugin) => {
                const helps = Array.isArray(plugin.help) ? plugin.help : [plugin.help]
                const tagsArr = Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
                tagsArr.forEach(tag => {
                    if (!acc[tag]) acc[tag] = []
                    acc[tag].push(...helps.filter(Boolean))
                })
                return acc
            }, {})

        // Construir texto del menú
        let menuText = `
╭━━━━━━༺༻━━━━━━╮
${toBold('Nivel:')} ▹ ${level} ◃
${toBold('Rango:')} ▹ ${totalreg} ◃
${toBold('Activo:')} ▹ ${muptime} ◃
╰━━━━━━༺༻━━━━━━╯
╭━━━━━━༺༻━━━━━━╮
「 *EL ARQUITECTO* 」
» https://wa.me/5215629885039
╰━━━━━━༺༻━━━━━━╯
        *🜲 COMANDOS DISPONIBLES 🜲*\n${invisible}`

        for (const [tag, label] of Object.entries(tags)) {
            const cmds = availableCommands[tag] || []
            if (cmds.length === 0) continue

            menuText += `\n┌───『 ${label} 』\n`
            menuText += cmds.map(cmd => `│ ➤ ${usedPrefix}${cmd}`).join('\n')
            menuText += `\n└────────────✦\n`
        }

        menuText += `\n*« El débil no tiene derecho a elegir cómo morirá »*`

        // Descargar imagen
        const thumb = await axios.get('https://i.postimg.cc/zD6LSDZr/IMG-20250509-WA0013.jpg', {
            responseType: 'arraybuffer',
            timeout: 5000
        })

        // Enviar mensaje
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
        }, { quoted: m })
    } catch (e) {
        console.error('Error crítico en el menú:', e)
        await conn.reply(m.chat, `❎ Error crítico al generar el menú:\n${e.message}`, m)
    }
}

// Funciones auxiliares
const toBold = text => `*${text}*`
const toBoldUnicode = text => text.split('').map(c => ({
    A:'𝗔',B:'𝗕',C:'𝗖',D:'𝗗',E:'𝗘',F:'𝗙',G:'𝗚',H:'𝗛',I:'𝗜',J:'𝗝',K:'𝗞',L:'𝗟',M:'𝗠',N:'𝗡',O:'𝗢',P:'𝗣',Q:'𝗤',R:'𝗥',S:'𝗦',T:'𝗧',U:'𝗨',V:'𝗩',W:'𝗪',X:'𝗫',Y:'𝗬',Z:'𝗭',
    a:'𝗮',b:'𝗯',c:'𝗰',d:'𝗱',e:'𝗲',f:'𝗳',g:'𝗴',h:'𝗵',i:'𝗶',j:'𝗷',k:'𝗸',l:'𝗹',m:'𝗺',n:'𝗻',o:'𝗼',p:'𝗽',q:'𝗾',r:'𝗿',s:'𝘀',t:'𝘁',u:'𝘂',v:'𝘃',w:'𝘄',x:'𝘅',y:'𝘆',z:'𝘇',
    0:'𝟬',1:'𝟭',2:'𝟮',3:'𝟯',4:'𝟰',5:'𝟱',6:'𝟲',7:'𝟳',8:'𝟴',9:'𝟵'
}[c]||c)).join('')

const formatUptime = seconds => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = Math.floor(seconds % 60)
    return `${h}h ${m}m ${s}s`
}

// Configuración del comando
handler.help = ['menu']
handler.command = /^(menu|help|comandos|cmds)$/i
export default handler
