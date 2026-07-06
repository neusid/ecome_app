import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function Index() {
  useEffect(() => {
    console.log("TEST INDEX LOADED");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("USER:", user);

      if (user) {
        console.log("HOME");

        setTimeout(() => {
          router.push('/home')
        }, 100);
      } else {
        console.log("LOGIN");
        setTimeout(() => {
          router.push('/login')
        }, 100);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#61AD4E" />
    </View>
  );
}