import {React, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
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
import name from '../../provider/png/name.png';
import dob from '../../provider/png/dob.png';
import father from '../../provider/png/father.png';
import mother from '../../provider/png/mother.png';
import phone from '../../provider/png/phone.png';
import pincode from '../../provider/png/pincode.png';

import education from '../../provider/png/education.png';
import spouse from '../../provider/png/spouse.png';
import children from '../../provider/png/children.png';




const UserDetails = () => {
      const [value, setValue] = useState(null);
      const [child, setChilds] = useState([{id: 1, value: ''}]);
      const [date, setDate] = useState(new Date());
      // const [date, setDate] = useState(null);
      const [age, setAge] = useState(0);

       const handleValueChange = (text, id) => {
          const updatedFields = child.map(child =>
            child.id === id ? {...child, value: text} : child,
          );
          setChilds(updatedFields);
        };
      
        // Function to add a new input field
        const addChild = () => {
          const newChild = {id: child.length + 1, value: ''};
          setChilds([...child, newChild]);
        };
      
        const data = {
          MinBudget: [
            {title: '302001', id: '1'},
            {title: '302002', id: '2'},
            {title: '302003', id: '3'},
            {title: '302004', id: '4'},
            {title: '302005', id: '5'},
          ],
        };
      
        const openDatePicker = () => {
          DateTimePickerAndroid.open({
            value: date,
            onChange: (event, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
                calculateAge(selectedDate);
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
      
        const formattedDate = date.toLocaleDateString('en-GB');

    return (
      
    <ScrollView horizontal={false} showsVerticalScrollIndicator={false} style={{alignSelf: 'center',  flex: 1,  }}>
        {/* <TouchableOpacity style={{alignSelf: "flex-end",  marginRight: wp(11),  marginTop: hp(1)}} >
              
                  <Image source={edit} style={{height: hp(2.5), width: wp(5)}} tintColor={"#000000"}/>
                </TouchableOpacity> */}
      <Text style={{alignSelf: "center", textAlign: "center", fontSize: hp(3),  fontFamily: "Poppins-Medium",  marginTop: hp(2)}}>Profile</Text>
      <View style={{marginHorizontal: wp(2), marginBottom: hp(1)}}>
      <View
        style={{
          width: wp(75),
          borderRadius: wp(2),
          alignSelf: 'center',
          marginTop: hp(2),
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          // elevation: 3,
       
       
        }}>
           <Image source={name} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5), }} tintColor={"#BFBDBE"}/>
        <TextInput
          editable={false}
          numberOfLines={1}
          style={{
            paddingLeft: wp(10),
            width: wp(72),
            // height: hp(6),
            color: 'black',
            fontSize: hp(1.8),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
          placeholder="Full Name"
          // placeholderTextColor={'#000'}
          placeholderTextColor={'#BFBDBE'}
        />
      </View>

      {/* <Text style={styles.text}>Enter your DOB</Text> */}
      <View
        // onPress={openDatePicker}
        style={{
          width: wp(75),
          height: hp(5.5),
          marginTop: hp(2.9),
          paddingLeft: wp(5.5),
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: wp(2),
          backgroundColor: '#FFFFFF',
          // elevation: 5,
        }}>
           <Image source={dob} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5), }} tintColor={"#BFBDBE"}/>
        <Text
          style={{
            marginLeft: wp(4.5),
            fontSize: hp(1.8),
            fontFamily: 'Poppins-Medium',
            color: '#BFBDBE',
          }}>
          {formattedDate}
        </Text>
      </View>

    


      <View style={{marginTop: hp(1)}}>
        {age > 21 ? (
          <>
            <View
              style={{
                width: wp(75),
                borderRadius: wp(2),
                alignSelf: 'center',
                marginTop: hp(2.9),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                // elevation: 3,
              }}>
                 <Image source={spouse} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5), }} tintColor={"#BFBDBE"}/>
              <TextInput
                editable={false}
                numberOfLines={1}
                style={{
                  paddingLeft: wp(9.5),
                  width: wp(72),
                  // height: hp(6),
                  color: 'black',
                  fontSize: hp(1.8),
                  fontFamily: 'Poppins-Medium',
                }}
                placeholder="Spouse Name"
                placeholderTextColor={'#BFBDBE'}
              />
            </View>

            {child.map(child => (
              <View
                key={child.id}
                style={{
                  width: wp(75),
                  borderRadius: wp(2),
                  alignSelf: 'center',
                  marginTop: hp(2.9),
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  // elevation: 3,
                }}>
                   <Image source={children} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5), }} tintColor={"#BFBDBE"}/>
                <TextInput
                  editable={false}
                  numberOfLines={1}
                  style={{
                    paddingLeft: wp(9.5),
                    width: wp(72),
                    // height: hp(6),
                    color: 'black',
                    fontSize: hp(1.8),
                    fontFamily: 'Poppins-Medium',
                  }}
                  placeholder={`Child Name `}
                  placeholderTextColor={'#BFBDBE'}
                  value={child.value}
                  onChangeText={text => handleValueChange(text, child.id)}
                />
              </View>
            ))}

            <TouchableOpacity
              onPress={addChild}
              style={{
                backgroundColor: '#800000',
                // height: hp(3.5),
                width: wp(15),
                borderRadius: wp(10),
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                marginTop: hp(1),
                marginRight: wp(6),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: hp(1.8),
                  fontFamily: 'Poppins-Medium',
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}>
                ADD
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{
                width: wp(75),
                borderRadius: wp(2),
                alignSelf: 'center',
                marginTop: hp(2),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                // elevation: 3,
              }}>
                <Image source={father} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5), }} tintColor={"#BFBDBE"}/>
              <TextInput
                editable={false}
                numberOfLines={1}
                style={{
                  paddingLeft: wp(9.5),
                  width: wp(72),
                  // height: hp(6),
                  color: 'black',
                  fontSize: hp(1.8),
                  fontFamily: 'Poppins-Medium',
                }}
                placeholder="Father Name"
                placeholderTextColor={'#BFBDBE'}
              />
            </View>

            <View
              style={{
                width: wp(75),
                borderRadius: wp(2),
                alignSelf: 'center',
                marginTop: hp(2.9),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                // elevation: 3,
              }}>
                <Image source={mother} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5), }} tintColor={"#BFBDBE"}/>
              <TextInput
                editable={false}
                numberOfLines={1}
                style={{
                  paddingLeft: wp(9.5),
                  width: wp(72),
                  // height: hp(6),
                  color: 'black',
                  fontSize: hp(1.8),
                  fontFamily: 'Poppins-Medium',
                }}
                placeholder="Mother Name"
                placeholderTextColor={'#BFBDBE'}
              />
            </View>
          </>
        )}
      </View>

      <View
        style={{
          //   borderWidth: 1,
          width: wp(75),
          //   borderWidth: wp(0.3),
          //   borderColor: 'rgba(0, 0, 0, 0.19)',
          borderRadius: wp(2),
          alignSelf: 'center',

          marginTop: hp(2.9),
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          // justifyContent: "center",
          backgroundColor: '#FFFFFF',
          // elevation: 3,
        }}>
          <Image source={phone} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5), }} tintColor={"#BFBDBE"}/>
        <TextInput
          editable={false}
          numberOfLines={1}
          style={{
            paddingLeft: wp(9.5),
            width: wp(72),
            // height: hp(6),
            color: 'black',
            fontSize: hp(1.8),
            fontFamily: 'Poppins-Medium',
          }}
          placeholder="Mobile No."
          placeholderTextColor={'#BFBDBE'}
          // placeholderStyle={{marginTop: hp(.2)}}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <View
        style={{
          marginTop: hp(2.9),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image source={pincode} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5),left: 0 }} tintColor={"#BFBDBE"}/>
        <Dropdown
          disable={true}
          style={styles.dropdown1}
          placeholderStyle={styles.placeholderStyle1}
          selectedTextStyle={styles.selectedTextStyle1}
          inputSearchStyle={styles.inputSearchStyle1}
          iconStyle={styles.iconStyle1}
          data={data.MinBudget}
          search
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder="PIN CODE"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.id);
          }}
        />
      </View>

      <View
        style={{
          width: wp(75),
          borderRadius: wp(2),
          alignSelf: 'center',
          marginTop: hp(2.9),
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          // elevation: 3,
        }}>
                    <Image source={education} style={{height: hp(2.8), width: wp(5.8), position: "absolute", zIndex: 11, marginLeft: wp(2.5),left: 0 }} tintColor={"#BFBDBE"}/>

        <TextInput
          editable={false}
          multiline={true}
          style={{
            paddingLeft: wp(9.5),
            width: wp(72),
            color: 'black',
            fontSize: hp(1.8),
            fontFamily: 'Poppins-Medium',
            textAlignVertical: 'top',
            textAlign: 'left',
          }}
          placeholder="Education"
          placeholderTextColor={'#BFBDBE'}
        />
      </View>
      </View>
    </ScrollView>
    
    );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  disabledButton: {
    // backgroundColor: '#d3d3d3', // Gray color for disabled state
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressBarContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 10,

    backgroundColor: '#e0e0df',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: hp(2),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  progressText: {
    fontSize: wp(3.4),
    fontFamily: 'Poppins-Bold',
    marginLeft: wp(5),
  },
  pageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  pageText: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: hp(5),
    marginBottom: hp(5),
    // position: "absolute",
    // bottom: 0,
    alignSelf: 'center',
  },

  MainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  text: {
    color: 'black',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
    marginTop: hp(1.5),
    textAlign: 'left',
  },
  dropdown1: {
    height: hp(5.5),

    width: wp(74.5),

    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',

    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(9.5),
    borderRadius: wp(2),
    color: 'black',
    fontSize: hp(2.4),
    fontFamily: 'Lora-VariableFont_wght',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: '#BFBDBE',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
  },
  iconStyle1: {
    width: hp(0),
    height: wp(0),
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },
  cancelContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: wp(2),
    width: wp(7),
    height: hp(4),
    marginTop: hp(2),
  },
  preview: {
    // flex: 1,
    height: hp(47),
    // width: wp(40),
    // justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    marginHorizontal: wp(4),
    // marginVertical: hp(2),
  },
  insideCaptureButton: {
    width: 65,
    height: 65,
    borderRadius: wp(100),
    backgroundColor: '#4f4f4f',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: wp(100),
    alignSelf: 'center',
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    // backgroundColor: '#303030',
    // maxHeight: 700,

    borderRadius: wp(2),
    top: hp(5),
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlineContainer: {},
  cameraContainer: {
    height: hp(40),

    justifyContent: 'center',

    marginHorizontal: wp(10),
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  Header: {
    borderBottomWidth: wp(0.4),
    borderColor: '#900075',
    backgroundColor: '#900075',
    height: hp(18.5),
    width: wp(100),
  },
  UserImageDesign: {
    height: hp(14),
    // width: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: hp(10),
  },
  EditButton: {
    borderWidth: wp(0.2),
    borderColor: '#fff',
    height: hp(3),
    width: wp(17),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    marginTop: hp(1),
  },
  SignOptionButton: {
    backgroundColor: '#fff',
    height: hp(5.8),
    width: wp(50),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    top: hp(-2),
    left: wp(-1.5),
  },
  buttonGradient: {
    borderRadius: wp(10),
    borderWidth: wp(0.1),
    alignSelf: 'center',
    width: wp(10),
    height: hp(2.2),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: hp(0.5),
  },
});
  export default UserDetails;

