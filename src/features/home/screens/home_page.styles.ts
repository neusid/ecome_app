import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Body: {
        width: '100%',
    },
    StackTop: {
        marginHorizontal: 16,
        position: 'relative'
    },
    TextDeliver: {
        fontSize: 14,
        fontWeight: '400',
        color: '#97999D',
        marginHorizontal: 16,
        marginBottom: 8,
    },
    DeliverBadge: {
        width: 145,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    cardImage: {
        width: '100%',
        height: 200,
        marginTop: 70,
    },
    WrapInputSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    InputSearch: {
        width: 361,
        height: 54,
        backgroundColor: '#fff',
        borderColor: '#E8E9EA',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 16,
        top: -67,
    },
    SectionTitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1C2229'
    },
    CategorySection: {
        marginHorizontal: 16,
        marginBottom: 30,
        marginTop: -45,
        gap: 10
    },
    CategoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    CategoryItem: {
        width: 60,
        height: 73,
        justifyContent: 'center',
        alignItems: 'center'
    },
    IconContainer: {
        width: 48,
        height: 48,
        backgroundColor: '#FFF6E8',
        borderRadius: 10,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center'
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
    shimmerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    shimmerItem: {
        width: 140,
        height: 218,
        borderRadius: 12,
        backgroundColor: "#E8E9EA",
        marginBottom: 16,
    },
    highlightFlashSale: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 12,
    }
});
