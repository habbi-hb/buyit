import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity,
  ScrollView,
 

  FlatList,

  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  List,
  Switch,
} from 'react-native-paper';
import {CheckBox,Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Loader from '../Loader';
import {useNavigation} from '@react-navigation/native';
import {api} from '../constant'


export default function DrawerContent(props) {
 
  const initialLayout = {width: Dimensions.get('window').width};
  const [loader, setloader] = React.useState(false);
  const renderTabBar = (props) => {
    return (
      <TabBar
        style={{
          backgroundColor: 'black',
          elevation: 0,
          borderColor: '#000000',
          borderBottomWidth: 1,
          height: 50,
        }}
        labelStyle={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}
        {...props}
        indicatorStyle={{backgroundColor: '#e6b830', height: 2.5}}
      />
    );
  };
  
  function Menu() {
    //console.log(navigation);
    //console.log(props.navigation);
    //let navigation = useNavigation();
    // console.log(navigation);
    let navigation = useNavigation();
    //const [refRBSheet, setrefRBSheet] = useState(refRBSheetBottom);
    // const refRBSheetBottom = useRef();
    const refRBSheetBottom = useRef();
    const [refRBSheet, setrefRBSheet] = useState(refRBSheetBottom);

    return (
      <ScrollView>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen2', {ch: check})}>
            <Text style={{color: '#adadad', padding: 10}}>HOME</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ShopScreen')}>
            <Text style={{color: '#adadad', padding: 10}}>SHOP</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={{color: '#adadad', padding: 10}}>CART</Text>
          </TouchableOpacity>
        </View>
      
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
          <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
            <Text style={{color: '#adadad', padding: 10}}>WISHLIST</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
          <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
            <Text style={{color: '#adadad', padding: 10}}>Profile</Text>
          </TouchableOpacity>
        </View>
   
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={{color: '#adadad', padding: 10}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: 10, flexDirection: 'row', alignSelf:'center' }}>
          <TouchableOpacity style={{borderColor:'#adadad', borderWidth: 1, width: 28, alignItems:'center', margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }} size={12} active name="facebook" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'#adadad', borderWidth: 1,  margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }}  active name="twitter" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'#adadad',  borderWidth: 1,  margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }} size={12} active name="instagram" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'#adadad',  borderWidth: 1, margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }} size={12} active name="youtube-play" type="FontAwesome" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'MENU'},
    {key: 'second', title: 'CATEGORIES'},
  ]);

  const renderScene = SceneMap({
    first: Menu,
    second: Categories,
  });

  function Categories() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [ifLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      fetch(api.categories)
        .then((response) => response.json())
        .then((json) => {
          setIsLoading(false);
          setData(json);
          console.log(ifLoading);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
    let navigation = useNavigation();
    if (ifLoading) {
      return (
        <View style={{paddingTop: 100}}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <FlatList
              data={data.Data}
              keyExtractor={({cat_id}, index) => cat_id}
              renderItem={({item}) => (
                <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CategoriesList', {id: item.cat_id})
                    }>

                    <Text style={{color: 'white', padding: 10}}>
                      {item.cat_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
          <View style={{margin: 10, flexDirection: 'row', alignSelf:'center' }}>
          <TouchableOpacity style={{borderColor:'#adadad', borderWidth: 1, width: 28, alignItems:'center', margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }} size={12} active name="facebook" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'#adadad', borderWidth: 1,  margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }}  active name="twitter" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'#adadad',  borderWidth: 1,  margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }} size={12} active name="instagram" type="FontAwesome" />
          </TouchableOpacity>
          <TouchableOpacity style={{borderColor:'#adadad',  borderWidth: 1, margin: 5, borderRadius:30, padding: 5}}>
          <Icon style={{color:'#adadad', fontSize: 18 }} size={12} active name="youtube-play" type="FontAwesome" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
 
  

  return (
    <View style={{flex: 1}}>
           <DrawerContentScrollView {...props} style={{backgroundColor: 'black'}}>
        <View style={{alignItems: 'flex-end', padding: 20}}>
          <TouchableOpacity>
            <Entypo
              name="cross"
              size={30}
              style={{color: 'grey'}}
              //onPress={() => props.navigation.navigate('HomeScreen')}
              onPress={() => props.navigation.closeDrawer()}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.inputsrch}>
            <TextInput style={styles.inputsearch} placeholderTextColor={'#adadad'} placeholder='Search in....' />
          </View>

          <View style={styles.inputbtn}>
            <TouchableOpacity style={{alignItems:'center', justifyContent:'center' , flex:1}}>
            <Icon style={{color:'#fff', fontSize: 25 }} active name="search1" type="AntDesign" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            navigation={props.navigation}
            renderTabBar={renderTabBar}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  text: {
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
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  inputsrch: {
    flex: 0.8,
    borderColor: '#cccccc',
    borderBottomWidth: 1,
  },
  inputbtn: {
    flex: 0.2,
    backgroundColor: 'orange',
  },
  inputsearch: {
    borderColor: 'grey',
    borderWidth: 2,
    color: '#fff',
    paddingLeft: 20,
  },
});
