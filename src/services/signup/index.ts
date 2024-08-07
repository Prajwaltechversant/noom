import { Alert } from "react-native";
import { SignupWithEmailtype } from "../../types/signup";
import auth from '@react-native-firebase/auth';




export const signUpWithEmail =
    async ({ email, password }: SignupWithEmailtype) => {

        if (!email || !password) {
            Alert.alert("Please Provide email or password")
        }
        else {
            try {
                await auth().createUserWithEmailAndPassword(email, password);
                console.log('User account created & signed in!');
                return true;

            } catch (error: any) {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    return 'That email address is already in use!'
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    return 'That email address is invalid!'

                }

                console.error(error);

            }
        }

    }


export const googleSignup = async () => {

}

export const faceBookSignup = async () => {

}