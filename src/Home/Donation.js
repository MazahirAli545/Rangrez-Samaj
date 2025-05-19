import {React, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
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
//   import Swiper from 'react-native-swiper';
import logo1 from '../provider/png/logo1.png';
import logo2 from '../provider/png/logo2.png';
import DonationDetail from '../Home/DonationDetail';
import doller from '../provider/png/doller.png';
import {BASE_URL} from '../api/ApiInfo';
import axios from 'axios';
// import DonationDetail from '../Home/DonationDetail';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import BackgroundImage from '../provider/png/BackgroundImage.png';

const Donation = props => {
  const [apiLoader, setApiLoader] = useState(true);
  const [events, setEvents] = useState([]);

  const isEventActive = eventToDate => {
    const today = new Date();
    const eventDate = new Date(eventToDate);
    return eventDate >= today;
  };

  useEffect(() => {
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

    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.MainContainer}>
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
            // colors={['#73524e', '#fbdbba']}
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
                  Donations
                </Text>
              </View>
            </View>

            <View style={styles.donationContainer}>
              {apiLoader ? (
                <FlatList
                  data={Array(5).fill({})} // Placeholder data
                  horizontal={false}
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
                      data={events.filter(
                        event =>
                          event.eventCategoryID === 1 &&
                          isEventActive(event.EventsToDate),
                      )}
                      horizontal={false}
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
          </LinearGradient>
        </KeyboardAwareScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: hp(4),
            alignSelf: 'center',
            borderRadius: wp(10),
          }}>
          <Footer title="Donation" />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryStyle: {
    color: '#FFFFFF',
    fontSize: hp(1.5),
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
  },
  categoryContainer: {
    backgroundColor: '#7C8C42',
    paddingHorizontal: wp(2),
    left: wp(3),
    borderRadius: wp(2),
    height: hp(2.2),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  //Donation styles
  donationContainer: {
    // paddingBottom: hp(5),
    // marginLeft: wp(4.1),
    marginTop: hp(1.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(10),
    // marginRight: wp(4.1),
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
    alignSelf: 'flex-end',
    marginRight: wp(3.5),
    marginTop: hp(2.7),
    fontFamily: 'Poppins-Medium',
    textAlign: 'right',
  },

  //Donation styles

  MainContainer: {
    flex: 1,
  },
  ShoppingView: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  ShoppingText: {
    color: 'black',
    fontFamily: 'Mark Simonson  Proxima Nova Semibold',
    fontWeight: '600',
    fontSize: hp(2.5),
  },
});

export default Donation;
