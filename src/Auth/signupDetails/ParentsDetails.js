import {React, useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import leftback from '../../provider/png/leftback.png';
import name from '../../provider/png/name.png';
import dob from '../../provider/png/dob.png';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import spouse from '../../provider/png/spouse.png';
import children from '../../provider/png/children.png';
import father from '../../provider/png/father.png';
import mother from '../../provider/png/mother.png';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';

const ParentsDetails = () => {
  const {
    fathername,
    setFatherName,
    mothername,
    setMotherName,
    errorMessageRegister,
    setErrorMessageRegister,
    scrollViewRef,
    setCurrentPage,
    isAttempted,
    setIsAttempted,
    isNavigating,
    setIsNavigating,
  } = useContext(SignupDataContext) || {};

  const {FATHERNAME, setFATHERNAME, MOTHERNAME, setMOTHERNAME} =
    useContext(ProfileDataContext) || {};

  useEffect(() => {
    if (isNavigating) {
      console.log('Navigating to UserDetails screen...');
    }
  }, [isNavigating]);

  const validateFields = () => {
    let errors = {};

    if (!fathername) errors.fathername = 'Father Name is required';
    if (!mothername) errors.mothername = 'Mother Name is required';

    setErrorMessageRegister(errors);
  };

  useEffect(() => {
    if (isAttempted) {
      validateFields(); // Call validation when user attempts to proceed
    }
  }, [isAttempted]);

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),
        // marginBottom: hp(10),
        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      <View style={{marginBottom: hp(10), width: wp(83), marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Parents Details
        </Text>

        <View
          style={{
            width: wp(83),
            // borderWidth: wp(.2),
            borderRadius: wp(2),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: hp(2),
            borderColor: errorMessageRegister?.fathername ? 'red' : '#CCCCCC', // Default border color
            borderWidth: errorMessageRegister?.fathername ? wp(0.3) : wp(0),
          }}>
          <Image
            source={father}
            style={{
              height: hp(2.8),
              width: wp(5.8),
              position: 'absolute',
              zIndex: 11,
              marginLeft: wp(2.5),
            }}
            tintColor={'#BFBDBE'}
            resizeMode="contain"
          />
          <TextInput
            // editable={isEditable}
            numberOfLines={1}
            style={{
              paddingLeft: wp(10),
              width: wp(80),

              color: 'black',
              fontSize: hp(1.8),
              fontFamily: 'Poppins-Medium',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            placeholder="Father Name"
            placeholderTextColor={'#BFBDBE'}
            value={fathername || FATHERNAME} // Ensure fathername is correctly set
            onChangeText={text => {
              if (setFatherName) setFatherName(text);
              if (setFATHERNAME) setFATHERNAME(text);

              if (setErrorMessageRegister)
                setErrorMessageRegister(prevErrors => ({
                  ...prevErrors,
                  fathername: text ? '' : 'Father Name is required',
                }));
            }}
          />
        </View>
        {errorMessageRegister?.fathername && (
          <Text style={styles.errorText}>
            {errorMessageRegister.fathername}
          </Text>
        )}

        <View
          style={{
            width: wp(83),
            // borderWidth: wp(.2),
            borderRadius: wp(2),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: hp(2),
            borderColor: errorMessageRegister?.mothername ? 'red' : '#CCCCCC', // Default border color
            borderWidth: errorMessageRegister?.mothername ? wp(0.3) : wp(0),
          }}>
          <Image
            source={mother}
            style={{
              height: hp(2.8),
              width: wp(5.8),
              position: 'absolute',
              zIndex: 11,
              marginLeft: wp(2.5),
            }}
            tintColor={'#BFBDBE'}
            resizeMode="contain"
          />
          <TextInput
            // editable={isEditable}
            numberOfLines={1}
            style={{
              paddingLeft: wp(10),
              width: wp(80),

              color: 'black',
              fontSize: hp(1.8),
              fontFamily: 'Poppins-Medium',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            placeholder="Mother Name"
            placeholderTextColor={'#BFBDBE'}
            value={mothername || MOTHERNAME} // Ensure fathername is correctly set
            onChangeText={text => {
              // console.log('Updating fathername to:', text);
              if (setMotherName) setMotherName(text);
              if (setMOTHERNAME) setMOTHERNAME(text);

              // Clear error if user enters valid data
              if (setErrorMessageRegister)
                setErrorMessageRegister(prevErrors => ({
                  ...prevErrors,
                  mothername: text ? '' : 'Mother Name is required',
                }));
            }}
          />
        </View>
        {errorMessageRegister?.mothername && (
          <Text style={styles.errorText}>
            {errorMessageRegister.mothername}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Regular',
  },
});

export default ParentsDetails;
