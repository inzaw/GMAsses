import React from 'react'
import {View,Text} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import {Color} from "../res/Colors"
import PropTypes from 'prop-types';


PageHeader = (props) => (
  <SafeAreaView style={{backgroundColor: Color.primary}}>
    <View style={{width: '100%',paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color:Color.white, fontSize: 18, fontFamily: 'SF Pro Text Regular'}} numberOfLines={1}>{props.title}</Text>
    </View>
  </SafeAreaView>
)


PageHeader.propTypes = {
  title: PropTypes.string,
}

export default PageHeader
