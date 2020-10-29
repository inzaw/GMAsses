import React from 'react'
import {View, Text, Image} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import {Color} from "../res/Colors"


PageHeader = (props) => (
  <SafeAreaView style = {{backgroundColor: Color.black}}>
    <View style={{width: '100%', paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Image resizeMode="cover" style={{height:30,width:30}} source={require('../images/logo.png')} tintColor={Color.white}/>
    </View>
  </SafeAreaView>
)

export default PageHeader
