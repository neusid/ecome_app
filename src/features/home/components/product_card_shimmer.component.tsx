import { ThemedView } from "@/components/themed-view";
import { styles } from "@/features/home/components/product_card_shimmer.style";
import { LinearGradient as Linear } from 'expo-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';



export default function ProductCardComponentShimmer() {

    return (
        <ThemedView style={[styles.cardContainer, styles.shadow]}>
            <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={styles.image} />

            <ThemedView style={{ justifyContent: 'space-between', gap: 10 }}>
                <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={styles.shimmeringTitle} />
                <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={styles.shimmeringTitle} />
                <ThemedView style={{ justifyContent: 'space-between', gap: 10, flexDirection: 'row' }}>
                    <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={styles.shimmeringSubTitle} />
                    <ShimmerPlaceHolder LinearGradient={Linear} shimmerStyle={styles.shimmeringSubTitle} />
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}
