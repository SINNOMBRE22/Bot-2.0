const { createPDFDocument, addImageToPDF } = await import(new URL('../src/libraries/canvaspdf.js', import.meta.url));
import { promises as fs } from 'fs';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (!/image/g.test(mime)) {
      throw `Necesitas responder a una *imagen* con el comando ${usedPrefix + command}`;
    }

    const img = await q.download?.();
    if (!img) throw `No se pudo descargar la imagen.`;

    let pdfId;
    let isNewPdf = false;

    if (!text) {
      // Crear un nuevo PDF
      const pdfDocument = await createPDFDocument();
      pdfId = pdfDocument.pdfId;
      isNewPdf = true;
    } else {
      // Añadir imagen a un PDF existente
      pdfId = text.trim();
    }

    const pdfResult = await addImageToPDF(pdfId, img);

    // pdfResult debería devolver un path al archivo PDF generado
    const pdfPath = pdfResult?.result?.path || pdfResult?.path || null;
    if (!pdfPath) throw `No se pudo generar el PDF correctamente.`;

    const pdfBuffer = await fs.readFile(pdfPath);

    await conn.sendMessage(
      m.chat,
      {
        document: pdfBuffer,
        mimetype: 'application/pdf',
        fileName: `${pdfId}.pdf`,
        ...(isNewPdf ? { caption: `ID: ${pdfId}` } : {})
      },
      { quoted: m }
    );

  } catch (e) {
    console.error('Error en canvas-topdf_off:', e);
    await conn.reply(m.chat, `❌ Error: ${e.message || e}`, m);
  }
};

handler.command = /^(tesi)$/i;
export default handler;
