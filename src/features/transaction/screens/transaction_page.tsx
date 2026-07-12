import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import Check from "@/assets/expo.icon/Assets/check.svg";
import Delete from "@/assets/expo.icon/Assets/delete.svg";
import Globe from "@/assets/expo.icon/Assets/globe.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TransformPrice } from "@/constants/formater";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import useTransactionPage from "../hooks/use_transaction_page";
import { styles } from "./transaction_page.styles";

export default function TransactionPage() {

    const { TransactionCartList, Loading, SelectMode, SelectedIdMaps, isAllSelected, toggleSelectMode, handleToggleSelect, handleSelectAll, handleDeleteSelected } = useTransactionPage();

    if (Loading) {
        return (
            <SkeletonPlaceholder borderRadius={8} speed={1200}>
                <View style={{ flex: 1, backgroundColor: "#F5F7F9" }}>
                    <View style={styles.header}>
                        <View style={{ width: 36, height: 36, borderRadius: 12 }} />
                        <View style={{ width: 120, height: 18, borderRadius: 4 }} />
                        <View style={{ width: 36, height: 36, borderRadius: 12 }} />
                    </View>

                    <View style={styles.scrollContent}>
                        {[1, 2, 3, 4].map((i) => (
                            <View key={i} style={styles.card}>
                                <View style={styles.cardContent}>
                                    <View style={styles.cardTop}>
                                        <View style={styles.cardTopLeft}>
                                            <View style={{ width: 10, height: 10, borderRadius: 5 }} />
                                            <View style={{ gap: 4 }}>
                                                <View style={{ width: 160, height: 14 }} />
                                                <View style={{ width: 80, height: 12 }} />
                                            </View>
                                        </View>
                                        <View style={{ width: 80, height: 26, borderRadius: 8 }} />
                                    </View>

                                    <View style={styles.cardBottom}>
                                        <View style={styles.cardBottomLeft}>
                                            <View style={{ width: 120, height: 14 }} />
                                            <View style={[styles.dotSeparator, { backgroundColor: "#E1E9EE" }]} />
                                            <View style={{ width: 70, height: 14 }} />
                                        </View>
                                        <View style={{ width: 50, height: 14 }} />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </SkeletonPlaceholder>
        );
    }

    return (
        <View style={styles.body}>
            <ThemedView style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Arrow width={20} height={20} style={styles.backArrow} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>
                    {SelectMode ? "Select Orders" : "My Orders"}
                </ThemedText>
                <TouchableOpacity style={[styles.headerRight, SelectMode && { backgroundColor: "#E33434" }]} onPress={toggleSelectMode}>
                    <Delete fill={SelectMode ? "#fff" : "#E33434"} width={22} height={22} />
                </TouchableOpacity>
            </ThemedView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {TransactionCartList?.map((order) => (
                    <TouchableOpacity
                        key={order.id}
                        activeOpacity={0.9}
                        onPress={() => {
                            if (SelectMode) {
                                handleToggleSelect(order.id);
                            } else {
                                router.push({ pathname: '/detail_transaction', params: { id: order.id } });
                            }
                        }}>
                        <ThemedView style={styles.card}>
                            {SelectMode && (
                                <View style={[styles.checkbox, SelectedIdMaps.has(order.id) && styles.checkboxSelected]}>
                                    {SelectedIdMaps.has(order.id) && (
                                        <Check width={50} fill="#fff" color="#fff" />
                                    )}
                                </View>
                            )}
                            <ThemedView style={styles.cardContent}>
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
                                    {!SelectMode && (
                                        <ThemedView style={styles.detailRow}>
                                            <ThemedText style={styles.detailText}>Details</ThemedText>
                                            <Arrow width={12} height={12} />
                                        </ThemedView>
                                    )}
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </TouchableOpacity>
                ))}

                <ThemedView style={styles.footer}>
                    <ThemedText style={styles.footerText}>You've reached the end</ThemedText>
                </ThemedView>
            </ScrollView>

            {SelectMode && (
                <ThemedView style={styles.bottomBar}>
                    <TouchableOpacity style={styles.checkboxAreaSquare} onPress={handleSelectAll}>
                        <View style={[styles.checkboxSquare, isAllSelected && styles.checkboxSelectedSquare]}>
                            {isAllSelected && (
                                <Check width={17} fill="#fff" color="#fff" />
                            )}
                        </View>
                        <ThemedText style={styles.selectAllText}>Select All</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.deleteButton, SelectedIdMaps.size > 0 ? styles.deleteButtonActive : styles.deleteButtonDisabled]}
                        disabled={SelectedIdMaps.size === 0}
                        onPress={handleDeleteSelected}
                    >
                        <ThemedText style={[styles.deleteButtonText, SelectedIdMaps.size > 0 ? styles.deleteButtonTextActive : styles.deleteButtonTextDisabled]}>
                            Delete ({SelectedIdMaps.size}) item{SelectedIdMaps.size !== 1 ? "s" : ""}
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            )}
        </View>
    );
}
