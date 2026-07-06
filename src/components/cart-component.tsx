import ImageCard from "@/assets/expo.icon/Assets/image-card-2.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
    deleteCart,
    increaseCart,
} from "@/data/firestore.repository";
import { StyleSheet, TouchableOpacity } from "react-native";
import { formatCurrency } from "react-native-format-currency";

type ProductCardComponentProps = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    onUpdate: () => void;
};

export default function CartComponent(
    product: ProductCardComponentProps
) {
    const TransformPrice = (): string => {
        const [withSymbol] = formatCurrency({
            amount: product.price,
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
                <ImageCard width={100} height={100} />
            </ThemedView>

            <ThemedView style={styleCart.content}>
                <ThemedView style={styleCart.textContainer}>
                    <ThemedText style={styleCart.productTitle}>
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
        height: 100,
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
        marginTop: 8,
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
        width: 24,
        height: 24,
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