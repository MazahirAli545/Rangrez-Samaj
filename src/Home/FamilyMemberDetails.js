// // //person name
// // //person image
// // //person mobile number
// // //search
// // //edit button

// // import React, {useState, useEffect} from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   Image,
// //   TouchableOpacity,
// //   TextInput,
// //   ImageBackground,
// // } from 'react-native';
// // import {SafeAreaView} from 'react-native-safe-area-context';
// // import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// // import LinearGradient from 'react-native-linear-gradient';
// // import {
// //   widthPercentageToDP as wp,
// //   heightPercentageToDP as hp,
// // } from 'react-native-responsive-screen';
// // import Footer from '../components/Footer';
// // import leftback from '../provider/png/leftback.png';
// // import profile1 from '../provider/png/profile1.png';
// // import profile2 from '../provider/png/profile2.png';
// // import edit from '../provider/png/edit.png';
// // import search from '../provider/png/search.png';
// // import call from '../provider/png/call.png';
// // import BackgroundImage from '../provider/png/BackgroundImage.png';
// // import rightpage from '../provider/png/rightpage.png';
// // import MemberDetailDescription from './MemberDetailDescription';
// // import {BASE_URL} from '../api/ApiInfo';
// // import {getData, async_keys, clearData, storeData} from '../api/UserPreference';

// // const FamilyMemberDetails = props => {
// //   const data = {
// //     Directory: [
// //       {
// //         id: 2,
// //         name: 'Salman Khan',
// //         profile: profile1,
// //         phonenumber: '5657893241',
// //         Relation: 'Father',
// //       },
// //       {
// //         id: 1,
// //         name: userData?.PR_FATHER_NAME,
// //         profile: profile2,
// //         phonenumber: '9834562345',
// //         Relation: 'Mother',
// //       },
// //       {
// //         id: 3,
// //         name: 'Shah Rukh Khan ',
// //         profile: profile1,
// //         phonenumber: '9834562345',
// //         Relation: 'Child',
// //       },
// //       {
// //         id: 4,
// //         name: 'Saif Ali Khan ',
// //         profile: profile2,
// //         phonenumber: '9894562645',
// //         Relation: 'Spouse',
// //       },
// //       {
// //         id: 5,
// //         name: 'Fardeen Khan ',
// //         profile: profile2,
// //         phonenumber: '9894562645',
// //         Relation: 'Sibling',
// //       },
// //     ],
// //   };
// //   const [token, setToken] = useState('');
// //   const [completionPercentage, setCompletionPercentage] = useState(0);
// //   const [userData, setUserData] = useState(null);

// //   console.log('sjsj', userData);

// //   useEffect(() => {
// //     fetchUserProfile();
// //   }, [token]);

// //   useEffect(() => {
// //     const fetchToken = async () => {
// //       const storedToken = await getData(async_keys.auth_token);
// //       setToken(storedToken || 'No Token Found');
// //     };

// //     fetchToken();
// //   }, []);

// //   console.log('TOKENNNN', token);

// //   const fetchUserProfile = async () => {
// //     if (!token) return;
// //     try {
// //       const response = await fetch(`${BASE_URL}profile`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       const data = await response.json();

// //       if (data.success && data.data) {
// //         setUserData(data.data);
// //       } else {
// //         setErrorMessage(data.data.message);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching profile:', error);
// //       setErrorMessage('Failed to load user data.');
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={style.MainContainer}>
// //       <ImageBackground
// //         source={BackgroundImage}
// //         style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
// //         <KeyboardAwareScrollView
// //           keyboardShouldPersistTaps="handled"
// //           bounces={false}
// //           style={{flex: 1}}
// //           showsVerticalScrollIndicator={false}
// //           contentContainerStyle={{flexGrow: 1}}>
// //           <LinearGradient
// //             start={{x: 1, y: 1.7}}
// //             end={{x: 0.2, y: 0}}
// //             colors={['#BDD9F2', '#F0F2F2']}
// //             style={{flex: 1}}>
// //             <View
// //               style={{
// //                 paddingVertical: hp(1),
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 marginTop: hp(2),
// //               }}>
// //               <TouchableOpacity
// //                 onPress={() => props.navigation.goBack()}
// //                 style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
// //                 <Image
// //                   source={leftback}
// //                   style={{height: hp(4.5), width: wp(10)}}
// //                   tintColor={'#000000'}
// //                 />
// //               </TouchableOpacity>

// //               <View
// //                 style={{
// //                   position: 'absolute',
// //                   alignSelf: 'center',
// //                   justifyContent: 'center',
// //                 }}>
// //                 <Text
// //                   style={{
// //                     color: '#000000',
// //                     fontFamily: ' Poppins-SemiBold',
// //                     fontWeight: '600',
// //                     fontSize: hp(3),
// //                   }}>
// //                   Family Details
// //                 </Text>
// //               </View>
// //             </View>

// //             <View
// //               style={{
// //                 marginBottom: hp(2),
// //                 marginTop: hp(1),
// //                 backgroundColor: '#FFFFFF',
// //                 marginHorizontal: wp(8),
// //                 flexDirection: 'row',
// //                 alignItems: 'center',
// //                 alignSelf: 'center',
// //                 borderRadius: wp(2),
// //                 paddingVertical: hp(0.5),
// //               }}>
// //               <Image
// //                 source={search}
// //                 style={{
// //                   height: hp(3),
// //                   width: wp(6),
// //                   position: 'absolute',
// //                   zIndex: 11,
// //                   marginLeft: wp(2),
// //                 }}
// //               />
// //               <TextInput
// //                 placeholder="Search..."
// //                 placeholderTextColor={'#000000'}
// //                 numberOfLines={1}
// //                 style={{
// //                   backgroundColor: '#FFFFFF',
// //                   fontSize: hp(2.2),
// //                   borderRadius: wp(5),
// //                   color: '#000000',
// //                   width: wp(85),
// //                   paddingLeft: wp(10),
// //                   paddingRight: wp(3),
// //                   fontFamily: 'Poppins-Regular',
// //                 }}
// //               />
// //             </View>

// //             <View style={{marginTop: hp(1.5), alignItems: 'center'}}>
// //               <FlatList
// //                 data={data.Directory}
// //                 horizontal={false}
// //                 showsHorizontalScrollIndicator={false}
// //                 showsVerticalScrollIndicator={false}
// //                 renderItem={({item}) => (
// //                   <TouchableOpacity
// //                     onPress={() =>
// //                       props.navigation.navigate('MemberDetailDescription')
// //                     }
// //                     style={{
// //                       marginHorizontal: wp(2),
// //                       marginVertical: wp(0.1),
// //                       width: wp(80),
// //                       // height: hp(8),
// //                       paddingVertical: hp(1),
// //                       borderRadius: wp(3),
// //                       backgroundColor: '#F2E8CF',
// //                       // elevation: 5,
// //                       marginBottom: hp(2),
// //                       flexDirection: 'row',
// //                       alignItems: 'center',
// //                       justifyContent: 'space-between',
// //                       paddingHorizontal: wp(3),
// //                       alignContent: 'center',
// //                     }}>
// //                     <View style={{flexDirection: 'row'}}>
// //                       <Image
// //                         source={item.profile}
// //                         style={{
// //                           height: hp(7),
// //                           width: wp(14),
// //                           borderRadius: wp(100),
// //                           resizeMode: 'cover',
// //                           alignSelf: 'center',
// //                         }}
// //                       />

// //                       <View style={{marginLeft: wp(5)}}>
// //                         <Text
// //                           style={{
// //                             fontSize: hp(2),
// //                             fontFamily: 'Poppins-Medium',
// //                             color: '#1F260F',
// //                           }}>
// //                           {item.name}
// //                         </Text>

// //                         <Text
// //                           style={{
// //                             fontSize: hp(1.6),
// //                             fontFamily: 'Poppins-Medium',
// //                             color: '#4E5927',
// //                           }}>
// //                           {item.phonenumber}
// //                         </Text>

// //                         <Text
// //                           style={{
// //                             fontSize: hp(1.6),
// //                             fontFamily: 'Poppins-Medium',
// //                             color: '#4E5927',
// //                           }}>
// //                           {item.Relation}
// //                         </Text>
// //                       </View>
// //                     </View>
// //                     <Image
// //                       source={rightpage}
// //                       tintColor={'grey'}
// //                       style={{height: hp(2.5), width: wp(5)}}
// //                     />
// //                   </TouchableOpacity>
// //                 )}
// //               />
// //             </View>
// //           </LinearGradient>
// //         </KeyboardAwareScrollView>
// //       </ImageBackground>
// //       <View
// //         style={{
// //           position: 'absolute',
// //           bottom: hp(4),
// //           alignSelf: 'center',
// //           borderRadius: wp(10),
// //         }}>
// //         <Footer title="Directory" />
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // const style = StyleSheet.create({
// //   MainContainer: {
// //     flex: 1,
// //   },
// // });

// // export default FamilyMemberDetails;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   ImageBackground,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Footer from '../components/Footer';
// import leftback from '../provider/png/leftback.png';
// import profile1 from '../provider/png/profile1.png';
// import profile2 from '../provider/png/profile2.png';
// import search from '../provider/png/search.png';
// import rightpage from '../provider/png/rightpage.png';
// import BackgroundImage from '../provider/png/BackgroundImage.png';
// import {BASE_URL} from '../api/ApiInfo';
// import user from '../provider/png/user.png';
// import {getData, async_keys} from '../api/UserPreference';

// const FamilyMemberDetails = props => {
//   const [token, setToken] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [familyMembers, setFamilyMembers] = useState([]);
//   const [fullName, setFullName] = useState('');
//   const [currentUserId, setCurrentUserId] = useState('');

//   const fetchFamilyMembers = async userData => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Construct query parameters based on available data
//       let queryParams = [];

//       if (userData.PR_FATHER_ID) {
//         queryParams.push(`father_id=${userData.PR_FATHER_ID}`);
//       }

//       if (userData.PR_MOTHER_ID) {
//         queryParams.push(`mother_id=${userData.PR_MOTHER_ID}`);
//       }

//       // Fallback to current user ID if no parent IDs available
//       if (queryParams.length === 0 && userData.PR_ID) {
//         queryParams.push(`id=${userData.PR_ID}`);
//       }

//       if (queryParams.length === 0) {
//         throw new Error('No family identifiers found');
//       }

//       const response = await fetch(
//         `${BASE_URL}/users/family-members?${queryParams.join('&')}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || 'Failed to fetch family members');
//       }

//       // Filter out current user from results
//       const filteredMembers = data.users.filter(
//         member => member.PR_ID !== userData.PR_ID,
//       );

//       setFamilyMembers(filteredMembers);
//     } catch (error) {
//       console.error('Error fetching family members:', error);
//       setError(error.message || 'Failed to load family members');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredData = familyMembers.filter(item =>
//     item.PR_FULL_NAME.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   return (
//     <SafeAreaView style={style.MainContainer}>
//       <ImageBackground
//         source={BackgroundImage}
//         style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
//         <KeyboardAwareScrollView
//           keyboardShouldPersistTaps="handled"
//           bounces={false}
//           style={{flex: 1}}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{flexGrow: 1}}>
//           <LinearGradient
//             start={{x: 1, y: 1.7}}
//             end={{x: 0.2, y: 0}}
//             colors={['#BDD9F2', '#F0F2F2']}
//             style={{flex: 1}}>
//             {/* Top Header */}
//             <View style={style.headerContainer}>
//               <TouchableOpacity
//                 onPress={() => props.navigation.goBack()}
//                 style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
//                 <Image
//                   source={leftback}
//                   style={style.backIcon}
//                   tintColor={'#000000'}
//                 />
//               </TouchableOpacity>

//               <View style={style.headerTitleContainer}>
//                 <Text style={style.headerTitle}>Family Details</Text>
//               </View>
//             </View>

//             {/* Search Bar */}
//             <View style={style.searchContainer}>
//               <Image source={search} style={style.searchIcon} />
//               <TextInput
//                 placeholder="Search..."
//                 placeholderTextColor={'#000000'}
//                 numberOfLines={1}
//                 value={searchText}
//                 onChangeText={setSearchText}
//                 style={style.searchInput}
//               />
//             </View>

//             {/* List */}
//             <View
//               style={{
//                 marginTop: hp(1.5),
//                 alignItems: 'center',
//                 paddingBottom: hp(10),
//               }}>
//               <FlatList
//                 data={filteredData}
//                 keyExtractor={item => item.id.toString()}
//                 showsVerticalScrollIndicator={false}
//                 renderItem={({item}) => (
//                   <TouchableOpacity
//                     onPress={() =>
//                       props.navigation.navigate('MemberDetailDescription', {
//                         member: item,
//                       })
//                     }
//                     style={style.cardContainer}>
//                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                       <Image
//                         source={
//                           item.PR_PHOTO_URL && item.PR_PHOTO_URL !== ' '
//                             ? {uri: item.PR_PHOTO_URL}
//                             : user
//                         }
//                         style={style.profileImage}
//                       />

//                       <View style={{marginLeft: wp(5)}}>
//                         <Text style={style.nameText}>{item.PR_FULL_NAME}</Text>
//                         <Text style={style.phoneText}>{item.PR_MOBILE_NO}</Text>
//                       </View>
//                     </View>

//                     <Image
//                       source={rightpage}
//                       tintColor={'grey'}
//                       style={style.arrowIcon}
//                     />
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </LinearGradient>
//         </KeyboardAwareScrollView>
//       </ImageBackground>

//       {/* Footer */}
//       <View style={style.footerContainer}>
//         <Footer title="Directory" />
//       </View>
//     </SafeAreaView>
//   );
// };

// const style = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//   },
//   headerContainer: {
//     paddingVertical: hp(1),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: hp(2),
//   },
//   backIcon: {
//     height: hp(4.5),
//     width: wp(10),
//   },
//   headerTitleContainer: {
//     position: 'absolute',
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     color: '#000000',
//     fontFamily: 'Poppins-SemiBold',
//     fontWeight: '600',
//     fontSize: hp(3),
//   },
//   searchContainer: {
//     marginBottom: hp(2),
//     marginTop: hp(1),
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: wp(8),
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'center',
//     borderRadius: wp(2),
//     paddingVertical: hp(0.5),
//   },
//   searchIcon: {
//     height: hp(3),
//     width: wp(6),
//     position: 'absolute',
//     zIndex: 11,
//     marginLeft: wp(2),
//   },
//   searchInput: {
//     backgroundColor: '#FFFFFF',
//     fontSize: hp(2.2),
//     borderRadius: wp(5),
//     color: '#000000',
//     width: wp(85),
//     paddingLeft: wp(10),
//     paddingRight: wp(3),
//     fontFamily: 'Poppins-Regular',
//   },
//   cardContainer: {
//     marginHorizontal: wp(2),
//     width: wp(80),
//     paddingVertical: hp(1),
//     borderRadius: wp(3),
//     backgroundColor: '#F2E8CF',
//     marginBottom: hp(2),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(3),
//   },
//   profileImage: {
//     height: hp(7),
//     width: wp(14),
//     borderRadius: wp(100),
//     resizeMode: 'cover',
//   },
//   nameText: {
//     fontSize: hp(2),
//     fontFamily: 'Poppins-Medium',
//     color: '#1F260F',
//   },
//   phoneText: {
//     fontSize: hp(1.6),
//     fontFamily: 'Poppins-Medium',
//     color: '#4E5927',
//   },
//   arrowIcon: {
//     height: hp(2.5),
//     width: wp(5),
//   },
//   footerContainer: {
//     position: 'absolute',
//     bottom: hp(4),
//     alignSelf: 'center',
//     borderRadius: wp(10),
//   },
// });

// export default FamilyMemberDetails;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from '../components/Footer';
import leftback from '../provider/png/leftback.png';
import search from '../provider/png/search.png';
import rightpage from '../provider/png/rightpage.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import user from '../provider/png/user.png';
import {BASE_URL} from '../api/ApiInfo';
import {getData, async_keys} from '../api/UserPreference';

const FamilyMemberDetails = props => {
  const [token, setToken] = useState('');
  const [searchText, setSearchText] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchTokenAndUserData = async () => {
      try {
        const storedToken = await getData(async_keys.auth_token);
        const storedUserData = await getData(async_keys.user_data);

        if (storedToken) {
          setToken(storedToken);
        }

        if (storedUserData) {
          setUserData(storedUserData);
          fetchFamilyMembers(storedUserData);
        }
      } catch (error) {
        console.error('Error fetching token or user data:', error);
        setError('Failed to load user data');
        setLoading(false);
      }
    };

    fetchTokenAndUserData();
  }, []);

  const fetchFamilyMembers = async userData => {
    try {
      setLoading(true);
      setError(null);

      // Construct query parameters based on available data
      // let queryParams = [];

      // if (userData.PR_FATHER_ID) {
      //   queryParams.push(`father_id=${userData.PR_FATHER_ID}`);
      // }

      // if (userData.PR_MOTHER_ID) {
      //   queryParams.push(`mother_id=${userData.PR_MOTHER_ID}`);
      // }

      // // Fallback to current user ID if no parent IDs available
      // if (queryParams.length === 0 && userData.PR_ID) {
      //   queryParams.push(`id=${userData.PR_ID}`);
      // }
      let queryParams = [];

      // Include both father_id and mother_id if available
      if (userData.PR_FATHER_ID && userData.PR_MOTHER_ID) {
        queryParams.push(`father_id=${userData.PR_FATHER_ID}`);
        queryParams.push(`mother_id=${userData.PR_MOTHER_ID}`);
      } else if (userData.PR_FATHER_ID) {
        queryParams.push(`father_id=${userData.PR_FATHER_ID}`);
      } else if (userData.PR_MOTHER_ID) {
        queryParams.push(`mother_id=${userData.PR_MOTHER_ID}`);
      } else if (userData.PR_ID) {
        // Fallback to current user's ID
        queryParams.push(`id=${userData.PR_ID}`);
      }

      if (queryParams.length === 0) {
        throw new Error('No family identifiers found');
      }

      const response = await fetch(
        `${BASE_URL}users/family-members?${queryParams.join('&')}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch family members');
      }

      const filteredMembers = (data.familyMembers || []).filter(
        member => member.PR_ID !== userData.PR_ID,
      );

      setFamilyMembers(filteredMembers);
    } catch (error) {
      console.error('Error fetching family members:', error);
      setError(error.message || 'Failed to load family members');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = familyMembers.filter(item =>
    item.PR_FULL_NAME?.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={[style.MainContainer, style.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[style.MainContainer, style.errorContainer]}>
        <Text style={style.errorText}>{error}</Text>
        <TouchableOpacity
          style={style.retryButton}
          onPress={() => userData && fetchFamilyMembers(userData)}>
          <Text style={style.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={style.MainContainer}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#BDD9F2', '#F0F2F2']}
            style={{flex: 1}}>
            {/* Top Header */}
            <View style={style.headerContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
                <Image
                  source={leftback}
                  style={style.backIcon}
                  tintColor={'#000000'}
                />
              </TouchableOpacity>

              <View style={style.headerTitleContainer}>
                <Text style={style.headerTitle}>Family Details</Text>
              </View>
            </View>

            {/* Search Bar */}
            <View style={style.searchContainer}>
              <Image source={search} style={style.searchIcon} />
              <TextInput
                placeholder="Search family members..."
                placeholderTextColor={'#000000'}
                numberOfLines={1}
                value={searchText}
                onChangeText={setSearchText}
                style={style.searchInput}
              />
            </View>

            {/* List */}
            <View
              style={{
                marginTop: hp(1.5),
                alignItems: 'center',
                paddingBottom: hp(10),
              }}>
              {filteredData.length === 0 ? (
                <Text style={style.noResultsText}>
                  {searchText
                    ? 'No matching family members found'
                    : 'No family members found'}
                </Text>
              ) : (
                <FlatList
                  data={filteredData}
                  keyExtractor={item => item.PR_ID.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('MemberDetailDescription', {
                          member: item,
                        })
                      }
                      style={style.cardContainer}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={
                            item.PR_PHOTO_URL && item.PR_PHOTO_URL !== ' '
                              ? {uri: item.PR_PHOTO_URL}
                              : user
                          }
                          style={style.profileImage}
                        />

                        <View style={{marginLeft: wp(5)}}>
                          <Text style={style.nameText}>
                            {item.PR_FULL_NAME}
                          </Text>
                          <Text style={style.phoneText}>
                            {item.PR_MOBILE_NO}
                          </Text>
                          {item.Profession && (
                            <Text style={style.professionText}>
                              {item.Profession.PR_PROFESSION_NAME}
                            </Text>
                          )}
                        </View>
                      </View>

                      <Image
                        source={rightpage}
                        tintColor={'grey'}
                        style={style.arrowIcon}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </ImageBackground>

      {/* Footer */}
      <View style={style.footerContainer}>
        <Footer title="Directory" />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F2',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F2F2',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: hp(2),
    marginBottom: hp(2),
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#BDD9F2',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: wp(2),
  },
  retryButtonText: {
    color: '#000',
    fontSize: hp(2),
    fontWeight: '600',
  },
  noResultsText: {
    fontSize: hp(2),
    color: '#555',
    marginTop: hp(5),
    textAlign: 'center',
  },
  headerContainer: {
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  backIcon: {
    height: hp(4.5),
    width: wp(10),
  },
  headerTitleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: hp(3),
  },
  searchContainer: {
    marginBottom: hp(2),
    marginTop: hp(1),
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
  },
  searchIcon: {
    height: hp(3),
    width: wp(6),
    position: 'absolute',
    zIndex: 11,
    marginLeft: wp(2),
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    fontSize: hp(2.2),
    borderRadius: wp(5),
    color: '#000000',
    width: wp(85),
    paddingLeft: wp(10),
    paddingRight: wp(3),
    fontFamily: 'Poppins-Regular',
  },
  cardContainer: {
    marginHorizontal: wp(2),
    width: wp(80),
    paddingVertical: hp(1),
    borderRadius: wp(3),
    backgroundColor: '#F2E8CF',
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  profileImage: {
    height: hp(7),
    width: wp(14),
    borderRadius: wp(100),
    resizeMode: 'cover',
  },
  nameText: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
    color: '#1F260F',
  },
  phoneText: {
    fontSize: hp(1.6),
    fontFamily: 'Poppins-Medium',
    color: '#4E5927',
  },
  professionText: {
    fontSize: hp(1.5),
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: hp(0.3),
  },
  arrowIcon: {
    height: hp(2.5),
    width: wp(5),
  },
  footerContainer: {
    position: 'absolute',
    bottom: hp(4),
    alignSelf: 'center',
    borderRadius: wp(10),
  },
});

export default FamilyMemberDetails;
