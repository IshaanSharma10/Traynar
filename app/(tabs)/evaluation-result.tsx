import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

// -------------------- Types --------------------
interface MetricDetail {
  id: string;
  letter: string;
  name: string;
  score: number;
  maxScore: number;
  status: 'good' | 'mastered' | 'needs-work';
  positives: string[];
  improvements: string[];
  example: string;
}

interface CoachingData {
  overallScore: number;
  maxScore: number;
  percentage: number;
  conversationType: string;
  metrics: MetricDetail[];
  summary: {
    whatYouDidWell: { metric: string; detail: string }[];
    focusNextTime: { metric: string; detail: string }[];
    actionItems: {
      type: 'keep-it-up' | 'focus' | 'quick-win';
      title: string;
      description: string;
    }[];
  };
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// -------------------- Component --------------------
export default function CoachingScreen() {
  const insets = useSafeAreaInsets();
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'overview' | 'metric' | 'summary'>('overview');
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number | null>(null);
  const [coachingData, setCoachingData] = useState<CoachingData | null>(null);

  useEffect(() => {
    generateCoachingFeedback();
  }, []);

  const generateCoachingFeedback = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to OpenAI/Gemini
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock coaching data
      const mockData: CoachingData = {
        overallScore: 11,
        maxScore: 15,
        percentage: 73,
        conversationType: 'Morning Huddle',
        metrics: [
          {
            id: 'arrive',
            letter: 'A',
            name: 'Arrive',
            score: 2,
            maxScore: 3,
            status: 'good',
            positives: ['Started meeting on time', 'Set clear expectations for meeting length'],
            improvements: ['Could have stated a more specific agenda upfront'],
            example: 'Good morning team, let\'s get started with today\'s huddle.',
          },
          {
            id: 'layout',
            letter: 'L',
            name: 'Layout',
            score: 3,
            maxScore: 3,
            status: 'mastered',
            positives: [
              'Clearly stated daily production target',
              'Reviewed schedule peaks and potential bottlenecks',
              'Mentioned total patients scheduled',
            ],
            improvements: [],
            example: 'We have 22 patients today with a production goal of $8,500. We\'ll see a peak between 10am and noon.',
          },
          {
            id: 'identify',
            letter: 'I',
            name: 'Identify',
            score: 2,
            maxScore: 3,
            status: 'good',
            positives: ['Called out one key risk (unconfirmed appointments)'],
            improvements: ['Could have mentioned other potential issues like lab delays or equipment'],
            example: 'We have three unconfirmed patients - two at 9am and one at 2pm.',
          },
          {
            id: 'get',
            letter: 'G',
            name: 'Get',
            score: 2,
            maxScore: 3,
            status: 'good',
            positives: ['Assigned task owners for follow-ups'],
            improvements: ['Could have been more specific about deadlines', 'Not all tasks had clear owners'],
            example: 'Sarah, can you call those unconfirmed patients this morning?',
          },
          {
            id: 'next',
            letter: 'N',
            name: 'Next',
            score: 2,
            maxScore: 3,
            status: 'good',
            positives: ['Recapped key action items before closing'],
            improvements: ['Did not mention the plan for handling cancellations/fills'],
            example: 'Okay team, Sarah will handle confirmations, and let\'s make it a great day!',
          },
        ],
        summary: {
          whatYouDidWell: [
            {
              metric: 'L - Layout',
              detail: 'Clearly stated daily production target',
            },
          ],
          focusNextTime: [
            {
              metric: 'A - Arrive',
              detail: 'Try starting with: "Good morning everyone! We have 15 minutes today to cover our schedule, identify any risks, and assign tasks. Let\'s dive in."',
            },
            {
              metric: 'I - Identify',
              detail: 'Besides unconfirmed patients, let\'s check: Are all labs back? Any equipment issues? Any special patient needs today?',
            },
            {
              metric: 'G - Get',
              detail: 'Sarah, please call the unconfirmed patients by 8:30am. Mike, double-check the sterilizer before we start. Who can handle fills if we get cancellations?',
            },
          ],
          actionItems: [
            {
              type: 'keep-it-up',
              title: 'Keep it up',
              description: 'Clearly stated daily production target',
            },
            {
              type: 'focus',
              title: 'Focus here next time',
              description: 'Try starting with: "Good morning everyone! We have 15 minutes today to cover our schedule, identify any risks, and assign tasks. Let\'s dive in."',
            },
            {
              type: 'quick-win',
              title: 'Quick win',
              description: 'Could have mentioned other potential issues like lab delays or equipment',
            },
          ],
        },
      };

      setCoachingData(mockData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating coaching feedback:', error);
      Alert.alert('Error', 'Failed to generate coaching feedback');
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered':
        return { bg: 'bg-teal-100', text: 'text-teal-700', textColor: '#0D9488', badge: 'Mastered' };
      case 'good':
        return { bg: 'bg-amber-100', text: 'text-amber-700', textColor: '#D97706', badge: 'Good' };
      default:
        return { bg: 'bg-red-100', text: 'text-red-700', textColor: '#DC2626', badge: 'Needs Work' };
    }
  };

  const CircularProgress = ({ score, maxScore, percentage }: { score: number; maxScore: number; percentage: number }) => {
    const radius = 70;
    const strokeWidth = 14;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View className="items-center justify-center" style={{ width: 180, height: 180 }}>
        <Svg width={180} height={180}>
          <Circle
            cx={90}
            cy={90}
            r={normalizedRadius}
            fill="transparent"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
          />
          <Circle
            cx={90}
            cy={90}
            r={normalizedRadius}
            fill="transparent"
            stroke="#14B8A6"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 90 90)`}
          />
        </Svg>
        <View className="absolute items-center">
          <Text className="text-4xl font-bold text-gray-900">{score}/{maxScore}</Text>
          <Text className="text-gray-600 text-lg mt-1">{percentage}%</Text>
        </View>
      </View>
    );
  };

  const handleMetricPress = (index: number) => {
    setSelectedMetricIndex(index);
    setCurrentPage('metric');
  };

  const handleBackToOverview = () => {
    setCurrentPage('overview');
    setSelectedMetricIndex(null);
  };

  const handleViewSummary = () => {
    console.log('View Summary clicked');
    setCurrentPage('summary');
  };

  const handleNextMetric = () => {
    if (coachingData && selectedMetricIndex !== null && selectedMetricIndex < coachingData.metrics.length - 1) {
      setSelectedMetricIndex(selectedMetricIndex + 1);
    }
  };

  const handlePreviousMetric = () => {
    if (selectedMetricIndex !== null && selectedMetricIndex > 0) {
      setSelectedMetricIndex(selectedMetricIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#14B8A6" />
        <Text className="text-gray-600 mt-4">Analyzing conversation...</Text>
      </View>
    );
  }

  if (!coachingData) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-600">No coaching data available</Text>
      </View>
    );
  }

  const currentMetric = selectedMetricIndex !== null ? coachingData.metrics[selectedMetricIndex] : null;
  const totalCards = coachingData.metrics.length + 1;
  const currentCardNumber = currentPage === 'overview' ? 1 : (selectedMetricIndex || 0) + 2;

  // -------------------- Summary Screen --------------------
  if (currentPage === 'summary') {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View className="bg-gray-50" style={{ paddingTop: insets.top }}>
          <View className="flex-row items-center justify-between px-4 py-4">
            <TouchableOpacity onPress={handleBackToOverview} className="flex-row items-center">
              <Feather name="arrow-left" size={24} color="#374151" />
              <Text className="text-gray-700 font-semibold ml-2">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="x" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 bg-gradient-to-b from-teal-50 to-cyan-50"
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center pt-6 pb-4">
            <Text className="text-teal-700 font-semibold text-lg">Key Takeaways</Text>
            <Text className="text-gray-600 text-base">{coachingData.conversationType}</Text>
          </View>

          <View className="mx-4 mb-6 bg-white rounded-3xl p-6 shadow-sm items-center">
            <Text className="text-5xl font-bold text-gray-900 mb-2">
              {coachingData.overallScore}/{coachingData.maxScore}
            </Text>
            <Text className="text-gray-600 text-center">
              Strong performance! A few tweaks and you'll be excellent.
            </Text>
          </View>

          <View className="mx-4 mb-6 bg-white rounded-3xl p-6 shadow-sm">
            <View className="flex-row items-center mb-4">
              <Feather name="check-circle" size={24} color="#14B8A6" />
              <Text className="text-teal-700 font-bold text-lg ml-3">What you did well</Text>
            </View>
            {coachingData.summary.whatYouDidWell.map((item, index) => (
              <View key={index} className="mb-3">
                <Text className="text-gray-900 font-semibold mb-1">• {item.metric}</Text>
                <Text className="text-gray-600 ml-4">{item.detail}</Text>
              </View>
            ))}
          </View>

          <View className="mx-4 mb-6 bg-white rounded-3xl p-6 shadow-sm">
            <View className="flex-row items-center mb-4">
              <Feather name="target" size={24} color="#3B82F6" />
              <Text className="text-blue-700 font-bold text-lg ml-3">Focus on next time</Text>
            </View>
            {coachingData.summary.focusNextTime.map((item, index) => (
              <View key={index} className="mb-4">
                <Text className="text-blue-900 font-semibold mb-2">• {item.metric}</Text>
                <Text className="text-gray-600 ml-4">{item.detail}</Text>
              </View>
            ))}
          </View>

          <View className="mx-4 mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-6 shadow-lg">
            <View className="flex-row items-center mb-4">
              <Feather name="trending-up" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-3">Your action items</Text>
            </View>
            
            {coachingData.summary.actionItems.map((item, index) => (
              <View key={index} className="mb-4 flex-row">
                <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
                  <Feather
                    name={
                      item.type === 'keep-it-up'
                        ? 'check-circle'
                        : item.type === 'focus'
                        ? 'target'
                        : 'zap'
                    }
                    size={20}
                    color="white"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold mb-1">{item.title}</Text>
                  <Text className="text-white/90 text-sm">{item.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text className="text-center text-gray-600 px-6 mb-4">
            Review your detailed feedback anytime in History.{'\n'}Keep practicing to build consistency! 💪
          </Text>
        </ScrollView>
      </>
    );
  }

  // -------------------- Metric Detail Screen --------------------
  if (currentPage === 'metric' && currentMetric) {
    const colors = getStatusColor(currentMetric.status);
    
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View className="bg-gray-50" style={{ paddingTop: insets.top }}>
          <View className="flex-row items-center justify-between px-4 py-4">
            <TouchableOpacity onPress={handleBackToOverview} className="flex-row items-center">
              <Feather name="arrow-left" size={24} color="#374151" />
              <Text className="text-gray-700 font-semibold ml-2">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="x" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-4">
            {/* Score Card */}
            <View className="bg-white rounded-3xl p-8 shadow-sm mb-6 items-center">
              <Text className="text-gray-900 font-bold text-xl mb-6">
                {currentMetric.letter} - {currentMetric.name}
              </Text>
              <Text className="text-orange-500 font-bold text-7xl mb-4">
                {currentMetric.score}/{currentMetric.maxScore}
              </Text>
              <View className={`${colors.bg} rounded-full px-6 py-2`}>
                <Text className={`${colors.text} font-semibold text-base`}>
                  {colors.badge}
                </Text>
              </View>
            </View>

            {/* Positives & Improvements Grid */}
            <View className="flex-row flex-wrap justify-between mb-4">
              {currentMetric.positives.map((positive, index) => (
                <View
                  key={`pos-${index}`}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
                  style={{ width: (SCREEN_WIDTH - 48) / 2 - 6 }}
                >
                  <Feather name="check-circle" size={22} color="#14B8A6" className="mb-2" />
                  <Text className="text-gray-800 text-sm leading-5 mt-2">{positive}</Text>
                </View>
              ))}
              
              {currentMetric.improvements.map((improvement, index) => (
                <View
                  key={`imp-${index}`}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm"
                  style={{ width: (SCREEN_WIDTH - 48) / 2 - 6 }}
                >
                  <Feather name="alert-triangle" size={22} color="#F59E0B" className="mb-2" />
                  <Text className="text-gray-800 text-sm leading-5 mt-2">{improvement}</Text>
                </View>
              ))}
            </View>

            {/* Example */}
            <View className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-teal-500">
              <Text className="text-gray-500 text-xs font-semibold mb-3 uppercase">
                Example from conversation:
              </Text>
              <Text className="text-gray-800 italic text-base leading-6">
                "{currentMetric.example}"
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View
          className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={handlePreviousMetric}
              disabled={selectedMetricIndex === 0}
              className={`flex-row items-center ${selectedMetricIndex === 0 ? 'opacity-30' : ''}`}
            >
              <Feather name="chevron-left" size={20} color="#374151" />
              <Text className="text-gray-700 font-semibold ml-2">Previous</Text>
            </TouchableOpacity>

            <View className="flex-row items-center">
              {coachingData.metrics.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === selectedMetricIndex ? 'bg-teal-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleNextMetric}
              disabled={selectedMetricIndex === coachingData.metrics.length - 1}
              className={`flex-row items-center ${
                selectedMetricIndex === coachingData.metrics.length - 1 ? 'opacity-30' : ''
              }`}
            >
              <Text className="text-gray-700 font-semibold mr-2">Next</Text>
              <Feather name="chevron-right" size={20} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  // -------------------- Overview Screen --------------------
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View className="bg-gray-50" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center justify-between px-4 py-4">
          <Text className="text-gray-500 text-sm">
            Card {currentCardNumber} of {totalCards}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="x" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="p-4">
          {/* Score Overview Card */}
          <View className="bg-white rounded-3xl p-8 shadow-sm mb-6">
            <View className="items-center mb-6">
              <CircularProgress
                score={coachingData.overallScore}
                maxScore={coachingData.maxScore}
                percentage={coachingData.percentage}
              />
            </View>
            
            <Text className="text-gray-900 font-bold text-2xl text-center mb-4">
              Your Conversation Score
            </Text>
            
            <View className="items-center">
              <View className="bg-teal-100 rounded-full px-5 py-2">
                <Text className="text-teal-700 font-semibold text-base">
                  {coachingData.conversationType}
                </Text>
              </View>
            </View>
          </View>

          {/* Metrics List */}
          <View className="bg-white rounded-3xl p-4 shadow-sm mb-6">
            {coachingData.metrics.map((metric, index) => {
              const colors = getStatusColor(metric.status);
              
              return (
                <TouchableOpacity
                  key={metric.id}
                  onPress={() => handleMetricPress(index)}
                  className="flex-row items-center justify-between p-4 rounded-xl mb-2"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center flex-1">
                    <Text className="text-gray-900 font-semibold text-base mr-3">
                      {metric.letter} - {metric.name}
                    </Text>
                    <View className={`${colors.bg} rounded-full px-3 py-1`}>
                      <Text className={`${colors.text} text-xs font-medium`}>
                        {colors.badge}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-orange-500 font-bold text-base mr-2">
                      {metric.score}/{metric.maxScore}
                    </Text>
                    <Feather name="chevron-right" size={20} color="#9CA3AF" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* View Summary Button */}
         <TouchableOpacity onPress={handleViewSummary} activeOpacity={0.8}>
  <BlurView
    intensity={40}
    tint="light"
    style={{
      paddingVertical: 18,
      borderRadius: 20,
      marginBottom: 20,
      backgroundColor: 'rgba(255,255,255,0.25)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View className="flex-row items-center justify-center">
      <Feather name="zap" size={22} color="#0D9488" />
      <Text className="text-teal-700 font-semibold text-lg ml-3">
        View Summary
      </Text>
    </View>
    <Text className="text-gray-600 text-center text-sm mt-2">
      Get a high-level recap of your performance
    </Text>
  </BlurView>
</TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}