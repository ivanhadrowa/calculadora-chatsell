export interface PricingTier {
  min: number;
  rate: number;
}

export const CONVERSATION_TIERS: PricingTier[] = [
  { min: 10000, rate: 0.12 },
  { min: 6000, rate: 0.16 },
  { min: 3000, rate: 0.20 },
  { min: 1000, rate: 0.40 },
  { min: 0, rate: 0.40 }, // Default for < 1000
];

export const EXTRAS_CONFIG = {
  INSTAGRAM_COMMENTS: {
    price: 35,
    label: "Comentarios Instagram ilimitados",
  },
  PROSPECTOR: {
    pricePerUnit: 150,
    unitSize: 1000,
    label: "Prospectador",
  },
  BULK_MESSAGES: {
    pricePerMessage: 0.06,
    minMessages: 1000,
    label: "Envíos masivos",
  },
  AGENTS: {
    included: 3,
    extraPrice: 5,
    label: "Agentes",
  },
  LINES: {
    included: 3,
    extraPrice: 10,
    label: "Líneas WhatsApp e Instagram",
  },
  FOLLOWUP_RULES: {
    included: 3,
    extraPrice: 5,
    label: "Seguimientos IA por chat",
  },
  ABANDONED_CART: {
    price: 180,
    label: "Carrito Abandonado por WhatsApp",
    show: false,
  },
};

export const COUPONS = {
  RODOLFO: {
    discount: 0.20,
    isValid: () => {
      const now = new Date();
      const day = now.getDay();
      return day >= 1 && day <= 5; // Monday to Friday (1-5)
    },
    message: "20% de descuento (Lunes a Viernes)",
  },
  RODOLFO24: {
    discount: 0.30,
    isValid: () => {
      return true;
    },
    message: "30% de descuento (Solo hoy!)",
  }
};
