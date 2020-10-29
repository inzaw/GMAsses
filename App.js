/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer ,createSwitchNavigator} from "react-navigation";
import {SplashScreen,Homepage} from './Containers'
import NavigationService from './NavigationService';

export default class App extends Component<Props> {
  render() {
    return (
        <AppContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
    );
  }
}

  const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Homepage: Homepage,
  });

  AppContainer = createAppContainer(InitialNavigator);
