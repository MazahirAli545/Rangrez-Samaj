import {React, useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-element-dropdown';

import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';

import professionn from '../../provider/png/profession.png';
import EducationStatus from '../../provider/png/EducationStatus.png';
import {BASE_URL} from '../../api/ApiInfo';
import AppLoader from '../../components/AppLoader';
// import AppLoader from '../../components/AppLoader';

const EducationDetails = ({pageName = 'signup'}) => {
  const {education, setEducation, institution, setInstitution} =
    useContext(SignupDataContext) || {};

  const [educationList, setEducationList] = useState([]);
  const [streams, setStreams] = useState([]);
  const [selectedStreamId, setSelectedStreamId] = useState(null);
  const [apiLoader, setApiLoader] = useState(false);

  useEffect(() => {
    fetch(
      // 'https://node2-plum.vercel.app/api/user/streams'
      `${BASE_URL}/streams`,
    )
      .then(res => res.json())
      .then(data => {
        const streamsArray = data?.streams || [];
        const formattedData = streamsArray.map(item => ({
          id: item.STREAM_ID,
          text: item.STREAM_NAME,
        }));
        setStreams(formattedData);

        // Pre-select the stream if in profile mode
        if (pageName === 'profile' && institution) {
          const matched = formattedData.find(item => item.text === institution);
          if (matched) {
            setSelectedStreamId(matched.id);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching streams:', error);
      });
  }, [institution]);

  useEffect(() => {
    const fetchEducation = async () => {
      setApiLoader(true);
      try {
        const response = await fetch(
          // 'https://node2-plum.vercel.app/api/user/education',
          `${BASE_URL}/education`,
        );
        const result = await response.json();
        if (Array.isArray(result.education) && result.education.length > 0) {
          const formattedData = result.education.map(item => ({
            id: item.EDUCATION_ID,
            text: String(item.EDUCATION_NAME),
            logo: item.EDUCATION_IMAGE_URL,
          }));
          setEducationList(formattedData);
        }
      } catch (error) {
        console.error('Error fetching education:', error);
      } finally {
        setApiLoader(false);
      }
    };

    fetchEducation();
  }, []);

  const handleEducationChange = value => {
    setEducation?.(value);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),
        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      <View style={{width: wp(83), marginTop: hp(2)}}>
        {/* <AppLoader loading={apiLoader} /> */}
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Education Details
        </Text>

        <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          Education Status
        </Text>

        <Dropdown
          style={[styles.dropdown1, {width: wp(81), marginBottom: hp(2)}]}
          placeholderStyle={styles.placeholderStyle1}
          selectedTextStyle={styles.selectedTextStyle1}
          inputSearchStyle={styles.inputSearchStyle1}
          iconStyle={styles.iconStyle1}
          data={educationList}
          search
          maxHeight={300}
          labelField="text"
          valueField="text"
          placeholder="Select Education"
          searchPlaceholder="Search..."
          value={education}
          onChange={item => handleEducationChange(item.text)}
          renderLeftIcon={() => (
            <Image
              source={EducationStatus}
              style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
              resizeMode="contain"
            />
          )}
          renderItem={item => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: hp(1.5),
                paddingLeft: wp(4),
              }}>
              <Image
                source={{uri: item.logo}}
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

        <Text
          style={{
            alignSelf: 'flex-start',
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(0.5),
          }}>
          Select Stream
        </Text>

        <Dropdown
          style={styles.dropdown1}
          placeholderStyle={styles.placeholderStyle1}
          selectedTextStyle={styles.selectedTextStyle1}
          inputSearchStyle={styles.inputSearchStyle1}
          iconStyle={styles.iconStyle1}
          data={streams}
          search
          maxHeight={300}
          labelField="text"
          valueField="id"
          placeholder="Select Stream"
          searchPlaceholder="Search..."
          value={selectedStreamId}
          onChange={item => {
            setSelectedStreamId(item.id);
            setInstitution?.(item.text);
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
  },
  inputSearchStyle1: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default EducationDetails;
