import { auth } from "@/src/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

const handleSignUp = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("新規登録成功！ユーザー:", user.email);

    return user;
  } catch (error: any) {
    console.error("新規登録エラー:", error.code, error.message);
    let errorMessage = "新規登録に失敗しました。もう一度お試しください。";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "このメールアドレスはすでに使用されています。";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "パスワードは6文字以上で設定してください。";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "無効なメールアドレス形式です。";
    }

    alert(errorMessage);
    return null;
  }
};

const handleSignIn = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("ログイン成功！ユーザー:", user.email);

    return user;
  } catch (error: any) {
    console.error("ログインエラー:", error.code, error.message);
    let errorMessage = "ログインに失敗しました。もう一度お試しください。";
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      errorMessage = "メールアドレスまたはパスワードが間違っています。";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "無効なメールアドレス形式です。";
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "このアカウントは無効化されています。";
    }
    alert(errorMessage);
    return null;
  }
};

const handleSignOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("ログアウト成功！");
  } catch (error: any) {
    console.error("ログアウトエラー:", error.message);
    alert("ログアウトに失敗しました。");
  }
};

export { handleSignIn, handleSignOut, handleSignUp };
