import {React, useState, useMemo, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BussinessStream from './BussinessStream';
// import {ProfileDataContext} from '../ProfileDataContext';
import {SignupDataContext} from '../SignupDataContext';
// import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../api/ApiInfo';
import Right from '../../provider/png/markRight.png';
import Wrong from '../../provider/png/markNo.png';
const UserBussiness = ({pageName = 'signup'}) => {
  // const navigate = useNavigation;
  // const [checked, setChecked] = useState(null);

  const {BUSSINTRST, setBUSSINTRST} = useContext(SignupDataContext) || {};

  // console.log('STSSSS', storedValue);

  // const handleSelection = value => {
  //   setChecked(value);
  //   setBUSSINTRST(value ? 'Y' : 'N');
  // };

  const [checked, setChecked] = useState(BUSSINTRST === 'Y'); // Initialize based on context

  // Sync checked state with BUSSINTRST when component mounts or BUSSINTRST changes
  useEffect(() => {
    setChecked(BUSSINTRST === 'Y');
  }, [BUSSINTRST]);

  const handleSelection = value => {
    if (checked !== value) {
      setChecked(value);
      setBUSSINTRST(value ? 'Y' : 'N');
    }
  };

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled={true}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),

        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      <View style={{marginTop: hp(2), width: wp(83)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Business
        </Text>

        <View style={{marginBottom: hp(10)}}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontFamily: 'Poppins-Medium',
              color: 'Black',
            }}>
            Are you interested in Business?
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{
                borderColor: '#000000',
                height: hp(7),
                width: wp(38),
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: wp(2),
                flexDirection: 'row',
                alignContent: 'center',
                marginTop: hp(2),
                backgroundColor: checked === true ? '#0468BF' : '#697368',
              }}
              onPress={() => {
                handleSelection(true);
              }}>
              <Image
                source={Right}
                style={{height: hp(6), width: wp(7), marginRight: wp(1)}}
                resizeMode="contain"
                tintColor={checked === true ? '#FFFFFF' : 'green'}
              />
              <Text
                style={{
                  fontSize: hp(2.4),
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '700',
                  color: checked === true ? '#FFFFFF' : '#000000',
                }}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: '#000000',
                height: hp(7),
                width: wp(38),
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                borderRadius: wp(2),
                marginTop: hp(2.5),
                backgroundColor: checked === false ? '#0468BF' : '#697368',
              }}
              onPress={() => {
                handleSelection(false);
              }}>
              <Image
                source={Wrong}
                style={{height: hp(2.2), width: wp(7), marginRight: wp(1)}}
                resizeMode="contain"
                tintColor={checked === false ? '#FFFFFF' : 'red'}
              />
              <Text
                style={{
                  fontSize: hp(2.4),
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '700',
                  color: checked === false ? '#FFFFFF' : '#000000',
                }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  dropdown1: {
    height: hp(6),
    width: wp(88),
    elevation: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    color: 'black',

    fontFamily: 'Poopins-Medium',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: '#8C8C8C',
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
  },
  iconStyle1: {
    width: hp(3.5),
    height: wp(7),
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 0,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2),
  },
});
export default UserBussiness;
