import {React, useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
// import leftpage from '../provider/png/leftpage.png';
import leftpage from '../../provider/png/leftpage.png';
import rightpage from '../../provider/png/rightpage.png';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
// import RadioGroup from 'react-native-radio-buttons-group';
import {CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
// import job1 from '../../provider/png/job1.png';
// import job2 from '../../provider/png/job2.png';
import logo1 from '../../provider/png/logo1.png';
import logo2 from '../../provider/png/logo2.png';

import starrating from '../../provider/png/starrating.png';
import downarrow from '../../provider/png/downarrow.png';
// import UnCheckedIcon from 'react-native-vector-icons/AntDesign';

const BussinesDetails = () => {
  const [value, setValue] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [value2, setValue2] = useState(null);
  const [isDropdownVisible2, setDropdownVisible2] = useState(false);

  const [child, setChilds] = useState([{id: 1, value: ''}]);
  const [date, setDate] = useState(new Date());
  // const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [selectedId, setSelectedId] = useState();
  // const [checked, setChecked] = useState(false);

  // const [checkedNo, setCheckedNo] = useState(false);
  const [checkedYes, setCheckedYes] = useState(false);
  const [checkedNo, setCheckedNo] = useState(false);

  const data = {
    Stream: [
      {type: 'Entrepreneur', id: '1'},
      {type: 'Startup', id: '2'},
      {type: 'Service', id: '3'},
      {type: 'Other', id: '4'},
    ],
    BusinessType: [
      {type: 'WholeSale', id: '1'},
      {type: 'Retail', id: '2'},
      {type: 'Other', id: '3'},
      // {type: 'Other', id: '4'},
    ],
    BusinessDetails: [
      {
        id: 1,
        name: 'zama Tech Foundation',
        logo: logo1,
        rating: '5.0',
        role: 'Cosmatics',
        Investment: '50,000',
        Earning: '3,500',
        Benifits: '3 Goods Delivery Free',
      },
      {
        id: 2,
        name: 'Umar ibn Al-Khattab Foundation',
        logo: logo2,
        rating: '4.0',
        role: 'Dairy Products',
        Investment: '80,000',
        Earning: '4,500',
        Benifits: 'Electricity 200 Watts Free',
      },
      {
        id: 3,
        name: 'Uthman ibn Affan  Foundation ',
        logo: logo1,
        rating: '4.0',
        role: 'Grocery',
        Investment: '67,000',
        Earning: '5,100',
        Benifits: 'Low Delivery Charge',
      },
      {
        id: 4,
        name: 'Ali ibn Abi Talib  Foundation ',
        logo: logo2,
        rating: '4.0',
        role: 'Perfume Shop',
        Investment: '90,000',
        Earning: '6,600',
        Benifits: 'Low Maintenance',
      },
    ],
  };

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={{flex: 1, alignSelf: 'center', borderRadius: wp(4.5)}}>
      {/* <View style={{}}> */}
      <Text
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: hp(3),
          marginTop: hp(2),
          fontFamily: 'Poppins-Medium',
        }}>
        Business
      </Text>

      {checkedYes ? (
        <View>
          // Show Business Stream only if it is not selected
          {!value && (
            <>
              <Text
                style={{
                  marginLeft: wp(1),
                  color: '#000000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2),
                  marginTop: hp(3),
                }}>
                Select your Business Stream
              </Text>

              {/* <TouchableOpacity
      style={{
        height: hp(6),
        width: wp(75),
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: wp(2),
        marginTop: hp(1),
        backgroundColor: '#697368',
        elevation: 5,
      }}
      onPress={() => setDropdownVisible(!isDropdownVisible)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: wp(6),
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2.2),
            color: value ? '#000000' : '#FFFFFF',
          }}>
          {value ? value : 'Select Stream'}
        </Text>
        <Image
          source={downarrow}
          style={{ height: hp(3), width: wp(6) }}
          tintColor={value ? '#000000' : '#FFFFFF'}
        />
      </View>
    </TouchableOpacity> */}

              {/* {isDropdownVisible && ( */}
              <FlatList
                data={data.Stream}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{marginTop: hp(1.5)}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#697368',
                      height: hp(5.5),
                      width: wp(75),
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: hp(1),
                      borderRadius: wp(2),
                    }}
                    onPress={() => {
                      setValue(item.type); // Set selected Business Stream
                      setDropdownVisible(false); // Hide dropdown
                    }}>
                    <Text
                      style={{
                        fontSize: hp(2),
                        fontFamily: 'Poppins-Medium',
                        color: '#FFFFFF',
                      }}>
                      {item.type}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              {/* )} */}
            </>
          )}
          // Show Business Type only if Business Stream is selected
          {value && !value2 && (
            <>
              <Text
                style={{
                  marginLeft: wp(1),
                  color: '#000000',
                  fontFamily: 'Poppins-Medium',
                  fontSize: hp(2),
                  marginTop: hp(3),
                }}>
                Select your Business Type
              </Text>

              {/* <TouchableOpacity
      style={{
        height: hp(6),
        width: wp(88),
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: wp(2),
        marginTop: hp(1),
        backgroundColor: '#697368',
        elevation: 5,
      }}
      onPress={() => setDropdownVisible2(!isDropdownVisible2)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: wp(6),
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2.2),
            color: value2 ? '#000000' : '#FFFFFF',
          }}>
          {value2 ? value2 : 'Select Type'}
        </Text>
        <Image
          source={downarrow}
          style={{ height: hp(3), width: wp(6) }}
          tintColor={value2 ? '#000000' : '#FFFFFF'}
        />
      </View>
    </TouchableOpacity> */}

              {/* {isDropdownVisible2 && ( */}
              <FlatList
                data={data.BusinessType}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                style={{marginTop: hp(1.5)}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#697368',
                      height: hp(5.5),
                      width: wp(75),
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: hp(1),
                      borderRadius: wp(2),
                    }}
                    onPress={() => {
                      setValue2(item.type); // Set selected Business Type
                      setDropdownVisible2(false); // Hide dropdown
                    }}>
                    <Text
                      style={{
                        fontSize: hp(2),
                        fontFamily: 'Poppins-Medium',
                        color: '#FFFFFF',
                      }}>
                      {item.type}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              {/* )} */}
            </>
          )}
          {value === 'Startup' && value2 === 'WholeSale' && (
            <View
              style={{
                flex: 1,
                // height: hp(80),

                // height: hp(100),
                // marginLeft: wp(3.5),
                marginTop: hp(3),
                // marginRight: wp(3.5),
                // overflow: 'scroll',
              }}>
              <FlatList
                data={data.BusinessDetails}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      width: wp(78),
                      marginHorizontal: wp(2),

                      paddingVertical: hp(1.5),
                      borderRadius: wp(3),
                      backgroundColor: '#F2DBD5',
                      // elevation: 5,
                      marginBottom: hp(2),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                      }}>
                      <Image
                        source={item.logo}
                        style={{
                          height: hp(3),
                          width: wp(6),

                          marginLeft: wp(3),
                          borderRadius: wp(100),
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          color: '#000',

                          fontSize: hp(1.7),
                          width: wp(50),

                          marginLeft: wp(3),

                          fontFamily: 'Poppins-Medium',
                        }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#000',

                            fontSize: hp(2),

                            marginLeft: wp(2),
                            marginRight: wp(1),

                            fontFamily: 'Poppins-Medium',
                          }}>
                          {item.rating}
                        </Text>

                        <Image
                          source={starrating}
                          style={{
                            height: hp(1.8),
                            width: wp(3.6),
                            marginTop: hp(0.4),
                          }}
                        />
                      </View>
                    </View>

                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#000',
                        fontWeight: '500',
                        fontSize: hp(2),
                        width: wp(60),

                        marginLeft: wp(3),
                        marginTop: hp(0.2),
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Bussiness [{item.role}]
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#000',

                        fontSize: hp(1.7),
                        width: wp(60),

                        marginLeft: wp(3),

                        fontFamily: 'Poppins-Medium',
                      }}>
                      Investment Cost [{item.Investment}]
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#000',

                        fontSize: hp(1.7),
                        width: wp(60),

                        marginLeft: wp(3),

                        fontFamily: 'Poppins-Medium',
                      }}>
                      Earn [{item.Earning}] per/month
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#000',

                        fontSize: hp(1.7),
                        width: wp(60),

                        marginLeft: wp(3),

                        fontFamily: 'Poppins-Medium',
                      }}>
                      Benifits : {item.Benifits}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            // marginLeft: wp(10),
            marginTop: hp(3),
          }}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontFamily: 'Poppins-Medium',
              color: 'Black',
            }}>
            Are you interested in Business?
          </Text>

          <TouchableOpacity
            style={{
              borderColor: '#000000',
              height: hp(5.5),
              width: wp(75),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(2),
              marginTop: hp(2),
              backgroundColor: '#697368',
              // elevation: 5,
            }}
            onPress={() => {
              setCheckedYes(!checkedYes);
              setCheckedNo(false);
            }}>
            <Text
              style={{
                fontSize: hp(2.2),
                fontFamily: 'Poppins-Medium',
                color: checkedYes ? '#FFFFFF' : '#000000',
              }}>
              Yes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderColor: '#000000',
              height: hp(5.5),
              width: wp(75),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(2),
              marginTop: hp(2.5),
              backgroundColor: '#697368',
              // elevation: 5,
            }}
            onPress={() => {
              setCheckedNo(!checkedNo);
              setCheckedYes(false);
            }}>
            <Text
              style={{
                fontSize: hp(2.2),
                fontFamily: 'Poppins-Medium',
                color: checkedNo ? '#FFFFFF' : '#000000',
              }}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  dropdown1: {
    height: hp(6),
    width: wp(88),
    elevation: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    color: 'black',
    // fontSize: hp(2),
    fontFamily: 'Poopins-Medium',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: '#8C8C8C',
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
  },
  iconStyle1: {
    width: hp(3.5),
    height: wp(7),
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 0,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2),
  },
});
export default BussinesDetails;
