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
// import Pincodeicon from '../../provider/png/Pincodeicon.png';
import profession from '../../provider/png/profession.png';
// import ProfessionDetails from '../../Auth/signupDetails/ProfessionDetails';

const ProfessionDetails = props => {

  const [selectedprofession, setSelectedProfession] = useState(null);



  const data = {
 
     profession: [
          {text: 'Teacher', id: '1'},
          {text: 'Business', id: '2'},
          {text: 'Engineer', id: '4'},
          {text: 'Doctor', id: '5'},
          {text: 'Chemist', id: '6'},
        
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
          Profession Details
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
          Choose Your Profession
        </Text>

 

        <Dropdown
                style={styles.dropdown1}
                placeholderStyle={styles.placeholderStyle1}
                selectedTextStyle={styles.selectedTextStyle1}
                inputSearchStyle={styles.inputSearchStyle1}
                iconStyle={styles.iconStyle1}
                data={data.profession}
                // disable={!isEditable}
                search
                maxHeight={300}
                labelField="text"
                valueField="id"
                placeholder="Profession"
                searchPlaceholder="Search..."
                value={selectedprofession}
                onChange={item => {
                  setSelectedProfession(item.id);
                }}
                renderLeftIcon={() => (
                  <Image
                    source={profession}
                    style={{ height: hp(3), width: wp(6.5), marginRight: wp(3) }}
                  />
                )}
                renderItem={(item) => (
                  <View style={{flexDirection: "row", alignItems: "center", paddingVertical: hp(2), paddingLeft: wp(4) }}>
                    <Image source={profession} style={{ height: hp(3), width: wp(6.5), marginRight: wp(3) }} />
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
                placeholder="Describe your profession"
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

export default ProfessionDetails;
