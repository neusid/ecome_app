import { ThemedView } from "@/components/themed-view";
import { LinearGradient as Linear } from 'expo-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { styles } from "./cart.style";



export default function CartComponentShimmer() {

    return (
        <ThemedView style={[styles.cardContainer, styles.shadow]}>
            <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 100, height: 100, borderRadius: 10 }} />

            <ThemedView style={{ justifyContent: 'space-between', gap: 10 }}>
                <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 220, height: 10, borderRadius: 10 }} />
                <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 220, height: 10, borderRadius: 10 }} />
                <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 100, height: 10, borderRadius: 10 }} />
                <ThemedView style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 100, height: 10, borderRadius: 10 }} />
                    <ThemedView style={{ flexDirection: "row", justifyContent: 'space-between', gap: 10 }}>
                        <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 30, height: 10, borderRadius: 10 }} />
                        <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 20, height: 10, borderRadius: 10 }} />
                        <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={{ width: 30, height: 10, borderRadius: 10 }} />
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}
