import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C8E6C9",
        tabBarInactiveTintColor: "#A5D6A7",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2E7D32", // Verde más vibrante
          borderTopColor: "#1B5E20",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="gift" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
