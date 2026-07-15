import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    cardContainer: {
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
        gap: 7,
        elevation: 5,
    },
    image: {
        width: 143,
        height: 143,
        backgroundColor: '#fff',
        borderRadius: 5,
        overflow: 'hidden',
    },
    shadow: {

    },
    shimmeringTitle: {
        width: 143,
        borderRadius: 5,
    },
    shimmeringSubTitle: {
        width: 60,
        borderRadius: 5,
    }
});