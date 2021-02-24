import React, {Component, useEffect, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {colors, images} from './constant';
import Feather from 'react-native-vector-icons/Feather';
import {api} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import HeaderMain from './HeaderMain';
// npm i native-base
import {Card, CardItem} from 'native-base';
// npm i react-native-elements
import {Icon} from 'react-native-elements';
import ProductDetailComponent from './ProductDetailComponent';

const ProductDetails = ({route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [usr, setUsr] = useState('');
  //const [Pid, setPid] = useState('');
  let Pid = '';
  const {picture, pid} = route.params;
  const [cart, setCart] = useState([]);
  const [ifLoading, setIsLoading] = useState(false);
  // let [quan, setQuan] = useState(num);

  //};
  useEffect(() => {
    setIsLoading(true);
    const uri = api.productdetails + 'id=' + pid;
    console.log(pid);
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);

        //console.log(data);
        // Alert.alert(data.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [pid]);

  // const IncQuan = () => {
  //   setQuan(quan + 1);
  //   console.log(quan);
  // };
  // const DecQuan = () => {
  //   setQuan(quan - 1);
  //   console.log(quan);
  // };

  // const FinQuan = () => {
  //   ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
  //   //setQuan(quan);
  //   //console.log(quan);
  // };
  //  let navigation = useNavigation();

  let navigation = useNavigation();
  // console.log('naviiiii', navigation);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE,
      }}>
      <View>
        <View>
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
                onPress={() => navigation.openDrawer}
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
      </View>

      <FlatList
        data={data.Data}
        renderItem={({item}) => {
          const AddToCarrt = (e) => {
            //useEffect(() => {
            //ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
            //let [number, setNumber] = useState(0);
            let number = '1';
            ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);

            AsyncStorage.getItem('userData').then((result) => {
              console.log('result' + result);
              let user = JSON.parse(result);
              const uri =
                api.addcart +
                '&product_id=' +
                item.pro_id +
                '&quantity=1&user_id=' +
                user.user_id;
              console.log(uri);
              fetch(uri)
                .then((response) => response.json())
                .then((json) => {
                  setCart(json);
                  //Alert.alert(data.result);
                  //console.log(data);
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
            });
          };

          //Pid = item.pro_id;
          return (
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                width: Dimensions.get('window').width,
              }}>
              <TouchableOpacity>
                <Card
                  style={{
                    marginTop: 10,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    alignItems: 'center',
                  }}>
                  <CardItem>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          marginBottom: 10,
                        }}>
                        {item.sub_catname}
                      </Text>

                      <Image
                        style={{
                          width: Dimensions.get('window').width * 0.8,
                          height: Dimensions.get('window').height * 0.4,
                        }}
                        // onPress={() => navigation.navigate('HomeScreen')}
                        source={{
                          uri: picture,
                        }}
                      />
                    </View>
                  </CardItem>
                  <CardItem>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <TouchableOpacity>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={{fontWeight: 'bold'}}>
                            {item.pro_name}
                          </Text>
                          <Text style={{fontWeight: 'bold'}}>
                            PKR {item.pro_price}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.logins}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity>
                            {/* onPress={() => DecQuan()}> */}
                            <Icon
                              name="minus"
                              type="font-awesome"
                              size={24}
                              color="orange"
                            />
                          </TouchableOpacity>
                          <Text style={styles.btns}></Text>
                          <TouchableOpacity>
                            {/* onPress={() => IncQuan()} */}
                            <Icon
                              name="plus"
                              type="font-awesome"
                              size={24}
                              color="orange"
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          style={styles.login}
                          onPress={AddToCarrt}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              alignContent: 'center',
                              color: '#000',
                            }}>
                            ADD
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>Details</Text>
                        <Text style={{fontWeight: 'bold', marginTop: 10}}>
                          {item.pro_des}+{item.pro_id}
                        </Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
export default ProductDetails;

const styles = StyleSheet.create({
  subheading: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  cardHeader: {
    backgroundColor: '#6a90eb',
  },
  footer: {
    width: '100%',
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btns: {
    fontSize: 20,
    color: 'orange',
    marginRight: 20,
    marginLeft: 20,
  },
  logins: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    marginVertical: 10,
  },
  login: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: 'orange',
    marginVertical: 10,
    borderRadius: 20,
    width: 100,
  },
});
