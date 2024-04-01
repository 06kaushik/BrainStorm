import React from "react";
import { Text, View } from 'react-native'
import Skeleton from './index'

const DashSkeleton = () => {

    return (
        <View style={{ flex: 1, alignSelf: 'center', marginTop: 20 }}>
            <View style={{justifyContent:'center'}}>
                <Skeleton height={130} width={328} style={{ margin: 10,borderRadius:8,}} />
                <Skeleton height={104} width={104} style={{ borderRadius: 100,position:'absolute',left:20}} />

            </View>
            <Skeleton height={188} width={328} style={{ margin: 10,borderRadius:8}} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Skeleton height={174} width={156} style={{ margin: 10,borderRadius:8 }} />
                <Skeleton height={174} width={156} style={{ margin: 10,borderRadius:8 }} />

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Skeleton height={174} width={156} style={{ margin: 10,borderRadius:8 }} />
                <Skeleton height={174} width={156} style={{ margin: 10,borderRadius:8 }} />

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <Skeleton height={174} width={156} style={{ margin: 10,borderRadius:8 }} />
                <Skeleton height={174} width={156} style={{ margin: 10,borderRadius:8 }} />

            </View>

        </View>
    )
}

export default DashSkeleton