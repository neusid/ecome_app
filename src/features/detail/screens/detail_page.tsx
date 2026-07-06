import BottomChip from "@/assets/expo.icon/Assets/bottom-chip.svg";
import Checkout from "@/assets/expo.icon/Assets/checkout.svg";
import PromoChip from "@/assets/expo.icon/Assets/promo-chip.svg";
import Star from "@/assets/expo.icon/Assets/star.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { addToCart } from "@/data/repositories/firestore.repository";
import { useCartStore } from "@/stores/cartStore";
import { router } from "expo-router";
import { ActivityIndicator, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import useDetailPage from "../hooks/use_detail_page";

export default function DetailPage() {

    const { Uid, loading, adding, withSymbol, setAdding, DetailProduct } = useDetailPage();

    const count = useCartStore((s) => s.count);
    const setCount = useCartStore((s) => s.setCount);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#61AD4E" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 50, flexGrow: 1, }} showsVerticalScrollIndicator={false} >
                <ThemedView style={styleDetailPage.body}>
                    <ThemedView style={styleDetailPage.container}>
                        <ThemedView style={styleDetailPage.subContainer}>
                            <Image source={{ uri: DetailProduct?.image }} style={styleDetailPage.image} />
                            <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <ThemedText style={{ width: 190, fontSize: 15, fontWeight: 400 }} numberOfLines={2}>{DetailProduct?.title}</ThemedText>
                                <PromoChip />
                            </ThemedView>
                            <ThemedText style={{ fontSize: 20, fontWeight: 600, marginTop: 10 }}>{withSymbol}</ThemedText>
                            <BottomChip width={'100%'} />
                        </ThemedView>
                    </ThemedView>
                    <ThemedView style={{ width: '100%', padding: 14, backgroundColor: 'transparent', gap: 10, marginTop: 20, marginBottom: 20 }}>
                        <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ThemedText style={{ fontSize: 18 }}>Description</ThemedText>
                            <ThemedView style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                <Star />
                                <ThemedText style={{ fontSize: 18 }}>{DetailProduct?.rating.rate}</ThemedText>
                                <ThemedText style={{ fontSize: 14, fontWeight: 400 }}>({DetailProduct?.rating.count})</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedText style={{ fontSize: 14, fontWeight: 400, textAlign: 'justify' }}>{DetailProduct?.description}</ThemedText>
                    </ThemedView>
                </ThemedView >
            </ScrollView>
            <ThemedView style={{ paddingHorizontal: 12, width: '100%', bottom: 70, backgroundColor: "transparent", height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: "100%",
                        height: 50,
                        backgroundColor: adding ? "#A3D49A" : "#61AD4E",
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    disabled={adding}
                    onPress={async () => {
                        if (adding || !DetailProduct || !Uid) return;
                        setAdding(true);
                        await addToCart(DetailProduct!, Uid!);
                        setAdding(false);
                        setCount(count + 1);
                    }}
                >
                    {adding ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <ThemedText style={{ color: "#fff", fontSize: 14 }}>
                            Add to Cart
                        </ThemedText>
                    )}
                </TouchableOpacity>
            </ThemedView>
            <TouchableOpacity
                style={styleDetailPage.fab}
                onPress={() => router.push('/cart')}
            >
                <ThemedView style={styleDetailPage.fabNotification}>
                    <ThemedText style={styleDetailPage.fabNotificationText}>{count}</ThemedText>
                </ThemedView>
                <Checkout />
            </TouchableOpacity>
        </View>
    )
}

const styleDetailPage = StyleSheet.create({
    body: {
        alignItems: 'center',
    },
    container: {
        marginTop: 20,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        width: 358,
        height: 500,
        backgroundColor: "#fff",
        padding: 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 26,
        elevation: 8,
    },
    subContainer: {
        width: "100%",
        height: "100%",
        overflow: 'hidden',
        borderRadius: 20,
        gap: '5'
    },
    image: {
        width: '100%',
        height: '68%',
        borderRadius: 20,
    },
    fabNotificationText: {
        fontSize: 12,
        color: '#fff'
    },
    fabNotification: {
        width: 25,
        height: 25,
        backgroundColor: '#FF0000',
        borderRadius: 20,
        bottom: 45,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40
    },
    fab: {
        position: 'absolute',

        right: 20,
        bottom: 150,
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
})
