import Star from '@/assets/expo.icon/Assets/star-svg.svg';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { addToCart } from "@/data/repositories/firestore.repository";
import { ProductEntities } from '@/domain/entities/product_entities';
import { useAuthStore } from '@/stores/authStore';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { formatCurrency } from 'react-native-format-currency';
import { styles } from './product_card.style';

type ProductCardProps = ProductEntities & {
    onIncrease?: (id: string) => void;
    onDecrease?: (id: string) => void;
};

export default function ProductCard({ onIncrease, onDecrease, ...product }: ProductCardProps) {

    const [withSymbol] = formatCurrency({
        amount: product.price,
        code: "USD",
    });

    const Uid = useAuthStore((s) => s.uid ?? null);
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async () => {
        if (adding || !Uid) return;
        setAdding(true);
        await addToCart(product, Uid);
        setAdding(false);
    };


    return (
        <Pressable
            onPress={() => {
                console.log("ID:", product.id);

                router.push({
                    pathname: "/detail",
                    params: {
                        id: String(product.id),
                    },
                });
            }}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                },
            ]}>
            <ThemedView style={styles.ProductCard}>
                <View style={styles.CardImageWrapper}>
                    <Image source={{ uri: product.image }} resizeMode='cover' style={styles.productImage} />
                </View>
                <ThemedView style={styles.CardContent}>
                    <ThemedText numberOfLines={2} style={styles.ProductTitle}>{product.title}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.CardFooter}>
                    <ThemedText style={styles.ProductPrice}>{withSymbol}</ThemedText>
                    <ThemedView style={styles.ratingRow}>
                        <Star width={10} height={10} style={styles.ProductIcon} />
                        <ThemedText style={styles.ProductPrice}>{product.rating.rate}</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </Pressable>
    )
}
