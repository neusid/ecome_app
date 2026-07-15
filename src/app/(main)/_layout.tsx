import BottomTabBar from "@/components/bottom-tab-bar";
import { Tabs } from "expo-router";

export default function MainLayout() {
    return (
        <>
            <Tabs
                tabBar={(props) => <BottomTabBar {...(props as any)} />}
                screenOptions={{ headerShown: false }}
                backBehavior="history"
            >
                <Tabs.Screen name="home" />
            </Tabs>
        </>
    );
}