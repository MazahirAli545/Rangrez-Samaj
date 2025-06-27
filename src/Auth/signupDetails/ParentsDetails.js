// import {React, useEffect, useState, useRef, useContext} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   FlatList,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import leftback from '../../provider/png/leftback.png';
// import name from '../../provider/png/name.png';
// import dob from '../../provider/png/dob.png';
// import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
// import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
// import spouse from '../../provider/png/spouse.png';
// import children from '../../provider/png/children.png';
// import father from '../../provider/png/father.png';
// import mother from '../../provider/png/mother.png';
// import {SignupDataContext} from '../SignupDataContext';
// import {ProfileDataContext} from '../ProfileDataContext';
// import id from '../../provider/png/id.png';
// import {BASE_URL} from '../../api/ApiInfo';
// import {useTranslation} from 'react-i18next';

// const ParentsDetails = () => {
//   const {
//     fathername,
//     setFatherName,
//     mothername,
//     setMotherName,
//     errorMessageRegister,
//     setErrorMessageRegister,
//     scrollViewRef,
//     setCurrentPage,
//     isAttempted,
//     setIsAttempted,
//     isNavigating,
//     setIsNavigating,
//     fatherId,
//     setfatherId,
//     motherId,
//     setMotherId,
//     spouseId,
//   } = useContext(SignupDataContext) || {};
//   const [errors, setErrors] = useState({});

//   const {t} = useTranslation();
//   const fatherIdInputRef = useRef(null);

//   const {FATHERNAME, setFATHERNAME, MOTHERNAME, setMOTHERNAME} =
//     useContext(ProfileDataContext) || {};

//   useEffect(() => {
//     if (isNavigating) {
//       console.log('Navigating to UserDetails screen...');
//     }
//   }, [isNavigating]);

//   const validateFields = () => {
//     let newErrors = {};

//     if (!fathername)
//       newErrors.fathername = t('ParentDetail.Father Name is required');
//     if (!mothername)
//       newErrors.mothername = t('ParentDetail.Mother Name is required');

//     setErrorMessageRegister(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   useEffect(() => {
//     if (isAttempted) {
//       validateFields();
//     }
//   }, [isAttempted]);

//   const validateParentId = async (id, type) => {
//     if (!id) {
//       setErrorMessageRegister(prev => ({...prev, [`${type}Id`]: undefined}));
//       return true;
//     }

//     try {
//       // Check if this ID matches spouseId (now using the spouseId from context)
//       if (id === spouseId) {
//         const errorMessage = `${
//           type === t('ParentDetail.father')
//             ? t('ParentDetail.Father')
//             : t('ParentDetail.Mother')
//         } ${t('ParentDetail.ID cannot be same as Spouse ID')}`;
//         setErrorMessageRegister(prev => ({
//           ...prev,
//           [`${type}${t('ParentDetail.Id')}`]: errorMessage,
//         }));
//         return false;
//       }

//       // Rest of your existing validation logic...
//       const response = await fetch(
//         `${BASE_URL}checkPersonById/${id}?type=${type}`,
//       );
//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         let errorMessage =
//           result.message ||
//           `${type} ${t('ParentDetail.ID not found or invalid.')}`;

//         if (
//           errorMessage.includes(
//             t('ParentDetail.Invalid gender for father. Required: M'),
//           )
//         ) {
//           errorMessage = t(
//             'ParentDetail.Invalid gender for father. Required Male.',
//           );
//         } else if (
//           errorMessage.includes(
//             t('ParentDetail.Invalid gender for mother. Required: F'),
//           )
//         ) {
//           errorMessage = t(
//             'ParentDetail.Invalid gender for mother. Required Female.',
//           );
//         } else if (
//           errorMessage.includes(t('ParentDetail.PR_UNIQUE_ID not found'))
//         ) {
//           errorMessage = `${
//             type === t('ParentDetail.father')
//               ? t('ParentDetail.Father')
//               : t('ParentDetail.Mother')
//           } ${t('ParentDetail.ID not found in registry.')}`;
//         }

//         setErrorMessageRegister(prev => ({
//           ...prev,
//           [`${type}${t('ParentDetail.Id')}`]: errorMessage,
//         }));
//         return false;
//       }

//       // Clear any previous error if all checks pass
//       setErrorMessageRegister(prev => ({
//         ...prev,
//         [`${type}${t('ParentDetail.Id')}`]: undefined,
//       }));

//       // Auto-fill parent name if validation passes
//       if (result.data?.PR_FULL_NAME) {
//         if (type === t('ParentDetail.father')) {
//           setFatherName?.(result.data.PR_FULL_NAME);
//           setFATHERNAME?.(result.data.PR_FULL_NAME);
//         } else if (type === t('ParentDetail.mother')) {
//           setMotherName?.(result.data.PR_FULL_NAME);
//           setMOTHERNAME?.(result.data.PR_FULL_NAME);
//         }
//       }

//       return true;
//     } catch (error) {
//       console.error(
//         `${t('ParentDetail.Error validating')} ${type} ${t(
//           'ParentDetail.ID',
//         )}:`,
//         error,
//       );
//       setErrorMessageRegister(prev => ({
//         ...prev,
//         [`${type}${t('ParentDetail.Id')}`]: `${t(
//           'ParentDetail.Error validating',
//         )} ${type} ${t(
//           'ParentDetail.ID. Please check your connection or the ID.',
//         )}`,
//       }));
//       return false;
//     }
//   };

//   const validateFatherId = async id => {
//     if (!id) {
//       setErrorMessageRegister?.(prev => ({...prev, fatherId: undefined}));
//       return true;
//     }

//     try {
//       // Get motherId and spouseId from context
//       const {motherId, spouseId} = useContext(SignupDataContext) || {};

//       if (id === motherId) {
//         const errorMessage = t(
//           'ParentDetail.Father ID cannot be same as Mother ID',
//         );
//         setErrors(prev => ({...prev, fatherId: errorMessage}));
//         setErrorMessageRegister?.(prev => ({...prev, fatherId: errorMessage}));
//         return false;
//       }

//       if (id === spouseId) {
//         const errorMessage = t(
//           'ParentDetail.Father ID cannot be same as Spouse ID',
//         );
//         setErrors(prev => ({...prev, fatherId: errorMessage}));
//         setErrorMessageRegister?.(prev => ({...prev, fatherId: errorMessage}));
//         return false;
//       }

//       // Rest of your validation logic...
//     } catch (error) {
//       // Error handling
//     }
//   };

//   const validateMotherId = async id => {
//     if (!id) {
//       setErrorMessageRegister?.(prev => ({...prev, motherId: undefined}));
//       return true;
//     }

//     try {
//       // Get fatherId and spouseId from context
//       const {fatherId, spouseId} = useContext(SignupDataContext) || {};

//       if (id === fatherId) {
//         const errorMessage = t(
//           'ParentDetail.Mother ID cannot be same as Father ID',
//         );
//         setErrors(prev => ({...prev, motherId: errorMessage}));
//         setErrorMessageRegister?.(prev => ({...prev, motherId: errorMessage}));
//         return false;
//       }

//       if (id === spouseId) {
//         const errorMessage = t(
//           'ParentDetail.Mother ID cannot be same as Spouse ID',
//         );
//         setErrors(prev => ({...prev, motherId: errorMessage}));
//         setErrorMessageRegister?.(prev => ({...prev, motherId: errorMessage}));
//         return false;
//       }

//       // Rest of your validation logic...
//     } catch (error) {
//       // Error handling
//     }
//   };

//   return (
//     <ScrollView
//       horizontal={false}
//       showsVerticalScrollIndicator={false}
//       style={{
//         flex: 1,
//         backgroundColor: 'rgba(197, 206, 217, 0.7)',
//         padding: hp(2),
//         marginBottom: hp(1.5),
//         borderRadius: wp(5),
//         marginTop: hp(3),
//       }}>
//       <View style={{marginBottom: hp(10), width: wp(83), marginTop: hp(2)}}>
//         <Text
//           style={{
//             fontSize: hp(2.5),
//             fontFamily: 'Poppins-Medium',
//             alignSelf: 'center',
//             color: '#000000',
//           }}>
//           {t('ParentDetail.Parents Details')}
//         </Text>

//         {/* Father Name Input */}
//         <View
//           style={{
//             width: wp(83),
//             borderRadius: wp(2),
//             alignSelf: 'center',
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: '#FFFFFF',
//             marginTop: hp(2),
//             borderColor: errorMessageRegister?.fathername ? 'red' : '#CCCCCC',
//             borderWidth: errorMessageRegister?.fathername ? wp(0.3) : wp(0),
//           }}>
//           <Image
//             source={father}
//             style={{
//               height: hp(2.8),
//               width: wp(5.8),
//               position: 'absolute',
//               zIndex: 11,
//               marginLeft: wp(2.5),
//             }}
//             tintColor={'#BFBDBE'}
//             resizeMode="contain"
//           />
//           <TextInput
//             numberOfLines={1}
//             style={{
//               paddingLeft: wp(10),
//               width: wp(80),
//               color: 'black',
//               fontSize: hp(1.8),
//               fontFamily: 'Poppins-Medium',
//               alignSelf: 'center',
//               justifyContent: 'center',
//               alignContent: 'center',
//             }}
//             placeholder={t('ParentDetail.Father Name')}
//             placeholderTextColor={'#BFBDBE'}
//             value={fathername || FATHERNAME}
//             onChangeText={text => {
//               setFatherName?.(text);
//               setFATHERNAME?.(text);
//               setErrorMessageRegister(prev => ({
//                 ...prev,
//                 fathername: text
//                   ? ''
//                   : t('ParentDetail.Father Name is required'),
//               }));
//             }}
//           />
//         </View>
//         {errorMessageRegister?.fathername && (
//           <Text style={styles.errorText}>
//             {errorMessageRegister.fathername}
//           </Text>
//         )}

//         {/* Father ID Input */}
//         <View
//           style={{
//             width: wp(83),
//             borderRadius: wp(2),
//             alignSelf: 'center',
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: '#FFFFFF',
//             marginTop: hp(2),
//             borderColor: errorMessageRegister?.fatherId ? 'red' : '#CCCCCC',
//             borderWidth: errorMessageRegister?.fatherId ? wp(0.3) : wp(0),
//           }}>
//           <Image
//             source={id}
//             style={{
//               height: hp(2.8),
//               width: wp(5.8),
//               position: 'absolute',
//               zIndex: 11,
//               marginLeft: wp(2.5),
//             }}
//             tintColor={'#BFBDBE'}
//             resizeMode="contain"
//           />
//           <TextInput
//             ref={fatherIdInputRef}
//             numberOfLines={1}
//             style={{
//               paddingLeft: wp(10),
//               width: wp(80),
//               color: 'black',
//               fontSize: hp(1.8),
//               fontFamily: 'Poppins-Medium',
//               alignSelf: 'center',
//               justifyContent: 'center',
//               alignContent: 'center',
//             }}
//             keyboardType="default"
//             placeholder={t('ParentDetail.Father ID [Optional]')}
//             placeholderTextColor={'#BFBDBE'}
//             value={fatherId ? String(fatherId) : ''}
//             onChangeText={text => {
//               setfatherId?.(text);
//               setErrorMessageRegister(prev => ({
//                 ...prev,
//                 fatherId: undefined, // Clear error when typing
//               }));
//             }}
//             // onBlur={async () => {
//             //   if (fatherId) {
//             //     await validateParentId(fatherId, 'father');
//             //   }
//             // }}
//             onBlur={async () => {
//               if (fatherId) {
//                 // No need to try and re-focus here immediately on blur for error visibility
//                 await validateParentId(fatherId, t('ParentDetail.father'));
//               }
//             }}
//           />
//         </View>
//         {errorMessageRegister?.fatherId && (
//           <Text style={styles.errorText}>{errorMessageRegister.fatherId}</Text>
//         )}

//         {/* Mother Name Input */}
//         <View
//           style={{
//             width: wp(83),
//             borderRadius: wp(2),
//             alignSelf: 'center',
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: '#FFFFFF',
//             marginTop: hp(2),
//             borderColor: errorMessageRegister?.mothername ? 'red' : '#CCCCCC',
//             borderWidth: errorMessageRegister?.mothername ? wp(0.3) : wp(0),
//           }}>
//           <Image
//             source={mother}
//             style={{
//               height: hp(2.8),
//               width: wp(5.8),
//               position: 'absolute',
//               zIndex: 11,
//               marginLeft: wp(2.5),
//             }}
//             tintColor={'#BFBDBE'}
//             resizeMode="contain"
//           />
//           <TextInput
//             numberOfLines={1}
//             style={{
//               paddingLeft: wp(10),
//               width: wp(80),
//               color: 'black',
//               fontSize: hp(1.8),
//               fontFamily: 'Poppins-Medium',
//               alignSelf: 'center',
//               justifyContent: 'center',
//               alignContent: 'center',
//             }}
//             placeholder={t('ParentDetail.Mother Name')}
//             placeholderTextColor={'#BFBDBE'}
//             value={mothername || MOTHERNAME}
//             onChangeText={text => {
//               setMotherName?.(text);
//               setMOTHERNAME?.(text);
//               setErrorMessageRegister(prev => ({
//                 ...prev,
//                 mothername: text
//                   ? ''
//                   : t('ParentDetail.Mother Name is required'),
//               }));
//             }}
//           />
//         </View>
//         {errorMessageRegister?.mothername && (
//           <Text style={styles.errorText}>
//             {errorMessageRegister.mothername}
//           </Text>
//         )}

//         {/* Mother ID Input */}
//         <View
//           style={{
//             width: wp(83),
//             borderRadius: wp(2),
//             alignSelf: 'center',
//             flexDirection: 'row',
//             alignItems: 'center',
//             backgroundColor: '#FFFFFF',
//             marginTop: hp(2),
//             borderColor: errorMessageRegister?.motherId ? 'red' : '#CCCCCC',
//             borderWidth: errorMessageRegister?.motherId ? wp(0.3) : wp(0),
//           }}>
//           <Image
//             source={id}
//             style={{
//               height: hp(2.8),
//               width: wp(5.8),
//               position: 'absolute',
//               zIndex: 11,
//               marginLeft: wp(2.5),
//             }}
//             tintColor={'#BFBDBE'}
//             resizeMode="contain"
//           />
//           <TextInput
//             numberOfLines={1}
//             style={{
//               paddingLeft: wp(10),
//               width: wp(80),
//               color: 'black',
//               fontSize: hp(1.8),
//               fontFamily: 'Poppins-Medium',
//               alignSelf: 'center',
//               justifyContent: 'center',
//               alignContent: 'center',
//             }}
//             placeholder={t('ParentDetail.Mother ID [Optional]')}
//             keyboardType="default"
//             placeholderTextColor={'#BFBDBE'}
//             value={motherId ? String(motherId) : ''}
//             onChangeText={text => {
//               setMotherId?.(text);
//               setErrorMessageRegister(prev => ({
//                 ...prev,
//                 motherId: undefined, // Clear error when typing
//               }));
//             }}
//             onBlur={async () => {
//               if (motherId) {
//                 await validateParentId(motherId, t('ParentDetail.mother'));
//               }
//             }}
//           />
//         </View>
//         {errorMessageRegister?.motherId && (
//           <Text style={styles.errorText}>{errorMessageRegister.motherId}</Text>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: 5,
//     alignSelf: 'flex-start',
//     fontFamily: 'Poppins-Regular',
//   },
// });

// export default ParentsDetails;

import {React, useEffect, useState, useRef, useContext} from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import father from '../../provider/png/father.png';
import mother from '../../provider/png/mother.png';
import id from '../../provider/png/id.png';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';
import {BASE_URL} from '../../api/ApiInfo';
import {useTranslation} from 'react-i18next';

const ParentsDetails = () => {
  const {
    fathername,
    setFatherName,
    mothername,
    setMotherName,
    errorMessageRegister,
    setErrorMessageRegister,
    isAttempted,
    fatherId,
    setfatherId,
    motherId,
    setMotherId,
    spouseId,
  } = useContext(SignupDataContext) || {};

  const {FATHERNAME, setFATHERNAME, MOTHERNAME, setMOTHERNAME} =
    useContext(ProfileDataContext) || {};
  const {t} = useTranslation();

  useEffect(() => {
    if (isAttempted) {
      validateFields();
    }
  }, [isAttempted]);

  const validateFields = () => {
    let newErrors = {};
    if (!fathername)
      newErrors.fathername = t('ParentDetail.Father Name is required');
    if (!mothername)
      newErrors.mothername = t('ParentDetail.Mother Name is required');
    setErrorMessageRegister(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateParentId = async (id, type) => {
    const errorKey = type === 'father' ? 'fatherId' : 'motherId';

    if (!id) {
      setErrorMessageRegister(prev => ({...prev, [errorKey]: undefined}));
      return true;
    }

    try {
      // Check against Spouse ID
      if (id === spouseId) {
        const message = `${
          type === 'father'
            ? t('ParentDetail.Father')
            : t('ParentDetail.Mother')
        } ${t('ParentDetail.ID cannot be same as Spouse ID')}`;
        setErrorMessageRegister(prev => ({...prev, [errorKey]: message}));
        return false;
      }

      // Check against the other parent
      if (
        (type === 'father' && id === motherId) ||
        (type === 'mother' && id === fatherId)
      ) {
        const message =
          type === 'father'
            ? t('ParentDetail.Father ID cannot be same as Mother ID')
            : t('ParentDetail.Mother ID cannot be same as Father ID');
        setErrorMessageRegister(prev => ({...prev, [errorKey]: message}));
        return false;
      }

      const response = await fetch(
        `${BASE_URL}checkPersonById/${id}?type=${type}`,
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        let message =
          result.message ||
          `${type} ${t('ParentDetail.ID not found or invalid.')}`;

        if (message.includes('Invalid gender')) {
          message =
            type === 'father'
              ? t('ParentDetail.Invalid gender for father. Required Male.')
              : t('ParentDetail.Invalid gender for mother. Required Female.');
        }

        setErrorMessageRegister(prev => ({...prev, [errorKey]: message}));
        return false;
      }

      // Success
      setErrorMessageRegister(prev => ({...prev, [errorKey]: undefined}));

      // Auto-fill parent name
      if (result.data?.PR_FULL_NAME) {
        if (type === 'father') {
          setFatherName?.(result.data.PR_FULL_NAME);
          setFATHERNAME?.(result.data.PR_FULL_NAME);
        } else {
          setMotherName?.(result.data.PR_FULL_NAME);
          setMOTHERNAME?.(result.data.PR_FULL_NAME);
        }
      }

      return true;
    } catch (err) {
      setErrorMessageRegister(prev => ({
        ...prev,
        [errorKey]: `${t('ParentDetail.Error validating')} ${type} ${t(
          'ParentDetail.ID. Please check your connection or the ID.',
        )}`,
      }));
      return false;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),
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
          {t('ParentDetail.Parents Details')}
        </Text>

        {/* Father Name */}
        <InputField
          icon={father}
          placeholder={t('ParentDetail.Father Name')}
          value={fathername || FATHERNAME}
          onChangeText={text => {
            setFatherName?.(text);
            setFATHERNAME?.(text);
            setErrorMessageRegister(prev => ({
              ...prev,
              fathername: text ? '' : t('ParentDetail.Father Name is required'),
            }));
          }}
          error={errorMessageRegister?.fathername}
        />

        {/* Father ID */}
        <InputField
          icon={id}
          placeholder={t('ParentDetail.Father ID [Optional]')}
          value={fatherId || ''}
          onChangeText={text => {
            setfatherId?.(text);
            setErrorMessageRegister(prev => ({...prev, fatherId: undefined}));
          }}
          onBlur={() => validateParentId(fatherId, 'father')}
          error={errorMessageRegister?.fatherId}
        />

        {/* Mother Name */}
        <InputField
          icon={mother}
          placeholder={t('ParentDetail.Mother Name')}
          value={mothername || MOTHERNAME}
          onChangeText={text => {
            setMotherName?.(text);
            setMOTHERNAME?.(text);
            setErrorMessageRegister(prev => ({
              ...prev,
              mothername: text ? '' : t('ParentDetail.Mother Name is required'),
            }));
          }}
          error={errorMessageRegister?.mothername}
        />

        {/* Mother ID */}
        <InputField
          icon={id}
          placeholder={t('ParentDetail.Mother ID [Optional]')}
          value={motherId || ''}
          onChangeText={text => {
            setMotherId?.(text);
            setErrorMessageRegister(prev => ({...prev, motherId: undefined}));
          }}
          onBlur={() => validateParentId(motherId, 'mother')}
          error={errorMessageRegister?.motherId}
        />
      </View>
    </ScrollView>
  );
};

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
}) => (
  <>
    <View
      style={{
        width: wp(83),
        borderRadius: wp(2),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: hp(2),
        borderColor: error ? 'red' : '#CCCCCC',
        borderWidth: error ? wp(0.3) : wp(0),
      }}>
      <Image
        source={icon}
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
        numberOfLines={1}
        style={{
          paddingLeft: wp(10),
          width: wp(80),
          color: 'black',
          fontSize: hp(1.8),
          fontFamily: 'Poppins-Medium',
        }}
        placeholder={placeholder}
        placeholderTextColor={'#BFBDBE'}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </>
);

const styles = {
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Regular',
  },
};

export default ParentsDetails;
