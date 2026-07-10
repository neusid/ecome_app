import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import Check from "@/assets/expo.icon/Assets/check.svg";
import Globe from "@/assets/expo.icon/Assets/globe.svg";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TransformPrice } from "@/constants/formater";
import { Orders } from "@/domain/entities/orders_entities";
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { styles } from "../screens/transaction_page.styles";

interface Props {
    item: Orders;
    selectMode: boolean;
    selected: boolean;
    onToggleSelect: (id: string) => void;
}

function CardOrderComponent({
    item,
    selectMode,
    selected,
    onToggleSelect,
}: Props) {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                if (selectMode) {
                    onToggleSelect(item.id);
                } else {
                    router.push({ pathname: '/detail_transaction', params: { id: item.id } });
                }
            }}>
            <ThemedView style={styles.card}>
                {selectMode && (
                    <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                        {selected && (
                            <Check width={50} fill="#fff" color="#fff" />
                        )}
                    </View>
                )}
                <ThemedView style={styles.cardContent}>
                    <ThemedView style={styles.cardTop}>
                        <ThemedView style={styles.cardTopLeft}>
                            <ThemedView style={[styles.statusDot, { backgroundColor: '#000' }]} />
                            <ThemedView>
                                <ThemedText numberOfLines={1} style={styles.orderId}>{item.id}</ThemedText>
                                <ThemedText style={styles.date}>{item.created_at.toDate().toDateString()}</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.statusBadge, { backgroundColor: '#000' }]}>
                            <Globe fill='#fff' width={15} />
                            <ThemedText style={[styles.statusText, { color: '#fff' }]}>
                                {item.status}
                            </ThemedText>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={styles.cardBottom}>
                        <ThemedView style={styles.cardBottomLeft}>
                            <ThemedText style={styles.label}>{item.products.length} item{item.products.length > 1 ? "s" : ""}</ThemedText>
                            <ThemedView style={styles.dotSeparator} />
                            <ThemedText style={styles.label}>{TransformPrice(item.total_price)}</ThemedText>
                        </ThemedView>
                        {!selectMode && (
                            <ThemedView style={styles.detailRow}>
                                <ThemedText style={styles.detailText}>Details</ThemedText>
                                <Arrow width={12} height={12} />
                            </ThemedView>
                        )}
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </TouchableOpacity>
    )
}

export default CardOrderComponent