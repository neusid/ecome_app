import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { addToCart } from "@/data/repositories/firestore.repository";
import { ProductEntities } from '@/domain/entities/product_entities';
import { useAuthStore } from '@/stores/authStore';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { formatCurrency } from 'react-native-format-currency';

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
            <ThemedView style={cardStyle.ProductCard}>
                <View style={cardStyle.CardImageWrapper}>
                    <Image source={{ uri: product.image }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </View>
                <ThemedView style={cardStyle.CardContent}>
                    <ThemedText numberOfLines={2} style={cardStyle.ProductTitle}>{product.title}</ThemedText>
                </ThemedView>
                <ThemedView style={cardStyle.CardFooter}>
                    <ThemedText style={cardStyle.ProductPrice}>{withSymbol}</ThemedText>
                    <TouchableOpacity style={cardStyle.AddButton} onPress={() => handleAddToCart} disabled={adding}>
                        {adding ? (
                            <ActivityIndicator size="small" color="#61AD4E" />
                        ) : (
                            <ThemedText style={cardStyle.AddButtonText}>+</ThemedText>
                        )}
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </Pressable>
    )
}

const cardStyle = StyleSheet.create({
    ProductCard: {
        width: 167,
        height: 244,
        paddingHorizontal: 12,
        paddingTop: 12,
        borderRadius: 17,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    CardImageWrapper: {
        width: 143,
        height: 143,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 90,
        overflow: 'hidden',
    },
    CardContent: {
        marginTop: 30,
        paddingHorizontal: 5
    },
    ProductTitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1C2229',
        top: -110,
        lineHeight: 12
    },
    ProductWeight: {
        fontSize: 10,
        fontWeight: '400',
        color: '#97999D',
        top: -115
    },
    CardFooter: {
        paddingHorizontal: 5,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ProductPrice: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1C2229',
        top: -120
    },
    AddButton: {
        width: 24,
        height: 24,
        backgroundColor: '#EFF7ED',
        top: -120,
        borderRadius: 3,
    },
    AddButtonText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#61AD4E',
        textAlign: 'center'
    },
})
