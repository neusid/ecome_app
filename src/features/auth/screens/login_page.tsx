import AppleIcon from '@/assets/expo.icon/Assets/apple_icon.svg';
import BoxIcon from '@/assets/expo.icon/Assets/box-icon.svg';
import EmailIcon from '@/assets/expo.icon/Assets/envelope.svg';
import GoogleIcon from '@/assets/expo.icon/Assets/google_icon.svg';
import PasswordIcon from '@/assets/expo.icon/Assets/password.svg';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import Checkbox from 'expo-checkbox';
import { useReducer, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { ValidateReducer, initialState } from '../validations/validate';

import { getData } from '@/data/repositories/firestore.repository';
import { useAuthStore } from '@/stores/authStore';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../firebaseConfig';

const InitialValue = {
    email: '',
    password: ''
}

function getFirebaseErrorMessage(code: string) {
    switch (code) {
        case 'auth/user-not-found':
            return 'Akun tidak ditemukan. Periksa kembali email Anda.';
        case 'auth/wrong-password':
            return 'Password salah. Silakan coba lagi.';
        case 'auth/invalid-credential':
            return 'Email atau password salah.';
        case 'auth/invalid-email':
            return 'Format email tidak valid.';
        case 'auth/too-many-requests':
            return 'Terlalu banyak percobaan. Silakan coba beberapa saat lagi.';
        case 'auth/network-request-failed':
            return 'Koneksi internet bermasalah. Periksa kembali jaringan Anda.';
        default:
            return 'Terjadi kesalahan. Silakan coba lagi.';
    }
}


export default function LoginPage() {
    const [checkBox, setCheckBox] = useState<boolean>(true);
    const [validate, validateDispatcher] = useReducer(ValidateReducer, initialState);
    const [loading, setLoading] = useState(false);

    const HandleLogin = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const result = await signInWithEmailAndPassword(
                auth,
                validate.email,
                validate.password
            );

            console.log("LOGIN SUCCESS:", result.user.email);
            console.log(`UID Response: ${result.user.uid}`)
            useAuthStore.getState().setUid(result.user?.uid ?? null);
            console.log(`UID Persist: ${useAuthStore.getState().uid ?? null}`)
            router.replace("/home")

        } catch (error: any) {
            const message = getFirebaseErrorMessage(error.code);
            Alert.alert("Login Gagal", message);
        } finally {
            setLoading(false);
        }
    };

    const handleGetData = async () => {
        try {
            await getData();
        } catch (e: any) {
            console.log("Login error:", e.message);
        }
    }

    return (
        <ScrollView>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.heroSection}>

                    <ThemedView style={styles.headLine}>
                        <ThemedView style={styles.iconBox}>
                            <BoxIcon width={25.96} height={25.96} />
                        </ThemedView>
                        <Text style={styles.welcomeText}>Welcome to VegBox</Text>
                        <Text style={styles.getStartedText}>Get started now</Text>
                    </ThemedView>

                    <ThemedView style={styles.wrapLogin}>
                        <ThemedView style={styles.inputFieldWrap}>

                            <ThemedView style={styles.containerInput}>
                                <Text style={styles.labelInput}>E-mail</Text>
                                <ThemedView style={styles.inputContainer}>
                                    <EmailIcon width={24} height={24} />
                                    <TextInput
                                        value={validate.email}
                                        style={styles.textInput}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onChangeText={(value) =>
                                            validateDispatcher({
                                                type: 'email-check',
                                                payload: value,
                                            })
                                        }
                                    />
                                </ThemedView>
                                {validate.emailError !== '' && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>
                                        {validate.emailError}
                                    </Text>
                                )}
                            </ThemedView>

                            <ThemedView style={styles.containerInput}>
                                <Text style={styles.labelInput}>Password</Text>
                                <ThemedView style={styles.inputContainer}>
                                    <PasswordIcon width={24} height={24} />
                                    <TextInput
                                        value={validate.password}
                                        style={styles.textInput}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        onChangeText={(value) => validateDispatcher({ type: 'password-check', payload: value })}
                                    />
                                </ThemedView>
                                {validate.passwordError !== '' && (
                                    <Text style={{ color: 'red', marginTop: 5 }}>
                                        {validate.passwordError}
                                    </Text>
                                )}
                            </ThemedView>

                            <ThemedView style={styles.checkboxWrap}>
                                <ThemedView style={styles.rememberMeCheck}>
                                    <Checkbox
                                        style={styles.checkboxLogin}
                                        value={checkBox}
                                        onValueChange={(newValue) => setCheckBox(newValue)}
                                        color={checkBox ? '#61AD4E' : undefined}
                                    />
                                    <Text style={styles.rememberMeText}>Remember me</Text>
                                </ThemedView>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </ThemedView>

                            <TouchableOpacity style={styles.buttonLogin} onPress={() => { HandleLogin() }} disabled={loading}>
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text style={styles.textLogin}>Login</Text>
                                )}
                            </TouchableOpacity>

                            <ThemedView style={styles.dividerWrap}>
                                <ThemedView style={styles.dividerLine}></ThemedView>
                                <Text style={styles.dividerText}>Or Login With</Text>
                                <ThemedView style={styles.dividerLine}></ThemedView>
                            </ThemedView>

                            <ThemedView style={styles.wrapSocial}>
                                <TouchableOpacity style={styles.buttonSocial} onPress={() => handleGetData()} >
                                    <GoogleIcon width={24} height={24} />
                                    <Text style={styles.textSocial}>Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonSocial} onPress={() => { }}>
                                    <AppleIcon width={24} height={24} />
                                    <Text style={styles.textSocial}>Apple</Text>
                                </TouchableOpacity>
                            </ThemedView>
                            {/* <ThemedView style={{ width: 100, height: 100, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                <LottieView
                                    source={require('../../../assets/images/loading.json')}
                                    autoPlay
                                    loop
                                    speed={3}
                                    style={{ width: 50, height: 50 }}
                                />
                            </ThemedView> */}
                            <ThemedView style={styles.termsWrap}>
                                <ThemedText style={styles.termsText}>
                                    By signing up, you agree to the <ThemedText style={styles.termsHighlight}>Terms of Service</ThemedText> and <ThemedText style={styles.termsHighlight}>Data Processing Agreement</ThemedText>
                                </ThemedText>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heroSection: {
        alignItems: 'center',
        paddingTop: Spacing.six,
        flex: 1,
        paddingHorizontal: Spacing.four,
    },
    headLine: {
        width: 345,
        marginBottom: 24,
        gap: 6,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#EFF7ED',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#97999D',
    },
    getStartedText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1C2229',
    },
    wrapLogin: {
        alignItems: 'center',
    },
    inputFieldWrap: {
        width: 345,
        gap: 20,
    },
    containerInput: {
        width: 345,
        gap: 6,
    },
    labelInput: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1C2229',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8E9EA',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F9FAFB',
        height: 48,
    },
    textInput: {
        flex: 1,
        height: '100%',
        paddingLeft: 10,
        color: '#1C2229',
    },
    checkboxWrap: {
        width: 345,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 4,
    },
    rememberMeCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkboxLogin: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderColor: '#E8E9EA',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#4B5563',
    },
    forgotPassword: {
        color: '#61AD4E',
        fontSize: 14,
        fontWeight: '500',
    },
    buttonLogin: {
        width: 345,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#61AD4E',
        borderRadius: 12,
        marginTop: 8,
    },
    textLogin: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E9EA',
    },
    dividerText: {
        color: '#B9BABD',
        fontWeight: '400',
        fontSize: 12,
        paddingHorizontal: 16,
    },
    wrapSocial: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 345,
    },
    buttonSocial: {
        width: 162,
        height: 46,
        backgroundColor: '#fff',
        borderColor: '#E8E9EA',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flexDirection: 'row',
    },
    textSocial: {
        color: '#1C2229',
        fontWeight: '500',
    },
    termsWrap: {
        marginTop: 12,
        alignItems: 'center',
        marginBottom: 50
    },
    termsText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 18,
        color: '#6B7280',
    },
    termsHighlight: {
        fontSize: 12,
        fontWeight: '600',
        color: "#1C2229",
    },
});