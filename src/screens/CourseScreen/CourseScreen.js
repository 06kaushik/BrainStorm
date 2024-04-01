import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import images from "../../component/images";
import SwitchSelector from "react-native-switch-selector";
import { COLORS } from '../../component/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import CourseSkeleton from "../Skeleton/courseSkeleton";
import Color from "../../Theme/Color";


const column = 2;

const CourseScreen = ({ navigation }) => {
    const [selectedSwitch, setSelectedSwitch] = useState("ongoing");
    const [userdetail, setDetail] = useState('');
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const IsFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [search, setSearch] = useState('')



    ////////// TO REFRESHHH //////////////

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getCourse()
        wait(2000).then(() => setRefreshing(false));
    }, [userdetail]);



    const switchOptions = [
        { label: "Ongoing", value: "ongoing" },
        { label: "Completed", value: "completed" },
    ];

    const handleSwitchChange = (value) => {
        setSelectedSwitch(value);
    };

    const renderItems = () => {
        if (loading) {
            return <CourseSkeleton />
        }

        if (selectedSwitch === 'ongoing') {
            return (
                <View>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {ongoingCourses?.length > 0 ?
                            <View style={{ marginTop: 8, alignItems: 'center' }}>
                                {ongoingCourses?.length === 1 ?
                                    <FlatList
                                        data={ongoingCourses}
                                        renderItem={renderCourses}
                                        numColumns={column}
                                        style={{ alignSelf: 'flex-start' }}
                                    />
                                    :
                                    <FlatList
                                        data={ongoingCourses}
                                        renderItem={renderCourses}
                                        numColumns={column}
                                        ListFooterComponent={<View style={{ marginBottom: 250 }} />}


                                    />
                                }
                            </View>
                            :
                            <View style={{ marginTop: 100 }}>
                                <Image style={{ alignSelf: 'center', top: 10 }} source={require('../../assets/course.png')} />
                                <View style={styles.cont11}>
                                    <Text style={styles.txt9}>No Ongoing Course Yet</Text>
                                </View>
                            </View>
                        }
                    </ScrollView>

                </View>
            );
        } else if (selectedSwitch === 'completed') {
            return (
                <View>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {completedCourses?.length > 0 ?
                            <View style={{ alignItems: 'center', marginTop: 8, }}>
                                {completedCourses?.length === 1 ?
                                    <FlatList
                                        data={completedCourses}
                                        renderItem={renderCourseComplete}
                                        style={{ alignSelf: 'flex-start' }}
                                        numColumns={column}
                                    />
                                    :
                                    <FlatList
                                        data={completedCourses}
                                        renderItem={renderCourseComplete}
                                        numColumns={column}
                                        ListFooterComponent={<View style={{ marginBottom: 200 }} />}

                                    />
                                }
                            </View>
                            :
                            <View style={{ marginTop: 100 }}>
                                <Image style={{ alignSelf: 'center', top: 10 }} source={require('../../assets/course.png')} />
                                <View style={styles.cont11}>
                                    <Text style={styles.txt9}>No Completed Course Yet</Text>
                                </View>
                            </View>
                        }
                    </ScrollView>
                </View>
            );
        }

        return null; // Return null if the selectedSwitch value is neither 'ongoing' nor 'completed'
    };

    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }

        return text.slice(0, limit) + '...';
    };

    const renderCourses = ({ item }) => {
        const truncatedAssessmentName = truncateText(item?.courseName, 10)
        const timestamp1 = item?.expiredOn;
        const Edate = moment(timestamp1).format('DD/MM/YYYY');
        const currentDate = moment().format('DD/MM/YYYY');
        const isExpired = moment(currentDate, 'DD/MM/YYYY').startOf('day').isAfter(moment(Edate, 'DD/MM/YYYY').startOf('day'));


        return (
            <TouchableOpacity onPress={() => navigation.navigate('Learn', { item: item })}>
                <View style={{ width: 156, margin: 10, height: 200, borderRadius: 8, borderWidth: 1, borderColor: '#DDDDDD' }}>
                    <ImageBackground resizeMode="contain" source={{ uri: item?.coursePicture }} style={{ height: 140, }}>
                        <View style={{ borderWidth: 1, height: 27, width: '45%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: '#FF6905', borderColor: 'orange' }}>
                            <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', top: 2 }}>Ongoing</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ bottom: 5, marginLeft: 8 }}>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 16, marginTop: 12, }}>{truncatedAssessmentName}</Text>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Light', fontSize: 14, }}>{item?.subfolderLength} {item?.subfolderLength === 1 ? 'Chapter' : 'Chapters'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const renderCourseComplete = ({ item }) => {
        const truncatedAssessmentName = truncateText(item?.courseName, 8)
        const timestamp1 = item?.expiredOn;
        const Edate = moment(timestamp1).format('DD/MM/YYYY');
        const currentDate = moment().format('DD/MM/YYYY');
        const isExpired = moment(currentDate, 'DD/MM/YYYY').startOf('day').isAfter(moment(Edate, 'DD/MM/YYYY').startOf('day'));

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Learn', { item: item })}>
                <View style={{ width: 156, margin: 10, borderRadius: 8, height: 200, borderWidth: 1, borderColor: '#DDDDDD' }}>
                    <ImageBackground resizeMode="contain" source={{ uri: item?.coursePicture }} style={{ height: 140, }}>
                        <View style={{ borderWidth: 1, height: 27, width: '57%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: 'green', borderColor: 'green' }}>
                            <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', top: 2 }}>Completed</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ marginLeft: 8, bottom: 5 }}>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Bold', fontSize: 16, marginTop: 12 }}>{truncatedAssessmentName}</Text>
                        <Text style={{ color: 'black', fontFamily: 'Inter-Light', fontSize: 14, }}>{item?.subfolderLength} {item?.subfolderLength === 1 ? 'Chapter' : 'Chapters'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const [ongoingCourses, setOngoingCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);


    const getCourse = async () => {
        try {
            const resp = await axios.get(`/course/getAllAssignedCourseForLearner/${userdetail}?${selectedSwitch}=true&search=${search}`);
            setCourseData(resp?.data?.data);
            setLoading(false);

            // Filter ongoing courses and update ongoingCourses state
            const ongoing = resp?.data?.data.filter((course) => {
                const timestamp1 = course?.expiredOn;
                const Edate = moment(timestamp1).format('DD/MM/YYYY');
                const currentDate = moment().format('DD/MM/YYYY');
                const isExpired = moment(currentDate, 'DD/MM/YYYY').startOf('day').isAfter(moment(Edate, 'DD/MM/YYYY').startOf('day'));
                return !isExpired; // Return true for ongoing courses
            });
            setOngoingCourses(ongoing);

            // Filter completed courses and update completedCourses state
            const completed = resp?.data?.data.filter((course) => {
                const timestamp1 = course?.expiredOn;
                const Edate = moment(timestamp1).format('DD/MM/YYYY');
                const currentDate = moment().format('DD/MM/YYYY');
                const isExpired = moment(currentDate, 'DD/MM/YYYY').startOf('day').isAfter(moment(Edate, 'DD/MM/YYYY').startOf('day'));
                return isExpired; // Return true for completed courses
            });
            setCompletedCourses(completed);
        } catch (error) {
            console.log('error from get courses', error.response.data.message);
            setLoading(false);

        }
    };



    const getUser = async () => {
        try {
            let userDetail = await AsyncStorage.getItem('USER');
            let data = JSON.parse(userDetail);
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
            getCourse();
        }
    }, [userdetail, IsFocused, search]);

    return (

        <View style={styles.main}>
            <View style={styles.cont}>
                <View style={styles.cont1}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.txt}>Courses</Text>
                </View>
                <View style={{ height: 48, width: '60%', alignSelf: 'center', marginTop: 20 }}>
                    <SwitchSelector
                        options={switchOptions}
                        initial={0}
                        onPress={handleSwitchChange}
                        textColor={'black'}
                        selectedColor={COLORS.white}
                        buttonColor={Color.background}
                        borderColor={'#fff'}
                        hasPadding
                    />
                </View>
            </View>

            <View style={styles.textInputContainer}>
                <Image source={images.search} style={styles.searchIcon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Search Course"
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <Text style={styles.txt1}>Showing {selectedSwitch === 'ongoing' ? ongoingCourses.length : completedCourses.length} Course </Text>
            <View>
                {renderItems()}
            </View>

        </View>
    )
}


export default CourseScreen;

const styles = StyleSheet.create({
    main: {
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
    cont11: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        height: 40,
        width: '65%',
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        // elevation: 4

    },
    txt9: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Inter-Bold'

    },
})