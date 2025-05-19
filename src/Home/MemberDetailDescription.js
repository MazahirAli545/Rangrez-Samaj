import {React, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';

import leftback from '../provider/png/leftback.png';

import CustomImagePicker from '../components/CameraComponent';
import user from '../provider/png/user.png';
import add from '../provider/png/add.png';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import name from '../provider/png/name.png';
import dob from '../provider/png/dob.png';
import father from '../provider/png/father.png';
import mother from '../provider/png/mother.png';
import phone from '../provider/png/phone.png';
import pincode from '../provider/png/pincode.png';

import education from '../provider/png/education.png';
import spouse from '../provider/png/spouse.png';
import children from '../provider/png/children.png';
import {color} from 'react-native-elements/dist/helpers';

import logo1 from '../provider/png/logo1.png';
import logo2 from '../provider/png/logo2.png';

import starrating from '../provider/png/starrating.png';

import cricket from '../provider/png/cricket.png';
import football from '../provider/png/football.png';
import painting from '../provider/png/painting.png';
import singing from '../provider/png/singing.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';

import Male from '../provider/png/Male.png';
import Female from '../provider/png/Female.png';
import Others from '../provider/png/Others.png';

import Fathericon from '../provider/png/Fathericon.png';
import Mothericon from '../provider/png/Mothericon.png';
import Spouseicon from '../provider/png/Spouseicon.png';
import Childicon from '../provider/png/Childicon.png';
import Siblingicon from '../provider/png/Siblingicon.png';
import Pincodeicon from '../provider/png/Pincodeicon.png';

import Primaryicon from '../provider/png/Primaryicon.png';
import Secondryicon from '../provider/png/Secondryicon.png';
import Highericon from '../provider/png/Highericon.png';
import noeducation from '../provider/png/noeducation.png';
import institution from '../provider/png/institution.png';
import PersonalFamilyDetails from './FamilyDetails/PersonalFamilyDetails';
import AddressDetails from './FamilyDetails/AddressDetails';
import EducationDetails from './FamilyDetails/EducationDetails';
import FamilyBussiness from './FamilyDetails/FamilyBussiness';
import FamilyHobbies from './FamilyDetails/FamilyHobbies';
import MobileDetails from './FamilyDetails/MobileDetails';
import ParentsDetails from './FamilyDetails/ParentsDetails';
import SpouseChild from './FamilyDetails/SpouseChild';
import ProfessionDetails from './FamilyDetails/ProfessionDetails';
import OverView from '../Home/OverView';

const MemberDetailDescription = props => {
  if (!props.route?.params?.member) {
    return (
      <View style={styles.MainContainer}>
        <Text>No member data found</Text>
      </View>
    );
  }
  return <OverView pageName={'MemberDetailDescription'} {...props} />;
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  UserImageDesign: {
    height: hp(14),
    // width: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: hp(10),
  },
  dropdown1: {
    height: hp(5.5),

    width: wp(75),

    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',

    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: wp(10),
    paddingRight: wp(5),
    borderRadius: wp(2),
    color: 'black',
    fontSize: hp(2.4),
    fontFamily: 'Lora-VariableFont_wght',
  },
  icon1: {
    marginRight: 5,
    color: '#BFBDBE',
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: '#BFBDBE',

    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(1.8),
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
});

export default MemberDetailDescription;
