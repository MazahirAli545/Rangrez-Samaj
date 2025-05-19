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
import institution from '../../provider/png/institution.png';


import Primaryicon from '../../provider/png/Primaryicon.png';
import Secondryicon from '../../provider/png/Secondryicon.png';
import Highericon from '../../provider/png/Highericon.png';
import noeducation from '../../provider/png/noeducation.png';

const EducationDetails = props => {
  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [child, setChilds] = useState([{id: 1, value: ''}]);
  // const [selectedGender, setSelectedGender] = useState(null);
  // const [selectedRelation, setSelectedRelation] = useState(null);
  const [education, setEducation] = useState(null);

  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date || new Date(), // Use the selected date or current date
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
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

  const handleValueChange = (text, id) => {
    const updatedFields = child.map(child =>
      child.id === id ? {...child, value: text} : child,
    );
    setChilds(updatedFields);
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
      <View style={{ marginBottom: hp(0),           width: wp(83),
                marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Education Details
        </Text>

        <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(1.5),
          }}>
          Education Status
        </Text>

        {/* <FlatList
          data={data.Education}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{marginTop: hp(1.5)}}
          renderItem={({item}) => {
           const isSelected = education === item.id;
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
                  borderRadius: wp(2),
                  flexDirection: "row"
                }}
                onPress={() => setEducation(item.id)} // Update selected id when tapped.
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
        /> */}

        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                              <View 
                                style={{
                                  flexDirection: "row",
                                  flexWrap: "wrap",  // Enables wrapping to the next line
                                  justifyContent: "center", // Ensures items are centered
                                }}
                              >
                                {data.Education.map((item) => {
                                  const isSelected = education === item.id;
                                  return (
                                    <TouchableOpacity
                                      key={item.id}
                                      onPress={() => setEducation(item.id)}
                                      style={{
                                        backgroundColor: isSelected ? "#0468BF" : "#697368",
                                        height: hp(6.5),
                                        width: wp(33),
                                        margin: wp(2), // Margin for spacing
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: wp(2),
                                        flexDirection: "row",
                                      }}
                                      // disabled={!isEditable}
                                    >
                                      <Image source={item.logo} style={{ height: hp(3.2), width: wp(6.4), marginRight: wp(2) }} />
                                      <Text style={{ fontSize: hp(2), fontFamily: "Poppins-Medium", color: "#FFFFFF" }}>{item.text}</Text>
                                    </TouchableOpacity>
                                  );
                                })}
                              </View>
                            </View>

        <View
          style={{
            width: wp(83),
            borderRadius: wp(2),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: hp(2),
          }}>
          <Image
            source={institution}
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
            placeholder="Current Institution"
            placeholderTextColor={'#BFBDBE'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default EducationDetails;
