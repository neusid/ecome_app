import IconWrapper5 from "@/assets/expo.icon/Assets/blazer.svg";
import IconWrapper3 from "@/assets/expo.icon/Assets/knickers.svg";
import IconWrapper4 from "@/assets/expo.icon/Assets/pullover.svg";
import IconWrapper2 from "@/assets/expo.icon/Assets/shirt.svg";
import IconWrapper from "@/assets/expo.icon/Assets/skinny-jeans.svg";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../../components/themed-text";
import { ThemedView } from "../../../components/themed-view";
import ProductCard from "../components/product_card";
import ProductCardComponentShimmer from "../components/product_card_component_shimmer";
import useHomePage from "../hooks/use_home_page";
import { styles } from "./home_page.styles";

const { cardImage } = styles;

export default function HomePage() {

    const { productListAxios, handleTestAxios, handleLocalIncrease } = useHomePage();

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ThemedView style={styles.Body}>
                    <Image source={require('@/assets/expo.icon/Assets/card.png')} style={cardImage} />
                    <ThemedView style={styles.WrapInputSearch}>
                        <TextInput style={styles.InputSearch} placeholder="What's your daily needs?" />
                    </ThemedView>

                    <ThemedView style={styles.CategorySection}>
                        <ThemedText style={styles.SectionTitle}>Categories</ThemedText>
                        <ThemedView style={styles.CategoryRow}>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper color={'#FDB447'} width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Vegies</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper2 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Fruits</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper3 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Meats</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper4 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Fishy</ThemedText>
                            </ThemedView>
                            <Pressable style={styles.CategoryItem} onPress={() => handleTestAxios()}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper5 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Eggs</ThemedText>
                            </Pressable>
                        </ThemedView>
                        <ThemedView style={styles.CategoryRow}>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper color={'#FDB447'} width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Vegies</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper2 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Fruits</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper3 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Meats</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.CategoryItem}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper4 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Fishy</ThemedText>
                            </ThemedView>
                            <Pressable style={styles.CategoryItem} onPress={() => handleTestAxios()}>
                                <ThemedView style={styles.IconContainer}>
                                    <IconWrapper5 width={24} height={24} />
                                </ThemedView>
                                <ThemedText style={styles.title}>Eggs</ThemedText>
                            </Pressable>
                        </ThemedView>
                    </ThemedView >

                    <ThemedView style={styles.highlightFlashSale}>
                        <ThemedView style={styles.FlashSaleSection}>
                            <ThemedView style={styles.FlashSaleHeader}>
                                <ThemedText style={styles.SectionTitle}>Flash sale 🔥</ThemedText>
                                <TouchableOpacity onPress={() => router.push({ pathname: '/all_product' })}>
                                    <ThemedText style={styles.SectionTitle}>View All</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                            <ThemedView style={styles.FlashSaleRow}>
                                {productListAxios.length < 1 ?
                                    Array.from({ length: 2 }).map((_, index) => (<ProductCardComponentShimmer key={index} />)) :
                                    productListAxios?.filter(item => item.rating.rate > 4.7).slice(0, 2).map((data) => (
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
