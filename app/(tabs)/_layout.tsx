import { Tabs } from "expo-router";
import { BarChart3, GraduationCap, Home, Mic } from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          height: 65,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 6,
          elevation: 6,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="new-recording"
        options={{
          title: "Record",
          tabBarIcon: ({ color, size }) => <Mic color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="lms"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <GraduationCap color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="evaluation-result"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <BarChart3 color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
