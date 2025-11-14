import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Session {
  name: string;
  date: string;
  scores: number[];
}

export default function HomeScreen() {
  const sessions: Session[] = [
    { name: 'J. Doe', date: 'April 15, 2026', scores: [92, 88, 95] },
    { name: 'A. Smith', date: 'April 12, 2026', scores: [85, 91, 89] }
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr'];
  const heights = [75, 78, 80, 85, 88, 90, 92];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1 bg-gray-50 px-4">
        <MotiView 
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          className="flex-row items-center justify-between mt-4 mb-6"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-orange-400 items-center justify-center mr-3">
              <Text className="text-white font-bold">DE</Text>
            </View>
            <View>
              <Text className="text-gray-800 font-semibold text-base">Hi, Dr. Evans</Text>
              <Text className="text-gray-500 text-sm">Let's improve your skills</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.push('/profile')} className="mr-4">
              <Feather name="user" size={24} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/notifications')}>
              <Feather name="bell" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 200 }}
          className="bg-white rounded-2xl p-6 mb-6 items-center shadow-sm"
        >
          <View className="w-16 h-16 rounded-full bg-blue-50 items-center justify-center mb-4">
            <Feather name="mic" size={28} color="#3B82F6" />
          </View>
          <Text className="text-gray-800 font-bold text-lg mb-2">Start a New Session</Text>
          <Text className="text-gray-500 text-sm text-center mb-6">
            Record a patient interaction to get instant AI feedback
          </Text>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/new-recording')}
            className="bg-blue-500 w-full py-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold">Record New Session</Text>
          </TouchableOpacity>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
          className="bg-white rounded-2xl p-4 mb-6 shadow-sm"
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 font-bold text-base">Performance Trends</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="h-40 bg-gray-50 rounded-xl p-4 mb-3">
            <View className="flex-1 flex-row items-end justify-between">
              {heights.map((height, i) => (
                <MotiView
                  key={i}
                  from={{ height: 0 }}
                  animate={{ height: height }}
                  transition={{ type: 'spring', delay: 600 + i * 100 }}
                  style={{ flex: 1, marginHorizontal: 2 } as ViewStyle}
                >
                  <View style={{ flex: 1, backgroundColor: '#BFDBFE', borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                  <View style={{ flex: 1, backgroundColor: '#86EFAC', borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                  <View style={{ flex: 1, backgroundColor: '#FDE047', borderTopLeftRadius: 2, borderTopRightRadius: 2 }} />
                </MotiView>
              ))}
            </View>
            <View className="flex-row justify-between mt-2">
              {months.map((month, i) => (
                <Text key={i} className="text-gray-500 text-xs">{month}</Text>
              ))}
            </View>
          </View>

          <View className="flex-row justify-around">
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-blue-500 rounded-sm mr-2" />
              <Text className="text-gray-600 text-xs">Empathy</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-green-500 rounded-sm mr-2" />
              <Text className="text-gray-600 text-xs">Clarity</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-yellow-500 rounded-sm mr-2" />
              <Text className="text-gray-600 text-xs">Tone</Text>
            </View>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
          className="mb-6"
        >
          <Text className="text-gray-800 font-bold text-base mb-3">Your Latest Evaluations</Text>
          
          {sessions.map((session, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => router.push('/evaluation-result')}
            >
              <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', delay: 700 + idx * 100 }}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm"
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                    <Feather name="user" size={20} color="#3B82F6" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-800 font-semibold">Session with {session.name}</Text>
                    <Text className="text-gray-500 text-xs">{session.date}</Text>
                  </View>
                  <View className="flex-row">
                    {session.scores.map((score, i) => (
                      <View key={i} className="ml-3">
                        <Text className="text-blue-600 font-bold text-sm">{score}%</Text>
                        <Text className="text-gray-400 text-xs">
                          {i === 0 ? 'Empathy' : i === 1 ? 'Clarity' : 'Tone'}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Feather name="chevron-right" size={20} color="#9CA3AF" className="ml-2" />
                </View>
              </MotiView>
            </TouchableOpacity>
          ))}
        </MotiView>
      </ScrollView>
    </>
  );
}