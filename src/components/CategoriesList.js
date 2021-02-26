import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-paper';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Icon,
} from 'native-base';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {catlist, colors, images} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {api} from './constant';
//import {black} from 'react-native-paper/lib/typescript/styles/colors';

const RenderHeader = () => {
  let navigation = useNavigation();
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
  );
};
let CategoriesList = ({route}) => {
  let navigation = useNavigation();
  // const { params } = navigation.state;
  const {id} = route.params;
  console.log('params', id);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [usr, setUsr] = useState('');
  const [pwd, setPwd] = useState('');
  const [ifLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    //const uri = `${api.categorieslist}?id=${id}`;
    const uri = api.categorieslist + 'id=' + id;
    fetch(uri)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(json);
        setIsLoading(false);
        // Alert.alert(data.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);
  if (ifLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="black"  />
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
        style={{
          padding: 10,
          borderRadius: 1,
          elevation: 1,
          marginBottom: 10,
        }}>
        Home <Feather name="chevron-right" size={15} /> Categories
      </Text>

      <View>
      <FlatList
          data={data.Data}
          renderItem={({item}) => (
            // <Text style={styles.item} onPress={CategoriesTap}>
            //   {item.sub_catname}
            // </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image
                size={70}
                source={{uri: catlist + item.sub_image}}
              />
              <Text
                style={styles.item}
                onPress={() =>
                  navigation.navigate('CategoriesProductList', {
                    cat: id,
                    sub_id: item.sub_cat_id,
                  })
                }>
                {item.sub_catname}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CategoriesList;
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
});
