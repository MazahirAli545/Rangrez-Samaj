import {React, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import leftback from '../provider/png/leftback.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {storeData, async_keys, getData} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from 'react-native-image-resizer';

const FeedBack = props => {
  const [name, setName] = useState('');
  const [mobile, setMobileNo] = useState('');
  const [message, setMessage] = useState('');
  const [apiLoader, setApiLoader] = useState(false);
  const [rating, setRating] = useState(5);
  console.log('RATING', rating);

  const [errorMessage, setErrorMessage] = useState({});

  const ratingCompleted = ratingValue => {
    console.log('Selected Rating:', ratingValue);
    setRating(ratingValue);
  };

  const checkStoredToken = async () => {
    const token = await getData(async_keys.auth_token);
    console.log('🔹 Stored Token:', token);
  };

  checkStoredToken();

  const handleConntact = async () => {
    let error = {};

    if (!name.trim()) {
      error.name = 'Please enter your name.';
    }
    if (mobile.length !== 10) {
      error.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (!message.trim()) {
      error.message = 'Please enter a message';
    }

    if (Object.keys(error).length > 0) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage({});

    setApiLoader(true);
    try {
      const token = await getData(async_keys.auth_token);

      const formData = new FormData();
      formData.append('CON_TYPE', 'FEEDBACK');
      formData.append('CON_NAME', name);
      formData.append('CON_MOBILE_NO', mobile);
      formData.append('CON_MORE_DETAIL', message);
      // formData.append('CON_RATING', Number(rating));
      formData.append('CON_RATING', parseInt(rating, 10));
      formData.append('CON_ACTIVE_YN', 'Y');

      console.log('TTTTTTMMMAMA', formData);

      const response = await axios.post(`${BASE_URL}contactUs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        ToastAndroid.showWithGravity(
          'Form Submitted Successfully!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        setName('');
        setMobileNo('');
        setMessage('');
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Form Submission Failed!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('FeedBack Error:', error);
      ToastAndroid.showWithGravity(
        'Something went wrong. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      setApiLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <AppLoader loading={apiLoader} />
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          // colors={['#A65B1B', '#E9EAF2']}
          colors={['#BDD9F2', '#F0F2F2']}
          style={{flex: 1}}>
          <View
            style={{
              paddingVertical: hp(1),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp(2),
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
              <Image
                source={leftback}
                style={{height: hp(4.5), width: wp(10)}}
                tintColor={'#000000'}
              />
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: ' Poppins-SemiBold',
                  fontWeight: '600',
                  fontSize: hp(3),
                }}>
                FeedBack
              </Text>
            </View>
          </View>

          {/* <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}> */}
          <View style={{marginBottom: hp(5)}}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: hp(1.5),
                fontSize: hp(2.4),
                fontFamily: 'Poppins-Medium',
                color: '#1F260F',
              }}>
              Rangrez FeedBack Form
            </Text>

            <View
              style={{
                width: wp(90),
                alignSelf: 'center',
                borderRadius: wp(5),
                height: hp(81),
                backgroundColor: '#D6D9C5',
                marginTop: hp(2),
                // elevation: 5
              }}>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                bounces={false}
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}>
                <TextInput
                  style={{
                    width: wp(82),
                    alignSelf: 'center',
                    fontSize: hp(2),
                    color: 'grey',
                    marginTop: hp(1.5),
                    fontFamily: 'Poppins-Medium',
                  }}
                  label="Full Name"
                  mode="outlined"
                  value={name}
                  outlineColor="#F27141"
                  onChangeText={name => {
                    setName(name),
                      setErrorMessage(prev => ({...prev, name: ''}));
                  }}
                  theme={{
                    fonts: {
                      regular: {fontSize: hp(2)},
                    },
                  }}
                />
                {errorMessage.name && (
                  <Text
                    style={{
                      fontSize: hp(1.7),
                      color: 'red',
                      marginTop: 5,
                      marginLeft: wp(5),
                    }}>
                    {errorMessage.name}
                  </Text>
                )}

                <TextInput
                  style={{
                    width: wp(82),
                    alignSelf: 'center',
                    fontSize: hp(2),
                    color: 'grey',
                    marginTop: hp(2),
                  }}
                  keyboardType="phone-pad"
                  nu
                  maxLength={10}
                  label="Enter Mobile No."
                  mode="outlined"
                  value={mobile}
                  outlineColor="#F27141"
                  onChangeText={mobile => {
                    setMobileNo(mobile),
                      setErrorMessage(prev => ({...prev, mobile: ''}));
                  }}
                  theme={{
                    fonts: {
                      regular: {fontSize: hp(2)},
                    },
                  }}
                />
                {errorMessage.mobile && (
                  <Text
                    style={{
                      fontSize: hp(1.7),
                      color: 'red',
                      marginTop: 5,
                      marginLeft: wp(5),
                    }}>
                    {errorMessage.mobile}
                  </Text>
                )}

                <TextInput
                  style={{
                    width: wp(82),
                    alignSelf: 'center',
                    fontSize: hp(2.2),
                    color: 'grey',
                    marginTop: hp(2),
                    height: hp(21),
                  }}
                  textAlignVertical="top"
                  label="Enter Your FeedBack"
                  mode="outlined"
                  value={message}
                  numberOfLines={8} // Adjust based on how many lines you want to show
                  multiline={true}
                  outlineColor="#F27141"
                  onChangeText={message => {
                    setMessage(message),
                      setErrorMessage(prev => ({...prev, message: ''}));
                  }}
                  theme={{
                    fonts: {
                      regular: {fontSize: hp(2)}, // Adjust this value to set the label font size
                    },
                  }}
                />
                {errorMessage.message && (
                  <Text
                    style={{
                      fontSize: hp(1.7),
                      color: 'red',
                      marginTop: 5,
                      marginLeft: wp(5),
                    }}>
                    {errorMessage.message}
                  </Text>
                )}

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F1F2E9',
                    width: wp(80),
                    borderRadius: wp(5),
                    marginTop: hp(4),
                    borderColor: '#F27141',
                    borderWidth: wp(0.3),
                  }}>
                  <Text
                    style={{
                      marginTop: hp(2),
                      fontSize: hp(2.1),
                      fontFamily: 'Poppins-SemiBold',
                      color: '#2F4032',
                    }}>
                    Enjoying the Rangrez App ?
                  </Text>
                  <Text
                    style={{
                      marginTop: hp(0.5),
                      fontSize: hp(2.1),
                      fontFamily: 'Poppins-SemiBold',
                      color: '#2F4032',
                    }}>
                    Rate Us
                  </Text>

                  <AirbnbRating
                    count={5}
                    reviews={['Bad', 'ok', 'Average', 'Good', 'Amazing']}
                    defaultRating={5}
                    size={35}
                    reviewSize={25} // Font size of reviews
                    reviewColor="#1F260F" //
                    onFinishRating={ratingCompleted}
                    starContainerStyle={{
                      // padding: wp(5),
                      marginVertical: hp(2),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: wp(70),
                    }}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleConntact}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // height: hp(6),
                    marginTop: hp(4),
                    marginBottom: hp(5),
                    alignItems: 'center',
                    paddingVertical: hp(1),
                    borderRadius: wp(20),
                    width: wp(78),
                    borderColor: '#F27141',
                    borderWidth: wp(0.3),
                    backgroundColor: '#FFFFFF',
                  }}>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', fontSize: hp(2.2)}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </KeyboardAwareScrollView>
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default FeedBack;
