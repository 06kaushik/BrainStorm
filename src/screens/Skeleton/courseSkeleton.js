import React from "react";
import { Text, View } from 'react-native'
import Skeleton from './index'

const CourseSkeleton = () => {

    return (
        <View style={{ flex: 1, alignSelf: 'center', marginTop: 20 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Skeleton height={174} width={156} style={{ margin: 10, borderRadius: 8 }} />
                <Skeleton height={174} width={156} style={{ margin: 10, borderRadius: 8 }} />
                
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Skeleton height={174} width={156} style={{ margin: 10, borderRadius: 8 }} />
                <Skeleton height={174} width={156} style={{ margin: 10, borderRadius: 8 }} />
                
            </View>
            

        </View>
    )
}

export default CourseSkeleton