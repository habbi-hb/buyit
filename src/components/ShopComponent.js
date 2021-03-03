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
import {images, colors} from './constant';
import { Title, Paragraph} from 'react-native-paper';
// npm i native-base
import {Card, CardItem} from 'native-base';
import {Alert} from 'react-native';
// npm i react-native-elements

const ShopComponent = (props) => {
  const showToast = () => {
    ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
    setNumber(number + 1);
    console.log(number);
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [ifLoading, setIsLoading] = useState(false);
console.log("props........."+props.shopids)
  useEffect(() => {
    setIsLoading(true);

    const uri = 
    api.probyshop +
    '?id=' +
    props.shopid;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [props.shopid]);
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
                ToastAndroid.show('Item Added To Cart', ToastAndroid.SHORT);
              })
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));
          });
        };

        return (
          <View style={{height: 250, width: "50%", }}>
                     <TouchableOpacity 
                    onPress={() =>
                      navigation.navigate('ProductDetails', {id: item.pro_id, pic: featuredslider + item.image_name })
                    }>
                    <Image
                      source={{uri: pic + item.image_name}}
                      style={{width: 120, height: 120, alignSelf:'center'}}
                      resizeMode="center"></Image>
  
                    <Paragraph
                      style={{
                        fontSize: 12,
                        marginLeft: 20,
                        color: colors.LIGHTGREY.DEFAULT,
                      }}>
                        {item.pro_des}
                    
                    </Paragraph>
                    <Paragraph style={{marginLeft: 20}}>
                      {item.pro_name}
                    </Paragraph></TouchableOpacity>
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
export default ShopComponent;

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