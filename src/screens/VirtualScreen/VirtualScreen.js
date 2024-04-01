import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Linking } from 'react-native';
import { COLORS } from "../../component/GlobalStyle";
import images from "../../component/images";
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import Color from "../../Theme/Color";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Modal from 'react-native-modal'
import WebView from "react-native-webview";


const VirtualScreen = ({ navigation }) => {

    const [selectedSwitch, setSelectedSwitch] = useState("upcoming");
    console.log('SWITCH STATUSSS', selectedSwitch);
    const [search, setSearch] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date());
    const [meetData, setMeetData] = useState([])
    const [webViewVisible, setWebViewVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Urldata, setUrldata] = useState({
        urlname: "",
        url: ""
    })

    const switchOptions = [
        { label: "Upcoming", value: "upcoming" },
        { label: "Completed", value: "completed" },
    ];

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleSwitchChange = (value) => {
        setSelectedSwitch(value);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date)
        hideDatePicker();
    };

    /////////// ZOOM MEETING API //////////////

    const dateObject = date
    const convert = moment(dateObject).format('YYYY-MM-DD')

    const getZoomData = async () => {
        let body = {
            status: selectedSwitch, //used for all lerner,teacher,admin
            limit: 10,  //used for all lerner,teacher,admin
            createdTime: convert, //This opection is user for lerner only to filter the date
            search: search?.length > 0 ? search : null, //used for only lerner for date filter
            offset: 1   //used for all lerner,teacher,admin
        }
        console.log('body of meeting api', body);
        try {
            const resp = await axios.post('/jioMeet/getAllMeeting', body)
            console.log('data from meeting api', resp.data.data);
            setMeetData(resp.data.data)

        } catch (error) {
            console.log('error from meeting api', error);

        }
    }

    useEffect(() => {
        getZoomData()
    }, [convert])


    const UpdateMeeting = async () => {
        try {
            const resp = await axios.patch(`/jioMeet/updateMeeting/${meetData[0]?._id}`)
            // console.log('RESPONSE FROM MEETING UPDATE', resp?.data?.message);
        } catch (error) {
            console.log('ERROR FROM METTING UPDATE', error);
        }
    }


    const ZoomDataRender = ({ item }) => {

        const dateTimeString = item?.startTime
        const formattedTime = moment(dateTimeString, 'HH:mm:ss').format('HH:mm A');

        const dateTimeStrings = item?.startDate
        const momentObject = moment.utc(dateTimeStrings);
        const formattedDate = momentObject.format("DD MMM");

        const joinZoomMeeting = () => {
            const zoomMeetingUrl = `zoomus://us05web.zoom.us/join?action=join&confno=${item?.meetingId}&pwd=${item?.password}`;
            // const zoomMeetingUrl = item?.start_url
            console.log('zooommmm meetingggggg urllll', zoomMeetingUrl);
            Linking.openURL(zoomMeetingUrl)
                .then(() => {
                    console.log('Opened Zoom app successfully');
                    UpdateMeeting()
                })
                .catch((error) => {
                    console.error('Error opening Zoom app:', error);

                    // If the Zoom app is not installed, provide a fallback option
                    const appStoreUrl = 'https://play.google.com/store/apps/details?id=us.zoom.videomeetings'; // Change this to the correct App Store link for Android
                    Linking.openURL(appStoreUrl).catch(() => {
                        console.error('Error opening app store:', error);
                    });
                });
        };


        return (
            <View style={styles.meetcont}>
                <View style={styles.cont2}>
                    <Text style={styles.cont3}> {formattedDate}</Text>
                </View>
                <View style={styles.cont4} />
                <View style={styles.cont5}>
                    <Text style={styles.cont6} numberOfLines={1}>{item?.meetingName}</Text>
                    <Text style={styles.cont7} numberOfLines={2}>{formattedTime}</Text>
                </View>

                <View style={styles.cont8}>
                    <TouchableOpacity onPress={joinZoomMeeting} >
                        {selectedSwitch !== 'completed' ?
                            <View style={styles.cont9}>
                                <Text style={styles.cont10}>Join</Text>
                            </View>
                            :
                            null
                        }

                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    //////////////// MAINTAINING SWITCH RENDERING /////////////////////

    const renderItems = () => {
        if (selectedSwitch === 'upcoming') {
            return (
                <View>
                    <View style={styles.textInputContainer}>
                        <Image source={images.search} style={styles.searchIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search Meetings"
                            placeholderTextColor="#999"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <View style={styles.cont11}>
                        <Text style={styles.cont12}>Showing 10 Results</Text>
                        <View style={styles.cont13}>
                            <TouchableOpacity onPress={showDatePicker}>
                                <View style={styles.cont14}>
                                    <Image source={images.calender} style={styles.eyeIcon} />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        minimumDate={new Date()}
                                    />
                                    {
                                        date?.length === 0 ?
                                            <Text style={{ color: 'black', top: 3 }}>{new Date().toLocaleDateString()}</Text>
                                            :
                                            <Text style={{ color: 'black', top: 3 }}>{new Date(date).toLocaleDateString()}</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={meetData}
                            renderItem={ZoomDataRender}
                        />
                    </View>


                </View>
            )

        } else if (selectedSwitch === 'completed') {
            return (

                <View>
                    <View style={styles.textInputContainer}>
                        <Image source={images.search} style={styles.searchIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Search Meetings"
                            placeholderTextColor="#999"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <View style={styles.cont11}>
                        <Text style={styles.cont12}>Showing 10 Results</Text>
                        <View style={styles.cont13}>
                            <TouchableOpacity onPress={showDatePicker}>
                                <View style={styles.cont14}>
                                    <Image source={images.calender} style={styles.eyeIcon} />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        minimumDate={new Date()}
                                    />
                                    {
                                        date?.length === 0 ?
                                            <Text style={{ color: 'black', top: 3 }}>{new Date().toLocaleDateString()}</Text>
                                            :
                                            <Text style={{ color: 'black', top: 3 }}>{new Date(date).toLocaleDateString()}</Text>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <FlatList
                            data={meetData}
                            renderItem={ZoomDataRender}
                        />
                    </View>

                </View>
            )

        }
    }

    return (
        <View style={styles.msin}>
            <View style={styles.cont}>
                <View style={styles.cont1}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.txt}>Virtual Meetings</Text>
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


            <Modal
                transparent={true}
                hasBackdrop={true}
                backdropOpacity={0.8}
                style={{ margin: 0 }}
                isVisible={webViewVisible}
                onBackButtonPress={() => {
                    setWebViewVisible(false);
                }}
                onBackdropPress={() => {
                    setWebViewVisible(false);
                }}
            >
                <View style={{ flex: 1, backgroundColor: 'White' }}>
                    <View>
                        <View style={[styles.container, { height: 50 }]}>
                            <View style={styles.contt}>
                                <TouchableOpacity onPress={() => setWebViewVisible(false)}>
                                    <Image style={styles.img} source={images.back} />
                                </TouchableOpacity>
                                <Text style={styles.txt}> {Urldata?.urlname}</Text>
                            </View>
                        </View>
                    </View>
                    <WebView
                        source={{ uri: Urldata?.url }}
                        style={{ flex: 1, backgroundColor: '#fff' }}
                        onLoadStart={(event) => {
                            const { url } = event.nativeEvent;
                            if (url.startsWith('zoomus://')) {
                                Linking.openURL(url)
                                    .then(() => {
                                        console.log('Opened Zoom app successfully');
                                    })
                                    .catch((error) => {
                                        console.error('Error opening Zoom app:', error);
                                        // Handle the error or provide a fallback option
                                    });
                            }
                        }}
                        onLoad={() => setLoading(false)}
                        onLoadEnd={() => setLoading(false)}
                    />
                    {loading && (
                        <View style={styles.indicatorContainer}>
                            <ActivityIndicator size="large" color={COLORS.background} />
                        </View>
                    )}
                </View>
            </Modal>

        </View>
    )
}

export default VirtualScreen;

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
        marginTop: 16,
        marginLeft: 20
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
    eyeIcon: {
        width: 24,
        height: 24,

    },
    meetcont: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#F7F8FD',
        height: 55,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: "#F7F8FD"
    },
    cont2: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cont3: {
        maxWidth: 30,
        fontFamily: 'Inter-Bold',
        color: 'black'
    },
    cont4: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    cont5: {
        flex: 0.6,
        justifyContent: 'center'
    },
    cont6: {
        alignSelf: 'center',
        fontFamily: 'Inter-Bold',
        color: 'black'
    },
    cont7: {
        alignSelf: 'center',
        fontFamily: 'Inter-SemiBold'
    },
    cont8: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cont9: {
        borderWidth: 1,
        height: 31,
        width: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: Color.background,
        borderColor: Color.background
    },
    cont10: {
        fontFamily: 'Inter-Bold',
        color: 'black'
    },
    cont11: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20
    },
    cont12: {
        fontFamily: 'Inter-Bold',
        color: 'black',
        top: 5
    },
    cont13: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: 133,
        height: 32,
        borderRadius: 8
    },
    cont14: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 8,
        marginLeft: 8,
        marginTop: 2
    },
    indicatorContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:Color.blackOpacity10,
    },
    container: {
        // borderWidth: 1,
        height: 50,
        width: '100%',
        backgroundColor: COLORS.background,
        borderColor: COLORS.background,

        // justifyContent: 'center',
    },
    contt: {
        flexDirection: 'row',
        marginLeft: 16,
        marginTop: 20,
    },
    img: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    txt: {
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        marginLeft: 16
    },


})