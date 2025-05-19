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
import Pincodeicon from '../../provider/png/Pincodeicon.png';

const AddressDetails = props => {
  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [child, setChilds] = useState([{id: 1, value: ''}]);
  // const [selectedGender, setSelectedGender] = useState(null);
  // const [selectedRelation, setSelectedRelation] = useState(null);
  const [selectedPincode, setSelectedPincode] = useState(null);

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
    Districts: [
      {text: '302003', id: '1'},
      {text: '302001', id: '2'},
      {text: '302002', id: '3'},
    ],
    Relation: [
      {text: 'Father', id: '1'},
      {text: 'mother', id: '2'},
      {text: 'Spouse', id: '3'},
      {text: 'Child', id: '4'},
      {text: 'Sibling', id: '5'},
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
      <View style={{ marginBottom: hp(0), alignItems: "center",  width: wp(83),
                marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Address Details
        </Text>

        <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
            alignSelf: "flex-start"
          }}>
          Choose Your PinCode
        </Text>

        

        <Dropdown
                style={styles.dropdown1}
                placeholderStyle={styles.placeholderStyle1}
                selectedTextStyle={styles.selectedTextStyle1}
                inputSearchStyle={styles.inputSearchStyle1}
                iconStyle={styles.iconStyle1}
                data={data.Districts}
                // disable={!isEditable}
                search
                maxHeight={300}
                labelField="text"
                valueField="id"
                placeholder="PinCode"
                searchPlaceholder="Search..."
                value={selectedPincode}
                onChange={item => {
                  setSelectedPincode(item.id);
                }}
                renderLeftIcon={() => (
                  <Image
                    source={Pincodeicon}
                    style={{ height: hp(3), width: wp(6.5), marginRight: wp(3) }}
                  />
                )}
                renderItem={(item) => (
                  <View style={{flexDirection: "row", alignItems: "center", paddingVertical: hp(2), paddingLeft: wp(4) }}>
                    <Image source={Pincodeicon} style={{ height: hp(3), width: wp(6.5), marginRight: wp(3) }} />
                    <Text style={{fontSize: hp(2),
            fontFamily: "Poppins-Medium",
            color: "#000"}}>{item.text}</Text>
                  </View>
                )}
              />

       <TextInput
                // editable={isEditable}
                multiline={true}
                style={{
                  paddingHorizontal: wp(2),
                  marginTop: hp(2),
                  // width: wp(83),
                  // borderWidth: wp(.1),
                  width: wp(81),
                  height: hp(14),
                  color: 'black',
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: wp(2),
                  // elevation: 5,
                  textAlignVertical: 'top',
                }}
                placeholder="Enter Your Complete Address"
                placeholderTextColor={'#BFBDBE'}
              />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown1: {
    marginTop: hp(1),
     height: hp(5.5),
     width: wp(81),
     backgroundColor: "#FFFFFF",
 
     paddingHorizontal: wp(3),
     borderRadius: wp(2),
     fontFamily: "Poppins-Medium",
     fontSize: wp(2),
     
 
   },
   icon1: {
     marginRight: 5,
 
   },
   placeholderStyle1: {
     fontSize: hp(2),
     fontFamily: "Poppins-Medium",
     color: "#BFBDBE"
   },
   selectedTextStyle1: {
     fontSize: hp(2),
     fontFamily: "Poppins-Medium",
     color: "#000"
   },
   iconStyle1: {
     width: 30,
     height: 30,
     // paddingRight: wp(1)
   },
   inputSearchStyle1: {
     // height: 40,
     fontSize: 16,
     fontFamily: "Poppins-Medium"
   },
});

export default AddressDetails;
