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
import Male from '../../provider/png/Male.png';
import Female from '../../provider/png/Female.png';
import Others from '../../provider/png/Others.png';


import Fathericon from '../../provider/png/Fathericon.png';
import Mothericon from '../../provider/png/Mothericon.png';
import Spouseicon from '../../provider/png/Spouseicon.png';
import Childicon from '../../provider/png/Childicon.png';
import Siblingicon from '../../provider/png/Siblingicon.png'; 


const PersonalFamilyDetails = props => {
  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [child, setChilds] = useState([{id: 1, value: ''}]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedRelation, setSelectedRelation] = useState(null);

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
    Gender: [
      {text: 'Male', id: '1', icon: Male},
      {text: 'Female', id: '2', icon: Female},
      {text: 'Other', id: '3', icon: Others},
    ],
    Relation: [
      {text: 'Father', id: '1', icon: Fathericon},
      {text: 'mother', id: '2', icon: Mothericon},
      {text: 'Spouse', id: '3', icon: Spouseicon},
      {text: 'Child', id: '4', icon: Childicon},
      {text: 'Sibling', id: '5', icon: Siblingicon},
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
        <View
         style={{
          marginBottom: hp(2),
           width: wp(83),
                    marginTop: hp(2)
          }}>
      <Text
        style={{
          fontSize: hp(2.5),
          fontFamily: 'Poppins-Medium',
          alignSelf: 'center',
          color: '#000000',
        }}>
        Personal Details
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
            source={name}
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
            placeholder="Full Name"
            placeholderTextColor={'#BFBDBE'}
          />
        </View>

        <TouchableOpacity
          onPress={openDatePicker}
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
              color: formattedDate ? '#000000' : '#BFBDBE',
            }}>
            {formattedDate ? formattedDate : 'Enter Your DOB'}
          </Text>
        </TouchableOpacity>

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


{/* <FlatList
  data={data.Gender}
  horizontal={false}
  showsVerticalScrollIndicator={false}
  keyExtractor={(item) => item.id}
  style={{ marginTop: hp(1.5) }}
  renderItem={({ item }) => {
    const isSelected = selectedGender === item.id; // Check if the item is selected

    return (
      <TouchableOpacity
        onPress={() => setSelectedGender(item.id)} // Set selected item on press
        style={{
          backgroundColor: isSelected ? '#0468BF' : '#697368', // Change background color if selected
          height: hp(5.5),
          width: wp(81),
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: hp(1),
          borderRadius: wp(2),
          flexDirection: 'row',
        }}
      >
        <Image
          source={item.icon}
          style={{ height: hp(3.2), width: wp(6.4), marginRight: wp(3) }}
        />
        <Text
          style={{
            fontSize: hp(2),
            fontFamily: 'Poppins-Medium',
            color: '#FFFFFF',
          }}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  }}
/>; */}

<View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
      <View 
        style={{
          flexDirection: "row",
          flexWrap: "wrap",  // Enables wrapping to the next line
          justifyContent: "center", // Ensures items are centered
        }}
      >
        {data.Gender.map((item) => {
          const isSelected = selectedGender === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>  setSelectedGender(item.id)}
              style={{
                backgroundColor: isSelected ? "#0468BF" : "#697368",
                height: hp(8),
                width: wp(30),
                margin: wp(2), // Margin for spacing
                alignItems: "center",
                justifyContent: "center",
                borderRadius: wp(2),
                flexDirection: "row",
              }}
              // disabled={!isEditable}
            >
              <Image source={item.icon} style={{ height: hp(3.2), width: wp(6.4), marginRight: wp(2) }} />
              <Text style={{ fontSize: hp(2), fontFamily: "Poppins-Medium", color: "#FFFFFF" }}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>


        <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          Relation to you
        </Text>

        {/* <FlatList
          data={data.Relation}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{marginTop: hp(1.5)}}
          renderItem={({item}) => {
          const isSelected = selectedRelation === item.id;

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
                onPress={() => setSelectedRelation(item.id)}>
                                   <Image source={item.icon} style={{height: hp(3.2), width: wp(6.4), marginRight: wp(3)}}/>

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
        {data.Relation.map((item) => {
          const isSelected = selectedGender === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() =>  setSelectedGender(item.id)}
              style={{
                backgroundColor: isSelected ? "#0468BF" : "#697368",
                height: hp(8),
                width: wp(30),
                margin: wp(2), // Margin for spacing
                alignItems: "center",
                justifyContent: "center",
                borderRadius: wp(2),
                flexDirection: "row",
              }}
              // disabled={!isEditable}
            >
              <Image source={item.icon} style={{ height: hp(3.2), width: wp(6.4), marginRight: wp(2) }} />
              <Text style={{ fontSize: hp(2), fontFamily: "Poppins-Medium", color: "#FFFFFF" }}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    
});

export default PersonalFamilyDetails;
