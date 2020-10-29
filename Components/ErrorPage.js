import React, {Component} from 'react'
import {View, TouchableOpacity, Image, Text, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types'
import {Color} from '../res/Colors'
import {Images} from '../res/Images'


export default class ErrorPage extends Component {
  /*
  Props
  -onTryAgainClicked
  */

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image tintColor={Color.primary} source={Images.errorIcon} />
        <Text style={{fontFamily: 'SF Pro Text Regular', fontSize: 18, marginTop: 10, color: Color.grey}}>Something Went Wrong</Text>
        <TouchableOpacity onPress={this.props.onTryAgainClicked}>
          <Text style={{fontFamily: 'SF Pro Text Regular', fontSize: 15, color: Color.primary}}>Please try again later</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

ErrorPage.propTypes = {
  onTryAgainClicked: PropTypes.func.isRequired,
}
