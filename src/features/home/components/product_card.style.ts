import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    ProductCard: {
        width: 167,
        height: 244,
        paddingHorizontal: 12,
        paddingTop: 12,
        borderRadius: 17,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    CardImageWrapper: {
        width: 143,
        height: 143,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 90,
        overflow: 'hidden',
    },
    CardContent: {
        marginTop: 30,
        paddingHorizontal: 5
    },
    ProductTitle: {
        fontSize: 12,
        fontWeight: '400',
        color: '#1C2229',
        top: -110,
        lineHeight: 12
    },
    ProductWeight: {
        fontSize: 10,
        fontWeight: '400',
        color: '#97999D',
        top: -115
    },
    CardFooter: {
        paddingHorizontal: 5,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ProductIcon: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1C2229',
        top: -113,
        right: 5,
    },
    ProductPrice: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1C2229',
        top: -120
    },
    AddButton: {
        width: 24,
        height: 24,
        backgroundColor: '#EFF7ED',
        top: -120,
        borderRadius: 3,
    },
    AddButtonText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#61AD4E',
        textAlign: 'center'
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    ratingRow: {
        flexDirection: "row",
        position: 'relative',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
});
