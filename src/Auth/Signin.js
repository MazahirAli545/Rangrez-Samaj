import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
  FlatList,
  StatusBar,
  InteractionManager,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import leftback from '../provider/png/leftback.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import phone from '../provider/png/phone.png';
import AppLoader from '../components/AppLoader';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import {storeData, async_keys, getData} from '../api/UserPreference';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Modal from 'react-native-modal';
import {useTranslation} from 'react-i18next';
import i18n from '../components/i18n';

const Signin = props => {
  const [apiLoader, setApiLoader] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const otpInputRef = React.useRef(null);
  const otpInputRefs = useRef([]);
  const {t} = useTranslation();
  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const startCountdown = () => {
    setCountdown(120);
    setIsCounting(true);
  };

  const handleSignIn = async () => {
    if (mobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setApiLoader(true);
    try {
      const response = await axios.post(`${BASE_URL}login`, {
        PR_MOBILE_NO: mobile,
      });

      console.log('RESPONSE', response.data);

      if (response.data.success) {
        ToastAndroid.showWithGravity(
          'OTP sent to your mobile',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        setOtpModalVisible(true);
        startCountdown();
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Login failed',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('Login error:', error);
      ToastAndroid.showWithGravity(
        error.response?.data?.message || 'Network error. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      setApiLoader(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP');
      return;
    }

    setApiLoader(true);
    try {
      const response = await axios.post(`${BASE_URL}login`, {
        PR_MOBILE_NO: mobile,
        otp: otp,
      });

      if (response.data.success) {
        if (response.data.multipleUsers) {
          // Show user selection modal
          setUsersList(response.data.users);
          setUserModalVisible(true);
          setOtpModalVisible(false);
        } else {
          // Single user - login directly
          await storeData(async_keys.auth_token, response.data.token);
          await storeData(
            async_keys.user_data,
            JSON.stringify(response.data.user),
          );

          ToastAndroid.showWithGravity(
            'Login successful!',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );

          setOtp('');
          setOtpModalVisible(false);
          props.navigation.navigate('HomeScreen');
        }
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'OTP verification failed',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Invalid OTP';
      }
      ToastAndroid.showWithGravity(
        errorMessage,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      setApiLoader(false);
    }
  };

  // When user selects an account from the list
  const handleUserSelection = async userId => {
    setApiLoader(true);
    try {
      const response = await axios.post(`${BASE_URL}login`, {
        PR_MOBILE_NO: mobile,
        otp: otp,
        selectedUserId: userId,
      });

      // console.log('DATA sasas', response?.data);

      if (response.data.success) {
        // Store the token and user data
        await storeData(async_keys.auth_token, response.data.token);
        await storeData(
          async_keys.user_data,
          JSON.stringify(response.data.user),
        );

        ToastAndroid.showWithGravity(
          'Login successful!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );

        // Close modals and navigate
        setUserModalVisible(false);
        setOtpModalVisible(false);
        props.navigation.navigate('HomeScreen');
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Login failed',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('User selection error:', error);
      ToastAndroid.showWithGravity(
        'Something went wrong. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      setApiLoader(false);
    }
  };

  const resendOtp = async () => {
    if (isCounting) return;

    setApiLoader(true);
    try {
      const response = await axios.post(`${BASE_URL}login`, {
        PR_MOBILE_NO: mobile,
      });

      if (response.data.success) {
        ToastAndroid.showWithGravity(
          'OTP resent successfully',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        startCountdown();
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Failed to resend OTP',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      ToastAndroid.showWithGravity(
        'Failed to resend OTP. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      setApiLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLoader loading={apiLoader} />
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#800000', '#FFFFFF']}
            style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Onboarding')}>
              <Image
                source={leftback}
                tintColor={'black'}
                style={{height: hp(5), aspectRatio: 1 / 1, margin: hp(2)}}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: hp(3.1),
                fontFamily: 'Poppins-Medium',
              }}>
              {/* Login Here */}
              {t('LOGIN')}
            </Text>

            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Poppins-Regular',
                fontSize: hp(2),
                textAlign: 'center',
                marginTop: hp(2),
              }}>
              {/* Empowering the Rangrej Community{'\n'} with Unity and Purpose */}
              {t('LoginHeader')}
            </Text>

            <View
              style={{
                backgroundColor: 'rgba(197, 206, 217, 0.7)',
                alignSelf: 'center',
                marginTop: hp(12),
                paddingVertical: hp(4),
                paddingHorizontal: wp(4),
                borderRadius: wp(3),
              }}>
              <View
                style={{
                  width: wp(80),
                  borderRadius: wp(2),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                }}>
                <Image
                  source={phone}
                  style={{
                    // height: hp(2.5),
                    aspectRatio: 1 / 1,
                    // width: wp(5.2),
                    width: hp(2.5),
                    marginLeft: wp(3.5),
                  }}
                  tintColor={'#BFB6AE'}
                />
                <TextInput
                  style={{
                    paddingLeft: wp(2),
                    width: wp(76),
                    color: 'black',
                    fontSize: hp(2),
                    fontFamily: 'Poppins-Medium',
                  }}
                  placeholder={t('Mobile')}
                  placeholderTextColor={'#BFBDBE'}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={text => {
                    setMobile(text);
                    setErrorMessage('');
                  }}
                  secureTextEntry={false}
                />
              </View>
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              <TouchableOpacity onPress={handleSignIn} disabled={apiLoader}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['#79adcc', '#2D4B73']}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderRadius: wp(2),
                    marginTop: hp(2),
                    // paddingHorizontal: wp(32),
                    // paddingVertical: hp(1.2),
                    width: wp(80),
                    height: hp(6),
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: hp(2),
                      fontFamily: 'Poppins-Medium',
                      color: '#FFF',
                    }}>
                    {apiLoader ? t('Processing') : t('Sign In')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: hp(3),
                }}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontFamily: 'Poppins-Medium',
                    color: '#000000',
                  }}>
                  {/* Don't have an Account ? */}
                  {t('Account')}
                </Text>
                <Text
                  onPress={() => props.navigation.navigate('Signup')}
                  style={{
                    fontSize: hp(1.8),
                    marginLeft: wp(1),
                    fontFamily: 'Poppins-SemiBold',
                    color: '#0468BF',
                  }}>
                  {/* Sign up */}
                  {t('Sign up')}
                </Text>
              </View>
            </View>

            {/* OTP Verification Modal */}
            <Modal
              isVisible={isOtpModalVisible}
              onModalShow={() => {
                InteractionManager.runAfterInteractions(() => {
                  // Focus the first input when modal opens
                  if (otpInputRefs.current[0]) {
                    otpInputRefs.current[0].focus();
                  }
                });
              }}
              avoidKeyboard={true}
              style={{
                margin: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{width: wp(85)}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <LinearGradient
                    start={{x: 1, y: 1.7}}
                    end={{x: 0.2, y: 0}}
                    colors={['#697368', '#2F4032']}
                    style={styles.otpModal}>
                    <Text style={styles.otpTitle}>
                      Enter OTP sent to your mobile number
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: hp(5),
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
                                  otp.substring(0, index) +
                                  otp.substring(index + 1);
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

                              setOtpError('');
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

                    {otpError && (
                      <Text style={styles.otpError}>{otpError}</Text>
                    )}

                    <View style={styles.otpResendContainer}>
                      <Text style={styles.otpResendText}>
                        didn't receive the code?
                      </Text>
                      <TouchableOpacity
                        onPress={resendOtp}
                        disabled={isCounting || apiLoader}>
                        <Text
                          style={[
                            styles.otpResendLink,
                            isCounting && styles.disabledResend,
                          ]}>
                          Resend OTP
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {isCounting && (
                      <Text style={styles.countdownText}>
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
                          marginTop: hp(4),
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
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </Modal>

            {/* User Selection Modal */}
            <Modal isVisible={isUserModalVisible}>
              <LinearGradient
                colors={['#697368', '#2F4032']}
                style={styles.userModal}
                start={{x: 1, y: 1.7}}
                end={{x: 0.2, y: 0}}>
                <Text style={styles.userModalTitle}>
                  Multiple accounts found
                </Text>
                <Text style={styles.userModalSubtitle}>
                  Please select your account
                </Text>

                <FlatList
                  removeClippedSubviews={false}
                  data={usersList}
                  keyExtractor={item => item.PR_ID.toString()}
                  contentContainerStyle={styles.userList}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleUserSelection(item.PR_ID)}
                      style={styles.userItem}>
                      <Text style={styles.userName}>{item.PR_FULL_NAME}</Text>
                      {/* <Text style={styles.userId}>{item.PR_UNIQUE_ID}</Text> */}
                      {!item.PR_UNIQUE_ID.startsWith('0000-00') && (
                        <Text style={styles.userId}>{item.PR_UNIQUE_ID}</Text>
                      )}
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  onPress={() => setUserModalVisible(false)}
                  style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Modal>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  otpInputBox: {
    width: wp(15),
    height: hp(6),
    borderRadius: wp(2),
    borderBottomWidth: wp(0.3),
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: hp(2),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  otpHighlightBox: {
    borderColor: '#DEB737',
  },
  container: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 2,
  },
  otpModal: {
    height: hp(45),
    width: wp(85),
    borderRadius: wp(10),
    alignSelf: 'center',
    padding: wp(5),
  },
  otpTitle: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2.2),
    textAlign: 'center',
    marginTop: hp(4),
    color: '#FFFFFF',
    marginHorizontal: wp(3),
  },
  otpInputContainer: {
    width: '80%',
    alignSelf: 'center',
    marginTop: hp(5),
    height: hp(5),
  },
  underlineStyleBase: {
    width: wp(11),
    height: hp(6),

    borderBottomColor: '#FFF',
    fontSize: wp(4),
  },
  underlineStyleHighLighted: {
    borderBottomColor: '#DEB737',
    color: '#FFF',
  },
  otpError: {
    color: 'red',
    marginTop: hp(1),
    textAlign: 'center',
  },
  otpResendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.4),
    justifyContent: 'center',
  },
  otpResendText: {
    color: '#FFFFFF',
    fontSize: hp(1.7),
    fontFamily: 'Poppins-Regular',
  },
  otpResendLink: {
    fontWeight: '600',
    fontSize: hp(1.9),
    color: '#DEB737',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp(2),
  },
  disabledResend: {
    color: '#8C8C8C',
  },
  countdownText: {
    fontSize: hp(2),
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  verifyButton: {
    height: hp(5),
    width: wp(65),

    borderRadius: wp(2),
    alignSelf: 'center',
    marginTop: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    fontSize: hp(2.4),
  },
  userModal: {
    height: hp(55),
    width: wp(85),
    borderRadius: wp(10),
    alignSelf: 'center',
    padding: wp(5),
  },
  userModalTitle: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2.2),
    textAlign: 'center',
    marginTop: hp(2),
    color: '#FFFFFF',
  },
  userModalSubtitle: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(1.8),
    textAlign: 'center',
    marginTop: hp(1),
    color: '#FFFFFF',
    marginBottom: hp(2),
  },
  userList: {
    paddingBottom: hp(2),
  },
  userItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: wp(4),
    marginVertical: hp(1),
    borderRadius: wp(2),
  },
  userName: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2),
  },
  userId: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    fontSize: hp(1.6),
    marginTop: hp(0.5),
  },
  cancelButton: {
    alignSelf: 'center',
    marginTop: hp(1),
  },
  cancelButtonText: {
    color: '#DEB737',
    fontFamily: 'Poppins-SemiBold',
    fontSize: hp(2),
  },
});

export default Signin;
