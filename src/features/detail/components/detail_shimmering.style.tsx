import { StyleSheet } from "react-native";

export const shimmerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        alignItems: 'center',
        height: '100%',
    },
    card: {
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
        gap: 10,
    },
    title: {
        width: '100%',
        height: 20,
        borderRadius: 5
    },
    subTitle: {
        width: '40%',
        borderRadius: 5
    },
    rowSubtitle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    icon: {
        width: '100%',
        height: '68%',
        borderRadius: 20,
    },
    prices: {

    }
});