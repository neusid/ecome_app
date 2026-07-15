import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
    },
    body: {
        alignItems: 'center',
        height: '100%',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingVertical: 25,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#F5F7F9",
        justifyContent: "center",
        alignItems: "center",
    },
    backArrow: {
        transform: [{ rotate: "180deg" }],
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#1C2229",
    },
    headerRight: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#F5F7F9",
        justifyContent: "center",
        alignItems: "center",
    },
    productCard: {
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
    productSubContainer: {
        width: "100%",
        height: "100%",
        overflow: 'hidden',
        borderRadius: 20,
        gap: 5,
    },
    productImage: {
        width: '100%',
        height: '68%',
        borderRadius: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    titleText: {
        width: 190,
        fontSize: 15,
        fontWeight: 400,
    },
    priceText: {
        fontSize: 20,
        fontWeight: 600,
        marginTop: 10,
    },
    descriptionSection: {
        width: '100%',
        padding: 14,
        backgroundColor: 'transparent',
        gap: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    descriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    descriptionTitle: {
        fontSize: 18,
    },
    ratingRow: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 18,
    },
    ratingCount: {
        fontSize: 14,
        fontWeight: 400,
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'justify',
    },
    addToCartContainer: {
        paddingHorizontal: 12,
        width: '100%',
        bottom: 70,
        backgroundColor: "transparent",
        height: 50,
    },
    addToCartButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#61AD4E",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    addToCartButtonAdding: {
        backgroundColor: "#A3D49A",
    },
    addToCartButtonText: {
        color: "#fff",
        fontSize: 14,
    },
    scrollContent: {
        paddingBottom: 50,
        flexGrow: 1,
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
});
