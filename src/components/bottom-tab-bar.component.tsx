import Checkout from "@/assets/expo.icon/Assets/garden-cart.svg";
import HistorySvg from "@/assets/expo.icon/Assets/history.svg";
import BoxIcon from "@/assets/expo.icon/Assets/home-alt.svg";
import { router, usePathname } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../hooks/theme.hook";
import { styles } from "./bottom-tab-bar.style";

const TABS = [
  { name: "/home" as const, label: "Home", icon: BoxIcon },
  { name: "/cart" as const, label: "Cart", icon: Checkout },
  { name: "/transaction" as const, label: "History", icon: HistorySvg },
] as const;

export default function BottomTabBar() {
  const pathname = usePathname();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingBottom: insets.bottom }]}>
      {TABS.map((tab) => {
        const isFocused = pathname === tab.name;
        const Icon = tab.icon;

        return (
          <Pressable
            key={tab.name}
            onPress={() => router.push(tab.name)}
            style={styles.tab}
          >
            <Icon
              color={isFocused ? "#000" : "#000"}
              width={24}
              height={24}
            />
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: isFocused ? "#FDB447" : "transparent",
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
