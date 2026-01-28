# Deployment Guide - Chatsell Budget Calculator

## Railway Deployment

### Prerequisites
- A Railway account (https://railway.app)
- This repository pushed to GitHub, GitLab, or Bitbucket

### Deployment Steps

1. **Connect to Railway**
   - Go to [railway.app](https://railway.app) and sign in
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository

2. **Configure the Project**
   Railway will automatically detect the Dockerfile and deploy the application.

   The configuration is already set in `railway.json`:
   - Builder: Dockerfile
   - Start Command: `node server.js`
   - Auto-restart on failure

3. **Environment Variables**
   No environment variables are required for basic functionality.

4. **Custom Domain (Optional)**
   - Go to your project settings in Railway
   - Navigate to "Settings" > "Domains"
   - Add your custom domain or use the Railway-provided domain

5. **Deploy**
   - Railway will automatically build and deploy on every push to your main branch
   - Wait for the build to complete (usually 2-5 minutes)
   - Your app will be available at the provided URL

### Deployment from Railway CLI

Alternatively, you can deploy using the Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Manual Build Test (Optional)

To test the Docker build locally before deploying:

```bash
# Build the Docker image
docker build -t chatsell-budget-calculator .

# Run the container
docker run -p 3000:3000 chatsell-budget-calculator

# Visit http://localhost:3000
```

## Features

### Calculadora de Costos (Cost Calculator)
- Main page with predefined Chatsell plans
- Conversation-based pricing tiers
- Extra features and integrations
- Coupon code support
- PDF export with professional template

### Generador de Presupuestos (Budget Generator)
- Custom budget creation at `/presupuesto`
- Dynamic integration items
- Client name input
- Professional PDF export
- 48-hour validity period
- Unique tracking ID for each budget

## File Structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main calculator
│   │   ├── presupuesto/
│   │   │   └── page.tsx          # Custom budget generator
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── lib/
│   │   └── pricing-engine.ts     # Pricing logic
│   └── config/
│       └── pricing-config.ts     # Pricing configuration
├── public/
│   └── logo.png                  # Chatsell logo (required)
├── Dockerfile                    # Docker configuration
├── railway.json                  # Railway configuration
└── package.json
```

## Important Notes

1. **Logo Image**: Make sure the `/public/logo.png` file exists for PDF generation
2. **PDF Generation**: Uses html2canvas and jsPDF for client-side PDF generation
3. **No Database**: All data is client-side, no backend database needed
4. **No API Keys**: No external API keys required

## Troubleshooting

### Build Fails
- Check that `package.json` has all required dependencies
- Verify `next.config.ts` has `output: 'standalone'`

### PDF Not Generating
- Ensure the logo image exists at `/public/logo.png`
- Check browser console for errors
- Verify client name and integration fields are filled

### Page Not Loading
- Check Railway logs for errors
- Verify the port is set to 3000 in the Dockerfile
- Ensure all environment variables are set correctly

## Support

For issues or questions, contact the development team.
