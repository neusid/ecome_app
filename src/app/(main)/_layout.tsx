import { Stack } from "expo-router"

export default function MainLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true
        }} >
            <Stack.Screen name="home" />
            <Stack.Screen name="cart" />
            <Stack.Screen name="detail" />
        </Stack>
    )
}

