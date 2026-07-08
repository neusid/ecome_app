import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { ProductCardComponentProps } from "@/domain/entities/product_card_entities";
import { Image } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { styles } from "./order_component.style";

export default function OrderComponent(product: ProductCardComponentProps) {

    const TransformPrice = (): string => {
        const roundedPrice = Math.round(product.price * 100) / 100;

        const [withSymbol] = formatCurrency({
            amount: roundedPrice,
            code: "USD",
        });

        return withSymbol;
    };

    return (
        <ThemedView style={[styles.cardContainer, styles.shadow]}>
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

            <ThemedView style={styles.content}>
                <ThemedView style={styles.textContainer}>
                    <ThemedText style={styles.productTitle} numberOfLines={2}>
                        {product.title}
                    </ThemedText>

                    <ThemedText style={styles.productWeight}>
                        450-500gr /pack
                    </ThemedText>
                </ThemedView>

                <ThemedView style={styles.CardFooter}>
                    <ThemedText style={styles.ProductPrice}>
                        {TransformPrice()}
                    </ThemedText>

                    <ThemedView style={styles.quantityContainer}>
                        <ThemedText style={styles.QuantityText}>
                            {product.quantity}
                        </ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}