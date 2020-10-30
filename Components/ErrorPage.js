import React, {Component} from 'react'
import {View, TouchableOpacity, Image, Text, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types'
import {Color} from '../res/Colors'
import {Images} from '../res/Images'
import {ErrorPageStr} from '../res/Strings'


export default class ErrorPage extends Component {
  /*
  Props
  -onTryAgainClicked
  */

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image tintColor={Color.primary} source={Images.errorIcon} />
        <Text style={{fontFamily: 'SF Pro Text Regular', fontSize: 18, marginTop: 10, color: Color.grey}}>{ErrorPageStr.Title}</Text>
        <TouchableOpacity onPress={this.props.onTryAgainClicked}>
          <Text style={{fontFamily: 'SF Pro Text Regular', fontSize: 15, color: Color.primary}}>{ErrorPageStr.Subtitle}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

ErrorPage.propTypes = {
  onTryAgainClicked: PropTypes.func.isRequired,
}
