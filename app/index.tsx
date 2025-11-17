import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import logo from '../assets/images/logo.jpg'


export default function Onboarding() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-white px-12">
      <Image
        source={logo}
        className="w-60 h-60 mb-12 rounded-2xl"
      />
      <Text className="text-2xl font-bold text-center mb-6">
        Elevate your patient conversations with AI.
      </Text>
      <Text className="text-gray-500 text-center mb-12">
        Practice real-world scenarios and get instant feedback.
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        className="bg-blue-500 w-full py-3 rounded-2xl mb-6"
      >
        <Text className="text-center text-white font-semibold">Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text className="text-gray-500">Skip</Text>
      </TouchableOpacity>
    </View>
  );
}
