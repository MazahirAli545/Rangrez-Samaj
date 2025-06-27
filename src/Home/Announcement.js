import {React, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import Footer from '../components/Footer';
import cards1 from '../provider/png/freepik__upload__61310.png';
import cards2 from '../provider/png/freepik__expand__56022.png';
import cards3 from '../provider/png/freepik__expand__99250.png';
import job1 from '../provider/png/job1.png';
import job2 from '../provider/png/job2.png';
import logo1 from '../provider/png/logo1.png';
import logo2 from '../provider/png/logo2.png';
// import job3 from '../provider/png/job3.png';
import starrating from '../provider/png/starrating.png';
import AnnouncementDetail from './AnnouncementDetail';
// import { BackgroundImage } from 'react-native-elements/dist/config';
import exam1 from '../provider/png/exm1.png';
import exam2 from '../provider/png/exam2.png';
import exam3 from '../provider/png/exam3.png';

import govt1 from '../provider/png/govt1.png';
import govt2 from '../provider/png/govt2.png';
import govt3 from '../provider/png/govt3.png';

import BackgroundImage from '../provider/png/BackgroundImage.png';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import announcementlogo from '../provider/png/announcementlogo.png';
import {getData, async_keys, clearData, storeData} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import {BASE_URL} from '../api/ApiInfo';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import RenderHtml from 'react-native-render-html'; // Import RenderHtml

const Announcement = props => {
  const {width} = useWindowDimensions();

  const [events, setEvents] = useState([]);
  const [apiLoader, setApiLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [langCode, setLangCode] = useState('en');
  const {t} = useTranslation();

  const isEventActive = eventToDate => {
    const today = new Date();
    const eventDate = new Date(eventToDate);
    return eventDate >= today;
  };

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/events`);
  //       const result = await response.json();
  //       console.log('Fetched Events:', result.events);

  //       if (Array.isArray(result.events) && result.events.length > 0) {
  //         const formattedData = result.events.map(item => ({
  //           id: item.ENVT_ID,
  //           eventCategoryID: item.ENVT_CATE_ID,
  //           name: item.ENVT_DESC,
  //           message: item.ENVT_EXCERPT,
  //           Detail: item.ENVT_DETAIL,
  //           headerImage: {uri: item.ENVT_BANNER_IMAGE},
  //           EventsImage: {uri: item.ENVT_GALLERY_IMAGES},
  //           EventContact: item.ENVT_CONTACT_NO,
  //           EventFromDate: item.EVNT_FROM_DT,
  //           EventsToDate: item.EVNT_UPTO_DT,
  //           address: item.ENVT_ADDRESS,
  //           city: item.ENVT_CITY,
  //           createdEventDate: item.EVET_CREATED_DT,
  //           cate_desc: item?.SubCategory?.CATE_DESC || '',
  //         }));
  //         setEvents(formattedData);
  //         console.log('Events information', formattedData);
  //       } else {
  //         console.warn('No valid events data found.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching Events:', error);
  //     } finally {
  //       setApiLoader(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLangCode = await getData(async_keys.language_code);
        if (savedLangCode) {
          setLangCode(savedLangCode);
        }
      } catch (error) {
        console.error(
          t('Announcement.Error loading language preference:'),
          error,
        );
      }
    };

    loadLanguagePreference();
  }, []);

  const handleRefresh = async () => {
    setRefresh(true);
    await fetchEvents();
    setRefresh(false);
  };

  const fetchEvents = async () => {
    try {
      console.log('Fetching announcements with lang_code:', langCode);
      const response = await fetch(`${BASE_URL}/events?lang_code=${langCode}`);
      const result = await response.json();
      console.log('Fetched Events:', result.events);

      if (Array.isArray(result.events)) {
        // Filter events that have content in selected language and are announcements
        const formattedData = result.events
          .filter(item => {
            // Check if essential fields have content
            const hasContent =
              item.ENVT_DESC &&
              item.ENVT_DESC.trim() !== '' &&
              item.ENVT_EXCERPT &&
              item.ENVT_EXCERPT.trim() !== '';

            // Only include announcement events (category ID 2)
            return hasContent && item.ENVT_CATE_ID === 2;
          })
          .map(item => ({
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

        if (formattedData.length > 0) {
          setEvents(formattedData);
          console.log('Announcements information', formattedData);
        } else {
          console.warn(
            t(
              'Announcement.No announcements with content in selected language.',
            ),
          );
          setEvents([]);
        }
      } else {
        console.warn(t('Announcement.No valid events data found.'));
        setEvents([]);
      }
    } catch (error) {
      console.error(t('Announcement.Error fetching Events:'), error);
      setEvents([]);
    } finally {
      setApiLoader(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [langCode]);

  const tagsStyles = {
    p: {
      color: '#000',
      letterSpacing: hp(0.1),
      fontSize: hp(1.8),
      marginTop: hp(0.1),
      width: wp(71),
      marginLeft: wp(2),
      fontFamily: 'Poppins-Medium',
      maxHeight: hp(5), // Adjust this value based on your font size and line height
      overflow: 'hidden',
    },
    strong: {
      fontWeight: '500',
      fontFamily: 'Poppins-Medium',
    },
    // Add other HTML tag styles as needed for your content
    h1: {
      fontSize: hp(2),
      fontWeight: 'bold',
      color: '#000',
      fontFamily: 'Poppins-SemiBold',
    },
    ul: {
      marginLeft: wp(5),
    },
    li: {
      color: '#000',
      fontSize: hp(1.7),
      fontFamily: 'Poppins-Regular',
    },
  };

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
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#BDD9F2', '#F0F2F2']}
            style={{flex: 1, paddingBottom: hp(14)}}>
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
                  {t('Announcement.Announcements')}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginLeft: wp(3),
                marginTop: hp(1.5),
                marginBottom: hp(10),
                marginRight: wp(3),
              }}>
              {apiLoader ? ( // Show shimmer if loading
                <FlatList
                  removeClippedSubviews={false}
                  data={Array(5).fill({})} // Temporary placeholder data
                  horizontal={false}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={() => (
                    <View
                      style={{
                        // marginLeft: wp(4),
                        // marginRight: wp(6.2),
                        marginHorizontal: wp(2),
                        width: wp(90),
                        // borderWidth: wp(1),
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
                      removeClippedSubviews={false}
                      data={[...events]
                        .filter(
                          event =>
                            event.eventCategoryID === 2 &&
                            isEventActive(event.EventsToDate),
                        )
                        .reverse()}
                      horizontal={false}
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
                          {item.cate_desc !== '' && (
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
                          )}
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
                                // borderRadius: wp(100),
                              }}
                            />
                            <Text
                              numberOfLines={1}
                              style={{
                                color: '#000',
                                fontSize: hp(2),
                                width: wp(73),
                                fontWeight: '500',
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
                              fontFamily: 'Poppins-Regular',
                              fontWeight: '500',
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
                              <Text
                                style={{
                                  fontWeight: '500',

                                  fontFamily: 'Poppins-Medium',
                                }}>
                                {t('Announcement.DATE')} :{' '}
                              </Text>
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
                              <Text
                                style={{
                                  fontWeight: '500',

                                  fontFamily: 'Poppins-Medium',
                                }}>
                                {t('Announcement.LOCATION')} :
                              </Text>{' '}
                              {item.address}
                              {item.city ? ` , ${item.city}` : ''}
                            </Text>
                          ) : null}

                          {item.Detail ? (
                            <View
                              style={{
                                width: wp(82), // Set width to restrict rendering area
                                marginLeft: wp(3),
                                marginTop: hp(0.2),
                                flexDirection: 'row',
                                // alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: hp(1.7),
                                  fontFamily: 'Poppins-Medium',
                                  fontWeight: '500',
                                  marginTop: hp(1),
                                }}>
                                {t('HomeScreen.NOTE')} :
                              </Text>
                              <RenderHtml
                                contentWidth={width}
                                source={{html: item.Detail}}
                                tagsStyles={tagsStyles}
                              />
                            </View>
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
          </LinearGradient>
        </KeyboardAwareScrollView>
      </ImageBackground>
      <View
        style={{
          position: 'absolute',
          bottom: hp(4),
          alignSelf: 'center',
          borderRadius: wp(10),
        }}>
        <Footer title="Announcement" />
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
  MainContainer: {
    flex: 1,
  },
});

export default Announcement;
