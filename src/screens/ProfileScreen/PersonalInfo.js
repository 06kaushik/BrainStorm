import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TextInput as NativeTextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import images from "../../component/images";
import { COLORS } from "../../component/GlobalStyle";
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as PaperTextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import CountryPicker from 'react-native-country-picker-modal';
import CourseSkeleton from "../Skeleton/courseSkeleton";
import DashSkeleton from "../Skeleton/SkeletonDash";
import Color from "../../Theme/Color";
import UserAvatar from 'react-native-user-avatar';





const PersonalInfo = ({ navigation }) => {

    const [profiledata, setProfileData] = useState('')
    const [userdetail, setDetail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [middlename, setMiddleName] = useState('')
    const [surname, setSurname] = useState('')
    const [enrolldate, setEnrollDate] = useState('')
    const [dob, setDob] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [edit, setEdit] = useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('')
    const [date1, setDate1] = useState('')
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [countryCode, setCountryCode] = useState('IN')
    const [country, setCountry] = useState(null)
    const [withCountryNameButton, setWithCountryNameButton] = useState(
        false,
    )
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(false)
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }
    const [showcountry, setShowCountry] = useState(false)
    const [loading, setLoading] = useState(true);




    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setDate(date)
        hideDatePicker();
    };

    const originalDate = date;
    const formattedDate = moment(originalDate).format('YYYY-MM-DD');

    //////// FOR ENROLLL DATE //////////
    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (dates) => {
        console.warn("A date has been picked: ", dates);
        setDate1(dates)
        hideDatePicker1();
    };

    const originalDate1 = date1;
    const formattedDate1 = moment(originalDate1).format('YYYY-MM-DD');


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
        setLoading(true)
        try {
            const resp = await axios.get(`/learner/getSingleLearner/${userdetail}`)
            // console.log('user detail of learner in personal info', resp?.data?.data);
            setProfileData(resp?.data?.data)
            setFirstName(resp?.data?.data?.firstName ? resp?.data?.data?.firstName : '')
            setMiddleName(resp?.data?.data?.middleName ? resp?.data?.data?.middleName : '')
            setSurname(resp?.data?.data?.surName ? resp?.data?.data?.surName : '')
            setDate1(resp?.data?.data?.enrollmentDate ? resp?.data?.data?.enrollmentDate : '')
            setDate(resp?.data?.data?.dob ? resp?.data?.data?.dob : '')
            setMobile(resp?.data?.data?.mobile ? resp?.data?.data?.mobile : '')
            setEmail(resp?.data?.data?.email ? resp?.data?.data?.email : '')
            setLoading(false)
        } catch (error) {
            console.log('error from deail learner', error);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userdetail) {
            getLearnerDetail()
        }
    }, [userdetail])



    const updateProfile = async () => {
        let body = {
            learnerId: userdetail,
            firstName: firstname,
            middleName: middlename,
            surName: surname,
            dob: date,
            email: email,
            mobile: mobile,
            enrollmentDate: date1
        }
        console.log('body from user update data', body);
        try {
            const resp = await axios.patch('/learner/editLearner', body)
            // console.log('response from update profile', resp?.data);
            getLearnerDetail()
            ToastAndroid.show(resp?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);

        } catch (error) {
            console.log('error from update profile', error.response.data.message);
            ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);

        }

    }


    const [selectedSwitch, setSelectedSwitch] = useState("basic");
    const [basicInfoInputs, setBasicInfoInputs] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
    });
    const [academicsInputs, setAcademicsInputs] = useState({
        input1: "",
        input2: "",
        input3: "",
    });

    const switchOptions = [
        { label: "Basic Info", value: "basic" },
        { label: "Academics", value: "academics", disabled: firstname.length === 0 || middlename.length === 0 || surname.length === 0 || date.length === 0 || date1.length === 0 || mobile.length === 0 || email.length === 0 },
    ];

    const handleSwitchChange = (value) => {

        setSelectedSwitch(value);

    };

    const handleInputChange = (inputName, text) => {
        if (selectedSwitch === "basic") {
            setBasicInfoInputs((prevInputs) => ({
                ...prevInputs,
                [inputName]: text,
            }));
        } else if (selectedSwitch === "academics") {
            setAcademicsInputs((prevInputs) => ({
                ...prevInputs,
                [inputName]: text,
            }));
        }
    };

    const renderInputs = () => {

        if (selectedSwitch === "basic") {
            return (
                <>
                    <View style={styles.passwordInputContainer1}>
                        <PaperTextInput
                            mode="outlined"
                            style={styles.input1}
                            value={firstname}
                            onChangeText={setFirstName}
                            label="Learner First Name"
                            editable={edit}
                            outlineColor="#79747E"
                            activeOutlineColor='#79747E'
                            textColor="black"

                        />

                    </View>
                    {firstname?.length === 0 ?
                        <View>
                            <Text style={{ color: 'red', textAlign: 'right', right: 16, fontFamily: 'Inter-Light', fontSize: 12 }}>Field Should Not Be Empty !</Text>
                        </View>
                        :
                        null
                    }
                    <View style={styles.passwordInputContainer1}>
                        <PaperTextInput
                            mode="outlined"
                            style={styles.input1}
                            value={middlename}
                            onChangeText={setMiddleName}
                            label="Learner Middle Name"
                            editable={edit}


                        />
                    </View>
                    {middlename?.length === 0 ?
                        <View>
                            <Text style={{ color: 'red', textAlign: 'right', right: 16, fontFamily: 'Inter-Light', fontSize: 12 }}>Field Should Not Be Empty !</Text>
                        </View>
                        :
                        null
                    }

                    <View style={styles.passwordInputContainer1}>
                        <PaperTextInput
                            mode="outlined"
                            style={styles.input1}
                            value={surname}
                            onChangeText={setSurname}
                            label="Learner Surname Name"
                            editable={edit}


                        />
                    </View>
                    {surname?.length === 0 ?
                        <View>
                            <Text style={{ color: 'red', textAlign: 'right', right: 16, fontFamily: 'Inter-Light', fontSize: 12 }}>Field Should Not Be Empty !</Text>
                        </View>
                        :
                        null
                    }
                    <View style={styles.passwordInputContainer}>
                        <NativeTextInput
                            style={styles.inpu1}
                            value={formattedDate1}
                            onChangeText={setEnrollDate}
                            placeholder="Enrollment Date"
                            placeholderTextColor={'black'}
                            editable={false}

                        />
                        <View style={{ position: 'absolute', backgroundColor: 'white', borderWidth: 1, top: -10, left: 15, borderColor: 'white' }}>
                            <Text style={{ color: 'black', fontSize: 11 }}>Enrollment Date</Text>
                        </View>


                        <TouchableOpacity onPress={showDatePicker1}>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible1}
                                mode="date"
                                onConfirm={handleConfirm1}
                                onCancel={hideDatePicker1}
                                minimumDate={new Date()}
                            />
                            {!edit === false ?
                                <Image source={images.calender} style={styles.eyeIcon} />
                                :
                                null
                            }
                        </TouchableOpacity>
                    </View>
                    {formattedDate1?.length === 0 ?
                        <View>
                            <Text style={{ color: 'red', textAlign: 'right', right: 16, fontFamily: 'Inter-Light', fontSize: 12 }}>Field Should Not Be Empty !</Text>
                        </View>
                        :
                        null
                    }

                    <View style={styles.passwordInputContainer}>
                        <NativeTextInput
                            style={styles.inpu1}
                            value={formattedDate}
                            onChangeText={setDob}
                            placeholder="DOB"
                            placeholderTextColor={'black'}
                            editable={false}
                        />

                        <View style={{ position: 'absolute', backgroundColor: 'white', borderWidth: 1, top: -10, left: 15, borderColor: 'white' }}>
                            <Text style={{ color: 'black', fontSize: 11 }}>DOB</Text>
                        </View>
                        <TouchableOpacity onPress={showDatePicker}>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                                minimumDate={new Date()}
                            />
                            {!edit === false ?
                                <Image source={images.calender} style={styles.eyeIcon} />
                                :
                                null
                            }
                        </TouchableOpacity>
                    </View>
                    {formattedDate?.length === 0 ?
                        <View>
                            <Text style={{ color: 'red', textAlign: 'right', right: 16, fontFamily: 'Inter-Light', fontSize: 12 }}>Field Should Not Be Empty !</Text>
                        </View>
                        :
                        null
                    }

                    <View style={{ flexDirection: 'row', alignSelf: 'center', margin: 10, bottom: 5 }}>
                        <TouchableOpacity style={{ borderWidth: 1, height: 56, width: '35%', borderRadius: 4, top: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ top: 12, left: 5 }}>
                                    <CountryPicker
                                        {...{
                                            countryCode,
                                            withFilter,
                                            withFlag,
                                            withCountryNameButton,
                                            withAlphaFilter,
                                            withCallingCode,
                                            withEmoji,
                                            onSelect,
                                        }}
                                        visible={showcountry}
                                    />
                                </View>
                                <Text style={{
                                    color: 'black',
                                    fontSize: 15,
                                    top: 17,
                                    right: 10
                                }}>
                                    +{country === null ? 91 : country?.callingCode}
                                </Text>
                                <Image style={{ height: 20, width: 20, top: 16, right: 5 }} source={images.dropdown} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 56, width: '55%', marginLeft: 15 }}>
                            <PaperTextInput
                                mode="outlined"
                                editable={edit}
                                style={styles.input1}
                                value={mobile}
                                onChangeText={setMobile}
                                label="Parent Phone Number"

                            />

                        </View>

                    </View>


                    {mobile?.length === 0 ?
                        <View>
                            <Text style={{ color: 'red', textAlign: 'right', right: 16, fontFamily: 'Inter-Light', fontSize: 12 }}>Field Should Not Be Empty !</Text>
                        </View>
                        :
                        null
                    }
                    <View style={styles.passwordInputContainer1}>
                        <PaperTextInput
                            mode="outlined"
                            editable={edit}
                            style={styles.input1}
                            value={email}
                            onChangeText={setEmail}
                            label="Parent Email"

                        />
                    </View>
                </>
            );
        } else if (selectedSwitch === "academics") {
            return (
                <>
                    <NativeTextInput
                        style={styles.textInput}
                        value={profiledata?.schoolName}
                        onChangeText={(text) => handleInputChange("input1", text)}
                        placeholder="School Name"
                        placeholderTextColor={'grey'}
                        editable={false}
                    />
                    <NativeTextInput
                        style={styles.textInput}
                        value={profiledata?.gradeName}
                        onChangeText={(text) => handleInputChange("input2", text)}
                        placeholder="Grade Name"
                        placeholderTextColor={'grey'}
                        editable={false}
                    />
                    <NativeTextInput
                        style={styles.textInput}
                        value={profiledata?.divisionName}
                        onChangeText={(text) => handleInputChange("input3", text)}
                        placeholder="Division Name"
                        placeholderTextColor={'grey'}
                        editable={false}
                    />
                </>
            );
        }
    };

    return (

        <View style={styles.main}>

            <View style={styles.cont}>
                <View style={styles.cont1}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={styles.txt}>Personal Information</Text>
                </View>
                <View style={{ height: 48, width: '60%', alignSelf: 'center', marginTop: 20 }}>
                    <SwitchSelector
                        options={switchOptions}
                        initial={0}
                        onPress={handleSwitchChange}
                        textColor={'black'}
                        selectedColor={COLORS.white}
                        buttonColor={Color.background}
                        hasPadding
                        borderColor={COLORS.primary}
                        disableValueChangeOnPress={switchOptions}

                    />
                </View>
            </View>
            {loading === true ?
                <DashSkeleton /> :
                <ScrollView>
                    <View style={styles.cont2}>
                        <View style={styles.cont3}>
                            {selectedSwitch === "basic" ?
                                <Text style={styles.txt1}>Personal Information</Text>
                                :
                                <Text style={styles.txt1}>Academics</Text>
                            }
                            {profiledata?.learnerImg === undefined ?
                                <UserAvatar style={styles.img1} bgColor={Color.background} textColor={'black'} size={100} name={profiledata?.fullName} />
                                :
                                <Image style={styles.img1} source={{ uri: profiledata?.learnerImg }} />
                            }
                        </View>

                        <View style={styles.content}>
                            {renderInputs()}
                        </View>
                    </View>
                </ScrollView>
            }


            {selectedSwitch === 'basic' ?
                <View style>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', height: 50, }}>

                        {edit == true &&
                            <TouchableOpacity onPress={() => setEdit(!edit)}>
                                <View style={styles.contt}>
                                    <Text style={styles.bottombttn}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {
                            edit == true && <TouchableOpacity onPress={(e) => {
                                updateProfile();
                                setEdit(!edit)

                            }}>
                                <View style={[styles.cont11, {
                                    width: 153, borderRadius: 8,
                                    marginRight: 16,
                                }]}>
                                    <Text style={styles.bottombttn1}>Save</Text>
                                </View>
                            </TouchableOpacity>
                        }

                        {edit == false &&
                            <TouchableOpacity style={{ width: '100%', }} onPress={(e) => setEdit(!edit)}>
                                <View style={styles.cont4}>
                                    <View style={styles.cont5}>
                                        <Text style={styles.txt2}>CLICK TO EDIT</Text>

                                    </View>
                                </View>
                            </TouchableOpacity>

                        }
                    </View>

                </View>
                :
                null
            }

        </View>
    )
}

export default PersonalInfo

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
    cont2: {
        borderWidth: 1,
        // height: 760,
        width: '90%',
        backgroundColor: 'white',
        elevation: 4,
        alignSelf: 'center',
        borderColor: 'white',
        marginTop: 20,
        borderRadius: 15,
        // margin:20
        marginBottom: 100
    },
    cont3: {
        marginTop: 10

    },
    txt1: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        textAlign: 'center'
    },
    img1: {
        alignSelf: 'center',
        marginTop: 20,
        height: 150,
        width: 150,
        borderRadius: 100
    },
    content: {
        marginBottom: 10
    },
    textInput: {
        height: 56,
        width: '90%',
        borderWidth: 1,
        borderColor: '#79747E',
        borderRadius: 4,
        paddingLeft: 20,
        margin: 10,
        alignSelf: 'center',
        color: 'black'
    },
    cont4: {
        flex: 1,

    },
    cont5: {
        borderWidth: 1,
        height: 44,
        width: '100%',
        backgroundColor: Color.background,
        borderColor: Color.background,
        bottom: 0,
        position: 'absolute'
    },
    txt2: {
        color: 'white',
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        top: 9,
        fontSize: 16
    }, contt: {
        borderWidth: 1,
        width: 153,
        height: 40,
        borderRadius: 8,
        marginLeft: 16,
        borderColor: '#CCCCCC',
        alignItems: 'center',
        justifyContent: 'center',
        top: 7
    },
    bottombttn: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: '#A3A3A3',
        textAlign: 'center',
        // top: 4,
    },
    cont11: {
        width: "90%",
        height: 40,
        borderRadius: 8,
        // marginRight: 16,
        backgroundColor: Color.background,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        top: 8

    },
    bottombttn1: {
        fontFamily: 'Oswald-SemiBold',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        // top: 4
    },
    passwordInputContainer: {
        flexDirection: 'row',
        height: 56,
        width: '90%',
        borderWidth: 1,
        borderColor: '#79747E',
        borderRadius: 4,
        paddingLeft: 20,
        margin: 10,
        alignSelf: 'center',
        color: 'black'
        // paddingRight: 10, // Add paddingRight to adjust for the eye icon
        // color: 'black'
    },
    eyeIcon: {
        width: 24,
        height: 24,
        right: 10,
        top: 15
        // marginRight: 20 // Adjust the marginRight for eye icon spacing
    },
    inpu1: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
        color: 'black'
    },
    input1: {
        height: 56,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        // flexDirection:'row'
    },
    passwordInputContainer1: {
        flexDirection: 'row',
        height: 56,
        width: '90%',
        margin: 10,
        alignSelf: 'center',
        color: 'black'
    },





})