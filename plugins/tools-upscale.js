import fs from "fs"
import axios from "axios"
import uploadImage from "../src/libraries/uploadImage.js"

const handler = async (m, { conn, usedPrefix, command }) => {
  const idioma = global.db.data.users[m.sender]?.language || global.defaultLenguaje
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/${idioma}.json`))
  const tradutor = _translate.plugins.herramientas_hd

  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ""

    if (!mime) throw `${tradutor.texto1} ${usedPrefix + command}*`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `${tradutor.texto2[0]} (${mime}) ${tradutor.texto2[1]}`

    await m.reply(tradutor.texto3)

    // Descargar imagen base
    const img = await q.download()
    const fileUrl = await uploadImage(img)

    // Mejorar imagen con StellarWA
    const resultBuffer = await upscaleWithStellar(fileUrl)

    // Verificar que sea un buffer real
    if (!Buffer.isBuffer(resultBuffer) || resultBuffer.length < 1000) {
      throw new Error("La imagen devuelta por StellarWA no es válida.")
    }

    // Enviar imagen mejorada
    await conn.sendMessage(
      m.chat,
      { image: resultBuffer, caption: tradutor.texto5 || "✅ Imagen mejorada con éxito" },
      { quoted: m }
    )

  } catch (e) {
    console.error("❌ Error en el comando HD:", e)
    await m.reply(tradutor.texto4 + "\n\n" + e.message)
  }
}

handler.help = ["remini", "hd", "enhance"]
handler.tags = ["ai", "tools"]
handler.command = ["remini", "hd", "enhance"]
export default handler

// 🧠 Función para procesar con StellarWA
async function upscaleWithStellar(url) {
  const endpoint = `https://api.stellarwa.xyz/tools/upscale?url=${url}&apikey=TheMystic`

  try {
    const res = await axios.get(endpoint, { responseType: "arraybuffer" })

    // Si devuelve JSON, intentar leer result.url
    const text = res.headers["content-type"]
    if (text && text.includes("application/json")) {
      const json = JSON.parse(Buffer.from(res.data).toString())
      if (json.result) {
        const imgRes = await axios.get(json.result, { responseType: "arraybuffer" })
        return Buffer.from(imgRes.data)
      } else {
        throw new Error("Respuesta JSON sin resultado válido.")
      }
    }

    // Si ya es imagen, devolver buffer directamente
    return Buffer.from(res.data)
  } catch (err) {
    throw new Error("Error al conectar con StellarWA: " + err.message)
  }
}
