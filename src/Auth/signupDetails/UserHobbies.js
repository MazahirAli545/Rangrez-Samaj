import {React, useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BASE_URL} from '../../api/ApiInfo';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import AppLoader from '../../components/AppLoader';
import {ProfileDataContext} from '../ProfileDataContext';
import {SignupDataContext} from '../SignupDataContext';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import i18n from '../../components/i18n';
import {getData, async_keys} from '../../api/UserPreference';

const UserHobbies = ({pageName = 'signup'}) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [updatedHobbies, setUpdatedHobbies] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [langCode, setLangCode] = useState('en'); // Add language state

  const context = useContext(SignupDataContext);
  const {t} = useTranslation();

  const HOBBIES = context?.HOBBIES || [];
  const setHOBBIES = context?.setHOBBIES || (() => {});

  console.log('HHHHHH', HOBBIES);

  // useEffect(() => {
  //   const loadLanguagePreference = async () => {
  //     try {
  //       const savedLangCode = await getData(async_keys.language_code);
  //       if (savedLangCode) {
  //         setLangCode(savedLangCode);
  //       }
  //     } catch (error) {
  //       console.error('Error loading language preference:', error);
  //     }
  //   };

  //   loadLanguagePreference();
  // }, []);

  // useEffect(() => {
  //   const fetchHobbies = async () => {
  //     // setApiLoader(true);
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         // 'https://node2-plum.vercel.app/api/user/hobbies',
  //         `${BASE_URL}/hobbies?lang_code=${langCode}`,
  //       );
  //       const result = await response.json();
  //       // console.log('Fetched Hobbies:', result.hobbies);

  //       if (Array.isArray(result.hobbies) && result.hobbies.length > 0) {
  //         const formattedData = result.hobbies.map(item => ({
  //           id: item.HOBBY_ID,
  //           Image: item.HOBBY_IMAGE_URL,
  //           text: String(item.HOBBY_NAME),
  //         }));
  //         setHobbies(formattedData);

  //         if (updatedHobbies.length > 0) {
  //           setSelectedHobbies(
  //             formattedData
  //               .filter(hobby => updatedHobbies.includes(hobby.text))
  //               .map(hobby => hobby.id),
  //           );
  //         }
  //       } else {
  //         console.warn('No valid Business Strem data found.');
  //         setHobbies([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching Business:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHobbies();
  // }, [langCode]);

  // console.log('ewewe', hobbies);

  // const handleHobbySelection = hobbyId => {
  //   setSelectedHobbies(prevSelectedHobbies => {
  //     let updatedSelection;

  //     if (prevSelectedHobbies.includes(hobbyId)) {
  //       updatedSelection = prevSelectedHobbies.filter(id => id !== hobbyId);
  //     } else {
  //       updatedSelection = [...prevSelectedHobbies, hobbyId];
  //     }

  //     if (setHOBBIES && hobbies.length > 0) {
  //       const selectedHobbyNames = hobbies
  //         .filter(hobby => updatedSelection.includes(hobby.id))
  //         .map(hobby => hobby.text);

  //       console.log('🚀 Selected Hobby Names:', selectedHobbyNames);
  //       setHOBBIES(selectedHobbyNames);
  //     }

  //     return updatedSelection;
  //   });
  // };

  // useEffect(() => {
  //   console.log('Updated HOBBIES in Context:', HOBBIES);
  //   setUpdatedHobbies(HOBBIES);
  // }, [HOBBIES]);

  // useEffect(() => {
  //   if (hobbies.length > 0) {
  //     if (typeof HOBBIES === 'string') {
  //       const hobbyArray = HOBBIES.split(',');
  //       setUpdatedHobbies(hobbyArray);
  //       setSelectedHobbies(
  //         hobbies
  //           .filter(hobby => hobbyArray.includes(hobby.text))
  //           .map(hobby => hobby.id),
  //       );
  //     } else {
  //       setUpdatedHobbies(HOBBIES);
  //       setSelectedHobbies(
  //         hobbies
  //           .filter(hobby => HOBBIES.includes(hobby.text))
  //           .map(hobby => hobby.id),
  //       );
  //     }
  //   }
  // }, [HOBBIES, hobbies]);

  // useEffect(() => {
  //   if (hobbies.length > 0 && updatedHobbies.length > 0) {
  //     setSelectedHobbies(
  //       hobbies
  //         .filter(hobby => updatedHobbies.includes(hobby.text))
  //         .map(hobby => hobby.id),
  //     );
  //   }
  // }, [hobbies, updatedHobbies]);

  const fetchHobbies = useCallback(
    async languageCode => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/hobbies?lang_code=${languageCode}`,
        );
        const result = await response.json();

        if (Array.isArray(result.hobbies) && result.hobbies.length > 0) {
          const formattedData = result.hobbies.map(item => ({
            id: item.HOBBY_ID,
            Image: item.HOBBY_IMAGE_URL,
            text: String(item.HOBBY_NAME),
          }));
          setHobbies(formattedData);

          // Update selected hobbies based on updatedHobbies
          if (updatedHobbies.length > 0) {
            const newSelectedHobbies = formattedData
              .filter(hobby => updatedHobbies.includes(hobby.text))
              .map(hobby => hobby.id);
            setSelectedHobbies(newSelectedHobbies);
          }
        } else {
          setHobbies([]);
        }
      } catch (error) {
        console.error('Error fetching hobbies:', error);
      } finally {
        setLoading(false);
      }
    },
    [updatedHobbies],
  );

  // Load initial language preference
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLangCode = await getData(async_keys.language_code);
        if (savedLangCode) {
          setLangCode(savedLangCode);
          fetchHobbies(savedLangCode);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguagePreference();
  }, [fetchHobbies]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = newLang => {
      setLangCode(newLang);
      fetchHobbies(newLang);
    };

    // Add event listener for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      // Clean up event listener
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [fetchHobbies, i18n]);

  // Handle hobby selection
  const handleHobbySelection = useCallback(
    hobbyId => {
      setSelectedHobbies(prevSelectedHobbies => {
        const updatedSelection = prevSelectedHobbies.includes(hobbyId)
          ? prevSelectedHobbies.filter(id => id !== hobbyId)
          : [...prevSelectedHobbies, hobbyId];

        if (setHOBBIES && hobbies.length > 0) {
          const selectedHobbyNames = hobbies
            .filter(hobby => updatedSelection.includes(hobby.id))
            .map(hobby => hobby.text);
          setHOBBIES(selectedHobbyNames);
        }

        return updatedSelection;
      });
    },
    [hobbies, setHOBBIES],
  );

  // Sync with context HOBBIES
  useEffect(() => {
    if (hobbies.length > 0 && HOBBIES) {
      const hobbyArray =
        typeof HOBBIES === 'string' ? HOBBIES.split(',') : HOBBIES;
      setUpdatedHobbies(hobbyArray);
      setSelectedHobbies(
        hobbies
          .filter(hobby => hobbyArray.includes(hobby.text))
          .map(hobby => hobby.id),
      );
    }
  }, [HOBBIES, hobbies]);

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={false}
      style={styles.MainContainer}>
      {/* <AppLoader loading={apiLoader} /> */}
      <View style={{marginBottom: hp(10), width: wp(83), marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          {t('Hobbies.Hobbies & Interest')}
        </Text>

        <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          {t('Hobbies.Select your Hobbies')}
        </Text>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              // flexDirection: 'row',
              // flexWrap: 'wrap', // Enables wrapping to the next line
              justifyContent: 'center', // Ensures items are centered
            }}>
            {loading ? (
              renderShimmer()
            ) : hobbies.length > 0 ? (
              hobbies.map(item => {
                const isSelected = selectedHobbies.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleHobbySelection(item.id)}
                    style={{
                      backgroundColor: isSelected ? '#0468BF' : '#697368',
                      height: hp(5.5),
                      width: wp(81),

                      margin: wp(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: wp(2),
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{uri: item.Image}}
                      style={{
                        height: hp(3.2),
                        width: wp(6.4),
                        marginRight: wp(2),
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        // width: wp(18),
                        fontSize: hp(2),
                        fontFamily: 'Poppins-Medium',
                        color: '#FFFFFF',
                      }}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text
                style={{
                  fontSize: hp(2),
                  color: '#697368',
                  textAlign: 'center',
                  marginTop: hp(2),
                }}>
                No hobbies available in selected language
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'rgba(197, 206, 217, 0.7)',
    padding: hp(2),
    marginBottom: hp(1.5),
    // marginBottom: hp(10),
    borderRadius: wp(5),
    marginTop: hp(3),
  },
});

export default UserHobbies;
