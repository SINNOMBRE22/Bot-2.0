const handler = async (m, { conn, text, usedPrefix, command }) => {
  // Verificación de permisos en caso de grupos (aunque este comando es solo para el owner)
  let isAdmin = false;
  if (m.isGroup) {
    const groupMetadata = await conn.groupMetadata(m.chat);
    isAdmin = groupMetadata.participants.some(p =>
      p.id === m.sender && (p.admin === 'admin' || p.admin === 'superadmin')
    );
  }

  // El comando bcgc2 es exclusivo del dueño
  if (/^bcgc2$/i.test(command)) {
    // No se requiere validación adicional porque handler.owner = true
  }

  // Obtener mensaje del texto escrito o de mensaje citado
  const pesan = m.quoted?.text || text;
  if (!pesan) throw "⚠️ *Error:* Debes ingresar un mensaje.";

  // Formato premium tipo tarjeta
  const broadcastMessage = `
❖──────────────────❖
      📢 COMUNICADO
❖──────────────────❖

${pesan}

❖──────────────────❖
🤖 Sung Jin-Woo
`;

  if (/^bcgc2$/i.test(command)) {
    // Se envía el comunicado a todos los grupos
    const groupsData = await conn.groupFetchAllParticipating();
    const groups = Object.values(groupsData).map(group => group.id);

    if (groups.length === 0) {
      return m.reply("⚠️ *No hay grupos disponibles para enviar el mensaje.*");
    }

    // Retardo para evitar flood (500ms entre cada envío)
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let count = 0;

    for (const groupId of groups) {
      try {
        // Se obtienen los participantes para usarlos en "mentions"
        const groupMetadata = await conn.groupMetadata(groupId);
        const participants = groupMetadata.participants.map(user => user.id);

        await conn.sendMessage(groupId, {
          text: broadcastMessage,
          mentions: participants
        });

        count++;
        await delay(500);
      } catch (e) {
        console.error(`❌ Error enviando a ${groupId}:`, e);
      }
    }

    m.reply(`✅ *Comunicado enviado a ${count} grupo(s).*`);
  }
};

// Configuración del handler
handler.help = ['bcgc2 <mensaje>'];
handler.tags = ['owner', 'group'];
handler.command = /^(bcgc2)$/i;
handler.owner = true; // Solo el dueño puede usar este comando
handler.admin = false;

export default handler;
