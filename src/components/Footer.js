import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  _View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
// import CompanyLogo from '../Provider/png/CompanyLogo.png';
import LinearGradient from 'react-native-linear-gradient';

import Home from '../provider/png/HomeIcon.png';
import HomeFill from '../provider/png/HomeIconFill.png';
import Directoryy from '../provider/png/Directory.png';
import DirectoryFill from '../provider/png/DirectoryFill.png';
import Donationn from '../provider/png/Donation.png';
import DonationFill from '../provider/png/DonationFill.png';
import Opportunities from '../provider/png/Opportunities.png';
import OpportunitiesFill from '../provider/png/OpportunitiesFill.png';
import Profilee from '../provider/png/Profile.png';
import ProfileFill from '../provider/png/ProfileFill.png';
import setting from '../provider/png/setting.png';
import settingempty from '../provider/png/settingempty.png';
import {BASE_URL} from '../api/ApiInfo';
import {getData, async_keys, clearData, storeData} from '../api/UserPreference';

import Donation from '../Home/Donation';
import Directory from '../Home/Directory';
import Announcement from '../Home/Announcement';
import Profile from '../Home/Profile';
// import OverView from '../Home/OverView';
import Drawer from '../Home/Drawer';

const Footer = props => {
  const navigation = useNavigation();
  const {title} = props;
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: hp(20),
        }}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          colors={['#d48384', '#fbdbba']}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: wp(90),
            borderRadius: hp(10),
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
            elevation: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            style={{
              alignItems: 'center',
            }}>
            {title === 'Home' ? (
              <Image
                source={HomeFill}
                resizeMode="contain"
                // tintColor={'#4E5927'}
                tintColor={'#697368'}
                style={{height: hp(3.5), width: wp(7)}}
              />
            ) : (
              <Image
                source={Home}
                tintColor={'#000000'}
                style={{height: hp(3.5), width: wp(7)}}
                resizeMode="contain"
              />
            )}

            {/* <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: title === 'Home' ? 'blue' : '#000000',
                fontSize: hp(1.6),
                marginTop: hp(0.3),
              }}>
              Home
            </Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Directory');
            }}
            style={{
              alignItems: 'center',
            }}>
            {title === 'Directory' ? (
              <Image
                source={DirectoryFill}
                tintColor={'#4E5927'}
                style={{height: hp(3.5), width: wp(7)}}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Directoryy}
                tintColor={'#000000'}
                style={{height: hp(3.5), width: wp(7)}}
                resizeMode="contain"
              />
            )}

            {/* <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                color: title === 'Saved' ? '#900075' : '#5A5A5A',
                fontSize: hp(1.5),
                marginTop: hp(0.3),
              }}>
              Directory
            </Text> */}
          </TouchableOpacity>

          {/* <View style={{flexDirection: 'column'}}>
            <View
              style={{
                borderRadius: wp(1.2),
                transform: [{rotate: '45deg'}],
                backgroundColor: '#900075',
                height: hp(7),
                aspectRatio: 1 / 1,
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: hp(-4.5),
                justifyContent: 'center',
              }}>
              <Compass />
            </View>
            <Text
              style={{
                color: '#900075',
                // fontFamily: 'Poppins-Regular',
                fontFamily: 'Montserrat-SemiBold',
                alignSelf: 'center',
                fontSize: hp(1.8),

                marginTop: hp(1.6),
              }}>
              Explore
            </Text>
          </View> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Donation')}
            style={{
              alignItems: 'center',
            }}>
            {title === 'Donation' ? (
              <Image
                source={DonationFill}
                tintColor={'#4E5927'}
                style={{height: hp(4), width: wp(8)}}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Donationn}
                tintColor={'#000000'}
                style={{height: hp(4), width: wp(8)}}
                resizeMode="contain"
              />
            )}

            {/* <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                color: title === 'Chats' ? '#900075' : '#5A5A5A',
                fontSize: hp(1.5),
                marginTop: hp(0.3),
              }}>
              Donation
            </Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Announcement')}
            style={{
              alignItems: 'center',
            }}>
            {title === 'Announcement' ? (
              <Image
                source={OpportunitiesFill}
                tintColor={'#4E5927'}
                resizeMode="contain"
                style={{height: hp(4), width: wp(8)}}
              />
            ) : (
              <Image
                source={Opportunities}
                tintColor={'#000000'}
                resizeMode="contain"
                style={{height: hp(4), width: wp(8)}}
              />
            )}
            {/* 
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                color: title === 'Profile' ? '#900075' : '#5A5A5A',
                fontSize: hp(1.5),
                marginTop: hp(0.3),
                
              }}>
                
              Opportunities
            </Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Drawer')}
            style={{
              alignItems: 'center',
              // backgroundColor: "#FFFFFF",
              // height: hp(4.8),
              // justifyContent: "center",
              // aspectRatio: 1/1,
              // borderRadius: wp(100)
            }}>
            {/* Profile */}
            {title === 'Drawer' ? (
              <Image
                // source={ProfileFill}
                source={setting}
                resizeMode="contain"
                tintColor={'#4E5927'}
                style={{height: hp(3.4), width: wp(6.8)}}
              />
            ) : (
              <Image
                // source={Profilee}
                source={settingempty}
                resizeMode="contain"
                tintColor={'#000000'}
                style={{height: hp(3.4), width: wp(6.8)}}
              />
            )}

            {/* <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                color: title === 'Profile' ? '#900075' : '#5A5A5A',
                fontSize: hp(1.5),
                marginTop: hp(0.3),
                
              }}>
                
              Profile
            </Text> */}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});

export default Footer;
