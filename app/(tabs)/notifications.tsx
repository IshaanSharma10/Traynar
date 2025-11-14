import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface NotificationItem {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  desc: string;
  time: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface NotificationSection {
  section: string;
  items: NotificationItem[];
}

export default function NotificationsScreen() {
  const notifications: NotificationSection[] = [
    {
      section: 'TODAY',
      items: [
        { 
          icon: 'message-square', 
          title: 'New Feedback Available', 
          desc: 'For your conversation with Jane D.', 
          time: '2h ago', 
          color: 'blue' 
        },
        { 
          icon: 'check-circle', 
          title: 'Evaluation Complete', 
          desc: 'Your latest session score is now available.', 
          time: '5h ago', 
          color: 'green' 
        }
      ]
    },
    {
      section: 'THIS WEEK',
      items: [
        { 
          icon: 'award', 
          title: 'New Milestone Unlocked!', 
          desc: 'Improved patient education score by 15%.', 
          time: '2 days ago', 
          color: 'purple' 
        },
        { 
          icon: 'file-text', 
          title: 'Your Weekly Report is Ready', 
          desc: 'View your communication trends.', 
          time: 'Last week', 
          color: 'orange' 
        }
      ]
    }
  ];

  const iconColors: Record<NotificationItem['color'], string> = {
    blue: '#3B82F6',
    green: '#10B981',
    purple: '#8B5CF6',
    orange: '#F59E0B'
  };

  const bgColors: Record<NotificationItem['color'], string> = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    orange: 'bg-orange-50'
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
        className="flex-row items-center justify-between px-4 py-4 bg-white"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-gray-800 font-bold text-lg">Notifications</Text>
        <TouchableOpacity>
          <Feather name="sliders" size={24} color="#374151" />
        </TouchableOpacity>
      </MotiView>

      <ScrollView className="flex-1 bg-gray-50">
        <TouchableOpacity className="px-4 py-3">
          <Text className="text-blue-500 text-right font-medium">Mark all as read</Text>
        </TouchableOpacity>

        {notifications.map((section, sIdx) => (
          <View key={sIdx} className="mb-4">
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: sIdx * 200 }}
              className="px-4 py-2"
            >
              <Text className="text-gray-400 text-xs font-semibold">{section.section}</Text>
            </MotiView>

            {section.items.map((item, idx) => (
              <MotiView
                key={idx}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'spring', delay: sIdx * 200 + idx * 100 }}
                className="bg-white mx-4 mb-2 rounded-xl p-4"
              >
                <View className="flex-row">
                  <View className={`w-10 h-10 rounded-full ${bgColors[item.color]} items-center justify-center mr-3`}>
                    <Feather name={item.icon} size={20} color={iconColors[item.color]} />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                      <Text className="text-gray-800 font-semibold flex-1">{item.title}</Text>
                      <Text className="text-gray-400 text-xs ml-2">{item.time}</Text>
                    </View>
                    <Text className="text-gray-500 text-sm">{item.desc}</Text>
                  </View>
                </View>
              </MotiView>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
}