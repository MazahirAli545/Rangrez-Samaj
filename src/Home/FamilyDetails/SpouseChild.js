import {React, useState} from 'react';
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
import children from '../../provider/png/children.png';

import Primaryicon from '../../provider/png/Primaryicon.png';
import Secondryicon from '../../provider/png/Secondryicon.png';
import Highericon from '../../provider/png/Highericon.png';
import noeducation from '../../provider/png/noeducation.png';

const SpouseChild = props => {
  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [child, setChilds] = useState([{id: 1, name: '', dob: null}]);
  const [selectedSpouse, setSelectedSpouse] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);

  const openDatePicker = id => {
    DateTimePickerAndroid.open({
      value: new Date(), // Use the current date if no dob is selected
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          const updatedFields = child.map(child =>
            child.id === id ? {...child, dob: selectedDate} : child,
          );
          setChilds(updatedFields);
          console.log(
            'Child Names:',
            updatedFields.map(item => item.name),
          );
          console.log(
            'Child DOBs:',
            updatedFields.map(item => item.dob),
          );
          calculateAge(selectedDate); // Your logic for calculating age
        }
      },
      mode: 'date',
      is24Hour: true,
      maximumDate: new Date(), // Prevent future dates
    });
  };

  const calculateAge = dob => {
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const calculatedAge = currentYear - birthYear;
    setAge(calculatedAge);
  };

  const formattedDate = date ? date.toLocaleDateString('en-GB') : '';

  const handleValueChange = (text, id, field) => {
    const updatedFields = child.map(child =>
      child.id === id ? {...child, [field]: text} : child,
    );
    setChilds(updatedFields);

    // Log both name and dob for all children
    console.log(
      'Child Names:',
      updatedFields.map(item => item.name),
    );
    console.log(
      'Child DOBs:',
      updatedFields.map(item => item.dob),
    );
  };

  const addChild = () => {
    const newChild = {id: child.length + 1, value: ''};
    setChilds([...child, newChild]);
  };

  const data = {
    Education: [
      {text: 'Primary', id: '1', logo: Primaryicon},
      {text: 'Secondry', id: '2', logo: Secondryicon},
      {text: 'Higher', id: '3', logo: Highericon},
      {text: 'None', id: '4', logo: noeducation},
    ],

    EducationChild: [
      {text: 'Primary', id: '1', logo: Primaryicon},
      {text: 'Secondry', id: '2', logo: Secondryicon},
      {text: 'Higher', id: '3', logo: Highericon},
      {text: 'None', id: '4', logo: noeducation},
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
      <View style={{marginBottom: hp(10),  width: wp(83),
                marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Spouse/Child Details
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
          />
        </View>

     {/* Child and Education */}



        {child.map(child => (
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
                source={children}
                style={{
                  height: hp(2.8),
                  width: wp(5.8),
                  position: 'absolute',
                  zIndex: 11,
                  marginLeft: wp(2.5),
                }}
                tintColor={'#BFBDBE'}
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
                placeholder={`Child Name `}
                placeholderTextColor={'#BFBDBE'}
                value={child.name}
                onChangeText={text => handleValueChange(text, child.id, 'name')}
              />
            </View>
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
                  ? child.dob.toLocaleDateString()
                  : 'Enter Children DOB'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          onPress={addChild}
          style={{
            backgroundColor: '#F27F3D',
            paddingHorizontal: wp(3),
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

        {/* <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          Enter Child Education
        </Text>

        <FlatList
          data={data.EducationChild}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{marginTop: hp(1.5)}}
          renderItem={({item}) => {
            // if (selectedChild !== null && selectedChild !== item.id) {
            //   return null; // Hide non-selected items.
            // }

             const isSelected = selectedChild === item.id;
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: isSelected ? '#0468BF' : '#697368',
                  height: hp(5.5),
                  width: wp(81),
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: hp(1),
                  flexDirection: "row",
                  borderRadius: wp(2),
                }}
                onPress={() => setSelectedChild(item.id)} // Update selected id when tapped.
              >
                                  <Image source={item.logo} style={{height: hp(3.2), width: wp(6.4), marginRight: wp(3)}}/>
                
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
          }}
        />
                                */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default SpouseChild;
