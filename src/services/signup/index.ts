import { Alert } from "react-native";
import { SignupWithEmailtype } from "../../types/signup";
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
    webClientId: '504621257106-diq4n3e8kqm0hi2gk2kttl0cvp9last7.apps.googleusercontent.com',
});



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
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

export const faceBookSignup = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    console.log(result)

    if (result.isCancelled) {
        throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
        throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    return auth().signInWithCredential(facebookCredential);
}