import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  Animated,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import logo1 from '../provider/png/logo1.png';
// import logo2 from '../provider/png/logo2.png';
import leftback from '../provider/png/leftback.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import share from '../provider/png/share.png';
import rightarrow from '../provider/png/rightarrow.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import Swiper from 'react-native-swiper';
import {BASE_URL} from '../api/ApiInfo';
import moment from 'moment';
import PastAnnouncementsEvents from '../Home/PastAnnouncementsEvents';
import {useTranslation} from 'react-i18next';
import RenderHtml from 'react-native-render-html'; // Import RenderHtml

const AnnouncementDetail = ({route, props, navigation}) => {
  const {width} = useWindowDimensions();
  const {event} = route.params || {};
  const [pastEvents, setPastEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [langCode, setLangCode] = useState('en');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollDirection, setScrollDirection] = useState('up');
  const prevScrollY = useRef(0);
  const {t} = useTranslation();

  // Text animation values
  const textOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1], // Show text when scrolling up
    extrapolate: 'clamp',
  });

  // const handleScroll = Animated.event(
  //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
  //   {
  //     useNativeDriver: false,
  //     listener: event => {
  //       const currentScrollY = event.nativeEvent.contentOffset.y;
  //       if (currentScrollY > prevScrollY.current) {
  //         setScrollDirection('down');
  //       } else if (currentScrollY < prevScrollY.current) {
  //         setScrollDirection('up');
  //       }
  //       prevScrollY.current = currentScrollY;
  //     },
  //   },
  // );

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/events`);
  //       const result = await response.json();
  //       console.log('Fetched Past Eventswww:', result.events);

  //       if (Array.isArray(result.events) && result.events.length > 0) {
  //         const currentDate = new Date();

  //         const formattedData = result.events
  //           .filter(item => {
  //             // Only include events where EventsToDate is in the past
  //             const eventEndDate = new Date(item.EVNT_UPTO_DT);
  //             return eventEndDate < currentDate;
  //           })
  //           .map(item => ({
  //             id: item.ENVT_ID,
  //             eventCategoryID: item.ENVT_CATE_ID,
  //             name: item.ENVT_DESC,
  //             message: item.ENVT_EXCERPT,
  //             Detail: item.ENVT_DETAIL,
  //             headerImage: {uri: item.ENVT_BANNER_IMAGE},
  //             EventsImage: {uri: item.ENVT_GALLERY_IMAGES},
  //             EventContact: item.ENVT_CONTACT_NO,
  //             EventFromDate: item.EVNT_FROM_DT,
  //             EventsToDate: item.EVNT_UPTO_DT,
  //             address: item.ENVT_ADDRESS,
  //             city: item.ENVT_CITY,
  //             createdEventDate: item.EVET_CREATED_DT,
  //             cate_desc: item?.SubCategory?.CATE_DESC || '',
  //           }));
  //         setPastEvents(formattedData);
  //         console.log('Events information', formattedData);
  //       } else {
  //         console.warn(t('AnnouncementDetail.No valid events data found.'));
  //       }
  //     } catch (error) {
  //       console.error(t('AnnouncementDetail.Error fetching Events:'), error);
  //     } finally {
  //       setApiLoader(false);
  //     }
  //   };

  //   fetchEvents();
  // }, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        setScrollDirection(
          currentScrollY > prevScrollY.current ? 'down' : 'up',
        );
        prevScrollY.current = currentScrollY;
      },
    },
  );

  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLangCode = await getData(async_keys.language_code);
        if (savedLangCode) {
          setLangCode(savedLangCode);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguagePreference();
  }, []);

  const fetchPastEvents = async () => {
    try {
      setRefreshing(true);
      setApiLoader(true);
      const response = await fetch(`${BASE_URL}/events?lang_code=${langCode}`);
      const result = await response.json();

      if (Array.isArray(result.events)) {
        const currentDate = new Date();
        const formattedData = result.events
          .filter(item => {
            // Only include events where EventsToDate is in the past
            const eventEndDate = new Date(item.EVNT_UPTO_DT);
            return eventEndDate < currentDate && item.ENVT_CATE_ID === 2;
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
        setPastEvents(formattedData);
      } else {
        console.warn(t('AnnouncementDetail.No valid events data found.'));
      }
    } catch (error) {
      console.error(t('AnnouncementDetail.Error fetching Events:'), error);
    } finally {
      setRefreshing(false);
      setApiLoader(false);
    }
  };

  useEffect(() => {
    fetchPastEvents();
  }, [langCode]);

  const onRefresh = () => {
    fetchPastEvents();
  };

  const tagsStyles = {
    p: {
      color: '#000',
      fontSize: hp(1.7),
      marginTop: hp(1.2), // Top spacing
      marginBottom: hp(1.2),
      fontWeight: '500',
      letterSpacing: hp(0.1),

      // marginTop: hp(0.1),
      width: wp(86),
      marginLeft: wp(2),
      fontFamily: 'Poppins-Medium',
      // maxHeight: hp(5), // Adjust this value based on your font size and line height
      // overflow: 'hidden',
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
      <Animated.View
        style={[
          styles.floatingTextContainer,
          {
            opacity: scrollDirection === 'up' ? textOpacity : 0,
          },
        ]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.leftButton}>
            <Image
              source={leftback}
              style={styles.leftButtonImage}
              tintColor="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>{event.name}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
        //   {useNativeDriver: false},
        // )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#BDD9F2', '#F0F2F2']}
            style={{flex: 1, paddingBottom: hp(10)}}>
            <ImageBackground
              source={event.headerImage} // Replace with your image source
              style={{height: hp(25), width: wp(100)}}></ImageBackground>
            <View
              style={{
                marginHorizontal: wp(4.5),
              }}>
              <Text
                style={{
                  color: '#386641',
                  fontWeight: '500',
                  fontSize: hp(2.3),
                  width: wp(80),
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {event.name}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <View
                    style={{
                      backgroundColor: '#C9CBA3',
                      borderRadius: wp(5),
                      marginTop: hp(0.5),
                      width: wp(90),
                      elevation: 5,
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingVertical: wp(2),
                        color: '#152340',
                        fontSize: hp(1.7),
                        width: wp(90),
                        // marginTop: hp(1),
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {event.message}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: '#F2F0CE',
                      elevation: 5,
                      borderRadius: wp(5),
                      marginTop: hp(1.2),
                      width: wp(90),
                    }}>
                    {/* <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingVertical: wp(2),

                        color: '#000',
                        fontWeight: '500',
                        fontSize: hp(1.7),
                        width: wp(90),
                        textAlign: 'left',

                        fontFamily: 'Poppins-Medium',
                      }}>
                      {event.Detail}
                    </Text> */}
                    <RenderHtml
                      contentWidth={width}
                      source={{html: event.Detail}}
                      tagsStyles={tagsStyles}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: '#D7D9C7',
                      elevation: 5,
                      borderRadius: wp(5),
                      marginTop: hp(1.2),
                      width: wp(90),
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingTop: wp(2),

                        color: '#000',
                        fontWeight: '600',
                        fontSize: hp(1.6),
                        width: wp(90),
                        textAlign: 'left',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {t('AnnouncementDetail.Event Date')} :{' '}
                      {event.EventFromDate ? event.EventFromDate : '-'}
                      {event.EventsToDate ? ` / ${event.EventsToDate}` : ''}
                    </Text>

                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingTop: wp(2),

                        color: '#000',
                        fontWeight: '600',
                        fontSize: hp(1.6),
                        width: wp(90),
                        textAlign: 'left',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {t('AnnouncementDetail.Further Contact')} :{' '}
                      {event.EventContact ? event.EventContact : '-'}
                    </Text>
                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingTop: wp(2),

                        color: '#000',
                        fontWeight: '600',
                        fontSize: hp(1.6),
                        width: wp(90),
                        textAlign: 'left',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {t('AnnouncementDetail.Location')} : {event.address}
                    </Text>
                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingTop: wp(2),
                        color: '#000',
                        fontWeight: '600',
                        fontSize: hp(1.6),
                        width: wp(90),
                        textAlign: 'left',

                        fontFamily: 'Poppins-Medium',
                      }}>
                      {t('AnnouncementDetail.City:')} {event.city}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: hp(2), marginHorizontal: wp(2)}}>
              <Swiper
                style={{height: hp(30)}}
                showsButtons={false}
                autoplay={false}
                showsPagination={true}
                paginationStyle={{position: 'absolute', top: 0, height: hp(57)}}
                dot={
                  <View
                    style={{
                      backgroundColor: '#7C8C42',
                      width: 7,
                      height: 7,
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
                      backgroundColor: '#1F260F',
                      width: 18,
                      height: 7,
                      borderRadius: 6,
                      marginLeft: 2,
                      marginRight: 2,
                      marginTop: 2,
                      marginBottom: 2,
                    }}
                  />
                }>
                {event.EventsImage?.uri &&
                  event.EventsImage.uri.split(', ').map((image, index) => (
                    <Image
                      key={index}
                      source={{uri: image.trim()}}
                      style={{
                        height: hp(25),
                        width: wp(90),
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: wp(8),
                        marginTop: hp(1),
                        resizeMode: 'cover',
                      }}
                    />
                  ))}
              </Swiper>
            </View>

            {/* PastEvents */}

            {pastEvents.filter(event => event.eventCategoryID === 2).length >
            0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: wp(6),
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2.2),
                      fontFamily: 'Poppins-Medium',
                      color: '#1F260F',
                    }}>
                    {t('AnnouncementDetail.Past Events')}
                  </Text>

                  <Text
                    onPress={() =>
                      navigation.navigate('PastAnnouncementsEvents')
                    }
                    style={{
                      fontSize: hp(2.2),
                      fontFamily: 'Poppins-Medium',
                      color: '#1F260F',
                    }}>
                    {t('AnnouncementDetail.more')}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: hp(1.5),
                    alignItems: 'center',
                    marginHorizontal: wp(4),
                  }}>
                  {pastEvents.length > 0 ? (
                    <FlatList
                      removeClippedSubviews={false}
                      data={[...pastEvents]
                        .sort(
                          (a, b) =>
                            new Date(b.EventsToDate) - new Date(a.EventsToDate),
                        )
                        .filter(event => event.eventCategoryID === 2)
                        .reverse()
                        .slice(0, 5)}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      pagingEnabled={true}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('PastEventsDetails', {
                              pastEvent: item,
                            })
                          }
                          style={{
                            marginHorizontal: wp(1.5),
                            // marginLeft: wp(1),
                            // marginRight: wp(1),
                            width: wp(89),
                            paddingBottom: hp(1),
                            borderRadius: wp(3),
                            backgroundColor: '#D9CAAD',
                            elevation: 5,
                            marginBottom: hp(2),
                          }}>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: '500',
                              fontSize: hp(1.8),
                              width: wp(78),
                              // borderWidth: wp(.1),
                              marginLeft: wp(3),
                              marginTop: hp(0.6),
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {moment(item.EventsToDate).format('DD MMM YYYY')}
                          </Text>
                          <Text
                            numberOfLines={2}
                            style={{
                              // borderWidth: wp(.1),
                              color: '#73524e',
                              fontWeight: '500',
                              fontSize: hp(2.2),
                              width: wp(78),
                              marginLeft: wp(3),
                              marginTop: hp(1),
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {item.name}
                          </Text>

                          <Text
                            style={{
                              color: '#040c1b',
                              fontWeight: '500',
                              fontSize: hp(1.6),
                              width: wp(78),

                              marginLeft: wp(3),

                              marginTop: hp(1.6),
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {item.message}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <Text
                      style={{
                        color: '#73524e',
                        fontSize: hp(2),
                        fontFamily: 'Poppins-Medium',
                        alignSelf: 'center',
                      }}>
                      {t('AnnouncementDetail.No past events available.')}
                    </Text>
                  )}
                </View>
              </>
            ) : null}
          </LinearGradient>
        </KeyboardAwareScrollView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  floatingTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,1)',
    padding: 20,
  },
  floatingText: {
    fontSize: hp(2),
    color: '#000',
    fontFamily: 'Poppins-Medium',
  },

  MainContainer: {
    flex: 1,
  },
  imageBackground: {
    width: wp(100),
    position: 'relative',
  },
  imageContainer: {
    width: wp(100),
    // borderRadius: wp(100),
    position: 'absolute',
    // borderBottomLeftRadius: wp(90),
    top: 0,
    zIndex: 100,
  },
  imageBackground: {
    flex: 1,
    // height: hp(27),
    width: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    paddingHorizontal: 10,
  },

  leftButton: {
    zIndex: 2, // Ensures it's above the title if overlapping
  },

  leftButtonImage: {
    width: 30,
    height: 30,

    resizeMode: 'contain',
  },

  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,

    alignItems: 'center',
    justifyContent: 'center',
    // width: wp(100),
    // width: wp(60),
    marginHorizontal: wp(10),
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // alignContent: 'center',
  },

  titleText: {
    fontSize: hp(2.3),
    color: '#FFFFFF',
    justifyContent: 'center',
    textAlign: 'center',
    // width: wp(60),
    fontWeight: '500',

    // fontFamily: 'Poppins-SemiBold',
  },
  rightButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    aspectRatio: 1 / 1,
    borderRadius: wp(100),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonImage: {
    height: hp(3),
    width: wp(6),
  },
});

export default AnnouncementDetail;
