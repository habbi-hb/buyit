/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';
import {CheckBox} from 'native-base';
import {Icon} from 'react-native-elements';
import {api} from './constant';
function signup() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSignupTap = (e) => {
    if (name == '') {
      Alert.alert('Enter Name');
      return;
    }

    if (usr == '') {
      Alert.alert('Enter Username or email');
      return;
    }
    if (pwd == '') {
      Alert.alert('Enter Password');
      return;
    }

    const uri =
      api.signup +
      'name=' +
      name +
      '&email=' +
      usr +
      '&pass=' +
      pwd +
      '&phone=1234&image&date=22-12-2020&role=admin&status=1';
    console.log(uri);
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(data);
        Alert.alert(data.result);
        setName('');
        setPwd('');
        setUsr('');
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text>Your Name *</Text>
        <TextInput
          style={[styles.textb, {color: '#808080'}]}
          placeholder={'Name'}
          placeholderTextColor={'#808080'}
          autoCapitilize={false}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text>Your Email Address *</Text>
        <TextInput
          style={[styles.textb, {color: '#808080'}]}
          placeholder={'Email'}
          placeholderTextColor={'#808080'}
          autoCapitilize={false}
          value={usr}
          onChangeText={(text) => setUsr(text)}
        />
        <Text>Password *</Text>
        <TextInput
          style={[styles.textb, {color: '#808080'}]}
          placeholder={'Password'}
          placeholderTextColor={'#808080'}
          autoCapitilize={false}
          secureTextEntry={true}
          value={pwd}
          onChangeText={(text) => setPwd(text)}
        />

        <View style={styles.chck}>
          <CheckBox color="#d3d3d3" backgroundColor="#d3d3d3" />
          <Text style={{paddingLeft: 15}}>I agree to the </Text>
          <Text style={{textDecorationLine: 'underline'}}>
            privacy policy *
          </Text>
        </View>
        <TouchableOpacity style={styles.login} onPress={handleSignupTap}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.btns}>SIGN UP</Text>
            <Icon
              name="arrow-right"
              type="font-awesome"
              size={24}
              color="orange"
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#d3d3d3',
            borderBottomWidth: 1,
            paddingTop: 20,
            marginBottom: 20,
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: '#808080', padding: 15}}> or sign in with </Text>
        </View>

        <TouchableOpacity
          style={styles.logins}
          onPress={() => {
            Alert.alert('login with Google');
          }}>
          <Text style={styles.btn}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logins}
          onPress={() => {
            Alert.alert('login With Facebook');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="facebook-f"
              type="font-awesome"
              size={24}
              color="blue"
            />
            <Text style={styles.btn}>Login with Facebook</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
    margin: 20,
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

export default signup;
