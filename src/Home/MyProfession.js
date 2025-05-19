import {React, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import profession from '../provider/png/profession.png';
// import { TextInput } from "react-native-paper";
const MyProfession = props => {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [selectedrole, setSelectedRole] = useState(null);
  const [selectedenviroment, setSelectedEnvironment] = useState(null);

  const data = {
    profession: [
      {text: 'Teacher', id: '1'},
      {text: 'Business', id: '2'},
      {text: 'Engineer', id: '4'},
      {text: 'Doctor', id: '5'},
      {text: 'Chemist', id: '6'},
    ],
    role: [
      {text: 'Math-Teacher', id: '1'},
      {text: 'Engineer', id: '2'},
      {text: 'Software-Engineer', id: '4'},
    ],
    workEnviroment: [
      {text: 'Office', id: '1'},
      {text: 'Remote', id: '2'},
      {text: 'School', id: '3'},
      {text: 'Hospital', id: '4'},
      {text: 'FieldWork', id: '5'},
    ],
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
         
          colors={['#BDD9F2', '#F0F2F2']}
          style={{flex: 1}}>
          <View
            style={{
              paddingVertical: hp(1),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp(2),
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
              <Image
                source={leftback}
                style={{height: hp(4.5), width: wp(10)}}
                tintColor={'#000000'}
              />
            </TouchableOpacity>

            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: ' Poppins-SemiBold',
                  fontWeight: '600',
                  fontSize: hp(3),
                }}>
                My Profession
              </Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>

              <View style={{alignItems: "center", backgroundColor: "#C9CBA3", marginHorizontal: wp(5), marginVertical: hp(2), paddingVertical: hp(2), paddingHorizontal: wp(2), borderRadius: wp(3)}}>
            <Text
              style={{
                marginLeft: wp(2),
                
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
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
              value={selectedProfession}
              onChange={item => {
                setSelectedProfession(item.id);
              }}
              renderLeftIcon={() => (
                <Image
                  source={profession}
                  style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                />
              )}
              renderItem={item => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: hp(2),
                    paddingLeft: wp(4),
                  }}>
                  <Image
                    source={profession}
                    style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                  />
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: 'Poppins-Medium',
                      color: '#000',
                    }}>
                    {item.text}
                  </Text>
                </View>
              )}
            />

            <Text
              style={{
                // marginLeft: wp(1),
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
                marginLeft: wp(2),
              }}>
              Job Title/Role
            </Text>

            <Dropdown
              style={styles.dropdown1}
              placeholderStyle={styles.placeholderStyle1}
              selectedTextStyle={styles.selectedTextStyle1}
              inputSearchStyle={styles.inputSearchStyle1}
              iconStyle={styles.iconStyle1}
              data={data.role}
              // disable={!isEditable}
              search
              maxHeight={300}
              labelField="text"
              valueField="id"
              placeholder="Job"
              searchPlaceholder="Search..."
              value={selectedrole}
              onChange={item => {
                setSelectedRole(item.id);
              }}
              renderLeftIcon={() => (
                <Image
                  source={profession}
                  style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                />
              )}
              renderItem={item => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: hp(2),
                    paddingLeft: wp(4),
                  }}>
                  <Image
                    source={profession}
                    style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                  />
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: 'Poppins-Medium',
                      color: '#000',
                    }}>
                    {item.text}
                  </Text>
                </View>
              )}
            />

            <Text
              style={{
                // marginLeft: wp(1),
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
                marginLeft: wp(2),
              }}>
              Company/Organization
            </Text>

            <TextInput
              //    editable={isEditable}
              multiline={true}
              style={{
                paddingHorizontal: wp(2),
                marginTop: hp(2),
                width: wp(81),
                height: hp(16),
                color: 'black',
                fontSize: hp(2),
                fontFamily: 'Poppins-Medium',
                //  alignSelf: 'center',
                //  justifyContent: 'center',
                //  alignContent: 'center',

                backgroundColor: '#FFFFFF',
                borderRadius: wp(2.5),
                // elevation: 5,
                textAlignVertical: 'top',
              }}
              placeholder="Describe Your Profession"
              placeholderTextColor={'#BFBDBE'}
            />

            <Text
              style={{
                // marginLeft: wp(1),
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
                marginLeft: wp(2),
              }}>
              Years of Experience
            </Text>

            <TextInput
              numberOfLines={1}
              style={{
                paddingHorizontal: wp(2),
                marginTop: hp(2),
                width: wp(81),
                //  height: hp(16),
                color: 'black',
                fontSize: hp(2),
                fontFamily: 'Poppins-Medium',
                //  alignSelf: 'center',
                //  justifyContent: 'center',
                //  alignContent: 'center',

                backgroundColor: '#FFFFFF',
                borderRadius: wp(2.5),
                // elevation: 5,
                textAlignVertical: 'top',
              }}
              maxLength={2}
              placeholder="year of Experience"
              placeholderTextColor={'#BFBDBE'}
              keyboardType="phone-pad"
            />

            <Text
              style={{
                // marginLeft: wp(1),
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
                marginLeft: wp(2),
              }}>
              Key Responsibilities
            </Text>

            <TextInput
              //    editable={isEditable}
              multiline={true}
              style={{
                paddingHorizontal: wp(2),
                marginTop: hp(2),
                width: wp(81),
                height: hp(16),
                color: 'black',
                fontSize: hp(2),
                fontFamily: 'Poppins-Medium',
                //  alignSelf: 'center',
                //  justifyContent: 'center',
                //  alignContent: 'center',

                backgroundColor: '#FFFFFF',
                borderRadius: wp(2.5),
                // elevation: 5,
                textAlignVertical: 'top',
              }}
              placeholder="Responsibilities"
              placeholderTextColor={'#BFBDBE'}
            />

            <Text
              style={{
                // marginLeft: wp(1),
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
                marginLeft: wp(2),
              }}>
              Education/Qualifications
            </Text>

            <TextInput
              //    editable={isEditable}
              multiline={true}
              style={{
                paddingHorizontal: wp(2),
                marginTop: hp(2),
                width: wp(81),
                height: hp(16),
                color: 'black',
                fontSize: hp(2),
                fontFamily: 'Poppins-Medium',
                //  alignSelf: 'center',
                //  justifyContent: 'center',
                //  alignContent: 'center',

                backgroundColor: '#FFFFFF',
                borderRadius: wp(2.5),
                // elevation: 5,
                textAlignVertical: 'top',
              }}
              placeholder="Education/Qualifications"
              placeholderTextColor={'#BFBDBE'}
            />

            <Text
              style={{
                // marginLeft: wp(1),
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
                marginLeft: wp(2),
              }}>
              Work Environment
            </Text>

            <Dropdown
              style={styles.dropdown1}
              placeholderStyle={styles.placeholderStyle1}
              selectedTextStyle={styles.selectedTextStyle1}
              inputSearchStyle={styles.inputSearchStyle1}
              iconStyle={styles.iconStyle1}
              data={data.workEnviroment}
              // disable={!isEditable}
              search
              maxHeight={300}
              labelField="text"
              valueField="id"
              placeholder="Work Environment"
              searchPlaceholder="Search..."
              value={selectedenviroment}
              onChange={item => {
                setSelectedEnvironment(item.id);
              }}
              renderLeftIcon={() => (
                <Image
                  source={profession}
                  style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                />
              )}
              renderItem={item => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: hp(2),
                    paddingLeft: wp(4),
                  }}>
                  <Image
                    source={profession}
                    style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                  />
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: 'Poppins-Medium',
                      color: '#000',
                    }}>
                    {item.text}
                  </Text>
                </View>
              )}
            />

            <Text
              style={{
                
                alignSelf: 'flex-start',
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginLeft: wp(2),
                marginTop: hp(3),
              }}>
              Key Achievements
            </Text>

            <TextInput
              //    editable={isEditable}
              multiline={true}
              style={{
                paddingHorizontal: wp(2),
                marginTop: hp(2),
                width: wp(81),
                height: hp(16),
                color: 'black',
                fontSize: hp(2),
                fontFamily: 'Poppins-Medium',
                backgroundColor: '#FFFFFF',
                borderRadius: wp(2.5),
            
                textAlignVertical: 'top',
              }}
              placeholder="Achievements"
              placeholderTextColor={'#BFBDBE'}
            />

        
            </View>

            <TouchableOpacity style={{marginBottom: hp(5), alignItems: "center", alignSelf: "center", justifyContent: "center", backgroundColor: "#BFA380", borderRadius: wp(3), width: wp(90), height: hp(6)}}>
              <Text style={{fontFamily: "Poppins-Medium", fontSize: hp(2.3), color: "#FFFFFF"}}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  dropdown1: {
    marginTop: hp(1),
    height: hp(5.5),
    width: wp(81),
    backgroundColor: '#FFFFFF',

    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    fontFamily: 'Poppins-Medium',
    fontSize: wp(2),
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
    color: '#BFBDBE',
  },
  selectedTextStyle1: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  iconStyle1: {
    width: 30,
    height: 30,
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    // height: 40,s
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default MyProfession;
