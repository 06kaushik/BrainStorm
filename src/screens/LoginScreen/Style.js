import React from "react";
import { FONTS, COLORS, MARGIN, FlexStyle, SIZE } from "../../component/GlobalStyle";
import { StyleSheet } from 'react-native'
import Color from "../../Theme/Color";


const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    leftHalf: {
        flex: .4,
        backgroundColor: Color.background,
    },
    rightHalf: {
        flex: .6,
        backgroundColor: Color.background,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,

    },
    headercont: {
        height:72,
        width: '100%',
        bottom:3,
        borderColor: '#DDDDDD',
        elevation: 2,
      },
    mainlogo: {
        alignSelf: 'center',
        marginTop: 30,
        height:180,
        width:280,
        resizeMode:'contain'

    },
    txt: {
        color:COLORS.black,
        marginLeft: 24,
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        marginTop: 12
    },
    txt1: {
        fontFamily: 'Inter-Light',
        fontSize: 16,
        color:COLORS.black,
        fontStyle:'normal',
        fontWeight:'600',
        marginLeft: 24,
        marginTop: 12
    },
    cont1: {
        marginTop: 20


    },
    input: {
        borderWidth: 1,
        borderColor: 'white',
        height: 56,
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 5,
        color: 'black',
        paddingLeft: 20,
        margin: 10

    },
    txt2: {
        color: Color.textcolor,
        alignSelf: 'flex-end',
        fontWeight:'700',
        marginRight: 26,
        fontFamily: 'Inter-Light'
    },
    cont2: {
        borderWidth: 1,
        height: 60,
        width: '90%',
        backgroundColor: Color.buttoncolor,
        borderColor: Color.buttoncolor,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    cont3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt3: {
        color:COLORS.black,
        fontFamily: 'Inter-Bold',
        fontSize: 18, 
        marginTop: 14,
        marginLeft: 24
    },
    arrow: {
        marginRight: 24,
        marginTop: 25,
      
    },
    loader: {
        top: 17
    },
    inputStyle: {
        marginTop: 5,
        marginBottom:5,
        borderWidth: 1,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 5,
        color: 'black',
        borderWidth: 1,
        borderColor: 'white',
        height: 56,
        width: '90%',
        backgroundColor: 'white',
        paddingLeft:16,
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 25,
        alignSelf: "center",
        paddingHorizontal: 10,
        }

})


export default Styles