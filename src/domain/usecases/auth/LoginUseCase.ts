import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebaseConfig";

export interface LoginResult {
  uid: string;
  email: string | null;
}

export function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "Akun tidak ditemukan. Periksa kembali email Anda.";
    case "auth/wrong-password":
      return "Password salah. Silakan coba lagi.";
    case "auth/invalid-credential":
      return "Email atau password salah.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan. Silakan coba beberapa saat lagi.";
    case "auth/network-request-failed":
      return "Koneksi internet bermasalah. Periksa kembali jaringan Anda.";
    default:
      return "Terjadi kesalahan. Silakan coba lagi.";
  }
}

export async function loginUseCase(
  email: string,
  password: string
): Promise<LoginResult> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return {
    uid: result.user.uid,
    email: result.user.email,
  };
}
