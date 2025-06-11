import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  // StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
  Linking,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Onboarding1 from '../provider/png/Onboarding1.png';

import Onboarding2 from '../provider/png/Onboarding2.png';

import Onboarding3 from '../provider/png/Onboarding3.png';
import Onboarding4 from '../provider/png/Onboarding4.png';
import Onboarding5 from '../provider/png/Onboarding5.png';
import Onboarding6 from '../provider/png/Onboarding6.png';
import Onboarding66 from '../provider/png/Onboarding66.png';
import Onboarding77 from '../provider/png/Onboarding77.png';
import Onboarding88 from '../provider/png/Onboarding88.png';
import Onboarding99 from '../provider/png/Onboarding99.png';
import LanguageConverter from '../provider/png/LanguageConverter.png';
import Modal from 'react-native-modal';
import Onboarding7 from '../provider/png/Onboarding7.png';
// import sitingg from '../provider/png/sitingg.png';
import Signin from '../Auth/Signin';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
import {useTranslation} from 'react-i18next';
import i18n from '../components/i18n';
import {initializeApp} from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {async_keys, getData, storeData} from '../api/UserPreference';

const firebaseConfig = {
  apiKey: 'AIzaSyAl9oJoyk1vacypoEVBChRjAeJrpCfhnlo',
  authDomain: 'test-d509c.firebaseapp.com',
  databaseURL: 'https://test-d509c.firebaseio.com',
  projectId: 'test-d509c',
  storageBucket: 'test-d509c.appspot.com',
  messagingSenderId: '725344189959',
  appId: '1:725344189959:android:b21c6b758d74006c33b4a2',
};

// Initialize Firebase
let firebaseApp;
try {
  firebaseApp = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized!', firebaseApp.name); // Should log "[DEFAULT]"
} catch (error) {
  console.error('❌ Firebase init error:', error);
}

const Onboarding = props => {
  const [lang, setLang] = useState('ENGLISH');
  const [modalVisible, setModalVisible] = useState(false);

  const languages = ['ENGLISH', 'हिंदी'];
  const {t} = useTranslation();

  const [fcmToken, setFcmToken] = useState(null);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const FCMtoken = await messaging().getToken();
    console.log('FCM Token:', FCMtoken);
    storeData(async_keys.fcm_token, FCMtoken);
  };

  // console.log('FCM Tokenmm:', getData(async_keys.fcm_token));
  console.log('FCM Token from state:', fcmToken);

  useEffect(() => {
    const setupFirebaseMessaging = async () => {
      try {
        if (!firebaseApp) {
          throw new Error('Firebase not initialized!');
        }

        // Request notification permissions (iOS/Android)
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          const token = await messaging().getToken();
          console.log('📌 FCM Token:', token);
          // setFcmToken(token);
          await storeData(async_keys.fcm_token, token); // Add await here
          setFcmToken(token);

          const storedToken = await getData(async_keys.fcm_token);
          console.log('Stored FCM Token:', storedToken);
        }
      } catch (error) {
        console.error('🔥 FCM Error:', error);
      }
    };

    setupFirebaseMessaging();
  }, []);

  useEffect(() => {
    const requestStoragePermission = async () => {
      if (Platform.OS !== 'android') return true;

      try {
        let isGranted = false;

        if (Platform.Version >= 33) {
          const hasImagePermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          );
          const hasVideoPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          );

          if (hasImagePermission && hasVideoPermission) {
            return true;
          }

          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ]);

          isGranted =
            grants[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED;
        } else {
          // For Android < 13
          const hasStoragePermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );

          if (hasStoragePermission) {
            return true;
          }

          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );

          isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        if (!isGranted) {
          Alert.alert(
            'Permission Required',
            'This app needs access to your media files to function properly.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        }

        return isGranted;
      } catch (err) {
        console.error('Permission error:', err);
        return false;
      }
    };

    requestStoragePermission();
  }, []);

  const [check, setChecked] = useState('signin');

  const data = {
    swiperimages: [
      {id: '1', src: Onboarding66},
      {id: '2', src: Onboarding99},
      {id: '3', src: Onboarding88},
    ],
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* <StatusBar  barStyle={"light-content"} backgroundColor={"#000000"}/> */}

      {/* <StatusBar barStyle="dark-content" translucent={false} backgroundColor={"transparent"} /> */}

      <Swiper
        loop
        autoplay
        showsPagination
        paginationStyle={{
          // position: 'absolute',
          // left: 0,
          marginLeft: wp(6),

          // alignItems: "flex-start",

          // alignSelf: "flex-start",
          marginBottom: hp(13),
        }}
        dot={
          <View
            style={{
              zIndex: 100,
              backgroundColor: 'grey',
              width: wp(15),
              height: hp(0.3),
              borderRadius: 5,
              marginLeft: 2,
              marginRight: 2,
              marginTop: 2,
              marginBottom: 2,
            }}
          />
        }
        activeDot={
          <View
            style={{
              zIndex: 100,
              //  backgroundColor: '#800000',
              backgroundColor: '#FFFFFF',

              width: wp(25),
              height: hp(0.3),
              borderRadius: 6,
              marginLeft: 2,
              marginRight: 2,
              marginTop: 2,
              marginBottom: 2,
            }}
          />
        }>
        {data.swiperimages.map((image, index) => (
          <ImageBackground
            key={index}
            source={image.src}
            blurRadius={3}
            // tintColor={'rgba(128, 128, 128, 0.1)'}
            style={{height: hp(100), width: wp(100)}}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                zIndex: 100,
                right: 20,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: '#FFFFFF',
                height: hp(2.6),
                width: wp(14),
                marginTop: wp(4),
                borderRadius: wp(6),
                // marginLeft: wp(4),
              }}>
              {/* <Image
                source={LanguageConverter}
                tintColor={'#697368'}
                style={{height: hp(3), width: wp(6), resizeMode: 'contain'}}
              /> */}
              <Text
                style={{
                  fontSize: hp(1.4),
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '700',
                }}>
                LANG
              </Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: hp(12),
              }}>
              <View
                style={{
                  alignSelf: 'left',
                  // marginLeft: wp(6),
                  marginHorizontal: wp(4),
                }}>
                <Text
                  style={{
                    // color: '#E63946',
                    color: '#F1FAEE',
                    // elevation: 4,
                    // elevation: 5,
                    //  textShadowColor: "#A6705D",
                    //  textShadowRadius: 10,
                    //  left: 2,
                    //  top: 2,

                    fontSize: hp(3.2),
                    textAlign: 'left',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {/* Empowering the Rangrej Community for a Brighter Tomorrow */}
                  {t('OnboardinHeader')}
                </Text>
                <Text
                  style={{
                    marginTop: hp(2),
                    // color: '#457B9D',
                    color: '#FBFBFB',
                    // elevation: 5,
                    fontSize: hp(1.8),
                    textAlign: 'center',
                    fontFamily: 'Poppins-Medium',
                    // textShadowColor: "#A6705D",
                    // textShadowRadius: 10,
                  }}>
                  {/* The Rangrej Samaj app empowers our community by providing
                  education, healthcare, and welfare support, ensuring a
                  brighter future for all. */}
                  {t('OnboardinText')}
                </Text>
              </View>
            </View>
          </ImageBackground>
        ))}
      </Swiper>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <View
          style={{
            marginBottom: hp(7),
            // position: 'absolute',
            // bottom: 0,
            // marginTop: hp(44),
            // bottom: 0,
            // position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: wp(4.2),
            paddingHorizontal: wp(1),
            paddingVertical: hp(0.85),
            elevation: 5,
            borderRadius: wp(10),
            backgroundColor: '#A4A4A4',
          }}>
          <TouchableOpacity
            onPress={() => {
              setChecked('signup'), props.navigation.navigate('Signup');
            }}
            style={{
              backgroundColor: check === 'signup' ? '#F2E8CF' : '#ffff',
              // paddingHorizontal: wp(13),
              width: wp(38),
              alignItems: 'center',
              alignSelf: 'center',
              paddingVertical: hp(1.1),
              marginLeft: wp(0.8),
              borderRadius: wp(10),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                letterSpacing: 1,
                fontSize: hp(1.8),
                color: check === 'signup' ? '#F27F3D' : '#000',
              }}>
              {/* SIGN UP */}
              {t('SIGN UP')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setChecked('signin'), props.navigation.navigate('Signin');
            }}
            style={{
              backgroundColor: check === 'signin' ? '#F2E8CF' : '#ffff',
              // paddingHorizontal: wp(13),
              width: wp(38),
              alignItems: 'center',
              alignSelf: 'center',
              paddingVertical: hp(1.1),
              marginRight: wp(0.8),
              borderRadius: wp(10),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: check === 'signin' ? '#F27F3D' : '#000',
              }}>
              {/* SIGN IN */}
              {t('SIGN IN')}
            </Text>
          </TouchableOpacity>
          {/* <View style={{height: hp(4), aspectRatio: 1/1, backgroundColor: "#F5DEB3"}}></View> */}
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onBackdropPress={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        style={{
          position: 'absolute',
          top: 40,
          zIndex: 100,
          right: 0,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D6D9C5',
            width: wp(30),
            paddingVertical: hp(1),
            borderRadius: wp(3),
          }}
          onPress={() => setModalVisible(false)}>
          <View style={{}}>
            {languages.map(language => (
              <TouchableOpacity
                key={language}
                onPress={() => {
                  const selectedLang = language === 'ENGLISH' ? 'en' : 'hi';
                  i18n.changeLanguage(selectedLang);
                  setLang(language);
                  setModalVisible(false);
                }}
                style={[
                  styles.option,
                  lang === language && styles.selectedOption,
                ]}>
                <Text
                  style={[
                    styles.optionText,
                    lang === language && styles.selectedText,
                  ]}>
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    opacity: 0.9,
    // backgroundColor: "rgba(52,152,219,0.5)"
  },
  option: {
    width: wp(25),
    height: hp(3.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
    borderRadius: wp(5),
    textAlign: 'center',
  },
  optionText: {
    fontWeight: '600',
    fontSize: hp(1.4),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  selectedText: {
    fontWeight: '700',
    fontSize: hp(1.4),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});

export default Onboarding;
