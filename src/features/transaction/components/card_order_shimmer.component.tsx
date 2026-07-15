import { LinearGradient as Linear } from 'expo-linear-gradient';
import { View } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { shimmerStyles } from './card_order_shimmer.style';

function CardOrderShimmeringComponent() {

    return (
        <View style={shimmerStyles.card}>
            <View style={shimmerStyles.row}>
                <ShimmerPlaceHolder
                    LinearGradient={Linear}
                    style={shimmerStyles.icon}
                />

                <View style={shimmerStyles.content}>
                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.title}
                    />

                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.subtitle}
                    />
                </View>

                <ShimmerPlaceHolder
                    LinearGradient={Linear}
                    style={shimmerStyles.price}
                />
            </View>
            <View style={shimmerStyles.footer}>
                <View style={shimmerStyles.subFooter}>
                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.items}
                    />

                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.prices}
                    />
                </View>
                <View style={shimmerStyles.subFooter}>
                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.prices}
                    />
                </View>
            </View>

        </View>
    );
}

export default CardOrderShimmeringComponent;