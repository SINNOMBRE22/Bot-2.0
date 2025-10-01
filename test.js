#!/usr/bin/env node
/*
✨══════════════════════════════════✨
🌌 SunJinWoo Plugin Checker 🌌
🚀 Creado por SinNombre +5215629885039
💻 Revisar que todos los plugins y handlers estén correctos
📌 Solo muestra errores si existen
🌟 Version: 1.0
✨══════════════════════════════════✨
*/

import fs from 'fs';
import path, { dirname } from 'path';
import syntaxError from 'syntax-error';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Recorre carpetas recursivamente y obtiene todos los .js, ignorando node_modules
const files = [];
function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue;
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
}
walkDir(__dirname);

let hasError = false;
const errors = [];

// Revisión rápida sin animación
for (const file of files) {
  if (file === __filename) continue;

  const error = syntaxError(fs.readFileSync(file, 'utf8'), file, {
    sourceType: 'module',
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
  });

  if (error) {
    hasError = true;
    errors.push({ file, message: error.message });
  }
}

// Mostrar resultados
if (hasError) {
  console.log(`❌ Se encontraron errores en los siguientes archivos:\n`);
  for (const err of errors) {
    console.log(`💥 ${err.file}\n   ${err.message.replace(/\n/g, '\n   ')}\n`);
  }
} else {
  console.log('✅ Todos los plugins están correctos');
}
