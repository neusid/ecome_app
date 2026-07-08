import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Body: {
        width: '100%',
    },
    FlashSaleSection: {
        marginHorizontal: 16,
        marginTop: 20,
    },
    FlashSaleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    FlashSaleRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 8,
        gap: 16
    },
    flashSaleScroll: {
        padding: 10,
    },
    SectionTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1C2229'
    },
    highlightFlashSale: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        bottom: 60,
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
})

export default styles;