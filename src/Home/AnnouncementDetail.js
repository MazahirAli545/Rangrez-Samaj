import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
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

const AnnouncementDetail = ({route, props, navigation}) => {
  const {event} = route.params || {};

  const scrollY = useRef(new Animated.Value(0)).current;

  // Animated image properties
  const imageHeight = scrollY.interpolate({
    inputRange: [0, 150], // Scroll distance
    outputRange: [hp(27), hp(15)], // Image height range
    extrapolate: 'clamp', // Prevent values outside range
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 3], // Fade image as it shrinks
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.MainContainer}>
      <Animated.View
        style={[
          styles.imageContainer,
          {height: imageHeight, opacity: imageOpacity},
        ]}>
        <ImageBackground
          source={event.headerImage} // Replace with your image source
          style={styles.imageBackground}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.leftButton}>
              <Image
                source={leftback}
                style={styles.leftButtonImage}
                tintColor="#000000"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightButton}>
              <Image source={share} style={styles.rightButtonImage} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
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
            <View
              style={{
                marginHorizontal: wp(4.5),
                //  marginTop: hp(27)
                // backgroundColor: '#000000',
                marginTop: hp(21.5),
              }}>
              <Text
                style={{
                  color: '#386641',
                  fontWeight: '500',
                  fontSize: hp(2.3),
                  width: wp(80),
                  // borderWidth: wp(0.1),

                  marginTop: hp(6),
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
                    <Text
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
                    </Text>
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
                      Event Date :{' '}
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
                      Further Contact :{' '}
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
                      Location : {event.address}
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
                      City: {event.city}
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

            {/* <Text
              style={{
                marginLeft: wp(6),
                fontSize: hp(2.2),
                fontFamily: 'Poppins-Medium',
                color: '#1F260F',
              }}>
              Past Events
            </Text>

            <View style={{marginTop: hp(1.5), alignItems: 'center'}}>
              {pastEvents.length > 0 ? (
                <FlatList
                  data={pastEvents}
                  horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('DonationDetail', {
                          event: item,
                        })
                      }
                      style={{
                        marginHorizontal: wp(2),
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
                        {moment(item.createdEventDate).format('DD MMM YYYY')}
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
                  No past events available.
                </Text>
              )}
            </View> */}
          </LinearGradient>
        </KeyboardAwareScrollView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    marginTop: hp(2),
    // marginTop: hp(6),
    paddingHorizontal: hp(2.3),
  },
  leftButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    aspectRatio: 1 / 1,
    borderRadius: wp(100),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButtonImage: {
    height: hp(4.5),
    width: wp(10),
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
