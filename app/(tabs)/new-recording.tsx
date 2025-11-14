import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ViewStyle } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RecordingScreen() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
        className="flex-row items-center px-4 py-4 bg-white"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-gray-800 font-bold text-lg ml-4">New Recording</Text>
      </MotiView>

      <View className="flex-1 bg-white items-center justify-center px-8">
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 200 }}
          className="items-center mb-12"
        >
          <Text className="text-gray-400 text-center mb-8">
            Tap the mic to begin or upload an existing recording.
          </Text>
          
          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 400 }}
            className="text-gray-800 font-bold text-5xl mb-8"
          >
            {formatTime(time)}
          </MotiText>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: isRecording ? 1 : 0.3 }}
            className="w-32 h-20 bg-gray-900 rounded-lg mb-4 overflow-hidden"
          >
            <View className="flex-1 flex-row items-center justify-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <MotiView
                  key={i}
                  from={{ height: 4 }}
                  animate={{ 
                    height: isRecording ? [4, 40, 4] : 4 
                  }}
                  transition={{
                    type: 'timing',
                    duration: 800,
                    delay: i * 50,
                    loop: isRecording
                  }}
                  style={{
                    width: 2,
                    backgroundColor: '#60A5FA',
                    borderRadius: 2,
                    marginHorizontal: 1
                  } as ViewStyle}
                />
              ))}
            </View>
          </MotiView>

          <Text className="text-gray-500 text-sm">
            {isRecording ? 'Recording...' : 'Ready to Record'}
          </Text>
        </MotiView>

        <View className="absolute bottom-12 left-0 right-0 items-center">
          <View className="flex-row items-center justify-center" style={{ gap: 32 }}>
            <MotiView
              from={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 600 }}
            >
              <TouchableOpacity className="items-center">
                <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-2">
                  <Feather name="upload" size={24} color="#3B82F6" />
                </View>
                <Text className="text-blue-500 text-xs font-medium">Upload Audio</Text>
              </TouchableOpacity>
            </MotiView>

            <MotiView
              from={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 700 }}
            >
              <TouchableOpacity 
                onPress={() => setIsRecording(!isRecording)}
                className="items-center"
              >
                <MotiView
                  animate={{ 
                    scale: isRecording ? [1, 1.1, 1] : 1,
                    backgroundColor: isRecording ? '#EF4444' : '#3B82F6'
                  }}
                  transition={{ 
                    type: 'timing',
                    duration: 1000,
                    loop: isRecording
                  }}
                  className="w-20 h-20 rounded-full items-center justify-center shadow-lg"
                >
                  <Feather 
                    name={isRecording ? "square" : "mic"} 
                    size={32} 
                    color="white" 
                  />
                </MotiView>
              </TouchableOpacity>
            </MotiView>

            <View style={{ width: 64 }} />
          </View>

          <Text className="text-gray-400 text-xs text-center mt-6 px-8">
            Your recording will be saved and analyzed automatically when you stop.
          </Text>
        </View>
      </View>
    </>
  );
}