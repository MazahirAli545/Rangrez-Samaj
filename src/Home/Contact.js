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
import user from '../provider/png/user.png';
import CustomImagePicker from '../components/CameraComponent';
import add from '../provider/png/add.png';
import attachdocs from '../provider/png/attachdocs.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {storeData, async_keys, getData} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from 'react-native-image-resizer';

// import RNFS from 'react-native-fs';

const Contact = props => {
  const [name, setName] = useState('');
  const [mobile, setMobileNo] = useState('');
  const [message, setMessage] = useState('');
  const [apiLoader, setApiLoader] = useState(false);

  const [rating, setRating] = useState(0); // State to store the rating value
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const handleImageSelect = image => {
    setProfilePicture(image);
    console.log('Selected image:', image);
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
    if (!profilePicture || !profilePicture.uri) {
      error.profilePicture = 'Please attach ScreenShots.';
    }

    // ✅ Set error messages BEFORE returning
    if (Object.keys(error).length > 0) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage({}); // Clear errors if no validation issues

    setApiLoader(true);
    try {
      const token = await getData(async_keys.auth_token);

      const formData = new FormData();
      formData.append('CON_TYPE', 'CONTACT');
      formData.append('CON_NAME', name);
      formData.append('CON_MOBILE_NO', mobile);
      formData.append('CON_MORE_DETAIL', message);
      formData.append('CON_ACTIVE_YN', 'Y');

      if (profilePicture && profilePicture.uri) {
        const resizedImage = await ImageResizer.createResizedImage(
          profilePicture.uri,
          500,
          500,
          'JPEG',
          80,
          0,
          undefined,
          false,
          {mode: 'cover'},
        );

        let imageFile = {
          uri: resizedImage.uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        };
        formData.append('CON_ATTACHMENT', imageFile);
      }

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
        setProfilePicture(null);
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Form Submission Failed!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('Contact Error:', error);
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
          // colors={['#152340', '#FFFFFF']}
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
                Contact Us
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
              Rangrez Contact
            </Text>

            <Text
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                marginHorizontal: wp(10),
                marginTop: hp(2),
                fontSize: hp(2),
                lineHeight: 25,
                fontFamily: 'Poppins-Regular',
                color: '#152340',
              }}>
              We’re here to help! Feel free to reach out to us with your
              questions, concerns, or suggestions. We’ll get back to you as soon
              as possible.
            </Text>

            <View
              style={{
                width: wp(90),
                alignSelf: 'center',
                borderRadius: wp(5),
                height: hp(68),
                backgroundColor: '#D9CAAD',
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
                  label="Enter Your Message"
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

                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: hp(2),
                    marginTop: hp(2),
                    marginLeft: wp(4),
                  }}>
                  Attach ScreenShots
                </Text>
                <View
                  style={{
                    alignItems: 'flex-start',
                    marginLeft: wp(5),
                    marginTop: hp(2),
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity>
                    {profilePicture === null ? (
                      // <Image source={user} style={styles.UserImageDesign} />
                      <View
                        style={{
                          backgroundColor: '#FFFFFF',
                          height: hp(8),
                          width: wp(30),
                          borderRadius: wp(3),
                          borderWidth: wp(0.2),
                          borderColor: '#F27141',
                        }}></View>
                    ) : (
                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                          source={{uri: profilePicture.uri}}
                          style={styles.UserImageDesign}
                        />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                      source={attachdocs}
                      style={{
                        height: hp(3.5),
                        width: wp(7),
                        marginLeft: wp(2),
                      }}
                      tintColor={'#000000'}
                    />
                  </TouchableOpacity>

                  <CustomImagePicker
                    modalVisible={modalVisible}
                    onClose={() => {
                      setModalVisible(false),
                        setErrorMessage(prev => ({
                          ...prev,
                          profilePicture: '',
                        }));
                    }}
                    onImageSelect={handleImageSelect}
                  />
                </View>
                {errorMessage.profilePicture && (
                  <Text
                    style={{
                      fontSize: hp(1.7),
                      color: 'red',
                      marginTop: 5,
                      marginLeft: wp(5),
                    }}>
                    {errorMessage.profilePicture}
                  </Text>
                )}

                <TouchableOpacity
                  onPress={handleConntact}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // height: hp(6),
                    marginBottom: hp(5),
                    marginTop: hp(4),
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
  UserImageDesign: {
    height: hp(8),
    width: wp(30),
    borderRadius: wp(3),
  },
});

export default Contact;
