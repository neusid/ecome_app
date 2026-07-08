import { Spacing } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: 900,
        boxSizing: 'border-box'
    },
    heroSection: {
        alignItems: 'center',
        paddingTop: 120,
        flex: 1,
        paddingHorizontal: Spacing.four,
        height: '100%'
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
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
