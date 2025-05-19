//person name
//person image
//person mobile number
//search
//edit button

import {React, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StatusBar,
  Clipboard,
  ToastAndroid,
  Linking,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from '../components/Footer';
import leftback from '../provider/png/leftback.png';
import profile1 from '../provider/png/profile1.png';
import profile2 from '../provider/png/profile2.png';
import edit from '../provider/png/edit.png';
import search from '../provider/png/search.png';
import call from '../provider/png/call.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import city from '../provider/png/city.png';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {storeData, async_keys} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import user from '../provider/png/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import useUserProfile from '../components/profileCompleted/useUserProfile';
// import IncompleteProfileModal from '../components/profileCompleted/IncompleteProfileModal';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradientComponent from 'react-native-linear-gradient';

const Directory = props => {
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [dataa, setDataa] = useState([]);
  const [copiedNumber, setCopiedNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [areaOptions, setAreaOptions] = useState([]);
  const inputRef = useRef(null);
  // const {userDataa, PRmodalVisible, setPRModalVisible, completionPercentagee} =
  //   useUserProfile();

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        const response = await fetch(`${BASE_URL}directory`);
        const result = await response.json();
        // console.log('Directory Data:', result.Directory);

        if (!Array.isArray(result.Directory)) {
          console.warn('Invalid response format');
        }

        const processedData = result.Directory.filter(item => item !== null) // Remove null values
          .map(item => ({
            // PrId: item.PR
            uniqueId: item.PR_UNIQUE_ID,
            fullName: item.PR_FULL_NAME,
            address: item.PR_ADDRESS, // ✅ Include PR_ADDRESS
            areaName: item.PR_AREA_NAME,
            cityCode: item.PR_CITY_CODE,
            districtCode: item.PR_DISTRICT_CODE,
            stateCode: item.PR_STATE_CODE,
            mobileNo: item.PR_MOBILE_NO,
            photo: item.PR_PHOTO_URL,
          }));

        console.log('Processed Directory Data:', processedData);
        setDataa(processedData);
        const uniqueAreas = Array.from(
          new Map(processedData.map(item => [item.areaName, item])).values(),
        );

        setAreaOptions(uniqueAreas);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching directory:', error);
      }
    };

    fetchDirectory();
  }, []);

  // const data = {
  //   Directory: [
  //     {
  //       id: 2,
  //       name: 'Salman Khan',
  //       profile: profile1,
  //       phonenumber: '5657893241',
  //     },
  //     {
  //       id: 1,
  //       name: 'Amir Khan',
  //       profile: profile2,
  //       phonenumber: '9834562345',
  //     },
  //     {
  //       id: 3,
  //       name: 'Shah Rukh Khan ',
  //       profile: profile1,
  //       phonenumber: '9834562345',
  //     },
  //     {
  //       id: 4,
  //       name: 'Saif Ali Khan ',
  //       profile: profile2,
  //       phonenumber: '9894562645',
  //     },
  //   ],
  //   CityTown: [
  //     {id: 1, city: 'Jaipur'},
  //     {id: 2, city: 'jodhpur'},
  //     {id: 3, city: 'kota'},
  //     {id: 4, city: 'tonk'},
  //     {id: 5, city: 'udaipur'},
  //     {id: 6, city: 'jaisalmer'},
  //   ],
  // };
  const filteredData = dataa.filter(
    item =>
      (searchText === '' ||
        item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.mobileNo.includes(searchText)) &&
      (searchArea === '' || item.areaName === searchArea), // Ensure correct filtering by area
  );

  const copyToClipboard = number => {
    Clipboard.setString(number); // Copy number to clipboard
    setCopiedNumber(number); // Set the copied number in state

    // Show a toast message (Android only)
    ToastAndroid.show('Number copied!', ToastAndroid.SHORT);

    // Focus input to show keyboard
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const makePhoneCall = phoneNumber => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert('Error', 'Phone number is not available');
    }
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        {/* <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"transparent"} /> */}

        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
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
                  fontFamily: 'Poppins-SemiBold',
                  fontWeight: '600',
                  fontSize: hp(3),
                }}>
                Directory
              </Text>
            </View>
          </View>

          <Dropdown
            style={styles.dropdown1}
            placeholderStyle={styles.placeholderStyle1}
            selectedTextStyle={styles.selectedTextStyle1}
            inputSearchStyle={styles.inputSearchStyle1}
            iconStyle={styles.iconStyle1}
            data={areaOptions}
            // disable={!isEditable}
            search
            maxHeight={300}
            labelField="areaName" // Correct label field
            valueField="areaName"
            placeholder="Select a Town/City"
            searchPlaceholder="Search..."
            // value={searchText}
            // onChangeText={text => setSearchText(text)}
            value={searchArea}
            onChange={item => {
              console.log('Selected Area:', item.areaName); // Debugging line
              setSearchArea(item.areaName); // Ensure correct ID is set
            }}
            renderLeftIcon={() => (
              <Image
                source={city}
                style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
              />
            )}
            renderItem={item => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: hp(2),
                  paddingLeft: wp(4),
                }}>
                <Image
                  source={city}
                  style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                />
                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: 'Poppins-Regular',
                    color: '#000',
                  }}>
                  {item.areaName}
                </Text>
              </View>
            )}
          />

          <View
            style={{
              marginBottom: hp(2),
              marginTop: hp(2.5),
              backgroundColor: '#FFFFFF',
              marginHorizontal: wp(8),
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: wp(2),
              paddingVertical: hp(0.5),
            }}>
            <Image
              source={search}
              style={{
                height: hp(3),
                width: wp(6),
                position: 'absolute',
                zIndex: 11,
                marginLeft: wp(2),
              }}
            />
            <TextInput
              placeholder="Search..."
              placeholderTextColor={'#000000'}
              numberOfLines={1}
              value={searchText}
              onChangeText={text => setSearchText(text)}
              style={{
                backgroundColor: '#FFFFFF',
                fontSize: hp(2.2),
                borderRadius: wp(5),
                color: '#000000',
                width: wp(85),
                paddingLeft: wp(10),
                paddingRight: wp(3),
                fontFamily: 'Poppins-Regular',
              }}
            />
          </View>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                marginTop: hp(1.5),
                alignItems: 'center',
                marginBottom: hp(10),
              }}>
              {loading ? (
                Array.from({length: 6}).map((_, index) => (
                  <LinearGradientComponent
                    key={index}
                    colors={['#e0e0e0', '#c0c0c0', '#e0e0e0']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      marginHorizontal: wp(2),
                      marginVertical: wp(0.1),
                      width: wp(80),
                      height: hp(8),
                      borderRadius: wp(3),
                      marginBottom: hp(2),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: wp(3),
                    }}>
                    <ShimmerPlaceHolder
                      style={{
                        height: hp(5),
                        width: wp(10),
                        borderRadius: wp(100),
                      }}
                    />
                    <View style={{marginLeft: wp(3), flex: 1}}>
                      <ShimmerPlaceHolder
                        style={{
                          height: hp(2),
                          marginBottom: hp(1),
                          borderRadius: 4,
                        }}
                      />
                      <ShimmerPlaceHolder
                        style={{
                          height: hp(1.6),
                          width: wp(30),
                          borderRadius: 4,
                        }}
                      />
                    </View>
                    <ShimmerPlaceHolder
                      style={{
                        height: wp(11),
                        width: wp(11),
                        borderRadius: wp(2),
                      }}
                    />
                  </LinearGradientComponent>
                ))
              ) : (
                <FlatList
                  data={filteredData}
                  keyExtractor={(item, index) => `${item.uniqueId}-${index}`}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onLongPress={() => copyToClipboard(item.mobileNo)}
                      style={{
                        marginHorizontal: wp(2),
                        marginVertical: wp(0.1),
                        width: wp(80),
                        height: hp(8),
                        borderRadius: wp(3),
                        backgroundColor: '#F2E8CF',
                        marginBottom: hp(2),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: wp(3),
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={item.photo ? {uri: item.photo} : user}
                          style={{
                            height: hp(5),
                            width: wp(10),
                            borderRadius: wp(100),
                            resizeMode: 'cover',
                            alignSelf: 'center',
                          }}
                        />
                        <View style={{marginLeft: wp(3)}}>
                          <Text
                            style={{
                              fontSize: hp(2),
                              fontFamily: 'Poppins-Medium',
                              color: '#1F260F',
                            }}>
                            {item.fullName}
                          </Text>
                          <Text
                            style={{
                              fontSize: hp(1.6),
                              fontFamily: 'Poppins-Medium',
                              color: '#4E5927',
                            }}>
                            {item.mobileNo}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => makePhoneCall(item.mobileNo)}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          width: wp(11),
                          borderRadius: wp(2),
                          backgroundColor: '#658DA6',
                          aspectRatio: 1 / 1,
                        }}>
                        <Image
                          source={call}
                          style={{
                            height: hp(2.5),
                            width: wp(5),
                            resizeMode: 'cover',
                          }}
                          tintColor={'#1F260F'}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ImageBackground>
      <View
        style={{
          position: 'absolute',
          bottom: hp(4),
          alignSelf: 'center',
          borderRadius: wp(10),
        }}>
        <Footer title="Directory" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  dropdown1: {
    alignSelf: 'center',
    marginTop: hp(2),
    height: hp(7),
    width: wp(85),
    backgroundColor: '#FFFFFF',

    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    fontFamily: 'Poppins-Regular',
    fontSize: hp(2.2),
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Regular',
    color: '#000000',
  },
  selectedTextStyle1: {
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  iconStyle1: {
    width: 30,
    height: 30,
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 60,
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Regular',
  },
});

export default Directory;
