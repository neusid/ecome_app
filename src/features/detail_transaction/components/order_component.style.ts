import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cardContainer: {
        width: 370,
        height: 125,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        alignContent: "center",
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
        height: "100%",
    },
    textContainer: {
        marginLeft: 8,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "400",
        color: "#1C2229",
        lineHeight: 18,
        marginBottom: 2,
    },
    productWeight: {
        fontSize: 10,
        fontWeight: "400",
        color: "#97999D",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 1,
    },
    CardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 8,
        marginTop: 5,
    },
    ProductPrice: {
        fontSize: 14,
        fontWeight: "400",
        color: "#1C2229",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    QuantityText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1C2229",
        minWidth: 20,
        textAlign: "center",
    },
    AddButton: {
        width: 32,
        height: 32,
        backgroundColor: "#EFF7ED",
        borderRadius: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    AddButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#61AD4E",
    },
    imageWrapper: {
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
        overflow: "hidden",
        paddingLeft: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
});
