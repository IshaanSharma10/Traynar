// import { Stack } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import "../global.css"

// export default function Layout() {
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <Stack screenOptions={{ headerShown: false }} />
//     </SafeAreaView>
//   );
// }


// import { Stack } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { useColorScheme } from "react-native";
// import * as NavigationBar from "expo-navigation-bar";
// import { useEffect } from "react";
// import { THEME_AUTO } from "../components/globaltheme";
// import "../global.css";

// export default function Layout() {
//   // System theme
//   const systemColorScheme = useColorScheme();

//   // Decide the actual theme
//   const isDark = THEME_AUTO
//     ? systemColorScheme === "dark"
//     : false; // force light mode when THEME_AUTO=false

//   // Update Android navigation bar
//   useEffect(() => {
//     NavigationBar.setBackgroundColorAsync(isDark ? "#0D0D0D" : "#FFFFFF");
//     NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
//   }, [isDark]);

//   return (
//     <SafeAreaView className={isDark ? "flex-1 bg-[#201e1e]" : "flex-1 bg-white"}>
//       <StatusBar style={isDark ? "light" : "dark"} />
//       <Stack screenOptions={{ headerShown: false }} />
//     </SafeAreaView>
//   );
// }






import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { THEME_AUTO } from "../components/globaltheme";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import "../global.css";

export default function Layout() {
  const systemScheme = useColorScheme();
  const isDark = THEME_AUTO ? systemScheme === "dark" : false;
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(isDark ? "#1A1A1A" : "#FFFFFF");
    NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
  }, [isDark]);

  return (
    <SafeAreaView className={`${isDark ? "dark" : ""} flex-1`}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View className={isDark ? "bg-[#201e1e] flex-1" : "bg-white flex-1"}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaView>
  );
}
