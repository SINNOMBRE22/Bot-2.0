import { readFileSync } from 'fs';
import { join } from 'path';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const wm = 'SunJimWoo Bot';
    
    // Datos directos
    const donationData = {
      clabe: '138580000030466501',
      banco: 'uala',
      beneficiario: 'Cristian Aguilar',
      paypal: 'https://www.paypal.me/sinnombre395',
      contacto: '5215629885039'
    };

    // Intentar cargar del JSON
    try {
      const esPath = join(process.cwd(), 'src', 'languages', 'es.json');
      const esData = JSON.parse(readFileSync(esPath, 'utf8'));
      const textoDonar = esData.info_donar.texto1;
      
      textoDonar.forEach(linea => {
        if (linea.includes('𝙲𝙻𝙰𝚅𝙴:')) donationData.clabe = linea.split('*')[0].replace('𝙲𝙻𝙰𝚅𝙴:', '').trim();
        if (linea.includes('𝙱𝙰𝙽𝙲𝙾:')) donationData.banco = linea.split('*')[0].replace('𝙱𝙰𝙽𝙲𝙾:', '').trim();
        if (linea.includes('𝙱𝙴𝙽𝙴𝙵𝙸𝙲𝙸𝙰𝚁𝙸𝙾:')) donationData.beneficiario = linea.split('*')[0].replace('𝙱𝙴𝙽𝙴𝙵𝙸𝙲𝙸𝙰𝚁𝙸𝙾:', '').trim();
        if (linea.includes('𝙿𝙰𝚈𝙿𝙰𝙻:')) donationData.paypal = linea.split('*')[0].replace('𝙿𝙰𝚈𝙿𝙰𝙻:', '').trim();
        if (linea.includes('wa.me')) donationData.contacto = linea.split('*')[0].replace('wa.me/', '').trim();
      });
    } catch (jsonError) {
      console.log('Usando datos por defecto para donaciones');
    }

    const donar = `
╭─「 💖 DONACIONES 💖 」
│
│ ¡Hola *${m.name || 'usuario'}*! 👋
│ 
│ Si deseas apoyar el desarrollo
│ del bot, puedes hacerlo mediante:
│
│ ▸ *CLABE:* ${donationData.clabe}
│ ▸ *Banco:* ${donationData.banco}
│ ▸ *Beneficiario:* ${donationData.beneficiario}
│ ▸ *PayPal:* ${donationData.paypal}
│
│ ¡Tu apoyo es muy importante! 💞
╰────`.trim();

    // Crear mensaje con botones usando la estructura más común
    const message = {
      text: donar,
      footer: wm,
      buttons: [
        {
          url: donationData.paypal,
          displayText: '💰 Donar por PayPal'
        },
        {
          url: `https://wa.me/${donationData.contacto}`,
          displayText: '📞 Contactar al Creador'
        }
      ],
      headerType: 1
    };

    // Enviar usando sendButton (más compatible)
    await conn.sendButton(
      m.chat, 
      donar, 
      wm, 
      null, 
      [
        ['💰 PayPal', donationData.paypal],
        ['📞 Contactar', `https://wa.me/${donationData.contacto}`]
      ], 
      m
    );

  } catch (error) {
    console.error('Error en comando donar:', error);
    
    // Mensaje de respaldo con enlaces en el texto
    const simpleMsg = `💖 *DONACIONES*

¡Hola *${m.name || 'usuario'}*! 

Para donar:
• CLABE: 138580000030466501
• Banco: uala
• Beneficiario: Cristian Aguilar

*Enlaces directos:*
🔗 PayPal: https://www.paypal.me/sinnombre395
📞 Contacto: https://wa.me/5215629885039

¡Tu apoyo es muy importante! 💞`;
    
    m.reply(simpleMsg);
  }
};

handler.help = ['donar'];
handler.tags = ['info'];
handler.command = /^(donar|apoyar|donate)$/i;
export default handler;
