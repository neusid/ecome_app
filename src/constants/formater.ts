import { formatCurrency } from "react-native-format-currency";

export const TransformPrice = (price: number): string => {
    const roundedPrice = Math.round(price * 100) / 100;

    const [withSymbol] = formatCurrency({
        amount: roundedPrice,
        code: "USD",
    });

    return withSymbol;
};