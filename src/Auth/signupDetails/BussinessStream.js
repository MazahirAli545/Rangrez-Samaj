import {React, useState, useMemo, useEffect, useContext} from 'react';
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
import {ProfileDataContext} from '../ProfileDataContext';
import AppLoader from '../../components/AppLoader';
import {SignupDataContext} from '../SignupDataContext';
import {BASE_URL} from '../../api/ApiInfo';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const BussinessStream = ({pageName = 'signup'}) => {
  const [apiLoader, setApiLoader] = useState(false);

  const [business, setBusiness] = useState([]);

  const {BUSSSTREAM, setBUSSSTREAM} = useContext(SignupDataContext) || {};
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessStream = async () => {
      // setApiLoader(true);
      setLoading(true);
      try {
        const response = await fetch(
          // 'https://node2-plum.vercel.app/api/user/business',
          `${BASE_URL}/business`,
        );
        const result = await response.json();
        // console.log('Fetched Bussiness:', result.Business);

        if (Array.isArray(result.Business) && result.Business.length > 0) {
          const formattedData = result.Business.filter(
            item => item.BUSS_STREM && item.BUSS_STREM.trim() !== '',
          ).map(item => ({
            id: String(item.BUSS_ID),
            text: String(item.BUSS_STREM),
          }));
          setBusiness(formattedData);
        } else {
          console.warn('No valid Business Strem data found.');
        }
      } catch (error) {
        console.error('Error fetching Business:', error);
      } finally {
        // setApiLoader(false);
        setLoading(false);
      }
    };

    fetchBusinessStream();
  }, []);

  const handleStreamSelection = value => {
    if (BUSSSTREAM !== value) {
      console.log('Selected Stream:', value);
      setBUSSSTREAM(value); // ✅ Updates the value properly
    }
  };
  useEffect(() => {
    if (BUSSSTREAM) {
      setBUSSSTREAM(BUSSSTREAM);
    }
  }, [BUSSSTREAM]);

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
      horizontal={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled={true}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),
        borderRadius: wp(5),
        marginTop: hp(3),
      }}>
      {/* <AppLoader loading={apiLoader} /> */}

      <View style={{marginTop: hp(2), width: wp(83)}}>
        <Text
          style={{
            fontSize: hp(2.5),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            color: '#000000',
          }}>
          Business Stream
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
            Select your Business Stream
          </Text>

          {loading ? (
            renderShimmer()
          ) : (
            <FlatList
              data={business}
              horizontal={false}
              extraData={BUSSSTREAM}
              keyExtractor={item => item.id}
              style={{marginTop: hp(1.5)}}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    // backgroundColor: '#697368',
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
          )}
        </View>
      </View>
    </ScrollView>
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
    // fontSize: hp(2),
    fontFamily: 'Poopins-Medium',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
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
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 0,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: hp(2),
  },
});
export default BussinessStream;
