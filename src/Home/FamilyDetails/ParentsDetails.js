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
import father from '../../provider/png/father.png';
import mother from '../../provider/png/mother.png';

const ParentsDetails = props => {
  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [child, setChilds] = useState([{id: 1, value: ''}]);
  // const [selectedGender, setSelectedGender] = useState(null);
  // const [selectedRelation, setSelectedRelation] = useState(null);
  const [selectedFather, setSelectedFather] = useState(null);
  const [selectedMother, setSelectedMother] = useState(null);

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
      {text: 'Primary', id: '1'},
      {text: 'Secondry', id: '2'},
      {text: 'Highers', id: '3'},
      {text: 'Others', id: '4'},
    ],
    EducationChild: [
      {text: 'Primary', id: '1'},
      {text: 'Secondry', id: '2'},
      {text: 'Highers', id: '3'},
      {text: 'Others', id: '4'},
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
        <View style={{marginBottom: hp(10), width: wp(83),
                  marginTop: hp(2)}}>
      <Text
        style={{
          fontSize: hp(2.5),
          fontFamily: 'Poppins-Medium',
          alignSelf: 'center',
          color: '#000000',
        }}>
        Parents Details
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
            marginTop: hp(2)
           
          }}>
          <Image
            source={father}
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
            placeholder="Father Name"
            placeholderTextColor={'#BFBDBE'}
          />
        </View>

        
        <View
          style={{
            width: wp(83),
            // borderWidth: wp(.2),
            borderRadius: wp(2),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: hp(2)
           
          }}>
          <Image
            source={mother}
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
            placeholder="Mother Name"
            placeholderTextColor={'#BFBDBE'}
          />
        </View>

      

      

    



       
        
                        

        
      
                               

      

      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    
});

export default ParentsDetails;
