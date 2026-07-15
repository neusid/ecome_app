import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import BottomChip from "@/assets/expo.icon/Assets/bottom-chip.svg";
import Checkout from "@/assets/expo.icon/Assets/checkout.svg";
import HistorySvg from "@/assets/expo.icon/Assets/history.svg";
import PromoChip from "@/assets/expo.icon/Assets/promo-chip.svg";
import Star from "@/assets/expo.icon/Assets/star.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { addToCart } from "@/data/repositories/firestore.repository";
import { useCartStore } from "@/stores/cartStore";
import { useCheckCart } from "@/stores/checkCartStore";
import { router } from "expo-router";
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from "react-native";
import useDetailPage from "../hooks/use_detail_page";
import { styles } from "./detail_page.styles";

export default function DetailPage() {

    const { Uid, loading, adding, withSymbol, setAdding, DetailProduct, checkSingleProduct } = useDetailPage();

    const count = useCartStore((s) => s.count);
    const setCount = useCartStore((s) => s.setCount);
    const check = useCheckCart((s) => s.check);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#61AD4E" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ThemedView style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Arrow width={20} height={20} style={styles.backArrow} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Detail Product</ThemedText>
                <ThemedView style={styles.headerRight}>
                    <HistorySvg fill="#97999D" width={22} height={22} />
                </ThemedView>
            </ThemedView>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} >
                <ThemedView style={styles.body}>
                    <ThemedView style={styles.productCard}>
                        <ThemedView style={styles.productSubContainer}>
                            <Image source={{ uri: DetailProduct?.image }} style={styles.productImage} />
                            <ThemedView style={styles.titleRow}>
                                <ThemedText style={styles.titleText} numberOfLines={2}>{DetailProduct?.title}</ThemedText>
                                <PromoChip />
                            </ThemedView>
                            <ThemedText style={styles.priceText}>{withSymbol}</ThemedText>
                            <BottomChip width={'100%'} />
                        </ThemedView>
                    </ThemedView>
                    <ThemedView style={styles.descriptionSection}>
                        <ThemedView style={styles.descriptionHeader}>
                            <ThemedText style={styles.descriptionTitle}>Description</ThemedText>
                            <ThemedView style={styles.ratingRow}>
                                <Star />
                                <ThemedText style={styles.ratingText}>{DetailProduct?.rating.rate}</ThemedText>
                                <ThemedText style={styles.ratingCount}>({DetailProduct?.rating.count})</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedText style={styles.descriptionText}>{DetailProduct?.description}</ThemedText>
                    </ThemedView>
                </ThemedView >
            </ScrollView>
            {check ? (<ThemedView style={styles.addToCartContainer}>
                <TouchableOpacity
                    style={[styles.addToCartButton, adding && styles.addToCartButtonAdding]}
                    disabled={adding}
                    onPress={async () => {
                        if (adding || !DetailProduct || !Uid) return;
                        setAdding(true);
                        await addToCart(DetailProduct!, Uid!);
                        checkSingleProduct();
                        setAdding(false);
                        setCount(count + 1);
                    }}>
                    {adding ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <ThemedText style={styles.addToCartButtonText}>
                            Add to Cart
                        </ThemedText>
                    )}
                </TouchableOpacity>
            </ThemedView>) : (<></>)}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/cart')}
            >
                <ThemedView style={styles.fabNotification}>
                    <ThemedText style={styles.fabNotificationText}>{count}</ThemedText>
                </ThemedView>
                <Checkout />
            </TouchableOpacity>
        </View>
    )
}