import { StyleSheet } from "react-native";

export const shimmerStyles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 12,
        gap: 20
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    icon: {
        width: 10,
        height: 10,
        borderRadius: 10,
    },
    footer: {
        flex: 0,
        gap: 8,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    subFooter: {
        flexDirection: "row",
        gap: 8
    },
    items: {
        width: 80,
        height: 10,
        borderRadius: 3
    },
    prices: {
        width: 50,
        height: 10,
        borderRadius: 3
    },
    content: {
        flex: 1,
        marginLeft: 12,
        gap: 8,
    },
    title: {
        width: "70%",
        height: 16,
        borderRadius: 6,
    },
    subtitle: {
        width: "45%",
        height: 12,
        borderRadius: 6,
    },
    price: {
        width: 70,
        height: 18,
        borderRadius: 6,
    },
});