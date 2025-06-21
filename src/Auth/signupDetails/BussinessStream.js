// import {React, useState, useMemo, useEffect, useContext} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   ScrollView,
// } from 'react-native';

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {ProfileDataContext} from '../ProfileDataContext';
// import AppLoader from '../../components/AppLoader';
// import {SignupDataContext} from '../SignupDataContext';
// import {BASE_URL} from '../../api/ApiInfo';
// import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
// import LinearGradient from 'react-native-linear-gradient';
// import {useTranslation} from 'react-i18next';
// const BussinessStream = ({pageName = 'signup'}) => {
//   const [apiLoader, setApiLoader] = useState(false);

//   const [business, setBusiness] = useState([]);

//   const {BUSSSTREAM, setBUSSSTREAM} = useContext(SignupDataContext) || {};
//   const [loading, setLoading] = useState(true);

//   const {t} = useTranslation();

//   useEffect(() => {
//     const fetchBusinessStream = async () => {
//       // setApiLoader(true);
//       setLoading(true);
//       try {
//         const response = await fetch(
//           // 'https://node2-plum.vercel.app/api/user/business',
//           `${BASE_URL}/business`,
//         );
//         const result = await response.json();
//         // console.log('Fetched Bussiness:', result.Business);

//         if (Array.isArray(result.Business) && result.Business.length > 0) {
//           const formattedData = result.Business.filter(
//             item => item.BUSS_STREM && item.BUSS_STREM.trim() !== '',
//           ).map(item => ({
//             id: String(item.BUSS_ID),
//             text: String(item.BUSS_STREM),
//           }));
//           setBusiness(formattedData);
//         } else {
//           console.warn('No valid Business Strem data found.');
//         }
//       } catch (error) {
//         console.error('Error fetching Business:', error);
//       } finally {
//         // setApiLoader(false);
//         setLoading(false);
//       }
//     };

//     fetchBusinessStream();
//   }, []);

//   const handleStreamSelection = value => {
//     if (BUSSSTREAM !== value) {
//       console.log('Selected Stream:', value);
//       setBUSSSTREAM(value); // ✅ Updates the value properly
//     }
//   };
//   useEffect(() => {
//     if (BUSSSTREAM) {
//       setBUSSSTREAM(BUSSSTREAM);
//     }
//   }, [BUSSSTREAM]);

//   const renderShimmer = () => {
//     return [1, 2, 3, 4, 5].map((_, index) => (
//       <ShimmerPlaceholder
//         key={`shimmer-${index}`}
//         LinearGradient={LinearGradient}
//         style={{
//           height: hp(5.5),
//           width: wp(81),
//           margin: wp(2),
//           borderRadius: wp(2),
//           marginBottom: hp(1),
//         }}
//       />
//     ));
//   };

//   return (
//     <ScrollView
//       horizontal={false}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{flexGrow: 1}}
//       nestedScrollEnabled={true}
//       style={{
//         flex: 1,
//         backgroundColor: 'rgba(197, 206, 217, 0.7)',
//         padding: hp(2),
//         marginBottom: hp(1.5),
//         borderRadius: wp(5),
//         marginTop: hp(3),
//       }}>
//       {/* <AppLoader loading={apiLoader} /> */}

//       <View style={{marginTop: hp(2), width: wp(83)}}>
//         <Text
//           style={{
//             fontSize: hp(2.5),
//             fontFamily: 'Poppins-Medium',
//             alignSelf: 'center',
//             color: '#000000',
//           }}>
//           {t('BussStream.Business Stream')}
//         </Text>

//         <View style={{marginBottom: hp(10)}}>
//           <Text
//             style={{
//               marginLeft: wp(1),
//               color: '#000000',
//               fontFamily: 'Poppins-Medium',
//               fontSize: hp(2),
//               marginTop: hp(3),
//             }}>
//             {t('BussStream.Select your Business Stream')}
//           </Text>

//           {loading ? (
//             renderShimmer()
//           ) : (
//             <FlatList
//               removeClippedSubviews={false}
//               data={business}
//               horizontal={false}
//               extraData={BUSSSTREAM}
//               keyExtractor={item => item.id}
//               style={{marginTop: hp(1.5)}}
//               renderItem={({item}) => (
//                 <TouchableOpacity
//                   style={{
//                     // backgroundColor: '#697368',
//                     backgroundColor:
//                       BUSSSTREAM === item.text ? '#0468BF' : '#697368',
//                     height: hp(5.5),
//                     width: wp(81),
//                     alignSelf: 'center',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     marginVertical: hp(1),
//                     borderRadius: wp(2),
//                   }}
//                   onPress={() => handleStreamSelection(item.text)}>
//                   <Text
//                     style={{
//                       fontSize: hp(2),
//                       fontFamily: 'Poppins-Medium',
//                       color: '#FFFFFF',
//                     }}>
//                     {item.text}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: hp(1),
//   },
//   label: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#000',
//   },
//   dropdown1: {
//     height: hp(6),
//     width: wp(88),
//     elevation: 5,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: wp(5),
//     borderRadius: wp(2),
//     color: 'black',
//     // fontSize: hp(2),
//     fontFamily: 'Poopins-Medium',
//   },
//   icon1: {
//     marginRight: 5,
//   },
//   placeholderStyle1: {
//     // fontSize: hp(1.8),
//     color: '#8C8C8C',
//     fontSize: hp(2),
//     fontFamily: 'Poppins-Medium',
//   },
//   selectedTextStyle1: {
//     color: 'black',
//     fontSize: hp(2),
//     fontFamily: 'Poppins-Medium',
//   },
//   iconStyle1: {
//     width: hp(3.5),
//     height: wp(7),
//     // paddingRight: wp(1)
//   },
//   inputSearchStyle1: {
//     height: 0,
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//     fontSize: hp(2),
//   },
// });
// export default BussinessStream;

import {React, useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SignupDataContext} from '../SignupDataContext';
import {BASE_URL} from '../../api/ApiInfo';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import i18n from '../../components/i18n';
import {getData, async_keys} from '../../api/UserPreference';

const BussinessStream = ({pageName = 'signup'}) => {
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true);
  const [langCode, setLangCode] = useState('en');

  const {BUSSSTREAM, setBUSSSTREAM} = useContext(SignupDataContext) || {};
  const {t} = useTranslation();

  const fetchBusinessStream = useCallback(async languageCode => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/business?lang_code=${languageCode}`,
      );
      const result = await response.json();

      if (
        result.success &&
        Array.isArray(result.businesses) &&
        result.businesses.length > 0
      ) {
        const formattedData = result.businesses
          .filter(item => item.BUSS_STREM && item.BUSS_STREM.trim() !== '')
          .map(item => ({
            id: String(item.BUSS_ID),
            text: String(item.BUSS_STREM),
          }));
        setBusiness(formattedData);
      } else {
        console.warn('No valid business data found:', result.message);
        setBusiness([]);
      }
    } catch (error) {
      console.error('Error fetching business:', error);
      setBusiness([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial language preference
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLangCode = await getData(async_keys.language_code);
        if (savedLangCode) {
          setLangCode(savedLangCode);
          fetchBusinessStream(savedLangCode);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguagePreference();
  }, [fetchBusinessStream]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = newLang => {
      setLangCode(newLang);
      fetchBusinessStream(newLang);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [fetchBusinessStream]);

  const handleStreamSelection = value => {
    if (BUSSSTREAM !== value) {
      setBUSSSTREAM(value);
    }
  };

  const renderShimmer = () => {
    return [1, 2, 3, 4, 5].map((_, index) => (
      <ShimmerPlaceholder
        key={`shimmer-${index}`}
        LinearGradient={LinearGradient}
        style={{
          height: hp(5.5),
          width: wp(81),
          margin: wp(2),
          borderRadius: wp(2),
          marginBottom: hp(1),
        }}
      />
    ));
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          flex: 1,
          backgroundColor: 'rgba(197, 206, 217, 0.7)',
          padding: hp(2),
          marginBottom: hp(1.5),
          borderRadius: wp(5),
          marginTop: hp(3),
        }}>
        <View style={{marginTop: hp(2), width: wp(83)}}>
          <Text
            style={{
              fontSize: hp(2.5),
              fontFamily: 'Poppins-Medium',
              alignSelf: 'center',
              color: '#000000',
            }}>
            {t('BussStream.Business Stream')}
          </Text>

          <View style={{marginBottom: hp(10)}}>
            <Text
              style={{
                marginLeft: wp(1),
                color: '#000000',
                fontFamily: 'Poppins-Medium',
                fontSize: hp(2),
                marginTop: hp(3),
              }}>
              {t('BussStream.Select your Business Stream')}
            </Text>

            {loading ? (
              renderShimmer()
            ) : business.length > 0 ? (
              <FlatList
                data={business}
                keyExtractor={item => item.id}
                style={{marginTop: hp(1.5)}}
                scrollEnabled={false} // This prevents nested scrolling
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        BUSSSTREAM === item.text ? '#0468BF' : '#697368',
                      height: hp(5.5),
                      width: wp(81),
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: hp(1),
                      borderRadius: wp(2),
                    }}
                    onPress={() => handleStreamSelection(item.text)}>
                    <Text
                      style={{
                        fontSize: hp(2),
                        fontFamily: 'Poppins-Medium',
                        color: '#FFFFFF',
                      }}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: hp(2),
                  color: '#000',
                  fontFamily: 'Poppins-Medium',
                }}>
                {t('BussStream.No business streams available')}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  dropdown1: {
    height: hp(6),
    width: wp(88),
    elevation: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    color: 'black',
    fontFamily: 'Poopins-Medium',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    color: '#8C8C8C',
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
  },
  iconStyle1: {
    width: hp(3.5),
    height: wp(7),
  },
  inputSearchStyle1: {
    height: 0,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2),
  },
});

export default BussinessStream;
