import React from "react";
import { View, Image, TouchableOpacity } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "./DrawerContent";
import BottomTab from "./BottomStack";


const Drawer = createDrawerNavigator();


const DrawerNavigation = () => {

    return (

        <Drawer.Navigator screenOptions={{ headerShown: false, }} drawerContent={props => <DrawerContent {...props} />} >

            <Drawer.Screen name="Home1" component={BottomTab} />

        </Drawer.Navigator>

    )
}

export default DrawerNavigation;