import { View, Text, TouchableOpacity, Image } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRouter } from "expo-router";
import logo from "../../assets/images/logo.jpg";
import googlelogo from "../../assets/images/google.png";
import { Platform } from "react-native";


export default function Login() {
  const router = useRouter();

  return (
    <View
      className="
        flex-1 bg-white 
        px-6 justify-center
        web:flex-row web:items-center web:justify-center web:gap-20 web:px-20
      "
    >
      <View className="items-center mb-12 web:mb-0 web:items-start">
        <Image
          source={logo}
          className="w-40 h-40 mb-6 web:w-56 web:h-56 web:mb-8"
        />
      </View>

      <View className="w-full web:max-w-[750px] web:self-center">

        <View className="items-center mb-12 ">
          <Text className="text-3xl font-bold mb-4 web:text-7xl">
            Welcome to Traynar
          </Text>
          <Text className="text-gray-500 text-lg web:text-3xl">
            Your AI-powered communication coach.
          </Text>
        </View>

        <View
          className="
            w-full mb-6 
            web:max-w-auto web:mx-auto
            
          "
        >
          <Input
            label="Email Address"
            placeholder="Enter your email"
            webLarge
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secure
            webLarge
          />
        </View>

        <View className="flex-row justify-between mb-6 px-1">
          <TouchableOpacity>
            <Text className="text-base text-blue-500 web:text-lg">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-base text-blue-500 web:text-lg">
              Signup
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/home")}
          className="
            bg-blue-500 w-full py-3 rounded-2xl mb-6
            web:py-4 web:w-full
          "
        >
          <Text className="text-center text-white font-semibold web:text-lg">
            Continue
          </Text>
        </TouchableOpacity>
        <View className="my-8 flex-row items-center justify-center">
          <View className="h-px bg-gray-200 flex-1" />
          <Text className="mx-4 text-gray-400 text-base web:text-lg">or</Text>
          <View className="h-px bg-gray-200 flex-1" />
        </View>

        <TouchableOpacity
          className="
            border border-gray-200 rounded-xl py-4 
            flex-row justify-center items-center space-x-2
            web:py-5 web:max-w-[350px] web:self-center web:w-full
          "
        >
          <Image
            source={googlelogo}
            style={{
              width: Platform.select({ web: 25, default: 24 }),
              height: Platform.select({ web: 25, default: 24 }),
            }}
            className="mr-2"
            resizeMode="contain"
          />
          <Text className="font-semibold text-base web:text-lg">Sign in with Google
          </Text>
        </TouchableOpacity>

        <Text className="text-sm text-gray-400 text-center mt-8 web:text-lg web:max-w-[450px] web:self-center">
          For dental professionals only. By continuing, you agree to our{" "}
          <Text className="text-blue-500">Terms of Service</Text> and{" "}
          <Text className="text-blue-500">Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}
