import { View, Text, TouchableOpacity, Image } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import logo from '../../assets/images/logo.jpg'

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-12 justify-center">
      <View className="items-center mb-16">
        <Image
          source={logo}
          className="w-40 h-40 mb-6"
        />
        <Text className="text-3xl font-bold mb-6">Welcome to Traynar</Text>
        <Text className="text-gray-500 text-lg">Your AI-powered communication coach.</Text>
      </View>

      <View className="mb-8">
        <Input label="Email Address" placeholder="Enter your email" />
        <Input label="Password" placeholder="Enter your password" secure />
      </View>

      <TouchableOpacity className="items-end mb-6">
        <Text className="text-base text-blue-500">Forgot Password?</Text>
      </TouchableOpacity>

      <Button title="Continue" onPress={() => router.push("/(main)/home")} />

      <View className="my-8 flex-row items-center justify-center">
        <View className="h-px bg-gray-200 flex-1" />
        <Text className="mx-4 text-gray-400 text-base">or</Text>
        <View className="h-px bg-gray-200 flex-1" />
      </View>

      <TouchableOpacity className="border border-gray-200 rounded-xl py-4 flex-row justify-center items-center space-x-2">
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/0/09/Google_icon.svg",
          }}
          className="w-6 h-6 mr-3"
        />
        <Text className="font-semibold text-base">Sign in with Google</Text>
      </TouchableOpacity>

      <Text className="text-sm text-gray-400 text-center mt-8">
        For dental professionals only. By continuing, you agree to our{" "}
        <Text className="text-blue-500">Terms of Service</Text> and{" "}
        <Text className="text-blue-500">Privacy Policy</Text>.
      </Text>
    </View>
  );
}
