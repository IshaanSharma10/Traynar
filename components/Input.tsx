import { View, Text, TextInput, TouchableOpacity, TextInputProps } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  secure?: boolean;
  webLarge?: boolean;
  className?: string;
}

export default function Input({
  label,
  placeholder,
  secure,
  webLarge,
  className,
  ...props
}: InputProps) {
  const [hide, setHide] = useState(secure);

  return (
    <View className={`mb-4 web:mb-6 ${className ?? ""}`}>
      {/* LABEL */}
      {label && (
        <Text
          className={`
            text-gray-700 mb-2 font-semibold
            ${webLarge ? "text-lg web:text-2xl" : "text-base"}
          `}
        >
          {label}
        </Text>
      )}

      {/* INPUT BOX */}
      <View
        className={`
          border border-gray-300 rounded-xl 
          flex-row items-center px-3 h-16
          ${webLarge ? "web:h-16 web:px-5 web:rounded-2xl" : ""}
        `}
      >
        <TextInput
          placeholder={placeholder}
          secureTextEntry={hide}
          className={`
            flex-1 py-3
            ${webLarge ? "web:text-xl" : ""}
          `}
          {...props}
        />

        {/* EYE ICON */}
        {secure && (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            {hide ? (
              <EyeOff size={22} color="#9CA3AF" />
            ) : (
              <Eye size={22} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
