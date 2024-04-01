import React from "react";
import { FONTS, COLORS, MARGIN, FlexStyle, SIZE } from "../../component/GlobalStyle";
import { StyleSheet } from 'react-native'
import Color from "../../Theme/Color";


const styles = StyleSheet.create({
    main: {
        flex: 1,
        position: 'relative'
    },
    leftHalf: {
        flex: 1,
        backgroundColor: Color.background,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    rightHalf: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
    },
    img: {
        height: 30,
        width: 30
    },
    cont: {
        flexDirection: 'row',
        marginLeft: 16,
        marginTop: 20

    },
    txt: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        marginLeft: 20

    },
    cont1: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 60

    },
    img1: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        borderRadius: 100
    },
    cont2: {
        alignSelf: 'center',
        marginTop: 8
    },
    nametxt: {
        color: 'black',
        fontFamily: 'Inter-Bold',
        fontSize: 16
    },
    cont3: {
        borderWidth: 1,
        height: 113,
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 15,
        // bottom: 250,
        backgroundColor: 'white',
        borderColor: 'white',
        elevation: 2,
        top: -50
    },
    cont4: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginLeft:18,
        // marginRight:18
        margin: 3,
        marginTop: 8
    },
    img2: {
        height: 25,
        width: 25
    },
    txt1: {
        textAlign: 'center',
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter-Light'

    },
    txt2: {
        textAlign: 'center',
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter-Bold',
        left: 15
    },
    cont5: {
        borderWidth: 1,
        height: 60,
        width: '90%',
        alignSelf: 'center',
        marginTop: 90,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: 'white',
        elevation: 4
    },
    cont6: {
        borderWidth: 1,
        height: 60,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: 'white',
        elevation: 4

    },
    cont7: {
        flex: 1,
        //    alignSelf:'center'
        alignItems: 'center'

    },
    cont8: {
        borderWidth: 1,
        height: 48,
        width: '90%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Color.background,
        borderRadius: 15,
        borderColor: Color.background,
        marginBottom: 10
    },
    txt3: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        top: 11
    },
    cont9: {
        flexDirection: 'row'

    },
    img3: {
        height: 20,
        width: 20,
        tintColor: 'grey',
        marginLeft: 18,
        marginTop: 18
    },
    txt4: {
        color: '#999999',
        fontSize: 16,
        fontFamily: 'Inter-Bold'
    },
    txt5: {
        color: '#999999',
        fontSize: 14,
        fontFamily: 'Inter-SemiBold'
    }




})

export default styles