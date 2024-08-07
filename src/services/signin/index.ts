import auth from '@react-native-firebase/auth';
import { SignupWithEmailtype } from '../../types/signup';
import { Alert } from 'react-native';



export const login = async ({ email, password }: SignupWithEmailtype) => {


    if (!email || !password) {
        Alert.alert("Please Provide email or password")
    }
    else {
        try {
            await auth().signInWithEmailAndPassword(email, password)
            console.log('User account created & signed in!');
            return { res: true, error: undefined };

        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') {
                return { res: false, error: 'The supplied  credential is incorrect, Please try gain' };

            }

        }
    }
}