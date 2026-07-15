import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import Check from "@/assets/expo.icon/Assets/check.svg";
import Delete from "@/assets/expo.icon/Assets/delete.svg";
import Ticket from "@/assets/expo.icon/Assets/ticket.svg";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import CartComponent from "@/features/cart/components/cart.component";
import CartComponentShimmer from "@/features/cart/components/cart_shimmer.component";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import useCartPage from "../hooks/cart.hook";
import { styles } from "./cart.style";

export default function CartPage() {

    const { CartList, totalPrice, handleCheckout, handleLocalIncrease, handleLocalDecrease, TransformPrice, selectMode, selectedIds, isAllSelected, toggleSelectMode, handleToggleSelect, handleSelectAll, handleDeleteSelected, Loading, handleDeleteSingle, InitialLoading, DeleteLoading } = useCartPage();

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Arrow width={20} height={20} style={styles.backArrow} />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>
                    {selectMode ? "Select Items" : "My Cart"}
                </ThemedText>
                <TouchableOpacity
                    style={[styles.headerRight, selectMode && styles.headerRightActive]}
                    onPress={toggleSelectMode}
                >
                    <Delete fill={selectMode ? "#fff" : "#E33434"} width={22} height={20} />
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.scrollViewContainer}>
                <ScrollView style={selectMode ? styles.scrollViewDelete : styles.scrollView} showsVerticalScrollIndicator={false}>
                    <ThemedView style={styles.cartItemsContainer}>
                        {InitialLoading ? <View style={{ height: 550, justifyContent: "center", alignItems: "center", }} >
                            <LottieView source={require("@/assets/json/loading.json")} autoPlay loop style={{ width: 100, height: 80, }} />
                        </View> : DeleteLoading ? Array.from({ length: CartList.length }).map((_, index) => (
                            <CartComponentShimmer />
                        )) : CartList.map((cart) => (
                            <CartComponent
                                key={Math.random()}
                                id={cart.id}
                                title={cart.product.title}
                                price={cart.product.price}
                                description={cart.product.description}
                                category={cart.product.category}
                                image={cart.product.image}
                                rating={cart.product.rating}
                                quantity={cart.quantity}
                                onIncrease={handleLocalIncrease}
                                onDecrease={handleLocalDecrease}
                                selected={selectedIds.has(cart.id)}
                                onToggleSelect={selectMode ? handleToggleSelect : undefined}
                                selectMode={selectMode}
                                onDelete={handleDeleteSingle}
                                deleteLoading={DeleteLoading}
                            />
                        ))}

                    </ThemedView>
                </ScrollView>
            </ThemedView>

            {selectMode ? (
                <ThemedView style={styles.bottomCardDelete}>
                    <TouchableOpacity style={styles.selectAllRow} onPress={handleSelectAll}>
                        <View style={[styles.checkbox, isAllSelected && styles.checkboxSelected]}>
                            {isAllSelected && (
                                <Check width={17} fill="#fff" color="#fff" />
                            )}
                        </View>
                        <ThemedText style={styles.selectAllText}>Select All</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.deleteButton, selectedIds.size > 0 ? styles.deleteButtonActive : styles.deleteButtonDisabled,]} disabled={selectedIds.size === 0} onPress={handleDeleteSelected}>
                        <ThemedText
                            style={[
                                styles.deleteButtonText,
                                selectedIds.size > 0 ? styles.deleteButtonTextActive : styles.deleteButtonTextDisabled,
                            ]}
                        >
                            Delete ({selectedIds.size}) item{selectedIds.size !== 1 ? "s" : ""}
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            ) : (
                <ThemedView style={[styles.bottomCard, styles.bottomCardCheckout]}>
                    <TouchableOpacity>
                        <ThemedView style={styles.voucherRow}>
                            <ThemedView style={styles.voucherRowInner}>
                                <Ticket width={28} height={28} />
                                <ThemedText style={styles.voucherText} adjustsFontSizeToFit>
                                    Got any voucher? Check it here
                                </ThemedText>
                            </ThemedView>
                            <Arrow />
                        </ThemedView>
                    </TouchableOpacity>

                    <ThemedView style={styles.totalRow}>
                        <ThemedView>
                            <ThemedText style={styles.totalLabel}>Total</ThemedText>
                            <ThemedText style={styles.totalPrice}>{TransformPrice(totalPrice)}</ThemedText>
                        </ThemedView>

                        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                            <ThemedText style={styles.checkoutButtonText}>Checkout</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            )}
        </ThemedView>
    );
}
