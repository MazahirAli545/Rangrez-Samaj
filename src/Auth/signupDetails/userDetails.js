import {React, useEffect, useState, useRef, useContext, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  ToastAndroid,
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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import phone from '../../provider/png/phone.png';
import Modal from 'react-native-modal';
import Success from '../../provider/png/Success.png';
import cancel from '../../provider/png/cancel.png';
import AppLoader from '../../components/AppLoader';
import {BASE_URL} from '../../api/ApiInfo';
import axios from 'axios';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';
import Registered from '../../provider/png/Registered.png';
import Signin from '../Signin';
import {useNavigation} from '@react-navigation/native';
import {storeData} from '../../api/UserPreference';
// import UpdatedSucess from '../../provider/png/UpdatedSucess.png';
import updatedsucess1 from '../../provider/png/updatedsucess1.png';
// import {BASE_URL} from '../../api/ApiInfo';
const UserDetails = ({pageName = 'signup'}) => {
  const navigation = useNavigation();
  // const route = useRoute();
  // const isProfilePage = route.name.toLowerCase().includes('profile');
  // Get dynamic data from context
  //hideVerifyButton = false, isEditable = true
  const isEditable = useContext(SignupDataContext)?.isEditable || true;
  const {
    userData,
    fullname,
    setFullName,
    date,
    setDate,
    age,
    setAge,
    mobile,
    setMobile,
    errorMessageRegister,
    setErrorMessageRegister,
    scrollViewRef,
    setCurrentPage,
    isAttempted,
    setIsAttempted,
    isNavigating,
    setIsNavigating,
    isMobileVerified,
    setIsMobileVerified,
    isPersonalDetailsChanged,
    setIsPersonalDetailsChanged,
  } = useContext(SignupDataContext) || {};

  const {FULLNAME, setFULLNAME, DATE, setDATE, MOBILE, setMOBILE} =
    useContext(ProfileDataContext) || {};

  console.log('Signup Date (Context):', date);
  console.log('Profile Date (Context):', DATE);

  const [displayDate, setDisplayDate] = useState(date || DATE || '');

  useEffect(() => {
    if (date && normalizeDate(date)) {
      setDisplayDate(normalizeDate(date));
    } else if (DATE && normalizeDate(DATE)) {
      setDisplayDate(normalizeDate(DATE));
    }
  }, [date, DATE]);

  const [otp, setOtp] = useState('');
  const [apiLoader, setApiLoader] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [isCounting, setIsCounting] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
  const [RegisteredModalVisible, setRegisteredModalVisible] = useState(false);
  const [SuccessUpdateModalVisible, setSuccessUpdateModalVisible] =
    useState(false);

  const [modalVerify, setModalVerify] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageVerify, seterrorMessageVerify] = useState('');
  const [data, setData] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const otpInputRefs = useRef([]);
  const timeoutRef = useRef({});
  const [mobileTouched, setMobileTouched] = useState(false);
  // const [isPersonalDetailsChanged, setIsPersonalDetailsChanged] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      console.log('Navigating to UserDetails screen...');
    }
  }, [isNavigating]);

  useEffect(() => {
    const fetchRegisterUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/registerUser`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);

        const RegisterArray = data?.users || [];

        const formattedData = RegisterArray.map(user => ({
          name: user.PR_FULL_NAME?.trim().toLowerCase(),
          mobile: user.PR_MOBILE_NO,
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Optionally set some error state here
      }
    };

    fetchRegisterUsers();
  }, []);

  const validateFields = () => {
    let errors = {};

    if (!fullname) errors.fullname = 'Full name is required';
    if (!date) errors.date = 'Date of birth is required';
    if (!mobile) errors.mobile = 'Mobile number is required';

    setErrorMessageRegister(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  useEffect(() => {
    if (isAttempted) {
      validateFields();
    }
  }, [isAttempted, fullname, date, mobile]);

  const toggleModalVerify = () => {
    setModalVerify(!modalVerify);
  };

  const normalizeDate = inputDate => {
    if (!inputDate) return '';

    return inputDate.includes('/')
      ? inputDate.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$2-$1') // Convert DD/MM/YYYY → YYYY-MM-DD
      : inputDate;
  };

  const openDatePicker = () => {
    if (isEditable) {
      DateTimePickerAndroid.open({
        value: displayDate ? new Date(normalizeDate(displayDate)) : new Date(),
        onChange: (event, selectedDate) => {
          if (selectedDate) {
            const formattedSelectedDate = selectedDate
              .toISOString()
              .split('T')[0]; // YYYY-MM-DD

            const originalDate = userData?.PR_DOB || DATE;

            // Check if the new date matches the original date
            const isSameAsOriginal = formattedSelectedDate === originalDate;

            setDate?.(formattedSelectedDate);
            setDATE?.(formattedSelectedDate);

            // if (pageName === 'profile') setIsChanged(true);
            if (pageName === 'profile') {
              setIsPersonalDetailsChanged?.(!isSameAsOriginal);
              // setIsChanged(!isSameAsOriginal);
            }

            // setTimeout(() => {
            setDisplayDate(formattedSelectedDate); // Ensuring state update reflects in UI
            // }, 0);

            setAge?.(calculateAge(selectedDate));

            setErrorMessageRegister?.(prevErrors => ({
              ...prevErrors,
              date: '',
              mobileVerification:
                pageName === 'profile' && !isSameAsOriginal && !isMobileVerified
                  ? 'Please verify your details'
                  : '',
              // : '',
            }));

            console.log('Updated Date:', formattedSelectedDate);
          }
        },
        mode: 'date',
        is24Hour: true,
        maximumDate: new Date(),
      });
    }
  };

  const calculateAge = dob => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  const formattedSignupDate = displayDate
    ? new Date(normalizeDate(displayDate)).toLocaleDateString('en-GB')
    : '';
  console.log('Signup DATE (formatted):', formattedSignupDate);

  const formattedProfileDate =
    DATE && normalizeDate(DATE)
      ? new Date(normalizeDate(DATE)).toLocaleDateString('en-GB')
      : '';

  console.log('Profile DATE (formatted):', formattedProfileDate);

  const toggleModal = async () => {
    // const isValid = validateOtpFields();

    // if (!isValid) {
    //   return;
    // }

    if (pageName !== 'profile') {
      const isValid = validateOtpFields();
      if (!isValid) {
        return;
      }
    }

    setErrorMessage('');

    if (!mobile || mobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    if (pageName !== 'profile') {
      const normalizedInputName = (fullname || FULLNAME)?.trim().toLowerCase();
      const normalizedInputMobile = mobile;

      const isRegistered = data.some(
        user =>
          user.mobile === normalizedInputMobile &&
          user.name === normalizedInputName,
      );

      if (isRegistered) {
        setRegisteredModalVisible(true);
        return;
      }
    }

    setOtp('');
    // setApiLoader(true);

    try {
      const response = await axios.post(`${BASE_URL}generate-otp`, {
        PR_MOBILE_NO: String(mobile),
        PR_FULL_NAME: fullname || FULLNAME,
      });

      if (response.data.success) {
        ToastAndroid.showWithGravity(
          'OTP sent successfully!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        setOtp('');
        setModalVisible(true);
        startCountdown();
      } else {
        // Show error message in Toast only
        ToastAndroid.showWithGravity(
          response.data.message || 'Failed to send OTP',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      let errorMsg = 'Something went wrong. Please try again.';

      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }

      ToastAndroid.showWithGravity(
        errorMsg,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      // setApiLoader(false);
    }
  };

  const validateOtpFields = () => {
    if (pageName === 'profile') {
      return true;
    }

    let isValid = true;
    const errors = {};

    if (!fullname) {
      errors.fullname = 'Full name is required';
      isValid = false;
    }

    if (!date) {
      errors.date = 'Date of birth is required';
      isValid = false;
    }

    if (!mobile) {
      errors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (mobile.length !== 10) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    setErrorMessageRegister(errors);
    return isValid;
  };

  const startCountdown = () => {
    setCountdown(120);
    setIsCounting(true);
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false); // Stop countdown when it reaches zero
    }

    return () => clearInterval(timer); // Cleanup on unmount
  }, [isCounting, countdown]);

  const updateProfile = async () => {
    seterrorMessageVerify('');
    if (!otp || otp.length !== 4) {
      seterrorMessageVerify('Please enter a valid 4-digit OTP');
      return false;
    }

    setApiLoader(true);
    try {
      const response = await axios.post(
        'https://node2-plum.vercel.app/api/user/updateMobNam',
        {
          PR_ID: userData?.PR_ID, // You'll need to get this from your context or props
          PR_MOBILE_NO: mobile,
          PR_FULL_NAME: fullname || FULLNAME,
          PR_DOB: date || DATE,
          otp: otp,
        },
      );

      if (response.data.success) {
        ToastAndroid.showWithGravity(
          'Profile updated successfully!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );

        // Update your context or state with the new data
        if (setMobile) setMobile(response.data.user.PR_MOBILE_NO);
        if (setMOBILE) setMOBILE(response.data.user.PR_MOBILE_NO);
        if (setFullName) setFullName(response.data.user.PR_FULL_NAME);
        if (setFULLNAME) setFULLNAME(response.data.user.PR_FULL_NAME);
        if (setDate) setDate(response.data.user.PR_DOB);
        if (setDATE) setDATE(response.data.user.PR_DOB);
        setDisplayDate(response.data.user.PR_DOB);
        setModalVisible(false);
        setIsCounting(false);
        return true;
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Profile update failed',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return false;
      }
    } catch (error) {
      console.error('Profile Update Error:', error);
      ToastAndroid.showWithGravity(
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      return false;
    } finally {
      setApiLoader(false);
    }
  };

  const verifyOtp = async () => {
    seterrorMessageVerify('');
    if (!otp || otp.length !== 4) {
      seterrorMessageVerify('Please enter a valid 4-digit OTP');
      return;
    }

    setApiLoader(true);
    try {
      if (pageName === 'profile') {
        // Call update profile API for profile page
        const success = await updateProfile(); // <-- capture result

        if (success) {
          if (setIsMobileVerified) setIsMobileVerified(true);
          setSuccessUpdateModalVisible(true); // <-- only when success is true

          setErrorMessageRegister(prev => ({
            ...prev,
            mobileVerification: '',
          }));

          if (setIsPersonalDetailsChanged) setIsPersonalDetailsChanged(false);
          setIsChanged(false);
        }
      } else {
        // Original verify OTP flow for signup
        const response = await axios.post(`${BASE_URL}verify-otp`, {
          PR_MOBILE_NO: mobile,
          otp: otp,
          PR_FULL_NAME: fullname,
          PR_DOB: date,
        });

        if (response.data.success) {
          await storeData('PR_ID', response.data.PR_ID);
          if (setIsMobileVerified) setIsMobileVerified(true);
          setErrorMessageRegister(prev => ({
            ...prev,
            mobileVerification: '',
          }));
          ToastAndroid.showWithGravity(
            'OTP Verified Successfully!',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );

          setModalVisible(false);
          setIsCounting(false);
          setIsMobileVerified(true);
          setSuccessModalVisible(true);
        } else {
          ToastAndroid.showWithGravity(
            response.data.message || 'OTP verification failed',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
        }
      }
    } catch (error) {
      console.error('Verification Error:', error);
      ToastAndroid.showWithGravity(
        error.response?.data?.message ||
          'Something went wrong. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      setApiLoader(false);
    }
  };

  const handleNameChange = text => {
    if (setFullName) setFullName(text);
    if (setFULLNAME) setFULLNAME(text);

    const originalName = userData?.PR_FULL_NAME || FULLNAME;

    // Check if the text matches the original name
    const isSameAsOriginal = text === originalName;

    // if (pageName === 'profile') {
    //   setIsPersonalDetailsChanged?.(true);
    //   setIsChanged(true);
    // }
    if (pageName === 'profile') {
      setIsPersonalDetailsChanged?.(!isSameAsOriginal);
      setIsChanged(!isSameAsOriginal);
    }
    // if (isAttempted) {
    setErrorMessageRegister?.(prevErrors => ({
      ...prevErrors,
      fullname: text.trim()
        ? ''
        : isAttempted
        ? 'Full Name is required'
        : prevErrors.fullname,
      mobileVerification:
        pageName === 'profile' && !isSameAsOriginal && !isMobileVerified
          ? 'Please verify your details'
          : '',
      // : '',
    }));
    // }
  };

  const handleMobileChange = text => {
    setMobile?.(text);
    setMOBILE?.(text);
    setMobileTouched(true);

    const originalMobile = userData?.PR_MOBILE_NO || MOBILE;

    // Check if the text matches the original mobile number
    const isSameAsOriginal = text === originalMobile;

    if (pageName === 'profile') {
      setIsPersonalDetailsChanged?.(!isSameAsOriginal);
      setIsChanged(!isSameAsOriginal);
    }

    // if (isAttempted) {
    setErrorMessageRegister?.(prevErrors => ({
      ...prevErrors,
      mobile:
        text.trim().length === 10
          ? ''
          : isAttempted
          ? text.trim().length > 0
            ? 'Please enter 10 digits mobile number'
            : 'Mobile number is required'
          : prevErrors.mobile,
      mobileVerification:
        pageName === 'profile' && !isSameAsOriginal && !isMobileVerified
          ? 'Please verify your details'
          : '',
    }));
    // }
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
        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      {/* <AppLoader loading={apiLoader} /> */}
      <View
        style={{
          width: wp(83),
          marginTop: hp(2),
        }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Personal Details
        </Text>

        <View
          style={{
            width: wp(83),
            borderRadius: wp(2),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: hp(2),

            borderColor: errorMessageRegister?.fullname ? 'red' : '#CCCCCC',
            borderWidth: errorMessageRegister?.fullname ? wp(0.3) : wp(0.0),
          }}>
          <Image
            source={name}
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
            value={fullname || FULLNAME}
            // onChangeText={text => handleTextChange(text, 'fullname')}
            // onChangeText={text => {
            //   if (setFullName) setFullName(text); // If in signup, update signup state
            //   if (setFULLNAME) setFULLNAME(text);

            //   if (pageName === 'profile') setIsChanged(true);

            //   // ✅ Clear error message when user starts typing
            //   setErrorMessageRegister?.(prevErrors => ({
            //     ...prevErrors,
            //     fullname: text.trim() ? '' : 'Full Name is required',
            //   }));
            // }}
            onChangeText={handleNameChange}
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
            placeholder="Full Name"
            placeholderTextColor={'#BFBDBE'}
          />
        </View>
        {errorMessageRegister?.fullname && (
          <Text style={styles.errorText}>{errorMessageRegister.fullname}</Text>
        )}

        <TouchableOpacity
          onPress={openDatePicker}
          style={{
            width: wp(83),
            height: hp(5.5),
            marginTop: hp(2),
            paddingLeft: wp(5.5),
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: wp(2),
            backgroundColor: '#FFFFFF',
            borderColor: errorMessageRegister?.date ? 'red' : '#CCCCCC',
            borderWidth: errorMessageRegister?.date ? wp(0.3) : wp(0.0),
          }}
          disabled={!isEditable} // Ensure isEditable is properly set
        >
          <Image
            source={dob}
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
          <Text
            style={{
              marginLeft: wp(4.5),
              fontSize: hp(1.8),
              fontFamily: 'Poppins-Medium',
              color: displayDate ? '#000000' : '#BFBDBE', // Ensures color change
            }}>
            {displayDate
              ? new Date(displayDate).toLocaleDateString('en-GB')
              : 'Enter Your DOB'}
          </Text>
        </TouchableOpacity>

        {errorMessageRegister?.date && (
          <Text style={styles.errorText}>{errorMessageRegister.date}</Text>
        )}

        <View style={{}}>
          <View
            style={{
              width: wp(83),
              borderRadius: wp(2),
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              marginTop: hp(2),
              borderColor:
                errorMessageRegister?.mobile ||
                (pageName !== 'profile' &&
                  errorMessageRegister?.mobileVerification) ||
                errorMessage
                  ? 'red'
                  : '#CCCCCC',
              borderWidth:
                errorMessageRegister?.mobile ||
                (pageName !== 'profile' &&
                  errorMessageRegister?.mobileVerification) ||
                errorMessage
                  ? wp(0.3)
                  : wp(0),
            }}>
            <Image
              source={phone}
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
              value={mobile || MOBILE}
              // onChangeText={text => handleTextChange(text, 'mobile')}
              //   onChangeText={text => {
              //     setMobile?.(text);
              //     setMOBILE?.(text);
              //     setIsChanged(true);

              //     // if (pageName === 'profile') setIsChanged(true);
              //     // if (setFullName) setFullName(text); // If in signup, update signup state
              //     // if (setFULLNAME) setFULLNAME(text);

              //     // ✅ Clear error message when user starts typing
              //     // if (pageName !== 'profile') {
              //     //   setErrorMessageRegister(prevErrors => ({
              //     //     ...prevErrors,
              //     //     mobile: text.trim() ? '' : 'Mobile number is required',
              //     //   }));

              //     //   setErrorMessageRegister(prevErrors => ({
              //     //     ...prevErrors,
              //     //     mobileVerification: text.trim()
              //     //       ? ''
              //     //       : 'Please verify your mobile number',
              //     //   }));
              //     // }
              //     if (pageName === 'profile' && text !== MOBILE) {
              //       setIsMobileVerified?.(false);
              //       setErrorMessageRegister?.(prevErrors => ({
              //         ...prevErrors,
              //         mobileVerification: 'Please verify your mobile number',
              //       }));
              //     }
              //     setErrorMessageRegister(prevErrors => ({
              //       ...prevErrors,
              //       mobile:
              //         text.trim().length === 10
              //           ? ''
              //           : text.trim().length > 0
              //           ? 'Please enter 10 digits mobile number'
              //           : 'Mobile number is required',
              //       // Only set mobileVerification error in signup flow
              //       ...(pageName !== 'profile' && {
              //         mobileVerification:
              //           text.trim() === ''
              //             ? 'Please verify your mobile number'
              //             : '',
              //       }),
              //       ...(pageName !== 'profile' && {
              //         mobileVerification: isMobileVerified
              //           ? ''
              //           : 'Please verify your mobile number',
              //       }),
              //     }));
              //   }

              // }
              onChangeText={handleMobileChange}
              editable={isEditable}
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
              maxLength={10}
              placeholder="Mobile Number"
              placeholderTextColor={'#BFBDBE'}
              keyboardType="phone-pad"
            />
          </View>
          {/* <View style={{position: 'absolute', marginTop: hp(7)}}>
            {errorMessageRegister?.mobileVerification && (
              <Text style={styles.errorText}>
                {errorMessageRegister.mobileVerification}
              </Text>
            )}

            {errorMessage ? (
              <Text
                style={{
                  color: 'red',
                  marginTop: 10,
                }}>
                {errorMessage}
              </Text>
            ) : null}

            {errorMessageRegister?.mobile && (
              <Text style={styles.errorText}>
                {errorMessageRegister.mobile}
              </Text>
            )}
          </View> */}
          {/* <View style={{position: 'absolute', marginTop: hp(7)}}>
            {pageName !== 'profile' && (
              <>
                {errorMessageRegister?.mobile ? (
                  <Text style={styles.errorText}>
                    {errorMessageRegister.mobile}
                  </Text>
                ) : errorMessageRegister?.mobileVerification ? (
                  <Text style={styles.errorText}>
                    {errorMessageRegister.mobileVerification}
                  </Text>
                ) : errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
              </>
            )}
          </View> */}
          <View style={{position: 'absolute', marginTop: hp(7)}}>
            {errorMessageRegister?.mobile ? (
              <Text style={styles.errorText}>
                {errorMessageRegister.mobile}
              </Text>
            ) : (
              <>
                {(pageName === 'profile' || pageName !== 'profile') &&
                errorMessageRegister?.mobileVerification ? (
                  <Text style={styles.errorText}>
                    {errorMessageRegister.mobileVerification}
                  </Text>
                ) : null}
                {errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
              </>
            )}
          </View>

          {pageName === 'signup' ||
          pageName === 'AddFamilyMembers' ||
          (pageName === 'profile' && isChanged) ? (
            <TouchableOpacity
              onPress={toggleModal}
              // onPress={verifyOtp}
              disabled={apiLoader}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                // marginVertical: hp(3.5),
                marginTop: hp(4.5),

                // paddingHorizontal: wp(40),
                width: wp(83),
                alignItems: 'center',
                paddingVertical: hp(1),
                borderRadius: wp(2),
                backgroundColor: '#152340',
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  color: '#FFFFFF',
                }}>
                {apiLoader ? 'Sending...' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* {isMobileVerified && (
            <Image
              source={Success} // You'll need to import this image
              style={{
                height: hp(2.5),
                width: wp(5),
                position: 'absolute',
                right: wp(3),
              }}
            />
          )} */}

          {errorMessageRegister?.otp && (
            <Text style={styles.errorText}>{errorMessageRegister.otp}</Text>
          )}
          {/* )} */}
          <Modal
            isVisible={isModalVisible}
            // onBackdropPress={() => setModalVisible(false)}
          >
            <LinearGradient
              start={{x: 1, y: 1.7}}
              end={{x: 0.2, y: 0}}
              colors={['#59202B', '#D9674E']}
              style={{
                height: hp(45),
                width: wp(82),
                borderRadius: wp(10),
                alignSelf: 'center',
                marginTop: hp(10),
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2.2),
                  textAlign: 'center',
                  marginTop: hp(4),
                  color: '#FFFFFF',
                  marginHorizontal: wp(3),
                }}>
                Enter OTP sent to your mobile number
              </Text>

              {/* <OTPInputView
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  marginTop: hp(5),
                  height: hp(5),
                  alignItems: 'center',
                  alignContent: 'center',
                }}
                pinCount={4}
                code={otp}
                onCodeChanged={setOtp}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  console.log(`Code is ${code}, you are good to go!`);
                }}
                // placeholderCharacter=" - "
                placeholderTextColor="#000"
                keyboardType="phone-pad"
              /> */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: hp(5),
                  alignSelf: 'center',
                  width: '80%',
                }}>
                {[0, 1, 2, 3].map(index => (
                  <TextInput
                    key={index}
                    ref={ref => (otpInputRefs.current[index] = ref)}
                    style={[
                      styles.otpInputBox,
                      otp.length === index && styles.otpHighlightBox,
                    ]}
                    value={otp[index] || ''}
                    onChangeText={text => {
                      if (/^\d*$/.test(text)) {
                        let newOtp = otp;
                        if (text) {
                          // Add new digit
                          newOtp =
                            otp.substring(0, index) +
                            text +
                            otp.substring(index + 1);
                        } else {
                          // Handle backspace
                          newOtp =
                            otp.substring(0, index) + otp.substring(index + 1);
                        }
                        setOtp(newOtp);

                        // Auto focus next input if there's a value
                        if (text && index < 3) {
                          otpInputRefs.current[index + 1]?.focus();
                        }

                        // Auto submit if all fields are filled
                        if (newOtp.length === 4) {
                          verifyOtp();
                        }

                        seterrorMessageVerify(''); // Clear any previous error
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      // Handle backspace to move to previous input
                      if (
                        nativeEvent.key === 'Backspace' &&
                        !otp[index] &&
                        index > 0
                      ) {
                        otpInputRefs.current[index - 1]?.focus();
                      }
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                    autoFocus={index === 0}
                  />
                ))}
              </View>

              {errorMessageVerify ? (
                <Text style={{color: 'red', marginTop: 10, marginLeft: wp(10)}}>
                  {errorMessageVerify}
                </Text>
              ) : null}

              <View
                style={{
                  marginLeft: wp(10),
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(1.4),
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: hp(1.7),
                    alignSelf: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  didn't receive the code?
                </Text>
                {/* </View>    */}
                <TouchableOpacity
                  onPress={toggleModal}
                  disabled={apiLoader || isCounting}
                  style={{
                    marginLeft: wp(2),
                    alignSelf: 'center',
                    alignItems: 'centers',
                  }}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: hp(1.9),
                      color: isCounting ? '#8C8C8C' : '#DEB737',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>

              {isCounting && (
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: hp(2),
                    color: '#FFFFFF',
                    alignSelf: 'center',
                  }}>
                  {Math.floor(countdown / 60)}:
                  {(countdown % 60).toString().padStart(2, '0')}
                </Text>
              )}

              <TouchableOpacity
                onPress={verifyOtp}
                disabled={apiLoader}
                style={{alignSelf: 'center', justifyContent: 'center'}}>
                <LinearGradient
                  start={{x: 1, y: 1.7}}
                  end={{x: 0.2, y: 0}}
                  colors={['#D6D9C5', '#CAC9C7']}
                  style={{
                    height: hp(5),
                    width: wp(65),
                    borderRadius: wp(2),
                    alignSelf: 'center',
                    marginTop: hp(6),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins-SemiBold',
                      color: '#000000',
                      fontSize: hp(2.4),
                    }}>
                    {apiLoader ? 'Verifying...' : 'Verify'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </Modal>
          {/* Modal fro Success OtP */}
          <Modal
            isVisible={SuccessModalVisible}
            // onBackdropPress={() => setSuccessModalVisible(false)}
            style={{zIndex: 100}}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(80),
                paddingVertical: hp(2),
                borderRadius: wp(3),
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', right: 20}}
                onPress={() => {
                  setSuccessModalVisible(false); // Hide the modal
                  setCurrentPage(1); // Move to GenderDetails page
                  if (scrollViewRef?.current) {
                    scrollViewRef.current.scrollTo({
                      x: wp(100),
                      animated: true,
                    });
                  }
                }}>
                <Image
                  source={cancel}
                  style={{height: hp(3.3), aspectRatio: 1 / 1}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Image
                source={Success}
                style={{height: hp(15), width: wp(30)}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Semibold',
                  fontSize: hp(3),
                  textAlign: 'center',
                  color: '#2F4032',
                }}>
                Success
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2),
                  textAlign: 'center',
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  color: '#697368',
                }}>
                Success! Your number is now registered.
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2),
                  textAlign: 'center',
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  color: '#697368',
                }}>
                Great! Now, let's add some more details to set up your account.
              </Text>
            </View>
          </Modal>

          {/* Modal fro Registered OtP */}
          <Modal
            isVisible={RegisteredModalVisible}
            // onBackdropPress={() => setSuccessModalVisible(false)}
            style={{zIndex: 100}}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(80),
                paddingVertical: hp(2),
                borderRadius: wp(3),
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', right: 20}}
                onPress={() => {
                  setRegisteredModalVisible(false);
                }}>
                <Image
                  source={cancel}
                  style={{height: hp(3.3), aspectRatio: 1 / 1}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Image
                source={Registered}
                style={{height: hp(15), width: wp(30)}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Semibold',
                  fontSize: hp(3),
                  textAlign: 'center',
                  color: '#2F4032',
                }}>
                Registered
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2),
                  textAlign: 'center',
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  color: '#697368',
                }}>
                Your profile is already registered.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setRegisteredModalVisible(false);
                  navigation.navigate('Signin'); // Navigate to Signin screen
                }}
                style={styles.LoginButton}>
                <Text style={styles.LoginButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* Modal for Update OtP */}
          <Modal
            isVisible={SuccessUpdateModalVisible}
            // onBackdropPress={() => setSuccessModalVisible(false)}
            style={{zIndex: 100}}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(80),
                paddingVertical: hp(2),
                borderRadius: wp(3),
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', right: 20}}
                onPress={() => {
                  setSuccessUpdateModalVisible(false); // Hide the modal
                  setCurrentPage(1); // Move to GenderDetails page
                  if (scrollViewRef?.current) {
                    scrollViewRef.current.scrollTo({
                      x: wp(100),
                      animated: true,
                    });
                  }
                }}>
                <Image
                  source={cancel}
                  style={{height: hp(3.3), aspectRatio: 1 / 1}}
                />
              </TouchableOpacity>
              <Image
                source={updatedsucess1}
                style={{height: hp(15), width: wp(30)}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Semibold',
                  fontSize: hp(3),
                  textAlign: 'center',
                  color: '#2F4032',
                }}>
                Success
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2),
                  textAlign: 'center',
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  color: '#697368',
                }}>
                Success! Your number is now updated.
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2),
                  textAlign: 'center',
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  color: '#697368',
                }}>
                Great! Now, let's add some more details to set up your account.
              </Text>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  otpInputBox: {
    width: wp(12.5),
    height: hp(6),
    borderBottomWidth: wp(0.3),
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: hp(2),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  otpHighlightBox: {
    borderColor: '#2F4032',
  },
  LoginButton: {
    borderWidth: wp(0.1),
    paddingVertical: hp(1.3),
    borderRadius: wp(2),
    paddingHorizontal: wp(25),
    marginTop: hp(3),
    backgroundColor: '#86a1ce',
    elevation: 5,
  },
  LoginButtonText: {
    fontSize: hp(2),
    fontWeight: '500',
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
  },
});

export default UserDetails;
