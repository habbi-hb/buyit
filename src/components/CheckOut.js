/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors, images} from './constant';
import AsyncStorage from '@react-native-community/async-storage';
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
import Feather from 'react-native-vector-icons/Feather';
import {api} from './constant';

const RenderHeader = () => {
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
          <Entypo name="menu" size={30} />
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
        <TouchableOpacity style={{position: 'absolute', right: '3%'}}>
          <AntDesign name="shoppingcart" size={25} color="black" />
          <Text style={{color: 'black'}}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CheckOut = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Cname, setCname] = useState('');
  const [Country, setCountry] = useState('');
  const [Address, setAddress] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Zip, setZip] = useState('');
  const [Phone, setPhone] = useState('');
  const [Email, setEmail] = useState('');
  const [Payment, setPayment] = useState('cash');

  const handleCheckOutTap = (e) => {
    AsyncStorage.getItem('userId').then((result) => {
      console.log(result);
      if (Fname == '') {
        Alert.alert('Enter First Name');
        return;
      }

      if (Lname == '') {
        Alert.alert('Enter Last Name');
        return;
      }
      if (Country == '') {
        Alert.alert('Enter Country');
        return;
      }
      if (Address == '') {
        Alert.alert('Enter Address 1');
        return;
      }

      if (Street == '') {
        Alert.alert('Enter Address 2');
        return;
      }
      if (City == '') {
        Alert.alert('Enter City');
        return;
      }
      if (Country == '') {
        Alert.alert('Enter Country');
        return;
      }

      if (Zip == '') {
        Alert.alert('Enter Zip');
        return;
      }
      if (Phone == '') {
        Alert.alert('Enter Phone');
        return;
      }
      if (Email == '') {
        Alert.alert('Enter Email');
        return;
      }

      const uri =
        api.checkout +
        'first_name=' +
        Fname +
        '&last_name=' +
        Lname +
        '&company_name=' +
        Cname +
        '&country=' +
        Country +
        '&address_one=' +
        Address +
        '&address_two=' +
        Street +
        '&city=' +
        City +
        '&state=' +
        State +
        '&zip=' +
        Zip +
        '&phone=' +
        Phone +
        '&email=' +
        Email +
        '&payment=cash&' +
        result;
      console.log(uri);
      fetch(uri)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          Alert.alert(data.result);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    });

    //console.log(uri);
    // if (Fname == '') {
    //   Alert.alert('Enter First Name');
    //   return;
    // }

    // if (Lname == '') {
    //   Alert.alert('Enter Last Name');
    //   return;
    // }
    // if (Country == '') {
    //   Alert.alert('Enter Country');
    //   return;
    // }
    // if (Address == '') {
    //   Alert.alert('Enter Address 1');
    //   return;
    // }

    // if (Street == '') {
    //   Alert.alert('Enter Address 2');
    //   return;
    // }
    // if (City == '') {
    //   Alert.alert('Enter City');
    //   return;
    // }
    // if (Country == '') {
    //   Alert.alert('Enter Country');
    //   return;
    // }

    // if (Zip == '') {
    //   Alert.alert('Enter Zip');
    //   return;
    // }
    // if (Phone == '') {
    //   Alert.alert('Enter Phone');
    //   return;
    // }
    // if (Email == '') {
    //   Alert.alert('Enter Email');
    //   return;
    // }

    // const uri =
    //   api.checkout +
    //   'first_name=' +
    //   Fname +
    //   '&last_name=' +
    //   Lname +
    //   '&company_name=' +
    //   Cname +
    //   '&country=' +
    //   Country +
    //   '&address_one=' +
    //   Address +
    //   '&address_two' +
    //   Street +
    //   '&city=' +
    //   City +
    //   '&state=' +
    //   State +
    //   '&zip=' +
    //   Zip +
    //   '&phone=' +
    //   Phone +
    //   '&email=' +
    //   Email +
    //   '&payment=cash&user_id=25';
    // console.log(uri);
    // fetch(uri)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setData(json);
    //     Alert.alert(data.result);
    //   })
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
  };

  const {totall} = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <RenderHeader />
      <Text
        style={{padding: 10, borderRadius: 1, elevation: 1, marginBottom: 10}}>
        Home <Feather name="chevron-right" size={15} /> Shopping Cart{' '}
        <Feather name="chevron-right" size={15} /> Check Out
      </Text>
      <ScrollView
        style={{
          width: '95%',
          height: '86%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '98%',
          }}>
          <ScrollView>
            <View style={styles.form}>
              <Text>Fist Name *</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'First Name'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setFname(text)}
              />
              <Text>Last Name *</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'Last Name'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setLname(text)}
              />
              <Text>Company Name (Optional)</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'Last Name'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setCname(text)}
              />
              <Text>Country *</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'Pakistan'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setCountry(text)}
              />
              <Text>Street Address *</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'House Number & Street Name'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setAddress(text)}
              />
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'Appartment, Suits, unit etc'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setStreet(text)}
              />
              <Text>Town/City *</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'Town/City'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setCity(text)}
              />
              <Text>State/Country *</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'State/Country'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setState(text)}
              />
              <Text>Postcode/Zip *</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'Zip'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setZip(text)}
              />
              <Text>Phone</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'#Phone'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setPhone(text)}
              />
              <Text>Email</Text>
              <TextInput
                style={[styles.textb, {color: '#808080'}]}
                placeholder={'Email'}
                placeholderTextColor={'#808080'}
                autoCapitilize={false}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{width: '95%', marginTop: '7%'}}>
          <Text
            //onPress={() => TotalCart()}
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderBottomColor: 'lightgray',
            }}>
            Cart Total
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //backgroundColor: 'blue',
              marginTop: 15,
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderBottomColor: 'lightgray',
            }}>
            <Text style={{color: 'black', fontSize: 18}}>Subtotal :</Text>
            <Text style={{color: 'black', fontSize: 18}}>{totall}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 50,
              //backgroundColor: 'red',
            }}>
            <Text style={{color: colors.ORANGE.DEFAULT, fontSize: 18}}>
              Total :
            </Text>
            <Text style={{color: colors.ORANGE.DEFAULT, fontSize: 18}}>
              PKR 4450
            </Text>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: colors.ORANGE.DEFAULT,
              padding: 10,
              width: '100%',
              marginTop: 20,
            }}
            onPress={handleCheckOutTap}>
            <Text
              style={{
                fontSize: 18,
                color: colors.ORANGE.DEFAULT,
                textAlign: 'center',
              }}>
              PROCEED TO CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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

export default CheckOut;
