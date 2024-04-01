import React, { useState, useEffect, useCallback, useContext, } from "react";
import { ContextApi } from "../../component/ContextApi";
import { View, Text, TouchableOpacity, Image, ScrollView, ToastAndroid, Alert } from 'react-native'
import styles from "./style";
import images from "../../component/images";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from "../Skeleton";
import Color from "../../Theme/Color";
import UserAvatar from 'react-native-user-avatar';


const MainProfile = ({ navigation }) => {
    const { logout } = useContext(ContextApi)
    const [token, setToken] = useState('')
    const [profiledata, setProfileData] = useState('')
    const [userdetail, setDetail] = useState('')


    console.log(token);


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

    ////// DIALOGUE BOX TO HANDLE LOGOUT /////////

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

    /////////// GET USER /////////////

    ////// GET USER DETAILS //////

    const getUser1 = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setDetail(data)
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    }

    useEffect(() => {
        getUser1();
    }, [])

    ///////// USER PROFILE DETAIL ///////////

    const getLearnerDetail = async () => {
        try {
            const resp = await axios.get(`/learner/getSingleLearner/${userdetail}`)
            // console.log('user detail of learner', resp?.data?.data);
            setProfileData(resp?.data?.data)

        } catch (error) {
            console.log('error from deail learner', error);

        }
    }

    useEffect(() => {
        if (userdetail) {
            getLearnerDetail()
        }
    }, [userdetail])

    ////////////////////// GET LEVEL //////////////////////

    const calculatePercentageAssess = () => {
        return (profiledata?.totalObtainMarks / profiledata?.totalMarks) * 100;
    };
    const getAssessLevel = (percentage) => {
        if (percentage >= 0 && percentage <= 25) {
            return 'Level 1';
        } else if (percentage > 25 && percentage <= 50) {
            return 'Level 2';
        } else if (percentage > 50 && percentage <= 75) {
            return 'Level 3';
        } else if (percentage > 75 && percentage <= 100) {
            return 'Level 4';
        } else {
            return '';
        }
    };
    const percentage = calculatePercentageAssess();



    return (

        <View style={styles.main} >
            <View style={styles.leftHalf}>
                <View style={styles.cont}>
                    <TouchableOpacity onPress={() => navigation.goBack('')}>
                        <Image style={styles.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.txt}>My Profile</Text>
                </View>
                <View style={styles.cont1}>
                    {profiledata?.learnerImg === undefined ?
                        <UserAvatar style={styles.img1} bgColor={'white'} textColor={'black'} size={100} name={profiledata?.fullName} />
                        :
                        <Image style={styles.img1} source={{ uri: profiledata?.learnerImg }} />
                    }
                    <View style={styles.cont2}>
                        <Text style={styles.nametxt}>{profiledata?.firstName} {profiledata?.middleName} {profiledata?.surName}</Text>
                        <Text style={{ textAlign: 'center', color: '#79747E', fontSize: 14, fontFamily: 'Inter-SemiBold' }}>{profiledata?.gradeUid}</Text>
                    </View>

                </View>

            </View>
            <View style={styles.rightHalf}>
                <View style={styles.cont3}>
                    <View style={styles.cont4}>
                        <Image style={styles.img2} source={images.book1} />
                        <Image style={styles.img2} source={images.stats} />
                        <Image style={styles.img2} source={images.stats1} />
                    </View>
                    <View style={styles.cont4}>
                        <Text style={styles.txt1}>Courses</Text>
                        <Text style={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: 14,
                            fontFamily: 'Inter-Light',
                            right: 7
                        }}>Assessments</Text>
                        <Text style={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: 14,
                            fontFamily: 'Inter-Light',
                            right: 12
                        }}>Level</Text>
                    </View>
                    <View style={styles.cont4}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: 14,
                            fontFamily: 'Inter-Bold',
                            left: 5
                        }}>{profiledata?.coursesLength > 0 ? profiledata?.coursesLength : 0}</Text>
                        <Text style={styles.txt2}>{profiledata?.assessmentLength > 0 ? profiledata?.assessmentLength : 0}</Text>
                        <Text style={styles.txt2}>{getAssessLevel(percentage).length > 0 ? getAssessLevel(percentage) : 0}</Text>
                    </View>


                </View>
                <View style={styles.cont5}>
                    <View style={styles.cont9}>
                        <Image style={styles.img3} source={images.settings} />
                        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                            <View style={{ marginLeft: 18, marginTop: 5 }}>
                                <Text style={styles.txt4}>Account Settings</Text>
                                <Text style={styles.txt5}>Change Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                        <Image style={{ height: 20, width: 20, tintColor: Color.background, alignSelf: 'flex-end', marginRight: 16, bottom: 30 }} source={images.next} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cont6}>
                    <View style={styles.cont9}>
                        <Image style={styles.img3} source={images.profile} />
                        <TouchableOpacity onPress={() => navigation.navigate('Personal')}>
                            <View style={{ marginLeft: 18, marginTop: 5 }}>
                                <Text style={styles.txt4}>Personal Information</Text>
                                <Text style={styles.txt5}>Edit Name, Number,DOB</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Personal')}>
                        <Image style={{ height: 20, width: 20, tintColor: Color.background, alignSelf: 'flex-end', marginRight: 16, bottom: 30 }} source={images.next} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cont7}>

                    <View style={styles.cont8}>
                        <TouchableOpacity onPress={() => showConfirmDialog()}>
                            <Text style={styles.txt3}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}


export default MainProfile