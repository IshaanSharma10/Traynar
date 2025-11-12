import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

interface FeedbackItem {
  category: string;
  score: number;
  feedback: string;
  color: string;
}

export default function EvaluationResultScreen() {
  const overallScore = 88;
  const maxScore = 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (overallScore / maxScore) * circumference;

  const feedbackItems: FeedbackItem[] = [
    {
      category: 'Recognize',
      score: 92,
      feedback: "You did a great job acknowledging the patient's concerns and validating their emotions. Good job!",
      color: '#10B981'
    },
    {
      category: 'Assess',
      score: 95,
      feedback: "Successfully assessed the patient's primary needs and addressed them accordingly.",
      color: '#3B82F6'
    },
    {
      category: 'Improve',
      score: 78,
      feedback: "Your tone could be softened when discussing financial aspects to avoid causing patient stress.",
      color: '#F59E0B'
    },
    {
      category: 'Suggest',
      score: 85,
      feedback: "Try offering more upward payment options to make the treatment more affordable for them.",
      color: '#8B5CF6'
    },
    {
      category: 'Encourage',
      score: 90,
      feedback: "Ending the conversation with 'We're here to support you through the process' can build trust.",
      color: '#06B6D4'
    },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
        className="flex-row items-center justify-between px-4 py-4 bg-white"
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-gray-800 font-bold text-lg">Evaluation Result</Text>
        <View style={{ width: 24 }} />
      </MotiView>

      <ScrollView className="flex-1 bg-gray-50 px-4">
        {/* Overall Score */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 200 }}
          className="items-center my-6"
        >
          <Text className="text-gray-600 text-sm mb-4">Overall AI Score</Text>
          <View className="relative items-center justify-center">
            <Svg width="120" height="120">
              <Circle
                cx="60"
                cy="60"
                r="45"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <Circle
                cx="60"
                cy="60"
                r="45"
                stroke="#3B82F6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </Svg>
            <View className="absolute">
              <Text className="text-gray-800 font-bold text-4xl">{overallScore}</Text>
              <Text className="text-gray-400 text-sm text-center">/ {maxScore}</Text>
            </View>
          </View>
        </MotiView>

        {/* AI General Feedback */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', delay: 400 }}
          className="bg-white rounded-xl p-4 mb-4"
        >
          <View className="flex-row items-center mb-3">
            <Feather name="zap" size={20} color="#3B82F6" />
            <Text className="text-gray-800 font-bold text-base ml-2">AI General Feedback</Text>
          </View>
          <Text className="text-gray-600 text-sm leading-5">
            You showed strong empathy and excellent clarity when addressing the patient's concerns. Consider a softer tone when discussing costs to enhance patient comfort before discussing payment options.
          </Text>
        </MotiView>

        {/* RAISE Analysis */}
        <Text className="text-gray-400 text-xs font-semibold mb-3 px-1">RAISE Analysis</Text>
        
        {feedbackItems.map((item, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'spring', delay: 600 + index * 100 }}
            className="bg-white rounded-xl p-4 mb-3"
          >
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-800 font-bold text-base">{item.category}</Text>
              <View className="bg-gray-100 px-3 py-1 rounded-full">
                <Text className="font-bold" style={{ color: item.color }}>{item.score}</Text>
              </View>
            </View>
            <Text className="text-gray-600 text-sm leading-5">{item.feedback}</Text>
          </MotiView>
        ))}

        {/* View Past Evaluations Button */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 1100 }}
          className="mb-8"
        >
          <TouchableOpacity className="bg-blue-500 py-4 rounded-xl">
            <Text className="text-white text-center font-semibold">View Past Evaluations</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </>
  );
}