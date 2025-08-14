import {
  MPLUS1p_100Thin,
  MPLUS1p_300Light,
  MPLUS1p_400Regular,
  MPLUS1p_500Medium,
  MPLUS1p_700Bold,
  MPLUS1p_800ExtraBold,
  MPLUS1p_900Black,
  useFonts,
} from '@expo-google-fonts/m-plus-1p';
import { DefaultTheme, ThemeProvider, type Theme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MPLUS1p_100Thin,
    MPLUS1p_300Light,
    MPLUS1p_400Regular,
    MPLUS1p_500Medium,
    MPLUS1p_700Bold,
    MPLUS1p_800ExtraBold,
    MPLUS1p_900Black,
  });

  const AppTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
    },
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={AppTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
