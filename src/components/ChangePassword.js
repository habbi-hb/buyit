/* eslint-disable react-native/no-inline-styles */
import React, {Component, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
  Alert,
} from 'react-native';
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
import {colors, images, api} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const RenderHeader = () => {
  let navigation = useNavigation();
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
let Login = ({route}) => {
  let navigation = useNavigation();
  //const {us} = route.params;
  const [pwd, setpwd] = useState('');
  const [pwdnew, setnewpwd] = useState('');
  const [data, setData] = useState('');
  const [uid, setUid] = useState('');
  const [isLoading, setLoading] = useState(true);

  AsyncStorage.getItem('userData').then((result) => {
    //console.log('result' + result);
    let user = JSON.parse(result);
    setUid(user.user_id);
  });

  const handleChangeTap = (e) => {
    if (pwd == '') {
      Alert.alert('Enter Name');
      return;
    }

    if (pwdnew == '') {
      Alert.alert('Enter Username or email');
      return;
    }

    const uri =
      api.changepassword + uid + '&pass=' + pwd + '&passnew=' + pwdnew;
    console.log(uri);
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(data);
        Alert.alert(json.result);
        setpwd('');
        setnewpwd('');
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  let form = [
    {
      label: 'Enter Password ',
      placeholder: 'Enter Password',
    },

    {
      label: 'Confirm Password ',
      placeholder: 'Confirm Password',
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <RenderHeader />
      <Text
        style={{padding: 10, borderRadius: 1, elevation: 1, marginBottom: 10}}>
        Home <Feather name="chevron-right" size={15} /> Change Password
      </Text>
      <ScrollView
        style={{
          width: '95%',
          height: '86%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{marginRight: '5%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              fontFamily: 'sans-serif',
              color: 'black',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '98%',
          }}>
          <View style={{width: '100%', marginTop: '4%'}}>
            <View style={styles.form}>
              <Text>Enter Password </Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                secureTextEntry={true}
                value={pwd}
                onChangeText={(text) => setpwd(text)}
              />
              <Text>Confirm Password</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                secureTextEntry={true}
                value={pwdnew}
                onChangeText={(text) => setnewpwd(text)}
              />
            </View>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.ORANGE.DEFAULT,
                padding: 10,
                width: '100%',
                marginTop: 30,
              }}
              onPress={handleChangeTap}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.ORANGE.DEFAULT,
                  textAlign: 'center',
                }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              borderRadius: 1,
              elevation: 1,
              alignItems: 'center',
              marginTop: '5%',
              marginBottom: '10%',
            }}>
            <View style={{width: '90%', marginTop: '7%'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}>
                My Account
              </Text>
              {[
                {
                  label: 'Profile Setting',
                  function: () => navigation.navigate('MyProfile'),
                },
                {
                  label: 'My Orders',
                  function: () => navigation.navigate('CheckStatus'),
                },
                {
                  label: 'Change Password',
                  // eslint-disable-next-line no-alert
                  function: () => alert('You are Current on this Screen'),
                },
                {
                  label: 'Logout',
                  function: () => navigation.navigate('HomeScreen'),
                },
              ].map((item, key) => (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: colors.ORANGE.DEFAULT,
                    padding: 10,
                    width: '100%',
                    marginBottom: 20,
                  }}
                  key={key}
                  onPress={item.function}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: colors.ORANGE.DEFAULT,
                      textAlign: 'center',
                    }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {marginTop: '7%'},
  text: {fontSize: 20, fontWeight: 'bold', color: 'white'},
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  font: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  login: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    marginVertical: 10,
  },
  logins: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginVertical: 10,
  },
  form: {
    flexDirection: 'column',
  },
  btns: {
    fontSize: 20,
    color: 'orange',
    marginRight: 15,
  },
  btn: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 5,
    color: '#808080',
  },
  textb: {
    width: '100%',
    height: 44,
    backgroundColor: '#d3d3d3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 13,
  },
  textbb: {
    margin: 15,
  },
  chck: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
