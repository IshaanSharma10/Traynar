import { TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "outline";
};

export default function Button({ title, onPress, variant = "primary" }: Props) {
  const base =
    "py-3 rounded-xl items-center justify-center " +
    (variant === "primary"
      ? "bg-blue-500"
      : "border border-blue-500 bg-transparent");
  const text =
    variant === "primary" ? "text-white font-semibold" : "text-blue-500 font-semibold";

  return (
    <TouchableOpacity onPress={onPress} className={base}>
      <Text className={text}>{title}</Text>
    </TouchableOpacity>
  );
}
