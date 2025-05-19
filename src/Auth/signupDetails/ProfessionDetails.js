import {React, useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import leftback from '../../provider/png/leftback.png';
import name from '../../provider/png/name.png';
import dob from '../../provider/png/dob.png';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
// import Pincodeicon from '../../provider/png/Pincodeicon.png';
import professionn from '../../provider/png/profession.png';
// import DropDownPicker from "react-native-dropdown-picker";
import Entypo from 'react-native-vector-icons/Entypo';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';
import AppLoader from '../../components/AppLoader';
import {BASE_URL} from '../../api/ApiInfo';
// import CookieManager from '@react-native-cookies/cookies';

const ProfessionDetails = ({pageName = 'signup'}) => {
  const {
    professionId,
    setProfessionId,
    profession,
    setProfession,
    professionDesc,
    setProfessionDesc,
    isNavigating,
    setIsNavigating,
  } = useContext(SignupDataContext) || {};

  const {
    PROFESSIONID,
    setPROFESSIONID,
    PROFESSION,
    setPROFESSION,
    PROFESSIONDESC,
    setPROFESSIONDESC,
  } = useContext(ProfileDataContext) || {};

  // console.log('DATAA', PROFESSIONID, PROFESSION);
  // const [localProfession, setLocalProfession] = useState(
  //   profession || PROFESSION || '',
  // );

  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState('');
  // const [selectedProfession, setSelectedProfession] = useState(
  //   profession || PROFESSION || '',
  // );
  const [apiLoader, setApiLoader] = useState(false);

  useEffect(() => {
    console.log('Current Profession:', PROFESSION);
  }, [PROFESSION]);

  useEffect(() => {
    if (isNavigating) {
      console.log('Navigating to UserDetails screen...');
    }
  }, [isNavigating]);

  useEffect(() => {
    const fetchProfessions = async () => {
      setApiLoader(true);
      try {
        const response = await fetch(
          `${BASE_URL}/professions`, // Added full endpoint path
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Fetched professions:', result.professions);

        if (
          Array.isArray(result.professions) &&
          result.professions.length > 0
        ) {
          const formattedData = result.professions.map(item => ({
            id: String(item.PROF_ID),
            text: String(item.PROF_NAME),
          }));
          setProfessions(formattedData);
        } else {
          console.warn('No valid profession data found.');
          // Optionally set empty state or show message to user
        }
      } catch (error) {
        console.error('Error fetching professions:', error);
        // Optionally show error message to user
      } finally {
        setApiLoader(false);
      }
    };

    fetchProfessions();
  }, []);

  useEffect(() => {
    const finalProfession = profession || PROFESSION;
    // console.log('🔄 Incoming Profession:', finalProfession);
    // console.log('📦 All Professions:', professions);

    if (finalProfession && professions.length > 0) {
      const matched = professions.find(
        p =>
          p.text.trim().toLowerCase() === finalProfession.trim().toLowerCase(),
      );
      // console.log('✅ Matched Profession:', matched);

      if (matched) {
        setSelectedProfession(matched.id);
        console.log('Selected Profession ID:', matched.id);
      } else {
        console.warn('⚠️ No match for:', finalProfession);
      }
    }
  }, [profession, PROFESSION, professions]);

  // useEffect(() => {
  //   if (PROFESSION) {
  //     const matchedProfession = professions.find(p => p.text === PROFESSION);
  //     if (matchedProfession) {
  //       setSelectedProfession(matchedProfession.id);
  //     }
  //   }
  // }, [PROFESSION, professions]);

  // console.log('ratatar', profession);

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),
        // marginBottom: hp(10),
        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      {/* <AppLoader loading={apiLoader} /> */}
      <View style={{alignItems: 'center', width: wp(83), marginTop: hp(2)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Profession Details
        </Text>

        <Text
          style={{
            // marginLeft: wp(1),
            alignSelf: 'flex-start',
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          Choose Your Profession
        </Text>

        <Dropdown
          style={styles.dropdown1}
          placeholderStyle={styles.placeholderStyle1}
          selectedTextStyle={styles.selectedTextStyle1}
          inputSearchStyle={styles.inputSearchStyle1}
          iconStyle={styles.iconStyle1}
          data={professions}
          // disable={!isEditable}
          search
          maxHeight={300}
          labelField="text"
          valueField="id"
          placeholder="Profession"
          searchPlaceholder="Search..."
          value={selectedProfession}
          onChange={item => {
            console.log('Selected Profession:', item);
            setSelectedProfession(item.id);
            if (setProfession) setProfession(item.text);
            if (setProfessionId) setProfessionId(item.id);
            if (setPROFESSION) setPROFESSION(item.text);
            if (setPROFESSIONID) setPROFESSIONID(item.id);
          }}
          renderLeftIcon={() => (
            <Image
              source={professionn}
              style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
              resizeMode="contain"
            />
          )}
          renderItem={item => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: hp(2),
                paddingLeft: wp(4),
              }}>
              <Image
                source={professionn}
                style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                }}>
                {item.text}
              </Text>
            </View>
          )}
        />

        <TextInput
          // editable={isEditable}
          multiline={true}
          style={{
            paddingHorizontal: wp(2),
            marginTop: hp(2),
            width: wp(81),
            height: hp(16),
            color: 'black',
            fontSize: hp(2),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: wp(2),
            // elevation: 5,
            textAlignVertical: 'top',
          }}
          placeholder="Describe Your Profession"
          placeholderTextColor={'#BFBDBE'}
          value={professionDesc || PROFESSIONDESC}
          onChangeText={text => {
            if (setProfessionDesc) setProfessionDesc(text);
            if (setPROFESSIONDESC) setPROFESSIONDESC(text);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown1: {
    marginTop: hp(1),
    height: hp(5.5),
    width: wp(81),
    backgroundColor: '#FFFFFF',

    paddingHorizontal: wp(3),
    borderRadius: wp(2),
    fontFamily: 'Poppins-Medium',
    fontSize: wp(2),
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
    color: '#BFBDBE',
  },
  selectedTextStyle1: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  iconStyle1: {
    width: 30,
    height: 30,
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    // height: 40,s
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default ProfessionDetails;
