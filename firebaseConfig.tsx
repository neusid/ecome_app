import { getApp, getApps, initializeApp, setLogLevel } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, memoryLocalCache } from "firebase/firestore";

setLogLevel('error');

const firebaseConfig = {
    apiKey: "AIzaSyCd8BAJRqMXZ5BVDxuPT_RvGsAYuC2t7SA",
    authDomain: "simulation-data-layer.firebaseapp.com",
    projectId: "simulation-data-layer",
    storageBucket: "simulation-data-layer.firebasestorage.app",
    messagingSenderId: "458608510791",
    appId: "1:458608510791:web:9c6744dde7b9849abaee62",
    measurementId: "G-2GV8K9YG9E",
};

const app = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
    localCache: memoryLocalCache(),
});
