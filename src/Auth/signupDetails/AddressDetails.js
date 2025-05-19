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

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import Pincodeicon from '../../provider/png/Pincodeicon.png';
import areacity from '../../provider/png/areacity.png';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';
import AppLoader from '../../components/AppLoader';
import {BASE_URL} from '../../api/ApiInfo';
const AddressDetails = ({pageName = 'signup'}) => {
  const {
    pincode,
    setPincode,
    city,
    setCity,
    address,
    setAddress,
    cityCode,
    setCityCode,
    stateCode,
    setStateCode,
    stateName,
    setStateName,
    districtCode,
    setDistrictCode,
    districtName,
    setDistrictName,
    errorMessageRegister,
    setErrorMessageRegister,
    scrollViewRef,
    currentPage,
    setCurrentPage,
    isAttempted,
    setIsAttempted,
    isNavigating,
    setIsNavigating,
  } = useContext(SignupDataContext) || {};

  const {
    PINCODE,
    setPINCODE,
    CITY,
    setCITY,
    ADDRESS,
    setADDRESS,
    STATECODE,
    setSTATECODE,
    DISTRICTCODE,
    setDISTRICTCODE,
  } = useContext(ProfileDataContext) || {};

  useEffect(() => {
    if (isNavigating) {
      console.log('Navigating to UserDetails screen...');
    }
  }, [isNavigating]);

  const validateFields = () => {
    let errors = {};

    if (!pincode) errors.pincode = 'Pincode is required';
    if (!city) errors.city = 'City is required';
    if (!address) errors.address = 'Address is required';

    setErrorMessageRegister(errors);
  };

  const [pincodeList, setPincodeList] = useState([]);
  const [selectedPincode, setSelectedPincode] = useState(PINCODE || '');
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const isCityManuallySelected = useRef(false);
  const [apiLoader, setApiLoader] = useState(false);

  // Filter all unique pincodes
  useEffect(() => {
    const fetchPincodes = async () => {
      // setApiLoader(true);
      try {
        const response = await fetch(
          // 'https://node2-plum.vercel.app/api/user/cities',
          `${BASE_URL}/cities`,
        );
        const result = await response.json();
        // console.log('Pincode data:', result.cities);

        if (!Array.isArray(result.cities)) {
          console.warn('Invalid response format');
          return;
        }

        const uniquePincodes = [
          ...new Set(
            result.cities
              .map(city => city.CITY_PIN_CODE)
              .filter(pin => pin && pin.trim() !== ''), // Remove empty values
          ),
        ];

        setPincodeList(uniquePincodes.map(pin => ({value: pin})));
        console.log('Unique Pincode List:', uniquePincodes);
      } catch (error) {
        console.error('Error fetching pincodes:', error);
      } finally {
        // setApiLoader(false);
      }
    };

    fetchPincodes();
  }, []);

  useEffect(() => {
    const fetchAllCities = async () => {
      // setApiLoader(true);
      try {
        const response = await fetch(
          // 'https://node2-plum.vercel.app/api/user/cities',
          `${BASE_URL}/cities`,
        );

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const text = await response.text();
        let result;

        try {
          result = JSON.parse(text);
        } catch (jsonError) {
          throw new Error('Invalid JSON response from API');
        }

        console.log('All Cities:', result.cities);

        if (!Array.isArray(result.cities)) {
          console.warn('Invalid response format');
          return;
        }

        setAllCities(result.cities); // Store all cities
      } catch (error) {
        console.error('Error fetching all cities:', error.message);
      }
      // finally {
      //   setApiLoader(false);
      // }
    };

    fetchAllCities();
  }, []);

  console.log('WWWWW', allCities);

  useEffect(() => {
    const pincodeToFilter = pincode || PINCODE;

    if (!pincodeToFilter) {
      setFilteredCities([]);
      setStateCode && setStateCode('');
      setStateName && setStateName('');
      setDistrictCode && setDistrictCode('');
      setDistrictName && setDistrictName('');
      setCityCode && setCityCode('');
      return;
    }

    const filtered = allCities
      .filter(city => city.CITY_PIN_CODE === pincodeToFilter)
      .map(city => ({
        value: city.CITY_NAME,
        text: city.CITY_NAME,
        stateCode: city.CITY_ST_CODE,
        stateName: city.CITY_ST_NAME,
        districtCode: city.CITY_DS_CODE,
        districtName: city.CITY_DS_NAME,
        cityCode: city.CITY_ID,
      }));

    setFilteredCities(filtered);
    console.log('Filtered Cities:', filtered);

    if (filtered.length > 0) {
      let selectedCity = filtered.find(c => c.value === city);

      if (!selectedCity && !isCityManuallySelected.current) {
        return;
      }

      if (selectedCity) {
        setStateCode && setStateCode(selectedCity.stateCode);
        setStateName && setStateName(selectedCity.stateName);
        setDistrictCode && setDistrictCode(selectedCity.districtCode);
        setDistrictName && setDistrictName(selectedCity.districtName);
        setCityCode && setCityCode(selectedCity.cityCode);
        console.log('State & District Updated:', {
          stateCode: selectedCity.stateCode,
          stateName: selectedCity.stateName,
          districtCode: selectedCity.districtCode,
          districtName: selectedCity.districtName,
          cityCode: selectedCity.cityCode,
        });

        if (!city && !CITY) {
          setCity && setCity(selectedCity.text);
          setCITY && setCITY(selectedCity.text);
        }
      }
    }
  }, [selectedPincode, allCities, PINCODE, city, CITY]);

  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
        padding: hp(2),
        marginBottom: hp(1.5),

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
          Address Details
        </Text>
        <Text
          style={{
            alignSelf: 'flex-start',
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(3),
          }}>
          Choose Your PinCode
        </Text>
        <Dropdown
          style={[
            styles.dropdown1,
            {
              borderColor: errorMessageRegister?.pincode ? 'red' : '#CCCCCC',
              borderWidth: errorMessageRegister?.pincode ? wp(0.3) : wp(0),
            },
          ]}
          placeholderStyle={styles.placeholderStyle1}
          selectedTextStyle={styles.selectedTextStyle1}
          inputSearchStyle={styles.inputSearchStyle1}
          iconStyle={styles.iconStyle1}
          data={pincodeList}
          search
          maxHeight={300}
          labelField="value"
          valueField="value"
          placeholder="PinCode"
          searchPlaceholder="Search..."
          value={PINCODE || pincode}
          onChange={item => {
            console.log('Selected Pincode:', item.value);
            setSelectedPincode(item.value);
            if (setPincode) setPincode(item.value);
            if (setPINCODE) setPINCODE(item.value);

            if (setErrorMessageRegister)
              setErrorMessageRegister(prevErrors => ({
                ...prevErrors,
                pincode: item.value ? '' : 'PinCode is required',
              }));
          }}
          renderLeftIcon={() => (
            <Image
              source={Pincodeicon}
              style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
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
                source={Pincodeicon}
                resizeMode="contain"
                style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
              />
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                }}>
                {item.value}
              </Text>
            </View>
          )}
        />

        {errorMessageRegister?.pincode && (
          <Text style={styles.errorText}>{errorMessageRegister.pincode}</Text>
        )}
        <Text
          style={{
            alignSelf: 'flex-start',
            color: '#697368',
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2),
            marginTop: hp(1.5),
          }}>
          Choose Your Area
        </Text>
        <Dropdown
          style={[
            styles.dropdown1,
            {
              borderColor: errorMessageRegister?.city ? 'red' : '#CCCCCC',
              borderWidth: errorMessageRegister?.city ? wp(0.3) : wp(0),
            },
          ]}
          placeholderStyle={styles.placeholderStyle1}
          selectedTextStyle={styles.selectedTextStyle1}
          inputSearchStyle={styles.inputSearchStyle1}
          iconStyle={styles.iconStyle1}
          data={filteredCities}
          search
          maxHeight={300}
          labelField="text"
          valueField="text"
          placeholder="City Name"
          searchPlaceholder="Search..."
          value={city || CITY}
          // onChange={handleCityChange}
          onChange={item => {
            isCityManuallySelected.current = true;
            console.log('User selected city:', item.text);
            if (setCity) setCity(item.text);
            if (setCITY) setCITY(item.text);

            if (setErrorMessageRegister)
              setErrorMessageRegister(prevErrors => ({
                ...prevErrors,
                city: item.value ? '' : 'PinCode is required',
              }));
          }}
          renderLeftIcon={() => (
            <Image
              source={areacity}
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
                source={areacity}
                style={{height: hp(3), width: wp(6.5), marginRight: wp(3)}}
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

        {errorMessageRegister?.city && (
          <Text style={styles.errorText}>{errorMessageRegister.city}</Text>
        )}

        <TextInput
          value={address || ADDRESS}
          onChangeText={text => {
            // Update local state
            if (setAddress) setAddress(text);
            if (setADDRESS) setADDRESS(text);

            if (setErrorMessageRegister)
              setErrorMessageRegister(prevErrors => ({
                ...prevErrors,
                address: text.trim() ? '' : 'Address is required',
              }));
          }}
          // editable={isEditable}
          multiline={false}
          style={{
            paddingHorizontal: wp(3),
            marginTop: hp(2),

            width: wp(81),

            color: 'black',
            fontSize: hp(2),
            fontFamily: 'Poppins-Medium',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: wp(2),
            textAlignVertical: 'top',
            borderColor: errorMessageRegister?.address ? 'red' : '#CCCCCC', // Default border color
            borderWidth: errorMessageRegister?.address ? wp(0.3) : wp(0),
          }}
          placeholder="Enter Your Complete Address"
          placeholderTextColor={'#BFBDBE'}
        />
        {errorMessageRegister?.address && (
          <Text style={styles.errorText}>{errorMessageRegister.address}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Regular',
  },
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
    // height: 40,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default AddressDetails;
