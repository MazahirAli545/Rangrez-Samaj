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
import back from '../../provider/png/back.png';
// import UnCheckedIcon from 'react-native-vector-icons/AntDesign';

const FamilyBussiness = props => {
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

  const [step, setStep] = useState(0);

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
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),
        // marginBottom: hp(10),
        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      <View style={{width: wp(83), marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Business
        </Text>

        {step === 0 ? (
          <View style={{marginBottom: hp(10)}}>
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
                backgroundColor: checkedYes ? '#0468BF' : '#697368',
              }}
              onPress={() => {
                setCheckedYes(true);
                setCheckedNo(false);
                setStep(1); // Move to Business Stream
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
                backgroundColor: checkedNo ? '#0468BF' : '#697368',
              }}
              onPress={() => {
                setCheckedNo(true);
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
        ) : step === 1 ? (
          <View style={{marginBottom: hp(10)}}>
            <TouchableOpacity
              style={{position: 'absolute'}}
              onPress={() => setStep(0)}>
              <Image source={back} style={{height: hp(3), width: wp(6)}} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: wp(1),
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(4.5),
              }}>
              Select your Business Stream
            </Text>
            <FlatList
              removeClippedSubviews={false}
              data={data.Stream}
              horizontal={false}
              keyExtractor={item => item.id}
              style={{marginTop: hp(1.5)}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    // backgroundColor: '#697368',
                    backgroundColor:
                      value === item.type ? '#0468BF' : '#697368',
                    height: hp(5.5),
                    width: wp(81),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: hp(1),
                    borderRadius: wp(2),
                  }}
                  onPress={() => {
                    setValue(item.type);
                    setStep(2); // Move to Business Type
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
          </View>
        ) : step === 2 ? (
          <View style={{marginBottom: hp(10)}}>
            <TouchableOpacity
              style={{position: 'absolute'}}
              onPress={() => setStep(1)}>
              <Image source={back} style={{height: hp(3), width: wp(6)}} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: wp(1),
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(4.5),
              }}>
              Select your Business Type
            </Text>
            <FlatList
              removeClippedSubviews={false}
              data={data.BusinessType}
              horizontal={false}
              keyExtractor={item => item.id}
              style={{marginTop: hp(1.5)}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      value2 === item.type ? '#0468BF' : '#697368',
                    height: hp(5.5),
                    width: wp(81),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: hp(1),
                    borderRadius: wp(2),
                  }}
                  onPress={() => {
                    setValue2(item.type);
                    setStep(3); // Move to Business Details
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
          </View>
        ) : (
          <View style={{marginBottom: hp(10)}}>
            <TouchableOpacity
              style={{position: 'absolute'}}
              onPress={() => setStep(2)}>
              <Image source={back} style={{height: hp(3), width: wp(6)}} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: wp(1),
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(4.5),
              }}>
              Business Details
            </Text>
            {value === 'Startup' && value2 === 'WholeSale' && (
              <FlatList
                removeClippedSubviews={false}
                data={data.BusinessDetails}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F2DBD5',
                      borderRadius: wp(3),
                      paddingVertical: hp(1.5),
                      marginBottom: hp(2),
                      width: wp(78),
                      marginHorizontal: wp(2),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        fontSize: hp(2),
                        marginLeft: wp(3),
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Business [{item.role}]
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#000',
                        fontSize: hp(1.7),
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
                        marginLeft: wp(3),
                        fontFamily: 'Poppins-Medium',
                      }}>
                      Benefits : {item.Benifits}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
      </View>
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
export default FamilyBussiness;
