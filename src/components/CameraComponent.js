/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// CustomImagePicker.js
import React from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import camera from '../provider/png/camera.png';
import gallery from '../provider/png/gallery.png';
import close from '../provider/png/close.png';
import {Image} from 'react-native-elements';
// import {COLOR} from './Color';
// import elevation from 'react-native-elevation';
// import {font} from './Font';

const CustomImagePicker = ({
  modalVisible,
  onClose,
  setModalVisible,
  onImageSelect,
}) => {
  const handleChooseImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('responseresponse launchImageLibrary', response);
        onImageSelect(response.assets[0]);
        onClose();
      }
    });
  };

  const handleOpenCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        console.log('responseresponse', response);
        onImageSelect(response.assets[0]);
        onClose();
      }
    });
  };

  return (
    <Modal
      style={{margin: 0}}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        {/* <View style={styles.modalContent}> */}
        <LinearGradient
          start={{x: 0, y: 0.9}}
          end={{x: 1, y: 0}}
          // colors={['#000', '#212045']}
          colors={['#FFFFFF', '#FFFFFF']}
          style={{
            // paddingHorizontal: wp(20),
            paddingVertical: hp(3),
            borderRadius: wp(5),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: hp(2),
              fontWeight: '700',
              color: '#000000',
            }}>
            Select Image Source
          </Text>
          <TouchableOpacity style={styles.option} onPress={handleOpenCamera}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: wp(2),
              }}>
              <Image
                source={camera}
                style={{
                  height: hp(3),
                  width: wp(6),
                  resizeMode: 'contain',
                  alignSelf: 'flex-start',
                }}
              />
              <Text
                style={{
                  left: wp(2),
                  fontSize: wp(3.9),
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'left',
                }}>
                Take Photo...
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleChooseImage}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: wp(2),
              }}>
              <Image
                source={gallery}
                style={{
                  height: hp(3),
                  width: wp(6),
                  resizeMode: 'contain',
                  alignSelf: 'flex-start',
                }}
              />
              <Text
                style={{
                  left: wp(2),
                  fontSize: wp(3.9),
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'left',
                }}>
                Choose from Library...
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={onClose}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: wp(2),
              }}>
              <Image
                source={close}
                style={{
                  height: hp(3),
                  width: wp(6),
                  resizeMode: 'contain',
                  alignSelf: 'flex-start',
                }}
              />
              <Text
                style={{
                  left: wp(2),
                  fontSize: wp(3.9),
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'left',
                }}>
                Cancel
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      {/* </View> */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  option: {
    borderRadius: wp(2),
    backgroundColor: '#BFBDBE',
    marginTop: hp(2),
    height: hp(6),
    justifyContent: 'center',

    width: wp(80),

    alignSelf: 'center',
  },
  modal: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 0,
  },
  modalContent: {
    // backgroundColor: 'white',
    // padding: 20,
    // marginHorizontal: wp(5),
    // borderRadius: 50,
    // alignItems: 'center',
    // marginTop: 'auto',
  },
  modalContainer: {
    // backgroundColor: '#303030',
    // maxHeight: 700,
    // borderRadius: wp(2),
    // top: hp(5),
    width: wp(91),
    alignSelf: 'center',
  },
});

export default CustomImagePicker;
