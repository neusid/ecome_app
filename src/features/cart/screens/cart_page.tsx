import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import Ticket from "@/assets/expo.icon/Assets/ticket.svg";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import CartComponent from "@/features/cart/components/cart-component";

import { ScrollView, TouchableOpacity } from "react-native";
import useCartPage from "../hooks/useCartPage";

export default function CartPage() {

    const { Uid, fetchCart, CartList, totalPrice, handleCheckout, TransformPrice } = useCartPage();

    return (
        <ThemedView
            style={{
                justifyContent: "space-between",
                height: "100%",
                backgroundColor: "#F5F7F9",
            }}
        >
            <ThemedView
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    backgroundColor: "transparent",
                    gap: 10,
                }}
            >
                <ScrollView style={{ height: "71%" }}>
                    <ThemedView
                        style={{
                            flexDirection: "column",
                            flexWrap: "wrap",
                            gap: 10,
                            backgroundColor: "transparent",
                        }}
                    >
                        {
                            (
                                CartList.map((cart) => (
                                    <CartComponent
                                        key={cart.id}
                                        id={cart.id}
                                        title={cart.product.title}
                                        price={cart.product.price}
                                        description={cart.product.description}
                                        category={cart.product.category}
                                        image={cart.product.image}
                                        rating={cart.product.rating}
                                        quantity={cart.quantity}
                                        onUpdate={() => Uid && fetchCart(Uid)}
                                    />
                                ))
                            )

                            // Array.from({length: 5 }).map((_, index) => (
                            //     <ShimmerProvider key={Math.random()} duration={1000}>
                            //         <View style={{ width: 370, height: 100, borderRadius: 12, backgroundColor: "#E8E9EA", }}>
                            //             <Shimmer
                            //                 easing={Easing.linear}
                            //                 speed={1}
                            //             />
                            //         </View>
                            //     </ShimmerProvider>
                            // ))

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
                    top: -20,
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
                            }}
                        >
                            Total
                        </ThemedText>

                        <ThemedText
                            style={{
                                fontSize: 24,
                                fontWeight: "600",
                                color: "#1C2229",
                            }}
                        >
                            {TransformPrice(totalPrice)}
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
                        onPress={handleCheckout}
                    >
                        <ThemedText
                            style={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                        >
                            Checkout
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}