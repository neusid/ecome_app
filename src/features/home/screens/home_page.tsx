import Checkout from "@/assets/expo.icon/Assets/checkout.svg";
import IconWrapper2 from "@/assets/expo.icon/Assets/icon-wrapper-2.svg";
import IconWrapper3 from "@/assets/expo.icon/Assets/icon-wrapper-3.svg";
import IconWrapper4 from "@/assets/expo.icon/Assets/icon-wrapper-4.svg";
import IconWrapper5 from "@/assets/expo.icon/Assets/icon-wrapper-5.svg";
import IconWrapper from "@/assets/expo.icon/Assets/icon-wrapper.svg";
import ProductCard from "@/features/home/components/product_card";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import { Easing } from 'react-native-reanimated';
import { ThemedText } from "../../../components/themed-text";
import { ThemedView } from "../../../components/themed-view";
import { useHomePage } from "../hooks/use_home_page";

export default function HomePage() {

    const { productListAxios, handleTestAxios, handleLocalIncrease } = useHomePage();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.Body}>
                    <Image source={require('@/assets/expo.icon/Assets/card.png')} style={{ width: '100%', height: 200, marginTop: 20 }} />
                    <ThemedView style={styles.WrapInputSearch}>
                        <TextInput style={styles.InputSearch} placeholder="What’s your daily needs?" />
                    </ThemedView>

                    <ThemedView style={styles.CategorySection}>
                        <ThemedText style={styles.SectionTitle}>Categories</ThemedText>
                        <ThemedView style={styles.CategoryRow}>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper color={'#FDB447'} width={24} height={24} />
                                </ThemedView>
                                <ThemedText>Vegies</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper2 width={24} height={24} />
                                </ThemedView>
                                <ThemedText>Fruits</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper3 width={24} height={24} />
                                </ThemedView>
                                <ThemedText>Meats</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper4 width={24} height={24} />
                                </ThemedView>
                                <ThemedText>Fishy</ThemedText>
                            </ThemedView>
                            <Pressable style={styles.CategoryItem} onPress={() => handleTestAxios()}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper5 width={24} height={24} />
                                </ThemedView>
                                <ThemedText>Eggs</ThemedText>
                            </Pressable>
                        </ThemedView>
                    </ThemedView >

                    <ThemedView style={styles.highlightFlashSale}>
                        <ThemedView style={styles.FlashSaleSection}>
                            <ThemedView style={styles.FlashSaleHeader}>
                                <ThemedText style={styles.SectionTitle}>Flash sale 🔥</ThemedText>
                                <TouchableOpacity>
                                    <ThemedText style={styles.SectionTitle}>View All</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>

                            <ScrollView horizontal={true} contentContainerStyle={{
                                padding: 10,
                            }} showsHorizontalScrollIndicator={false}>
                                <ThemedView style={styles.FlashSaleRow}>
                                    {productListAxios!.length > 0 ? productListAxios?.map((data) => (
                                        <ProductCard
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            price={data.price}
                                            description={data.description}
                                            category={data.category}
                                            image={data.image}
                                            rating={data.rating}
                                            onIncrease={handleLocalIncrease}
                                        />
                                    )) : <ShimmerProvider duration={1500}>
                                        <ThemedView style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
                                            {productListAxios.length > 0 ? (
                                                productListAxios.map((data) => (
                                                    <ProductCard
                                                        key={data.id}
                                                        id={data.id}
                                                        title={data.title}
                                                        price={data.price}
                                                        description={data.description}
                                                        category={data.category}
                                                        image={data.image}
                                                        rating={data.rating}
                                                        onIncrease={handleLocalIncrease}

                                                    />
                                                ))
                                            ) : (
                                                Array.from({ length: 6 }).map((_, index) => (
                                                    <Shimmer
                                                        key={index}
                                                        style={{
                                                            width: 140,
                                                            height: 218,
                                                            borderRadius: 12,
                                                            backgroundColor: "#E8E9EA",
                                                            marginBottom: 16,
                                                        }}
                                                        easing={Easing.linear}
                                                        speed={0.5}
                                                    />
                                                ))
                                            )}
                                        </ThemedView>
                                    </ShimmerProvider>}
                                </ThemedView>
                            </ScrollView>
                        </ThemedView >
                    </ThemedView>
                </ThemedView >
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/cart')}
            >
                <Checkout />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Body: {
        width: '100%',
        height: 850,
    },
    StackTop: {
        marginHorizontal: 16,
        position: 'relative'
    },
    TextDeliver: {
        fontSize: 14,
        fontWeight: '400',
        color: '#97999D',
        marginHorizontal: 16,
        marginBottom: 8,
    },
    DeliverBadge: {
        width: 145,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    WrapInputSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    InputSearch: {
        width: 361,
        height: 54,
        backgroundColor: '#fff',
        borderColor: '#E8E9EA',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 16,
        top: -67,
    },
    SectionTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1C2229'
    },

    CategorySection: {
        marginHorizontal: 16,
        marginTop: -45
    },
    CategoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    CategoryItem: {
        width: 60,
        height: 73,
        justifyContent: 'center',
        alignItems: 'center'
    },
    IconContainer: {
        width: 48,
        height: 48,
        backgroundColor: '#FFF6E8',
        borderRadius: 10,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    FlashSaleSection: {
        marginHorizontal: 16,
        marginTop: 20,

    },
    FlashSaleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    FlashSaleRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 8,
        gap: 16
    },
    ProductCard: {
        width: 140,
        height: 218,
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
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 16
    },
    CardContent: {
        marginTop: 8
    },
    ProductTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1C2229',
        top: -110,
        lineHeight: 22
    },
    ProductWeight: {
        fontSize: 10,
        fontWeight: '400',
        color: '#97999D',
        top: -115
    },
    CardFooter: {
        marginTop: 8,
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
    highlightFlashSale: {
        width: '100%',
        height: 292, // 292
        justifyContent: 'center',
        alignContent: 'center',
        top: 25,
    },
    fab: {
        position: 'absolute',

        right: 20,
        bottom: 80,
        width: 56,
        height: 56,

        backgroundColor: '#FDB447',
        borderRadius: 16,

        justifyContent: 'center',
        alignItems: 'center',

        elevation: 8,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
});