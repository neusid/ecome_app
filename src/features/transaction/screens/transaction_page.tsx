import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import Globe from "@/assets/expo.icon/Assets/globe.svg";
import HistorySvg from "@/assets/expo.icon/Assets/history.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TransformPrice } from "@/constants/formater";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import useTransactionPage from "../hooks/use_transaction_page";
import { styles } from "./transaction_page.styles";

export default function TransactionPage() {

    const { TransactionCartList, Loading, setTransactionCartList, setLoading, handleGetData } = useTransactionPage();

    return (
        <View style={styles.body}>
            <ThemedView style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Arrow width={20} height={20} style={styles.backArrow} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>My Orders</ThemedText>
                <ThemedView style={styles.headerRight}>
                    <HistorySvg fill="#97999D" width={22} height={22} />
                </ThemedView>
            </ThemedView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {TransactionCartList?.map((order, index) => (<TouchableOpacity key={order.created_at.nanoseconds} activeOpacity={0.9} onPress={() => router.push({ pathname: '/detail_transaction', params: { id: order.id } })}>
                    <ThemedView style={styles.card}>
                        <ThemedView style={styles.cardTop}>
                            <ThemedView style={styles.cardTopLeft}>
                                <ThemedView style={[styles.statusDot, { backgroundColor: '#000' }]} />
                                <ThemedView>
                                    <ThemedText numberOfLines={1} style={styles.orderId}>{order.id}</ThemedText>
                                    <ThemedText style={styles.date}>{order.created_at.seconds}</ThemedText>
                                </ThemedView>
                            </ThemedView>
                            <ThemedView style={[styles.statusBadge, { backgroundColor: '#000' }]}>
                                <Globe fill='#fff' width={15} />
                                <ThemedText style={[styles.statusText, { color: '#fff' }]}>
                                    {order.status}
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>

                        <ThemedView style={styles.cardBottom}>
                            <ThemedView style={styles.cardBottomLeft}>
                                <ThemedText style={styles.label}>{order.products.length} item{order.products.length > 1 ? "s" : ""}</ThemedText>
                                <ThemedView style={styles.dotSeparator} />
                                <ThemedText style={styles.label}>{TransformPrice(order.total_price)}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.detailRow}>
                                <ThemedText style={styles.detailText}>Details</ThemedText>
                                <Arrow width={12} height={12} />
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </TouchableOpacity>))}

                <ThemedView style={styles.footer}>
                    <ThemedText style={styles.footerText}>You've reached the end</ThemedText>
                </ThemedView>
            </ScrollView>
        </View>
    );
}
