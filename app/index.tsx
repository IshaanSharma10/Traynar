import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import logo from "../assets/images/logo.jpg";

export default function Onboarding() {
  const router = useRouter();

  return (
    <View
      className="
        flex-1 
        bg-white
        items-center justify-center 
        px-8
        web:flex-row web:justify-center web:items-center web:gap-20 web:px-20
      "
    >
      <Image
        source={logo}
        className="w-60 h-60 mb-12 rounded-2xl web:w-72 web:h-72 web:mb-0"
        resizeMode="contain"
      />

      <View className="w-full items-center web:max-w-[420px]">
        <Text
          className="
            text-2xl font-bold text-center mb-6 
            text-black
            web:text-left web:text-4xl
          "
        >
          Elevate your patient conversations with AI.
        </Text>

        <Text
          className="
            text-gray-600
            text-center mb-12
            web:text-left web:text-xl
          "
        >
          Practice real-world scenarios and get instant feedback.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          className="
            bg-blue-500
            w-full py-3 rounded-2xl mb-6
            web:py-4 web:w-full
          "
        >
          <Text className="text-center text-white font-semibold web:text-lg">
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          className="py-3 rounded-2xl mb-6 w-[30%] web:py-4 bg-transparent"
        >
          <Text
            className="
              text-center 
              text-gray-600
              font-semibold web:text-lg
            "
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
