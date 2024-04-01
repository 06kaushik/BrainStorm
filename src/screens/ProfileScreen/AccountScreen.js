import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import images from "../../component/images";
import { COLORS } from "../../component/GlobalStyle";
import axios from "axios";
import Color from "../../Theme/Color";


const Account = ({ navigation }) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [edit, setEdit] = useState(false)
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);


    //////// UPDATE PASSWORD /////////

    const getUpdatePassword = async () => {
        let body = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }
        try {
            const resp = await axios.post('/learner/changePassword', body)
            // console.log('response from update password', resp?.data?.message);
            ToastAndroid.show(resp?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        } catch (error) {
            // console.log('error from update password', error);
            ToastAndroid.show(error?.response?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM);
        }
    }

    const toggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisible(!currentPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };




    return (

        <View style={style.main}>

            <View style={style.container}>
                <View style={style.cont}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={style.img} source={images.back} />
                    </TouchableOpacity>
                    <Text style={style.txt}> Account Settings</Text>
                </View>
            </View>
            <ScrollView>
                <View>
                    <View style={style.inputContainer}>
                        <Text style={style.txt1}>Current Password</Text>
                        <View style={style.passwordInputContainer}>
                            <TextInput
                                editable={edit}
                                placeholder="Enter Current Password"
                                placeholderTextColor={'grey'}
                                onChangeText={setCurrentPassword}
                                value={currentPassword}
                                secureTextEntry={!currentPasswordVisible}
                                style={style.input}
                            />
                            <TouchableOpacity onPress={toggleCurrentPasswordVisibility}>
                                {!edit === false ?
                                    <Image source={currentPasswordVisible ? images.eye : images.eyeclose} style={style.eyeIcon} />
                                    :
                                    null
                                }
                            </TouchableOpacity>
                        </View>

                        <Text style={style.txt1}>New Password</Text>
                        <View style={style.passwordInputContainer}>
                            <TextInput
                                editable={edit}
                                placeholder="Enter New Password"
                                placeholderTextColor={'grey'}
                                onChangeText={setNewPassword}
                                value={newPassword}
                                secureTextEntry={!newPasswordVisible}
                                style={style.input}
                            />
                            <TouchableOpacity onPress={toggleNewPasswordVisibility}>
                                {!edit === false ?
                                    <Image source={newPasswordVisible ? images.eye : images.eyeclose} style={style.eyeIcon} />
                                    :
                                    null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 42 }}>
                            {edit == true &&
                                <TouchableOpacity onPress={() => setEdit(!edit)}>
                                    <View style={style.contt}>
                                        <Text style={style.bottombttn}>CANCEL</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            {
                                edit == true && <TouchableOpacity onPress={(e) => {
                                    getUpdatePassword();
                                    setEdit(edit)

                                }}>
                                    <View style={[style.cont11, {
                                        width: 153, borderRadius: 8,
                                        marginRight: 16,
                                    }]}>
                                        <Text style={style.bottombttn1}>SAVE</Text>
                                    </View>
                                </TouchableOpacity>
                            }

                            {edit == false &&
                                <TouchableOpacity style={{ width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }} onPress={(e) => setEdit(!edit)}>
                                    <View style={style.cont1}>
                                        <Text style={style.txt2}>EDIT</Text>
                                    </View>
                                </TouchableOpacity>}
                        </View>

                    </View>
                </View>
            </ScrollView>


        </View>

    )
}


export default Account

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
        marginTop: 16

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
    input: {
        height: 45,
        width: '90%',
        alignSelf: 'center',
    },
    inputContainer: {

    },
    txt1: {
        marginLeft: 16,
        color: 'black',
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        marginTop: 20
    },
    cont1: {
        borderWidth: 1,
        height: 44,
        width: '90%',
        // marginTop: 30,
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: Color.background,
        borderColor: Color.background
    },
    txt2: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        top: 9
    },
    contt: {
        borderWidth: 1,
        width: 153,
        height: 40,
        borderRadius: 8,
        marginLeft: 16,
        borderColor: '#CCCCCC'
        , alignItems: 'center', justifyContent: 'center'
    },
    bottombttn: {
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
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
        justifyContent: 'center'
    },
    bottombttn1: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Inter-Bold',
        textAlign: 'center',
        // top: 4
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        height: 45,
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 8,
        borderColor: '#CCCCCC',
        paddingLeft: 20,
        // paddingRight: 10, // Add paddingRight to adjust for the eye icon
        // color: 'black'
    },
    eyeIcon: {
        width: 24,
        height: 24,
        marginRight: 10 // Adjust the marginRight for eye icon spacing
    }
})