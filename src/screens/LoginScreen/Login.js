import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, StatusBar } from 'react-native';
import { FONTS, COLORS, MARGIN, FlexStyle, SIZE } from "../../component/GlobalStyle";
import Styles from "./Style";
import images from '../../component/images';
import axios from 'axios';
import { ContextApi } from '../../component/ContextApi';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Color from '../../Theme/Color';
import SystemNavigationBar from 'react-native-system-navigation-bar';


const LoginScreen = () => {
    SystemNavigationBar.setNavigationColor(Color.background);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const { login } = useContext(ContextApi);
    const [isloading, setIsLoading] = useState(false)
    const [macid, setMacId] = useState(null)
    const [fcmtoken, setFcmToken] = useState('')
    const [passwordVisibleforpass, setPasswordVisibleforpass] = useState(false);
    const [showforpass, setShowforpass] = useState(true);
    const closeeye = require("../../assets/ic.png");
    const openeeye = require("../../assets/openeye.png");


    const requestId = async () => {
        const deviceId = await DeviceInfo.getUniqueId()
        setMacId(deviceId)
    }

    useEffect(() => {
        requestId()
    }, [])


    const requestUserPermission = async (p) => {
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
        setFcmToken(fcmtoken)
        console.log('old token', fcmtoken);
        if (!fcmtoken) {
            try {
                fcmtoken = await messaging().getToken(); // Remove "let" here
                if (fcmtoken) {
                    console.log('new token', fcmtoken);
                    await AsyncStorage.setItem("fcmtoken", fcmtoken);
                    setFcmToken(fcmtoken)
                } else {
                    // Handle the case where fcmtoken is falsy
                }
            } catch (error) {
                console.log(error, 'error in fcm token');
            }
        }
    }

    useEffect(() => {
        requestUserPermission()
    })

    const HandleLogin = async () => {
        setIsLoading(true);


        let body = {
            emailMobUid: email,
            password: password,
            userRole: '3',
            macAddress: macid,
            deviceToken: fcmtoken,
            deviceType: 'android'
        }
        console.log('bodyyy', body);
        try {
            const resp = await axios.post('/auth/login', body)
            console.log('RESPONSE FROM LOGIN', resp.data);
            login(resp?.data?.token, resp?.data?.userId)
            setIsLoading(false)
            ToastAndroid.show('Login Successfull', ToastAndroid.LONG, ToastAndroid.BOTTOM);

        } catch (error) {
            console.log('error from login', error.response.data.message);
            ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
            setIsLoading(false)
        }
    }






    return (
        <View style={Styles.container}>
            <StatusBar backgroundColor={Color.background} />
            <View style={Styles.leftHalf}>
                <View style={Styles.headercont}>
                    <Image style={{ alignSelf: 'center', marginTop: 5, resizeMode: 'contain' }} source={images.loginHeader} />
                </View>

                <Image style={Styles.mainlogo} source={images.newlogobrainstorm} />

            </View>

            <View style={Styles.rightHalf}>
                <Text style={Styles.txt}>Sign In</Text>
                <Text style={Styles.txt1}>Enter your login details to access {'\n'}your account.</Text>

                <ScrollView>
                    <View style={Styles.cont1}>
                        <TextInput
                            placeholder='Enter UID'
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor={'grey'}
                            style={Styles.input} />
                        <View
                            style={Styles.inputStyle}
                        >
                            <TextInput
                                style={{ flex: 1, color: COLORS.black, }}

                                autoCapitalize="none"
                                maxLength={16}
                                secureTextEntry={showforpass}
                                placeholder="Password"
                                placeholderTextColor={'grey'}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setShowforpass(!showforpass);
                                    setPasswordVisibleforpass(!passwordVisibleforpass);
                                }}
                                style={{ alignSelf: "center" }}
                            >
                                {passwordVisibleforpass === false ? (
                                    <Image source={closeeye} style={{ right: 5, tintColor: '#000' }} />
                                ) : (
                                    <Image source={openeeye} style={{ height: 25, width: 25, right: 5, resizeMode: 'contain', tintColor: '#000' }} />

                                )}
                            </TouchableOpacity>
                        </View>
                    </View>


                    <TouchableOpacity onPress={() => alert('Contact Admin')}>
                        <Text style={Styles.txt2}>Forgot Password?</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => HandleLogin()}>
                        <View style={Styles.cont2}>
                            {isloading ? (
                                <ActivityIndicator size="small" color="white" style={Styles.loader} />
                            ) : (
                                <View style={Styles.cont3}>
                                    <Text style={Styles.txt3}>Sign in</Text>
                                    <Image style={[Styles.arrow, { tintColor: Color.textcolor }]} source={images.arrow} />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>



                </ScrollView>
            </View>
        </View>
    );
};



export default LoginScreen;
