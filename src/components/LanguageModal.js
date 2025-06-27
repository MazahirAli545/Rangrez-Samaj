import React, {useEffect, useCallback, useRef} from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import i18n from '../components/i18n';
import {async_keys, getData, storeData} from '../api/UserPreference';
import {BASE_URL} from '../api/ApiInfo';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const LanguageModal = ({visible, setVisible, lang, setLang}) => {
  const languages = ['ENGLISH', 'हिंदी'];

  const isMounted = useRef(false);

  const languageMap = {
    हिंदी: 'hi',
    ENGLISH: 'en',
  };

  // Function to update language on the server
  const updateLanguageOnServer = useCallback(async (pr_id, languageCode) => {
    try {
      const response = await fetch(`${BASE_URL}language`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          pr_id: pr_id.toString(),
        },
        body: JSON.stringify({PR_LANG: languageCode}),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data?.success) {
        console.warn('Server reported language update failure:', data?.message);
      }
      return data.success;
    } catch (serverError) {
      console.error('Server language update failed:', serverError);
      return false;
    }
  }, []);

  // Function to get language from the server
  const getLanguageFromServer = useCallback(async pr_id => {
    try {
      const response = await fetch(`${BASE_URL}language`, {
        method: 'GET',
        headers: {
          pr_id: pr_id.toString(),
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (data?.success && data?.data?.PR_LANG) {
        return data.data.PR_LANG;
      }
      console.warn(
        'Server reported language fetch failure or no language found:',
        data?.message,
      );
      return null;
    } catch (serverError) {
      console.error('Server language fetch failed:', serverError);
      return null;
    }
  }, []);

  // Handle language selection
  const handleLanguageSelect = useCallback(
    async language => {
      try {
        if (!language) {
          throw new Error('Please select a language');
        }

        const selectedLangCode = languageMap[language] || 'en';
        const currentLang = await getData(async_keys.language);

        // Immediately update UI state for better responsiveness
        setLang(language);
        setVisible(false); // Close modal immediately

        // Only proceed with storage and server updates if language actually changed
        if (currentLang !== language) {
          // Update local storage
          await Promise.all([
            storeData(async_keys.language, language),
            storeData(async_keys.language_code, selectedLangCode),
          ]);

          // Update i18n
          i18n.changeLanguage(selectedLangCode);

          let pr_id = await getData(async_keys.PR_ID);
          if (!pr_id) {
            const userData = await getData(async_keys.user_data);
            pr_id = userData?.PR_ID; // Ensure this matches the key in user_data
            if (pr_id) {
              await storeData(async_keys.PR_ID, pr_id);
            }
          }

          // if (pr_id) {
          //   await updateLanguageOnServer(pr_id, selectedLangCode);
          // }

          // Alert.alert(
          //   language === 'हिंदी' ? 'सफलता' : 'Success',
          //   language === 'हिंदी'
          //     ? 'भाषा सफलतापूर्वक बदल दी गई है'
          //     : 'Language changed successfully',
          // );
        }
      } catch (error) {
        console.error('Language change error:', error);
        try {
          const storedLang = await getData(async_keys.language);
          if (storedLang) setLang(storedLang);
        } catch (revertError) {
          console.error('Failed to revert language:', revertError);
        }
        Alert.alert(
          language === 'हिंदी' ? 'त्रुटि' : 'Error',
          error.message ||
            (language === 'हिंदी'
              ? 'भाषा बदलने में विफल'
              : 'Failed to change language'),
        );
      }
    },
    [setLang, setVisible, updateLanguageOnServer, languageMap],
  );

  // Effect to load language from server on component mount or user data change
  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    const loadLanguage = async () => {
      let pr_id = await getData(async_keys.PR_ID);

      // If PR_ID not found, try to get it from user_data
      if (!pr_id) {
        const userData = await getData(async_keys.user_data);
        pr_id = userData?.PR_ID; // Ensure this matches the key in user_data
        if (pr_id) {
          await storeData(async_keys.PR_ID, pr_id);
        }
      }

      if (pr_id) {
        const serverLangCode = await getLanguageFromServer(pr_id);
        if (serverLangCode) {
          const serverLangName = Object.keys(languageMap).find(
            key => languageMap[key] === serverLangCode,
          );
          if (serverLangName) {
            setLang(serverLangName);
            await Promise.all([
              storeData(async_keys.language, serverLangName),
              storeData(async_keys.language_code, serverLangCode),
            ]);
            i18n.changeLanguage(serverLangCode);
          }
        }
      } else {
        // If no PR_ID even after trying user_data, load from local storage
        const storedLang = await getData(async_keys.language);
        if (storedLang) {
          setLang(storedLang);
          const storedLangCode = await getData(async_keys.language_code);
          if (storedLangCode) {
            i18n.changeLanguage(storedLangCode);
          }
        }
      }
    };

    loadLanguage();
  }, [getLanguageFromServer, setLang, languageMap]);

  return (
    // <SafeAreaView style={{}}>
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      // onBackdropPress={() => setVisible(false)}
      // onRequestClose={() => setVisible(false)}
      style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {languages.map(language => (
          <TouchableOpacity
            key={language}
            // onPress={() => {
            //   setLang(language); // This will trigger handleLanguageChange in HomeScreen
            //   setVisible(false);
            // }}
            onPress={() => handleLanguageSelect(language)}
            style={[styles.option, lang === language && styles.selectedOption]}>
            <Text
              style={[
                styles.optionText,
                lang === language && styles.selectedText,
              ]}>
              {language}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // modalContainer: {
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   top: 0,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   zIndex: 100,
  //   // flex: 1,
  // },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: 0, // Important: Ensures full-screen modal without default margins
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6D9C5',
    width: wp(90),
    paddingVertical: hp(2),
    borderRadius: wp(3),
  },
  option: {
    width: wp(80),
    height: hp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderWidth: wp(0.2),
    borderColor: '#FFFFFF',
    marginVertical: hp(1),
    borderRadius: wp(5),
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
    borderRadius: wp(5),
    textAlign: 'center',
    marginVertical: hp(1),
  },
  optionText: {
    fontWeight: '600',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  selectedText: {
    fontWeight: '700',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});

export default LanguageModal;
