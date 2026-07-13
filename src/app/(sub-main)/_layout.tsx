import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function SubMainLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{
                headerShown: false,
            }}>

                <Stack.Screen name="cart" />
                <Stack.Screen name="transaction" />
                <Stack.Screen name="all_product" />
                <Stack.Screen name="detail" />
                <Stack.Screen name="detail_transaction" />
            </Stack>
        </GestureHandlerRootView>
    )
}

export default SubMainLayout;