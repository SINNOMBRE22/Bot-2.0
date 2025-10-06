
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
```

---

📦 2. Instalar dependencias necesarias
```bash
sudo apt install -y git ffmpeg imagemagick webp curl
```
🧰 3. Instalar librerías de compilación (recomendado)

Estas librerías del sistema permiten que algunos módulos de Node.js (como canvas, sharp, o ffmpeg-static) se instalen y funcionen correctamente.

```bash
sudo apt install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev pkg-config
```
---

⚡ 4. Instalar Node.js (método NVM recomendado)

Actualizar Node.js
```bash
apt install nodejs
node -v
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm --version
nvm ls-remote
nvm install 22.6.0 
```
---
💾 5. Clonar el repositorio
```bash
git clone https://github.com/SINNOMBRE22/Bot-2.0

cd Bot-2.0

```
---
📘 6. Instalar dependencias del bot
```bash
npm install
```

> Instala dependencias del sistema necesarias para canvas
```bash
apt-get update
apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Limpia e instala de nuevo canvas
```bash
npm rebuild canvas --build-from-source
```
Si lo anterior no funciona:
```bash
npm install canvas --build-from-source
```

---

🚀 7. Iniciar el bot
```bash
node index.js
```
💡 O mantenerlo activo 24/7 con PM2
```bash
npm install -g pm2
pm2 start index.js --name "Bot"
pm2 save
pm2 startup
```

---

🔄 8. Actualizar el bot manualmente
```bash
git pull origin main
npm install
pm2 restart Bot-2.0
```
---
<div align="center">🧠 Créditos

Desarrollado con ❤️ por SinNombre
✨ Basado en la evolución del sistema.
</div>
