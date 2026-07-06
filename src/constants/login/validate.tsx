export interface ValidateState {
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
}

export type ValidateAction =
    | {
        type: 'email-check';
        payload: string;
    }
    | {
        type: 'password-check';
        payload: string;
    };

export const initialState: ValidateState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
};

export const ValidateReducer = (
    state: ValidateState,
    action: ValidateAction
): ValidateState => {
    switch (action.type) {
        case 'email-check':

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const check = emailRegex.test(action.payload);

            return {
                ...state,
                email: action.payload,
                emailError:
                    action.payload.trim().length === 0
                        ? 'Email kosong, mohon diisi terlebih dahulu!'
                        : !check ? 'Email tidak valid, mohon diisi ulang' : '',
            };

        case 'password-check':
            return {
                ...state,
                password: action.payload,
                passwordError:
                    action.payload.trim().length === 0
                        ? 'Password kosong, mohon diisi terlebih dahulu!'
                        : '',
            };

        default:
            return state;
    }
};