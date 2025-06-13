import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
// import UserDetails from './ProfileDetails/UserDetails';
import leftback from '../provider/png/leftback.png';

import CustomImagePicker from '../components/CameraComponent';
import user from '../provider/png/user.png';
import add from '../provider/png/add.png';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import name from '../provider/png/name.png';
import dob from '../provider/png/dob.png';
import father from '../provider/png/father.png';
import mother from '../provider/png/mother.png';
import phone from '../provider/png/phone.png';
import pincode from '../provider/png/pincode.png';

import education from '../provider/png/education.png';
import spouse from '../provider/png/spouse.png';
import children from '../provider/png/children.png';
import {color} from 'react-native-elements/dist/helpers';

import logo1 from '../provider/png/logo1.png';
import logo2 from '../provider/png/logo2.png';

import starrating from '../provider/png/starrating.png';

import cricket from '../provider/png/cricket.png';
import football from '../provider/png/football.png';
import painting from '../provider/png/painting.png';
import singing from '../provider/png/singing.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';

import UserDetails from '../Auth/signupDetails/userDetails';
import AddressDetails from '../Auth/signupDetails/AddressDetails';
import EducationDetails from '../Auth/signupDetails/EducationDetails';
import GenderDetails from '../Auth/signupDetails/GenderDetails';
import ParentsDetails from '../Auth/signupDetails/ParentsDetails';
import SpouseChildDetails from '../Auth/signupDetails/SpouseChildDetails';
import UserHobbies from '../Auth/signupDetails/UserHobbies';
import UserBussiness from '../Auth/signupDetails/UserBussiness';
import ProfessionDetails from '../Auth/signupDetails/ProfessionDetails';
import {Header} from 'react-native-elements';
import useUserProfile from '../components/profileCompleted/useUserProfile';
import IncompleteProfileModal from '../components/profileCompleted/IncompleteProfileModal';
import {useFocusEffect} from '@react-navigation/native';
import {BASE_URL} from '../api/ApiInfo';
import {getData, async_keys, clearData, storeData} from '../api/UserPreference';

const OverView = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [edit, setEdit] = useState('False');
  const {userDataa, PRmodalVisible, setPRModalVisible, completionPercentagee} =
    useUserProfile();

  const {route} = props;
  // const {member} = route.params || {};

  // const {userData} = route.params || {};
  const {userData, member} = route.params || {};
  const displayData = member || userData;

  console.log('Member Data:', member);

  // console.log('RETTT', userData);

  const handleImageSelect = image => {
    setProfilePicture(image);
    console.log('Selected image:', image);
  };
  const profileImageUrl = route.params?.member
    ? member?.PR_PHOTO_URL
    : userData?.PR_PHOTO_URL;

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

  const professionName1 = displayData?.Profession?.PROF_NAME;
  const Profesionnn = member?.Profession?.PROF_NAME;

  const professionName = member
    ? member.Profesionnn
    : displayData?.Profession?.PROF_NAME;

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          // colors={['#697368', '#F2F0EB']}
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
                OverView
              </Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{alignItems: 'center'}}>
              {/* {userData.PR_PHOTO_URL === null ? (
                  <Image source={user} style={styles.UserImageDesign} />
                ) : (
                  <View>
                    <Image
                      source={{uri: userData.PR_PHOTO_URL}}
                      style={styles.UserImageDesign}
                    />
                  </View>
                )} */}

              <Image
                source={profileImageUrl ? {uri: profileImageUrl} : user}
                style={styles.UserImageDesign}
              />
            </View>

            <View style={{marginBottom: hp(2)}}>
              <View style={styles.FormContainer}>
                <Text style={styles.HeaderLabel}>Personal OverView</Text>
                <Text style={styles.HeaderLabel1}>Full Name</Text>
                <Text style={styles.InputTextField}>
                  {displayData?.PR_FULL_NAME || 'Not available'}
                </Text>
                <Text style={styles.HeaderLabel1}>Mobile Number</Text>
                <Text style={styles.InputTextField}>
                  {displayData?.PR_MOBILE_NO || 'Not available'}
                </Text>
                <Text style={styles.HeaderLabel1}>Date Of Birth</Text>
                <Text style={styles.InputTextField}>
                  {displayData?.PR_DOB || 'No date Available'}
                </Text>
                {/* {displayData?.PR_GENDER && displayData.PR_GENDER !== '' ? (
                  <> */}
                <Text style={styles.HeaderLabel1}>Gender</Text>
                <Text style={styles.InputTextField}>
                  {displayData.PR_GENDER}
                </Text>
                {/* </>
                ) : null} */}
              </View>

              <View style={styles.FormContainer}>
                <Text style={styles.HeaderLabel}>Address OverView</Text>

                {/* {displayData?.PR_PIN_CODE &&
                  displayData.PR_PIN_CODE.trim() !== '' && (
                    <> */}
                <Text style={styles.HeaderLabel1}>Pincode</Text>
                <Text style={styles.InputTextField}>
                  {displayData.PR_PIN_CODE}
                </Text>
                {/* </>
                  )} */}
                {/* {displayData?.PR_AREA_NAME &&
                  displayData.PR_AREA_NAME.trim() !== '' && (
                    <> */}
                <Text style={styles.HeaderLabel1}>City Name</Text>
                <Text style={styles.InputTextField}>
                  {displayData.PR_AREA_NAME}
                </Text>
                {/* </>
                  )} */}

                {/* {displayData?.PR_ADDRESS &&
                  displayData.PR_ADDRESS.trim() !== '' && (
                    <> */}
                <Text style={styles.HeaderLabel1}>Address</Text>
                <Text style={styles.InputTextField}>
                  {displayData.PR_ADDRESS}
                </Text>
                {/* </>
                  )} */}
              </View>

              <View style={styles.FormContainer}>
                <Text style={styles.HeaderLabel}>
                  Academic & Career Overview
                </Text>

                <Text style={styles.HeaderLabel1}>Education</Text>
                <Text style={styles.InputTextField}>
                  {displayData.PR_EDUCATION}
                </Text>

                <Text style={styles.HeaderLabel1}>Stream</Text>
                <Text style={styles.InputTextField}>
                  {displayData.PR_EDUCATION_DESC}
                </Text>

                <Text style={styles.HeaderLabel1}>Profession</Text>
                <Text style={styles.InputTextField}>
                  {/* {Profesionnn || professionName1 || 'Not specified'} */}
                  {professionName}
                </Text>

                <Text style={styles.HeaderLabel1}>Profession Overview</Text>
                <Text style={styles.InputTextField}>
                  {displayData.PR_PROFESSION_DETA}
                </Text>
              </View>

              <View style={styles.FormContainer}>
                <Text style={styles.HeaderLabel}>Family Overview</Text>

                <Text style={styles.HeaderLabel1}>Father Name</Text>
                <Text style={styles.InputTextField}>
                  {/* {userData.PR_FATHER_NAME} */}
                  {displayData.PR_FATHER_NAME}
                </Text>

                <Text style={styles.HeaderLabel1}>Mother Name</Text>
                <Text style={styles.InputTextField}>
                  {/* {userData.PR_MOTHER_NAME} */}
                  {displayData.PR_MOTHER_NAME}
                </Text>

                {/* {userData.PR_SPOUSE_NAME !== '' && (
                  <>
                    <Text style={styles.HeaderLabel1}>Spouse Name</Text>
                    <Text style={styles.InputTextField}>
                      {userData.PR_SPOUSE_NAME}
                    </Text>
                  </>
                )} */}
                {displayData?.PR_SPOUSE_NAME &&
                  displayData.PR_SPOUSE_NAME.trim() !== '' && (
                    <>
                      <Text style={styles.HeaderLabel1}>Spouse Name</Text>
                      <Text style={styles.InputTextField}>
                        {displayData.PR_SPOUSE_NAME}
                      </Text>
                    </>
                  )}
              </View>

              {displayData.PR_BUSS_INTER === 'Y' && (
                <View style={{...styles.FormContainer}}>
                  <Text style={styles.HeaderLabel}>
                    Business & Hobbies Overview
                  </Text>

                  {displayData.PR_BUSS_STREAM !== '' && (
                    <>
                      <Text style={styles.HeaderLabel1}>Business Stream</Text>
                      <Text style={styles.InputTextField}>
                        {displayData.PR_BUSS_STREAM}
                      </Text>
                    </>
                  )}

                  {displayData.PR_BUSS_TYPE !== '' && (
                    <>
                      <Text style={styles.HeaderLabel1}>Business Type</Text>
                      <Text style={styles.InputTextField}>
                        {displayData.PR_BUSS_TYPE}
                      </Text>
                    </>
                  )}

                  {displayData.PR_HOBBY !== '' && (
                    <>
                      <Text style={styles.HeaderLabel1}>Hobbies</Text>
                      <Text style={styles.InputTextField}>
                        {displayData.PR_HOBBY}
                      </Text>
                    </>
                  )}
                </View>
              )}

              {displayData.PR_BUSS_INTER === 'N' &&
                displayData.PR_HOBBY !== '' && (
                  <View style={{...styles.FormContainer}}>
                    <Text style={styles.HeaderLabel}>
                      Business & Hobbies Overview
                    </Text>

                    {displayData.PR_HOBBY !== '' ? (
                      <>
                        <Text style={styles.HeaderLabel1}>Hobbies</Text>
                        <Text style={styles.InputTextField}>
                          {displayData.PR_HOBBY}
                        </Text>
                      </>
                    ) : (
                      ''
                    )}
                  </View>
                )}
            </View>
            <IncompleteProfileModal
              visible={PRmodalVisible}
              onClose={() => setPRModalVisible(false)}
              navigation={props.navigation}
            />
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  InputTextField: {
    marginLeft: wp(3.5),
    fontSize: hp(1.9),
    width: wp(82),
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    borderBottomWidth: wp(0.5),
    borderColor: '#BFBDBE',
  },
  HeaderLabel1: {
    marginLeft: wp(3.5),
    marginTop: hp(2),
    fontSize: hp(1.5),
    fontFamily: 'Poppins-Medium',
    color: '#8C8C8C',
  },
  HeaderLabel: {
    // fontWeight: '700',
    marginLeft: wp(3.5),
    marginTop: hp(1),
    fontSize: hp(2.3),
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  FormContainer: {
    backgroundColor: 'rgba(255, 255, 255, .6)',
    width: wp(90),
    paddingVertical: wp(3),
    marginTop: hp(3),
    // height: hp(10),
    alignSelf: 'center',
    borderRadius: wp(5),
    borderWidth: wp(0.4),
    elevation: 5,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderColor: '#BFBDBE',
  },
  MainContainer: {
    flex: 1,
  },
  UserImageDesign: {
    height: hp(12),
    marginTop: hp(3),
    // width: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: hp(10),
  },
  dropdown1: {
    height: hp(5.5),

    width: wp(75),

    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',

    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: wp(10),
    paddingRight: wp(5),
    borderRadius: wp(2),
    color: 'black',
    fontSize: hp(2.4),
    fontFamily: 'Lora-VariableFont_wght',
  },
  icon1: {
    marginRight: 5,
    color: '#BFBDBE',
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: '#BFBDBE',

    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
  },
  iconStyle1: {
    width: hp(3.5),
    height: wp(7),
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },
});

export default OverView;
