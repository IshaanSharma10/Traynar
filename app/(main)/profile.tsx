import { View, Text, Image, ScrollView, TouchableOpacity, Switch } from "react-native";

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-white px-6 pt-6 pb-24">
      <Text className="text-lg font-semibold mb-4">Profile & Settings</Text>

      <View className="flex-row items-center mb-6">
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          className="w-14 h-14 rounded-full mr-3"
        />
        <View>
          <Text className="font-semibold text-base">Dr. Evelyn Reed</Text>
          <Text className="text-gray-500">Bright Smiles Dental Clinic</Text>
        </View>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-3">
        <Text className="font-semibold text-gray-700">Account Settings</Text>
        <TouchableOpacity><Text>Edit Profile</Text></TouchableOpacity>
        <TouchableOpacity><Text>Change Password</Text></TouchableOpacity>
        <View className="flex-row justify-between items-center">
          <Text>Notification Preferences</Text>
          <Switch value={true} />
        </View>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-3">
        <Text className="font-semibold text-gray-700">Subscription</Text>
        <Text>Current Plan: <Text className="text-blue-500 font-semibold">Pro Plan</Text></Text>
        <TouchableOpacity className="bg-blue-500 py-2 rounded-xl items-center">
          <Text className="text-white">Manage Subscription</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 space-y-3">
        <Text className="font-semibold text-gray-700">General</Text>
        <TouchableOpacity><Text>Privacy Policy</Text></TouchableOpacity>
        <TouchableOpacity><Text>Terms of Service</Text></TouchableOpacity>
        <TouchableOpacity><Text>Help & Support</Text></TouchableOpacity>
      </View>

      <TouchableOpacity className="mt-6 bg-red-50 py-3 rounded-xl items-center">
        <Text className="text-red-500 font-semibold">Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
