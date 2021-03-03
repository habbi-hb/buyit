/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import tabsview from './tabsview';
import RBSheet from 'react-native-raw-bottom-sheet';
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
  ActivityIndicator,
  Modal,
  ToastAndroid,
  TouchableHighlight,
} from 'react-native';
import {images, colors} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {CheckBox, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import {api, sliderpic, featuredslider, slider, allproduct,  Recent, shop} from './constant';

import BottomAccount from './BottomAccount';

const initialLayout = {width: Dimensions.get('window').width};
const initialLayoutHeight = {width: Dimensions.get('window').height};




const Header = () => {
  const refRBSheetBottom = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  let navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refRBSheet, setrefRBSheet] = useState(refRBSheetBottom);
  const [tex, setText] = useState('username');
  const [pwd, setPwd] = useState(' ');
  // const tex = 'username';
  // const pwd = 'password';
  useEffect(() => {
    fetch(
      'https://thecodeditors.com/test/buy_it/api-user-login.php?email=' +
        tex +
        '&password=' +
        pwd,
      //'http://thecodeditors.com/test/buy_it/api-user-login.php?email=sameershk819@gmail.com&password=passcode1212',
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [tex, pwd]);

  //AsyncStorage.getItem('userId').then((result) => console.log(result));

  //console.log(tex);
  //console.log(pwd);
  //console.log(data.Data);

  return (
    <View style={{height: '10%'}}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 400,
                height: Dimensions.get('window').height * 0.98,
              }}>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#469FA6'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </Modal>

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
            // onPress={() => navigation.navigate('CategoriesList')}
            onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>
        <Image source={images.logo} style={{height: 30, width: '30%'}} />
        <Text
          style={{
            position: 'absolute',
            right: '-0.5%',
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
          25
        </Text>
        <TouchableOpacity
          style={{position: 'absolute', right: '3%'}}
          onPress={() => navigation.navigate('Cart')}
         >
          <BottomAccount refRBSheet={refRBSheet} />

          <AntDesign name="shoppingcart" size={40} />
          <Text>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};




const App = () => {
    let navigation = useNavigation();
  //const {ch} = route.params;
  const screenHeight = Dimensions.get('window').height;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header />
      <View style={{height: screenHeight}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign:'center', padding: 10, marginLeft: 10, color:'#5b5e5c'}}>
            Dashboard
          </Text>
        <ScrollView style={{marginTop: 5, marginBottom: 100}}>
        
       
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
            
            justifyContent:'space-evenly'
          }}>
            <TouchableOpacity style={{padding: 10, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            width: 150,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,
            }}
             onPress={() => navigation.navigate('MyProfile')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
            <Icon style={{color:'orange', fontSize: 50 }} active name="profile" type="AntDesign" /> 
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Update Profile</Text>
            </View>


            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, width: 150, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,}}
            onPress={() => navigation.navigate('CheckStatus')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
            <Icon style={{color:'orange', fontSize: 50 }} active name="briefcase" type="Entypo" /> 
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>my Order</Text>
            </View>


            </TouchableOpacity>
         
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '3%',
            
            justifyContent:'space-evenly'
          }}>
            <TouchableOpacity style={{padding: 10, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            width: 150,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,
            }}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
            <Icon style={{color:'orange', fontSize: 50 }} active name="security" type="MaterialCommunityIcons" />  
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Change Password</Text>
            </View>


            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, width: 150, backgroundColor:'white', alignItems:'center',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,}}
            onPress={() => navigation.navigate('HomeScreen2')}
          >
            <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
            <Icon style={{color:'orange', fontSize: 50 }} active name="logout" type="AntDesign" /> 
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.text}>Log out</Text>
            </View>


            </TouchableOpacity>
         
        </View>
        
       
                 
                    
        </ScrollView>
      </View>
    </>
  );
};

const {width} = Dimensions.get('window');

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
  text: {
      color: 'orange',
      textAlign:'center',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
