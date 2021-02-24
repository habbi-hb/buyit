import React, {useRef} from 'react';
import {View, Button, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import login from './login';
import signup from './signup';
const initialLayoutWidth = {width: Dimensions.get('window').width};
const initialLayoutHeight = {width: Dimensions.get('window').height};
const Tab = createMaterialTopTabNavigator();
const AccountScreen = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'orange',
        inactiveTintColor: 'gray',
        indicatorStyle: {
          backgroundColor: 'orange',
        },
        showLabel: true,
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen name="Sign In" component={login} />
      <Tab.Screen name="Register" component={signup} />
    </Tab.Navigator>
  );
};

export default AccountScreen;
