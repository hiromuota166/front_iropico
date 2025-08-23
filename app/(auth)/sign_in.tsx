import { Button } from "@/components/Button/Button";
import { CardOnHeader } from "@/components/Card/CardOnHeader";
import { FormInput } from "@/components/Form/FormInput";
import ColorPaletteIcon from "@/components/Icon/ColorPaletteIcon";
import { TitleIconAndText } from "@/components/TitleIconAndText";
import { Colors } from "@/constants/Colors";
import { handleSignIn, handleSignUp } from "@/lib/auth";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const NICK_LIMIT = 20;

  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');

  const nickCount = [...nickName].length;
  const over = nickCount > NICK_LIMIT;

  const handlePress = () => {
    router.push('/room_select');
  };

  const onLoginPress = async () => {
    const user = await handleSignIn(email, password);
    if (user) router.push('/room_select');
  };

  const onSignUpPress = async () => {
    const user = await handleSignUp(email, password);
    if (user) router.push('/room_select');
  };
  const onBackgroundPress = () => {
    if (Platform.OS === "web") {
      return;
    }
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Pressable onPress={onBackgroundPress} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          <TitleIconAndText
            title='Iropico'
            subTitle='指定された色を見つけて撮影しよう'
          >
            <ColorPaletteIcon />
          </TitleIconAndText>

          <CardOnHeader
            title='アカウント情報'
            subTitle='ログインまたは新規登録してください'
            loginHeader
          >
            <View style={styles.inputContainer}>
              <FormInput
                placeholder='メールアドレス'
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
              />
              <FormInput
                placeholder='パスワード'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <View>
                <FormInput
                  placeholder='ニックネームを入力...'
                  centerText
                  value={nickName}
                  onChangeText={setNickName}
                />
                <View style={styles.centerAlign}>
                  <Text
                    style={[styles.counterText, over && styles.counterTextOver]}
                  >
                    {nickCount}/{NICK_LIMIT}文字以内
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={onLoginPress} text='ログイン' />
              <Button onPress={onSignUpPress} text='新規登録' />
            </View>
          </CardOnHeader>
          <Button
            onPress={handlePress}
            text='ルーム選択画面に移動（認証なしデモ）'
          />
        </SafeAreaView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  scrollContent: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textTitle
  },
  subTitle: {
    fontSize: 16,
    color: Colors.textContent,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 12,
    backgroundColor: '#fff',
  },
  centerAlign: {
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 10,
  },
  counterText: {
    fontSize: 12,
    color: Colors.textContent,
  },
  counterTextOver: {
    color: Colors.notification,
  },
});
