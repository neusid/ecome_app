import Arrow from "@/assets/expo.icon/Assets/arrow.svg"
import HistorySvg from "@/assets/expo.icon/Assets/history.svg"
import Ticket from "@/assets/expo.icon/Assets/ticket.svg"
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { TransformPrice } from '@/constants/formater'
import useDetailTransactionPage from "@/features/detail_transaction/hooks/use_detail_transaction_page"
import styles from "@/features/detail_transaction/screen/detail_transaction.styles"
import { router } from "expo-router"
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native'
import OrderComponent from "../components/order_component"


export default function DetailTransaction() {

    const { loading, DetailTransaction, setDetailTransaction, setLoading, handleGetData, } = useDetailTransactionPage();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#61AD4E" />
            </View>
        );
    }

    if (!DetailTransaction) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ThemedText>Order not found</ThemedText>
            </View>
        );
    }

    return (
        <ThemedView
            style={{
                justifyContent: "space-between",
                height: "100%",
                backgroundColor: "#F5F7F9",
            }}
        >
            <ThemedView style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Arrow width={20} height={20} style={{ transform: [{ rotate: "180deg" }] }} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Order Detail</ThemedText>
                <ThemedView style={styles.headerRight}>
                    <HistorySvg fill="#97999D" width={22} height={22} />
                </ThemedView>
            </ThemedView>
            <ThemedView
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                    backgroundColor: "transparent",
                    gap: 10,
                }}
            >
                <ScrollView style={{ height: "62%", marginBottom: 65 }} showsVerticalScrollIndicator={false}>
                    <ThemedView
                        style={{
                            flexDirection: "column",
                            flexWrap: "wrap",
                            gap: 10,
                            backgroundColor: "transparent",
                        }}>
                        {
                            DetailTransaction.products.map((item) => (
                                <OrderComponent
                                    key={item.product.id + Math.random()}
                                    id={item.product.id.toString()}
                                    title={item.product.title}
                                    price={item.product.price}
                                    description={item.product.description}
                                    category={item.product.category}
                                    image={item.product.image}
                                    rating={item.product.rating}
                                    quantity={item.quantity}
                                    onIncrease={() => true}
                                    onDecrease={() => true}
                                />
                            ))
                        }
                    </ThemedView>
                </ScrollView>
            </ThemedView>

            <ThemedView
                style={{
                    width: "100%",
                    height: 170,
                    backgroundColor: "#fff",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    padding: 20,
                    top: -60,
                    marginBottom: 28,
                    borderRadius: 20,
                }}
            >
                <TouchableOpacity>
                    <ThemedView
                        style={{
                            backgroundColor: "#EFF7ED",
                            width: "100%",
                            height: 56,
                            marginBottom: 20,
                            borderRadius: 20,
                            borderColor: "#457B37",
                            borderWidth: 1,
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                        }}
                    >
                        <ThemedView
                            style={{
                                backgroundColor: "transparent",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            <Ticket width={28} height={28} />

                            <ThemedText
                                style={{
                                    fontSize: 14,
                                    color: "#457B37",
                                }}
                                adjustsFontSizeToFit
                            >
                                Got any voucher? Check it here
                            </ThemedText>
                        </ThemedView>

                        <Arrow />
                    </ThemedView>
                </TouchableOpacity>

                <ThemedView
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                    }}
                >
                    <ThemedView>
                        <ThemedText
                            style={{
                                fontSize: 12,
                                color: "#B9BABD",
                                fontWeight: "400",
                            }}>
                            Total
                        </ThemedText>

                        <ThemedText
                            style={{
                                fontSize: 24,
                                fontWeight: "600",
                                color: "#1C2229",
                            }}
                        >
                            {TransformPrice(DetailTransaction.total_price)}
                        </ThemedText>
                    </ThemedView>

                    <TouchableOpacity
                        style={{
                            width: 150,
                            height: 50,
                            backgroundColor: "#61AD4E",
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ThemedText
                            style={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                        >
                            Reorder
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}
