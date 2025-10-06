
<div align="center">

# 💠 **BOT-2.0**
### 🤖 Creado y desarrollado por **SinNombre**

🌀 El sucesor evolucionado del legendario bot Mystic.  
Potente, modular y 100% optimizado para VPS y ejecución continua.

![banner](https://capsule-render.vercel.app/api?type=waving&color=0:3a0ca3,100:7209b7&height=120&section=header&text=BOT-2.0&fontColor=ffffff&fontSize=45&animation=twinkling)

</div>

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

💾 3. Clonar el repositorio

git clone https://github.com/SINNOMBRE22/Bot-2.0

cd Bot-2.0


---

⚡ 4. Instalar Node.js (método NVM recomendado)

Actualizar Node.js

apt install nodejs

node -v  # Verificamos la versión actual

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

source ~/.nvm/nvm.sh

nvm --version

nvm ls-remote

nvm install 22.6.0   # Versión recomendada


---

📘 5. Instalar dependencias del bot

npm install


---

🚀 6. Iniciar el bot

node index.js

💡 O mantenerlo activo 24/7 con PM2

npm install -g pm2
pm2 start index.js --name "Bot-2.0"
pm2 save
pm2 startup


---

🔄 7. Actualizar el bot manualmente

git pull origin main
npm install
pm2 restart Bot-2.0


---

<div align="center">🧠 Créditos

Desarrollado con ❤️ por SinNombre
✨ Basado en la evolución del sistema Mystic, totalmente renovado.



🌐 Visitar el proyecto en GitHub

</div>
```
