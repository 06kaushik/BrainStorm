import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground, FlatList, ScrollView, TextInput, ToastAndroid, Pressable, StyleSheet, Alert } from 'react-native'
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
import Color from "../../Theme/Color";




const NotificationScreen = ({ navigation }) => {

    const [getallNoti, setGetAllNoti] = useState([])


    const getNotification = async () => {
        try {
            const resp = await axios.get('/notification/getAllNotification?seaAll=false')
            console.log('Get All Notification', resp.data.data);
            setGetAllNoti(resp?.data?.data)

        } catch (error) {
            console.log('error from all Notification', error?.response?.data?.message);

        }
    }

    useEffect(() => {
        getNotification()
    }, [])

    const GetAllNotification = ({ item }) => {
        console.log('ahfiohlwbvwovhbw', item.data.assessmentId);
        const datestamp = item?.message?.date;
        const date = moment(datestamp).format('DD/MM/YYYY');
        const timetamp = item?.message?.date;
        const time = moment(timetamp).format('HH:mm:ss a');

        const ChangeStatus = async () => {
            try {
                const resp = await axios.patch(`/notification/updateNotificationStatus/${item?._id}`)
                console.log('response from status changed', resp.data);
                getNotification()
            } catch (error) {
                console.log('Error from Change Status', error.response.data.response);
            }
        }

        return (
            <View style={[style.cont3, { backgroundColor: item?.status === true ? 'white' : null }]}>
                {item?.isAssessment === false ?
                    <TouchableOpacity onPress={() => { ChangeStatus(); navigation.navigate('Learn', { item: item, userdetail: item?.userId, }) }}>

                        <View style={style.cont4}>
                            {item?.isAssessment === false ?
                                <Image style={style.img1} source={{ uri: item.data.coursePicture }} />
                                :
                                <Image style={style.img1} source={images.assess} />
                            }
                            <View >
                                <Text style={style.txt2}>{item?.message?.body}</Text>
                                <Text style={style.txt3}>{date} at {time}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => { ChangeStatus(); navigation.navigate('Vocabulary', { item: item?.data?.assessmentId, }) }}>

                        <View style={style.cont4}>
                            {item?.isAssessment === false ?
                                <Image style={style.img1} source={{ uri: item.data.coursePicture }} />
                                :
                                <Image style={style.img1} source={images.assess} />
                            }
                            <View >
                                <Text style={style.txt2}>{item?.message?.body}</Text>
                                <Text style={style.txt3}>{date} at {time}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                }


            </View>
        )
    }


    const showConfirmDialog = (item) => {
        return Alert.alert(
            "Clear All ?",
            `Are you sure you want to Clear ${getallNoti?.length} Notifications ?`,
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        ClearAll()
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };

    const ClearAll = async () => {
        try {
            const resp = await axios.delete('/notification/deleteNotification')
            console.log('response from delete api', resp.data);
            getNotification()
        } catch (error) {
            console.log('error from delete notification', error.response.data.message);

        }

    }


    return (

        <View style={[style.main, { backgroundColor: getallNoti?.length === 0 ? 'white' : '#F7F8FD' }]}>

            <View style={style.cont}>
                <View style={style.cont2}>
                    <View style={style.cont1}>
                        <TouchableOpacity onPress={() => navigation.goBack('')}>
                            <Image style={style.img} source={images.back} />
                        </TouchableOpacity>
                        <Text style={style.txt}>Notification</Text>
                    </View>
                    <TouchableOpacity onPress={() => showConfirmDialog()}>
                        {getallNoti.length !== 0 ?
                            <Text style={style.txt1}>Clear All</Text>
                            :
                            <Text></Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1 }}>
                {getallNoti?.length !== 0 ?
                    <FlatList
                        data={getallNoti}
                        renderItem={GetAllNotification}
                        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
                    />
                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcfcff', flex: 1 }}>
                        <Image style={{ alignSelf: 'center', height: 300, width: 250 }} source={require('../../assets/nopti.gif')} />
                    </View>
                }
            </View>
        </View>
    )
}

export default NotificationScreen;

const style = StyleSheet.create({
    main: {
        flex: 1,
    },
    cont: {
        borderWidth: 1,
        height: 50,
        width: '100%',
        backgroundColor: Color.background,
        borderColor: Color.background
    },
    img: {
        height: 25,
        width: 25
    },
    cont1: {
        flexDirection: 'row',
        marginLeft: 16,
        marginTop: 8
    },
    txt: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        marginLeft: 16
    },
    cont2: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt1: {
        color: 'white',
        fontFamily: 'Inter-Light',
        fontSize: 14,
        marginRight: 16,
        marginTop: 8
    },
    cont3: {
        height: 75,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    cont4: {
        flexDirection: 'row',
    },
    img1: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginTop: 13,
        marginLeft: 8

    },
    txt2: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter-Bold',
        marginLeft: 18,
        marginTop: 12,
        maxWidth: 280,
        overflow: 'hidden'
    },
    cont5: {

    },
    txt3: {
        color: 'black',
        fontFamily: 'Inter-Light',
        fontSize: 12, marginLeft: 18
    }



})