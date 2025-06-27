// import {React} from 'react';
// import {View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import leftback from '../provider/png/leftback.png';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import BackgroundImage from '../provider/png/BackgroundImage.png';

// const TermsAndConditions = props => {
//   return (
//     <SafeAreaView style={styles.MainContainer}>

//           <ImageBackground source={BackgroundImage} style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
//         <LinearGradient
//           start={{x: 1, y: 1.7}}
//           end={{x: 0.2, y: 0}}
//           // colors={['#ffc09f', '#fcf5c7']}
//           colors={['#BDD9F2', '#F0F2F2']}
//           style={{flex: 1}}>
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
//                         Terms & Conditions
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
//    <Text style={{alignSelf: "center", marginTop: hp(1.5), fontSize: hp(2.4), fontFamily: "Poppins-Medium", color: "#1F260F"}}>Rangrez Terms & Conditions</Text>
// <View style={{alignSelf: "center", justifyContent: "center", marginHorizontal: wp(5), marginTop: hp(2)}}>
// <Text style={{fontSize: hp(1.9), fontFamily: "Poppins-Regular", fontWeight: "500", lineHeight: hp(2.8) }}>Welcome to the Rangrej Samaj App! These Terms and Conditions ("Terms") govern your use of our mobile application and website. By accessing or using our platform, you acknowledge and agree to comply with these Terms. If you do not agree to these Terms, we kindly request that you refrain from using our platform.

// </Text>
// <Text style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium", marginTop: hp(3.5), lineHeight: hp(2.8) }}>1. Acceptance of Terms
// By using the Rangrej Samaj App, you affirm that you are at least 18 years of age or have the consent of a legal guardian. Your continued use of the app constitutes your acceptance of these Terms.</Text>
// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>2. User Registration
// To access certain features, you may be required to register and provide personal information, including your name, contact details, and date of birth. You agree to provide accurate and complete information and to update it as necessary. Each user will be assigned a unique ID upon registration.</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>3. Privacy Policy
// Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. By using our app, you consent to the collection and use of your data in accordance with the Privacy Policy.</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>4. User Conduct
// Users agree not to:

// Violate any applicable laws or regulations.

// Submit false or misleading information.

// Use the platform for any unauthorized or unlawful purpose.

// Interfere with the security or functionality of the platform.</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>5. Intellectual Property
// All content, including text, images, logos, and software, is the property of Rangrej Samaj or its licensors and is protected under copyright laws. Users may not reproduce, distribute, or modify any content without prior written consent.</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>6. Donations and Payments
// The app allows users to make donations and contributions via UPI. By making a donation, you confirm that the funds are your own and that you are authorized to use the payment method provided.</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>7. Limitation of Liability
// Rangrej Samaj is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform. The app is provided "as is" without warranties of any kind.</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>8. Termination
// We reserve the right to suspend or terminate your access to the platform at any time, without notice, for any breach of these Terms.</Text>
// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>9. Amendments
// We may update these Terms from time to time. Continued use of the platform after changes have been made constitutes your acceptance of the revised Terms.</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>10. Governing Law
// These Terms are governed by and construed in accordance with the laws of [Insert Jurisdiction]. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in [Insert Jurisdiction].</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>Contact Us
// If you have any questions or concerns about these Terms, please contact us at: rangrez@gmail.com</Text>

// <Text  style={{fontSize: hp(1.8), color: "#000000", fontFamily: "Poppins-Medium",  marginTop: hp(3.5), lineHeight: hp(2.8) }}>Thank you for using the Rangrej Samaj App!</Text>
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

// export default TermsAndConditions;

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

const TermsAndConditions = props => {
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [langCode, setLangCode] = useState('en');

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    const handleLanguageChange = newLang => {
      setLangCode(newLang);
      fetchTermsData(newLang);
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
        fetchTermsData(savedLangCode);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
      fetchTermsData('en'); // Fallback to English
    }
  };

  const fetchTermsData = async languageCode => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://node2-plum.vercel.app/api/admin/v1/pages/${languageCode}/terms-conditions`,
      );

      if (response.data.success) {
        setTermsData(response.data.data);
        setError(null);
      } else {
        throw new Error(response.data.message || 'Failed to fetch content');
      }
    } catch (err) {
      console.error('Error fetching terms data:', err);
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
    h4: {
      fontSize: hp(2),
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
    a: {
      color: '#1F260F',
      textDecorationLine: 'underline',
    },
  };

  const renderContentSections = () => {
    if (!termsData?.content_sections?.length) return null;

    return termsData.content_sections.map((section, index) => (
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
          onPress={() => fetchTermsData(langCode)}
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
              <Text style={styles.titleText}>Terms & Conditions</Text>
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

export default TermsAndConditions;
