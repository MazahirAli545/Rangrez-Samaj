// components/IncompleteProfileModal.js
import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Alert from '../../provider/png/Alert.png'; // adjust path as needed

const IncompleteProfileModal = ({visible, onClose, navigation}) => {
  return (
    <Modal isVisible={visible}>
      <LinearGradient
        start={{x: 1, y: 1.7}}
        end={{x: 0.2, y: 0}}
        colors={['#F0F2F2', '#F0F2F2']}
        style={{
          height: hp(45),
          borderRadius: wp(5),
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={Alert}
          style={{height: hp(17), aspectRatio: 1}}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: hp(2.6),
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
            marginTop: hp(3),
          }}>
          Your profile is incomplete
        </Text>
        <Text
          style={{
            fontSize: hp(2),
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
          }}>
          Please update your profile details
        </Text>
        <TouchableOpacity
          onPress={() => {
            onClose();
            navigation.navigate('Profile');
          }}
          style={{alignSelf: 'center', justifyContent: 'center'}}>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#D6D9C5', '#CAC9C7']}
            style={{
              height: hp(5),
              width: wp(65),
              borderRadius: wp(2),
              marginTop: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                color: '#000',
              }}>
              Go to Profile
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </Modal>
  );
};

export default IncompleteProfileModal;
