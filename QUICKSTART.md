# Quick Start - Sistema de Presupuestos Chatsell

## Para Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir en navegador
# http://localhost:3000 - Calculadora
# http://localhost:3000/presupuesto - Generador de presupuestos
```

## Para Desplegar en Railway

### Método 1: GitHub (Recomendado)

1. Sube este código a GitHub
2. Ve a [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Selecciona el repositorio
5. Espera 2-5 minutos
6. ¡Listo! Tu app está en línea

### Método 2: Railway CLI

```bash
# Instalar CLI
npm i -g @railway/cli

# Deploy
railway login
railway init
railway up
```

## URLs del Sistema

- `/` - Calculadora de costos con planes preconfigurados
- `/presupuesto` - Generador de presupuestos personalizados

## Cómo Usar

### Calculadora de Costos (/)

1. Ajusta conversaciones mensuales con el slider
2. Activa features extras que necesites
3. Ingresa nombre del cliente
4. Click "Quiero este plan"
5. Descarga el PDF

### Generador de Presupuestos (/presupuesto)

1. Ingresa nombre del cliente
2. Click "Agregar" para cada integración
3. Describe la integración y su precio
4. Click "Generar Presupuesto"
5. Descarga el PDF

## Archivos Importantes

- `src/app/page.tsx` - Calculadora principal
- `src/app/presupuesto/page.tsx` - Generador personalizado
- `src/config/pricing-config.ts` - Configuración de precios
- `public/logo.png` - Logo de Chatsell (necesario para PDFs)

## Personalización Rápida

### Cambiar precios:
Edita `src/config/pricing-config.ts`

### Cambiar logo:
Reemplaza `public/logo.png`

### Cambiar colores:
Edita `src/app/globals.css`

## ¿Problemas?

```bash
# Limpiar y reinstalar
rm -rf node_modules .next
npm install
npm run build
```

## Soporte

Ver `README.md` para documentación completa o `DEPLOYMENT.md` para guía detallada de deployment.
