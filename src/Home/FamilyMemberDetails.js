// //person name
// //person image
// //person mobile number
// //search
// //edit button

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
// import edit from '../provider/png/edit.png';
// import search from '../provider/png/search.png';
// import call from '../provider/png/call.png';
// import BackgroundImage from '../provider/png/BackgroundImage.png';
// import rightpage from '../provider/png/rightpage.png';
// import MemberDetailDescription from './MemberDetailDescription';
// import {BASE_URL} from '../api/ApiInfo';
// import {getData, async_keys, clearData, storeData} from '../api/UserPreference';

// const FamilyMemberDetails = props => {
//   const data = {
//     Directory: [
//       {
//         id: 2,
//         name: 'Salman Khan',
//         profile: profile1,
//         phonenumber: '5657893241',
//         Relation: 'Father',
//       },
//       {
//         id: 1,
//         name: userData?.PR_FATHER_NAME,
//         profile: profile2,
//         phonenumber: '9834562345',
//         Relation: 'Mother',
//       },
//       {
//         id: 3,
//         name: 'Shah Rukh Khan ',
//         profile: profile1,
//         phonenumber: '9834562345',
//         Relation: 'Child',
//       },
//       {
//         id: 4,
//         name: 'Saif Ali Khan ',
//         profile: profile2,
//         phonenumber: '9894562645',
//         Relation: 'Spouse',
//       },
//       {
//         id: 5,
//         name: 'Fardeen Khan ',
//         profile: profile2,
//         phonenumber: '9894562645',
//         Relation: 'Sibling',
//       },
//     ],
//   };
//   const [token, setToken] = useState('');
//   const [completionPercentage, setCompletionPercentage] = useState(0);
//   const [userData, setUserData] = useState(null);

//   console.log('sjsj', userData);

//   useEffect(() => {
//     fetchUserProfile();
//   }, [token]);

//   useEffect(() => {
//     const fetchToken = async () => {
//       const storedToken = await getData(async_keys.auth_token);
//       setToken(storedToken || 'No Token Found');
//     };

//     fetchToken();
//   }, []);

//   console.log('TOKENNNN', token);

//   const fetchUserProfile = async () => {
//     if (!token) return;
//     try {
//       const response = await fetch(`${BASE_URL}profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (data.success && data.data) {
//         setUserData(data.data);
//       } else {
//         setErrorMessage(data.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       setErrorMessage('Failed to load user data.');
//     }
//   };

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
//             <View
//               style={{
//                 paddingVertical: hp(1),
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginTop: hp(2),
//               }}>
//               <TouchableOpacity
//                 onPress={() => props.navigation.goBack()}
//                 style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
//                 <Image
//                   source={leftback}
//                   style={{height: hp(4.5), width: wp(10)}}
//                   tintColor={'#000000'}
//                 />
//               </TouchableOpacity>

//               <View
//                 style={{
//                   position: 'absolute',
//                   alignSelf: 'center',
//                   justifyContent: 'center',
//                 }}>
//                 <Text
//                   style={{
//                     color: '#000000',
//                     fontFamily: ' Poppins-SemiBold',
//                     fontWeight: '600',
//                     fontSize: hp(3),
//                   }}>
//                   Family Details
//                 </Text>
//               </View>
//             </View>

//             <View
//               style={{
//                 marginBottom: hp(2),
//                 marginTop: hp(1),
//                 backgroundColor: '#FFFFFF',
//                 marginHorizontal: wp(8),
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 alignSelf: 'center',
//                 borderRadius: wp(2),
//                 paddingVertical: hp(0.5),
//               }}>
//               <Image
//                 source={search}
//                 style={{
//                   height: hp(3),
//                   width: wp(6),
//                   position: 'absolute',
//                   zIndex: 11,
//                   marginLeft: wp(2),
//                 }}
//               />
//               <TextInput
//                 placeholder="Search..."
//                 placeholderTextColor={'#000000'}
//                 numberOfLines={1}
//                 style={{
//                   backgroundColor: '#FFFFFF',
//                   fontSize: hp(2.2),
//                   borderRadius: wp(5),
//                   color: '#000000',
//                   width: wp(85),
//                   paddingLeft: wp(10),
//                   paddingRight: wp(3),
//                   fontFamily: 'Poppins-Regular',
//                 }}
//               />
//             </View>

//             <View style={{marginTop: hp(1.5), alignItems: 'center'}}>
//               <FlatList
//                 data={data.Directory}
//                 horizontal={false}
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator={false}
//                 renderItem={({item}) => (
//                   <TouchableOpacity
//                     onPress={() =>
//                       props.navigation.navigate('MemberDetailDescription')
//                     }
//                     style={{
//                       marginHorizontal: wp(2),
//                       marginVertical: wp(0.1),
//                       width: wp(80),
//                       // height: hp(8),
//                       paddingVertical: hp(1),
//                       borderRadius: wp(3),
//                       backgroundColor: '#F2E8CF',
//                       // elevation: 5,
//                       marginBottom: hp(2),
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       paddingHorizontal: wp(3),
//                       alignContent: 'center',
//                     }}>
//                     <View style={{flexDirection: 'row'}}>
//                       <Image
//                         source={item.profile}
//                         style={{
//                           height: hp(7),
//                           width: wp(14),
//                           borderRadius: wp(100),
//                           resizeMode: 'cover',
//                           alignSelf: 'center',
//                         }}
//                       />

//                       <View style={{marginLeft: wp(5)}}>
//                         <Text
//                           style={{
//                             fontSize: hp(2),
//                             fontFamily: 'Poppins-Medium',
//                             color: '#1F260F',
//                           }}>
//                           {item.name}
//                         </Text>

//                         <Text
//                           style={{
//                             fontSize: hp(1.6),
//                             fontFamily: 'Poppins-Medium',
//                             color: '#4E5927',
//                           }}>
//                           {item.phonenumber}
//                         </Text>

//                         <Text
//                           style={{
//                             fontSize: hp(1.6),
//                             fontFamily: 'Poppins-Medium',
//                             color: '#4E5927',
//                           }}>
//                           {item.Relation}
//                         </Text>
//                       </View>
//                     </View>
//                     <Image
//                       source={rightpage}
//                       tintColor={'grey'}
//                       style={{height: hp(2.5), width: wp(5)}}
//                     />
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </LinearGradient>
//         </KeyboardAwareScrollView>
//       </ImageBackground>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: hp(4),
//           alignSelf: 'center',
//           borderRadius: wp(10),
//         }}>
//         <Footer title="Directory" />
//       </View>
//     </SafeAreaView>
//   );
// };

// const style = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//   },
// });

// export default FamilyMemberDetails;

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
import profile1 from '../provider/png/profile1.png';
import profile2 from '../provider/png/profile2.png';
import search from '../provider/png/search.png';
import rightpage from '../provider/png/rightpage.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {BASE_URL} from '../api/ApiInfo';
import user from '../provider/png/user.png';
import {getData, async_keys} from '../api/UserPreference';

const FamilyMemberDetails = props => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [fullName, setFullName] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedToken = await getData(async_keys.auth_token);
        setToken(storedToken || '');

        const userData = await getData(async_keys.user_data);
        if (userData && userData.PR_MOBILE_NO) {
          setMobileNumber(userData.PR_MOBILE_NO);
          setFullName(userData.PR_FULL_NAME);
          setCurrentUserId(userData.PR_ID || '');
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  console.log('QQQQQQQQQ', mobileNumber);

  const directoryData = [];

  const fetchFamilyMembersByMobile = async (mobileNumber, token) => {
    try {
      const response = await fetch(`${BASE_URL}/by-mobile/${mobileNumber}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch family members');
      }

      if (!data.success) {
        throw new Error(data.message || 'No family members found');
      }

      const filterMembers = data.users.filter(
        member => member.PR_ID !== currentUserId,
      );

      // Format the data for your FlatList
      return filterMembers.map(member => ({
        id: member.PR_ID,
        PR_FULL_NAME: member.PR_FULL_NAME,
        PR_PHOTO_URL: member.PR_PHOTO_URL,
        PR_MOBILE_NO: member.PR_MOBILE_NO,
        PR_DOB: member.PR_DOB,
        PR_GENDER: member.PR_GENDER,
        PR_PIN_CODE: member.PR_PIN_CODE,
        PR_AREA_NAME: member.PR_AREA_NAME,
        PR_ADDRESS: member.PR_ADDRESS,
        PR_EDUCATION: member.PR_EDUCATION,
        PR_EDUCATION_DESC: member.PR_EDUCATION_DESC,
        Profesionnn: member.Profession?.PROF_NAME,
        PR_PROFESSION_DETA: member.PR_PROFESSION_DETA,
        PR_FATHER_NAME: member.PR_FATHER_NAME,
        PR_SPOUSE_NAME: member.PR_SPOUSE_NAME,
        PR_MOTHER_NAME: member.PR_MOTHER_NAME,

        PR_BUSS_STREAM: member.PR_BUSS_STREAM,
        PR_BUSS_TYPE: member.PR_BUSS_TYPE,
        PR_BUSS_INTER: member.PR_BUSS_INTER,
        PR_HOBBY: member.PR_HOBBY,
        // memberData: member, // Full data for navigation
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Re-throw to handle in component
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (mobileNumber && token && currentUserId) {
          const users = await fetchFamilyMembersByMobile(mobileNumber, token);
          console.log('Fetched Family Members:', users); // Log all userData
          setFamilyMembers(users); // Store for FlatList
        }
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };

    fetchMembers();
  }, [mobileNumber, token, currentUserId]);

  const filteredData = familyMembers.filter(item =>
    item.PR_FULL_NAME.toLowerCase().includes(searchText.toLowerCase()),
  );

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
                placeholder="Search..."
                placeholderTextColor={'#000000'}
                numberOfLines={1}
                value={searchText}
                onChangeText={setSearchText}
                style={style.searchInput}
              />
            </View>

            {/* List */}
            <View style={{marginTop: hp(1.5), alignItems: 'center'}}>
              <FlatList
                data={filteredData}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('MemberDetailDescription', {
                        member: item,
                      })
                    }
                    style={style.cardContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={
                          item.PR_PHOTO_URL && item.PR_PHOTO_URL !== ' '
                            ? {uri: item.PR_PHOTO_URL}
                            : user
                        }
                        style={style.profileImage}
                      />

                      <View style={{marginLeft: wp(5)}}>
                        <Text style={style.nameText}>{item.PR_FULL_NAME}</Text>
                        <Text style={style.phoneText}>{item.PR_MOBILE_NO}</Text>
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
