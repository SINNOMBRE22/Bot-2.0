// usuarios-demo.js
// 🚀 Plugin creado por SinNombre

import { exec as _exec } from 'child_process'
import { promisify } from 'util'
import { readFile } from 'fs/promises'

const exec = promisify(_exec)

let handler = async (m, { conn, command }) => {
  global.db.data.users[m.sender].comandos++

  const ownerNumber = global.owner[0][0].replace(/\D/g, '') + '@s.whatsapp.net'
  const isOwner = m.sender === ownerNumber

  // 🔒 Cooldown (3 días en ms)
  const COOLDOWN = 259200000
  const last = global.db.data.users[m.sender].lastusuario || 0
  if (!isOwner && Date.now() - last < COOLDOWN) {
    const wait = msToTime(COOLDOWN - (Date.now() - last))
    throw `⏱️ ¡Espera ${wait} antes de crear otro usuario!`
  }
  global.db.data.users[m.sender].lastusuario = Date.now()

  // 👤 Usuario destino
  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)

  await m.reply("💻 Creando usuario random, espera...")

  // 🚀 Ejecutar comando
  let stdout = ''
  try {
    const { stdout: out } = await exec('userbot')
    stdout = out
  } catch (e) {
    stdout = e.stdout || e.message
  }

  // 🔗 Link para miniatura clickeable
  const waLink = "https://wa.me/message/VM4JCHQ5RF45K1"

  // 🟢 Mensaje al grupo (miniatura clickeable)
  const imageGroup = await readFile('src/images/usuarios-demo.png')
  await sendWithThumb(
    conn,
    m.chat,
    `𝑵𝒐 𝒐𝒍𝒗𝒊𝒅𝒆𝒔 𝒒𝒖𝒆 𝒑𝒖𝒆𝒅𝒆𝒔 𝒉𝒂𝒄𝒆𝒓 𝒕𝒖 𝒅𝒐𝒏𝒂𝒄𝒊𝒐𝒏, 𝒄𝒐𝒏 𝒍𝒂 𝒄𝒖𝒂𝒍 𝒎𝒂𝒏𝒕𝒆𝒏𝒆𝒎𝒐𝒔 𝒆𝒍 𝒃𝒐𝒕 𝒚 𝒔𝒆𝒓𝒗𝒊𝒅𝒐𝒓𝒆𝒔 𝒂𝒄𝒕𝒊𝒗𝒐𝒔.\n𝑷𝒂𝒓𝒂 𝒎𝒂́𝒔 𝒊𝒏𝒇𝒐 /𝒅𝒐𝒏𝒂𝒓`,
    '✅ Cuenta generada',
    '🎉 Datos enviados en privado',
    imageGroup,
    waLink
  )

  // 🟣 Mensaje privado con miniatura clickeable
  const thumbnailPrivate = await readFile('src/images/usuarios-demo.png')
  await conn.sendMessage(who, {
    text: `❏ Para Puertos Ssl WS Usar Payload\n\n${m.quoted ? stdout + m.quoted.text : stdout}`,
    contextInfo: {
      externalAdReply: {
        title: "Abrir chat directo",
        body: "Haz clic para ir al WhatsApp",
        thumbnail: thumbnailPrivate,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: waLink, // 🔗 obligatorio
        mediaUrl: waLink,  // 🔗 forzar apertura
        mediaType: 1,
      }
    }
  })
}

handler.help = ['user']
handler.tags = ['netfree']
handler.command = /^(usuario|user)$/i
handler.group = true

export default handler

// 📌 Función para enviar mensaje con miniatura clickeable
async function sendWithThumb(conn, jid, text, title, body, thumbnail, link) {
  return conn.sendMessage(jid, {
    text,
    contextInfo: {
      externalAdReply: {
        title,
        body,
        thumbnail,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: link, // 🔗 hace que la miniatura sea clickeable
        mediaUrl: link,  // 🔗 refuerzo del enlace
      }
    }
  })
}

// 📌 Función para formatear el tiempo
function msToTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  const days = Math.floor(duration / (1000 * 60 * 60 * 24))

  return `${days} día(s) ${hours} hora(s) ${minutes} minuto(s) ${seconds} segundo(s)`
}

// 🔧 Fin del plugin
// © Creado por SinNombre
