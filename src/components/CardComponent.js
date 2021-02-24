/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {api, cardimage} from './constant';

// npm i native-base
import {Card, CardItem} from 'native-base';
import {Alert} from 'react-native';
// npm i react-native-elements

const CardComponent = (props) => {
  // let [number, setNumber] = useState(0);
  const showToast = () => {
    ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
    setNumber(number + 1);
    console.log(number);
  };
  //let Pid = '';

  //let [quan, setQuan] = useState(num);
  // const AddToCart = (e) => {
  //   //useEffect(() => {
  //   //ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
  //   let [number, setNumber] = useState(0);

  //   ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
  //   setNumber(number + 1);
  //   console.log(number);
  //   const uri =
  //     api.addcart +
  //     '&product_id=' +
  //     Pid +
  //     '&quantity=' +
  //     number +
  //     '&user_id=34';
  //   console.log(uri);
  //   fetch(uri)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setData(json);
  //       //Alert.alert(data.result);
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error))
  //     .finally(() => setLoading(false));
  // };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [ifLoading, setIsLoading] = useState(false);
  //console.log(data);
  useEffect(() => {
    setIsLoading(true);
    // const uri = `${api.categorieslistdetails}?id=${props.subId}`;
    const uri =
      api.categorieslistdetails +
      'cat=' +
      props.cat +
      '&cat_sub=' +
      props.subId;

    //console.log(props.cat);
    //console.log(props.subId);
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);

        //console.log('json', json);
        // Alert.alert(data.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [props.subId, props.cat]);
  let navigation = useNavigation();
  const pic = cardimage;
  if (ifLoading) {
    return (
      <View style={{paddingTop: 100}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <FlatList
      numColumns={2}
      data={data.Data}
      renderItem={({item}) => {
        //let pid = '1';
        const AddToCart = (e) => {
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
        //console.log(result);
        //setNumber(number + 1);
        //console.log(number);
        // const uri =
        //   api.addcart +
        //   '&product_id=' +
        //   item.pro_id +
        //   '&quantity=2&user_id=34';
        //number +

        //console.log(uri);
        // fetch(uri)
        //   .then((response) => response.json())
        //   .then((json) => {
        //     setCart(json);
        //     //Alert.alert(data.result);
        //     console.log(data);
        //   });

        //console.log(pid);
        return (
          // <Text style={styles.item} onPress={CategoriesTap}>
          //   {item.sub_catname}
          // </Text>
          <View>
            <Card
              style={{
                marginTop: 10,
                width: Dimensions.get('window').width * 0.45,
              }}>
              {/* <CardItem header bordered style={styles.cardHeader}>
          <Text style={styles.subheading}>Card Title</Text>
        </CardItem> */}
              <CardItem
                style={{
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width * 0.37,

                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}>
                    {item.sub_catname}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductDetails', {
                        picture: pic + item.image_name,
                        pid: item.pro_id,

                        //  num: number,
                      })
                    }>
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        //borderWidth: 1,
                        borderColor: 'black',
                      }}
                      source={{uri: pic + item.image_name}}
                    />
                  </TouchableOpacity>
                </View>
              </CardItem>
              <CardItem>
                <View
                  style={{
                    flex: 1,

                    // justifyContent: 'space-between'
                    //backgroundColor: 'red'
                  }}>
                  <TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text>{item.pro_name}</Text>
                      <Text>{item.pro_price}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </CardItem>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  // onPress={AddToCartToastMessage}
                  onPress={AddToCart}
                  style={styles.login}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      alignContent: 'center',
                      color: '#000',
                    }}>
                    ADD
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Icon name="google" type="font-awesome" />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Icon name="instagram" type="font-awesome" />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Icon name="twitter" type="font-awesome" />
              </TouchableOpacity>
            </View> */}
            </Card>
          </View>
        );
      }}
    />
  );
};
export default CardComponent;

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
