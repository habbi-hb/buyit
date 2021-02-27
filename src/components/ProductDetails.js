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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Avatar , Paragraph} from 'react-native-paper';
import {colors, images} from './constant';
import Feather from 'react-native-vector-icons/Feather';
import {api, sliderpic, featuredslider} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import HeaderMain from './HeaderMain';
// npm i native-base
import {Card, CardItem} from 'native-base';
// npm i react-native-elements
import {Icon} from 'react-native-elements';
import ProductDetailComponent from './ProductDetailComponent';



const RecommenderSlider = () => {
  let navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [isLoading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const [ifLoading, setIsLoading] = useState(true);
  const pic = sliderpic;
  const [cart, setCart] = useState([]);
  //console.log(featured.Data);

  useEffect(() => {
    setIsLoading(true);
    fetch(api.recommendslider)
      .then((response) => response.json())
      .then((json) => {
        setFeatured(json);
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  if (ifLoading) {
    return (
      <View style={{paddingTop: 100}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
 
          <FlatList
            horizontal
            data={featured.Data}
            renderItem={({item}) => {
              const AddToCart = (e) => {
                let number = '1';

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
                      // console.log(cart);
                      ToastAndroid.show(
                        'Item Added To Cart',
                        ToastAndroid.SHORT,
                      );
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));
                });
              };
              return (
                <View style={{ margin: 20, width: 200}}>
                   <TouchableOpacity 
                    onPress={() =>
                      navigation.navigate('ProductDetails', {id: item.pro_id, pic: featuredslider + item.image_name })
                    }>
                  <Image
                    source={{uri: featuredslider + item.image_name}}
                    style={{width: 120, height: 120, alignSelf:'center'}}
                    resizeMode="center"></Image>

                  <Paragraph
                    style={{
                      fontSize: 12,
                      marginLeft: 20,
                      color: colors.LIGHTGREY.DEFAULT,
                    }}>
                    Heavy
                  </Paragraph>
                  <Paragraph style={{marginLeft: 20}}>
                    {item.pro_name}
                  </Paragraph>
                  </TouchableOpacity>
                  <Paragraph
                    style={{
                      marginLeft: 20,
                      fontSize: 14,
                      color: colors.ORANGE.DEFAULT,
                    }}>
                    PKR {item.pro_price}
                  </Paragraph>
                  <TouchableOpacity
                    style={{
                      borderColor: colors.ORANGE.DEFAULT,
                      width: '80%',
                      borderWidth: 1,
                      marginTop: 5,
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                    onPress={AddToCart}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: colors.ORANGE.DEFAULT,
                        textAlign: 'center',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
   
  );
};

const ProductDetails = ({route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [usr, setUsr] = useState('');
  //const [Pid, setPid] = useState('');
  let Pid = '';
  const {pic, id} = route.params;
  const [cart, setCart] = useState([]);
  const [ifLoading, setIsLoading] = useState(false);
   let [quan, setQuan] = useState(0);

  //};
  useEffect(() => {
    setIsLoading(true);
    const uri = api.productdetails + 'id=' + id;
    console.log("params",id);
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
  }, [id]);

  const IncPro = () => {
    setQuan(quan + 1);
    console.log(quan);
  };
  const DecPro = () => {
    setQuan(quan - 1);
    console.log(quan);
  };

  // const FinQuan = () => {
  //   ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
  //   setQuan(quan);
  //   console.log(quan);
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
    <ScrollView
      style={{
        flex: 1,
        height: 1000,
       marginTop: 5,
         paddingBottom:20,
        backgroundColor: colors.WHITE,
      }}>
      <View>
        <View>
          <View
            style={{
              width: '95%',
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

            
              AsyncStorage.getItem('RandomNumber').then((result) => {
                console.log('result' + result);
                let user = JSON.parse(result);
                const uri =
                  api.addcart +
                  '&product_id=' +
                  item.pro_id +
                  '&quantity=1&user_id=' + user;
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
              
                <View
                  style={{
                    marginTop: 10,
                    width: Dimensions.get('window').width,
                   
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
                          uri: pic,
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
                          style={{flexDirection: 'row', alignItems: 'center' ,height: 60}}>
                            
                          <TouchableOpacity
                            onPress={() => DecPro()}>
                            <Icon
                              name="minus"
                              type="font-awesome"
                              size={24}
                              color="orange"
                            />
                          </TouchableOpacity>
                          <Text style={styles.btns}></Text>
                          <TouchableOpacity
                            onPress={() => IncPro()}>
                            <Icon
                              name="plus"
                              type="font-awesome"
                              size={24}
                              color="orange"
                            />
                          </TouchableOpacity>
                        </View>
                        {quan>0?
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
                        </TouchableOpacity>: <Text style={{alignSelf:'center'}}></Text>}
                      </View>
                      <View>
                        <Text style={{fontWeight: 'bold'}}>Details</Text>
                        <Text style={{fontWeight: 'bold', marginTop: 10}}>
                          {item.pro_des}+{item.pro_id}
                        </Text>
                      </View>
                    </View>
                  </CardItem>
                </View>
             
            </View>
          );
        }}
      />
           <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10, marginLeft: 10, color:'#5b5e5c'}}>
            Recommended Products
          </Text>
      <RecommenderSlider />
      
      
    </ScrollView>
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
