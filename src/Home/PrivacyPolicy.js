// import {React} from 'react';
// import {View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import leftback from '../provider/png/leftback.png';
// import BackgroundImage from '../provider/png/BackgroundImage.png';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const PrivacyPolicy = props => {
//   return (
//     <SafeAreaView style={styles.MainContainer}>
//         <ImageBackground source={BackgroundImage} style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>

//         <LinearGradient
//           start={{x: 1, y: 1.7}}
//           end={{x: 0.2, y: 0}}
//           // colors={['#011F26', '#FFFFFF']}
//           colors={['#BDD9F2', '#F0F2F2']}
//           style={{flex: 1, zIndex:10}}>

//             <View
//                     style={{
//                       paddingVertical: hp(1),
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       marginTop: hp(2),
//                     }}>
//                     <TouchableOpacity
//                       onPress={() => props.navigation.goBack()}
//                       style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
//                       <Image
//                         source={leftback}
//                         style={{height: hp(4.5), width: wp(10)}}
//                         tintColor={'#000000'}
//                       />
//                     </TouchableOpacity>

//                     <View
//                       style={{
//                         position: 'absolute',
//                         alignSelf: 'center',
//                         justifyContent: 'center',
//                       }}>
//                       <Text
//                         style={{
//                           color: '#000000',
//                           fontFamily: ' Poppins-SemiBold',
//                           fontWeight: '600',
//                           fontSize: hp(3),
//                         }}>
//                         Privacy Policy
//                       </Text>
//                     </View>
//                   </View>

//                   <KeyboardAwareScrollView
//         keyboardShouldPersistTaps="handled"
//         bounces={false}
//         style={{flex: 1}}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{flexGrow: 1}}>
//             <View style ={{ marginBottom: hp(5), alignSelf: "flex-start"}}>
//    <Text style={{alignSelf: "center", marginTop: hp(1.5), fontSize: hp(2.4), fontFamily: "Poppins-Medium", color: "#1F260F"}}>Rangrez Privacy Policy</Text>
// <View style={{alignSelf: "center", justifyContent: "center", marginHorizontal: wp(5), marginTop: hp(2)}}>
// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", lineHeight: hp(3) }}>Rangrej Samaj values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our mobile application and website.</Text>

// <Text  style={{fontSize: hp(2), fontFamily: "Poppins-Medium", fontWeight: "700", marginTop: hp(3) }}>How We Use Your Information</Text>
// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Medium", fontWeight: "500", marginTop: hp(1.5), lineHeight: hp(3) }}>We use the collected information for the following purposes:{'\n'}</Text>

// <Text style={{fontSize: hp(1.6), fontFamily: "Poppins-Regular", fontWeight: "500", marginTop: hp(1.5), lineHeight: hp(3) }}>
// To maintain a population registry and generate unique member IDs.{'\n'}

// To facilitate registration, announcements, and member directory services.{'\n'}

// To issue certificates and provide educational, government, and business-related notifications.{'\n'}

// To manage donations, Zakat funds, and track fund allocations.{'\n'}

// To send push notifications about announcements, campaigns, and opportunities.{'\n'}

// To improve user experience and accessibility.{'\n'}

// </Text>

// <Text  style={{fontSize: hp(2), fontFamily: "Poppins-Medium", fontWeight: "700", marginTop: hp(2.1) }}>Sharing Your Information</Text>
// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Medium", fontWeight: "500", marginTop: hp(1.5), lineHeight: hp(3) }}>We do not sell or rent your personal information. However, we may share your information in the following circumstances:</Text>

// <Text style={{fontSize: hp(1.6), fontFamily: "Poppins-Regular", fontWeight: "500", marginTop: hp(1.5), lineHeight: hp(3) }}>
// With Consent: When you explicitly agree to share your information.{'\n'}

// For Legal Compliance: When required by law, regulation, or legal process.{'\n'}

// With Service Providers: To third-party vendors helping us operate and maintain our platform (e.g., payment gateways, hosting services).{'\n'}

// Community Features: Limited details may be visible to registered members through the directory.</Text>

// <Text style={{fontSize: hp(2), fontFamily: "Poppins-Medium", fontWeight: "700", marginTop: hp(2.1) }}> Data Security</Text>

// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Medium", fontWeight: "500", marginTop: hp(1.5) }}>We implement industry-standard measures to secure your data. These include:</Text>

// <Text style={{fontSize: hp(1.6), fontFamily: "Poppins-Regular", fontWeight: "500", marginTop: hp(1.5), lineHeight: hp(3) }}>
// Encryption of sensitive information (e.g., payment details).{'\n'}

// Regular security audits and updates.{'\n'}

// Role-based access control to protect sensitive data.</Text>

// <Text style={{fontSize: hp(2), fontFamily: "Poppins-Medium", fontWeight: "700", marginTop: hp(2.1) }} > Retention of Information</Text>
// <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Medium", fontWeight: "500", marginTop: hp(1.5), lineHeight: hp(3) }}>We retain your information as long as necessary to fulfill the purposes outlined in this policy or as required by law.</Text>
// </View>
// </View>

//              </KeyboardAwareScrollView>

//         </LinearGradient>
//         </ImageBackground>

//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//   },
// });

// export default PrivacyPolicy;
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
import RenderHtml from 'react-native-render-html';

const PrivacyPolicy = props => {
  const [privacyData, setPrivacyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [langCode, setLangCode] = useState('en');

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    const handleLanguageChange = newLang => {
      setLangCode(newLang);
      fetchPrivacyPolicyData(newLang);
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
        fetchPrivacyPolicyData(savedLangCode);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
      fetchPrivacyPolicyData('en'); // Fallback to English
    }
  };

  const fetchPrivacyPolicyData = async languageCode => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://node2-plum.vercel.app/api/admin/v1/pages/${languageCode}/privacy-policy`,
      );

      if (response.data.success) {
        setPrivacyData(response.data.data);
        setError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch content');
      }
    } catch (err) {
      console.error('Error fetching privacy policy data:', err);
      setError(
        err.response?.data?.message ||
          'Failed to load content. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const tagsStyles = {
    body: {
      color: '#000',
      fontSize: hp(1.8),
      fontFamily: 'Poppins-Regular',
      lineHeight: hp(2.8),
    },
    p: {
      marginVertical: hp(1),
      color: '#000',
      fontSize: hp(1.8),
      fontFamily: 'Poppins-Regular',
      lineHeight: hp(2.8),
    },
    h3: {
      fontSize: hp(2.2),
      fontWeight: 'bold',
      color: '#1F260F',
      marginTop: hp(2),
      marginBottom: hp(1),
      fontFamily: 'Poppins-SemiBold',
    },
    strong: {
      fontWeight: 'bold',
      fontFamily: 'Poppins-SemiBold',
    },
    ul: {
      marginLeft: wp(2),
      marginVertical: hp(1),
    },
    li: {
      color: '#000',
      fontSize: hp(1.8),
      marginBottom: hp(1),
      fontFamily: 'Poppins-Regular',
    },
  };

  const renderContentSections = () => {
    if (!privacyData?.content_sections?.length) return null;

    return privacyData.content_sections.map((section, index) => (
      <View key={`section-${index}`} style={styles.sectionContainer}>
        {section.title && (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        {section.description && (
          <RenderHtml
            contentWidth={wp(90)}
            source={{html: section.description}}
            tagsStyles={tagsStyles}
            baseStyle={styles.htmlContent}
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
          onPress={() => fetchPrivacyPolicyData(langCode)}
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
              <Text style={styles.titleText}>Privacy Policy</Text>
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
    paddingHorizontal: wp(3),
  },
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontFamily: 'Poppins-SemiBold',
    color: '#1F260F',
    textAlign: 'center',
    marginBottom: hp(2),
    marginTop: hp(2),
  },
  htmlContent: {
    paddingHorizontal: wp(3),
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

export default PrivacyPolicy;
