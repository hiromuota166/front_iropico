import { Button } from "@/components/Button/Button";
import { CardOnHeader } from "@/components/Card/CardOnHeader";
import { FormInput } from "@/components/Form/FormInput";
import ColorPaletteIcon from "@/components/Icon/ColorPaletteIcon";
import { Colors } from "@/constants/Colors";
import { handleSignIn, handleSignUp } from "@/lib/auth";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');

  const handlePress = () => {
    router.push("/room_select");
  };

  const onLoginPress = async () => {
    const user = await handleSignIn(email, password);
    if (user) {
      router.push("/room_select");
    }
  };

  const onSignUpPress = async () => {
    const user = await handleSignUp(email, password);
    if (user) {
      router.push("/room_select");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.titleView}>
        <ColorPaletteIcon />
        <Text style={styles.title}>Iropico</Text>
        <Text style={styles.subTitle}>指定された色を見つけて撮影しよう</Text>
      </View>

      <CardOnHeader title="アカウント情報" subTitle="ログインまたは新規登録してください" loginHeader>
        <View style={styles.inputContainer}>
          <FormInput
            placeholder="メールアドレス"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            placeholder="パスワード"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View>
            <FormInput
              placeholder="ニックネームを入力..."
              centerText
              value={nickName}
              onChangeText={setNickName}
            />
            <View style={{ alignItems: 'center' }}>
              <Text>20文字以内</Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 10 }}>
          <Button onPress={onLoginPress}>
            <Text>ログイン</Text>
          </Button>

          <Button onPress={onSignUpPress}>
            <Text>新規登録</Text>
          </Button>
        </View>
      </CardOnHeader>
      <Button onPress={handlePress}>
        <Text>ルーム選択画面に移動（認証なしデモ）</Text>
      </Button>
    </SafeAreaView>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
});
