import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import HistorySvg from "@/assets/expo.icon/Assets/history.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import styles from "@/features/all_product/screens/all_product.style";
import ProductCard from "@/features/home/components/product_card.component";
import ProductCardComponentShimmer from "@/features/home/components/product_card_shimmer.component";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import useAllProduct from "../hooks/all_product.hook";

function AllProductPage() {

    const { ProductListAxios } = useAllProduct();

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.Body}>
                    <ThemedView style={styles.highlightFlashSale}>
                        <ThemedView style={styles.FlashSaleSection}>
                            <ThemedView style={styles.FlashSaleHeader}>
                                <ThemedText style={styles.SectionTitle}>Flash sale 🔥</ThemedText>
                                <TouchableOpacity onPress={() => router.push({ pathname: '/all_product' })}>
                                    <ThemedText style={styles.SectionTitle}>View All</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                            <ThemedView style={styles.FlashSaleRow}>
                                {ProductListAxios.length < 1 ?
                                    Array.from({ length: 6 }).map((_, index) => (<ProductCardComponentShimmer key={index} />)) :
                                    ProductListAxios?.map((data) => (
                                        <ProductCard
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            price={data.price}
                                            description={data.description}
                                            category={data.category}
                                            image={data.image}
                                            rating={data.rating}
                                        />
                                    ))

                                }
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </ScrollView>
        </View>
    )
}

export default AllProductPage