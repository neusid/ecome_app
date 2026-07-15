import Delete from "@/assets/expo.icon/Assets/delete.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { ProductCardComponentProps } from "@/domain/entities/product_card_entities";
import { Image, Pressable, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { styles } from "./cart.style";

import Check from "@/assets/expo.icon/Assets/check.svg";

export default function CartComponent(product: ProductCardComponentProps) {

    const TransformPrice = (): string => {
        const roundedPrice = Math.round(product.price * 100) / 100;

        const [withSymbol] = formatCurrency({
            amount: roundedPrice,
            code: "USD",
        });

        return withSymbol;
    };

    const RenderRightAction = () => {
        return (<Pressable style={styles.cardContainerSwipe} onPress={
            () => {
                product.onDelete?.(product.id);
            }
        }>
            <Delete fill="#fff" />
        </Pressable>)
    }

    return (
        <ReanimatedSwipeable renderRightActions={product.onToggleSelect ? () => null : RenderRightAction} containerStyle={styles.swipeContainer}>
            <Pressable onPress={() => product.onToggleSelect?.(product.id)}>
                <ThemedView style={[styles.cardContainer, styles.shadow]}>
                    {product.onToggleSelect && (
                        <View style={[styles.checkbox, product.selected && styles.checkboxSelected,]}>
                            {product.selected && (
                                <Check width={17} fill="#ffff" color='#fff' />
                            )}
                        </View>
                    )}
                    <ThemedView style={styles.imageWrapper} >
                        <Image source={{ uri: product.image }} resizeMode='cover' style={styles.productImage} />
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

                            {!product.selectMode && <ThemedView style={styles.quantityContainer}>
                                <TouchableOpacity style={styles.AddButton} onPress={() => product.onDecrease(product.id)}>
                                    <ThemedText style={styles.AddButtonText}> - </ThemedText>
                                </TouchableOpacity>

                                <ThemedText style={styles.QuantityText}>
                                    {product.quantity}
                                </ThemedText>

                                <TouchableOpacity style={styles.AddButton} onPress={() => product.onIncrease(product.id)}>
                                    <ThemedText style={styles.AddButtonText}> + </ThemedText>
                                </TouchableOpacity>
                            </ThemedView>}
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </Pressable>
        </ReanimatedSwipeable>
    );
}
