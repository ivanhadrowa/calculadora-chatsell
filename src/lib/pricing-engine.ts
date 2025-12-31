import { CONVERSATION_TIERS, EXTRAS_CONFIG, COUPONS } from "@/config/pricing-config";

export interface CalculatorState {
    conversations: number;
    instagramComments: boolean;
    prospectorContacts: number;
    bulkMessages: {
        enabled: boolean;
        count: number;
    };
    agentsTotal: number;
    linesTotal: number;
    followupRulesTotal: number;
    couponCode: string;
}

export interface BreakdownItem {
    key: string;
    label: string;
    qty: number;
    unitPrice?: number;
    subtotal: number;
}

export interface CalculationResult {
    base: {
        rate: number;
        subtotal: number;
    };
    extrasBreakdown: BreakdownItem[];
    subtotal: number;
    discount: {
        code: string;
        percentage: number;
        amount: number;
    } | null;
    total: number;
}

export function getConversationRate(n: number): number {
    const tier = CONVERSATION_TIERS.find((t) => n >= t.min);
    return tier ? tier.rate : CONVERSATION_TIERS[CONVERSATION_TIERS.length - 1].rate;
}

export function calculatePricing(state: CalculatorState): CalculationResult {
    // 1. Base Calculation
    const rate = getConversationRate(state.conversations);
    const baseSubtotal = state.conversations * rate;

    // 2. Extras Breakdown
    const extrasBreakdown: BreakdownItem[] = [];

    if (state.instagramComments) {
        extrasBreakdown.push({
            key: "instagram_comments",
            label: EXTRAS_CONFIG.INSTAGRAM_COMMENTS.label,
            qty: 1,
            subtotal: EXTRAS_CONFIG.INSTAGRAM_COMMENTS.price,
        });
    }

    if (state.prospectorContacts > 0) {
        const units = Math.ceil(state.prospectorContacts / EXTRAS_CONFIG.PROSPECTOR.unitSize);
        extrasBreakdown.push({
            key: "prospector",
            label: EXTRAS_CONFIG.PROSPECTOR.label,
            qty: state.prospectorContacts,
            unitPrice: EXTRAS_CONFIG.PROSPECTOR.pricePerUnit,
            subtotal: units * EXTRAS_CONFIG.PROSPECTOR.pricePerUnit,
        });
    }

    if (state.bulkMessages.enabled && state.bulkMessages.count > 0) {
        const count = Math.max(state.bulkMessages.count, EXTRAS_CONFIG.BULK_MESSAGES.minMessages);
        extrasBreakdown.push({
            key: "bulk_messages",
            label: EXTRAS_CONFIG.BULK_MESSAGES.label,
            qty: count,
            unitPrice: EXTRAS_CONFIG.BULK_MESSAGES.pricePerMessage,
            subtotal: count * EXTRAS_CONFIG.BULK_MESSAGES.pricePerMessage,
        });
    }

    if (state.agentsTotal > EXTRAS_CONFIG.AGENTS.included) {
        const extraQty = state.agentsTotal - EXTRAS_CONFIG.AGENTS.included;
        extrasBreakdown.push({
            key: "agents",
            label: `${EXTRAS_CONFIG.AGENTS.label} extra`,
            qty: extraQty,
            unitPrice: EXTRAS_CONFIG.AGENTS.extraPrice,
            subtotal: extraQty * EXTRAS_CONFIG.AGENTS.extraPrice,
        });
    }

    if (state.linesTotal > EXTRAS_CONFIG.LINES.included) {
        const extraQty = state.linesTotal - EXTRAS_CONFIG.LINES.included;
        extrasBreakdown.push({
            key: "lines",
            label: `${EXTRAS_CONFIG.LINES.label} extra`,
            qty: extraQty,
            unitPrice: EXTRAS_CONFIG.LINES.extraPrice,
            subtotal: extraQty * EXTRAS_CONFIG.LINES.extraPrice,
        });
    }

    if (state.followupRulesTotal > EXTRAS_CONFIG.FOLLOWUP_RULES.included) {
        const extraQty = state.followupRulesTotal - EXTRAS_CONFIG.FOLLOWUP_RULES.included;
        extrasBreakdown.push({
            key: "followup_rules",
            label: `${EXTRAS_CONFIG.FOLLOWUP_RULES.label} extra`,
            qty: extraQty,
            unitPrice: EXTRAS_CONFIG.FOLLOWUP_RULES.extraPrice,
            subtotal: extraQty * EXTRAS_CONFIG.FOLLOWUP_RULES.extraPrice,
        });
    }

    const extrasSubtotal = extrasBreakdown.reduce((sum, item) => sum + item.subtotal, 0);
    const subtotal = baseSubtotal + extrasSubtotal;

    // 3. Discount
    let discount = null;
    const upperCode = state.couponCode.toUpperCase();
    const coupon = COUPONS[upperCode as keyof typeof COUPONS];

    if (coupon && coupon.isValid()) {
        const amount = subtotal * coupon.discount;
        discount = {
            code: upperCode,
            percentage: coupon.discount,
            amount: amount,
        };
    }

    const total = subtotal - (discount?.amount || 0);

    return {
        base: {
            rate,
            subtotal: baseSubtotal,
        },
        extrasBreakdown,
        subtotal,
        discount,
        total,
    };
}
