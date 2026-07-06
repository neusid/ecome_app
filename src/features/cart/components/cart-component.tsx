import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
    deleteCart,
    increaseCart,
} from "@/data/repositories/firestore.repository";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { formatCurrency } from "react-native-format-currency";

type ProductCardComponentProps = {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    quantity: number,
    onUpdate: () => void;
};

type Rating = {
    rate: number;
    count: number;
}

export default function CartComponent(
    product: ProductCardComponentProps
) {
    const TransformPrice = (): string => {
        const roundedPrice = Math.round(product.price * 100) / 100;

        const [withSymbol] = formatCurrency({
            amount: roundedPrice,
            code: "USD",
        });

        return withSymbol;
    };

    const handleDecrease = async () => {
        await deleteCart(product.id, product.quantity);
        product.onUpdate();
    };

    const handleIncrease = async () => {
        await increaseCart(product.id, product.quantity);
        product.onUpdate();
    };

    return (
        <ThemedView style={[styleCart.cardContainer, styleCart.shadow]}>
            <ThemedView
                style={{
                    borderTopLeftRadius: 2,
                    borderBottomLeftRadius: 2,
                    overflow: "hidden",
                    paddingLeft: 10
                }}
            >
                <Image source={{ uri: product.image }} resizeMode='cover' style={{ width: 100, height: 100, borderRadius: 10 }} />
            </ThemedView>

            <ThemedView style={styleCart.content}>
                <ThemedView style={styleCart.textContainer}>
                    <ThemedText style={styleCart.productTitle} numberOfLines={2}>
                        {product.title}
                    </ThemedText>

                    <ThemedText style={styleCart.productWeight}>
                        450-500gr /pack
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styleCart.CardFooter}>
                    <ThemedText style={styleCart.ProductPrice}>
                        {TransformPrice()}
                    </ThemedText>

                    <ThemedView style={styleCart.quantityContainer}>
                        <TouchableOpacity
                            style={styleCart.AddButton}
                            onPress={handleDecrease}
                        >
                            <ThemedText style={styleCart.AddButtonText}>
                                -
                            </ThemedText>
                        </TouchableOpacity>

                        <ThemedText style={styleCart.QuantityText}>
                            {product.quantity}
                        </ThemedText>

                        <TouchableOpacity
                            style={styleCart.AddButton}
                            onPress={handleIncrease}
                        >
                            <ThemedText style={styleCart.AddButtonText}>
                                +
                            </ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styleCart = StyleSheet.create({
    cardContainer: {
        width: 370,
        height: 125,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        alignContent: "center",
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
        height: "100%",
    },
    textContainer: {
        marginLeft: 8,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#1C2229",
        lineHeight: 18,
        marginBottom: 2,
    },
    productWeight: {
        fontSize: 10,
        fontWeight: "400",
        color: "#97999D",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 1,
    },
    CardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 8,
        marginTop: 5,
    },
    ProductPrice: {
        fontSize: 14,
        fontWeight: "400",
        color: "#1C2229",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    QuantityText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1C2229",
        minWidth: 20,
        textAlign: "center",
    },
    AddButton: {
        width: 32,
        height: 32,
        backgroundColor: "#EFF7ED",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    AddButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#61AD4E",
    },
});