import React from "react";
import { FONTS, COLORS, MARGIN, FlexStyle, SIZE } from "../../component/GlobalStyle";
import { StyleSheet } from 'react-native'
import Color from "../../Theme/Color";


const Styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white'
  },
  cont: {
    height: 64,
    width: '100%',
    top: 0,
    // borderWidth:1,
    backgroundColor: '#5ED4F2',
    borderColor: '#DDDDDD',

    elevation: 2,
  },
  cont1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 18,
    marginRight: 18,
    marginTop: 20
  },
  img: {
    height: 25,
    width: 25
  },
  cont2: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: Color.background,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    width: '90%',
    overflow: 'hidden',
  },
  cont3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  cont4: {
    flexShrink: 1,
    marginLeft: 8
  },
  avatar: {
    // marginTop: 3,
    height: 120,
    width: 120,
    borderRadius: 100
  },
  txt: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    flexShrink: 1,
    marginRight: 8,
  },
  txt1: {
    color: 'black',
    fontFamily: 'Inter-Light',
    marginVertical: 1,
    flexShrink: 1,
  },
  cont5: {
    // flex:1,
    borderWidth: 1,
    // height:188,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    // elevation:2,
    borderColor: '#D6BFFF',
    backgroundColor: '#D6BFFF'
  },
  cont6: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 10
  },
  txt2: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: 16

  },
  txt3: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold'

  },
  cont7: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
    marginRight: 16,
    marginTop: 10
  },


  txt4: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    marginTop: 5
  },
  txt5: {
    color: 'black',
    fontFamily: 'Inter-SemiBold'
  },
  txtCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 18, margin: 3
  },
  cont9: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 18,
    marginRight: 18,
  },
  txt6: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Bold'
  },
  txt7: {
    color: Color.background,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14

  },
  cont10: {
    // flexDirection: 'row',
    width: '65%',
    marginLeft: 16,
    marginTop: 10,
    // borderWidth:1
  },
  txt8: {
    color: 'black'
  },
  flatListContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  flatListContent: {
    flexGrow: 1,
  },
  cont11: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    height: 40,
    width: '75%',
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
  cont12: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'rgba(33, 150, 243, 0.25)',
    backgroundColor: 'rgba(33, 150, 243, 0.25)'

  },
  cont13: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'rgba(209,235,211,255)',
    backgroundColor: 'rgba(209,235,211,255)'

  },
  cont14: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'rgba(255, 193, 7, 0.25)',
    backgroundColor: 'rgba(255, 193, 7, 0.25)'

  },
  mtxt: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textAlign: 'center'
  },
  cont15: {
    marginTop: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 20
  },
  imgl: {
    alignSelf: 'center',
    marginTop: 10
  },
  input: {
    height: 45,
    width: '90%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderRadius: 8,
    // margin: 10,
    // paddingLeft: 20,
    color: 'black'

  },
  txt10: {
    color: 'black',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    marginLeft: 18
  },
  cont16: {
    borderWidth: 1,
    height: 48,
    width: '90%',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 25,
    backgroundColor: Color.background,
    borderColor: Color.background

  },
  txt11: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center',
    top: 12
  },
  inputContainer: {
    height: 45,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 10,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'black',
    marginLeft: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    top: 9

  },
  notificationBadge: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: 'absolute',
    top: -8,
    right: -8,
    flexDirection: 'row',
    alignItems: 'center',
    // width:29
  },
  notificationText: {
    color: Color.background,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },


})

export default Styles