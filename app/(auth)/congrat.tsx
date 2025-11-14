import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Congrats() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-10">
      <Text className="text-3xl font-bold mb-4">🎉 Account Created!</Text>
      <Text className="text-gray-500 text-lg text-center mb-10">
        Your profile has been successfully created.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        className="bg-blue-500 w-full py-4 rounded-xl"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Continue to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
