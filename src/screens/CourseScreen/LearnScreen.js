import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Linking, ScrollView } from 'react-native';
import images from "../../component/images";
import { COLORS } from '../../component/GlobalStyle';
import axios from "axios";
import moment from 'moment';
import * as Progress from 'react-native-progress';
import Color from "../../Theme/Color";



const LearnScreen = ({ navigation, route }) => {

    const { item, userdetail } = route.params
    console.log('fwfhhfwf', userdetail);
    const [openPdf, setOpenPdf] = useState([])
    const [getcount, setgetCount] = useState('')
    console.log('count of pdf', getcount);


    const timestamp = item?.startedOn;
    const date = moment(timestamp).format('DD/MM/YYYY');

    const timestamp1 = item?.expiredOn;
    const Edate = moment(timestamp1).format('DD/MM/YYYY');
    const currentDate = moment().format('DD/MM/YYYY');
    const isExpired = moment(currentDate, 'DD/MM/YYYY').startOf('day').isAfter(moment(Edate, 'DD/MM/YYYY').startOf('day'));

    const getSingleData = async () => {
        try {
            const rsp = await axios.get(`/learner/getCourseDetailByCourseId/${item._id}`)
            setOpenPdf(rsp?.data?.data[0].subFolderData)
            console.log('data of coure singl', rsp?.data.data[0].subFolderData);
        } catch (error) {
            // console.log('errror frommm single', error.response);

        }
    }
    useEffect(() => {
        getSingleData()
    }, [item?._id])


    const getCountPdf = async (subFolderId) => {
        let body = {
            userId: userdetail,
            courseId: item?._id,
            subFolderId: subFolderId
        }
        console.log('body from get count', body);
        try {
            const resp = await axios.post('/subFolder/updateSubFolderTrack', body)
            console.log('response from get count', resp?.data);
            getSingleData(subFolderId)
        } catch (error) {
            console.log('error from get count', error.response.data.message);

        }
    }

    const getPdf = ({ item }) => {
        console.log('accessibility', item);
        return (
            <View style={style.cont5}>

                <View style={style.cont7}>
                    <Image
                        style={style.img2}
                        resizeMode="contain"
                        source={{ uri: item.pdfThumbnail }}
                    />
                    <View style={style.cont6}>
                        <Text style={style.txt5}>{item.subFolderName}</Text>
                        <View style={style.cont8}>
                            <Image style={style.eye} source={images.eye} />
                            <Text style={style.txt6}>{item?.accessibility > 0 ? item?.accessibility : 0}</Text>
                        </View>
                        <Text style={{ color: '#49454F', fontFamily: 'Inter-SemiBold', fontSize: 14 }}>
                            {item?.accessibility > 0 ? '100% - completed' : '0% - complete'}
                        </Text>
                        <View style={style.cont8}>
                            <Progress.Bar
                                progress={item?.accessibility > 0 ? 100 : 0}
                                width={150}
                                height={16}
                                color={Color.background}
                                style={{ marginRight: 16, marginTop: 3, borderRadius: 15 }}
                            />

                            <TouchableOpacity onPress={() => { getCountPdf(item?._id) && Linking.openURL(item?.pdfUrl) }}>
                                <Image
                                    style={{ height: 20, width: 20, tintColor: '#999999' }}
                                    source={images.play}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        );
    };


    return (
        <View style={style.main}>
            <View style={style.container}>
                <View style={style.cont}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={style.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={style.txt}> Learn Vocabulary</Text>
                </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View>
                    <View style={style.cont1}>
                        <Image resizeMode="contain" style={style.img1} source={{ uri: item?.coursePicture || item?.data?.coursePicture }} />
                    </View>
                    <View style={style.cont2}>
                        <Text style={style.txt1}>{item?.courseName}</Text>
                        {isExpired !== true ?
                            <View style={{ borderWidth: 1, height: 25, width: '20%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: '#FF6905', borderColor: 'orange' }}>
                                <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', }}>Ongoing</Text>
                            </View>
                            :
                            <View style={{ borderWidth: 1, height: 25, width: '30%', alignSelf: 'flex-end', marginTop: 20, marginRight: 8, borderRadius: 5, backgroundColor: 'green', borderColor: 'green' }}>
                                <Text style={{ color: 'white', fontFamily: 'Inter-SemiBold', textAlign: 'center', }}>completed</Text>
                            </View>
                        }

                    </View>
                    <Text style={style.txt2}>{item?.subfolderLength} {item?.subfolderLength === 1 ? 'Chapter' : 'Chapters'}</Text>
                    <View style={style.cont3}>
                        <Text style={style.txt3}>Duration : <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold' }}>{item?.courseDuration?.duration} {item?.courseDuration?.duration === 1 ? 'Day' : 'Days'}</Text> </Text>
                        <Text style={style.txt3}>Assigned Date : <Text style={{ color: 'black', fontFamily: 'Inter-SemiBold' }}> {date}</Text> </Text>
                    </View>
                    {isExpired !== true ?
                        <View style={style.cont4}>
                            <Text style={style.txt4}>Expiry Date  :  {Edate}</Text>
                        </View>
                        :
                        <View style={style.contt4}>
                            <Text style={style.txt4}>Expiry Date  :  {Edate}</Text>
                        </View>
                    }

                    <View>
                        <TextInput
                            style={style.input}
                            value={item?.about}
                        />
                    </View>


                    {openPdf?.length > 0 && isExpired !== true ?
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={openPdf}
                                renderItem={getPdf}
                                ListFooterComponent={<View style={{ marginBottom: 100 }} />}
                            />
                        </View>
                        :
                        <View style={{ alignSelf: 'center', marginBottom: 50 }}>
                            <Image source={images.nopdf} />
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default LearnScreen

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
        marginTop: 20,

    },
    img: {
        height: 25,
        width: 25
    },
    txt: {
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        marginLeft: 16
    },
    img1: {
        height: 227,
        width: '90%',
        borderRadius: 8,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    cont1: {
        marginTop: 10,
        // borderWidth: 1

    },
    cont2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 18,
        marginRight: 18

    },
    txt1: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        marginTop: 18

    },
    txt2: {
        color: 'black',
        fontFamily: 'Inter-Light',
        fontSize: 14,
        marginLeft: 18
    },
    cont3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 18,
        marginRight: 18,
        marginTop: 12
    },
    txt3: {
        color: '#999999',
        fontFamily: 'Inter-Bold'
    },
    cont4: {
        borderWidth: 1,
        height: 32,
        width: '90%',
        backgroundColor: 'orange',
        borderColor: 'orange',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8
    },
    contt4: {
        borderWidth: 1,
        height: 32,
        width: '90%',
        backgroundColor: 'green',
        borderColor: 'green',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8
    },
    txt4: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        top: 3
    },
    input: {
        width: '90%',
        // borderWidth: 1,
        borderColor: 'grey',
        alignSelf: 'center',
        marginTop: 20,
        color: 'black',
    },
    cont5: {
        borderWidth: 1,
        height: 135,
        width: '90%',
        backgroundColor: '#F7F8FD',
        // marginBottom: 100,
        alignSelf: 'center',
        borderRadius: 15,
        borderColor: '#F7F8FD',
        elevation: 1,
        marginTop: 12


    },
    img2: {
        height: 117,
        width: 87,
        marginLeft: 12,
        marginTop: 10,
    },
    cont6: {
        // margin: 10,
        marginLeft: 16,
        marginTop: 20


    },
    txt5: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 16
    },
    cont7: {
        flexDirection: 'row',
    },
    cont8: {
        flexDirection: 'row',
        margin: 5
    },
    eye: {
        height: 20,
        width: 20
    }, txt6: {
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        fontSize: 12,
        marginLeft: 10,
        marginTop: 1
    }

})