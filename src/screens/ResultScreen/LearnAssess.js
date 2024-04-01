import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import images from "../../component/images";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from "../../component/GlobalStyle";
import { PieChart } from "react-native-gifted-charts";
import moment from 'moment';
import Color from "../../Theme/Color";




const LearnVocabulary = ({ navigation, route }) => {

    const [selectedSwitch, setSelectedSwitch] = useState("overview");
    const [getallAssess, setGetAllAssess] = useState([])
    const [userdetail, setDetail] = useState('');
    const { item, } = route.params
    const [assessData, setAssessData] = useState([])
    const [rubricdata, setRubricData] = useState([])

    const switchOptions = [
        { label: "Overview", value: "overview" },
        { label: "Result", value: "result" },
    ];

    const handleSwitchChange = (value) => {
        setSelectedSwitch(value);
    };


    const pieData = [
        {
            value: 20,
            color: '#9056F9',
            gradientCenterColor: '#9056F9',
            focused: true,
        },

    ];

    const pieData1 = [
        {
            value: 20,
            color: '#2196F3',
            gradientCenterColor: '#2196F3',
            focused: true,
        },

    ];

    const pieData2 = [
        {
            value: 20,
            color: '#34A853',
            gradientCenterColor: '#34A853',
            focused: true,
        },

    ];

    const pieData3 = [
        {
            value: 20,
            color: '#FFC107',
            gradientCenterColor: '#FFC107',
            focused: true,
        },

    ];

    const timestamp = getallAssess[0]?.assignedOn;
    const date = moment(timestamp).format('DD/MM/YYYY ');

    const timestamp1 = getallAssess[0]?.completedOn;
    const dateComplete = moment(timestamp1).format('DD/MM/YYYY')
    const truncateText = (text, limit) => {
        if (text?.length <= limit) {
            return text;
        }

        return text?.slice(0, limit) + '...';
    };

    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
            console.log('dataaaaaa', data);
            setDetail(data);
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const renderItems = () => {
        if (selectedSwitch === 'overview') {
            return (
                <View>
                    <ScrollView>
                        {getallAssess[0]?.status === true ?
                            <View style={[styles.cont2, { backgroundColor: allLevel === 'Level 4' ? '#D6BFFF' : allLevel === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : allLevel === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)', borderColor: allLevel === 'Level 4' ? '#D6BFFF' : allLevel === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : allLevel === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)' }]}>
                                <Text style={styles.txt1}>{truncatedAssessmentName1}</Text>

                                <View style={[styles.cont3, { backgroundColor: allLevel === 'Level 4' ? '#9056F9' : allLevel === 'Level 3' ? '#2196F3' : allLevel === 'Level 2' ? '#34A853' : '#FFC107', borderColor: allLevel === 'Level 4' ? '#9056F9' : allLevel === 'Level 3' ? '#2196F3' : allLevel === 'Level 2' ? '#34A853' : '#FFC107' }]}>
                                    <Text style={styles.txt2}>{allLevel === 'Level 4' ? 'Advanced' : allLevel === 'Level 3' ? 'Proficient' : allLevel === 'Level 2' ? 'Progressing' : 'Beginner'}</Text>
                                </View>
                                <View style={styles.cont4}>
                                    <View style={styles.cont5}>
                                        <Text style={styles.txt3}>Score       : <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>        {getallAssess[0]?.totalObtainMarks}/{getallAssess[0]?.totalMarks}</Text></Text>
                                        <Text style={styles.txt3}>Percentage  :   <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>{percentage1?.toFixed(0)}%</Text></Text>
                                        <Text style={styles.txt3}>Level       :          <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>{allLevel}</Text></Text>

                                    </View>
                                    <View style={{ bottom: 50 }}>
                                        <PieChart
                                            data={allLevel === 'Level 4' ? pieData : allLevel === 'Level 3' ? pieData1 : allLevel === 'Level 2' ? pieData2 : pieData3}
                                            donut
                                            showGradient
                                            sectionAutoFocus
                                            radius={70}
                                            innerRadius={52}
                                            innerCircleColor={allLevel === 'Level 4' ? '#D6BFFF' : allLevel === 'Level 3' ? 'rgba(199,229,253,255)' : allLevel === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)'}
                                            centerLabelComponent={() => {
                                                return (
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                        <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                            {percentage1?.toFixed(0)}%
                                                        </Text>
                                                        <Text style={{ fontSize: 14, color: 'black' }}>{allLevel}</Text>
                                                    </View>
                                                );
                                            }}
                                        />
                                    </View>


                                </View>

                            </View>
                            :
                            null
                        }
                        {getallAssess[0]?.status === true ?
                            <View style={styles.line} />
                            :
                            null
                        }

                        <View style={styles.cont6}>
                            <Text style={styles.txt4}>{truncatedAssessmentName1}</Text>
                            <View style={[styles.cont7, { backgroundColor: getallAssess[0]?.status !== true ? '#FF6905' : '#34A853', borderColor: getallAssess[0]?.status !== true ? '#FF6905' : '#34A853' }]}>
                                <Text style={styles.txt5}>{getallAssess[0]?.status === true ? 'Completed' : 'Ongoing'}</Text>
                            </View>
                        </View>
                        <View style={styles.cont8}>
                            <Text style={styles.txt6}>Marks :  <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 14 }}>{getallAssess[0]?.status === true ? getallAssess[0]?.totalObtainMarks : 0}</Text></Text>
                            <Text style={styles.txt6}>Assigned Date :  <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Inter-Bold' }}>{date}</Text></Text>
                        </View>
                        {getallAssess[0]?.status === true ?
                            <View style={styles.cont9}>
                                <Text style={styles.txt7}>Completed on : {dateComplete}</Text>
                            </View>
                            :
                            null
                        }
                        <View>
                            <TextInput
                                placeholder="Assignment Description !!"
                                placeholderTextColor={'#DDDDDD'}
                                style={styles.input}
                                editable={false}
                                value={getallAssess[0]?.about}
                            />
                        </View>

                        <View style={{ marginBottom: 150 }}>
                            <Text style={styles.txt8} >Skills Which were assessed</Text>
                            <View style={styles.cont10}>
                                <Text style={styles.txt9}>Skills               :  {getallAssess[0]?.skillName}</Text>
                                <Text style={styles.txt9}>Sub-Skills     :  {getallAssess[0]?.subSkillName}</Text>
                                <Text style={styles.txt9}>Rubrics          :  {getallAssess[0]?.rubricsQtsLength}</Text>
                                <Text style={styles.txt9}>Total Score   :  {getallAssess[0]?.quesMarks}</Text>
                            </View>
                        </View>

                    </ScrollView>


                </View>

            )
        } else if (selectedSwitch === 'result') {
            return (
                <View style={{}}>
                    <ScrollView>
                        {getallAssess[0]?.status === true ?
                            <View style={[styles.cont2, { backgroundColor: allLevel === 'Level 4' ? '#D6BFFF' : allLevel === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : allLevel === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)', borderColor: allLevel === 'Level 4' ? '#D6BFFF' : allLevel === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : allLevel === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)' }]}>
                                <Text style={styles.txt1}>{getallAssess[0]?.assessmentName}</Text>
                                <View style={[styles.cont3, { backgroundColor: allLevel === 'Level 4' ? '#9056F9' : allLevel === 'Level 3' ? '#2196F3' : allLevel === 'Level 2' ? '#34A853' : '#FFC107', borderColor: allLevel === 'Level 4' ? '#9056F9' : allLevel === 'Level 3' ? '#2196F3' : allLevel === 'Level 2' ? '#34A853' : '#FFC107' }]}>
                                    <Text style={styles.txt2}>{allLevel === 'Level 4' ? 'Advanced' : allLevel === 'Level 3' ? 'Proficient' : allLevel === 'Level 2' ? 'Progressing' : 'Beginner'}</Text>
                                </View>
                                <View style={styles.cont4}>
                                    <View style={styles.cont5}>
                                        <Text style={styles.txt3}>Score       : <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>        {getallAssess[0]?.totalObtainMarks}/{getallAssess[0]?.totalMarks}</Text></Text>
                                        <Text style={styles.txt3}>Percentage  :   <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>{percentage1.toFixed(0)}%</Text></Text>
                                        <Text style={styles.txt3}>Level       :          <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>{allLevel}</Text></Text>

                                    </View>
                                    <View style={{ bottom: 50 }}>
                                        <PieChart
                                            data={allLevel === 'Level 4' ? pieData : allLevel === 'Level 3' ? pieData1 : allLevel === 'Level 2' ? pieData2 : pieData3}
                                            donut
                                            showGradient
                                            sectionAutoFocus
                                            radius={70}
                                            innerRadius={52}
                                            innerCircleColor={allLevel === 'Level 4' ? '#D6BFFF' : allLevel === 'Level 3' ? 'rgba(199,229,253,255)' : allLevel === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)'}
                                            centerLabelComponent={() => {
                                                return (
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                        <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                            {percentage1.toFixed(0)}%
                                                        </Text>
                                                        <Text style={{ fontSize: 14, color: 'black' }}>{allLevel}</Text>
                                                    </View>
                                                );
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            :
                            null
                        }

                        <Text style={styles.txt10}>Detailed Analysis</Text>
                        <View style={styles.cont11}>
                            <View style={styles.cont12}>
                                <Text style={styles.txt11}>Rubrics</Text>
                                <Text style={styles.txt11}>Score</Text>
                            </View>
                        </View>

                        {rubricdata?.length > 0 && getallAssess[0]?.status === true ?
                            <View style={{ marginBottom: 200 }}>

                                <FlatList
                                    data={rubricdata}
                                    renderItem={getRubricData}
                                // ListFooterComponent={<View style={{ marginBottom: 100 }} />}
                                />


                            </View>
                            :
                            <View style={{ borderWidth: 1, backgroundColor: '#f7f8fd', height: 250, width: '90%', alignSelf: 'center', marginTop: 24, borderColor: '#f7f8fd', borderRadius: 5 }}>
                                <Image style={{ alignSelf: 'center', marginTop: 12 }} source={require('../../assets/norubrics.png')} />
                                <View style={{
                                    // flex: 1,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    height: 40,
                                    width: '70%',
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
                                    }}>oops! No rubric found</Text>
                                </View>
                            </View>
                        }
                    </ScrollView>
                </View>
            )
        }
    }


    ////////////////// RUBRIC DATAAA ///////////////////

    const calculatePercentageAssess = (eachObtainMarks, quesMarks) => {
        return (eachObtainMarks / quesMarks) * 100;
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


    const getRubricData = ({ item }) => {
        console.log('rubricsss dataa >>>>>', item);
        const percentage = calculatePercentageAssess(item?.eachObtainMarks, item?.quesMarks);
        return (
            <View style={[styles.cont13, { backgroundColor: getAssessLevel(percentage) === 'Level 4' ? '#D6BFFF' : getAssessLevel(percentage) === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : getAssessLevel(percentage) === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)', borderColor: getAssessLevel(percentage) === 'Level 4' ? '#D6BFFF' : getAssessLevel(percentage) === 'Level 3' ? 'rgba(33, 150, 243, 0.25)' : getAssessLevel(percentage) === 'Level 2' ? 'rgba(209,235,211,255)' : 'rgba(255, 193, 7, 0.25)' }]}>
                <View style={styles.cont14}>
                    <Text style={styles.txt13}>{item?.quesDesc}</Text>
                    <View style={[styles.cont15, { backgroundColor: getAssessLevel(percentage) === 'Level 4' ? '#9056F9' : getAssessLevel(percentage) === 'Level 3' ? '#2196F3' : getAssessLevel(percentage) === 'Level 2' ? '#34A853' : '#FFC107', borderColor: getAssessLevel(percentage) === 'Level 4' ? '#9056F9' : getAssessLevel(percentage) === 'Level 3' ? '#2196F3' : getAssessLevel(percentage) === 'Level 2' ? '#34A853' : '#FFC107' }]}>
                        <Text style={styles.txt12}>{getAssessLevel(percentage) === 'Level 4' ? 'Advanced' : getAssessLevel(percentage) === 'Level 3' ? 'Proficient' : getAssessLevel(percentage) === 'Level 2' ? 'Progressing' : 'Beginner'}</Text>
                    </View>
                </View>
                <View style={styles.cont16}>
                    <Text style={styles.txt14}>{getAssessLevel(percentage)}</Text>
                    <Text style={styles.txt14}>{item?.eachObtainMarks}/{item?.quesMarks}</Text>
                    <Text style={styles.txt14}>{percentage.toFixed(0)}%</Text>
                </View>
            </View>
        )
    }

    const getAssessData = async () => {
        try {
            const resp = await axios.get(`result/getAllResultByLearner/${userdetail}?pagination=true&page=1&limit=10&search=&sortBy=&sortType=&assigned`)
            setAssessData(resp?.data?.data)
            setRubricData(resp?.data?.data[0]?.rubricsQts)
            console.log('dataaaaaa>>>>><>??????', resp?.data?.data[0]?.rubricsQts);
        } catch (error) {
            console.log('error from get assess data', error.response.data.message);
        }
    }

    useEffect(() => {
        if (userdetail) {

            getAssessData()
        }
    }, [userdetail])


    const GetAssessment = async () => {

        try {
            const resp = await axios.get(`/assessment/getAssessmentByAssessmentID/${item}`)
            console.log('response from assessment', resp.data?.data);
            setGetAllAssess(resp?.data?.data)
        } catch (error) {
            console.log('error from assessment', error.response.data.message);

        }
    }
    useEffect(() => {
        GetAssessment()
    }, [item])

    const percentage1 = calculatePercentageAssess(getallAssess[0]?.totalObtainMarks, getallAssess[0]?.totalMarks);
    const truncatedAssessmentName1 = truncateText(getallAssess[0]?.assessmentName, 10)

    const calculatePercentageAssess1 = (totalObtainMarks, totalMarks) => {
        return (totalObtainMarks / totalMarks) * 100;
    };
    const getAllAssessLevel = (percentage1) => {
        if (percentage1 >= 0 && percentage1 <= 25) {
            return 'Level 1';
        } else if (percentage1 > 25 && percentage1 <= 50) {
            return 'Level 2';
        } else if (percentage1 > 50 && percentage1 <= 75) {
            return 'Level 3';
        } else if (percentage1 > 75 && percentage1 <= 100) {
            return 'Level 4';
        } else {
            return '';
        }
    };
    const allLevel = getAllAssessLevel(percentage1)


    return (

        <View style={styles.msin}>
            <View style={styles.cont}>
                <View style={styles.cont1}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.txt}>Learn Vocabulary</Text>
                </View>
                <View style={{ height: 48, width: '60%', alignSelf: 'center', marginTop: 20 }}>
                    <SwitchSelector
                        options={switchOptions}
                        initial={0}
                        onPress={handleSwitchChange}
                        textColor={'black'}
                        selectedColor={COLORS.white}
                        buttonColor={Color.background}
                        borderColor={COLORS.primary}
                        hasPadding
                    />
                </View>
            </View>

            <View>
                {renderItems()}
            </View>

        </View>
    )
}

export default LearnVocabulary;

const styles = StyleSheet.create({
    msin: {
        flex: 1,
        backgroundColor: 'white'
    },
    cont: {
        borderWidth: 1,
        height: 118,
        width: '100%',
        backgroundColor: Color.background,
        borderColor: Color.background
    },
    cont1: {
        flexDirection: 'row',
        marginTop: 16
    },
    img: {
        height: 25,
        width: 25,
        marginLeft: 16
    },
    txt: {
        marginLeft: 16,
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        fontSize: 16
    },
    cont2: {
        borderWidth: 1,
        height: 195,
        width: '90%',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(209,235,211,255)',
        borderColor: 'rgba(209,235,211,255)',
        // elevation: 1
    },
    txt1: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        marginTop: 20,
        marginLeft: 18
    },
    txt2: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        top: 2

    },
    cont3: {
        borderWidth: 1,
        height: 30,
        width: '33%',
        borderRadius: 8,
        backgroundColor: '#34A853',
        borderColor: '#34A853',
        marginLeft: 18,
        marginTop: 8
    },
    cont4: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt3: {
        color: '#8C8C8C',
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        margin: 2
    },
    cont5: {
        marginLeft: 18,
        marginTop: 8,

    },
    line: {
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#DDDDDD',
        marginTop: 12
    },
    cont6: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginLeft: 16,
        // marginRight: 16,
        marginTop: 16

    },
    txt4: {
        color: 'black',
        marginLeft: 18,
        fontSize: 16,
        fontFamily: 'Inter-Bold'
    },
    cont7: {
        borderWidth: 1,
        height: 30,
        width: '25%',
        backgroundColor: '#34A853',
        borderColor: '#34A853',
        borderRadius: 8, marginRight: 18,

    },
    txt5: {
        color: 'white',
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
        top: 3
    },
    cont8: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginLeft: 18,
        // marginRight: 18,
        marginTop: 12
    },
    txt6: {
        color: '#999999',
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        marginLeft: 18,
        marginRight: 18
    },
    cont9: {
        borderWidth: 1,
        height: 40,
        width: '90%',
        backgroundColor: 'rgba(209,235,211,255)',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
        borderColor: 'rgba(209,235,211,255)'
    },
    txt7: {
        color: '#34A853',
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        textAlign: 'center',
        top: 8
    },
    input: {
        width: '90%',
        // borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center',
        marginTop: 20,
        color: 'black',
    },
    txt8: {
        color: 'black',
        marginTop: 20,
        marginLeft: 18,
        fontFamily: 'Inter-Bold',
        fontSize: 16
    },
    cont10: {
        borderWidth: 1,
        height: 144,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 12,
        backgroundColor: Color.background,
        borderColor: Color.background
    },
    txt9: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        margin: 5,
        marginLeft: 16,
        marginTop: 8
    },
    txt10: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        marginTop: 20,
        marginLeft: 18
    },
    cont11: {
        height: 50,
        width: '90%',
        borderWidth: 1,
        alignSelf: 'center',
        backgroundColor: '#F2F2F2',
        borderColor: '#F2F2F2',
        borderRadius: 8,
        marginTop: 20,
        elevation: 2
    },
    cont12: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16
    },
    txt11: {
        color: '#49454F',
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        top: 12
    },
    cont13: {
        height: undefined,
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
        marginTop: 10,
    },
    cont15: {
        borderWidth: 1,
        height: 30,
        width: '33%',
        backgroundColor: '#FFC107',
        borderColor: '#FFC107',
        borderRadius: 8,

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
        fontFamily: 'Inter-Bold',
        maxWidth: 200
        // overflow:'hidden',padding:5
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

    }


})