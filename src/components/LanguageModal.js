import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import i18n from '../components/i18n';

// const LanguageModal = ({visible, setVisible, lang, setLang}) => {
//   const languages = ['ENGLISH', 'हिंदी'];

//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       animationType="slide"
//       onBackdropPress={() => setVisible(false)}
//       onRequestClose={() => setVisible(false)}
//       style={styles.modalContainer}>
//       <TouchableOpacity
//         style={styles.modalContent}
//         onPress={() => setVisible(false)}>
//         <View>
//           {languages.map(language => (
//             <TouchableOpacity
//               key={language}
//               onPress={() => {
//                 const selectedLang = language === 'ENGLISH' ? 'en' : 'hi';
//                 i18n.changeLanguage(selectedLang);
//                 setLang(language);
//                 setVisible(false);
//               }}
//               style={[
//                 styles.option,
//                 lang === language && styles.selectedOption,
//               ]}>
//               <Text
//                 style={[
//                   styles.optionText,
//                   lang === language && styles.selectedText,
//                 ]}>
//                 {language}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

const LanguageModal = ({visible, setVisible, lang, setLang}) => {
  const languages = ['ENGLISH', 'हिंदी'];

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onBackdropPress={() => setVisible(false)}
      onRequestClose={() => setVisible(false)}
      style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {languages.map(language => (
          <TouchableOpacity
            key={language}
            onPress={() => {
              setLang(language); // This will trigger handleLanguageChange in HomeScreen
              setVisible(false);
            }}
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
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
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
