import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,

} from 'react-native';

import {TextInput} from 'react-native-gesture-handler';
import {CheckBox} from 'native-base';
import {Icon} from 'react-native-elements';
import {api} from './constant';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from "./Loader";
import { Checkbox } from 'react-native-paper';

function login() {
  
  let navigation = useNavigation();
  const [Checkbox, setCheckBox] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setInfo] = useState([]);
  const [loader, setloader] = React.useState(true);
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');
  const [pop, setPop] = useState('');

  const clickcheckbox = () => {
    setCheckBox(true);
  }

  const handleLoginTap = (e) => {
    setloader(true);
    if (usr == '') {
      Alert.alert('Enter Username or email');
      return;
    }
    if (pwd == '') {
      Alert.alert('Enter Password');
      return;
    }

    const uri = api.login + 'email=' + usr + '&password=' + pwd;
    console.log(uri);
    // fetch(uri)
    //   .then((response) => {
    //     response.json();
    //     //setIsLoading(true);
    //   })
    //   .then((json) => {
    //     console.log('login', json);
    //  AsyncStorage.setItem('userData', json.Data[0].user_id);
    //  AsyncStorage.setItem('userId', json.Data[0].user_id).then(() =>
    //     AsyncStorage.getItem('userId').then((result) => console.log(result)),
    // );
    //     // console.log();
    //     // setData(json);
    //     // setIsLoading(false);
    //     setUsr('');
    //     setPwd('');
    //     // Alert.alert(data.result);
    //   })
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        console.log('login', json);
        //console.log('login', json);
        setPop(json.result);

        //console.log('check' + pop);
        setInfo(json);
        //Alert.alert(pop);

        //console.log(userInfo);
        Alert.alert("successfully logged in");
        navigation.navigate('userNav');
        setloader(false);
        AsyncStorage.setItem('userData', JSON.stringify(json.Data[0])).then(
          () =>
            AsyncStorage.getItem('userData').then((result) => {
              // console.log(result);
              

              let user = JSON.parse(result);

              // console.log(user.user_id);
            }),
        );

        setUsr('');
        setPwd('');

        //
        //console.log(data.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      setloader(false);
    setPop('');
  };
  

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text>Username Or Email Address</Text>
        <TextInput
          style={[styles.textb, {color: '#808080'}]}
          placeholder={'Name'}
          placeholderTextColor={'#808080'}
          autoCapitilize={false}
          value={usr}
          onChangeText={(text) => setUsr(text)}
        />
        <Text>Password</Text>
        <TextInput
          style={[styles.textb, {color: '#808080'}]}
          placeholder={'Password'}
          placeholderTextColor={'#808080'}
          autoCapitilize={false}
          value={pwd}
          secureTextEntry={true}
          onChangeText={(text) => setPwd(text)}
        />
        <Text>Forgot Your Password?</Text>
        <View style={styles.chck}>
          <CheckBox
            checked={Checkbox}
          onPress={clickcheckbox}
        
            tintColors={{true: '#F15927', false: 'black'}}
            style={{marginLeft: -10}}
          />
          <Text style={{marginLeft: 20, fontWeight: 'bold'}}> Remember Me</Text>
        </View>
        <TouchableOpacity style={styles.login} onPress={handleLoginTap}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              alignContent: 'center',
              color: 'orange',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
                navigation.navigate('Signup');
              }}>
        <Text style={{color: 'orange', fontSize: 18, textAlign:'center', padding: 15}}> Signup! </Text>
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
        <View
          style={{
            borderBottomColor: '#d3d3d3',
            borderBottomWidth: 1,
            paddingTop: 20,
            marginBottom: 20,
          }}
        />
        

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

export default login;
