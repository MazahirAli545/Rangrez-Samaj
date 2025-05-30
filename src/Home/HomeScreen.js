import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../components/Footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Rangrez from '../provider/png/rangrez-high-resolution-logo.png'
import Rangrez from '../provider/png/rangrez-high-resolution-logo.png';
import Notification from '../provider/png/Notification.png';
import LanguageConverter from '../provider/png/LanguageConverter.png';
import {Dropdown} from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import Donation from '../Home/Donation';
import Swiper from 'react-native-swiper';
// import Profile from '../provider/png/Profile.png';
import user from '../provider/png/user.png';
import logo from '../provider/png/logo.png';
// import Onboarding1 from '../provider/png/Onboarding1.png';

// import Onboarding2 from '../provider/png/Onboarding2.png';

// import Onboarding3 from '../provider/png/Onboarding3.png';
// import cards1 from '../provider/png/freepik__upload__61310.png';
// import cards2 from '../provider/png/freepik__expand__56022.png';
// import cards3 from '../provider/png/freepik__expand__99250.png';
import RangrezImage1 from '../provider/png/RangrezMainImage1.png';
import RangrezImage2 from '../provider/png/RangrezMainImage2.png';
import RangrezImage3 from '../provider/png/RangrezMainImage3.png';
import RangrezImage4 from '../provider/png/RangrezMainImage4.png';
import RangrezImage5 from '../provider/png/RangrezMainImage5.png';

import logo1 from '../provider/png/logo1.png';
import logo2 from '../provider/png/logo2.png';
import rightarrow from '../provider/png/rightarrow.png';
import job1 from '../provider/png/job1.png';
import job2 from '../provider/png/job2.png';
import kpi1 from '../provider/png/kpi1.png';
import kpi2 from '../provider/png/kpi2.png';
import Announcement from '../Home/Announcement';
import PieChart from 'react-native-pie-chart';
// import Fundinsights from '../Home/Fundinsights';
import population from '../provider/png/population.png';
import family from '../provider/png/family.png';
import AnnouncementDetail from '../Home/AnnouncementDetail';
// import LinearGradient from 'react-native-linear-gradient';
import Alert from '../provider/png/Alert.png';

import BackgroundImage from '../provider/png/BackgroundImage.png';

import exam1 from '../provider/png/exm1.png';
import exam2 from '../provider/png/exam2.png';
import exam3 from '../provider/png/exam3.png';

import govt1 from '../provider/png/govt1.png';
import govt2 from '../provider/png/govt2.png';
import govt3 from '../provider/png/govt3.png';
import Svg, {Circle} from 'react-native-svg';
import Profile from '../Home/Profile';
import {getData, async_keys, clearData, storeData} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import {BASE_URL} from '../api/ApiInfo';
import axios from 'axios';
import DonationDetail from '../Home/DonationDetail';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import announcementlogo from '../provider/png/announcementlogo.png';
import Aboutus from '../Home/Aboutus';
import PrivacyPolicy from '../Home/PrivacyPolicy';
import TermsAndConditions from '../Home/TermsAndConditions';
import Fundinsights from '../Home/Fundinsights';
import FeedBack from '../Home/FeedBack';
import Contact from '../Home/Contact';
import MyDonation from '../Home/MyDonation';
import AddFamilyMembers from '../Home/AddFamilyMembers';
import FamilyMemberDetails from './FamilyMemberDetails';
import MyProfile from '../Home/Profile';
import useUserProfile from '../components/profileCompleted/useUserProfile';
import IncompleteProfileModal from '../components/profileCompleted/IncompleteProfileModal';
import {useFocusEffect} from '@react-navigation/native';

// import { getData } from '../api/UserPreference';

const HomeScren = props => {
  const [lang, setLang] = useState('ENGLISH');
  const [modalVisible, setModalVisible] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  // const [PRmodalVisible, setPRModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [stats, setStats] = useState('');

  const isEventActive = eventToDate => {
    const today = new Date();
    const eventDate = new Date(eventToDate);
    return eventDate >= today;
  };

  // console.log('Header Image:', events);

  const [token, setToken] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const {userDataa, PRmodalVisible, setPRModalVisible, completionPercentagee} =
    useUserProfile();

  const handleRefresh = async () => {
    setRefresh(true);
    await Promise.all([fetchEvents(), fetchUserProfile()]);
    setRefresh(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const checkProfileCompletion = async () => {
        if (userDataa && userDataa.PR_IS_COMPLETED === 'N') {
          setPRModalVisible(true);
        }
      };

      checkProfileCompletion();
    }, [userDataa]), // Re-run when userData changes
  );

  useEffect(() => {
    fetchUserProfile(); // initial call
  }, [token]);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getData(async_keys.auth_token);
      setToken(storedToken || 'No Token Found');
    };

    fetchToken();
  }, []);

  // useEffect(())

  console.log('TOKENNNN', token);

  const languages = ['ENGLISH', 'हिंदी'];

  const widthAndHeight = 140;

  const sexRatio = [
    {
      value: parseInt(stats.percentageDistribution?.male),
      color: '#fbd203',
      text: 'Male',
    },
    {
      value: parseInt(stats.percentageDistribution?.female),
      color: '#ffb300',
      text: 'Female',
    },
    {
      value: parseInt(stats.percentageDistribution?.child),
      color: '#ff9100',
      text: 'Childrens',
    },
  ];
  const totalRatio = sexRatio.reduce((total, item) => total + item.value, 0);

  const donations = [
    {
      value: parseInt(stats.businessInterestStats?.percentageOfPopulation),
      color: '#fbd203',
      text: 'Business',
    },
    {
      value: parseInt(stats.donationStats?.donationPercentageOfPopulation),
      color: '#ffb300',
      text: 'Donations',
    },
  ];

  const totaldonation = donations.reduce(
    (total, item) => total + item.value,
    0,
  );

  const Population = [
    {
      value: 300,
      color: '#fbd203',
      text: 'Male',
      // label: { text: 'Male', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
    },
    {
      value: 100,
      color: '#ffb300',
      text: 'Female',
      //  label: { text: 'Female', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
    },
    {
      value: 100,
      color: '#ff9100',
      text: 'Family having 2 Children',
      //  label: { text: 'Childrens', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
    },
    {
      value: 100,
      color: '#ff6c00',
      text: 'Family having more than 2 Childrens',
      // label: { text: 'Others', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
    },

    {
      value: 90,
      color: '#BF0426',
      text: 'Others',
      // label: { text: 'Others', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
    },
    // { value: 360, color: '#ff6c00',  label: { text: 'Others', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }  },
  ];

  const totalPopulation = Population.reduce(
    (total, item) => total + item.value,
    0,
  );

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/events`);
      const result = await response.json();
      console.log('Fetched Events:', result.events);

      if (Array.isArray(result.events) && result.events.length > 0) {
        const formattedData = result.events.map(item => ({
          id: item.ENVT_ID,
          eventCategoryID: item.ENVT_CATE_ID,
          name: item.ENVT_DESC,
          message: item.ENVT_EXCERPT,
          Detail: item.ENVT_DETAIL,
          headerImage: {uri: item.ENVT_BANNER_IMAGE},
          EventsImage: {uri: item.ENVT_GALLERY_IMAGES},
          EventContact: item.ENVT_CONTACT_NO,
          EventFromDate: item.EVNT_FROM_DT,
          EventsToDate: item.EVNT_UPTO_DT,
          address: item.ENVT_ADDRESS,
          city: item.ENVT_CITY,
          createdEventDate: item.EVET_CREATED_DT,
          cate_desc: item?.SubCategory?.CATE_DESC || '',
        }));
        setEvents(formattedData);
        console.log('Events information', formattedData);
      } else {
        console.warn('No valid events data found.');
      }
    } catch (error) {
      console.error('Error fetching Events:', error);
    } finally {
      setApiLoader(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getStats`);
      const result = await response.json();
      console.log('Fetched Stats:', result);

      setStats(result);
      // if (Array.isArray(result.events) && result.events.length > 0) {
      //   const formattedData = result.events.map(item => ({
      //     id: item.ENVT_ID,
      //     eventCategoryID: item.ENVT_CATE_ID,
      //     name: item.ENVT_DESC,
      //     message: item.ENVT_EXCERPT,
      //     Detail: item.ENVT_DETAIL,
      //     headerImage: {uri: item.ENVT_BANNER_IMAGE},
      //     EventsImage: {uri: item.ENVT_GALLERY_IMAGES},
      //     EventContact: item.ENVT_CONTACT_NO,
      //     EventFromDate: item.EVNT_FROM_DT,
      //     EventsToDate: item.EVNT_UPTO_DT,
      //     address: item.ENVT_ADDRESS,
      //     city: item.ENVT_CITY,
      //     createdEventDate: item.EVET_CREATED_DT,
      //     cate_desc: item?.SubCategory?.CATE_DESC || '',
      //   }));
      //   setEvents(formattedData);
      //   console.log('Events information', formattedData);
      // } else {
      //   console.warn('No valid events data found.');
      // }
    } catch (error) {
      console.error('Error fetching Stats:', error);
    } finally {
      setApiLoader(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  console.log('Statistic', stats);

  //Below code for Profile and Data Completion Percentage

  const CircularProgress = ({progress}) => {
    const radius = wp(10); // Radius for the circle
    const strokeWidth = 5; // Width of the progress bar circle
    const circumference = 2 * Math.PI * radius; // Calculate circumference of the circle
    const strokeDashoffset = circumference - progress * circumference; // Determine the stroke offset

    return (
      <View
        style={{
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        {/* SVG Progress Circle */}
        <Svg width={wp(12)} height={wp(12)} viewBox="0 0 100 100">
          {/* Background Circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="lightgray"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="green"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>

        {/* Profile Image (in background) */}

        <Image
          source={userData?.PR_PHOTO_URL ? {uri: userData?.PR_PHOTO_URL} : user} // Use the profile picture URL or a default image
          style={{
            position: 'absolute',
            width: wp(8.5),
            height: wp(8.5),
            borderRadius: wp(100),
            alignItems: 'center',
            zIndex: 100,
            resizeMode: 'cover',
          }}
        />

        {/* Percentage Text */}
        <Text
          style={{
            position: 'absolute',
            fontSize: 14,
            fontWeight: 'bold',
            color: '#000000',
          }}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
    );
  };

  const fetchUserProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${BASE_URL}profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        setUserData(data.data);
        calculateCompletionPercentage(data.data);
        await storeData(async_keys.user_data, data.data);
      } else {
        setErrorMessage(data.data.message);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrorMessage('Failed to load user data.');
    }
  };

  const calculateCompletionPercentage = data => {
    const requiredFields = [
      'PR_PHOTO_URL',
      'PR_FULL_NAME',
      'PR_DOB',
      'PR_MOBILE_NO',
      'PR_GENDER',
      'PR_PIN_CODE',
      'PR_AREA_NAME',
      'PR_ADDRESS',
      'PR_STATE_CODE',
      'City.CITY_ST_NAME',
      'PR_EDUCATION',
      'PR_EDUCATION_DESC',
      'PR_DISTRICT_CODE',
      'City.CITY_DS_NAME',
      'PR_PROFESSION_DETA',
      'Profession.PROF_NAME',
      'PR_FATHER_NAME',
      'PR_MOTHER_NAME',
      'PR_SPOUSE_NAME',
      'Children',
      'PR_MARRIED_YN',
      'PR_BUSS_INTER',
      'PR_BUSS_STREAM',
      'PR_BUSS_TYPE',
      'PR_HOBBY',
    ];

    let filledFields = 0;

    requiredFields.forEach(field => {
      let value;

      // Handle nested objects like "City.CITY_ST_NAME"
      if (field.includes('.')) {
        value = field.split('.').reduce((obj, key) => obj?.[key], data);
      } else {
        value = data[field];
      }

      // Check if the value is valid (not null, undefined, empty, or an empty array)
      if (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        filledFields++;
      }
    });

    const completion = Math.round((filledFields / requiredFields.length) * 100);
    setCompletionPercentage(completion);

    console.log(`Filled Fields: ${filledFields} / ${requiredFields.length}`);
    console.log(`Completion Percentage: ${completion}%`);
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      {/* <AppLoader loading={apiLoader} /> */}
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          // colors={['#D6D9C5', '#FFFFFF']}
          colors={['#BDD9F2', '#F0F2F2']}
          style={{flex: 1}}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
            }>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

                marginTop: hp(1),
                // marginTop: hp(6),
                alignItems: 'center',
                marginHorizontal: wp(4),
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Profile')}>
                <CircularProgress
                  progress={
                    completionPercentage !== null
                      ? completionPercentage / 100
                      : 0
                  }
                />
              </TouchableOpacity>
              <Image
                source={logo}
                style={{
                  marginLeft: wp(2),
                  height: hp(6),
                  width: wp(12),
                  borderWidth: wp(0.3),
                  borderColor: '#D6D9C5',
                  borderRadius: wp(2),
                }}
              />
              {/* </View> */}
              <View style={{flexDirection: 'row', marginRight: wp(2)}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Announcement')}>
                  <Image
                    source={Notification}
                    tintColor={'#697368'}
                    style={{height: hp(2.5), width: wp(5), marginRight: wp(3)}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    source={LanguageConverter}
                    tintColor={'#697368'}
                    style={{height: hp(2.5), width: wp(5)}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: hp(1.8),
                marginLeft: wp(5),
                marginTop: hp(2),
                color: '#2F4032',
              }}>
              Connecting Rangrej Samaj Across…
            </Text>

            <View style={{marginTop: hp(1)}}>
              {events.length === 0 ? (
                // Show shimmer placeholders for 5 items
                <Swiper
                  style={{height: hp(30)}}
                  showsButtons={false}
                  autoplay={false}
                  loop={false}
                  showsPagination={false}>
                  {[...Array(5)].map((_, index) => (
                    <View key={index} style={{alignItems: 'center'}}>
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{
                          height: hp(25),
                          width: wp(90),
                          borderRadius: wp(3),
                          marginTop: hp(1),
                        }}
                        shimmerStyle={{borderRadius: wp(3)}}
                        shimmerColors={['#FFFFFF', '#D9D4D0', '#FFFFFF']}
                        autoRun={true}
                        visible={false}
                      />
                    </View>
                  ))}
                </Swiper>
              ) : (
                // Your original Swiper code
                <Swiper
                  key={events.length}
                  style={{height: hp(30)}}
                  showsButtons={false}
                  autoplay={true}
                  loop={events.length >= 5}
                  showsPagination={true}
                  paginationStyle={{
                    bottom: 10,
                    alignSelf: 'center',
                  }}
                  dot={
                    <View
                      style={{
                        backgroundColor: 'rgba(217, 217, 217, 1)',
                        width: 7,
                        height: 7,
                        borderRadius: 5,
                        marginHorizontal: 3,
                      }}
                    />
                  }
                  activeDot={
                    <View
                      style={{
                        backgroundColor: '#2F4032',
                        width: 18,
                        height: 7,
                        borderRadius: 6,
                        marginHorizontal: 3,
                      }}
                    />
                  }>
                  {(() => {
                    const imageData = events
                      .flatMap(event =>
                        event.headerImage?.uri
                          ? [{uri: event.headerImage.uri, event}]
                          : [],
                      )
                      .slice(0, 5);

                    if (imageData.length === 1) {
                      imageData.push(imageData[0]);
                    }

                    return imageData.map(({uri, event}, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          // your existing navigation logic
                          const id = event.eventCategoryID;
                          const screenMap = {
                            1: 'DonationDetail',
                            2: 'AnnouncementDetail',
                            3: 'Aboutus',
                            4: 'PrivacyPolicy',
                            5: 'TermsAndConditions',
                            6: 'Fundinsights',
                            7: 'FeedBack',
                            8: 'Contact',
                            9: 'MyProfile',
                            10: 'FamilyMemberDetails',
                            11: 'AddFamilyMembers',
                            12: 'MyDonation',
                          };
                          const screen = screenMap[id];
                          if (screen)
                            props.navigation.navigate(screen, {event});
                        }}>
                        <Image
                          source={{uri}}
                          style={{
                            height: hp(25),
                            width: wp(90),
                            alignSelf: 'center',
                            borderRadius: wp(3),
                            marginTop: hp(1),
                          }}
                        />
                      </TouchableOpacity>
                    ));
                  })()}
                </Swiper>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: wp(5),
                marginTop: hp(2),
              }}>
              <View
                style={{
                  height: hp(11.5),
                  width: wp(40),
                  // elevation: 5,

                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: wp(3),
                  // backgroundColor: '#D9D4D0',
                  backgroundColor: 'rgb(255, 255, 245)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(30),
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={population}
                    style={{height: hp(4), width: wp(8.2)}}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      // borderWidth: wp(.1),

                      width: wp(20),
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: hp(2.2),
                      textAlign: 'right',
                      color: '#A64138',
                    }}>
                    {stats.totalPopulation}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: hp(1.9),
                    textAlign: 'center',
                    alignSelf: 'center',
                    marginTop: hp(1),
                  }}>
                  Total Population
                </Text>
              </View>

              <View
                style={{
                  height: hp(11.5),
                  width: wp(40),

                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: wp(3),

                  backgroundColor: 'rgb(255, 255, 245)',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(30),
                    alignSelf: 'center',
                  }}>
                  <Image
                    source={family}
                    style={{height: hp(4), width: wp(8.2)}}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      // borderWidth: wp(.1),

                      width: wp(20),
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: hp(2.2),
                      textAlign: 'right',
                      color: '#A64138',
                    }}>
                    {stats.familyCount}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: hp(1.9),
                    textAlign: 'center',
                    alignSelf: 'center',
                    marginTop: hp(1),
                  }}>
                  Family
                </Text>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: wp(5.5),
                marginTop: hp(2),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(2.5),
              }}>
              <Text
                style={{
                  fontSize: hp(2.4),
                  color: '#1F260F',
                  fontFamily: 'Poppins-Medium',
                }}>
                Donations
              </Text>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('Donation')}>
                {' '}
                <Text
                  style={{
                    fontSize: hp(1.9),
                    color: '#1F260F',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  More
                </Text>
              </TouchableOpacity>
            </View>

            {/* Donation */}
            <View style={styles.donationContainer}>
              {apiLoader ? (
                <FlatList
                  // data={[events.map.id]} // Placeholder data
                  data={[1, 2, 3, 4, 5]}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <LinearGradient
                      start={{x: 0, y: 0.1}}
                      end={{x: 0.4, y: 1}}
                      colors={['#FFFFFF', '#ffffcc']}
                      style={styles.card}>
                      {/* Shimmer for Event Name */}
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerTitle}
                        shimmerColors={['#ffffcc', '#E0E0E0', '#FFFFFF']}
                        autoRun={true}
                      />

                      {/* Shimmer for Event Message */}
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerMessage}
                        shimmerColors={['#ffffcc', '#E0E0E0', '#FFFFFF']}
                        autoRun={true}
                      />

                      {/* Shimmer for Address */}
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerAddress}
                        shimmerColors={['#ffffcc', '#E0E0E0', '#FFFFFF']}
                        autoRun={true}
                      />
                    </LinearGradient>
                  )}
                />
              ) : (
                <>
                  {events.some(
                    event =>
                      event.eventCategoryID === 1 &&
                      isEventActive(event.EventsToDate),
                  ) ? (
                    <FlatList
                      data={[...events]
                        .filter(
                          event =>
                            event.eventCategoryID === 1 &&
                            isEventActive(event.EventsToDate),
                        )
                        .reverse()}
                      horizontal={true}
                      pagingEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('DonationDetail', {
                              event: item,
                            })
                          }>
                          <LinearGradient
                            start={{x: 0, y: 0.1}}
                            end={{x: 0.4, y: 1}}
                            colors={['#FFFFFF', '#ffffcc']}
                            style={styles.card}>
                            <View style={styles.categoryContainer}>
                              <Text
                                numberOfLines={1}
                                style={styles.categoryStyle}>
                                {item.cate_desc}
                              </Text>
                            </View>
                            <Text numberOfLines={1} style={styles.eventName}>
                              {item.name}
                            </Text>
                            <Text numberOfLines={3} style={styles.eventMessage}>
                              {item.message}
                            </Text>

                            <Text numberOfLines={2} style={styles.eventAddress}>
                              {item.address}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    ''
                  )}
                </>
              )}
            </View>

            {/* KPI  */}

            <View
              style={{
                marginHorizontal: wp(5.5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1),
              }}>
              <Text
                style={{
                  fontSize: hp(2.4),
                  color: '#1F260F',
                  fontFamily: 'Poppins-Medium',
                }}>
                Insights
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Fundinsights')}>
                <Text
                  style={{
                    fontSize: hp(1.9),
                    color: '#1F260F',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  More
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: hp(1), alignItems: 'center'}}>
              <Swiper
                style={{height: hp(26)}}
                showsButtons={false}
                horizontal={true}
                autoplay={true}
                showsPagination={false}>
                <LinearGradient
                  start={{x: 1, y: 1.7}}
                  end={{x: 0.2, y: 0}}
                  colors={['#658DA6', '#FFFFFF']}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: wp(90),
                    backgroundColor: '#F2F0CE',
                    borderRadius: wp(3),
                    paddingVertical: hp(1),
                  }}>
                  <PieChart widthAndHeight={widthAndHeight} series={sexRatio} />

                  <View style={{alignSelf: 'flex-start', marginLeft: wp(2)}}>
                    {sexRatio.map((item, index) => {
                      const percentage = (
                        (item.value / totalRatio) *
                        100
                      ).toFixed(1);
                      return (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{
                              height: hp(1.5),
                              width: wp(3),
                              backgroundColor: item.color,
                            }}></View>

                          <Text
                            style={{
                              marginLeft: wp(2.2),
                              fontSize: hp(1.2),
                              fontFamily: 'Poppins-Regular',
                              width: wp(72),
                            }}>
                            {item.text} - {percentage}%
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </LinearGradient>

                <LinearGradient
                  start={{x: 1, y: 1.7}}
                  end={{x: 0.2, y: 0}}
                  colors={['#6F618C', '#FFFFFF']}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: wp(90),
                    // elevation: 5,
                    backgroundColor: '#F2F0CE',
                    borderRadius: wp(3),
                    paddingVertical: hp(1),
                  }}>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={donations}
                    cover={{radius: 0.6}}
                    padAngle={0.01}
                    style={{backgroundColor: '#FFFFFF', borderRadius: wp(30)}}
                  />

                  <View style={{alignSelf: 'flex-start', marginLeft: wp(2)}}>
                    {donations.map((item, index) => {
                      const percentage = (
                        (item.value / totaldonation) *
                        100
                      ).toFixed(1);

                      return (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{
                              height: hp(1.5),
                              width: wp(3),
                              backgroundColor: item.color,
                            }}></View>

                          <Text
                            style={{
                              marginLeft: wp(2.2),
                              fontSize: hp(1.2),
                              fontFamily: 'Poppins-Regular',
                              width: wp(72),
                            }}>
                            {item.text} - {percentage}%
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </LinearGradient>

                {/* <LinearGradient
                  start={{x: 1, y: 1.7}}
                  end={{x: 0.2, y: 0}}
                  colors={['#7C8C42', '#FFFFFF']}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: wp(90),
                    elevation: 5,
                    backgroundColor: '#F2F0CE',
                    borderRadius: wp(3),
                    paddingTop: hp(1),
                    paddingBottom: hp(1),
                  }}>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={Population}
                    cover={{radius: 0.6, color: '#F2F0CE'}}
                    style={{backgroundColor: '#FFFFFF', borderRadius: wp(30)}}
                  />

                  <View style={{alignSelf: 'flex-start', marginLeft: wp(2)}}>
                    {Population.map((item, index) => {
                      const percentage = (
                        (item.value / totalPopulation) *
                        100
                      ).toFixed(1);

                      return (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{
                              height: hp(1.5),
                              width: wp(3),
                              backgroundColor: item.color,
                            }}></View>

                          <Text
                            style={{
                              marginLeft: wp(2.2),
                              fontSize: hp(1.2),
                              fontFamily: 'Poppins-Regular',
                              width: wp(72),
                            }}>
                            {item.text} - {percentage}%
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </LinearGradient> */}
              </Swiper>
            </View>

            {/* Announcement*/}

            <View
              style={{
                marginHorizontal: wp(5.5),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: hp(1),
              }}>
              <Text
                style={{
                  fontSize: hp(2.4),
                  color: '#1F260F',
                  fontFamily: 'Poppins-Medium',
                }}>
                Announcements
              </Text>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('Announcement')}>
                <Text
                  style={{
                    fontSize: hp(1.9),
                    color: '#1F260F',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  More
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginLeft: wp(3),
                marginTop: hp(1.5),
                marginBottom: hp(10),
                marginRight: wp(3),
              }}>
              {apiLoader ? (
                <FlatList
                  // data={[events.map.id]}
                  data={[1, 2, 3, 4, 5]}
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={() => (
                    <View
                      style={{
                        marginHorizontal: wp(2),
                        width: wp(90),

                        paddingVertical: hp(1.5),
                        borderRadius: wp(3),
                        backgroundColor: '#F2DBD5',
                        marginBottom: hp(2),
                      }}>
                      {/* Shimmer Placeholder for Header */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: hp(1),
                        }}>
                        <ShimmerPlaceholder
                          LinearGradient={LinearGradient}
                          style={{
                            height: hp(3),
                            width: wp(6),
                            marginLeft: wp(3),
                            borderRadius: wp(100),
                          }}
                          shimmerColors={['#F2DBD5', '#E0E0E0', '#FFFFFF']}
                          autoRun={true}
                        />
                        <ShimmerPlaceholder
                          LinearGradient={LinearGradient}
                          style={{
                            height: hp(2.5),
                            width: wp(73),
                            marginLeft: wp(3),
                            borderRadius: wp(1),
                          }}
                          shimmerColors={['#F2DBD5', '#E0E0E0', '#FFFFFF']}
                          autoRun={true}
                        />
                      </View>

                      {/* Shimmer Placeholder for Message */}
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{
                          height: hp(2),
                          width: wp(82),

                          marginLeft: wp(3),
                          borderRadius: wp(1),
                          marginBottom: hp(1),
                        }}
                        shimmerColors={['#F2DBD5', '#E0E0E0', '#FFFFFF']}
                        autoRun={true}
                      />

                      {/* Shimmer Placeholder for Date */}
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{
                          height: hp(2),
                          width: wp(50),
                          marginLeft: wp(3),
                          borderRadius: wp(1),
                          marginBottom: hp(1),
                        }}
                        shimmerColors={['#F2DBD5', '#E0E0E0', '#FFFFFF']}
                        autoRun={true}
                      />

                      {/* Shimmer Placeholder for Address */}
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{
                          height: hp(2),
                          width: wp(82),
                          marginLeft: wp(3),
                          borderRadius: wp(1),
                          marginBottom: hp(1),
                        }}
                        shimmerColors={['#F2DBD5', '#E0E0E0', '#FFFFFF']}
                        autoRun={true}
                      />

                      {/* Shimmer Placeholder for Note */}
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{
                          height: hp(2),
                          width: wp(82),
                          marginLeft: wp(3),
                          borderRadius: wp(1),
                          marginBottom: hp(1),
                        }}
                        shimmerColors={['#F2DBD5', '#E0E0E0', '#FFFFFF']}
                        autoRun={true}
                      />
                    </View>
                  )}
                />
              ) : (
                <>
                  {events.some(
                    event =>
                      event.eventCategoryID === 2 &&
                      isEventActive(event.EventsToDate),
                  ) ? (
                    <FlatList
                      data={[...events]
                        .filter(
                          event =>
                            event.eventCategoryID === 2 &&
                            isEventActive(event.EventsToDate),
                        )
                        .reverse()}
                      horizontal={true}
                      pagingEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('AnnouncementDetail', {
                              event: item,
                            })
                          }
                          style={{
                            marginHorizontal: wp(2),
                            width: wp(90),
                            paddingVertical: hp(1.5),
                            borderRadius: wp(3),
                            backgroundColor: '#F2DBD5',
                            marginBottom: hp(2),
                          }}>
                          <View
                            style={[
                              styles.categoryContainer,
                              {
                                backgroundColor: '#ac2b3b',
                                marginBottom: hp(0.3),
                              },
                            ]}>
                            <Text
                              numberOfLines={1}
                              style={styles.categoryStyle}>
                              {item.cate_desc}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              alignContent: 'center',
                              alignSelf: 'left',
                              marginTop: hp(0.4),
                            }}>
                            <Image
                              source={announcementlogo}
                              style={{
                                height: hp(3),
                                width: wp(6),
                                marginLeft: wp(3),
                              }}
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: '#000',
                                fontSize: hp(2),
                                width: wp(73),

                                fontWeight: '800',
                                marginLeft: wp(3),
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {item.name}
                            </Text>
                          </View>

                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#000',
                              fontSize: hp(1.7),
                              width: wp(82),

                              marginLeft: wp(3),
                              marginTop: hp(0.2),
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {item.message}
                          </Text>

                          {item.EventFromDate ? (
                            <Text
                              numberOfLines={1}
                              style={{
                                color: '#000',
                                fontSize: hp(1.7),
                                marginTop: hp(0.4),

                                width: wp(82),
                                marginLeft: wp(3),
                                fontFamily: 'Poppins-Medium',
                              }}>
                              <Text style={{fontWeight: '800'}}>DATE : </Text>
                              {item.EventFromDate}
                              {item.EventsToDate
                                ? ` - ${item.EventsToDate}`
                                : ''}
                            </Text>
                          ) : null}

                          {item.address ? (
                            <Text
                              numberOfLines={1}
                              style={{
                                color: '#000',
                                fontSize: hp(1.7),
                                marginTop: hp(0.2),

                                width: wp(82),
                                marginLeft: wp(3),
                                fontFamily: 'Poppins-Medium',
                              }}>
                              <Text style={{fontWeight: '800'}}>
                                LOCATION :
                              </Text>{' '}
                              {item.address}
                              {item.city ? ` , ${item.city}` : ''}
                            </Text>
                          ) : null}

                          {item.Detail ? (
                            <Text
                              numberOfLines={2}
                              style={{
                                color: '#000',
                                fontSize: hp(1.7),
                                marginTop: hp(0.2),

                                width: wp(82),
                                marginLeft: wp(3),
                                fontFamily: 'Poppins-Medium',
                              }}>
                              <Text style={{fontWeight: '800'}}>NOTE :</Text>{' '}
                              {item.Detail}
                            </Text>
                          ) : null}
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    ''
                  )}
                </>
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

      <View
        style={{
          position: 'absolute',
          bottom: hp(4),
          alignSelf: 'center',
          borderRadius: wp(10),
        }}>
        <Footer title="Home" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryStyle: {
    color: '#FFFFFF',
    fontSize: hp(1.4),
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    paddingTop: hp(0.2),
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C8C42',
    paddingHorizontal: wp(4),
    left: wp(3),
    borderRadius: wp(2),
    alignSelf: 'flex-start',
  },
  AlertImage: {
    height: hp(17),
    aspectRatio: 1 / 1,
  },
  ModalText: {
    marginTop: hp(3),
    fontSize: hp(2.6),
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  ModalText1: {
    fontSize: hp(2),
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  PRModal: {
    height: hp(45),

    borderRadius: wp(5),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Donation styles
  donationContainer: {
    marginLeft: wp(4.1),
    marginTop: hp(1.5),
    marginRight: wp(4.1),
  },
  shimmerTitle: {
    height: hp(2),
    width: wp(75),
    marginLeft: wp(3),
    borderRadius: wp(1),
    marginBottom: hp(1),
  },
  shimmerMessage: {
    height: hp(5),
    width: wp(75),
    marginLeft: wp(3),
    borderRadius: wp(1),
    marginBottom: hp(1.5),
  },
  shimmerAddress: {
    height: hp(2),
    width: wp(50),
    alignSelf: 'flex-end',
    marginRight: wp(3.5),
    borderRadius: wp(1),
    marginTop: hp(2.7),
  },
  card: {
    marginHorizontal: wp(1),
    width: wp(90),
    paddingVertical: hp(2),
    height: hp(23),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },
  eventName: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp(2),
    width: wp(75),
    marginLeft: wp(3),
    marginTop: hp(0.6),
    fontFamily: 'Poppins-Medium',
  },
  eventMessage: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp(1.4),
    width: wp(75),
    marginLeft: wp(3),
    marginTop: hp(1),
    fontFamily: 'Poppins-Regular',
  },
  eventAddress: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp(1.6),
    width: wp(50),
    // alignSelf: 'flex-end',
    // marginRight: wp(3.5),
    // marginTop: hp(2.7),
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: wp(3.5),
  },

  //Donation styles

  MainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    height: hp(3),
    width: wp(20),
    marginRight: 10,
  },
  languageText: {
    fontSize: hp(2),
    color: '#000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    borderRadius: 8,
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

export default HomeScren;
