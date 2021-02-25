import React, {useEffect, useState, useRef} from 'react';
import tabsview from './tabsview';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import {images, colors} from './constant';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {CheckBox} from 'native-base';
import {Icon} from 'react-native-elements';
import {TabView, SceneMap} from 'react-native-tab-view';
import AccountScreen from './Account';
const {height} = Dimensions.get('window');
const BottomAccount = (props) => {
  return (
    <RBSheet
      ref={props.refRBSheet}
      height={height + 120}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#fff',
        },
      }}>

    </RBSheet>
  );
};

export default BottomAccount;
