import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigation from "./app/navigations/Navigator"


export default function App() {
  return (
    <SafeAreaView>

      <StatusBar />
      <AppNavigation />

    </SafeAreaView>

  );
}
