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
import id from '../../provider/png/id.png';
import {BASE_URL} from '../../api/ApiInfo';

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
    fatherId,
    setfatherId,
    motherId,
    setMotherId,
  } = useContext(SignupDataContext) || {};
  const [errors, setErrors] = useState({});

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

  // const validateParentId = async (id, type) => {
  //   if (!id) {
  //     // Clear error if empty (optional field)
  //     setErrors(prev => ({...prev, [`${type}Id`]: undefined}));
  //     setErrorMessageRegister?.(prev => ({...prev, [`${type}Id`]: undefined}));
  //     return true;
  //   }

  //   try {
  //     const response = await fetch(
  //       `https://node2-plum.vercel.app/api/user/checkPersonById/${id}?type=${type}`,
  //     );
  //     const result = await response.json();

  //     if (!result.success) {
  //       setErrors(prev => ({...prev, [`${type}Id`]: result.message}));
  //       setErrorMessageRegister?.(prev => ({
  //         ...prev,
  //         [`${type}Id`]: result.message,
  //       }));
  //       return false;
  //     } else {
  //       setErrors(prev => ({...prev, [`${type}Id`]: undefined}));
  //       setErrorMessageRegister?.(prev => ({
  //         ...prev,
  //         [`${type}Id`]: undefined,
  //       }));
  //       if (type === 'father') setfatherId?.(id);
  //       if (type === 'mother') setMotherId?.(id);
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error(`Error validating ${type} ID:`, error);
  //     setErrors(prev => ({...prev, [`${type}Id`]: 'Something went wrong'}));
  //     return false;
  //   }
  // };

  const validateParentId = async (id, type) => {
    if (!id) {
      setErrors(prev => ({...prev, [`${type}Id`]: undefined}));
      setErrorMessageRegister?.(prev => ({...prev, [`${type}Id`]: undefined}));
      return true;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/check/${id}`);
      const result = await response.json();

      if (!result.success) {
        const errorMessage = result.message.includes('PR_UNIQUE_ID not found')
          ? `${
              type === 'father' ? 'Father' : 'Mother'
            } ID not found in registry`
          : result.message;

        setErrors(prev => ({...prev, [`${type}Id`]: errorMessage}));
        setErrorMessageRegister?.(prev => ({
          ...prev,
          [`${type}Id`]: errorMessage,
        }));
        return false;
      } else {
        setErrors(prev => ({...prev, [`${type}Id`]: undefined}));
        setErrorMessageRegister?.(prev => ({
          ...prev,
          [`${type}Id`]: undefined,
        }));

        // ✅ Auto-fill father or mother name if found
        if (result.data?.PR_FULL_NAME) {
          if (type === 'father') {
            setFatherName?.(result.data.PR_FULL_NAME);
            setFATHERNAME?.(result.data.PR_FULL_NAME);
          }
          if (type === 'mother') {
            setMotherName?.(result.data.PR_FULL_NAME);
            setMOTHERNAME?.(result.data.PR_FULL_NAME);
          }
        }

        return true;
      }
    } catch (error) {
      console.error(`Error validating ${type} ID:`, error);
      setErrors(prev => ({
        ...prev,
        [`${type}Id`]: `Unable to validate ${type} ID. Please check your connection.`,
      }));
      return false;
    }
  };

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
            // borderColor: errorMessageRegister?.fathername ? 'red' : '#CCCCCC', // Default border color
            // borderWidth: errorMessageRegister?.fathername ? wp(0.3) : wp(0),
            borderColor: errors.fatherId ? 'red' : '#CCCCCC',
            borderWidth: errors.fatherId ? wp(0.3) : wp(0),
          }}>
          <Image
            source={id}
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
            keyboardType="default"
            placeholder="Father ID [Optional]"
            placeholderTextColor={'#BFBDBE'}
            // value={fathername || FATHERNAME} // Ensure fathername is correctly set
            // onChangeText={text => {
            //   if (setFatherName) setFatherName(text);
            //   if (setFATHERNAME) setFATHERNAME(text);

            //   if (setErrorMessageRegister)
            //     setErrorMessageRegister(prevErrors => ({
            //       ...prevErrors,
            //       fathername: text ? '' : 'Father Name is required',
            //     }));
            // }}
            value={fatherId ? String(fatherId) : ''}
            // onChangeText={text => {
            //   const id = text ? parseInt(text) : null;
            //   setfatherId?.(id);
            //   // Clear errors as user types
            //   setErrors(prev => ({...prev, fatherId: undefined}));
            //   setErrorMessageRegister?.(prev => ({
            //     ...prev,
            //     fatherId: undefined,
            //   }));
            // }}
            onChangeText={text => {
              // const numValue = text ? parseInt(text, 10) : null;
              // setSpouseId?.(numValue);
              setfatherId?.(text);
              setErrors(prev => {
                const updated = {...prev};
                delete updated.spouseId;
                return updated;
              });
            }}
            onBlur={async () => {
              if (fatherId) {
                // Only validate if there's a value
                const isValid = await validateParentId(fatherId, 'father');
                if (!isValid) {
                  // Force the parent component to stay on this page
                  setCurrentPage(
                    pages.findIndex(
                      page => page.type?.name === 'ParentsDetails',
                    ),
                  );
                  // Prevent scroll navigation
                  scrollViewRef.current?.scrollTo({
                    x: wp(100) * currentPage,
                    animated: false,
                  });
                }
              }
            }}
          />
        </View>
        {errors.fatherId && (
          <Text style={styles.errorText}>{errors.fatherId}</Text>
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
            // borderColor: errorMessageRegister?.mothername ? 'red' : '#CCCCCC', // Default border color
            // borderWidth: errorMessageRegister?.mothername ? wp(0.3) : wp(0),
            borderColor: errors.motherId ? 'red' : '#CCCCCC',
            borderWidth: errors.motherId ? wp(0.3) : wp(0),
          }}>
          <Image
            source={id}
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
            placeholder="Mother ID [Optonal]"
            keyboardType="default"
            placeholderTextColor={'#BFBDBE'}
            value={motherId ? String(motherId) : ''}
            // onChangeText={text => {
            //   const id = text ? parseInt(text) : null;
            //   setMotherId?.(id);
            //   // Clear errors as user types
            //   setErrors(prev => ({...prev, motherId: undefined}));
            //   setErrorMessageRegister?.(prev => ({
            //     ...prev,
            //     motherId: undefined,
            //   }));
            // }}
            onChangeText={text => {
              setMotherId?.(text);
              setErrors(prev => {
                const updated = {...prev};
                delete updated.motherId;
                return updated;
              });
              setErrorMessageRegister?.(prev => ({
                ...prev,
                motherId: undefined,
              }));
            }}
            onBlur={async () => {
              if (motherId) {
                // Only validate if there's a value
                const isValid = await validateParentId(motherId, 'mother');
                if (!isValid) {
                  // Force the parent component to stay on this page
                  setCurrentPage(
                    pages.findIndex(
                      page => page.type?.name === 'ParentsDetails',
                    ),
                  );
                  // Prevent scroll navigation
                  scrollViewRef.current?.scrollTo({
                    x: wp(100) * currentPage,
                    animated: false,
                  });
                }
              }
            }}
          />
        </View>

        {errors.motherId && (
          <Text style={styles.errorText}>{errors.motherId}</Text>
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
