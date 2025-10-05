// server.js
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Socket } from 'socket.io';
import { toBuffer } from 'qrcode';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// -------------------------
// 🧩 SERVIDOR PRINCIPAL DEL BOT (QR en puerto 3000)
// -------------------------
function connect(conn, PORT) {
  const app = global.app = express();
  const server = global.server = createServer(app);
  let _qr = 'El código QR es inválido o ya fue escaneado.';

  // Evento de actualización del QR
  conn.ev.on('connection.update', function appQR({ qr }) {
    if (qr) _qr = qr;
  });

  // Mostrar QR como imagen PNG
  app.use(async (req, res) => {
    res.setHeader('content-type', 'image/png');
    res.end(await toBuffer(_qr));
  });

  // Iniciar el servidor del bot
  server.listen(PORT, () => {
    console.log(`[ ℹ️ ] Servidor QR activo en puerto ${PORT}`);
    if (opts['keepalive']) keepAlive();
  });
}

// -------------------------
// 🔁 FUNCIONES AUXILIARES
// -------------------------
function pipeEmit(event, event2, prefix = '') {
  const old = event.emit;
  event.emit = function (event, ...args) {
    old.emit(event, ...args);
    event2.emit(prefix + event, ...args);
  };
  return {
    unpipeEmit() {
      event.emit = old;
    }
  };
}

function keepAlive() {
  const url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;
  if (/(\/\/|\.)undefined\./.test(url)) return;
  setInterval(() => {
    fetch(url).catch(console.error);
  }, 5 * 1000 * 60);
}

// Exportar la función principal del bot
export default connect;

// -------------------------
// 🌐 SERVIDOR WEB ESTÁTICO
// -------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appWeb = express();

// Servir archivos estáticos desde la carpeta del bot
appWeb.use(express.static(__dirname));

// Ruta principal que carga index.html
appWeb.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Puerto de la web (usa 8080 para no chocar con 80 o 443)
const WEB_PORT = 8080;

// Iniciar servidor web
appWeb.listen(WEB_PORT, () => {
  console.log(`🌍 Página web activa en http://colegialas.site:${WEB_PORT}`);
});
