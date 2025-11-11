import { Tabs } from "expo-router";
import { Home, Bell, User, Mic } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#2563EB" }}>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: ({ color }) => <Home color={color} /> }}
      />
      <Tabs.Screen
        name="new-recording"
        options={{ title: "Record", tabBarIcon: ({ color }) => <Mic color={color} /> }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ title: "Notifications", tabBarIcon: ({ color }) => <Bell color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ color }) => <User color={color} /> }}
      />
    </Tabs>
  );
}
