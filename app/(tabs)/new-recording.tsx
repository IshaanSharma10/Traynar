import { Feather } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// -------------------- Types --------------------
interface ConversationType {
  id: 'morning-huddle' | 'insurance-discussion' | 'performance-review' | 'job-interview';
  title: string;
  description: string;
}

const CONVERSATION_TYPES: ConversationType[] = [
  { id: 'morning-huddle', title: 'Morning Huddle', description: 'Daily team alignment' },
  { id: 'insurance-discussion', title: 'Insurance Discussion', description: 'Patient finances' },
  { id: 'performance-review', title: 'Performance Review', description: 'Feedback and growth' },
  { id: 'job-interview', title: 'Job Interview', description: 'Candidate assessment' },
];

// -------------------- Component --------------------
export default function RecordingScreen() {
  const insets = useSafeAreaInsets();

  const [selectedType, setSelectedType] = useState<ConversationType>(CONVERSATION_TYPES[0]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [recordingDuration, setRecordingDuration] = useState(0);

  // -------------------- Timer Logic (Fake) --------------------
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // -------------------- Dummy Recording Logic --------------------
  const startRecording = async () => {
    setIsRecording(true);
    setRecordingDuration(0);

    // Simulate delay
    await new Promise(res => setTimeout(res, 300));
    console.log("Dummy recording started");
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsProcessing(true);

    // Simulate saving delay
    await new Promise(res => setTimeout(res, 800));

    const dummyUri = "dummy://audio-file";

    console.log("Dummy recording stopped. Fake URI:", dummyUri);

    navigateToTranscription(dummyUri);
  };

  // -------------------- Navigation --------------------
  const navigateToTranscription = (uri: string) => {
    setIsProcessing(false);
    router.push({
      pathname: "/transcription",
      params: {
        audioUri: uri,
        conversationType: selectedType.title,
      },
    });
  };

  // -------------------- Upload (simulated real upload) --------------------
  const handleUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      if (result.assets?.length > 0) {
        setIsProcessing(true);
        navigateToTranscription(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Upload Error", "Could not pick file.");
    }
  };

  // -------------------- Dropdown Item --------------------
  const DropdownItem = ({ type }: { type: ConversationType }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedType(type);
        setDropdownVisible(false);
      }}
      className={`p-4 rounded-xl ${selectedType.id === type.id ? 'bg-teal-50' : ''}`}
    >
      <Text
        className={`font-semibold text-base ${
          selectedType.id === type.id ? 'text-teal-700' : 'text-gray-900'
        }`}
      >
        {type.title}
      </Text>
      <Text className="text-gray-500 text-xs mt-1">{type.description}</Text>
    </TouchableOpacity>
  );

  // -------------------- UI --------------------
  return (
    <>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 600 }}
        className="flex-row items-center px-4 py-4 bg-white"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-gray-800 font-bold text-lg ml-4">New Recording</Text>
      </MotiView>

      <ScrollView
        className="bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        <View className="flex-1">

          {/* Logo */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            className="items-center mt-16 mb-8"
          >
            <Image
              source={require('../../assets/images/logo.jpg')}
              style={{ width: 80, height: 80, borderRadius: 16 }}
            />
            <Text className="text-gray-800 font-extrabold text-3xl mt-2">Traynar.ai</Text>
          </MotiView>

          {/* Instructions */}
          <Text className="text-gray-400 text-center mb-6 px-10">
            Tap the mic to begin or upload an existing recording.
          </Text>

          {/* Dropdown */}
          <TouchableOpacity
            onPress={() => setDropdownVisible(true)}
            className="mx-6 bg-white rounded-2xl p-4 border-2 border-teal-400 mb-8"
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-gray-500 text-xs font-medium uppercase mb-1">
                  Conversation Type
                </Text>
                <Text className="text-gray-900 font-bold text-xl">{selectedType.title}</Text>
              </View>
              <Feather name="chevron-down" size={24} color="#06B6D4" />
            </View>
          </TouchableOpacity>

          {/* Dropdown Modal */}
          <Modal visible={dropdownVisible} transparent animationType="fade">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setDropdownVisible(false)}
              className="flex-1 bg-black/50 justify-center px-6"
            >
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-3 border-2 border-teal-400 max-h-[70%]"
              >
                <ScrollView>
                  {CONVERSATION_TYPES.map(t => (
                    <DropdownItem key={t.id} type={t} />
                  ))}
                </ScrollView>
              </MotiView>
            </TouchableOpacity>
          </Modal>

          {/* Recording Button */}
          <View className="items-center mt-6">
            <View
              style={{
                width: 260,
                height: 260,
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[0, 1].map((index) => (
                <MotiView
                  key={index}
                  from={{ scale: 1, opacity: 0.7 }}
                  animate={{
                    scale: isRecording ? 1.4 + index * 0.2 : 1,
                    opacity: isRecording ? 0 : 0.3,
                  }}
                  transition={{
                    loop: isRecording,
                    duration: 1500,
                    delay: index * 300,
                  }}
                  style={{
                    position: "absolute",
                    width: 220 + index * 40,
                    height: 220 + index * 40,
                    borderRadius: (220 + index * 40) / 2,
                    borderWidth: index === 0 ? 4 : 2,
                    borderColor: isRecording ? "#F87171" : "#14B8A6",
                  }}
                />
              ))}

              <TouchableOpacity
                disabled={isProcessing}
                onPress={isRecording ? stopRecording : startRecording}
                activeOpacity={0.9}
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 90,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className={`${
                  isProcessing
                    ? "bg-gray-400"
                    : isRecording
                    ? "bg-red-600 shadow-xl shadow-red-300"
                    : "bg-teal-600 shadow-xl shadow-teal-300"
                }`}
              >
                {isProcessing ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Feather name={isRecording ? "square" : "mic"} size={70} color="white" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Status Text */}
          <View className="items-center mt-8">
            <Text className="text-gray-800 font-bold text-2xl mb-1">
              {isProcessing
                ? 'Processing Audio...'
                : isRecording
                ? 'Recording'
                : 'Ready to Record'}
            </Text>

            <Text
              className={`font-mono text-xl mb-2 ${
                isRecording ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              {formatDuration(recordingDuration)}
            </Text>

            <Text className="text-gray-600 text-center px-8 text-base">
              {isProcessing
                ? 'This may take a few moments...'
                : isRecording
                ? 'Tap to stop and analyze'
                : 'Tap the mic to begin recording'}
            </Text>
          </View>

          {/* Upload Button */}
          {!isRecording && !isProcessing && (
            <View className="px-6 pb-10 mt-10">
              <TouchableOpacity
                onPress={handleUploadFile}
                className="bg-white border-2 border-teal-400 py-4 rounded-xl flex-row items-center justify-center"
              >
                <Feather name="upload-cloud" size={20} color="#06B6D4" />
                <Text className="text-teal-600 font-semibold text-base ml-3">
                  Upload Audio File
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
