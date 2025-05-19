//page number

import {React, useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  FlatList,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from '../components/Footer';
import setting from '../provider/png/setting.png';
import add from '../provider/png/add.png';
import {useCamera} from 'react-native-camera-hooks';
// import CustomImagePicker from '../components/CameraComponent';
import user from '../provider/png/user.png';
import CustomImagePicker from '../components/CameraComponent';
import CameraComponent from '../components/CameraComponent';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import PasswordHide from '../provider/png/PasswordHide.png';
import PasswordShow from '../provider/png/PasswordShow.png';
import leftpage from '../provider/png/leftpage.png';
import rightpage from '../provider/png/rightpage.png';
import leftback from '../provider/png/leftback.png';

import AddressDetails from '../Auth/signupDetails/AddressDetails';
import EducationDetails from '../Auth/signupDetails/EducationDetails';
import GenderDetails from '../Auth/signupDetails/GenderDetails';
import ParentsDetails from '../Auth/signupDetails/ParentsDetails';
import SpouseChildDetails from '../Auth/signupDetails/SpouseChildDetails';
import UserDetails from '../Auth/signupDetails/userDetails';

import UserBussiness from '../Auth/signupDetails/UserBussiness';
import BussinessStream from '../Auth/signupDetails/BussinessStream';
import BussinessType from '../Auth/signupDetails/BussinessType';
import UserHobbies from '../Auth/signupDetails/UserHobbies';
import ProfessionDetails from '../Auth/signupDetails/ProfessionDetails';
import UserMarriedYN from '../Auth/signupDetails/UserMarriedYN';

import OverView from '../Home/OverView';
// import Setting from './Drawer';
import Drawer from '../Home/Drawer';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {Card} from 'react-native-paper';
import {storeData, async_keys, getData} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileDataContext} from '../Auth/ProfileDataContext';
import ImageResizer from 'react-native-image-resizer';

import Signup from '../Auth/Signup';
const Profile = props => {
  console.log(props, 'profile props');
  return <Signup pageName={'profile'} {...props} />;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  disabledButton: {
    // backgroundColor: '#d3d3d3', // Gray color for disabled state
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressBarContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 10,

    backgroundColor: '#e0e0df',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: hp(2),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  progressText: {
    fontSize: wp(3.4),
    fontFamily: 'Poppins-Bold',
    marginLeft: wp(5),
    alignSelf: 'flex-start',
  },
  pageContainer: {
    marginBottom: 20,
    // zIndex:100
    // alignItems: 'center',
  },
  pageText: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    // marginTop: hp(2),
    // marginBottom: hp(12),
    position: 'absolute',
    bottom: hp(15),
    alignSelf: 'center',
  },

  MainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  text: {
    color: 'black',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
    marginTop: hp(1.5),
    textAlign: 'left',
  },
  dropdown1: {
    height: hp(5.5),

    width: wp(88),

    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',

    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    color: 'black',
    fontSize: hp(2.4),
    fontFamily: 'Lora-VariableFont_wght',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: '#BFBDBE',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
  },
  iconStyle1: {
    width: hp(3.5),
    height: wp(7),
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },
  cancelContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: wp(2),
    width: wp(7),
    height: hp(4),
    marginTop: hp(2),
  },
  preview: {
    // flex: 1,
    height: hp(47),
    // width: wp(40),
    // justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    marginHorizontal: wp(4),
    // marginVertical: hp(2),
  },
  insideCaptureButton: {
    width: 65,
    height: 65,
    borderRadius: wp(100),
    backgroundColor: '#4f4f4f',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: wp(100),
    alignSelf: 'center',
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    // backgroundColor: '#303030',
    // maxHeight: 700,

    borderRadius: wp(2),
    top: hp(5),
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlineContainer: {},
  cameraContainer: {
    height: hp(40),

    justifyContent: 'center',

    marginHorizontal: wp(10),
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  Header: {
    borderBottomWidth: wp(0.4),
    borderColor: '#900075',
    backgroundColor: '#900075',
    height: hp(18.5),
    width: wp(100),
  },
  UserImageDesign: {
    height: hp(14),
    // width: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: hp(10),
  },
  EditButton: {
    borderWidth: wp(0.2),
    borderColor: '#fff',
    height: hp(3),
    width: wp(17),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    marginTop: hp(1),
  },
  SignOptionButton: {
    backgroundColor: '#fff',
    height: hp(5.8),
    width: wp(50),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    top: hp(-2),
    left: wp(-1.5),
  },
  buttonGradient: {
    borderRadius: wp(10),
    borderWidth: wp(0.1),
    alignSelf: 'center',
    width: wp(10),
    height: hp(2.2),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: hp(0.5),
  },
});

export default Profile;
