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
import {ProfileDataContext} from '../ProfileDataContext';
import {SignupDataContext} from '../SignupDataContext';
// import {useNavigation} from '@react-navigation/native';

const UserMarriedYN = props => {
  // const navigate = useNavigation;
  // const [checked, setChecked] = useState(null);

  const {USERMARRIED, setUSERMARRIED} = useContext(ProfileDataContext) || {};

  const {userMarried, setUserMarried} = useContext(SignupDataContext) || {};

  // const handleSelection = value => {
  //   setChecked(value);
  //   if (setUSERMARRIED) setUSERMARRIED(value ? 'Y' : 'N');
  //   if (setUserMarried) setUserMarried(value ? 'Y' : 'N');
  // };

  const [checked, setChecked] = useState(
    USERMARRIED === 'Y' || userMarried === 'Y'
      ? true
      : USERMARRIED === 'N' || userMarried === 'N'
      ? false
      : null,
  );

  useEffect(() => {
    if (USERMARRIED !== null && USERMARRIED !== undefined) {
      setChecked(USERMARRIED === 'Y');
    } else if (userMarried !== null && userMarried !== undefined) {
      setChecked(userMarried === 'Y');
    } else {
      setChecked(false); // Default to 'N' if both are empty
    }
  }, [USERMARRIED, userMarried]);

  const handleSelection = value => {
    setChecked(value);
    setUSERMARRIED?.(value ? 'Y' : 'N');
    setUserMarried?.(value ? 'Y' : 'N');
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
          FAMILY
        </Text>

        <View style={{marginBottom: hp(10)}}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontFamily: 'Poppins-Medium',
              color: 'Black',
            }}>
            Are you Married?
          </Text>
          <TouchableOpacity
            style={{
              borderColor: '#000000',
              height: hp(5.5),
              width: wp(75),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(2),
              marginTop: hp(2),
              backgroundColor: checked === true ? '#0468BF' : '#697368',
            }}
            onPress={() => handleSelection(true)}>
            <Text
              style={{
                fontSize: hp(2.2),
                fontFamily: 'Poppins-Medium',
                color: checked === true ? '#FFFFFF' : '#000000',
              }}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#000000',
              height: hp(5.5),
              width: wp(75),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(2),
              marginTop: hp(2.5),
              backgroundColor: checked === false ? '#0468BF' : '#697368',
            }}
            onPress={() => {
              handleSelection(false);
            }}>
            <Text
              style={{
                fontSize: hp(2.2),
                fontFamily: 'Poppins-Medium',
                color: checked === false ? '#FFFFFF' : '#000000',
              }}>
              No
            </Text>
          </TouchableOpacity>
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
export default UserMarriedYN;
