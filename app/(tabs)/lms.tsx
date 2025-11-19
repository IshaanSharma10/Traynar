import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// -------------------- Types --------------------
interface Framework {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconBg: string;
  lessons: string[];
  duration: string;
}

const FRAMEWORKS: Framework[] = [
  {
    id: 'align',
    title: 'ALIGN',
    subtitle: 'Morning Huddle Framework',
    description: 'Start your day with purpose and alignment across the team',
    icon: 'settings',
    iconBg: '#0D9488',
    lessons: [
      'How to structure efficient morning huddles',
      'Setting clear daily targets and identifying risks',
      'Assigning ownership and closing with next steps',
    ],
    duration: '8 minutes',
  },
  {
    id: 'clear',
    title: 'CLEAR',
    subtitle: 'Insurance Discussion Framework',
    description: 'Navigate insurance conversations with confidence and clarity',
    icon: 'file-text',
    iconBg: '#14B8A6',
    lessons: [
      'How to explain insurance benefits clearly',
      'Providing accurate estimates with proper disclaimers',
      'Offering payment options to improve case acceptance',
    ],
    duration: '8 minutes',
  },
  {
    id: 'hires',
    title: 'HIRES',
    subtitle: 'Job Interview Framework',
    description: 'Build winning teams through structured, effective interviews',
    icon: 'users',
    iconBg: '#0D9488',
    lessons: [
      'Creating a high-trust interview environment',
      'Using STAR questions to assess competency',
      'Evaluating values fit and setting clear next steps',
    ],
    duration: '8 minutes',
  },
  {
    id: 'performance',
    title: 'PERFORMANCE',
    subtitle: 'Performance Review Framework',
    description: 'Build winning teams through structured, effective interviews',
    icon: 'trending-up',
    iconBg: '#14B8A6',
    lessons: [
      'Giving specific recognition tied to results',
      'Setting SMART goals with clear accountability',
      'Linking performance to career advancement',
    ],
    duration: '8 minutes',
  },
];

// -------------------- Component --------------------
export default function LearnScreen() {
  const insets = useSafeAreaInsets();
  const [expandedFramework, setExpandedFramework] = useState<string | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  const toggleFramework = (id: string) => {
    setExpandedFramework(expandedFramework === id ? null : id);
  };

  const handlePlayVideo = (framework: Framework) => {
    setSelectedFramework(framework);
    // Here you would integrate actual video player
  };

  const FrameworkCard = ({ framework, index }: { framework: Framework; index: number }) => {
    const isExpanded = expandedFramework === framework.id;

    return (
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100, duration: 500 }}
        className="mb-4"
      >
        <TouchableOpacity
          onPress={() => toggleFramework(framework.id)}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
          activeOpacity={0.95}
        >
          {/* Header */}
          <View className="p-5 flex-row items-center">
            {/* Icon */}
            <View
              className="w-16 h-16 rounded-2xl items-center justify-center mr-4 shadow-sm"
              style={{ backgroundColor: framework.iconBg }}
            >
              <Feather name={framework.icon as any} size={28} color="white" />
            </View>

            {/* Content */}
            <View className="flex-1 pr-2">
              <Text className="text-gray-900 font-bold text-xl mb-1">
                {framework.title}
              </Text>
              <Text className="text-gray-600 text-sm font-medium mb-1">
                {framework.subtitle}
              </Text>
              <Text className="text-gray-500 text-xs leading-5">
                {framework.description}
              </Text>
            </View>

            {/* Chevron */}
            <MotiView
              animate={{ rotate: isExpanded ? '180deg' : '0deg' }}
              transition={{ duration: 300 }}
            >
              <Feather name="chevron-down" size={24} color="#14B8A6" />
            </MotiView>
          </View>

          {/* Expanded Content */}
          {isExpanded && (
            <MotiView
              from={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 300 }}
              className="px-5 pb-5"
            >
              {/* Divider */}
              <View className="h-px bg-gray-200 mb-4 -mx-5" />

              {/* Video Preview */}
              <TouchableOpacity
                onPress={() => handlePlayVideo(framework)}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-5 overflow-hidden"
                style={{ height: 180 }}
                activeOpacity={0.9}
              >
                <View className="flex-1 items-center justify-center">
                  <View className="w-20 h-20 bg-teal-500 rounded-full items-center justify-center mb-3 shadow-xl">
                    <Feather name="play" size={36} color="white" />
                  </View>
                  <Text className="text-white text-lg font-semibold">
                    Watch Framework Guide
                  </Text>
                  <Text className="text-white/70 text-sm mt-1">
                    {framework.duration}
                  </Text>
                </View>
                
                {/* Decorative gradient overlay */}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.3)']}
                  className="absolute inset-0"
                />
              </TouchableOpacity>

              {/* What you'll learn */}
              <View className="bg-teal-50 rounded-2xl p-4 mb-3">
                <Text className="text-teal-900 font-bold text-base mb-3 flex-row items-center">
                  <Feather name="bookmark" size={18} color="#0D9488" /> What you'll learn:
                </Text>

                {framework.lessons.map((lesson, idx) => (
                  <View key={idx} className="flex-row mb-3 last:mb-0">
                    <View className="w-6 h-6 bg-teal-500 rounded-full items-center justify-center mr-3 mt-0.5">
                      <Text className="text-white font-bold text-xs">{idx + 1}</Text>
                    </View>
                    <Text className="text-gray-700 text-sm flex-1 leading-6">
                      {lesson}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Quick action button */}
              <TouchableOpacity
                onPress={() => handlePlayVideo(framework)}
                className="bg-teal-600 py-4 rounded-xl flex-row items-center justify-center shadow-md"
              >
                <Feather name="play-circle" size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">
                  Start Learning
                </Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />

      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Scrollable Header with Gradient */}
        <LinearGradient
          colors={['#0D9488', '#14B8A6', '#5EEAD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: insets.top }}
        >
          <View className="px-6 py-8 pb-10">
            {/* Icon with glow effect */}
            <MotiView
              from={{ scale: 0.8, opacity: 0, rotate: '-10deg' }}
              animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
              transition={{ duration: 700, type: 'spring' }}
              className="mb-6"
            >
              <View className="w-20 h-20 bg-white/30 rounded-3xl items-center justify-center shadow-xl">
                <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center">
                  <Feather name="award" size={36} color="#0D9488" />
                </View>
              </View>
            </MotiView>

            {/* Title */}
            <MotiView
              from={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ delay: 200, duration: 600 }}
            >
              <Text className="text-white font-extrabold text-4xl mb-3 leading-tight">
                Master Your{'\n'}Conversations
              </Text>
              <Text className="text-white/95 text-base leading-7">
                Learn proven frameworks that guide effective dental practice conversations
              </Text>
            </MotiView>

            {/* Stats Row */}
            <MotiView
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 400, duration: 500 }}
              className="flex-row mt-6 gap-3"
            >
              <View className="bg-white/20 rounded-2xl px-4 py-3 flex-1">
                <Text className="text-white font-bold text-2xl">{FRAMEWORKS.length}</Text>
                <Text className="text-white/90 text-xs">Frameworks</Text>
              </View>
              <View className="bg-white/20 rounded-2xl px-4 py-3 flex-1">
                <Text className="text-white font-bold text-2xl">8m</Text>
                <Text className="text-white/90 text-xs">Per Video</Text>
              </View>
              <View className="bg-white/20 rounded-2xl px-4 py-3 flex-1">
                <Text className="text-white font-bold text-2xl">AI</Text>
                <Text className="text-white/90 text-xs">Coaching</Text>
              </View>
            </MotiView>
          </View>
        </LinearGradient>

        {/* Main Content */}
        <View className="px-4 pt-6">
          {FRAMEWORKS.map((framework, index) => (
            <FrameworkCard key={framework.id} framework={framework} index={index} />
          ))}

          {/* Pro Tip Card */}
          <MotiView
            from={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 400, duration: 600 }}
          >
            <LinearGradient
              colors={['#0D9488', '#14B8A6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 24, padding: 24, marginTop: 16 }}
              className="shadow-xl overflow-hidden"
            >
              <View className="flex-row items-center mb-4">
                <View className="w-14 h-14 bg-white/25 rounded-2xl items-center justify-center mr-4">
                  <Feather name="zap" size={28} color="white" />
                </View>
                <Text className="text-white font-bold text-2xl flex-1">Pro Tip</Text>
              </View>

              <View className="bg-white/15 rounded-2xl p-5 backdrop-blur">
                <Text className="text-white text-base leading-7 mb-4">
                  Each framework is designed to guide natural conversation flow. Practice them regularly, and they'll become second nature.
                </Text>
                <View className="flex-row items-center">
                  <Feather name="check-circle" size={18} color="white" />
                  <Text className="text-white/90 text-sm ml-2 flex-1">
                    AI coach analyzes your conversations against these frameworks
                  </Text>
                </View>
              </View>

              {/* Decorative circles */}
              <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
              <View className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
            </LinearGradient>
          </MotiView>
        </View>
      </ScrollView>

      {/* Video Modal */}
      <Modal
        visible={selectedFramework !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedFramework(null)}
      >
        <View className="flex-1 bg-black/95 justify-center items-center">
          <View className="bg-white rounded-3xl p-6 mx-6 w-11/12 max-w-md">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-1 pr-4">
                <Text className="text-gray-900 font-bold text-xl">
                  {selectedFramework?.title}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">
                  {selectedFramework?.subtitle}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => setSelectedFramework(null)}
                className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
              >
                <Feather name="x" size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Video placeholder */}
            <View className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl items-center justify-center mb-6" style={{ height: 250 }}>
              <Feather name="play-circle" size={72} color="#14B8A6" />
              <Text className="text-white mt-4 text-lg font-semibold">Video Player</Text>
              <Text className="text-white/70 text-sm mt-1">
                {selectedFramework?.duration}
              </Text>
            </View>

            <Text className="text-gray-600 text-center mb-6 text-sm">
              Integrate your video player here{'\n'}(YouTube, Vimeo, or custom player)
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setSelectedFramework(null)}
                className="flex-1 bg-gray-100 py-4 rounded-xl"
              >
                <Text className="text-gray-700 font-semibold text-center text-base">
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-teal-600 py-4 rounded-xl"
              >
                <Text className="text-white font-semibold text-center text-base">
                  Play Video
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}