// import {React, useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ImageBackground,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import leftback from '../provider/png/leftback.png';
// import BackgroundImage from '../provider/png/BackgroundImage.png';
// import i18n from '../components/i18n';
// import {getData, async_keys} from '../api/UserPreference';
// // import {useSelector} from 'react-redux';
// import axios from 'axios';
// import {ActivityIndicator} from 'react-native-paper';
// import {BASE_URL} from '../api/ApiInfo';

// const Aboutus = props => {
//   const [aboutData, setAboutData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [langCode, setLangCode] = useState('en');

//   useEffect(() => {
//     loadLanguagePreference();
//   }, []);

//   useEffect(() => {
//     const handleLanguageChange = newLang => {
//       setLangCode(newLang);
//       fetchAboutUsData(newLang);
//     };

//     i18n.on('languageChanged', handleLanguageChange);
//     return () => {
//       i18n.off('languageChanged', handleLanguageChange);
//     };
//   }, []);

//   const loadLanguagePreference = async () => {
//     try {
//       const savedLangCode = await getData(async_keys.language_code);
//       if (savedLangCode) {
//         setLangCode(savedLangCode);
//         fetchAboutUsData(savedLangCode);
//       }
//     } catch (error) {
//       console.error('Error loading language preference:', error);
//       fetchAboutUsData('en'); // Fallback to English
//     }
//   };

//   const fetchAboutUsData = async languageCode => {
//     try {
//       setLoading(true);
//       const url = `https://node2-plum.vercel.app/api/admin/v1/pages/${languageCode}/about-us`;
//       console.log('Fetching data from:', url); // Debugging log

//       const response = await axios.get(url, {
//         timeout: 10000, // 10 seconds timeout
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('About Us API Response:', response.data);

//       if (response.data && response.data.data) {
//         setAboutData(response.data.data);
//         setError(null);
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (err) {
//       console.error('Error fetching about us data:', err);
//       let errorMessage = 'Failed to load content. Please try again.';

//       if (err.response) {
//         // Server responded with a status code outside 2xx
//         if (err.response.status === 404) {
//           errorMessage = 'Page not found. Please check the URL.';
//         } else if (err.response.status === 500) {
//           errorMessage = 'Server error. Please try again later.';
//         }
//       } else if (err.request) {
//         // Request was made but no response received
//         errorMessage = 'Network error. Please check your connection.';
//       }

//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView
//         style={[
//           style.MainContainer,
//           {justifyContent: 'center', alignItems: 'center'},
//         ]}>
//         <ActivityIndicator size="large" color="#000000" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView
//         style={[
//           style.MainContainer,
//           {justifyContent: 'center', alignItems: 'center'},
//         ]}>
//         <Text style={{color: '#000000', fontSize: hp(2)}}>{error}</Text>
//         <TouchableOpacity
//           onPress={() => fetchAboutUsData(langCode)}
//           style={{marginTop: hp(2)}}>
//           <Text
//             style={{
//               color: '#1F260F',
//               fontSize: hp(2),
//               textDecorationLine: 'underline',
//             }}>
//             Retry
//           </Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={style.MainContainer}>
//       <ImageBackground
//         source={BackgroundImage}
//         style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
//         <LinearGradient
//           start={{x: 1, y: 1.7}}
//           end={{x: 0.2, y: 0}}
//           // colors={['#D98471', '#FFFFFF']}
//           colors={['#BDD9F2', '#F0F2F2']}
//           style={{flex: 1}}>
//           <View
//             style={{
//               paddingVertical: hp(1),
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginTop: hp(2),
//             }}>
//             <TouchableOpacity
//               onPress={() => props.navigation.goBack()}
//               style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
//               <Image
//                 source={leftback}
//                 style={{height: hp(4.5), width: wp(10)}}
//                 tintColor={'#000000'}
//               />
//             </TouchableOpacity>

//             <View
//               style={{
//                 position: 'absolute',
//                 alignSelf: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Text
//                 style={{
//                   color: '#000000',
//                   fontFamily: ' Poppins-SemiBold',
//                   fontWeight: '600',
//                   fontSize: hp(3),
//                 }}>
//                 About Us
//               </Text>
//             </View>
//           </View>

//           <KeyboardAwareScrollView
//             keyboardShouldPersistTaps="handled"
//             bounces={false}
//             style={{flex: 1}}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{flexGrow: 1}}>
//             {/* <View>
//                  <View style ={{ marginBottom: hp(5), alignSelf: "center", justifyContent: "center"}}>
//                   <Text style={{alignSelf: "center", marginTop: hp(1.5), fontSize: hp(2.4), fontFamily: "Poppins-Medium", color: "#1F260F"}}>Rangrez About Us</Text>
//                <View style={{alignSelf: "center", justifyContent: "center", marginHorizontal: wp(3), marginTop: hp(2)}}>
//                <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500",  textAlign: "center", lineHeight: hp(2.8) }}>
//                The Rangrej Samaj Rajasthan is a vibrant community bound by a shared heritage, values, and a collective vision for growth and prosperity. For generations, the Rangrej community has been renowned for its mastery of color, celebrated for infusing fabrics with vibrancy and life through the traditional art of dyeing and design. This ancestral craft symbolizes our enduring commitment to spreading joy and harmony within society.
//                {'\n'}

// </Text>
// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", marginTop: hp(2), textAlign: "center", lineHeight: hp(2.8) }}>
// While honoring our rich legacy, the Rangrej Samaj strives to empower its members with opportunities for education, social welfare, and economic progress. We are dedicated to fostering a brighter and more sustainable future for our community by blending tradition with innovation.

//                </Text>

//                <Text style={{fontSize: hp(2.4), color: "#1F260F", fontFamily: "Poppins-SemiBold",  marginTop: hp(4), alignSelf: "center"}}>Vision</Text>
//                <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "center", lineHeight: hp(2.8), marginTop: hp(1.5) }}>
//                At the heart of our mission is a commitment to advancing education as the cornerstone of progress. In line with this vision, we are embarking on transformative initiatives to uplift our community:

// </Text>

// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "center", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
// While honoring our rich legacy, the Rangrej Samaj strives to empower its members with opportunities for education, social welfare, and economic progress. We are dedicated to fostering a brighter and more sustainable future for our community by blending tradition with innovation.

//                </Text>

//                <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
//              1.  Modern Islamic School and Hostel: Establishing educational institutions to provide quality learning environments that nurture young minds with knowledge and values.{'\n'}
//              </Text>
//              <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", marginTop: hp(2) }}>
// 2.  Healthcare for All: In our second phase, we aim to build a state-of-the-art hospital to ensure accessible and affordable healthcare for our community members and beyond.{'\n'}
// </Text>
// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500",textAlign: "center", lineHeight: hp(2.8), marginTop: hp(2.5)}}>
// Through these endeavors, we aspire to create a self-sustaining and prosperous society driven by education, health, and unity.
// </Text>

// <Text style={{fontSize: hp(2.4), color: "#1F260F", fontFamily: "Poppins-SemiBold",  marginTop: hp(4), alignSelf: "center"}}>What We Offer</Text>

// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
//              1.  Community Engagement: A platform to connect and unite members across various regions, fostering a sense of belonging and shared purpose.{'\n'}
//              </Text>
//              <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
// 2.  Education Advocacy: Initiatives to promote learning opportunities, especially for the younger generation.{'\n'}
// </Text>
// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
// 3.  Economic Empowerment: Support for startups, business interests, and skill development through Zakat fund collections and other resources.

// </Text>

// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5)}}>
// 4.  Social Welfare: Programs focused on healthcare, pension counseling, and government opportunities to uplift the community.

// </Text>

//                </View>
//                </View>

//             </View> */}
//           </KeyboardAwareScrollView>
//         </LinearGradient>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const style = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//   },
// });

// export default Aboutus;

import {React, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import i18n from '../components/i18n';
import {getData, async_keys} from '../api/UserPreference';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import RenderHtml from 'react-native-render-html';

const Aboutus = props => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [langCode, setLangCode] = useState('en');

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    const handleLanguageChange = newLang => {
      setLangCode(newLang);
      fetchAboutUsData(newLang);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const savedLangCode = await getData(async_keys.language_code);
      if (savedLangCode) {
        setLangCode(savedLangCode);
        fetchAboutUsData(savedLangCode);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
      fetchAboutUsData('en'); // Fallback to English
    }
  };

  const fetchAboutUsData = async languageCode => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://node2-plum.vercel.app/api/admin/v1/pages/${languageCode}/about-us`,
      );

      if (response.data.success) {
        setAboutData(response.data.data);
        setError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch content');
      }
    } catch (err) {
      console.error('Error fetching about us data:', err);
      setError(
        err.response?.data?.message ||
          'Failed to load content. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const tagsStyles = {
    p: {
      color: '#000',
      fontSize: hp(1.7),
      marginTop: hp(1.2), // Top spacing
      marginBottom: hp(1.2),
      fontWeight: '500',
      letterSpacing: hp(0.1),

      // marginTop: hp(0.1),
      width: wp(86),
      marginLeft: wp(2),
      fontFamily: 'Poppins-Medium',
      // maxHeight: hp(5), // Adjust this value based on your font size and line height
      // overflow: 'hidden',
    },
    strong: {
      fontWeight: '500',
      fontFamily: 'Poppins-Medium',
    },
    // Add other HTML tag styles as needed for your content
    h1: {
      fontSize: hp(2),
      fontWeight: 'bold',
      color: '#000',
      fontFamily: 'Poppins-SemiBold',
    },
    ul: {
      marginLeft: wp(5),
    },
    li: {
      color: '#000',
      fontSize: hp(1.7),
      fontFamily: 'Poppins-Regular',
    },
  };

  const renderContentSections = () => {
    if (!aboutData?.content_sections?.length) return null;

    return aboutData.content_sections.map((section, index) => (
      <View key={`section-${index}`} style={styles.sectionContainer}>
        {section.title && (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        {section.description && (
          <RenderHtml
            contentWidth={wp(90)}
            source={{html: section.description}}
            baseStyle={styles.htmlContent}
            tagsStyles={tagsStyles}
          />
        )}
      </View>
    ));
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.MainContainer, styles.centerContainer]}>
        <ActivityIndicator size="large" color="#000000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.MainContainer, styles.centerContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          onPress={() => fetchAboutUsData(langCode)}
          style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          colors={['#BDD9F2', '#F0F2F2']}
          style={styles.gradient}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={leftback}
                style={styles.backIcon}
                tintColor={'#000000'}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>About Us</Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {renderContentSections()}
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
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    height: hp(100),
    width: wp(100),
    opacity: 0.85,
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: hp(2.3),
  },
  backIcon: {
    height: hp(4.5),
    width: wp(10),
  },
  titleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: hp(3),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(5),
  },
  sectionContainer: {
    marginBottom: hp(3),
    paddingHorizontal: wp(5),
    marginTop: hp(4),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontFamily: 'Poppins-SemiBold',
    color: '#1F260F',
    alignSelf: 'center',
    marginBottom: hp(1),
  },
  htmlContent: {
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Regular',
    lineHeight: hp(2.8),
    color: '#000000',
  },
  errorText: {
    color: '#000000',
    fontSize: hp(2),
    textAlign: 'center',
    marginHorizontal: wp(5),
  },
  retryButton: {
    marginTop: hp(2),
  },
  retryText: {
    color: '#1F260F',
    fontSize: hp(2),
    textDecorationLine: 'underline',
  },
});

export default Aboutus;
