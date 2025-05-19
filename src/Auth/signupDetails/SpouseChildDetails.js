import {React, useEffect, useState, useRef, useContext} from 'react';
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
import spouse from '../../provider/png/spouse.png';
import childrenw from '../../provider/png/children.png';

import Primaryicon from '../../provider/png/Primaryicon.png';
import Secondryicon from '../../provider/png/Secondryicon.png';
import Highericon from '../../provider/png/Highericon.png';
import noeducation from '../../provider/png/noeducation.png';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';

const SpouseChildDetails = ({pageName = 'signup'}) => {
  const {
    spousename,
    setSpouseName,
    children,
    setChildren,
    isNavigating,
    setIsNavigating,
    errorMessageRegister,
    setErrorMessageRegister,
    isAttempted,
  } = useContext(SignupDataContext) || {};

  const {SPOUSENAME, setSPOUSENAME, CHILDREN, setCHILDREN} =
    useContext(ProfileDataContext) || {};

  useEffect(() => {
    if (isNavigating) {
      console.log('Navigating to UserDetails screen...');
    }
  }, [isNavigating]);

  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [child, setChilds] = useState([{id: 1, name: '', dob: null}]);
  const [selectedSpouse, setSelectedSpouse] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [errors, setErrors] = useState({});

  const [localChildren, setLocalChildren] = useState([
    {id: 1, name: '', dob: ''},
  ]);

  const getOrdinal = n => {
    const ordinals = [
      'First',
      'Second',
      'Third',
      'Fourth',
      'Fifth',
      'Sixth',
      'Seventh',
      'Eighth',
      'Ninth',
      'Tenth',
    ];
    return ordinals[n - 1] || `${n}th`;
  };

  useEffect(() => {
    setChildren(localChildren);
  }, [localChildren]);

  const openDatePicker = id => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          const updatedFields = localChildren.map(child => {
            if (child.id === id) {
              const formatted = formatDate(selectedDate);
              console.log(formatted, 'localChildren1');
              return {
                ...child,
                dob: selectedDate, // still store Date object, not formatted string
              };
            }
            return child;
          });
          console.log(updatedFields, 'localChildren2');
          setLocalChildren(updatedFields);
          setChildren(updatedFields);
          setErrors(prevErrors => {
            const updatedErrors = {...prevErrors};
            delete updatedErrors[`dob_${id}`];
            return updatedErrors;
          });

          setErrorMessageRegister?.(prevMessages => {
            const updatedMessages = {...prevMessages};
            delete updatedMessages[`dob_${id}`];
            return updatedMessages;
          });

          calculateAge(id, selectedDate);
          console.log(
            'Selected Date:',
            selectedDate,
            'localChildren:',
            localChildren,
          );
        }
      },
      mode: 'date',
      is24Hour: true,
      maximumDate: new Date(),
    });
  };

  const normalizeDate = inputDate => {
    if (!inputDate) return '';

    return inputDate.includes('/')
      ? inputDate.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$2-$1') // Convert DD/MM/YYYY → YYYY-MM-DD
      : inputDate;
  };

  const calculateAge = (id, dob) => {
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const calculatedAge = currentYear - birthYear;

    // const updatedFields = localChildren.map(child =>
    //   child.id === id ? {...child, age: calculatedAge} : child,
    // );
    // setLocalChildren(updatedFields);
    setChildren?.(updatedFields);
    // setChilds(updatedFields);
    setCHILDREN?.(updatedFields);
  };
  useEffect(() => {
    if (isAttempted) {
      validateFields();
    }
  }, [isAttempted]);

  const formatDate = date => {
    if (!date) return '';
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      date = new Date(date);
    }
    if (isNaN(date)) return '';
    return `${date.getDate().toString().padStart(2, '0')}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    localChildren.forEach(child => {
      if (!child.name.trim()) {
        newErrors[`name_${child.id}`] = 'Child Name is required';
        isValid = false;
      }
      if (!child.dob) {
        newErrors[`dob_${child.id}`] = 'Child DOB is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const formattedDate = date ? date.toLocaleDateString('en-GB') : '';

  const handleValueChange = (text, id, field) => {
    const updatedFields = localChildren.map(child =>
      child.id === id ? {...child, [field]: text} : child,
    );
    setLocalChildren(updatedFields);
    setChildren(updatedFields);

    setErrors(prevErrors => {
      const updatedErrors = {...prevErrors};
      delete updatedErrors[`${field}_${id}`];
      return updatedErrors;
    });

    setErrorMessageRegister?.(prevMessages => {
      const updatedMessages = {...prevMessages};
      delete updatedMessages[`${field}_${id}`];
      return updatedMessages;
    });
  };

  const addChild = () => {
    const isValid = validateFields(); // runs checks and sets errors
    if (!isValid) {
      return; // do NOT add new child if any field is invalid
    }
    if (
      localChildren.some(
        child => (child.name && !child.dob) || (!child.name && child.dob),
      )
    ) {
      validateFields(); // This will set the errors
      return;
    }
    const newChild = {id: localChildren.length + 1, name: '', dob: ''};
    const updatedChildren = [...localChildren, newChild];
    setLocalChildren(updatedChildren);
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
      <View style={{marginBottom: hp(3), width: wp(83), marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          {pageName === 'profile' ? 'Spouse Details' : 'Spouse/Child Details'}
          {/* Spouse/Child Details */}
        </Text>
        <View
          style={{
            width: wp(83),
            // borderWidth: wp(.2),
            borderRadius: wp(2),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: hp(2),
          }}>
          <Image
            source={spouse}
            style={{
              height: hp(2.8),
              width: wp(5.8),
              position: 'absolute',
              zIndex: 11,
              marginLeft: wp(2.5),
            }}
            tintColor={'#BFBDBE'}
            resizeMode="contain"
          />
          <TextInput
            numberOfLines={1}
            style={{
              paddingLeft: wp(10),
              width: wp(80),

              color: 'black',
              fontSize: hp(1.8),
              fontFamily: 'Poppins-Medium',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
            placeholder="Spouse Name"
            placeholderTextColor={'#BFBDBE'}
            value={spousename || SPOUSENAME}
            onChangeText={text => {
              if (setSpouseName) setSpouseName(text);
              if (setSPOUSENAME) setSPOUSENAME(text);
            }}
          />
        </View>

        {pageName && pageName == 'signup' && (
          <View>
            {localChildren.map((child, index) => {
              const ordinalLabel = getOrdinal(index + 1);
              return (
                <View key={child.id}>
                  <View
                    // key={child.id}
                    style={{
                      width: wp(83),
                      borderRadius: wp(2),
                      alignSelf: 'center',
                      marginTop: hp(2.9),
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      // elevation: 3,
                    }}>
                    <Image
                      source={childrenw}
                      style={{
                        height: hp(2.8),
                        width: wp(5.8),
                        position: 'absolute',
                        zIndex: 11,
                        marginLeft: wp(2.5),
                      }}
                      tintColor={'#BFBDBE'}
                      resizeMode="contain"
                    />
                    <TextInput
                      numberOfLines={1}
                      style={{
                        paddingLeft: wp(9.5),
                        width: wp(80),
                        // height: hp(6),
                        color: 'black',
                        fontSize: hp(1.8),
                        fontFamily: 'Poppins-Medium',
                      }}
                      placeholder={`${ordinalLabel} Child Name`}
                      placeholderTextColor={'#BFBDBE'}
                      value={child.name}
                      onChangeText={text =>
                        handleValueChange(text, child.id, 'name')
                      }
                    />
                  </View>
                  {errors[`name_${child.id}`] ? (
                    <Text style={styles.errorText}>
                      {errors[`name_${child.id}`]}
                    </Text>
                  ) : errorMessageRegister?.[`name_${child.id}`] ? (
                    <Text style={styles.errorText}>
                      {errorMessageRegister[`name_${child.id}`]}
                    </Text>
                  ) : null}

                  <TouchableOpacity
                    onPress={() => openDatePicker(child.id)}
                    style={{
                      width: wp(83),
                      height: hp(5.5),
                      marginTop: hp(2),
                      paddingLeft: wp(5.5),
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderRadius: wp(2),
                      backgroundColor: '#FFFFFF',
                      // elevation: 5,
                    }}>
                    <Image
                      source={dob}
                      style={{
                        height: hp(2.8),
                        width: wp(5.8),
                        position: 'absolute',
                        zIndex: 11,
                        marginLeft: wp(2.5),
                      }}
                      tintColor={'#BFBDBE'}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        marginLeft: wp(4.5),
                        fontSize: hp(1.8),
                        fontFamily: 'Poppins-Medium',
                        //   color: edit === 'True' ? '#000000' : '#BFBDBE',
                        color: child.dob ? '#000000' : '#BFBDBE',
                      }}>
                      {child.dob
                        ? formatDate(child.dob) //new Date(child.dob).toLocaleDateString('en-GB')
                        : `${ordinalLabel} Child DOB`}
                    </Text>
                  </TouchableOpacity>
                  {errors[`dob_${child.id}`] ? (
                    <Text style={styles.errorText}>
                      {errors[`dob_${child.id}`]}
                    </Text>
                  ) : errorMessageRegister?.[`dob_${child.id}`] ? (
                    <Text style={styles.errorText}>
                      {errorMessageRegister[`dob_${child.id}`]}
                    </Text>
                  ) : null}
                </View>
              );
            })}
            <TouchableOpacity
              onPress={addChild}
              style={{
                backgroundColor: '#F27F3D',
                paddingHorizontal: wp(2),
                paddingVertical: hp(0.2),
                borderRadius: wp(2),
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                marginTop: hp(1),
                marginRight: wp(1),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: hp(1.4),
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: hp(1.5),
    fontFamily: 'Poppins-Medium',
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
});

export default SpouseChildDetails;
