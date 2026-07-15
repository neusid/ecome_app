import { LinearGradient as Linear } from 'expo-linear-gradient';
import { View } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { shimmerStyles } from './detail_shimmering.style';

function DetailShimmering() {

    return (
        <View style={shimmerStyles.container}>
            <View style={shimmerStyles.body}>
                <View style={shimmerStyles.card}>
                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.icon}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.title}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.title}
                    />
                    <View style={shimmerStyles.rowSubtitle}>
                        <ShimmerPlaceHolder
                            LinearGradient={Linear}
                            style={shimmerStyles.subTitle}
                        />
                        <ShimmerPlaceHolder
                            LinearGradient={Linear}
                            style={shimmerStyles.subTitle}
                        />
                    </View>
                    <View style={shimmerStyles.rowSubtitle}>
                        <ShimmerPlaceHolder
                            LinearGradient={Linear}
                            style={shimmerStyles.subTitle}
                        />
                        <ShimmerPlaceHolder
                            LinearGradient={Linear}
                            style={shimmerStyles.subTitle}
                        />
                    </View>
                    <ShimmerPlaceHolder
                        LinearGradient={Linear}
                        style={shimmerStyles.title}
                    />
                </View>

            </View>
        </View>
    );
}

export default DetailShimmering;