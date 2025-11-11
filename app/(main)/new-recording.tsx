import { View, Text, TouchableOpacity, Image } from "react-native";
import { ArrowLeft, Mic, Upload } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function NewRecording() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-10 pb-24">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <ArrowLeft color="#111" />
      </TouchableOpacity>

      <Text className="text-xl font-semibold mb-6">New Recording</Text>

      <Text className="text-gray-500 text-center mb-4">
        Tap the mic to begin or upload an existing recording.
      </Text>

      <View className="items-center mb-10">
        <Text className="text-5xl font-bold mb-2">00:00</Text>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3616/3616481.png" }}
          className="w-24 h-24 mb-2"
        />
        <Text className="text-gray-500">Ready to Record</Text>
      </View>

      <View className="flex-row justify-around">
        <TouchableOpacity className="bg-gray-100 px-6 py-3 rounded-xl flex-row items-center">
          <Upload color="#2563EB" className="mr-2" />
          <Text className="text-blue-500 font-semibold">Upload Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-xl flex-row items-center">
          <Mic color="white" className="mr-2" />
          <Text className="text-white font-semibold">Record</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center text-gray-400 mt-8 text-sm">
        Your recording will be saved and analyzed automatically when you stop.
      </Text>
    </View>
  );
}
