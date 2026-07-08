import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#F5F7F9",
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
        backgroundColor: "#FCE9E9",
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: {
        padding: 16,
        gap: 12,
        paddingBottom: 55,
    },
    card: {
        flexDirection: "row",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    flexCheckBox: {
        flexDirection: 'row'
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardTopLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    orderId: {
        fontSize: 14,
        width: 200,
        fontWeight: "600",
        color: "#1C2229",
    },
    date: {
        fontSize: 12,
        color: "#97999D",
        marginTop: 1,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    statusIcon: {
        fontSize: 11,
        fontWeight: "700",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },
    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    cardBottomLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    dotSeparator: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: "#D0D0D0",
    },
    label: {
        fontSize: 13,
        color: "#97999D",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    detailText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#61AD4E",
    },
    footer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    footerText: {
        fontSize: 12,
        color: "#D0D0D0",
    },
    checkbox: {
        width: 30,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderColor: '#ECECEC',
        borderWidth: 2,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxSelected: {
        width: 30,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: "#E33434",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxSquare: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#B9BABD",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxSelectedSquare: {
        backgroundColor: "#61AD4E",
        borderColor: "#61AD4E",
    },
    bottomBar: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: 36,
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
    },
    selectAllRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    selectAllText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1C2229",
    },
    deleteButton: {
        height: 44,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    deleteButtonActive: {
        backgroundColor: "#E33434",
    },
    deleteButtonDisabled: {
        backgroundColor: "#E0E0E0",
    },
    deleteButtonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    deleteButtonTextActive: {
        color: "#fff",
    },
    deleteButtonTextDisabled: {
        color: "#999",
    },
    checkboxArea: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: "#ECECEC",
    },
    checkboxAreaSquare: {
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        gap: 10
    },
    cardContent: {
        flex: 1,
        padding: 16,
    },
});
