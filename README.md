# Chatsell - Sistema de Presupuestos

Sistema completo de calculadora de costos y generador de presupuestos para Chatsell, listo para deployment en Railway.

## Características

### 📊 Calculadora de Costos (/)
- Calculadora interactiva de planes Chatsell
- Precios escalonados por conversaciones
- Extras e integraciones configurables:
  - Comentarios ilimitados de Instagram
  - Prospectador
  - Envíos masivos
  - Agentes extra
  - Líneas de WhatsApp e Instagram
  - Reglas de seguimiento IA
  - Carrito abandonado
- Sistema de cupones de descuento
- Exportación a PDF profesional
- Input de nombre de cliente
- ID de seguimiento único

### 📝 Generador de Presupuestos (/presupuesto)
- Creación de presupuestos personalizados
- Agregar/eliminar integraciones dinámicamente
- Campos por integración:
  - Descripción personalizada
  - Precio unitario
- Cálculo automático de totales
- Exportación a PDF profesional
- Validez de 48 horas
- ID de seguimiento único
- Fecha y hora de generación
- Diseño similar a la calculadora

## Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **PDF:** jsPDF + html2canvas
- **Deployment:** Railway (Docker)
- **TypeScript:** Full type safety

## Instalación Local

```bash
# Clonar el repositorio
git clone <repo-url>
cd Calculadora-integraciones

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar producción
npm start
```

## Deployment en Railway

### Opción 1: UI de Railway (Recomendado)

1. Ve a [railway.app](https://railway.app)
2. Clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Selecciona este repositorio
5. Railway detectará automáticamente el Dockerfile
6. El despliegue tomará 2-5 minutos

### Opción 2: Railway CLI

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Desplegar
railway up
```

### Variables de Entorno

No se requieren variables de entorno para el funcionamiento básico.

## Estructura del Proyecto

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Calculadora principal
│   │   ├── presupuesto/
│   │   │   └── page.tsx                # Generador de presupuestos
│   │   ├── layout.tsx                  # Layout principal
│   │   └── globals.css                 # Estilos globales
│   ├── lib/
│   │   └── pricing-engine.ts           # Lógica de precios
│   └── config/
│       └── pricing-config.ts           # Configuración de precios
├── public/
│   └── logo.png                        # Logo de Chatsell
├── Dockerfile                          # Configuración Docker
├── railway.json                        # Configuración Railway
├── next.config.ts                      # Configuración Next.js
└── package.json
```

## Uso del Sistema

### Calculadora de Costos

1. Ajusta el slider de conversaciones mensuales
2. Activa/desactiva features extra según necesites
3. Ajusta cantidades de agentes, líneas y reglas
4. Aplica cupones de descuento (opcional)
5. Ingresa el nombre del cliente
6. Haz clic en "Quiero este plan"
7. Se descargará un PDF profesional

### Generador de Presupuestos Personalizado

1. Ve a `/presupuesto` o clic en "Crear Presupuesto Personalizado"
2. Ingresa el nombre del cliente
3. Agrega integraciones con el botón "Agregar"
4. Para cada integración:
   - Escribe la descripción (ej: "Integración con WhatsApp Business API")
   - Define el precio unitario en USD
5. Agrega más integraciones si es necesario
6. Revisa el resumen en el panel derecho
7. Clic en "Generar Presupuesto"
8. Se descargará un PDF con formato profesional

## Formato del PDF

Los PDFs generados incluyen:

- **Header:** Logo de Chatsell + título "PRESUPUESTO"
- **Detalles:**
  - Fecha y hora de generación
  - ID de seguimiento único
  - Nombre del cliente
- **Tabla de items:**
  - Descripción de cada integración/plan
  - Cantidad
  - Monto unitario y total
- **Totales:**
  - Subtotal
  - Descuentos (si aplica)
  - Total mensual destacado
- **Términos y Condiciones:**
  - Validez de 48 horas (presupuesto personalizado)
  - Validez de 7 días (calculadora)
  - Condiciones de servicio
- **Footer:** Mensaje de sistema automático

## Configuración de Precios

Los precios se configuran en `src/config/pricing-config.ts`:

### Tiers de Conversaciones
```typescript
{ min: 10000, rate: 0.12 },  // $0.12 por conversación
{ min: 6000, rate: 0.16 },   // $0.16 por conversación
{ min: 3000, rate: 0.20 },   // $0.20 por conversación
{ min: 1000, rate: 0.40 },   // $0.40 por conversación
```

### Extras
```typescript
INSTAGRAM_COMMENTS: { price: 35 },
PROSPECTOR: { pricePerUnit: 150, unitSize: 1000 },
BULK_MESSAGES: { pricePerMessage: 0.06 },
AGENTS: { included: 3, extraPrice: 5 },
LINES: { included: 3, extraPrice: 10 },
FOLLOWUP_RULES: { included: 3, extraPrice: 5 },
```

### Cupones
```typescript
RODOLFO: { discount: 0.20 },    // 20% off
RODOLFO24: { discount: 0.30 },  // 30% off
RODOLFO10: { discount: 0.10 },  // 10% off
```

## Personalización

### Cambiar Logo
Reemplaza `/public/logo.png` con tu logo (recomendado: PNG con fondo transparente, altura ~40px)

### Modificar Colores
Los colores principales están en `src/app/globals.css`:
```css
--primary: 89 117 255;        /* Azul principal */
--primary-hover: 70 100 240;  /* Azul hover */
```

### Ajustar Validez del Presupuesto
En `/presupuesto/page.tsx`, línea ~27:
```typescript
const validUntil = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 horas
```

## Solución de Problemas

### El PDF no se genera
- Verifica que `/public/logo.png` existe
- Asegúrate de llenar todos los campos requeridos
- Revisa la consola del navegador para errores

### Error al compilar
```bash
# Limpia y reinstala dependencias
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### El servidor no inicia en Railway
- Verifica que `next.config.ts` tiene `output: 'standalone'`
- Revisa los logs en Railway dashboard
- Asegúrate de que el puerto 3000 está configurado

## Scripts Disponibles

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar para producción
npm start        # Ejecutar build de producción
npm run lint     # Linter de código
```

## Licencia

Propiedad de Chatsell.

## Soporte

Para preguntas o soporte, contacta al equipo de desarrollo de Chatsell.
