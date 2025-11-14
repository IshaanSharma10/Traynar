import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import Input from "../../components/Input";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import logo from "../../assets/images/logo.jpg";
import googlelogo from "../../assets/images/google.png";

export default function Login() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("===== LOGIN START =====");

    try {
      setLoading(true);

      const payload = {
        identifier: identifier.trim(),
        password: password.trim(),
      };

      const url =
        "http://server.eba-rptzmmzd.us-east-1.elasticbeanstalk.com/auth/login";

      console.log("URL:", url);
      console.log("Payload:", payload);

      // Timeout controller
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
        console.log("API TIMEOUT");
      }, 15000);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      console.log("Status Code:", response.status);

      let data = null;
      try {
        data = await response.json();
        console.log("Response Body:", data);
      } catch {
        console.log("Failed to parse JSON");
      }

      // SUCCESS → 200
      if (response.status === 200) {
        Alert.alert("Success", data?.message || "Login successful!");

        router.push("/home");
        return;
      }

      if (response.status === 422 && data?.detail?.length) {
        const allErrors = data.detail.map((e: any) => e.msg).join("\n");
        Alert.alert("Validation Error", allErrors);
        return;
      }

      Alert.alert("Login Failed", data?.message || "Something went wrong.");
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);

      if (error.name === "AbortError") {
        Alert.alert("Error", "Server timeout. Try again.");
      } else {
        Alert.alert("Network Error", "Unable to reach server.");
      }
    } finally {
      setLoading(false);
      console.log("===== LOGIN END =====");
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={80}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        className="
          flex-1 bg-white 
          px-6 justify-center
          web:flex-row web:items-center web:justify-center web:gap-20 web:px-20
        "
      >
        {/* LOGO */}
        <View className="items-center mb-12 web:mb-0 web:items-start">
          <Image
            source={logo}
            className="w-40 h-40 mb-6 web:w-56 web:h-56 web:mb-8"
            resizeMode="contain"
          />
        </View>

        <View className="w-full web:max-w-[750px] web:self-center">

          {/* TITLE */}
          <View className="items-center mb-12">
            <Text className="text-3xl font-bold mb-4 web:text-7xl">
              Welcome to Traynar
            </Text>
            <Text className="text-gray-500 text-lg web:text-3xl">
              Your AI-powered communication coach.
            </Text>
          </View>

          {/* INPUTS */}
          <View className="mb-6">
            <Input
              label="Email / Phone / Username"
              placeholder="Enter identifier"
              value={identifier}
              onChangeText={setIdentifier}
              webLarge
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              secure
              value={password}
              onChangeText={setPassword}
              webLarge
            />
          </View>

          {/* FORGOT + SIGNUP */}
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

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className="
              bg-blue-500 w-full py-3 rounded-2xl mb-6
              web:py-4 web:w-full
            "
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center text-white font-semibold web:text-lg">
                Continue
              </Text>
            )}
          </TouchableOpacity>

          {/* DIVIDER */}
          <View className="my-8 flex-row items-center justify-center">
            <View className="h-px bg-gray-200 flex-1" />
            <Text className="mx-4 text-gray-400 text-base web:text-lg">or</Text>
            <View className="h-px bg-gray-200 flex-1" />
          </View>

          {/* GOOGLE LOGIN */}
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
            <Text className="font-semibold text-base web:text-lg">
              Sign in with Google
            </Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <Text className="text-sm text-gray-400 text-center mt-8 web:text-lg web:max-w-[450px] web:self-center">
            For dental professionals only. By continuing, you agree to our{" "}
            <Text className="text-blue-500">Terms of Service</Text> and{" "}
            <Text className="text-blue-500">Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
