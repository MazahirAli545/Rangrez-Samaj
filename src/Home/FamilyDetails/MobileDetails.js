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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import phone from '../../provider/png/phone.png';
import Modal from 'react-native-modal';
import Success from '../../provider/png/Success.png';
import cancel from '../../provider/png/cancel.png';

const MobileDetails = props => {
  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [child, setChilds] = useState([{id: 1, value: ''}]);
  // const [selectedGender, setSelectedGender] = useState(null);
  // const [selectedRelation, setSelectedRelation] = useState(null);
  const [selectedSpouse, setSelectedSpouse] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [SuccessModalVisible, setSuccessModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSuccessModal = () => {
    setSuccessModalVisible(!SuccessModalVisible);
  };

  const calculateAge = dob => {
    const currentYear = new Date().getFullYear();
    const birthYear = dob.getFullYear();
    const calculatedAge = currentYear - birthYear;
    setAge(calculatedAge);
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
          Mobile Number
        </Text>
        <TouchableOpacity
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
            source={phone}
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
            maxLength={10}
            placeholder="Mobile Number"
            placeholderTextColor={'#BFBDBE'}
            keyboardType="phone-pad"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: hp(10),

            paddingHorizontal: wp(20),
            paddingVertical: hp(1),
            borderRadius: wp(2),
            backgroundColor: '#152340',
          }}>
          <Text
            style={{
              fontSize: hp(2),
              fontFamily: 'Poppins-Medium',
              color: '#FFFFFF',
            }}>
            Verify
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#697368', '#2F4032']}
            style={{
              height: hp(45),
              width: wp(85),
              borderRadius: wp(10),
              alignSelf: 'center',
              marginTop: hp(10),
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2.2),
                textAlign: 'center',
                marginTop: hp(4),
                color: '#FFFFFF',
                marginHorizontal: wp(3),
              }}>
              Enter OTP sent to your mobile number
            </Text>

            {/* <View
                         style={{
                           marginLeft: wp(5.4),
                           alignSelf: 'flex-start',
                           marginTop: hp(1),
                         }}> */}
            <OTPInputView
              style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: hp(5),
                height: hp(5),
                alignItems: 'center',
                alignContent: 'center',
              }}
              pinCount={4}
              // code={inputs?.otp}
              // onCodeChanged={text => {
              //   handleInputs('otp', text);
              // }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
              // placeholderCharacter=" - "
              placeholderTextColor="#000"
              keyboardType="phone-pad"
            />

            {/* {error?.otp && (
                       <Text
                         style={{
                           color: '#D70000',
                           fontSize: wp(3.5),
                           fontWeight: '500',
                           // top: 5,
                           marginLeft: wp(0),
                           textTransform: 'capitalize',
                           marginBottom: hp(2),
                         }}>
                         {error?.otp}
                       </Text>
                     )} */}
            {/* </View> */}

            <View
              style={{
                marginLeft: wp(10),
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(1.4),
              }}>
              {/* <View style={{alignSelf: "center", alignItems: "centers"}}> */}
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: hp(1.7),
                  alignSelf: 'center',
                  alignItems: 'center',
                  fontFamily: 'Poppins-Regular',
                }}>
                didn't receive the code?
              </Text>
              {/* </View>    */}
              <TouchableOpacity
                style={{
                  marginLeft: wp(2),
                  alignSelf: 'center',
                  alignItems: 'centers',
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: hp(1.9),
                    color: '#DEB737',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={toggleSuccessModal}
              style={{alignSelf: 'center', justifyContent: 'center'}}>
              <LinearGradient
                start={{x: 1, y: 1.7}}
                end={{x: 0.2, y: 0}}
                colors={['#D6D9C5', '#CAC9C7']}
                style={{
                  height: hp(5),
                  width: wp(65),
                  borderRadius: wp(2),
                  alignSelf: 'center',
                  marginTop: hp(9),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-SemiBold',
                    color: '#000000',
                    fontSize: hp(2.4),
                  }}>
                  Verify
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Modal>
        {/* Modal fro Success OtP */}
        <Modal
          isVisible={SuccessModalVisible}
          onBackdropPress={() => setSuccessModalVisible(false)}
          style={{zIndex: 100}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: wp(80),
              paddingVertical: hp(2),
              borderRadius: wp(3),
            }}>
              <TouchableOpacity style={{ alignSelf: "flex-end", right: 20}} onPress={()=> !setSuccessModalVisible(false)}>
                 <Image source={cancel} style={{height: hp(3.3), aspectRatio: 1/1,}} />
                 </TouchableOpacity>
            <Image source={Success} style={{height: hp(15), width: wp(30)}} />
            <Text
              style={{
                fontFamily: 'Poppins-Semibold',
                fontSize: hp(3),
                textAlign: 'center',
                color: "#2F4032"
              }}>
              Success
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                textAlign: 'center',
                marginHorizontal: wp(5),
                marginTop: hp(2),
                color: "#697368"
              }}>
              You have successfully added a new family member.
            </Text>
            <Text style={{
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                textAlign: 'center',
                marginHorizontal: wp(5),
                marginTop: hp(2),
                   color: "#697368"
              }}>
              They are now part of your account and can enjoy all the features
              and benefits available.
            </Text>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#697368',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    // width: width,
    // height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: wp(80), // 80% of the screen width
    padding: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
});

export default MobileDetails;
