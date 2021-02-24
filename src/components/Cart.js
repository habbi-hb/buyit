/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {colors, images} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {api, cartimage} from './constant';
import AsyncStorage from '@react-native-community/async-storage';
import login from './login';

const RenderHeader = () => {
  let navigation = useNavigation();
  console.log(navigation);
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
            onPress={() => navigation.toggleDrawer()}
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
        <TouchableOpacity style={{position: 'absolute', right: '3%'}}>
          <AntDesign name="shoppingcart" size={25} color="black" />
          <Text style={{color: 'black'}}>cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
let Login = () => {
  let navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  let [total, setTotal] = useState(0);

  const TotalCart = () => {
    //setTotal();
    console.log('price' + price);
  };
  const DeleteCart = (a) => {
    //useEffect(() => {
    console.log('a' + a);
    const uri = api.deleteitem + a;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        //Alert.alert(data.result);
        // console.log('data' + data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  let [totalQuantity, setTotalQuantity] = useState(0);

  let [totalPrice, setTotalPrice] = useState(0);

  let price = 0;
  //let catId = '0';
  //let [cartId, setCartId] = useState('');
  const [ifLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userData').then((result) => {
      console.log('result' + result);
      let user = JSON.parse(result);
      const uri = api.cartshow + user.user_id;
      console.log(uri);
      setIsLoading(true);

      fetch(uri)
        .then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          setData(json);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    });
  }, []);

  //
  //   useEffect(() => {
  //     setIsLoading(true);
  //     AsyncStorage.getItem('userData').then((result) => {
  //       //console.log('result' + result);
  //       let user = JSON.parse(result);
  //       const uri = api.cartshow + user.user_id;
  //       console.log(uri);
  //       //Alert.alert('yhn araha hai');
  //       fetch(uri)
  //         .then((response) => response.json())
  //         .then((json) => {
  //           setIsLoading(false);
  //           setDataa(json);
  //           //let user = '';
  //           //console.log(dataa);
  //           Alert.alert('refresh hwa');
  //         })
  //         .catch((error) => console.error(error))
  //         .finally(() => setLoading(false));
  //     });
  //   }, []);
  // };

  if (ifLoading) {
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
      <RenderHeader />
      <Text
        style={{padding: 10, borderRadius: 1, elevation: 1, marginBottom: 10}}>
        Home <Feather name="chevron-right" size={15} /> Shopping Cart
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
          <FlatList
            // onRefresh={refre}
            // refreshing={isLoading}
            data={data.Data}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View
                  onPress={setTotalPrice((price += parseInt(item.pro_price)))}
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
                    <TouchableOpacity onPress={() => DeleteCart(item.cart_id)}>
                      <Icon
                        name="close"
                        type="AntDesign"
                        style={{fontSize: 18, marginLeft: 'auto'}}
                        onPress={() => navigation.openDrawer()}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 15,
                      }}>
                      {/* {dataa.map((item) => {
                      console.log(dataa);
                      setTotalQuantity((totalQuantity += item.qty));
                      setTotalPrice((totalPrice += item.qty * item.pro_price));
                    })} */}
                      <Image
                        source={{uri: cartimage + item.image_name}}
                        style={{height: 70, width: 70, marginRight: 10}}
                      />
                      <Text
                        style={{color: 'black', fontSize: 18, paddingTop: 15}}>
                        {item.pro_name}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: 10,
                        textTransform: 'capitalize',
                      }}>
                      Shipping charges according to distance
                    </Text>
                    <Text
                      style={{
                        color: colors.ORANGE.DEFAULT,
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: 10,
                        textTransform: 'capitalize',
                      }}>
                      View Shipping Charges of vender
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 10,
                      }}>
                      PKR {item.pro_price}
                    </Text>

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 10,
                      }}>
                      30
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: 'lightgray',
                        width: '30%',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingVertical: 8,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginVertical: 10,
                      }}>
                      <TouchableOpacity>
                        <Feather name="minus" />
                      </TouchableOpacity>
                      <Text>{item.qty}</Text>
                      <TouchableOpacity>
                        <Feather name="plus" />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        color: colors.ORANGE.DEFAULT,
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 10,
                        marginBottom: 20,
                      }}>
                      PKR 700
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            width: '100%',
            height: 320,
            alignSelf: 'center',
            borderRadius: 1,
            elevation: 1,
            alignItems: 'center',
            marginTop: '2%',
            marginBottom: '10%',
          }}>
          <View style={{width: '90%', marginTop: '7%'}}>
            <Text
              onPress={() => TotalCart()}
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
                marginTop: 15,
                borderBottomWidth: 1,
                paddingBottom: 15,
                borderBottomColor: 'lightgray',
              }}>
              <Text style={{color: 'black', fontSize: 18}}>Subtotal :</Text>
              <Text style={{color: 'black', fontSize: 18}}>{totalPrice}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 50,
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
              onPress={() =>
                navigation.navigate('CheckOut', {
                  totall: totalPrice,
                })
              }>
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
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Continue Shopping <Feather name="refresh-cw" size={20} />
        </Text>
      </ScrollView>
    </View>
  );
};

export default Login;
