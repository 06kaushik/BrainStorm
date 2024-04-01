import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from "./DrawerStack";
import Account from "../screens/ProfileScreen/AccountScreen";
import PersonalInfo from "../screens/ProfileScreen/PersonalInfo";
import LearnScreen from "../screens/CourseScreen/LearnScreen";
import LearnVocabulary from "../screens/ResultScreen/LearnAssess";
import SkillScreens from "../screens/DashBoardScreen/SkillScreen";
import NotificationScreen from "../screens/DashBoardScreen/Notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import VirtualScreen from "../screens/VirtualScreen/VirtualScreen";

const Stack = createStackNavigator();





const HomeStack = ({ }) => {
    const navigation = useNavigation()

    useEffect(() => {

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage,
            );
            navigation.navigate('Notification')

        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage,
                    );
                    navigation.navigate('Notification')


                }

            });

        messaging().onMessage(async remoteMessage => {
            console.log('notification on foreground', remoteMessage);



        })

    }, [])

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Home" component={DrawerNavigation} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Personal" component={PersonalInfo} />
            <Stack.Screen name="Learn" component={LearnScreen} />
            <Stack.Screen name="Vocabulary" component={LearnVocabulary} />
            <Stack.Screen name="AllSkills" component={SkillScreens} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Virtual" component={VirtualScreen} />









        </Stack.Navigator>
    )
}
export default HomeStack;