import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView, TextInput, ToastAndroid, Pressable } from 'react-native'
import Styles from "./style";
import images from "../../component/images";
import { PieChart } from "react-native-gifted-charts";
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { DrawerActions, useNavigation, useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { Modalize } from 'react-native-modalize';
import Modal from "react-native-modal";
import Lottie from 'lottie-react-native';
import { COLORS } from "../../component/GlobalStyle";
import DashSkeleton from "../Skeleton/SkeletonDash";
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Color from "../../Theme/Color";
import UserAvatar from 'react-native-user-avatar';



const DashBoard = ({ }) => {
    SystemNavigationBar.setNavigationColor(Color.background);
    const [userdetail, setDetail] = useState('')
    const [courseData, setCourseData] = useState([])
    const [assessment, setAssessmentData] = useState([]);
    const [profiledata, setProfileData] = useState('')
    const isFocused = useIsFocused();
    const [skillData, setSkillData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true);
    const [getallNoti, setGetAllNoti] = useState([])

    ///////// MODAL TO UPDATE PASS ////////////

    useEffect(() => {
        if (profiledata?.passwordChanged === true) {
            setModalVisible(false)

        }
        if (profiledata?.passwordChanged === false) {
            setModalVisible(true)
        }


    }, [profiledata?.passwordChanged])

    const openEyeIcon = require('../../assets/eye.png'); // Replace with actual image path
    const closeEyeIcon = require('../../assets/eyeclosed.png'); // Replace with actual image pat

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!isConfirmPasswordVisible);
    };



    ///////// FOCUSED //////////////

    useEffect(() => {
        getCourse()
        getAssessment()
        getLearnerDetail()
        getSkills()
        getNotification()
    }, [isFocused])




    /////// GET ALL COURSES DETAILS /////////

    const getCourse = async () => {
        try {
            const resp = await axios.get(`/course/getAllAssignedCourseForLearner/${userdetail}`)
            // console.log('response from all courses', resp?.data?.data);
            setCourseData(resp?.data?.data)
        } catch (error) {
            // console.log('error from get courses', error?.response?.data?.message);

        }
    }
    useEffect(() => {
        if (userdetail) {
            getCourse()
        }
    }, [userdetail])

    ////// GET USER DETAILS //////

    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            setDetail(data)
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    //////// FLATLIST TO GET COURSES ///////////


    const renderCourses = ({ item }) => {
        const truncatedAssessmentName = truncateText(item?.courseName, 10)
        const timestamp1 = item?.expiredOn;
        const Edate = moment(timestamp1).format('DD/MM/YYYY');
        const currentDate = moment().format('DD/MM/YYYY');
        const isExpired = moment(currentDate, 'DD/MM/YYYY').startOf('day').isAfter(moment(Edate, 'DD/MM/YYYY').startOf('day'));

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Learn', { item: item, userdetail: userdetail })}>
                <View style={{ width: 156, margin: 10, marginLeft: 18, borderRadius: 8, borderWidth: 1, borderColor: '#DDDDDD', }}>
                    <ImageBackground resizeMode="stretch" borderRadius={8} source={{ uri: item?.coursePicture }} style={{ height: 140, borderColor: '#DDDDDD', overflow: 'hidden' }}>
                        {isExpired !== true ?
                            <View style={{ borderWidth: 1, height: 27, width: '45%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: '#FF6905', borderColor: 'orange' }}>
                                <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', top: 2 }}>Ongoing</Text>
                            </View>
                            :
                            <View style={{ borderWidth: 1, height: 27, width: '57%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: 'green', borderColor: 'green' }}>
                                <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', top: 2 }}>Completed</Text>
                            </View>
                        }
                    </ImageBackground>
                    <View style={{ bottom: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 16, marginTop: 12, marginLeft: 8 }}>{truncatedAssessmentName}</Text>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Light', fontSize: 14, marginLeft: 8 }}>{item?.subfolderLength} {item?.subfolderLength === 1 ? 'Chapter' : 'Chapters'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }



    const pieData = [
        {
            value: 47,
            color: '#9056F9',
            gradientCenterColor: '#9056F9',
            focused: true,
        },
    ];
    const pieData1 = [
        {
            value: 47,
            color: '#2196F3',
            gradientCenterColor: '#2196F3',
            focused: true,
        },
    ];
    const pieData2 = [
        {
            value: 47,
            color: '#34A853',
            gradientCenterColor: '#34A853',
            focused: true,
        },
    ];
    const pieData3 = [
        {
            value: 47,
            color: '#FFC107',
            gradientCenterColor: '#FFC107',
            focused: true,
        },
    ];


    ///////// GET ALL ASSESSMENT RESULT //////////

    const calculatePercentageAssess = (obtainedMarks, totalMarks) => {
        return (obtainedMarks / totalMarks) * 100;
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
            return 'N/A';
        }
    };

    const getAssessment = async () => {
        setLoading(true);
        try {
            const resp = await axios.get(`/assessment/getAssessmentByLearner/${userdetail}`);
            // console.log('assessmentss>>>>>>>>>>>>>>>>????', resp.data.data.rubricsQts);
            setAssessmentData(resp?.data?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // console.log('error from get assessments', error?.response?.data);
        }
    };

    useEffect(() => {
        if (userdetail) {
            getAssessment()
        }
    }, [userdetail])

    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }

        return text.slice(0, limit) + '...';
    };

    const renderAssess = ({ item }) => {

        const percentage = calculatePercentageAssess(item.totalObtainMarks, item.totalMarks);
        const truncatedAssessmentName = truncateText(item?.assessmentName, 10)

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Vocabulary', { item: item?._id, percentage: percentage, level: getAssessLevel(percentage), userdetail: userdetail })}>
                <View style={{ width: 156, margin: 10, height: 200, marginLeft: 18, borderRadius: 8, borderWidth: 1, borderColor: '#DDDDDD', }}>
                    <ImageBackground resizeMode="stretch" borderRadius={8} source={images.assess} style={{ height: 140, bottom: 6, overflow: 'hidden' }}>
                        {item?.status !== true ?
                            <View style={{ borderWidth: 1, height: 27, width: '45%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: '#FF6905', borderColor: 'orange' }}>
                                <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', top: 2 }}>Ongoing</Text>
                            </View>
                            :
                            <View style={{ borderWidth: 1, height: 27, width: '57%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: 'green', borderColor: 'green' }}>
                                <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', top: 2 }}>Completed</Text>
                            </View>
                        }
                    </ImageBackground>
                    <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 16, marginTop: 12, marginLeft: 8, bottom: 5 }}>{truncatedAssessmentName}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: 2 }}>

                        {item?.totalMarks && item?.totalObtainMarks !== typeof Number ?
                            <Text style={{ fontSize: 14, color: 'black', marginLeft: 8, fontFamily: 'Inter-Light', }}>{getAssessLevel(percentage)}</Text>
                            :
                            null
                        }

                        {item?.totalMarks && item?.totalObtainMarks !== typeof Number ?
                            <Text style={{ color: 'black', marginRight: 8, fontFamily: 'Inter-Light' }}>{percentage.toFixed(0)}%</Text>
                            :
                            null
                        }

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    ///////////// GET USER PROFILE DETAIL /////////////////

    const getLearnerDetail = async () => {
        try {
            const resp = await axios.get(`/learner/getSingleLearner/${userdetail}`)
            // console.log('user detail of learner', resp?.data?.data.passwordChanged);
            setProfileData(resp?.data?.data)

        } catch (error) {
            // console.log('error from deail learner', error);

        }
    }

    useEffect(() => {
        if (userdetail) {
            getLearnerDetail()
            getSkills()
        }
    }, [userdetail])

    //////////// SKILLS API ///////////////////

    const getSkills = async () => {
        try {
            const resp = await axios.get(`/skill/getSkillReportByLearner/${userdetail}`)
            // console.log('response from skill api', resp?.data?.data);
            setSkillData(resp?.data?.data)
        } catch (error) {
            // console.log('error from skills api', error.response.data.message);
        }
    }


    const calculateTotalPercentage = () => {
        let totalObtainMarksSum = 0;
        let maxMarksSum = 0;

        skillData.forEach((skill) => {
            totalObtainMarksSum += skill.totalObtainMarks;
            maxMarksSum += skill.maxMarks;
        });

        const totalPercentage = (totalObtainMarksSum / maxMarksSum) * 100;
        return totalPercentage.toFixed(0); // Rounded to 2 decimal places
    };

    const getLevel = (percentage) => {
        if (percentage >= 0 && percentage < 25) {
            return 'Level 1';
        } else if (percentage >= 25 && percentage < 50) {
            return 'Level 2';
        } else if (percentage >= 50 && percentage < 75) {
            return 'Level 3';
        } else if (percentage >= 75 && percentage <= 100) {
            return 'Level 4';
        } else {
            return 'Unknown Level';
        }
    };
    const calculatePercentage = (totalObtainMarks, maxMarks) => {
        const percentage = (totalObtainMarks / maxMarks) * 100;
        return percentage.toFixed(2);
    };


    const totalPercentage = calculateTotalPercentage();

    const skillRender = ({ item }) => {

        const percentage = calculatePercentage(item.totalObtainMarks, item.maxMarks) / 100;
        const truncatedAssessmentName = truncateText(item?._id?.SkillName, 10)
        const AllLevel = getLevel(calculatePercentage(item.totalObtainMarks, item.maxMarks))
        return (
            <View>
                <View style={Styles.txtCont}>
                    <Text style={Styles.txt5}>{truncatedAssessmentName}</Text>
                    <Text style={{ color: 'black', fontSize: 12, marginTop: 2 }}>{getLevel(calculatePercentage(item.totalObtainMarks, item.maxMarks))}</Text>
                </View>
                <View>
                    {AllLevel === 'Level 4' ?
                        <Progress.Bar progress={100} width={140} height={11} color='#9056F9' style={{ marginRight: 16, marginTop: 3, borderRadius: 15 }} />
                        :
                        AllLevel === 'Level 3' ?
                            <Progress.Bar progress={percentage} width={140} height={11} color='#2196F3' style={{ marginRight: 16, marginTop: 3, borderRadius: 15 }} />
                            :
                            AllLevel === 'Level 2' ?
                                <Progress.Bar progress={percentage} width={140} height={11} color='#34A853' style={{ marginRight: 16, marginTop: 3, borderRadius: 15 }} />
                                :
                                <Progress.Bar progress={percentage} width={140} height={11} color='#FFC107' style={{ marginRight: 16, marginTop: 3, borderRadius: 15 }} />
                    }
                    {/* <Progress.Bar progress={percentage} width={140} height={11} color='#2196F3' style={{ marginRight: 16, marginTop: 3, borderRadius: 15 }} /> */}
                </View>
            </View>
        )
    }

    const getTotal = getLevel(totalPercentage)


    const changePass = async () => {
        let body = {
            newPassword: password
        }
        // console.log('body of change pass', body);
        try {
            const resp = await axios.patch('/learner/changePasswordWithoutOldPassword', body)
            // console.log('RESPONSE FROM CHANGE PASS', resp?.data);
            if (resp?.data?.status === 200) {
                setModalVisible(false)
            }
            setModalVisible1(!modalVisible1)
        } catch (error) {
            console.log('ERROR FROM CHANGE PASS', error?.response?.data?.message);

        }
    }

    const validatepassword = () => {
        let errorFlag = false
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        const isNonWhiteSpace = /^\S*$/;
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        const isValidLength = /^.{8,16}$/;
        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (password.length == 0) {
            errorFlag = true;
            ToastAndroid.show("Password is required feild", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        } else if (password.length < 8 || confirmpass.length > 20) {
            errorFlag = true;
            ToastAndroid.show("Password should be min 8 char and max 20 char", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        }
        else if (!isContainsNumber.test(password)) {
            errorFlag = true;
            ToastAndroid.show("Password must contain at least one Digit.", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        }
        else if (!isNonWhiteSpace.test(password)) {
            errorFlag = true;
            ToastAndroid.show("Password must not contain Whitespaces", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        }
        else if (!isContainsUppercase.test(password)) {
            errorFlag = true;
            ToastAndroid.show("Password must have at least one Uppercase Character.", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        }
        else if (!isContainsLowercase.test(password)) {
            errorFlag = true;
            ToastAndroid.show("Password must have at least one Lowercase Character.", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        }
        else if (!isValidLength.test(password)) {
            errorFlag = true;
            ToastAndroid.show("Password must be 8-16 Characters Long.", ToastAndroid.LONG, ToastAndroid.CENTER)
            // Alert.alert('Password must have at least one Lowercase Character.');
            return;
        }
        else if (!isContainsSymbol.test(password)) {
            errorFlag = true;
            ToastAndroid.show("Password must contain at least one Special Symbol", ToastAndroid.LONG, ToastAndroid.CENTER)
            // Alert.alert('Password must have at least one Lowercase Character.');
            return;
        }
        else if (password !== confirmpass) {
            errorFlag = true;
            // notifyMessage("Password Should be Same");
            ToastAndroid.show("Password Should be Same", ToastAndroid.LONG, ToastAndroid.CENTER)
            return;
        }
        changePass();
        // if (errorFlag) {
        //     Alert.alert('Check your Passwords');
        // }
        // else {
        //     UpdateEmailPass();
        //     }
    }
    const filteredSkillData = skillData.slice(0, 3); // Select the first 3 items


    //////// GET COUNT OF NOTIFICATION ////////////

    const getNotification = async () => {
        try {
            const resp = await axios.get('/notification/getAllNotification?seaAll=false')
            // console.log('Get All Notification>>', resp?.data.data);
            setGetAllNoti(resp?.data?.count)

        } catch (error) {
            console.log('error from all Notification', error?.response?.data?.message);

        }
    }

    useEffect(() => {
        getNotification()
    }, [skillData])


    return (
        <View style={Styles.main}>
            <View style={Styles.cont}>
                <View style={Styles.cont1}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer)} >
                        <Image style={Styles.img} source={images.menu} />
                    </TouchableOpacity>
                    <Image style={{ alignSelf: 'center', bottom: 10, left: 3 }} source={images.header11} />
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Image style={{ height: 25, width: 25 }} source={images.bell} />
                        {getallNoti > 0 && (
                            <View style={[Styles.notificationBadge, { width: getallNoti > 10 ? 29 : null }]}>
                                <Text style={Styles.notificationText}>
                                    {getallNoti > 10 ? '10+' : getallNoti}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                </View>
            </View>

            {loading === true ?
                <DashSkeleton />
                :
                <ScrollView>
                    <View style={Styles.cont2}>
                        <View style={Styles.cont3}>
                            {profiledata?.learnerImg === undefined ?
                                <UserAvatar style={Styles.avatar} bgColor={'white'} textColor={'black'} size={100} name={profiledata?.fullName} />
                                :
                                <Image style={Styles.avatar} source={{ uri: profiledata?.learnerImg }} />
                            }
                            <View style={Styles.cont4}>
                                <Text style={Styles.txt}>{profiledata?.firstName} {profiledata?.middleName} {profiledata?.surName}</Text>
                                <Text style={Styles.txt1}>{profiledata?.schoolUid}</Text>
                                <Text style={Styles.txt1}>{profiledata?.gradeUid}</Text>
                                <Text style={Styles.txt1}>{profiledata?.gradeName}</Text>
                                <Text style={Styles.txt1}>{profiledata?.schoolName}</Text>
                            </View>
                        </View>
                    </View>
                    {getTotal === 'Level 4' ?
                        <View style={Styles.cont5}>
                            <View style={Styles.cont6}>
                                <Text style={Styles.txt2}>Skills</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('AllSkills')}>
                                    <Text style={Styles.txt3}>See all</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={Styles.cont7}>
                                <PieChart
                                    data={pieData}
                                    donut
                                    showGradient
                                    sectionAutoFocus
                                    radius={70}
                                    innerRadius={52}
                                    backgroundColor="#D6BFFF"
                                    centerLabelComponent={() => {
                                        return (
                                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                    {calculateTotalPercentage()}%
                                                </Text>
                                                <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                            </View>
                                        );
                                    }}
                                />
                                <View>
                                    <FlatList
                                        data={filteredSkillData}
                                        renderItem={skillRender}
                                    />
                                </View>
                            </View>
                        </View>
                        :
                        getTotal === 'Level 3' ?
                            <View style={Styles.cont12}>
                                <View style={Styles.cont6}>
                                    <Text style={Styles.txt2}>Skills</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('AllSkills')}>
                                        <Text style={Styles.txt3}>See all</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={Styles.cont7}>
                                    <PieChart
                                        data={pieData1}
                                        donut
                                        showGradient
                                        sectionAutoFocus
                                        radius={70}
                                        backgroundColor="rgba(199,229,253,255)"
                                        innerRadius={52}
                                        centerLabelComponent={() => {
                                            return (
                                                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                        {calculateTotalPercentage()}%
                                                    </Text>
                                                    <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                                </View>
                                            );
                                        }}
                                    />
                                    <View>
                                        <FlatList
                                            data={filteredSkillData}
                                            renderItem={skillRender}
                                        />
                                    </View>
                                </View>
                            </View>
                            :
                            getTotal === 'Level 2' ?
                                <View style={Styles.cont13}>
                                    <View style={Styles.cont6}>
                                        <Text style={Styles.txt2}>Skills</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('AllSkills')}>
                                            <Text style={Styles.txt3}>See all</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View style={Styles.cont7}>
                                        <PieChart
                                            data={pieData2}
                                            donut
                                            showGradient
                                            sectionAutoFocus
                                            radius={70}
                                            backgroundColor="rgba(209,235,211,255)"
                                            innerRadius={52}
                                            centerLabelComponent={() => {
                                                return (
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                        <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                            {calculateTotalPercentage()}%
                                                        </Text>
                                                        <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                                    </View>
                                                );
                                            }}
                                        />
                                        <View>
                                            <FlatList
                                                data={filteredSkillData}
                                                renderItem={skillRender}
                                            />
                                        </View>
                                    </View>
                                </View>
                                :

                                getTotal === 'Level 1' ?
                                    <View style={Styles.cont14}>
                                        <View style={Styles.cont6}>
                                            <Text style={Styles.txt2}>Skills</Text>
                                            <TouchableOpacity onPress={() => navigation.navigate('AllSkills')}>
                                                <Text style={Styles.txt3}>See all</Text>
                                            </TouchableOpacity>

                                        </View>
                                        <View style={Styles.cont7}>
                                            <PieChart
                                                data={pieData3}
                                                donut
                                                showGradient
                                                sectionAutoFocus
                                                radius={70}
                                                backgroundColor="rgba(255,239,193,255)"
                                                innerRadius={52}
                                                centerLabelComponent={() => {
                                                    return (
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                                {calculateTotalPercentage()}%
                                                            </Text>
                                                            <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                                        </View>
                                                    );
                                                }}
                                            />
                                            <View>
                                                <FlatList
                                                    data={filteredSkillData}
                                                    renderItem={skillRender}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    null

                    }



                    <View style={Styles.cont9}>
                        <Text style={Styles.txt6}>Courses</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
                            <Text style={Styles.txt7}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    {courseData?.length > 0 ?
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={courseData}
                                renderItem={renderCourses}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={Styles.flatListContent}
                            />
                        </View>
                        :
                        <View style={{}}>
                            <Image style={{ alignSelf: 'center', top: 10 }} source={require('../../assets/course.png')} />
                            <View style={Styles.cont11}>
                                <Text style={Styles.txt9}>No Course is Assigned Yet</Text>
                            </View>
                        </View>
                    }

                    <View style={Styles.cont9}>
                        <Text style={Styles.txt6}>Assessments</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Results')}>
                            <Text style={Styles.txt7}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    {assessment?.length > 0 ?
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={assessment}
                                renderItem={renderAssess}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={Styles.flatListContent}
                            />
                        </View>
                        :
                        <View style={{ marginBottom: 20 }}>
                            <Image style={{ alignSelf: 'center', top: 10 }} source={require('../../assets/assign.png')} />
                            <View style={Styles.cont11}>
                                <Text style={Styles.txt9}>No Assessment is Assigned Yet</Text>
                            </View>
                        </View>
                    }

                    <Modal isVisible={modalVisible}>
                        <View style={Styles.cont15}>
                            <Text style={Styles.mtxt}>Change Your Password</Text>
                            <Image style={Styles.imgl} source={images.logopass} />
                            <View style={{ marginTop: 20 }}>
                                <Text style={Styles.txt10}>New Password</Text>
                                <View style={Styles.inputContainer}>
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        placeholder="Enter New Password"
                                        placeholderTextColor={'#CCCCCC'}
                                        secureTextEntry={!isPasswordVisible}
                                        style={Styles.input}
                                    />
                                    <TouchableOpacity onPress={togglePasswordVisibility}>
                                        <Image
                                            source={isPasswordVisible ? openEyeIcon : closeEyeIcon}
                                            style={Styles.eyeIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={Styles.txt10}>Confirm Password</Text>
                                <View style={Styles.inputContainer}>
                                    <TextInput
                                        value={confirmpass}
                                        onChangeText={setConfirmPassword}
                                        placeholder="Confirm Password"
                                        placeholderTextColor={'#CCCCCC'}
                                        secureTextEntry={!isConfirmPasswordVisible}
                                        style={Styles.input}
                                    />
                                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                                        <Image
                                            source={isConfirmPasswordVisible ? openEyeIcon : closeEyeIcon}
                                            style={Styles.eyeIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => validatepassword()}>
                                <View style={Styles.cont16}>
                                    <Text style={Styles.txt11}>UPDATE</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        hasBackdrop={true}
                        backdropOpacity={0.8}
                        isVisible={modalVisible1}
                    >
                        <View>
                            <View>

                                <Lottie source={require('../../assets/lottie.json')} autoPlay loop style={{ bottom: 20, alignSelf: 'center', height: 140, width: 140 }} />
                                <View style={{ bottom: 30 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white', textAlign: 'center' }}>Password Updated</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 32, color: '#76B33F', textAlign: 'center' }}>Successfully</Text>
                                </View>

                                <Pressable

                                    onPress={() => setModalVisible1(!modalVisible1)}
                                >
                                    <TouchableOpacity onPress={() => setModalVisible1(false)}>
                                        <View style={{ height: 40, borderRadius: 8, backgroundColor: COLORS.buttonBack }}>
                                            <Text style={Styles.textStyle}>Back To DashBoard</Text>
                                        </View>
                                    </TouchableOpacity>

                                </Pressable>

                            </View>
                        </View>
                    </Modal>
                </ScrollView>}


        </View>
    )
}


export default DashBoard