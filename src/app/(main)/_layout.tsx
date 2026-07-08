import { Stack } from "expo-router"

export default function MainLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true
        }} >
            <Stack.Screen name="home" />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
            <Stack.Screen name="detail" options={{ headerShown: false }} />
            <Stack.Screen name="transaction" options={{ headerShown: false }} />
            <Stack.Screen name="detail_transaction" options={{ headerShown: false }} />
        </Stack>
    )
}

