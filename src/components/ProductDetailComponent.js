import React, {Component, useEffect, useState} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import {api} from './constant';
const cardwidth = {width: Dimensions.get('window').width};
const cardheight = {width: Dimensions.get('window').height};

// npm i native-base
import {Card, CardItem} from 'native-base';
// npm i react-native-elements
import {Icon} from 'react-native-elements';

const ProductDetailComponent = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    const uri = api.productdetails;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        //console.log(data);
        // Alert.alert(data.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  let navigation = useNavigation();
  const pic =
    'https://thecodeditors.com/test/single_vendor/admin/sub_category_images/';

  return (
    <FlatList
      data={data.Data}
      renderItem={({item}) => (
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            flex: 1,
            width: Dimensions.get('window').width,
          }}>
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
                  style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                  {item.sub_catname}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetails')}>
                  <Image
                    style={{
                      width: Dimensions.get('window').width * 0.8,
                      height: Dimensions.get('window').height * 0.4,
                    }}
                    source={{
                      uri:
                        'https://thecodeditors.com/test/single_vendor/admin/sub_category_images/1607089266noodles.jpg',
                    }}
                  />
                </TouchableOpacity>
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
                    <Text style={{fontWeight: 'bold'}}>Speghettie</Text>
                    <Text style={{fontWeight: 'bold'}}>
                      PKR {item.pro_price}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.logins}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="minus"
                      type="font-awesome"
                      size={24}
                      color="orange"
                    />
                    <Text style={styles.btns}>1</Text>
                    <Icon
                      name="plus"
                      type="font-awesome"
                      size={24}
                      color="orange"
                    />
                  </View>
                  <TouchableOpacity style={styles.login}>
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
                    {item.pro_des}
                  </Text>
                </View>
              </View>
            </CardItem>

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
      )}
    />
  );
};
export default ProductDetailComponent;

const styles = StyleSheet.create({
  subheading: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
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
