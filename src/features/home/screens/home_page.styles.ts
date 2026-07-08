import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Body: {
        width: '100%',
        height: 850,
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
        marginTop: 20,
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
        marginTop: -45
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
        height: 292,
        justifyContent: 'center',
        alignContent: 'center',
        top: 25,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 80,
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
    fabSeccond: {
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
