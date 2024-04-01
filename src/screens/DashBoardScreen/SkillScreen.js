import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView, StyleSheet } from 'react-native'
import Styles from "./style";
import images from "../../component/images";
import { PieChart } from "react-native-gifted-charts";
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { DrawerActions, useNavigation, useIsFocused } from '@react-navigation/native';
import { COLORS } from "../../component/GlobalStyle";
import DashSkeleton from "../Skeleton/SkeletonDash";
import Color from "../../Theme/Color";

const SkillScreens = ({ navigation }) => {


    const [skillData, setSkillData] = useState([])
    const [userdetail, setDetail] = useState('')
    const [loading, setLoading] = useState(true)


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

    const getSkills = async () => {
        setLoading(true)
        try {
            const resp = await axios.get(`/skill/getSkillReportByLearner/${userdetail}`)
            console.log('response from skill api', resp?.data?.data);
            setSkillData(resp?.data?.data)
            setLoading(false)

        } catch (error) {
            console.log('error from skills api', error.response.data.message);
            setLoading(false)

        }
    }

    useEffect(() => {
        if (userdetail) {
            getSkills()
        }
    }, [userdetail])

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

    const calculateTotalPercentage = () => {
        let totalObtainMarksSum = 0;
        let maxMarksSum = 0;

        skillData.forEach((skill) => {
            totalObtainMarksSum += skill.totalObtainMarks;
            maxMarksSum += skill.maxMarks;
        });

        const totalPercentage = (totalObtainMarksSum / maxMarksSum) * 100;
        return totalPercentage.toFixed(2); // Rounded to 2 decimal places
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
    const getTotal = getLevel(totalPercentage)

    const calculatePercentageAssess = (totalObtainMarks, maxMarks) => {
        return (totalObtainMarks / maxMarks) * 100;
    };


    const skillRender = ({ item }) => {
        const percentage = calculatePercentageAssess(item.totalObtainMarks, item.maxMarks)
        return (
            <View style={[style.cont13, { backgroundColor: getLevel(percentage) === 'Level 4' ? '#D6BFFF' : getLevel(percentage) === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : getLevel(percentage) === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)', borderColor: getLevel(percentage) === 'Level 4' ? '#D6BFFF' : getLevel(percentage) === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : getLevel(percentage) === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)' }]}>
                <View style={style.cont14}>
                    <Text style={style.txt13}>{item?._id?.SkillName}</Text>
                    <View style={[style.cont15, { backgroundColor: getLevel(percentage) === 'Level 4' ? '#9056F9' : getLevel(percentage) === 'Level 3' ? '#2196F3' : getLevel(percentage) === 'Level 2' ? '#34A853' : '#FFC107', borderColor: getLevel(percentage) === 'Level 4' ? '#9056F9' : getLevel(percentage) === 'Level 3' ? '#2196F3' : getLevel(percentage) === 'Level 2' ? '#34A853' : '#FFC107' }]}>
                        <Text style={style.txt12}>{getLevel(percentage) === 'Level 4' ? 'Advanced' : getLevel(percentage) === 'Level 3' ? 'Proficient' : getLevel(percentage) === 'Level 2' ? 'Progressing' : 'Beginner'}</Text>
                    </View>
                </View>
                <View style={style.cont16}>
                    <Text style={style.txt14}>{getLevel(percentage)}</Text>
                    <Text style={style.txt14}>{item?.totalObtainMarks}/{item?.maxMarks}</Text>
                    <Text style={style.txt14}>{percentage.toFixed(0)}%</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={style.main}>
            <View style={style.container}>
                <View style={style.cont}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={style.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={style.txt}> Skill Levels</Text>
                </View>
            </View>

            {loading === true ?
                <DashSkeleton />
                :
                <View>
                    {getTotal === 'Level 4' ?
                        <View style={style.cont1}>
                            <Text style={style.txt1}>Skills Overview</Text>
                            <View style={{ alignSelf: 'center', marginTop: 8 }}>
                                <PieChart
                                    data={pieData}
                                    donut
                                    showGradient
                                    sectionAutoFocus
                                    radius={70}
                                    backgroundColor="#D6BFFF"
                                    innerRadius={52}
                                    centerLabelComponent={() => {
                                        return (
                                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                    {skillData[0]?.totalObtainMarks}/{skillData[0]?.maxMarks}
                                                </Text>
                                                <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>

                        </View>
                        :
                        getTotal === 'Level 3' ?
                            <View style={style.lvl3}>
                                <Text style={style.txt1}>Skills Overview</Text>
                                <View style={{ alignSelf: 'center', marginTop: 8 }}>
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
                                                        {skillData[0]?.totalObtainMarks}/{skillData[0]?.maxMarks}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                                </View>
                                            );
                                        }}
                                    />
                                </View>

                            </View>
                            :
                            getTotal === 'Level 2' ?
                                <View style={style.lvl2}>
                                    <Text style={style.txt1}>Skills Overview</Text>
                                    <View style={{ alignSelf: 'center', marginTop: 8 }}>
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
                                                            {skillData[0]?.totalObtainMarks}/{skillData[0]?.maxMarks}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                                    </View>
                                                );
                                            }}
                                        />
                                    </View>

                                </View>
                                :
                                getTotal === 'Level 1' ?
                                    <View style={style.lvl1}>
                                        <Text style={style.txt1}>Skills Overview</Text>
                                        <View style={{ alignSelf: 'center', marginTop: 8 }}>
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
                                                                {skillData[0]?.totalObtainMarks}/{skillData[0]?.maxMarks}
                                                            </Text>
                                                            <Text style={{ fontSize: 14, color: 'black' }}>{getLevel(totalPercentage)}</Text>
                                                        </View>
                                                    );
                                                }}
                                            />
                                        </View>

                                    </View>
                                    :
                                    null
                    }


                    <View>
                        {skillData?.length > 0 ?
                            <FlatList
                                data={skillData}
                                renderItem={skillRender}
                            />
                            :
                            <View style={{ borderWidth: 1, backgroundColor: '#f7f8fd', height: 250, width: '90%', alignSelf: 'center', marginTop: 24, borderColor: '#f7f8fd', borderRadius: 5 }}>
                                <Image style={{ alignSelf: 'center', marginTop: 12 }} source={require('../../assets/noskills.png')} />
                                <View style={{
                                    // flex: 1,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    height: 40,
                                    width: '90%',
                                    alignSelf: 'center',
                                    // borderRadius: 5,
                                    // backgroundColor: 'white',
                                    borderColor: '#DDDDDD',
                                    // elevation: 4,
                                    marginTop: 12

                                }}>

                                    <Text style={{
                                        color: 'black',
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontFamily: 'Inter-Bold'
                                    }}>No Skills has been assessed yet!</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            }

        </View>
    )
}

export default SkillScreens;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        borderWidth: 1,
        height: 72,
        width: '100%',
        backgroundColor: Color.background,
        borderColor: Color.background,
        elevation: 4
    },
    cont: {
        flexDirection: 'row',
        marginLeft: 16,
        marginTop: 20

    },
    img: {
        height: 25,
        width: 25
    },
    txt: {
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        marginLeft: 16,
    },
    cont1: {
        borderWidth: 1,
        height: 195,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: '#D6BFFF',
        borderColor: '#D6BFFF',
        // elevation:2

    },
    txt1: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 8
    },
    cont13: {
        height: 80,
        width: '90%',
        borderWidth: 1,
        alignSelf: 'center',
        backgroundColor: 'rgba(52, 168, 83, 0.25)',
        borderColor: 'rgba(52, 168, 83, 0.25)',
        borderRadius: 8,
        marginTop: 20,
        // elevation: 2

    },
    cont14: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 16,
        marginLeft: 16,
        marginTop: 10
    },
    cont15: {
        borderWidth: 1,
        height: 30,
        width: '33%',
        backgroundColor: '#FFC107',
        borderColor: '#FFC107',
        borderRadius: 8

    },
    txt12: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        textAlign: 'center',
        top: 3
    },
    txt13: {
        color: '#49454F',
        fontFamily: 'Inter-Bold'
    },
    cont16: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 18,
        marginLeft: 18,
        marginTop: 10
    },
    txt14: {
        color: '#1C1C1C',
        fontFamily: 'Inter-SemiBold',

    },
    lvl3: {
        borderWidth: 1,
        height: 195,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'rgba(33, 150, 243, 0.25)',
        backgroundColor: 'rgba(33, 150, 243, 0.25)'
        // elevation:2

    },
    lvl2: {
        borderWidth: 1,
        height: 195,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'rgba(209,235,211,255)',
        backgroundColor: 'rgba(209,235,211,255)'
        // elevation:2

    },
    lvl1: {
        borderWidth: 1,
        height: 195,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'rgba(255, 193, 7, 0.25)',
        backgroundColor: 'rgba(255, 193, 7, 0.25)'
        // elevation:2

    },

})