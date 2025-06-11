import {React, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import doller from '../provider/png/doller.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {getData, async_keys} from '../api/UserPreference';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import MyDonationDetail from '../Home/MyDonationDetail';

const MyDonation = props => {
  const [userData, setUserData] = useState(null);
  const [apiLoader, setApiLoader] = useState(true);
  const [donationList, setDonationList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await getData(async_keys.user_data);
      setUserData(storedUserData);

      if (storedUserData?.PR_ID) {
        fetchDonations(storedUserData?.PR_ID);
      }
    };

    const fetchDonations = async PR_ID => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getDonationByDonar/${PR_ID}`,
        );

        if (response.data.success) {
          setDonationList(response.data.data);
        } else {
          console.log('Donation fetch failed:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setApiLoader(false);
      }
    };

    fetchUserData();
  }, []);

  // console.log('Donation', donationList);

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
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
                  fontFamily: ' Poppins-SemiBold',
                  fontWeight: '600',
                  fontSize: hp(3),
                }}>
                My Donations
              </Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.donationContainer}>
              {apiLoader ? (
                <FlatList
                  removeClippedSubviews={false}
                  data={Array(5).fill({})}
                  renderItem={() => (
                    <LinearGradient
                      start={{x: 0, y: 0.1}}
                      end={{x: 0.4, y: 1}}
                      colors={['#FFFFFF', '#ffffcc']}
                      style={styles.card}>
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerTitle}
                        autoRun
                      />
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerMessage}
                        autoRun
                      />
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerAddress}
                        autoRun
                      />
                    </LinearGradient>
                  )}
                />
              ) : donationList.length > 0 ? (
                <FlatList
                  removeClippedSubviews={false}
                  data={donationList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    // <TouchableOpacity>
                    <LinearGradient
                      start={{x: 0, y: 0.1}}
                      end={{x: 0.4, y: 1}}
                      colors={['#FFFFFF', '#ffffcc']}
                      style={styles.card}>
                      <Text style={styles.eventName}>
                        {item.event?.ENVT_DESC || 'No Title'}
                      </Text>
                      <Text style={styles.eventMessage}>
                        {item.event?.ENVT_EXCERPT || 'No Description'}
                      </Text>
                      <Text style={styles.eventAddress}>
                        Amount: ₹{item.amount} | Status: {item.status}
                      </Text>
                      <Text style={styles.eventAddress}>
                        Method: {item.method} | Date:{' '}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('MyDonationDetail', {
                            donationList: item,
                          })
                        }
                        style={{alignSelf: 'center'}}>
                        <LinearGradient
                          start={{x: 1, y: 1.7}}
                          end={{x: 0.2, y: 0}}
                          colors={['#F27141', '#F2A950']}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: hp(1),
                            marginTop: hp(2),
                            paddingHorizontal: wp(10),
                            borderRadius: wp(10),
                          }}>
                          <Text
                            style={{
                              fontSize: hp(1.8),
                              marginRight: wp(2.3),
                              fontFamily: 'Poppins-SemiBold',
                              color: '#FFFFFF',
                            }}>
                            Donate again
                          </Text>
                          <Image
                            source={doller}
                            style={{height: hp(2.5), width: wp(5.2)}}
                          />
                        </LinearGradient>
                      </TouchableOpacity>
                    </LinearGradient>
                    // </TouchableOpacity>
                  )}
                />
              ) : (
                <Text
                  style={{
                    marginTop: hp(4),
                    fontSize: hp(2),
                    textAlign: 'center',
                    color: '#555',
                  }}>
                  No donations found.
                </Text>
              )}
            </View>
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  donationContainer: {
    marginTop: hp(1.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(10),
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
    width: wp(75),
    marginLeft: wp(3),
    marginTop: hp(0.8),
    fontFamily: 'Poppins-Medium',
  },
});

export default MyDonation;
