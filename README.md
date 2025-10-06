<div align="center">

# ⚡ Bot WhatsApp Multi-Función  
### 🤖 Proyecto privado desarrollado por **SinNombre**

<img src="https://img.shields.io/badge/Versión-1.0.0-blue?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Node.js-LTS-green?style=for-the-badge&logo=node.js"/>
<img src="https://img.shields.io/badge/Estado-Actual-estable-brightgreen?style=for-the-badge"/>

</div>

---

## 🌟 Descripción

Bot avanzado para WhatsApp con sistema modular, comandos personalizados y funciones multimedia.  
Optimizado para ejecutarse en **VPS o servidores 24/7**, con un enfoque en velocidad y estabilidad.

---

## 💻 Requisitos

- 🐧 Ubuntu **20.04 / 22.04 / 24.04**  
- 🔐 Acceso root o permisos `sudo`  
- 🌐 Conexión a Internet estable  
- 📱 Un número de WhatsApp para vincular

---

## 🧩 1. Actualizar el sistema

Primero, actualiza los paquetes del sistema:

```bash
sudo apt update && sudo apt upgrade -y


---

⚙️ 2. Instalar dependencias principales

Instala los paquetes básicos necesarios:

sudo apt install -y git ffmpeg imagemagick webp curl wget python3-pip


---

🟢 3. Instalar Node.js (versión LTS)

> ⚠️ Aquí puedes colocar tus comandos personalizados para instalar Node.js.
Ejemplo (recomendado):



curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

sudo apt install -y nodejs

Verifica la instalación:

node -v

npm -v

Debe mostrar una versión 18 o superior.


---

🧠 4. Clonar el repositorio

Descarga el código del bot y entra a la carpeta:

git clone https://github.com/SINNOMBRE22/Bot-2.0

cd Bot-2.0


---

📦 5. Instalar dependencias del proyecto

Instala los módulos de Node.js:

npm install

Si aparece algún error:

npm install --force


---

⚙️ 6. Configurar el bot

Copia el archivo de configuración y edítalo:

cp config.js.example config.js

nano config.js

Modifica los valores de propietario, prefijo y demás ajustes según tus preferencias.


---

🚀 7. Iniciar el bot

Inicia el bot por primera vez:

npm start

O también puedes usar:

node index.js

Luego, escanea el código QR que aparece en consola con WhatsApp Web desde tu teléfono.


---

♾️ 8. Mantener el bot activo 24/7

Instala pm2 para mantener el bot en ejecución incluso después de cerrar la terminal:

npm install -g pm2

Inicia el bot con PM2:

pm2 start index.js --name "bot"

Guarda la configuración:

pm2 save

Habilita el inicio automático al reiniciar el servidor:

pm2 startup


---

🧹 9. Comandos útiles de PM2

Ver todos los procesos:

pm2 list

Ver logs del bot:

pm2 logs bot

Reiniciar el bot:

pm2 restart bot

Detener el bot:

pm2 stop bot

Eliminar el proceso del bot:

pm2 delete bot


---

🔄 10. Actualizar el bot

Actualiza el código y dependencias fácilmente:

git pull

npm install

pm2 restart bot


---

🧩 Estructura del proyecto

Bot-2.0/
 ┣ 📂 plugins/        # Comandos del bot
 ┣ 📂 media/          # Stickers, audios, imágenes
 ┣ 📜 index.js        # Archivo principal
 ┣ 📜 config.js       # Configuración del bot
 ┣ 📜 package.json    # Dependencias del proyecto
 ┗ 📜 README.md       # Documentación (este archivo)


---

<div align="center">💬 “El código evoluciona, nunca se detiene.”

— SinNombre

<img src="https://img.shields.io/badge/Node.js-brightgreen?style=for-the-badge&logo=node.js"/>
<img src="https://img.shields.io/badge/PM2-Autostart-blue?style=for-the-badge&logo=pm2"/>
<img src="https://img.shields.io/badge/Ubuntu-24.04-orange?style=for-the-badge&logo=ubuntu"/></div>
```
