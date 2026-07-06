// import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
// import { useColorScheme } from 'react-native';


// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       {/* <AnimatedSplashOverlay /> */}
//       <Stack>

//         {/* <Stack.Screen name='screen/list_data_page' options={{ headerShown: false }}> </Stack.Screen> */}

//         <Stack.Screen
//           name="index"
//           options={{ title: 'Menu Utama', headerShown: false }}
//         />


//         <Stack.Screen
//           name="screen/login_page"
//           options={{ title: 'Home', headerShown: false }}
//         />

//         <Stack.Screen name="screen/home_page" options={{ title: 'Home Page', headerShown: false }} />
//         <Stack.Screen name="screen/product_details" options={{ title: 'product_detail', headerShown: true }} />
//         <Stack.Screen name="screen/cart_page" options={{ title: '', headerShown: true }} />
//       </Stack>

//     </ThemeProvider >
//   );
// }

import { DarkTheme, DefaultTheme, ThemeProvider, } from "expo-router/react-navigation";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={
        colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme
      }
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </ThemeProvider>
  );
}