import { View, Text, ScrollView } from "react-native";
import NotificationCard from "../../components/NotificationCard";

export default function Notifications() {
  return (
    <ScrollView className="flex-1 bg-white px-6 pt-6 pb-24">
      <Text className="text-lg font-semibold mb-4">Notifications</Text>

      <NotificationCard
        title="New Patient Record"
        message="A new patient record has been added to your clinic."
        time="2 hours ago"
        type="info"
      />

      <NotificationCard
        title="Appointment Reminder"
        message="You have an appointment with John Doe at 3:00 PM."
        time="1 hour ago"
        type="reminder"
      />

      <NotificationCard
        title="System Update"
        message="The app has been updated to the latest version."
        time="1 day ago"
        type="update"
      />

      <NotificationCard
        title="Payment Received"
        message="Payment of $150 has been received from Jane Smith."
        time="2 days ago"
        type="payment"
      />
    </ScrollView>
  );
}
