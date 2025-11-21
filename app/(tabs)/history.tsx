import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Modal,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// -------------------- Types --------------------
interface Recording {
  id: string;
  title: string;
  conversationType: string;
  date: string;
  duration: string;
  audioUri: string;
  transcription: string;
  coachingScore: number;
  status: 'completed' | 'processing' | 'failed';
}

// -------------------- Mock Data --------------------
const MOCK_RECORDINGS: Recording[] = [
  {
    id: '1',
    title: 'Morning Huddle with Team',
    conversationType: 'Morning Huddle',
    date: '2024-11-20',
    duration: '08:45',
    audioUri: 'dummy://audio-1',
    transcription: 'Good morning everyone! Let\'s get started with today\'s huddle. We have 22 patients scheduled today with a production goal of $8,500...',
    coachingScore: 73,
    status: 'completed',
  },
  {
    id: '2',
    title: 'Insurance Discussion - Patient Miller',
    conversationType: 'Insurance Discussion',
    date: '2024-11-19',
    duration: '12:30',
    audioUri: 'dummy://audio-2',
    transcription: 'Hi Mrs. Miller, I wanted to review your insurance benefits with you. Your plan covers 80% of the procedure...',
    coachingScore: 85,
    status: 'completed',
  },
  {
    id: '3',
    title: 'Performance Review - Sarah Johnson',
    conversationType: 'Performance Review',
    date: '2024-11-18',
    duration: '15:20',
    audioUri: 'dummy://audio-3',
    transcription: 'Sarah, thank you for taking the time to meet today. I wanted to discuss your performance over the last quarter...',
    coachingScore: 92,
    status: 'completed',
  },
  {
    id: '4',
    title: 'Job Interview - New Hygienist',
    conversationType: 'Job Interview',
    date: '2024-11-17',
    duration: '18:15',
    audioUri: 'dummy://audio-4',
    transcription: 'Welcome! Thank you for coming in today. Let me start by telling you a bit about our practice...',
    coachingScore: 68,
    status: 'completed',
  },
  {
    id: '5',
    title: 'Morning Huddle - Team Alignment',
    conversationType: 'Morning Huddle',
    date: '2024-11-16',
    duration: '07:30',
    audioUri: 'dummy://audio-5',
    transcription: 'Team, let\'s review our schedule. We have a busy day ahead with several complex cases...',
    coachingScore: 0,
    status: 'processing',
  },
];

const FILTER_TYPES = ['All', 'Morning Huddle', 'Insurance Discussion', 'Performance Review', 'Job Interview'];

// -------------------- Component --------------------
export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [modalView, setModalView] = useState<'audio' | 'transcription' | 'coaching'>('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    setIsLoading(true);
    // Simulate API call - Replace with your actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRecordings(MOCK_RECORDINGS);
    setIsLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#DC2626';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return '#D1FAE5';
    if (score >= 60) return '#FEF3C7';
    return '#FEE2E2';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredRecordings = recordings.filter(recording => {
    const matchesSearch = recording.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recording.conversationType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || recording.conversationType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleRecordingPress = (recording: Recording) => {
    setSelectedRecording(recording);
    setModalView('audio');
  };

  const handleCloseModal = () => {
    setSelectedRecording(null);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In real implementation, control actual audio playback here
  };

  const renderRecordingItem = ({ item, index }: { item: Recording; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 50, duration: 400 }}
    >
      <TouchableOpacity
        onPress={() => handleRecordingPress(item)}
        className="bg-white rounded-2xl p-4 shadow-sm mb-3 mx-4"
        activeOpacity={0.7}
      >
        <View className="flex-row items-start">
          {/* Icon */}
          <View
            className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
              item.status === 'processing' ? 'bg-amber-100' :
              item.status === 'failed' ? 'bg-red-100' :
              'bg-teal-100'
            }`}
          >
            {item.status === 'processing' ? (
              <ActivityIndicator size="small" color="#D97706" />
            ) : item.status === 'failed' ? (
              <Feather name="alert-circle" size={24} color="#DC2626" />
            ) : (
              <Feather name="mic" size={24} color="#0D9488" />
            )}
          </View>

          {/* Content */}
          <View className="flex-1">
            <View className="flex-row items-start justify-between mb-2">
              <Text className="font-semibold text-gray-900 text-base flex-1 mr-2" numberOfLines={1}>
                {item.title}
              </Text>
              {item.status === 'completed' && (
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: getScoreBgColor(item.coachingScore) }}
                >
                  <Text className="font-bold text-sm" style={{ color: getScoreColor(item.coachingScore) }}>
                    {item.coachingScore}%
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-row items-center mb-3">
              <Feather name="tag" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-500 ml-1 mr-3">{item.conversationType}</Text>
              <Feather name="clock" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-500 ml-1">{item.duration}</Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-gray-400">{formatDate(item.date)}</Text>
              
              {item.status === 'completed' && (
                <View className="flex-row gap-3">
                  <Feather name="play-circle" size={16} color="#0D9488" />
                  <Feather name="file-text" size={16} color="#0D9488" />
                  <Feather name="bar-chart-2" size={16} color="#0D9488" />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#0D9488" />
        <Text className="text-gray-600 mt-4">Loading your recordings...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0D9488', '#14B8A6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingTop: insets.top }}
      >
        <View className="p-6 pb-8">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-white text-2xl font-bold mb-1">Recording History</Text>
              <Text className="text-white/90 text-sm">{recordings.length} total recordings</Text>
            </View>
            <TouchableOpacity className="bg-white/20 p-3 rounded-xl">
              <Feather name="filter" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-white rounded-xl px-4 py-3 flex-row items-center mb-4">
            <Feather name="search" size={18} color="#6B7280" />
            <TextInput
              placeholder="Search recordings..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-gray-900"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Filter Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {FILTER_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-full ${
                    filterType === type ? 'bg-white' : 'bg-white/20'
                  }`}
                >
                  <Text className={`text-sm font-medium ${
                    filterType === type ? 'text-teal-600' : 'text-white'
                  }`}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>

      {/* Recordings List */}
      {filteredRecordings.length === 0 ? (
        <View className="flex-1 items-center justify-center p-8">
          <Feather name="mic-off" size={64} color="#D1D5DB" />
          <Text className="text-gray-500 text-lg mt-4 mb-2">No recordings found</Text>
          <Text className="text-gray-400 text-sm text-center">Try adjusting your search or filters</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecordings}
          renderItem={renderRecordingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal */}
      {selectedRecording && (
        <Modal
          visible={true}
          animationType="slide"
          transparent={false}
          onRequestClose={handleCloseModal}
        >
          <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            {/* Modal Header */}
            <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
              <View className="flex-1 mr-4">
                <Text className="text-xl font-bold text-gray-900" numberOfLines={1}>
                  {selectedRecording.title}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">{selectedRecording.conversationType}</Text>
              </View>
              <TouchableOpacity
                onPress={handleCloseModal}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
              >
                <Feather name="x" size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Tab Navigation */}
            <View className="flex-row border-b border-gray-200">
              <TouchableOpacity
                onPress={() => setModalView('audio')}
                className={`flex-1 py-4 ${modalView === 'audio' ? 'border-b-2 border-teal-600' : ''}`}
              >
                <View className="flex-row items-center justify-center">
                  <Feather name="play-circle" size={16} color={modalView === 'audio' ? '#0D9488' : '#9CA3AF'} />
                  <Text className={`ml-2 text-sm font-medium ${modalView === 'audio' ? 'text-teal-600' : 'text-gray-500'}`}>
                    Audio
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setModalView('transcription')}
                className={`flex-1 py-4 ${modalView === 'transcription' ? 'border-b-2 border-teal-600' : ''}`}
              >
                <View className="flex-row items-center justify-center">
                  <Feather name="file-text" size={16} color={modalView === 'transcription' ? '#0D9488' : '#9CA3AF'} />
                  <Text className={`ml-2 text-sm font-medium ${modalView === 'transcription' ? 'text-teal-600' : 'text-gray-500'}`}>
                    Transcript
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setModalView('coaching')}
                className={`flex-1 py-4 ${modalView === 'coaching' ? 'border-b-2 border-teal-600' : ''}`}
              >
                <View className="flex-row items-center justify-center">
                  <Feather name="bar-chart-2" size={16} color={modalView === 'coaching' ? '#0D9488' : '#9CA3AF'} />
                  <Text className={`ml-2 text-sm font-medium ${modalView === 'coaching' ? 'text-teal-600' : 'text-gray-500'}`}>
                    Coaching
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 24 }}
              showsVerticalScrollIndicator={false}
            >
              {modalView === 'audio' && (
                <View>
                  {/* Audio Player */}
                  <LinearGradient
                    colors={['#0D9488', '#14B8A6']}
                    className="rounded-2xl p-8 items-center mb-6"
                  >
                    <TouchableOpacity
                      onPress={togglePlayback}
                      className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-6"
                    >
                      <Feather name={isPlaying ? "pause" : "play"} size={36} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-semibold mb-2">{selectedRecording.duration}</Text>
                    <View className="w-full bg-white/20 rounded-full h-2 mb-2">
                      <View className={`bg-white rounded-full h-2 ${isPlaying ? 'w-1/3' : 'w-0'}`} />
                    </View>
                    <Text className="text-white/80 text-sm">
                      {isPlaying ? 'Playing...' : 'Ready to play'}
                    </Text>
                  </LinearGradient>

                  {/* Recording Info */}
                  <View className="flex-row gap-4">
                    <View className="flex-1 bg-gray-50 rounded-xl p-4">
                      <Feather name="calendar" size={20} color="#6B7280" />
                      <Text className="text-xs text-gray-500 mt-2 mb-1">Date</Text>
                      <Text className="text-sm font-semibold text-gray-900">{formatDate(selectedRecording.date)}</Text>
                    </View>
                    <View className="flex-1 bg-gray-50 rounded-xl p-4">
                      <Feather name="clock" size={20} color="#6B7280" />
                      <Text className="text-xs text-gray-500 mt-2 mb-1">Duration</Text>
                      <Text className="text-sm font-semibold text-gray-900">{selectedRecording.duration}</Text>
                    </View>
                  </View>
                </View>
              )}

              {modalView === 'transcription' && (
                <View>
                  <View className="bg-teal-50 rounded-xl p-4 flex-row mb-4">
                    <Feather name="info" size={20} color="#0D9488" />
                    <View className="flex-1 ml-3">
                      <Text className="text-sm text-teal-900 font-medium mb-1">Auto-generated transcription</Text>
                      <Text className="text-xs text-teal-700">This transcription was created using AI and may contain errors.</Text>
                    </View>
                  </View>

                  <View className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                    <Text className="text-gray-700 leading-6">{selectedRecording.transcription}</Text>
                  </View>

                  <TouchableOpacity className="bg-gray-100 py-4 rounded-xl items-center">
                    <View className="flex-row items-center">
                      <Feather name="download" size={16} color="#374151" />
                      <Text className="text-gray-700 font-medium ml-2">Download Transcription</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {modalView === 'coaching' && (
                <View>
                  {/* Overall Score */}
                  <View className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 items-center mb-4">
                    <View
                      className="w-20 h-20 rounded-full items-center justify-center mb-4"
                      style={{ backgroundColor: getScoreBgColor(selectedRecording.coachingScore) }}
                    >
                      <Text className="text-3xl font-bold" style={{ color: getScoreColor(selectedRecording.coachingScore) }}>
                        {selectedRecording.coachingScore}
                      </Text>
                    </View>
                    <Text className="text-lg font-bold text-gray-900 mb-2">Overall Performance</Text>
                    <Text className="text-sm text-gray-600 text-center">
                      {selectedRecording.coachingScore >= 80 ? 'Excellent work!' :
                       selectedRecording.coachingScore >= 60 ? 'Good performance with room for improvement' :
                       'Let\'s work on improving these areas'}
                    </Text>
                  </View>

                  {/* Key Insights */}
                  <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
                    <View className="flex-row items-center mb-3">
                      <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
                        <Feather name="check-circle" size={16} color="#10B981" />
                      </View>
                      <Text className="font-semibold text-gray-900">What went well</Text>
                    </View>
                    <Text className="text-sm text-gray-600 ml-11">Strong opening and clear communication of goals</Text>
                  </View>

                  <View className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                    <View className="flex-row items-center mb-3">
                      <View className="w-8 h-8 bg-amber-100 rounded-lg items-center justify-center mr-3">
                        <Feather name="alert-circle" size={16} color="#F59E0B" />
                      </View>
                      <Text className="font-semibold text-gray-900">Areas to improve</Text>
                    </View>
                    <Text className="text-sm text-gray-600 ml-11">Consider adding more specific examples and action items</Text>
                  </View>

                  <TouchableOpacity className="bg-teal-600 py-4 rounded-xl items-center">
                    <View className="flex-row items-center">
                      <Feather name="arrow-right" size={16} color="white" />
                      <Text className="text-white font-semibold ml-2">View Full Coaching Report</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      )}
    </>
  );
}