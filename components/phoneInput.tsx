import { View, Text, TextInput, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Props {
  phoneCode: string;
  onChangePhoneCode: (value: string) => void;

  phone: string;
  onChangePhone: (value: string) => void;

  label?: string;
  webLarge?: boolean;
}

export default function PhoneNumberInput({
  phoneCode,
  onChangePhoneCode,
  phone,
  onChangePhone,
  label,
  webLarge,
}: Props) {
  const isWeb = Platform.OS === "web";

  return (
    <View className="mb-4">
      {label && (
        <Text
          className={`text-gray-700 mb-2 font-semibold ${
            webLarge ? "text-xl web:text-2xl" : "text-base"
          }`}
        >
          {label}
        </Text>
      )}

      {/* FULL HEIGHT MATCHED TO h-16 LIKE OTHER INPUTS */}
      <View
        className={`
          flex-row items-center border border-gray-300 rounded-xl overflow-hidden
          h-16 web:h-16
          ${webLarge ? "web:px-5 web:rounded-2xl" : "px-3"}
        `}
      >
        {/* COUNTRY CODE PICKER */}
        <Picker
          selectedValue={phoneCode}
          onValueChange={onChangePhoneCode}
          style={{
            width: isWeb ? 150 : 100,
            height: "100%",
            justifyContent: "center",
            textAlign: "center",
          }}
          itemStyle={{
            fontSize: isWeb ? 50 : 18,
            textAlign: "center",
          }}
        >
          <Picker.Item label={isWeb ? "United States (+1)" : "+1"} value="+1" />
          <Picker.Item label={isWeb ? "United Kingdom (+44)" : "+44"} value="+44" />
          <Picker.Item label={isWeb ? "India (+91)" : "+91"} value="+91" />
          <Picker.Item label={isWeb ? "Australia (+61)" : "+61"} value="+61" />
        </Picker>

        {/* DIVIDER */}
        <View
          style={{
            width: 1,
            height: "60%",
            backgroundColor: "#D1D5DB",
            marginHorizontal: 4,
          }}
        />

        {/* PHONE NUMBER INPUT */}
        <TextInput
          value={phone}
          placeholder="Phone Number"
          onChangeText={onChangePhone}
          maxLength={10}
          keyboardType="number-pad"
          className={`flex-1 px-3 ${
            webLarge ? "web:text-xl" : "text-base"
          }`}
        />
      </View>
    </View>
  );
}
