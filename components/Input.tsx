import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  secure?: boolean;
};

export default function Input({ label, placeholder, secure }: Props) {
  const [hide, setHide] = useState(secure);
  return (
    <View className="mb-4">
      {label && <Text className="text-sm mb-1 text-gray-600">{label}</Text>}
      <View className="border border-gray-200 rounded-xl flex-row items-center px-3">
        <TextInput
          placeholder={placeholder}
          secureTextEntry={hide}
          className="flex-1 py-3"
        />
        {secure && (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            {hide ? <EyeOff size={18} color="#9CA3AF" /> : <Eye size={18} color="#9CA3AF" />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
