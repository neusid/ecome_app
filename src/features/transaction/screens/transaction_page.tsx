import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import Check from "@/assets/expo.icon/Assets/check.svg";
import Delete from "@/assets/expo.icon/Assets/delete.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import CardOrderComponent from "../components/card_order.component";
import CardOrderShimmeringComponent from "../components/card_order_shimmer.component";
import useTransactionPage from "../hooks/use_transaction_page";
import { styles } from "./transaction_page.styles";
// const renderRightActions = () => {
//     return (
//         <View style={styleus.actionContainer}>
//             <RectButton style={[styleus.actionButton, styleus.deleteButton]} onPress={() => true}>
//                 <Text style={styleus.actionText}>Hapus</Text>
//             </RectButton>
//         </View>
//     );
// };

export default function TransactionPage() {

    const { TransactionCartList, InitialLoading, PaginationLoading, DeleteLoading, SelectMode, SelectedIdMaps, isAllSelected, toggleSelectMode, handleToggleSelect, handleSelectAll, handleDeleteSelected, handleGetData, handleDeleteSwipe } = useTransactionPage();

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

            <ThemedView
                style={[styles.scrollContent, SelectMode && styles.scrollContentSelectActive]}
            >
                {InitialLoading || DeleteLoading ? (
                    Array.from({ length: TransactionCartList.length > 0 ? TransactionCartList.length : 6 }).map((_, index) => (
                        <CardOrderShimmeringComponent key={index} />
                    ))
                ) : TransactionCartList.length > 0 ? (
                    <FlatList
                        data={TransactionCartList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <CardOrderComponent
                                item={item}
                                selectMode={SelectMode}
                                selected={SelectedIdMaps.has(item.id)}
                                onToggleSelect={handleToggleSelect}
                                onToggleDelete={handleDeleteSwipe}
                            />
                        )}
                        extraData={{ SelectMode, SelectedIdMaps, DeleteLoading }}
                        contentContainerStyle={{
                            gap: 7,
                            paddingBottom: SelectMode ? 150 : 110,
                        }}
                        onEndReached={handleGetData}
                        onEndReachedThreshold={0.5}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            PaginationLoading ? (
                                <View style={{ height: 80, justifyContent: "center", alignItems: "center", }} >
                                    <LottieView source={require("@/assets/json/loading.json")} autoPlay loop style={{ width: 100, height: 80, }} />
                                </View>
                            ) : null
                        }
                    />
                ) : (
                    <ThemedText>Tidak ada order</ThemedText>
                )}
            </ThemedView>
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

const styleus = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: '#FFF',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: '#666',
        marginTop: 4,
    },
    actionContainer: {
        flexDirection: 'row',
        width: 160,
        marginVertical: 8,
    },
    actionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    editButton: {
        backgroundColor: '#3498db',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    actionText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});