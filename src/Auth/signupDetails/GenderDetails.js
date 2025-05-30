import {React, useState, useRef, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import leftback from '../../provider/png/leftback.png';
import name from '../../provider/png/name.png';
import dob from '../../provider/png/dob.png';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import Male from '../../provider/png/Male.png';
import Female from '../../provider/png/Female.png';
import Others from '../../provider/png/Others.png';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';

const GenderDetails = ({pageName = 'signup'}) => {
  const {
    gender,
    setGender,
    isNavigating,
    setIsNavigating,
    currentPage,
    setCurrentPage,
    scrollViewRef,
  } = useContext(SignupDataContext) || {};

  const {GENDER, setGENDER} = useContext(ProfileDataContext) || {};

  const [localGender, setLocalGender] = useState(gender || GENDER || '');

  useEffect(() => {
    if (gender) {
      setLocalGender(gender);
    } else if (GENDER) {
      setLocalGender(GENDER);
    }
  }, [gender, GENDER]);

  const handleNext = () => {
    if (setCurrentPage) {
      setCurrentPage(2);
      if (scrollViewRef?.current) {
        scrollViewRef.current.scrollTo({
          x: wp(200),
          animated: true,
        });
      }
    }
  };

  const handleGenderChange = value => {
    setLocalGender(value);

    if (setGender) setGender(value);
    if (setGENDER) setGENDER(value);
    handleNext();
  };

  const data = {
    Gender: [
      {text: 'Male', id: 'M', icon: Male},
      {text: 'Female', id: 'F', icon: Female},
      // {text: 'Other', id: 'O', icon: Others},
    ],
  };

  useEffect(() => {
    if (isNavigating) {
      console.log('Navigating to UserDetails screen...');
    }
  }, [isNavigating]);

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),

        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      <View
        style={{
          width: wp(83),
          marginTop: hp(2),
        }}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Gender Details
        </Text>

        <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          Choose Your Gender
        </Text>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            // flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {data.Gender.map(item => {
              const isSelected = localGender === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleGenderChange(item.id)}
                  style={{
                    backgroundColor: isSelected ? '#0468BF' : '#697368',
                    height: hp(8),
                    width: wp(38),
                    margin: wp(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: wp(2),
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={item.icon}
                    style={{
                      height: hp(3.2),
                      width: wp(6.4),
                      marginRight: wp(2),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: 'Poppins-Medium',
                      color: '#FFFFFF',
                    }}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default GenderDetails;
