import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient';


const Skeleton = ({ width, height, style }) => {


    const translatex = useRef(new Animated.Value(-width)).current;
    useEffect(() => {
        Animated.loop(
            Animated.timing(translatex, {
                toValue: width,
                useNativeDriver: true,
                duration: 1000,
            })
        ).start();

    }, [width])


    return (
        <View
            style={StyleSheet.flatten([{
                width: width,
                height: height,
                backgroundColor: 'rgba(0,0,0,0.12)', overflow: 'hidden'
            }, style
            ])}
        >
            <Animated.View style={{ width: "100%", height: '100%', transform: [{ translateX: translatex }] }}>
                <LinearGradient
                    style={{ width: '100%', height: '100%' }}
                    start={{ x: 1, y: 1 }}
                    colors={["transparent", '#E1E9EE', "transparent"]}
                />

            </Animated.View>

        </View>
    )
}

export default Skeleton;

const styles = StyleSheet.create({})