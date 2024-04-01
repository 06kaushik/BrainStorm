import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation, useIsFocused } from '@react-navigation/native';
import DashBoard from '../screens/DashBoardScreen/DashBoard';
import CourseScreen from '../screens/CourseScreen/CourseScreen';
import Result from '../screens/ResultScreen/Result';
import MainProfile from '../screens/ProfileScreen/MainProfile';
import images from '../component/images';
import { COLORS } from '../component/GlobalStyle';
import Color from '../Theme/Color';

const Tab = createBottomTabNavigator();


const BottomTab = () => {

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarIconStyle: { display: "none" },
            tabBarStyle: { height: 57, backgroundColor: 'white', elevation: 0, },
        }}
        >
            <Tab.Screen name='Home' component={DashBoard} options={{
                tabBarLabel: ({ color, size, focused }) => {
                    return focused ? (
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 2,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: '#F5F6FF',
                        }}>
                            <Image style={{ height: 25, width: 25, tintColor: Color.background, }} source={images.home} />
                            <Text style={{ color: Color.background, fontSize: 12, fontFamily: 'Oswald-Bold', }}>Home</Text>
                        </View>
                    ) :
                        (
                            <View style={{ alignItems: 'center', marginBottom: 2, }}>
                                <Image style={{ height: 25, width: 25, tintColor: 'gray', }} source={images.home} />
                                <Text style={{ color: 'gray', fontSize: 12, fontFamily: 'Oswald-Bold', }}>Home</Text>

                            </View>

                        )
                }
            }} />
            <Tab.Screen name='Courses' component={CourseScreen} options={{
                tabBarLabel: ({ color, size, focused }) => {
                    return focused ? (
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 2,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: '#F5F6FF',
                        }}>
                            <Image style={{ height: 25, width: 25, tintColor: Color.background, }} source={images.book} />
                            <Text style={{ color: Color.background, fontSize: 12, fontFamily: 'Oswald-Bold', }}>Courses</Text>
                        </View>
                    ) :
                        (
                            <View style={{ alignItems: 'center', marginBottom: 2, }}>
                                <Image style={{ height: 25, width: 25, tintColor: 'gray', }} source={images.book} />
                                <Text style={{ color: 'gray', fontSize: 12, fontFamily: 'Oswald-Bold', }}>Courses</Text>
                            </View>
                        )
                }

            }} />
            <Tab.Screen name='Results' component={Result} options={{
                tabBarLabel: ({ color, size, focused }) => {
                    return focused ? (
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 2,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: '#F5F6FF',
                        }}>
                            <Image style={{ height: 25, width: 25, tintColor: Color.background, }} source={images.stats} />
                            <Text style={{ color: Color.background, fontSize: 12, fontFamily: 'Oswald-Bold', }}>Result</Text>
                        </View>
                    ) :
                        (
                            <View style={{ alignItems: 'center', marginBottom: 2, }}>
                                <Image style={{ height: 25, width: 25, tintColor: 'gray', }} source={images.stats} />
                                <Text style={{ color: 'gray', fontSize: 12, fontFamily: 'Oswald-Bold', }}>Result</Text>
                            </View>
                        )
                }

            }} />
            <Tab.Screen name='Profile' component={MainProfile} options={{
                tabBarLabel: ({ color, size, focused }) => {
                    return focused ? (
                        <View style={{
                            alignItems: 'center',
                            marginBottom: 2,
                            borderRadius: 10,
                            borderWidth: 0.4,
                            borderColor: '#F5F6FF',
                        }}>
                            <Image style={{ height: 25, width: 25, tintColor: Color.background, }} source={images.profile} />
                            <Text style={{ color: Color.background, fontSize: 12, fontFamily: 'Oswald-Bold', }}>Profile</Text>
                        </View>
                    ) :
                        (
                            <View style={{ alignItems: 'center', marginBottom: 2, }}>
                                <Image style={{ height: 25, width: 25, tintColor: 'gray', }} source={images.profile} />
                                <Text style={{ color: 'gray', fontSize: 12, fontFamily: 'Oswald-Bold', }}>Profile</Text>
                            </View>
                        )
                }
            }} />

        </Tab.Navigator>
    )
}

export default BottomTab;