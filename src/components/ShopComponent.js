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

  useEffect(() => {
    setIsLoading(true);

    const uri = api.shop;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
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
          <View>
            <Card
              style={{
                marginTop: 10,
                width: Dimensions.get('window').width * 0.45,
              }}>
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
                      })
                    }>
                    <Image
                      style={{
                        width: 100,
                        height: 100,

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
                <TouchableOpacity onPress={AddToCart} style={styles.login}>
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
            </Card>
          </View>
        );
      }}
    />
  );
};
export default ShopComponent;

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
