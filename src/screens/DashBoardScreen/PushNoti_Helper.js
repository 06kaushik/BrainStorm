import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async (p) => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToken()
    }
}

const GetFCMToken = async () => {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log('old token', fcmtoken);
    if (!fcmtoken) {
        try {
            fcmtoken = await messaging().getToken(); // Remove "let" here
            if (fcmtoken) {
                console.log('new token', fcmtoken);
                await AsyncStorage.setItem("fcmtoken", fcmtoken);
            } else {
                // Handle the case where fcmtoken is falsy
            }
        } catch (error) {
            console.log(error, 'error in fcm token');
        }
    }
}


