import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Mic, TrendingUp, ClipboardList, ChevronRight } from "lucide-react-native";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-12 pb-24">
      {/* 👋 Greeting Section */}
      <View className="mb-8">
        <Text className="text-2xl font-bold">Welcome back, Dr. Sharma 👋</Text>
        <Text className="text-gray-500 mt-1">
          Ready to practice your next dental conversation?
        </Text>
      </View>

      {/* 📊 Overview Cards */}
      <View className="flex-row justify-between mb-6">
        <View className="flex-1 bg-blue-50 rounded-2xl p-4 mr-3">
          <TrendingUp color="#2563EB" size={22} />
          <Text className="text-blue-700 font-semibold mt-2 text-base">
            Weekly Progress
          </Text>
          <Text className="text-gray-500 text-sm mt-1">+12% improvement</Text>
        </View>

        <View className="flex-1 bg-green-50 rounded-2xl p-4">
          <ClipboardList color="#22C55E" size={22} />
          <Text className="text-green-700 font-semibold mt-2 text-base">
            Evaluations
          </Text>
          <Text className="text-gray-500 text-sm mt-1">3 pending reviews</Text>
        </View>
      </View>

      {/* 🎤 Start Recording Section */}
      <View className="bg-gray-50 rounded-3xl p-6 mb-6 items-center">
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3616/3616481.png",
          }}
          className="w-24 h-24 mb-4"
        />
        <Text className="text-lg font-semibold mb-2">New Recording</Text>
        <Text className="text-gray-500 text-center mb-4">
          Tap the mic to start a new practice session or upload an existing one.
        </Text>

        <View className="flex-row justify-center space-x-3">
          <TouchableOpacity
            onPress={() => router.push("/(main)/new-recording")}
            className="bg-blue-500 rounded-2xl px-8 py-3 flex-row items-center"
          >
            <Mic color="white" className="mr-2" />
            <Text className="text-white font-semibold">Record Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 🧠 AI Insights Section */}
      <View className="bg-blue-50 rounded-3xl p-5 mb-6">
        <Text className="text-lg font-semibold text-blue-600 mb-2">
          AI Insights
        </Text>
        <Text className="text-gray-600 text-sm mb-3">
          "Your empathy scores are improving steadily! Try using simpler
          language during patient education."
        </Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-blue-600 font-semibold mr-1">View full report</Text>
          <ChevronRight color="#2563EB" size={18} />
        </TouchableOpacity>
      </View>

      {/* 📅 Recent Sessions */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-3">Recent Sessions</Text>

        <View className="bg-gray-50 p-4 rounded-2xl mb-3 flex-row justify-between items-center">
          <View>
            <Text className="font-semibold">Patient Anxiety Handling</Text>
            <Text className="text-sm text-gray-500">Score: 86%</Text>
          </View>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-blue-500 font-semibold mr-1">Details</Text>
            <ChevronRight color="#2563EB" size={18} />
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 p-4 rounded-2xl mb-3 flex-row justify-between items-center">
          <View>
            <Text className="font-semibold">Explaining X-Ray Results</Text>
            <Text className="text-sm text-gray-500">Score: 91%</Text>
          </View>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-blue-500 font-semibold mr-1">Details</Text>
            <ChevronRight color="#2563EB" size={18} />
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 p-4 rounded-2xl mb-3 flex-row justify-between items-center">
          <View>
            <Text className="font-semibold">Discussing Treatment Plan</Text>
            <Text className="text-sm text-gray-500">Score: 88%</Text>
          </View>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-blue-500 font-semibold mr-1">Details</Text>
            <ChevronRight color="#2563EB" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
