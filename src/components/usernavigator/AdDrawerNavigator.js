import React, {useEffect, useState} from 'react';
import {Button, View, Text, BackHandler, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';


import UserHomeScreen from '../UserHomeScreen'
//import Admindashboard from '../Admindashboard';
import AdDrawerContent from './AdDrawerContant';
const Drawer = createDrawerNavigator();

export default function RouteNav1() {
  
  return (
    <Drawer.Navigator initialRouteName="UserHomeScreen" 
     drawerContent={(props) => <AdDrawerContent {...props}  />}>
      <Drawer.Screen name="UserHomeScreen"component={UserHomeScreen}
        options={{
          // drawerIcon: ({focused, color, size}) => (
          //   <Image
          //     source={require('../../asset/Images/icon_dashboard.png')}
          //     style={{marginLeft: 2}}
          //   />
          // ),
          drawerLabel: ({focused, color}) => (
            <Text style={{color: 'black'}}>Dashboard</Text>
          ),
          unmountOnBlur: () => true,
        }}
      />
    </Drawer.Navigator>
  );
}

