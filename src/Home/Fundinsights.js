import {React, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import leftback from '../provider/png/leftback.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PieChart from 'react-native-pie-chart';
import {BASE_URL} from '../api/ApiInfo';
import {getData, async_keys, clearData, storeData} from '../api/UserPreference';

import {
  LineChart,
  BarChart,
  // PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from 'react-native-chart-kit';

import {Dimensions} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import BackgroundImage from '../provider/png/BackgroundImage.png';

const Fundinsights = props => {
  const [stats, setStats] = useState('');
  const [apiLoader, setApiLoader] = useState(true);
  // const routeStats = props.route.params;
  const widthAndHeight = 250;

  const sexRatio = [
    {
      value: parseInt(stats?.percentageDistribution?.male),
      color: '#fbd203',
      text: 'Male',
    },
    {
      value: parseInt(stats?.percentageDistribution?.female),
      color: '#ffb300',
      text: 'Female',
    },
    {
      value: parseInt(stats?.percentageDistribution?.child),
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

  // const Population = [
  //   {
  //     value: 300,
  //     color: '#fbd203',
  //     text: 'Male',
  //     // label: { text: 'Male', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
  //   },
  //   {
  //     value: 100,
  //     color: '#ffb300',
  //     text: 'Female',
  //     //  label: { text: 'Female', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
  //   },
  //   {
  //     value: 100,
  //     color: '#ff9100',
  //     text: 'Family having 2 Children',
  //     //  label: { text: 'Childrens', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
  //   },
  //   {
  //     value: 100,
  //     color: '#ff6c00',
  //     text: 'Family having more than 2 Childrens',
  //     // label: { text: 'Others', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
  //   },

  //   {
  //     value: 90,
  //     color: '#BF0426',
  //     text: 'Others',
  //     // label: { text: 'Others', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }
  //   },
  //   // { value: 360, color: '#ff6c00',  label: { text: 'Others', fontFamily: "Poppins-Medium", fontSize: hp(1.2) }  },
  // ];

  // const totalPopulation = Population.reduce(
  //   (total, item) => total + item.value,
  //   0,
  // );

  const screenWidth = Dimensions.get('window').width;
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(242, 113, 65, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: '#152340',
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,

    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getStats`);
      const result = await response.json();
      console.log('Fetched Stats:', result);

      setStats(result);
    } catch (error) {
      console.error('Error fetching Stats:', error);
    } finally {
      setApiLoader(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  console.log('Statistic Fund ', stats);

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85}}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          // colors={['#152340', '#FFFFFF']}
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
                App Insights
              </Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{marginBottom: hp(7), marginTop: hp(1)}}>
              <LinearGradient
                start={{x: 1, y: 1.7}}
                end={{x: 0.2, y: 0}}
                colors={['#697368', '#FFFFFF']}
                style={{
                  marginHorizontal: wp(5),
                  borderRadius: wp(5),
                  marginVertical: hp(2),
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: hp(3),
                  }}>
                  <PieChart widthAndHeight={widthAndHeight} series={sexRatio} />

                  <Text
                    style={{
                      fontSize: hp(3),
                      fontFamily: 'Poppins-Medium',
                      marginTop: hp(2),
                    }}>
                    Gender Ratio
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: wp(7),
                    marginVertical: hp(1),
                  }}>
                  {sexRatio.map((item, index) => {
                    const percentage = (
                      (item.value / totalRatio) *
                      100
                    ).toFixed(1);
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: hp(1.5),
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: hp(2),
                            width: wp(4),
                            backgroundColor: item.color,
                          }}></View>

                        {/* <Text style={{marginLeft: wp(2.2), fontSize: hp(1.8), fontFamily: "Poppins-Regular"}}>{item.label.text}</Text> */}
                        <Text
                          style={{
                            marginLeft: wp(2.2),
                            fontSize: hp(1.8),
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
                colors={['#697368', '#FFFFFF']}
                style={{
                  marginHorizontal: wp(5),
                  borderRadius: wp(5),
                  marginVertical: hp(2),
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: hp(3),
                  }}>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={donations}
                    cover={{radius: 0.6}}
                    padAngle={0.01}
                    style={{backgroundColor: '#FFFFFF', borderRadius: wp(30)}}
                  />
                  <Text
                    style={{
                      fontSize: hp(3),
                      fontFamily: 'Poppins-Medium',
                      marginTop: hp(2),
                    }}>
                    Fund Investment
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: wp(7),
                    marginTop: hp(1),
                  }}>
                  {donations.map((item, index) => {
                    const percentage = (
                      (item.value / totaldonation) *
                      100
                    ).toFixed(1);

                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: hp(1.5),
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: hp(2),
                            width: wp(4),
                            backgroundColor: item.color,
                          }}></View>

                        <Text
                          style={{
                            marginLeft: wp(2.2),
                            fontSize: hp(1.8),
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
                colors={['#697368', '#FFFFFF']}
                style={{
                  marginHorizontal: wp(5),
                  borderRadius: wp(5),
                  elevation: 5,
                  marginVertical: hp(2),
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: hp(3),
                  }}>
                  <PieChart
                    widthAndHeight={widthAndHeight}
                    series={Population}
                    cover={{radius: 0.6, color: '#F2F0CE'}}
                    style={{backgroundColor: '#FFFFFF', borderRadius: wp(30)}}
                  />
                  <Text
                    style={{
                      fontSize: hp(3),
                      fontFamily: 'Poppins-Medium',
                      marginTop: hp(2),
                    }}>
                    Population Registry
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: wp(7),
                    marginTop: hp(1),
                  }}>
                  {Population.map((item, index) => {
                    const percentage = (
                      (item.value / totalPopulation) *
                      100
                    ).toFixed(1);

                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: hp(1.5),
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: hp(2),
                            width: wp(4),
                            backgroundColor: item.color,
                          }}></View>

                        <Text
                          style={{
                            marginLeft: wp(2.2),
                            fontSize: hp(1.8),
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

              <View
                style={{
                  marginHorizontal: wp(10),
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: hp(5),
                }}>
                <LineChart
                  data={data}
                  width={screenWidth - 40}
                  height={250}
                  // width={390}
                  style={{
                    borderRadius: 16, // This adds smooth corners inside the chart
                  }}
                  chartConfig={chartConfig}
                />
              </View>

              <View
                style={{
                  marginHorizontal: wp(10),
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: hp(5),
                }}>
                <LineChart
                  data={data}
                  width={screenWidth - 40}
                  height={257}
                  verticalLabelRotation={30}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    borderRadius: 16, // This adds smooth corners inside the chart
                  }}
                />

                <View
                  style={{
                    marginHorizontal: wp(10),
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: hp(5),
                  }}>
                  <BarChart
                    // style={graphStyle}
                    data={data}
                    width={screenWidth - 40}
                    height={257}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    style={{
                      borderRadius: 16, // This adds smooth corners inside the chart
                    }}
                  />
                </View>
              </View>
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
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default Fundinsights;
