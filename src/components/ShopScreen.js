import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Avatar} from 'react-native-paper';
import ShopComponent from './ShopComponent';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {colors, images} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {api} from './constant';

const RenderHeader = () => {
  let navigation = useNavigation();
  //console.log('navigation', navigation);
  return (
    <View style={{height: '10%'}}>
      <View
        style={{
          width: '95%',
          height: 90,
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <TouchableOpacity>
          <Entypo
            name="menu"
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>
        <Image source={images.logo} style={{height: 30, width: '30%'}} />
        <Text
          style={{
            position: 'absolute',
            right: '-1%',
            top: '20%',
            fontSize: 10,
            backgroundColor: colors.ORANGE.DEFAULT,
            borderRadius: 50,
            zIndex: 12,
            height: 18,
            width: 18,
            textAlign: 'center',
            paddingTop: 2,
            color: 'white',
          }}>
          23
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', right: '3%'}}
          onPress={() => navigation.navigate('Cart')}>
          <AntDesign name="shoppingcart" size={25} color="black" />
          <Text style={{color: 'black'}}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const ShopScreen = () => {
  let navigation = useNavigation();
  //const {sub_id} = route.params;
  //const {cat} = route.params;
  //console.log('params', sub_id);
  useEffect(() => {
    async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log('data', JSON.parse(userData));
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: colors.WHITE,
      }}>
      <RenderHeader />

      <Text
        style={{
          padding: 10,
          borderRadius: 1,
          elevation: 1,
          marginBottom: 10,
        }}>
        Home <Feather name="chevron-right" size={15} /> Shop
      </Text>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          {/* <CardComponent subId={sub_id} cat={cat} /> */}
          <ShopComponent />
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopScreen;
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
