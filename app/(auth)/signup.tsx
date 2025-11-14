import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Input from "../../components/Input";
import PhoneInput from "../../components/phoneInput";
import logo from "../../assets/images/logo.jpg";

const signUpSchema = yup.object().shape({
  username: yup.string().min(3).required("Username is required"),
  firstName: yup.string().min(2).required("First name is required"),
  lastName: yup.string().min(2).required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneCode: yup.string().required("Country code required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  location: yup.string().required("Location is required"),
});

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values: any) => {
    console.log("===== SIGNUP START =====");

    try {
      setLoading(true);

      const orderedBody = `{
        "first_name": "${values.firstName.trim()}",
        "last_name": "${values.lastName.trim()}",
        "user_name": "${values.username.trim()}",
        "email_id": "${values.email.trim()}",
        "country_code": "${values.phoneCode}",
        "phone_number": "${values.phone.trim()}",
        "location": "${values.location.trim()}"
      }`;

      const url =
        "http://server.eba-rptzmmzd.us-east-1.elasticbeanstalk.com/auth/signup";

      console.log("URL:", url);
      console.log("Request Body (Ordered):", orderedBody);

      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
        console.log("API TIMEOUT");
      }, 12000);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: orderedBody,
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

      if (response.status === 201 && data?.status === "success") {
        Alert.alert("Success", data?.message || "Signup successful!");
        router.push("/(auth)/congrat");
        return;
      }

      if (response.status === 409) {
        Alert.alert("Signup Failed", data?.message || "User already exists.");
        return;
      }

      if (response.status === 400 && data?.errors?.length) {
        const msg = data.errors.join("\n");
        Alert.alert("Invalid Input", msg);
        return;
      }

      if (response.status === 500) {
        Alert.alert("Server Error", "Something went wrong. Try again later.");
        return;
      }

      Alert.alert("Signup Failed", data?.message || "Something went wrong.");

    } catch (error: any) {
      console.log("SIGNUP ERROR:", error);

      if (error.name === "AbortError") {
        Alert.alert("Error", "Server timeout. Try again.");
      } else {
        Alert.alert("Network Error", "Unable to reach the server.");
      }

    } finally {
      setLoading(false);
      console.log("===== SIGNUP END =====");
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={Platform.OS === "ios" ? 40 : 80}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingBottom: 80,
      }}
    >
      <View
        className="
          flex-1 bg-white 
          px-6 pt-10
          web:flex-row web:items-start web:justify-center web:gap-20 web:px-20
        "
      >

        {Platform.OS === "web" && (
          <View className="items-center mb-12 web:items-start web:pt-16">
            <Image
              source={logo}
              className="w-40 h-40 mb-6 web:w-56 web:h-56 web:mb-8"
              resizeMode="contain"
            />
          </View>
        )}

        <View className="w-full web:max-w-[750px] web:self-center">

          <View className="items-center mb-12">
            <Text className="text-3xl font-bold mb-4 web:text-7xl">
              Create Your Account
            </Text>
            <Text className="text-gray-500 text-lg web:text-3xl">
              Join Traynar and start improving today.
            </Text>
          </View>

          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              phoneCode: "+91",
              phone: "",
              location: "",
            }}
            validationSchema={signUpSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <>
                <Input
                  label="Username"
                  placeholder="Enter username"
                  value={values.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  webLarge
                />

                <Input
                  label="First Name"
                  placeholder="Enter first name"
                  value={values.firstName}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  webLarge
                />

                <Input
                  label="Last Name"
                  placeholder="Enter last name"
                  value={values.lastName}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  webLarge
                />

                <Input
                  label="Email Address"
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  webLarge
                />

                <PhoneInput
                  label="Phone Number"
                  phoneCode={values.phoneCode}
                  onChangePhoneCode={(code) => setFieldValue("phoneCode", code)}
                  phone={values.phone}
                  onChangePhone={(text) => setFieldValue("phone", text)}
                  webLarge
                />

                <Input
                  label="Location"
                  placeholder="Enter your location"
                  value={values.location}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  webLarge
                />

                <TouchableOpacity
                  onPress={() => handleSubmit()}
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
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>

                <View className="mt-4 items-center">
                  <Text className="text-gray-600 web:text-lg">
                    Already have an account?
                  </Text>

                  <Link href="/(auth)/login" asChild>
                    <TouchableOpacity className="mt-2">
                      <Text className="text-blue-500 font-bold text-lg">
                        Login
                      </Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
