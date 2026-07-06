import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export class FireAuthRepository {
    async login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }
}

export const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Current User ID: ", user.uid);
    } else {
        console.log("Current User ID: null");
    }
});

export const GetUid = (): string | null => {
    const user = auth.currentUser;

    if (user) {
        console.log("Current User ID:", user.uid);
        return user.uid;
    } else {
        console.log("Current User ID: null");
        return null;
    }
};