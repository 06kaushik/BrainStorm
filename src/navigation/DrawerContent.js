import React, { useContext, useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import images from '../component/images';
import { COLORS } from '../component/GlobalStyle';
import { ContextApi } from '../component/ContextApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";





const DrawerContent = ({ props, navigation }) => {
    const { logout } = useContext(ContextApi)
    const [token, setToken] = useState('')




    const handleLogout = async () => {
        let body = {
            token: token
        }
        try {
            const resp = await axios.post('/auth/logOut', body)
            logout(resp)
        } catch (error) {
            ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    }

    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('TOKEN');
            let data = JSON.parse(userDetail);
            setToken(data)
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    const showConfirmDialog = (item) => {
        return Alert.alert(
            "Logout?",
            `Are you sure you want to LOGOUT ?`,
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        handleLogout();
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };



    return (
        <View style={style.main}>
            <DrawerContentScrollView {...props} style={{}}>
                <View style={style.cont1}>
                    <Image style={{ alignSelf: 'center', height: 25, width: 250, marginTop: 20 }} source={images.header} />
                </View>

                <View style={style.cont2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={style.cont3}>
                            <Image style={style.img} source={images.home} />
                            <Text style={{ color: 'grey', fontFamily: 'Inter-Bold', fontSize: 18, marginLeft: 40 }}>Home</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={style.cont2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
                        <View style={style.cont3}>
                            <Image style={style.img} source={images.book} />
                            <Text style={{ color: 'grey', fontFamily: 'Inter-Bold', fontSize: 16, marginLeft: 40 }}>My Courses</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={style.cont2}>

                    <TouchableOpacity onPress={() => navigation.navigate('Results')}>
                        <View style={style.cont3}>
                            <Image style={style.img} source={images.stats} />
                            <Text style={{ color: 'grey', fontFamily: 'Inter-Bold', fontSize: 16, marginLeft: 40 }}>Assessments</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={style.cont2}>

                    <TouchableOpacity onPress={() => navigation.navigate('AllSkills')}>
                        <View style={style.cont3}>
                            <Image style={style.img} source={images.stats} />
                            <Text style={{ color: 'grey', fontFamily: 'Inter-Bold', fontSize: 16, marginLeft: 40 }}>Skills</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={style.cont2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Virtual')}>
                        <View style={style.cont3}>
                            <Image style={style.img} source={images.meet} />
                            <Text style={{ color: 'grey', fontFamily: 'Inter-Bold', fontSize: 16, marginLeft: 40 }}>Virtual Meets</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={style.cont2}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <View style={style.cont3}>
                            <Image style={style.img} source={images.profile} />
                            <Text style={{ color: 'grey', fontFamily: 'Inter-Bold', fontSize: 16, marginLeft: 40 }}>My Profile</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={style.cont4}>
                    <TouchableOpacity onPress={() => showConfirmDialog()}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                            <Image style={{ height: 20, width: 20, tintColor: 'white', right: 20 }} source={images.logout} />

                            <Text style={{ color: 'white', fontFamily: 'Inter-Bold', fontSize: 16 }}>LOGOUT</Text>
                        </View>
                    </TouchableOpacity>

                </View>



            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white'
    },
    cont1: {
        // borderWidth: 1,
        height: 65,
        width: '100%',
        top: 0,
        elevation: 2,
        // backgroundColor:'white',
        // borderColor:'white'
    },
    cont2: {
        borderWidth: 1,
        height: 55,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: '#F7F8FD',
        borderColor: '#F7F8FD',
        elevation: 1,
        marginTop: 30

    },
    img: {
        height: 25,
        width: 25,
        tintColor: 'grey'

    },
    cont3: {
        flexDirection: 'row',
        marginLeft: 18,
        marginTop: 12
    },
    cont4: {
        borderWidth: 1,
        height: 48,
        width: '90%',
        backgroundColor: COLORS.buttonBack,
        marginTop: 200,
        alignSelf: 'center',
        borderRadius: 8,
        borderColor: COLORS.buttonBack,
        bottom: 20

    }


})