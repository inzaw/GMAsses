import React from 'react'
import {View, Text, Image} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import {Color} from "../res/Colors"


PageHeader = (props) => (
  <SafeAreaView style = {{backgroundColor: Color.primary}}>
    <View style={{width: '100%', paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Image resizeMode="cover" style={{height:45,width:45}} source={require('../images/logo.png')}/>
    </View>
  </SafeAreaView>
)

export default PageHeader
