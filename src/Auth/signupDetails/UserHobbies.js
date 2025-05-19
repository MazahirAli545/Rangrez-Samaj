import {React, useState, useEffect, useContext} from 'react';
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

const UserHobbies = ({pageName = 'signup'}) => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [updatedHobbies, setUpdatedHobbies] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  const context = useContext(SignupDataContext);

  const HOBBIES = context?.HOBBIES || [];
  const setHOBBIES = context?.setHOBBIES || (() => {});

  console.log('HHHHHH', HOBBIES);

  useEffect(() => {
    const fetchHobbies = async () => {
      // setApiLoader(true);
      setLoading(true);
      try {
        const response = await fetch(
          // 'https://node2-plum.vercel.app/api/user/hobbies',
          `${BASE_URL}/hobbies`,
        );
        const result = await response.json();
        // console.log('Fetched Hobbies:', result.hobbies);

        if (Array.isArray(result.hobbies) && result.hobbies.length > 0) {
          const formattedData = result.hobbies.map(item => ({
            id: item.HOBBY_ID,
            Image: item.HOBBY_IMAGE_URL,
            text: String(item.HOBBY_NAME),
          }));
          setHobbies(formattedData);
        } else {
          console.warn('No valid Business Strem data found.');
        }
      } catch (error) {
        console.error('Error fetching Business:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHobbies();
  }, []);

  const handleHobbySelection = hobbyId => {
    setSelectedHobbies(prevSelectedHobbies => {
      let updatedSelection;

      if (prevSelectedHobbies.includes(hobbyId)) {
        updatedSelection = prevSelectedHobbies.filter(id => id !== hobbyId);
      } else {
        updatedSelection = [...prevSelectedHobbies, hobbyId];
      }

      if (setHOBBIES && hobbies.length > 0) {
        const selectedHobbyNames = hobbies
          .filter(hobby => updatedSelection.includes(hobby.id))
          .map(hobby => hobby.text);

        console.log('🚀 Selected Hobby Names:', selectedHobbyNames);
        setHOBBIES(selectedHobbyNames);
      }

      return updatedSelection;
    });
  };

  useEffect(() => {
    console.log('Updated HOBBIES in Context:', HOBBIES);
    setUpdatedHobbies(HOBBIES);
  }, [HOBBIES]);

  useEffect(() => {
    if (typeof HOBBIES === 'string') {
      const hobbyArray = HOBBIES.split(',');
      setUpdatedHobbies(hobbyArray);
      setSelectedHobbies(
        hobbies
          .filter(hobby => hobbyArray.includes(hobby.text))
          .map(hobby => hobby.id),
      );
    } else {
      setUpdatedHobbies(HOBBIES);
      setSelectedHobbies(
        hobbies
          .filter(hobby => HOBBIES.includes(hobby.text))
          .map(hobby => hobby.id),
      );
    }
    console.log('Updated HOBBIES in Context:', HOBBIES);
  }, [HOBBIES, hobbies]);

  useEffect(() => {
    if (hobbies.length > 0 && updatedHobbies.length > 0) {
      setSelectedHobbies(
        hobbies
          .filter(hobby => updatedHobbies.includes(hobby.text))
          .map(hobby => hobby.id),
      );
    }
  }, [hobbies, updatedHobbies]);

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
          Hobbies & Interest
        </Text>

        <Text
          style={{
            marginLeft: wp(1),
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          Select your Hobbies
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
            {loading
              ? renderShimmer()
              : hobbies.map(item => {
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
                })}
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
