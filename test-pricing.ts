import { calculatePricing, CalculatorState } from "./src/lib/pricing-engine";

const testState: CalculatorState = {
    conversations: 3000,
    instagramComments: true,
    prospectorContacts: 2000,
    bulkMessages: { enabled: true, count: 500 }, // Should be forced to 1000
    agentsTotal: 5, // 2 extra
    linesTotal: 4, // 1 extra
    followupRulesTotal: 3, // 0 extra
    couponCode: "RODOLFO24", // Valid today Dec 31
};

const result = calculatePricing(testState);
console.log(JSON.stringify(result, null, 2));
