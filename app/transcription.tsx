import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { router, useLocalSearchParams } from 'expo-router';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// -------------------- Types --------------------
interface TranscriptSegment {
  speaker: string;
  text: string;
  timestamp?: number;
}

interface TranscriptionResponse {
  segments: TranscriptSegment[];
  duration: number;
}

// -------------------- Notification Configuration --------------------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// -------------------- Component --------------------
export default function TranscriptionScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const audioUri = params.audioUri as string;
  const conversationType = params.conversationType as string;

  const [isProcessing, setIsProcessing] = useState(true);
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>([]);
  const [audioDuration, setAudioDuration] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Request notification permissions
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  // Process transcription
  useEffect(() => {
    if (audioUri) {
      processTranscription();
    }
  }, [audioUri]);

  // Cleanup sound on unmount
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  };

  const sendNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Transcription Ready! 🎉',
          body: `Your ${conversationType} conversation has been transcribed and analyzed.`,
          sound: true,
        },
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const processTranscription = async () => {
    setIsProcessing(true);

    try {
      // Simulate API call to Deepgram or your transcription service
      // Replace this with actual Deepgram API integration
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate processing time

      // Mock transcription data - replace with actual Deepgram response
      const mockTranscription: TranscriptionResponse = {
        segments: [
          {
            speaker: 'Speaker 1',
            text: "Good morning everyone! Let's get started with today's huddle. We have about 15 minutes to cover everything.",
          },
          {
            speaker: 'Speaker 1',
            text: "We have 22 patients scheduled today with a production goal of $8,500. We'll see a peak between 10am and noon, so let's be ready for that rush.",
          },
          {
            speaker: 'Speaker 1',
            text: 'I want to call out a few risks - we have three unconfirmed patients: two at 9am and one at 2pm.',
          },
          {
            speaker: 'Speaker 2',
            text: "Got it. I'll follow up with those patients right away to confirm their appointments.",
          },
          {
            speaker: 'Speaker 1',
            text: 'Perfect. Also, reminder that Dr. Smith will be out next Friday, so we need to reschedule those appointments.',
          },
        ],
        duration: 180, // 3 minutes in seconds
      };

      setTranscriptSegments(mockTranscription.segments);
      setAudioDuration(mockTranscription.duration);
      setIsProcessing(false);

      // Send notification when transcription is ready
      await sendNotification();
    } catch (error) {
      console.error('Transcription error:', error);
      Alert.alert('Error', 'Failed to process transcription. Please try again.');
      setIsProcessing(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playPauseAudio = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      Alert.alert('Error', 'Could not play audio.');
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  };

  const handleViewCoaching = () => {
    // Navigate to AI Coaching screen
    router.push({
      pathname: '/evaluation-result',
      params: {
        audioUri,
        conversationType,
        transcript: JSON.stringify(transcriptSegments),
      },
    });
  };

  // -------------------- Loading Screen --------------------
  if (isProcessing) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View className="flex-1 bg-gradient-to-b from-teal-50 to-white items-center justify-center px-6">
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 600 }}
            className="items-center"
          >
            {/* Animated Microphone Icon */}
            <View className="w-40 h-40 bg-teal-600 rounded-full items-center justify-center mb-8 shadow-xl shadow-teal-300">
              <MotiView
                from={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{
                  loop: true,
                  duration: 1000,
                  type: 'timing',
                }}
              >
                <Feather name="mic" size={60} color="white" />
              </MotiView>
            </View>

            {/* Processing Text */}
            <Text className="text-gray-800 font-bold text-2xl mb-2 text-center">
              Processing Conversation...
            </Text>
            <Text className="text-gray-600 text-base text-center mb-6">
              Transcribing audio and generating AI{'\n'}coaching feedback
            </Text>

            {/* Loading Indicator */}
            <ActivityIndicator size="large" color="#14B8A6" />

            <Text className="text-gray-500 text-sm mt-6 text-center">
              This usually takes 5-10 seconds
            </Text>

            {/* Info Box */}
            <View className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-xl p-4 w-full">
              <Text className="text-amber-800 text-center text-sm">
                Feel free to close this and check back later,{'\n'}or start a new recording in the meantime!
              </Text>
            </View>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="mt-6 bg-white border-2 border-teal-400 py-3 px-8 rounded-xl"
            >
              <Text className="text-teal-600 font-semibold text-base">
                Close & Check Back Later
              </Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </>
    );
  }

  // -------------------- Transcript Screen --------------------
  return (
    <>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="bg-white px-4 py-4 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <View className="ml-4 flex-1">
          <Text className="text-gray-800 font-bold text-lg">Transcript</Text>
          <Text className="text-gray-500 text-xs">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })},{' '}
            {new Date().toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Text>
        </View>
        <TouchableOpacity>
          <Feather name="user" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 bg-gradient-to-b from-teal-50 to-white"
        contentContainerStyle={{ paddingBottom: insets.bottom + 180 }}
      >
        {/* Conversation Type Badge */}
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center">
            <View className="bg-teal-100 rounded-full px-4 py-2 flex-row items-center">
              <Feather name="file-text" size={14} color="#14B8A6" />
              <Text className="text-teal-700 font-semibold text-xs ml-2">
                {conversationType}
              </Text>
            </View>
            <View className="ml-3 flex-row items-center">
              <Feather name="clock" size={14} color="#9CA3AF" />
              <Text className="text-gray-500 text-xs ml-1">
                {formatDuration(audioDuration)}
              </Text>
            </View>
          </View>
        </View>

        {/* Transcript Segments */}
        <View className="px-4 pt-4">
          {transcriptSegments.map((segment, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 100, duration: 400 }}
              className="mb-4"
            >
              <Text className="text-gray-500 text-xs font-medium mb-2">
                {segment.speaker}
              </Text>
              <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <Text className="text-gray-800 text-base leading-6">
                  {segment.text}
                </Text>
              </View>
            </MotiView>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        {/* Play Recording Button */}
        <TouchableOpacity
          onPress={playPauseAudio}
          className="mx-4 mt-4 bg-white border-2 border-teal-400 py-4 rounded-xl flex-row items-center justify-center"
        >
          <Feather name={isPlaying ? 'pause' : 'play'} size={20} color="#14B8A6" />
          <Text className="text-teal-600 font-semibold text-base ml-3">
            {isPlaying ? 'Pause' : 'Play'} Recording
          </Text>
          <Text className="text-gray-400 ml-2">{formatDuration(audioDuration)}</Text>
        </TouchableOpacity>

        {/* View AI Coaching Button */}
        <TouchableOpacity
  onPress={handleViewCoaching}
  className="mx-4 mt-3 rounded-2xl"
  style={{
    backgroundColor: "#0d9488", // teal-600 clean solid color
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#0d9488",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <Feather name="zap" size={20} color="white" />

  <Text
    style={{
      color: "white",
      fontWeight: "bold",
      fontSize: 17,
      marginLeft: 10,
      letterSpacing: 0.3,
    }}
  >
    View AI Coaching
  </Text>
</TouchableOpacity>
      </View>
    </>
  );
}