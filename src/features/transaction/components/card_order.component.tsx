import Arrow from "@/assets/expo.icon/Assets/arrow.svg";
import Check from "@/assets/expo.icon/Assets/check.svg";
import Delete from "@/assets/expo.icon/Assets/delete.svg";
import Globe from "@/assets/expo.icon/Assets/globe.svg";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TransformPrice } from "@/constants/formater";
import { Orders } from "@/domain/entities/orders_entities";
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { styles } from "../screens/transaction_page.styles";

interface Props {
    item: Orders;
    selectMode: boolean;
    selected: boolean;
    onToggleSelect: (id: string) => void;
    onToggleDelete: (id: string) => void;
}

function CardOrderComponent({
    item,
    selectMode,
    selected,
    onToggleSelect,
    onToggleDelete
}: Props) {

    const renderRightActions = () => {
        return (
            <View style={styleus.actionContainer}>
                <RectButton style={[styleus.actionButton, styleus.deleteButton]} onPress={() => onToggleDelete(item.id)}>
                    <Delete width={24} height={24} fill={"#fff"} />
                </RectButton>
            </View>
        );
    };

    return (

        <Swipeable
            renderRightActions={renderRightActions}
            friction={1}
            rightThreshold={20}
            overshootRight={false}
            containerStyle={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
        >
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
        </Swipeable>
    )
}

export default CardOrderComponent

const styleus = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: '#FFF',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: '#666',
        marginTop: 4,
    },
    actionContainer: {
        flexDirection: 'row',
        width: 70,
        marginVertical: 8,
    },
    actionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#3498db',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    actionText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});