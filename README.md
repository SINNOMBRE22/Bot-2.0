<div align="center">

# 💠 **BOT-2.0**
### 🤖 Creado y desarrollado por **SinNombre**

🌀 Potente, modular y 100% optimizado para VPS y ejecución continua.

![banner](https://capsule-render.vercel.app/api?type=waving&color=0:3a0ca3,100:7209b7&height=120&section=header&text=Sun-JinWoo&fontColor=ffffff&fontSize=45&animation=twinkling)

</div>

> ⚠️ **Aviso:**  
> Algunos plugins (como `usuarios-demo`) necesitan una extensión de código adicional no incluida en el paquete principal.  
> 🔑 Para adquirirla, contacta directamente al creador.  
> 💰 Precio: **$200 MXN**

---

## ⚙️ **Requisitos Previos**

Antes de comenzar asegúrate de tener:

- 🐧 **Ubuntu 20.04 / 22.04 / 24.04**
- 🔐 Acceso root o permisos `sudo`
- 🌐 Conexión a Internet estable

---

## 🧩 **1. Actualizar el sistema**

```bash
sudo apt update && sudo apt upgrade -y


---

📦 2. Instalar dependencias necesarias

sudo apt install -y git ffmpeg imagemagick webp curl


---

🧰 3. Instalar librerías de compilación (recomendado)

Estas librerías del sistema permiten que algunos módulos de Node.js (como canvas, sharp o ffmpeg-static) se instalen y funcionen correctamente.

sudo apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config


---

🔧 3.1 Reparar módulos nativos (opcional pero recomendado)

Si al iniciar el bot aparece un error relacionado con
Error: Cannot find module '../build/Release/canvas.node',
ejecuta esto una sola vez:

npm rebuild canvas --build-from-source || npm install canvas --build-from-source

> 🧩 Esto recompila el módulo canvas y evita errores con jsdom o procesamiento de imágenes.




---

⚡ 4. Instalar Node.js (método NVM recomendado)

Instala y configura Node.js con NVM para mantener la versión estable del bot.

sudo apt install nodejs
node -v
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm --version
nvm ls-remote
nvm install 22.6.0

> ⚙️ Si ya tienes NVM, solo asegúrate de usar Node 22 o superior:



nvm use 22.6.0


---

💾 5. Clonar el repositorio

git clone https://github.com/SINNOMBRE22/Bot-2.0
cd Bot-2.0


---

📘 6. Instalar dependencias del bot

npm install

> 💡 Si aparece un error con canvas, vuelve a ejecutar:

npm rebuild canvas --build-from-source




---

🚀 7. Iniciar el bot

node index.js

💡 O mantenerlo activo 24/7 con PM2:

npm install -g pm2
pm2 start index.js --name "Bot"
pm2 save
pm2 startup


---

🔄 8. Actualizar el bot manualmente

git pull origin main
npm install
pm2 restart Bot-2.0


---

🧰 9. Reparación automática (si el bot no arranca)

Si el bot no inicia o muestra errores de módulos nativos, puedes ejecutar:

sudo apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config
npm rebuild --build-from-source
npm install
pm2 restart Bot-2.0

Esto reconstruye todos los módulos binarios y repara dependencias dañadas.


---

<div align="center">🧠 Créditos

Desarrollado con ❤️ por SinNombre
✨ Basado en la evolución del sistema.
🌐 Compatible con entornos VPS, Cloud y Localhost.

</div>
```