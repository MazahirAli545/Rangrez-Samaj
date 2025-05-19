import {React, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import name from '../provider/png/name.png';
import dob from '../provider/png/dob.png';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import PersonalFamilyDetails from './FamilyDetails/PersonalFamilyDetails';
import AddressDetails from './FamilyDetails/AddressDetails';
import EducationDetails from './FamilyDetails/EducationDetails';
import ProfessionDetails from './FamilyDetails/ProfessionDetails';
import FamilyHobbies from './FamilyDetails/FamilyHobbies';
import FamilyBussiness from './FamilyDetails/FamilyBussiness';
import SpouseChild from './FamilyDetails/SpouseChild';
import ParentsDetails from './FamilyDetails/ParentsDetails';
import MobileDetails from '../Home/FamilyDetails/MobileDetails';

import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import user from '../provider/png/user.png';
import add from '../provider/png/add.png';
import CameraComponent from '../components/CameraComponent';
import CustomImagePicker from '../components/CameraComponent';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {Card} from 'react-native-paper';
import Signup from '../Auth/Signup';

const AddFamilyMembers = props => {
  // const [modalVisible, setModalVisible] = useState(false);
  // const [profilePicture, setProfilePicture] = useState(null);

  // const handleImageSelect = image => {
  //   setProfilePicture(image);
  //   console.log('Selected image:', image);
  // };

  // const formPages = [
  //   {id: 1, component: <PersonalFamilyDetails />},
  //   {id: 2, component: <AddressDetails />},
  //   {id: 3, component: <EducationDetails />},
  //   {id: 3, component: <ProfessionDetails />},
  //   {id: 4, component: <FamilyHobbies />},
  //   {id: 5, component: <FamilyBussiness />},
  //   {id: 6, component: <SpouseChild />},
  //   {id: 7, component: <ParentsDetails />},
  //   {id: 8, component: <MobileDetails />},
  // ];

  // const FormWizard = ({navigation}) => {
  //   const [currentPage, setCurrentPage] = useState(0);
  //   const flatListRef = useRef(null);
  //   const isNavigating = useRef(false);

  //   const progressPercentage = ((currentPage + 1) / formPages.length) * 100;

  //   const handleContinue = () => {
  //     if (currentPage < formPages.length - 1 && !isNavigating.current) {
  //       isNavigating.current = true;
  //       const nextPage = currentPage + 1;

  //       flatListRef.current?.scrollToIndex({
  //         index: nextPage,
  //         animated: true,
  //       });

  //       // Ensure navigation unlocks correctly
  //       setTimeout(() => {
  //         setCurrentPage(nextPage);
  //         isNavigating.current = false;
  //       }, 300);
  //     }
  //   };

  //   const handleSkip = () => {
  //     if (!isNavigating.current) {
  //       isNavigating.current = true;
  //       const lastPage = formPages.length - 1;

  //       flatListRef.current?.scrollToIndex({
  //         index: lastPage,
  //         animated: true,
  //       });

  //       setTimeout(() => {
  //         setCurrentPage(lastPage);
  //         isNavigating.current = false;
  //       }, 300);
  //     }
  //   };

  //   const handlePageChange = event => {
  //     const offsetX = event.nativeEvent.contentOffset.x;
  //     const newPage = Math.floor(offsetX / wp(100));

  //     if (newPage !== currentPage) {
  //       setCurrentPage(newPage);
  //       isNavigating.current = false; // Unlock when manually swiping
  //     }
  //   };

  //   return (
  //     <View
  //       style={{
  //         marginVertical: hp(1),
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <View style={styles.progressBarContainer}>
  //         <View
  //           style={[styles.progressBar, {width: `${progressPercentage}%`}]}
  //         />
  //       </View>
  //       <Text style={styles.progressText}>
  //         {Math.round(progressPercentage)}% Completed
  //       </Text>

  //       <FlatList
  //         ref={flatListRef}
  //         data={formPages}
  //         horizontal
  //         pagingEnabled
  //         showsHorizontalScrollIndicator={false}
  //         keyExtractor={(_, index) => index.toString()}
  //         renderItem={({item}) => (
  //           <Card.Content
  //             style={{alignItems: 'center', width: wp(100), height: hp(43)}}>
  //             <View
  //               style={{
  //                 zIndex: 100,
  //                 alignSelf: 'flex-end',
  //                 position: 'absolute',
  //               }}>
  //               <Text
  //                 style={{
  //                   top: hp(4),
  //                   right: wp(10),
  //                   fontFamily: 'Poppins-SemiBold',
  //                   fontSize: hp(1.8),
  //                   zIndex: 100,
  //                 }}>
  //                 {currentPage + 1}/{formPages.length}
  //               </Text>
  //               {item.page}
  //             </View>
  //             {item.component}
  //           </Card.Content>
  //         )}
  //         getItemLayout={(_, index) => ({
  //           length: wp(100),
  //           offset: wp(100) * index,
  //           index,
  //         })}
  //         onMomentumScrollEnd={handlePageChange}
  //         onScrollBeginDrag={() => (isNavigating.current = true)}
  //         onScrollEndDrag={() => (isNavigating.current = false)}
  //       />

  //       <View>
  //         {currentPage < formPages.length - 1 && (
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               marginTop: hp(0.5),
  //               width: wp(75),
  //               alignItems: 'center',
  //             }}>
  //             <Text
  //               onPress={handleSkip}
  //               style={{textDecorationLine: 'underline', fontSize: hp(1.8)}}>
  //               Skip all
  //             </Text>
  //             <TouchableOpacity
  //               onPress={handleContinue}
  //               disabled={isNavigating.current}
  //               style={{
  //                 backgroundColor: isNavigating.current ? '#A5D6A7' : '#6A994E',
  //                 width: wp(34),
  //                 height: hp(5),
  //                 borderRadius: wp(2),
  //                 alignItems: 'center',
  //                 justifyContent: 'center',
  //               }}>
  //               <Text style={{color: '#FFF', fontSize: hp(1.8)}}>Continue</Text>
  //             </TouchableOpacity>
  //           </View>
  //         )}

  //         {currentPage === formPages.length - 1 && (
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: '#6A994E',
  //               width: wp(78),
  //               height: hp(5),
  //               borderRadius: wp(2),
  //               marginTop: hp(1),
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}>
  //             <Text style={{color: '#FFF', fontSize: hp(2)}}>
  //               Save & Continue
  //             </Text>
  //           </TouchableOpacity>
  //         )}
  //       </View>
  //     </View>
  //   );
  // };

  return (
    //     <SafeAreaView style={styles.MainContainer}>
    //          <KeyboardAwareScrollView
    //                 keyboardShouldPersistTaps="handled"
    //                 bounces={false}
    //                 style={{flex: 1}}
    //                 showsVerticalScrollIndicator={false}
    //                 contentContainerStyle={{flexGrow: 1}}>
    //       <ImageBackground
    //         source={BackgroundImage}
    //         style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
    //         <LinearGradient
    //           start={{x: 1, y: 1.7}}
    //           end={{x: 0.2, y: 0}}
    //           // colors={['#ac6f82', '#cfa093']}
    //           colors={['#BDD9F2', '#F0F2F2']}
    //           style={{flex: 1, zIndex: 100}}>
    // <View
    //   style={{
    //     paddingVertical: hp(1),
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: hp(2),
    //   }}>
    //   <TouchableOpacity
    //     onPress={() => props.navigation.goBack()}
    //     style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
    //     <Image
    //       source={leftback}
    //       style={{height: hp(4.5), width: wp(10)}}
    //       tintColor={'#000000'}
    //     />
    //   </TouchableOpacity>

    //   <View
    //     style={{
    //       position: 'absolute',
    //       alignSelf: 'center',
    //       justifyContent: 'center',
    //     }}>
    //     <Text
    //       style={{
    //           color: '#000000',
    //                           fontFamily: ' Poppins-SemiBold',
    //                           fontWeight: '600',
    //                           fontSize: hp(3),
    //       }}>
    //       Add Family Members
    //     </Text>
    //   </View>
    // </View>

    // <Text style={styles.HeadingText}>
    //   Keep your family details updated{'\n'}to help build a stronger
    //   Rangrej{'\n'}Samaj community
    // </Text>

    // <View
    //   style={{
    //     alignItems: 'center',
    //     marginTop: hp(2),
    //     marginBottom: hp(2),
    //   }}>
    //   <TouchableOpacity>
    //     {profilePicture === null ? (
    //       <Image source={user} style={styles.UserImageDesign} />
    //     ) : (
    //       <TouchableOpacity onPress={() => setModalVisible(true)}>
    //         <Image
    //           source={{uri: profilePicture.uri}}
    //           style={styles.UserImageDesign}
    //         />
    //       </TouchableOpacity>
    //     )}
    //     <TouchableOpacity onPress={() => setModalVisible(true)}>
    //       <Image
    //         source={add}
    //         style={{
    //           height: hp(3),
    //           width: wp(6),
    //           position: 'absolute',
    //           bottom: hp(0.5),
    //           right: wp(3),
    //         }}
    //         tintColor={'#000000'}
    //       />
    //     </TouchableOpacity>
    //   </TouchableOpacity>

    //   <CustomImagePicker
    //     modalVisible={modalVisible}
    //     onClose={() => setModalVisible(false)}
    //     onImageSelect={handleImageSelect}
    //   />
    // </View>

    //           {/* <View style={styles.progressBarContainer}>
    //             <View
    //               style={[styles.progressBar, {width: `${progressPercentage}%`}]}
    //             />
    //           </View>
    //           <Text style={styles.progressText}>
    //             {Math.round(progressPercentage)}% Completed
    //           </Text>

    //           <View
    //             style={{
    //               height: hp(50),
    //               alignSelf: 'center',
    //               justifyContent: 'center',
    //               marginLeft: wp(3),
    //               marginRight: wp(3),
    //             }}>
    //             <FlatList
    //               ref={flatListRef}
    //               data={formPages.PAGE}
    //               horizontal={true}
    //               pagingEnabled={true}
    //               showsHorizontalScrollIndicator={false}
    //               keyExtractor={(item, index) => index.toString()}
    //               renderItem={({item}) => (
    //                 <View
    //                   style={{
    //                     // borderWidth: wp(1),
    //                     borderRadius: wp(5),
    //                     backgroundColor: 'rgba(197, 206, 217, 0.5)',
    //                     marginVertical: hp(1),
    //                     paddingTop: hp(3),
    //                     width: wp(90),
    //                     marginHorizontal: wp(2),
    //                     zIndex: 100,
    //                   }}>
    //                   <Text
    //                     style={{
    //                       position: 'absolute',
    //                       alignSelf: 'flex-end',
    //                       marginTop: hp(2),
    //                       marginRight: wp(5),
    //                       paddingRight: wp(10),
    //                       fontFamily: 'Poppins-SemiBold',
    //                       fontSize: hp(1.8),
    //                       zIndex: 100,
    //                     }}>
    //                     {currentPage + 1}/{formPages.PAGE.length}
    //                   </Text>
    //                   {item.page}
    //                 </View>
    //               )}

    //               onMomentumScrollEnd={handlePageCount}
    //               getItemLayout={(data, index) => ({
    //                 length: wp(90),
    //                 offset: wp(94.1) * index,
    //                 index,
    //               })}
    //             />

    // <View style={{position: "absolute", bottom: 35, left: 0, right: 0}}>
    //             {showButtons && currentPage < formPages.PAGE.length - 1 && (
    //               <View
    //                 style={{
    //                   flexDirection: 'row',
    //                   justifyContent: 'space-between',
    //                   marginTop: hp(2),
    //                   marginHorizontal: wp(8),
    //                 }}>
    //                 <TouchableOpacity
    //                   style={{
    //                     backgroundColor: '#F2E8CF',

    //                     alignSelf: 'center',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',

    //                       width: wp(25),

    //                       height: hp(4),
    //                       borderRadius: wp(2),
    //                   }}
    //                   onPress={handleSkip}>
    //                   <Text
    //                     style={{
    //                       fontFamily: 'Poppins-Medium',
    //                       color: '#000000',
    //                       fontSize: hp(1.8),
    //                     }}>
    //                     Skip all
    //                   </Text>
    //                 </TouchableOpacity>

    //                 <TouchableOpacity
    //                   style={{
    //                     backgroundColor: '#6A994E',
    //                     // width: wp(38),
    //                     alignSelf: 'center',
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     // paddingHorizontal: wp(4),
    //                     width: wp(25),
    //                     // paddingVertical: hp(.5),

    //                     height: hp(4),
    //                     borderRadius: wp(2),
    //                   }}
    //                   onPress={handleContinue}>
    //                   <Text
    //                     style={{
    //                       fontFamily: 'Poppins-Medium',
    //                       color: '#FFFFFF',
    //                       fontSize: hp(1.8),
    //                     }}>
    //                     Continue
    //                   </Text>
    //                 </TouchableOpacity>
    //               </View>
    //             )}
    //             </View>

    //             {currentPage === formPages.PAGE.length - 1 && (
    //               <TouchableOpacity
    //                 style={{
    //                   backgroundColor: '#6A994E',
    //                   width: wp(78),
    //                   alignSelf: 'center',
    //                   justifyContent: 'center',
    //                   alignItems: 'center',
    //                   height: hp(5),
    //                   borderRadius: wp(2),
    //                   marginTop: hp(4),
    //                 }}
    //                 onPress={() => alert('Form Submitted!')}>
    //                 <Text
    //                   style={{
    //                     fontFamily: 'Poppins-Medium',
    //                     color: '#FFFFFF',
    //                     fontSize: hp(2),
    //                   }}>
    //                   Save & Continue
    //                 </Text>
    //               </TouchableOpacity>
    //             )}
    //           </View> */}
    //           <FormWizard/>
    //         </LinearGradient>
    //       </ImageBackground>
    //       </KeyboardAwareScrollView>
    //     </SafeAreaView>
    <Signup pageName={'AddFamilyMembers'} {...props} />

    // <View>
    //   <Text>hi</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  UserImageDesign: {
    height: hp(14),
    // width: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: hp(10),
  },
  HeadingText: {
    textAlign: 'center',
    marginHorizontal: wp(5),
    justifyContent: 'center',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Regular',
    marginTop: hp(2),
    color: '#177373',
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
    height: 11,
    backgroundColor: '#D9CAAD',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8C6258',
  },

  progressText: {
    fontSize: wp(3.4),
    fontFamily: 'Poppins-Bold',
    marginLeft: wp(5),
    alignSelf: 'flex-Start',
  },
  pageContainer: {
    marginBottom: 20,
    // zIndex:100
    // alignItems: 'center',
  },
  pageText: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    // marginTop: hp(2),
    // marginBottom: hp(12),
    position: 'absolute',
    bottom: hp(15),
    alignSelf: 'center',
  },
});

export default AddFamilyMembers;
