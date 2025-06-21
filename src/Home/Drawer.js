import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import leftback from '../provider/png/leftback.png';
import donationsss from '../provider/png/donationsss.png';
import user from '../provider/png/user.png';
import LanguageConverter from '../provider/png/LanguageConverter.png';
import privacypolicy from '../provider/png/privacypolicy.png';
import termsandconditions from '../provider/png/termsandconditions.png';
import aboutus from '../provider/png/aboutus.png';
import contactus from '../provider/png/contactus.png';
import certificate from '../provider/png/certificate.png';
import logout from '../provider/png/logout.png';
// import {Rating, AirbnbRating} from 'react-native-ratings';
import deleteaccount from '../provider/png/deleteaccount.png';
import PrivacyPolicy from '../Home/PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import fundinsights from '../provider/png/fundinsights.png';
import LanguageConverterSetting from '../provider/png/LanguageConverterSetting.png';
import feedback from '../provider/png/feedback.png';
import Aboutus from '../Home/Aboutus';
import Contact from '../Home/Contact';
import Fundinsights from './Fundinsights';
import MyDonation from '../Home/MyDonation';
import familymembers from '../provider/png/familymembers.png';
import familydetails from '../provider/png/familydetails.png';
import AddFamilyMembers from '../Home/AddFamilyMembers';
import profile from '../provider/png/profile3.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import Profile from '../Home/Profile';
import Footer from '../components/Footer';
import FamilyMemberDetails from '../Home/FamilyMemberDetails';
import Signin from '../Auth/Signin';
import {getData, async_keys, clearData, storeData} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import {BASE_URL} from '../api/ApiInfo';
import useUserProfile from '../components/profileCompleted/useUserProfile';
import IncompleteProfileModal from '../components/profileCompleted/IncompleteProfileModal';
import {useFocusEffect} from '@react-navigation/native';
import Notification2 from '../provider/png/Notification2.png';
// import Switch from 'react-native-switch-pro';

// import MyProfessionicon from '../provider/png/myprofessionicon.png';
// import MyProfession from '../Home/MyProfession';
import DownloadCertificate from '../Home/DownloadCertificate';
import {clearDeviceAssociation} from '../api/fcm';
import LanguageModal from '../components/LanguageModal';
import i18n from '../components/i18n'; // Import your i18n instance
import {useTranslation} from 'react-i18next';
// import {getData, storeData, async_keys} from '../api/UserPreference';

const Drawer = props => {
  const [lang, setLang] = useState('ENGLISH');
  const languages = ['ENGLISH', 'हिंदी'];
  const [modalVisible, setModalVisible] = useState(false);
  const [modaldeleteAccountVisible, setModalDeleteAAccountVisible] =
    useState(false);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const [modalLogoutVisible, setModalLogoutVisible] = useState(false);
  const {userDataa, PRmodalVisible, setPRModalVisible, completionPercentagee} =
    useUserProfile();
  const [isEnabled, setIsEnabled] = useState(true);
  const {t} = useTranslation();

  console.log('NOTIFICATION', isEnabled);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue); // Optimistic update

    const success = await updateNotificationPreference(newValue);
    if (!success) {
      setIsEnabled(!newValue); // Revert if failed
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkProfileCompletion = async () => {
        if (userData && userData.PR_IS_COMPLETED === 'N') {
          setPRModalVisible(true);
        }
      };

      checkProfileCompletion();
    }, [userDataa]), // Re-run when userData changes
  );

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getData(async_keys.auth_token);
      setToken(storedToken || t('Drawer.No Token Found'));
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success && data.data) {
          setUserData(data.data);
          setIsEnabled(data.data.PR_NOTIFICATION === 'Y');
        } else {
          setErrorMessage(data.data.message);
        }
      } catch (error) {
        console.error(t('Drawer.Error fetching profile:'), error);
        setErrorMessage(t('Drawer.Failed to load user data.'));
      }
    };

    fetchUserProfile();
  }, [token]);
  console.log('DATAA', userData?.PR_NOTIFICATION);

  const updateNotificationPreference = async newValue => {
    try {
      // setIsLoading(true);
      const response = await fetch(`${BASE_URL}update-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          pr_id: userData?.PR_ID.toString(),
        },
        body: JSON.stringify({
          PR_NOTIFICATION: newValue ? 'Y' : 'N',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || t('Drawer.Failed to update notification'),
        );
      }
      setUserData(prev => ({
        ...prev,
        PR_NOTIFICATION: newValue ? 'Y' : 'N',
      }));
    } catch (error) {
      console.error(t('Drawer.Error updating notification:'), error);
      showMessage({
        message: error.message || t('Drawer.Failed to update notification'),
        type: 'danger',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
    return true;
  };

  useEffect(() => {
    // Load saved language on component mount
    const loadSavedLanguage = async () => {
      try {
        const savedLangCode = await getData(async_keys.language_code);
        if (savedLangCode) {
          const displayName = savedLangCode === 'en' ? 'ENGLISH' : 'हिंदी';
          setLang(displayName);
          i18n.changeLanguage(savedLangCode);
        }
        setIsInitializing(false);
      } catch (error) {
        console.error(t('Drawer.Error loading language:'), error);
        setIsInitializing(false);
      }
    };

    loadSavedLanguage();
  }, []);

  useEffect(() => {
    // Handle language change when lang state updates
    if (!isInitializing && lang) {
      const langCode = lang === 'ENGLISH' ? 'en' : 'hi';
      const saveLanguage = async () => {
        try {
          await storeData(async_keys.language_code, langCode);
          i18n.changeLanguage(langCode);
        } catch (error) {
          console.error(t('Drawer.Error saving language:'), error);
        }
      };

      saveLanguage();
    }
  }, [lang, isInitializing]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85}}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          // colors={['#F2955E', '#FFFFFF']}
          colors={['#BDD9F2', '#F0F2F2']}
          style={{flex: 1, zIndex: 10}}>
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
                {t('Drawer.Settings')}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: wp(5),
              marginTop: hp(3),
            }}>
            <View>
              <Image
                source={
                  userData?.PR_PHOTO_URL ? {uri: userData?.PR_PHOTO_URL} : user
                }
                style={{height: hp(8), width: wp(16), borderRadius: wp(100)}}
                resizeMethod="cover"
              />
            </View>

            <View style={{marginLeft: wp(3), width: wp(65)}}>
              <Text
                numberOfLines={1}
                style={{
                  color: '#000000',
                  fontSize: hp(2.2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {userData?.PR_FULL_NAME
                  ? userData?.PR_FULL_NAME
                  : t('Drawer.USER NAME')}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: '#000000',
                  fontSize: hp(1.8),
                  fontFamily: 'Poppins-Regular',
                }}>
                {userData?.PR_MOBILE_NO
                  ? userData?.PR_MOBILE_NO
                  : t('Drawer.1234567890')}
              </Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {/* /////////////////////////////////// */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Profile')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={profile}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.My Profile')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('FamilyMemberDetails')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={familydetails}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.My Family')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('AddFamilyMembers', {
                  currentuserPR_ID: userData?.PR_ID,
                })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={familymembers}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.Add New Member')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('MyDonation')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={donationsss}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.My Donations')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('DownloadCertificate', userData)
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={certificate}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.DownLoad Certificate')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Aboutus')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={aboutus}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.About Rangrez Samaj')}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: wp(6),
                marginTop: hp(3),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Notification2}
                  style={{height: hp(3.5), width: wp(7.2)}}
                  tintColor={'#000000'}
                />
                <Text
                  style={{
                    marginLeft: wp(2),
                    color: '#000000',
                    fontSize: hp(2),
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {t('Drawer.Notification')}
                </Text>
              </View>
              <Switch
                trackColor={{false: '#BC4749', true: '#5bc783'}}
                thumbColor={isEnabled ? '#04BF45' : '#A61205'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                style={{transform: [{scaleX: 1.5}, {scaleY: 1.5}]}}
                value={isEnabled}
              />
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Contact')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={contactus}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.Contact Us')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('FeedBack')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={feedback}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.FeedBack')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Fundinsights')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={fundinsights}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.App Insights')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={LanguageConverterSetting}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.Change Language')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('PrivacyPolicy')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={privacypolicy}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.Privacy Policy')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('TermsAndConditions')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={termsandconditions}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.Terms & Conditions')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalDeleteAAccountVisible(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
              }}>
              <Image
                source={deleteaccount}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.Delete Account')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalLogoutVisible(true);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: wp(6),
                marginTop: hp(3),
                marginBottom: hp(20),
              }}>
              <Image
                source={logout}
                style={{height: hp(3.5), width: wp(7.2)}}
                tintColor={'#000000'}
              />
              <Text
                style={{
                  marginLeft: wp(2),
                  color: '#000000',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('Drawer.Sign Out')}
              </Text>
            </TouchableOpacity>
            <IncompleteProfileModal
              visible={PRmodalVisible}
              onClose={() => setPRModalVisible(false)}
              navigation={props.navigation}
            />
          </KeyboardAwareScrollView>

          <View
            style={{
              position: 'absolute',
              bottom: hp(4),
              alignSelf: 'center',
              borderRadius: wp(10),
              opacity: 1,
            }}>
            <Footer title="Drawer" />
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Modal for Language Converter */}

      {/* <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onBackdropPress={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignSelf: 'center',

          top: 0,

          bottom: 0,
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D6D9C5',
            width: wp(90),
            paddingVertical: hp(2),
            borderRadius: wp(3),
          }}
          onPress={() => setModalVisible(false)}>
          <View style={{}}>
            {languages.map(language => (
              <TouchableOpacity
                key={language}
                onPress={() => {
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
      </Modal> */}
      <LanguageModal
        visible={modalVisible}
        setVisible={setModalVisible}
        lang={lang}
        setLang={setLang}
      />

      {/* Modal for Delete Account */}

      <Modal
        transparent={true}
        visible={modaldeleteAccountVisible}
        animationType="slide"
        onBackdropPress={() => setModalDeleteAAccountVisible(false)}
        onRequestClose={() => setModalDeleteAAccountVisible(false)}
        style={{
          // position: 'absolute',
          justifyContent: 'center',
          alignSelf: 'center',
          // backgroundColor: 'rgba(0, 0, 0, 0.5)',
          // top: 0,
          // alignItems: "center",
          // height: hp(120),
          // width: wp(100),
          // bottom: 0
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D6D9C5',
            width: wp(80),
            paddingVertical: hp(3),
            borderRadius: wp(3),
          }}
          onPress={() => setModalDeleteAAccountVisible(false)}>
          <Text
            style={{
              textAlign: 'center',
              marginHorizontal: wp(2),
              fontFamily: 'Poppins-Medium',
              fontSize: hp(2),
            }}>
            {t('Drawer.Are You Sure You Want to Delete Your Account?')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(70),
              marginTop: hp(2),
            }}>
            <TouchableOpacity
              onPress={() => setModalDeleteAAccountVisible(false)}
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(30),
                height: hp(5),
                borderRadius: wp(2),
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  color: '#000000',
                }}>
                {t('Drawer.Yes')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalDeleteAAccountVisible(false)}
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(30),
                height: hp(5),
                borderRadius: wp(2),
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  color: '#000000',
                }}>
                {t('Drawer.No')}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal for Signout Account */}

      <Modal
        transparent={true}
        visible={modalLogoutVisible}
        animationType="slide"
        onBackdropPress={() => setModalLogoutVisible(false)}
        onRequestClose={() => setModalLogoutVisible(false)}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#D9CAAD',
            width: wp(80),
            paddingVertical: hp(3),
            borderRadius: wp(3),
          }}
          onPress={() => setModalLogoutVisible(false)}>
          <Text
            style={{
              textAlign: 'center',
              marginHorizontal: wp(2),
              fontFamily: 'Poppins-Medium',
              fontSize: hp(2),
            }}>
            {t('Drawer.Are you sure you want to Sign out of your account?')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(70),
              marginTop: hp(2),
            }}>
            <TouchableOpacity
              onPress={async () => {
                try {
                  // Clear all AsyncStorage data first
                  await clearData();
                  await clearDeviceAssociation();

                  // Verify data is cleared by checking a specific key (e.g., auth_token)
                  const tokenAfterClear = await getData(async_keys.auth_token);
                  const userDataAfterClear = await getData(
                    async_keys.user_data,
                  );

                  console.log('Token after clear:', tokenAfterClear); // Should be null
                  console.log('User data after clear:', userDataAfterClear); // Should be null

                  if (tokenAfterClear !== null || userDataAfterClear !== null) {
                    console.warn(
                      t(
                        'Drawer.Warning: Data was not fully cleared from AsyncStorage',
                      ),
                    );
                    // You might want to retry clearing or show an error to the user
                  }

                  // Then navigate to Signin screen
                  props.navigation.navigate('Signin');
                  // Close the modal
                  setModalLogoutVisible(false);
                } catch (error) {
                  console.error(t('Drawer.Error during sign out:'), error);
                  // Optionally show an error message to the user
                }
              }}
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(30),
                height: hp(5),
                borderRadius: wp(2),
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  color: '#000000',
                }}>
                {t('Drawer.Yes')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalLogoutVisible(false)}
              style={{
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: wp(30),
                height: hp(5),
                borderRadius: wp(2),
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  color: '#000000',
                }}>
                {t('Drawer.No')}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  option: {
    width: wp(80),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderWidth: wp(0.2),
    borderColor: '#FFFFFF',
    marginVertical: hp(1),
    borderRadius: wp(5),
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
    borderRadius: wp(5),
    textAlign: 'center',
    marginVertical: hp(1),
  },
  optionText: {
    fontWeight: '600',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  selectedText: {
    fontWeight: '700',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});

export default Drawer;
