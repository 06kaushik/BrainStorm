import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, FlatList, RefreshControl, ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import images from "../../component/images";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from "../../component/GlobalStyle";
import CourseSkeleton from "../Skeleton/courseSkeleton";
import Color from "../../Theme/Color";


const colomn = 2;
const itemWidth = (Dimensions.get('window').width - (colomn + 1) * 10) / colomn; // Adjust the horizontal margin as per your requirement
const aspectRatio = 153 / 173; // width / height
const itemHeight = itemWidth / aspectRatio;


const Result = ({ navigation }) => {
    const [userdetail, setDetail] = useState('');
    const [assessment, setAssessmentData] = useState([]);
    console.log('wgcwgiohciowhciowhig', assessment?.length);

    const [loading, setLoading] = useState(true);
    const IsFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = useState('')
    console.log('searcggg', search);



    ////////// TO REFRESHHH //////////////

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAssessment()
        wait(2000).then(() => setRefreshing(false));
    }, [userdetail]);




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
            return '';
        }
    };


    const getAssessment = async () => {
        try {
            const resp = await axios.get(`/assessment/getAssessmentByLearner/${userdetail}?search=${search}`);
            setAssessmentData([])
            console.log('assessmentss', resp.data.data);
            setAssessmentData(resp?.data?.data);
            setLoading(false);
        } catch (error) {
            console.log('error from get assessments', error.response.data);
            setLoading(false);

        }
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

    useEffect(() => {
        if (userdetail) {
            setLoading(true);
            getAssessment();
        }
    }, [userdetail, IsFocused, search]);

    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }

        return text.slice(0, limit) + '...';
    };

    const renderAssessItem = ({ item }) => {
        const percentage = calculatePercentageAssess(item.totalObtainMarks, item.totalMarks);
        const truncatedAssessmentName = truncateText(item?.assessmentName, 10)

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Vocabulary', { item: item?._id, })}>
                <View style={{ width: 156, margin: 10, height: 200, borderRadius: 8, borderWidth: 1, borderColor: '#DDDDDD', }}>
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



    return (

        <View style={style.main}>
            <View style={style.container}>
                <View style={style.cont}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={style.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={style.txt}> Assessments Results</Text>
                </View>
            </View>
            <View style={style.textInputContainer}>
                <Image source={images.search} style={style.searchIcon} />
                <TextInput
                    style={style.textInput}
                    placeholder="Search Assessment"
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <Text style={style.txt1}>Showing {assessment.length} Results </Text>
            {loading ? (
                // <View style={style.loaderContainer}>
                //     <ActivityIndicator size="large" color={COLORS.buttonBack} style={{ marginTop: '50%' }} />
                // </View>
                <CourseSkeleton />
            ) : (
                <View>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {assessment?.length > 1 ?
                            <View style={{ alignSelf: 'center', marginTop: 12 }}>
                                <FlatList
                                    data={assessment}
                                    renderItem={renderAssessItem}
                                    numColumns={colomn}
                                    ListFooterComponent={<View style={{ marginBottom: 200 }} />}

                                />
                            </View>
                            :
                            <View style={{ alignSelf: 'flex-start', marginTop: 12 }}>
                                <FlatList
                                    data={assessment}
                                    renderItem={renderAssessItem}
                                    numColumns={colomn}
                                    ListFooterComponent={<View style={{ marginBottom: 200 }} />}

                                />
                            </View>
                        }
                    </ScrollView>
                </View>
            )}

        </View>
    )
}


export default Result

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
    textInputContainer: {
        width: '90%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 28,
        paddingHorizontal: 12,
        marginBottom: 16,
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC',

    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        alignSelf: 'center',
        paddingLeft: 20
    },
    searchIcon: {
        marginLeft: 8,
        height: 20,
        width: 20
    },
    txt1: {
        marginLeft: 24,
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        fontSize: 16
    },
    cont1: {
        borderWidth: 1,
        // height: 174,
        // width: '40%',
        margin: 10,
    },
    assess: {
        alignSelf: 'center'
    },
    txt2: {
        color: 'black',
        marginLeft: 8,
        fontFamily: 'Inter-Bold',
        fontSize: 14
    },
    txt3: {
        color: COLORS.buttonBack,
        fontFamily: 'Inter-Bold',
        marginLeft: 8,
        marginRight: 8
    }


})