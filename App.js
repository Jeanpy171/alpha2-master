import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AccountStack from './app/navigation/AccountStack';
import Splash from './app/screens/Splash';
import { AuthProvider } from './src/context/AuthContext';
import MyStack from './app/navigation/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <AccountStack/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
