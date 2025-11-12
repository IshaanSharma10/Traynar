import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface MenuItem {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  route?: string;
  action?: () => void;
  rightElement?: 'arrow' | 'toggle';
  toggleValue?: boolean;
  color?: string;
}

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const accountSettings: MenuItem[] = [
    { icon: 'user', label: 'Edit Profile', rightElement: 'arrow' },
    { icon: 'lock', label: 'Change Password', rightElement: 'arrow' },
    { icon: 'bell', label: 'Notification Preferences', rightElement: 'toggle', toggleValue: notificationsEnabled },
  ];

  const subscriptionItems: MenuItem[] = [
    { icon: 'credit-card', label: 'Billing History', rightElement: 'arrow' },
  ];

  const generalItems: MenuItem[] = [
    { icon: 'shield', label: 'Privacy Policy', rightElement: 'arrow' },
    { icon: 'file-text', label: 'Terms of Service', rightElement: 'arrow' },
    { icon: 'help-circle', label: 'Help & Support', rightElement: 'arrow' },
  ];

  const renderMenuItem = (item: MenuItem, index: number, delay: number) => (
    <MotiView
      key={index}
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'spring', delay }}
    >
      <TouchableOpacity
        onPress={item.action}
        className="flex-row items-center justify-between bg-white px-4 py-4 mb-2 rounded-xl"
      >
        <View className="flex-row items-center flex-1">
          <View className={`w-10 h-10 rounded-full ${item.color ? 'bg-red-50' : 'bg-blue-50'} items-center justify-center mr-3`}>
            <Feather name={item.icon} size={20} color={item.color || '#3B82F6'} />
          </View>
          <Text className={`${item.color ? 'text-red-500' : 'text-gray-800'} font-medium`}>
            {item.label}
          </Text>
        </View>
        {item.rightElement === 'arrow' && (
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        )}
        {item.rightElement === 'toggle' && (
          <View className={`w-12 h-7 rounded-full ${item.toggleValue ? 'bg-blue-500' : 'bg-gray-300'} justify-center px-1`}>
            <View className={`w-5 h-5 rounded-full bg-white ${item.toggleValue ? 'self-end' : 'self-start'}`} />
          </View>
        )}
      </TouchableOpacity>
    </MotiView>
  );

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
        <Text className="text-gray-800 font-bold text-lg">Profile & Settings</Text>
        <View style={{ width: 24 }} />
      </MotiView>

      <ScrollView className="flex-1 bg-gray-50 px-4">
        {/* Profile Card */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 200 }}
          className="bg-white rounded-2xl p-4 mt-4 mb-6 flex-row items-center"
        >
          <View className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            <View className="w-full h-full bg-orange-400 items-center justify-center">
              <Text className="text-white font-bold text-xl">ER</Text>
            </View>
          </View>
          <View>
            <Text className="text-gray-800 font-bold text-lg">Dr. Evelyn Reed</Text>
            <Text className="text-gray-500 text-sm">Bright Smiles Dental Clinic</Text>
          </View>
        </MotiView>

        {/* Account Settings */}
        <Text className="text-gray-400 text-xs font-semibold mb-3 px-1">ACCOUNT SETTINGS</Text>
        {accountSettings.map((item, idx) => renderMenuItem(item, idx, 400 + idx * 100))}

        {/* Subscription */}
        <Text className="text-gray-400 text-xs font-semibold mb-3 mt-6 px-1">SUBSCRIPTION</Text>
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', delay: 700 }}
          className="bg-white rounded-xl p-4 mb-2"
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-600 text-sm">Current Plan</Text>
            <Text className="text-green-500 font-semibold">Pro Plan</Text>
          </View>
          <TouchableOpacity className="bg-blue-500 py-3 rounded-lg mb-3">
            <Text className="text-white text-center font-semibold">Manage Subscription</Text>
          </TouchableOpacity>
        </MotiView>
        
        {subscriptionItems.map((item, idx) => renderMenuItem(item, idx, 800))}

        {/* General */}
        <Text className="text-gray-400 text-xs font-semibold mb-3 mt-6 px-1">GENERAL</Text>
        {generalItems.map((item, idx) => renderMenuItem(item, idx, 900 + idx * 100))}

        {/* Log Out */}
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', delay: 1200 }}
          className="mb-8 mt-2"
        >
          {renderMenuItem(
            { icon: 'log-out', label: 'Log Out', color: '#EF4444', action: () => {} },
            0,
            0
          )}
        </MotiView>
      </ScrollView>
    </>
  );
}