import React, {useState, useRef, useEffect, useMemo, Children} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  FlatList,
  ImageBackground,
  InteractionManager,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import leftback from '../provider/png/leftback.png';
import PasswordHide from '../provider/png/PasswordHide.png';
import PasswordShow from '../provider/png/PasswordShow.png';
import Onboarding from '../Auth/Onboarding';
// import User from './registration/User';
// import BussinessUser from './registration/BussinessUser';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import user from '../provider/png/user.png';
import add from '../provider/png/add.png';
// import CameraComponent from '../components/CameraComponent';
// import CustomImagePicker from '../components/CameraComponent';
import UserDetails from './signupDetails/userDetails';
import GenderDetails from './signupDetails/GenderDetails';
import AddressDetails from './signupDetails/AddressDetails';
import EducationDetails from './signupDetails/EducationDetails';
import ProfessionDetails from './signupDetails/ProfessionDetails';
import SpouseChildDetails from './signupDetails/SpouseChildDetails';
import UserMarriedYN from './signupDetails/UserMarriedYN';
import ParentsDetails from './signupDetails/ParentsDetails';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import Signin from '../Auth/Signin';
import {Card} from 'react-native-paper';
import AppLoader from '../components/AppLoader';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import setting from '../provider/png/setting.png';
import {SignupDataContext} from './SignupDataContext';
import {storeData, async_keys, getData} from '../api/UserPreference';
import BussinessStream from './signupDetails/BussinessStream';
import BussinessType from './signupDetails/BussinessType';
import UserBussiness from './signupDetails/UserBussiness';
import UserHobbies from './signupDetails/UserHobbies';
// import user from '../provider/png/user.png';
import CustomImagePicker from '../components/CameraComponent';
import CameraComponent from '../components/CameraComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileDataContext} from '../Auth/ProfileDataContext';
import ImageResizer from 'react-native-image-resizer';
import {use} from 'i18next';

const Signup = props => {
  const [fullname, setFullName] = useState('');
  const [date, setDate] = useState(null);
  const [age, setAge] = useState(0);
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [stateName, setStateName] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [education, setEducation] = useState('');
  const [institution, setInstitution] = useState('');
  const [professionId, setProfessionId] = useState('');
  const [profession, setProfession] = useState('');
  const [professionDesc, setProfessionDesc] = useState('');
  const [userMarried, setUserMarried] = useState('');
  const [spousename, setSpouseName] = useState('');
  const [children, setChildren] = useState([{id: 1, name: '', dob: null}]);
  const [fathername, setFatherName] = useState('');
  const [mothername, setMotherName] = useState('');
  const [apiLoader, setApiLoader] = useState(false);
  const [errorMessageRegister, setErrorMessageRegister] = useState('');
  const scrollViewRef = useRef(null); // ✅ Ensure this is initialized
  const [currentPage, setCurrentPage] = useState(0);
  const [isAttempted, setIsAttempted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [token, setToken] = useState(null);
  const [prId, setPrId] = useState(null);
  const [userData, setUserData] = useState(null);

  const [BUSSINTRST, setBUSSINTRST] = useState('');
  const [BUSSSTREAM, setBUSSSTREAM] = useState('');
  const [BUSSTYPE, setBUSSTYPE] = useState('');
  const [HOBBIES, setHOBBIES] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  const [prcompleted, setPrCompleted] = useState('');
  const [fatherId, setfatherId] = useState(null);
  const [motherId, setMotherId] = useState(null);
  const [spouseId, setSpouseId] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const [isPersonalDetailsChanged, setIsPersonalDetailsChanged] =
    useState(false);

  const handleImageSelect = image => {
    console.log('Selected image:', image);
    setProfilePicture(image);
  };
  const [PROFILE, SETPROFILE] = useState(null);
  console.log('DATAAAAAAA', PROFILE);

  useEffect(() => {
    console.log('Updated profilePicture state:', profilePicture);
  }, [profilePicture]);
  console.log('333');

  const signupData = useMemo(
    () => ({
      fatherId,
      setfatherId,
      motherId,
      setMotherId,
      spouseId,
      setSpouseId,
      userData, // Add this line
      setUserData,
      fullname,
      setFullName,
      date,
      setDate,
      age,
      setAge,
      mobile,
      setMobile,
      gender,
      setGender,
      pincode,
      setPincode,
      city,
      setCity,
      address,
      setAddress,
      stateCode,
      setStateCode,
      cityCode,
      setCityCode,
      stateName,
      setStateName,
      districtCode,
      setDistrictCode,
      districtName,
      setDistrictName,

      education,
      setEducation,
      institution,
      setInstitution,
      professionId,
      setProfessionId,
      profession,
      setProfession,
      professionDesc,
      setProfessionDesc,
      spousename,
      setSpouseName,
      children,
      setChildren,
      fathername,
      setFatherName,
      mothername,
      setMotherName,
      errorMessageRegister,
      setErrorMessageRegister,
      scrollViewRef,
      currentPage,
      setCurrentPage,
      isAttempted,
      setIsAttempted,
      isNavigating,
      setIsNavigating,
      userMarried,
      setUserMarried,
      BUSSINTRST,
      setBUSSINTRST,
      BUSSSTREAM,
      setBUSSSTREAM,
      BUSSTYPE,
      setBUSSTYPE,
      HOBBIES,
      setHOBBIES,
      isMobileVerified,
      setIsMobileVerified,
      isPersonalDetailsChanged: false,
      setIsPersonalDetailsChanged: value => setIsPersonalDetailsChanged(value),
    }),
    [
      isPersonalDetailsChanged,
      fatherId,
      motherId,
      spouseId,
      userData,
      isMobileVerified,
      fullname,
      date,
      age,
      mobile,
      gender,
      pincode,
      city,
      address,
      cityCode,
      stateCode,
      stateName,
      districtCode,
      districtName,
      education,
      institution,
      professionId,
      profession,
      professionDesc,
      spousename,
      children,
      fathername,
      mothername,
      errorMessageRegister,
      scrollViewRef,
      setCurrentPage,
      currentPage,
      isAttempted,
      isNavigating,
      userMarried,
      BUSSINTRST,
      BUSSSTREAM,
      BUSSTYPE,

      HOBBIES,
    ],
  );

  useEffect(() => {
    if (props.pageName == 'profile') {
      const fetchToken = async () => {
        const storedToken = await getData(async_keys.auth_token);
        setToken(storedToken || 'No Token Found');
      };

      fetchToken();
    }
  }, [props.pageName]);

  useEffect(() => {
    if (props.pageName === 'profile') {
      const fetchTokenAndProfile = async () => {
        try {
          const storedToken = await getData(async_keys.auth_token);
          setToken(storedToken);

          if (!storedToken) {
            throw new Error('No authentication token found');
          }

          setErrorMessage('');
          const response = await fetch(`${BASE_URL}profile`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch profile data');
          }

          if (data.success && data.data) {
            // First set all the data
            setUserData(data.data);
            setPrId(data.data.PR_ID);
            SETPROFILE(data.data.PR_PHOTO_URL);
            setFullName(data.data.PR_FULL_NAME);
            setDate(data.data.PR_DOB);
            setMobile(data.data.PR_MOBILE_NO);
            setGender(data.data.PR_GENDER);
            setPincode(data.data.PR_PIN_CODE);
            setCity(data.data.PR_AREA_NAME);
            setAddress(data.data.PR_ADDRESS);
            setStateCode(data.data.PR_STATE_CODE);
            setStateName(data.data.City?.CITY_ST_NAME || '');
            setEducation(data.data.PR_EDUCATION);
            setInstitution(data.data.PR_EDUCATION_DESC);
            setDistrictCode(data.data.PR_DISTRICT_CODE);
            setDistrictName(data.data.City?.CITY_DS_NAME || '');
            setProfessionId(data.data.Profession?.PROF_ID);
            setProfessionDesc(data.data.PR_PROFESSION_DETA);
            setProfession(data.data.Profession?.PROF_NAME);
            setFatherName(data.data.PR_FATHER_NAME);
            setMotherName(data.data.PR_MOTHER_NAME);
            setSpouseName(data.data.PR_SPOUSE_NAME);
            setChildren(data.data.Children || []);
            setBUSSINTRST(data.data.PR_BUSS_INTER || 'N');
            setBUSSSTREAM(data.data.PR_BUSS_STREAM || '');
            setBUSSTYPE(data.data.PR_BUSS_TYPE || '');
            setPrCompleted(data.data.PR_IS_COMPLETED || 'N');
            setHOBBIES(data.data.PR_HOBBY?.split(',') || []);
            setfatherId(data.data.PR_FATHER_ID || '');
            setMotherId(data.data.PR_MOTHER_ID || '');
            setSpouseId(data.data.PR_SPOUSE_ID || '');

            // IMPORTANT: Set marital status LAST and after all other data is set
            setUserMarried(data.data.PR_MARRIED_YN);

            // Then reset to first page
            setIsInitialLoad(false);
            setCurrentPage(0);
            scrollViewRef?.current?.scrollTo({
              x: 0,
              animated: false,
            });
          } else {
            setErrorMessage(data.message || 'Failed to load user data');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setErrorMessage('Failed to load user data.');
        }
      };

      fetchTokenAndProfile();
    }
  }, [props.pageName, token]);

  useEffect(() => {
    if (userData?.Children && Array.isArray(userData.Children)) {
      console.log('👶 Children List:');
      userData.Children.forEach((child, index) => {
        console.log(`Child ${index + 1}:`);
        console.log(`  ID: ${child.id}`);
        console.log(`  Name: ${child.name}`);
        console.log(`  DOB: ${child.dob}`);
        console.log(`  UserID: ${child.userId}`);
      });
    }
  }, [userData]);

  // console.log('PRofession', profession);

  const existingHobbies = userData?.PR_HOBBY
    ? userData.PR_HOBBY.split(',')
    : [];

  const hobbiesChanged =
    Array.isArray(HOBBIES) &&
    (HOBBIES.length !== existingHobbies.length ||
      HOBBIES.some(hobby => !existingHobbies.includes(hobby)));

  const convertUniqueIdToPrId = async uniqueId => {
    try {
      const response = await axios.get(`${BASE_URL}person/convert/${uniqueId}`);
      if (response.data.success && response.data.data) {
        return response.data.data.PR_ID;
      } else {
        throw new Error(response.data.message || 'Conversion failed');
      }
    } catch (error) {
      console.error('Error converting PR_UNIQUE_ID:', error);
      return null;
    }
  };

  const UpdateUser = async () => {
    setErrorMessageRegister('');

    let errors = {};

    if (!fullname) errors.fullname = 'Full name is required';
    if (!mobile) errors.mobile = 'Mobile number is required';
    if (!date) errors.date = 'Date of birth is required';

    if (!pincode) errors.pincode = 'Pincode is required';
    if (!city) errors.city = 'City is required';
    if (!address) errors.address = 'Address is required';

    if (!fathername) errors.fathername = 'Father name is required';
    if (!mothername) errors.mothername = 'Mother name is required';

    // If there are validation errors, stop registration
    if (Object.keys(errors).length > 0) {
      setErrorMessageRegister(errors);

      if (!fullname || !mobile || !date) {
        setCurrentPage(0);
      } else if (!pincode || !city || !address) {
        setCurrentPage(2);
      } else if (!fathername || !mothername) {
        setCurrentPage(7);
      }

      // Scroll to the required section
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: wp(100) * currentPage,
          animated: true,
        });
      }

      return;
    }
    try {
      const storedPrId = await getData('PR_ID');
      const prIdToUse = prId || storedPrId;

      if (!prIdToUse) {
        console.error('PR_ID is missing!');
        ToastAndroid.showWithGravity(
          'User identification failed. Please login again.',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return;
      }

      const formData = new FormData();
      formData.append('PR_ID', prId);
      formData.append('PR_FULL_NAME', fullname || '');
      formData.append('PR_DOB', date || '');
      formData.append('PR_MOBILE_NO', mobile || '');
      formData.append('PR_GENDER', gender || '');
      formData.append('PR_PIN_CODE', pincode || '');
      formData.append('PR_AREA_NAME', city || '');
      formData.append('PR_ADDRESS', address || '');
      formData.append('PR_CITY_CODE', cityCode || '');
      formData.append('PR_STATE_CODE', stateCode || '');
      formData.append('PR_DISTRICT_CODE', districtCode || '');
      formData.append('PR_EDUCATION', education || '');
      formData.append('PR_EDUCATION_DESC', institution || '');
      formData.append('PR_PROFESSION_DETA', professionDesc || '');
      formData.append('PR_MARRIED_YN', userMarried || '');

      // Convert PR_UNIQUE_IDs to PR_IDs before formData
      const fatherPrId = fatherId
        ? await convertUniqueIdToPrId(fatherId)
        : null;
      const motherPrId = motherId
        ? await convertUniqueIdToPrId(motherId)
        : null;
      const spousePrId = spouseId
        ? await convertUniqueIdToPrId(spouseId)
        : null;

      formData.append('PR_FATHER_NAME', fathername || '');
      // formData.append('PR_FATHER_ID', fatherId ? Number(fatherId) : '');
      formData.append('PR_FATHER_ID', fatherPrId || '');
      formData.append('PR_MOTHER_NAME', mothername || '');
      // formData.append('PR_MOTHER_ID', motherId ? Number(motherId) : '');
      formData.append('PR_MOTHER_ID', motherPrId || '');
      formData.append('PR_SPOUSE_NAME', spousename || '');
      // formData.append('PR_SPOUSE_ID', spouseId ? Number(spouseId) : '');
      formData.append('PR_SPOUSE_ID', spousePrId || '');
      formData.append('PR_BUSS_INTER', BUSSINTRST || 'N');
      // formData.append(
      //   'PR_PR_ID',
      //   fatherId ? Number(fatherId) : motherId ? Number(motherId) : null,
      // );
      formData.append('PR_PR_ID', fatherPrId || motherPrId || null);
      formData.append(
        'PR_BUSS_STREAM',
        BUSSINTRST === 'N' ? '' : BUSSSTREAM || '',
      );
      formData.append('PR_BUSS_TYPE', BUSSINTRST === 'N' ? '' : BUSSTYPE || '');
      formData.append(
        'PR_HOBBY',
        hobbiesChanged ? HOBBIES.join(',') : userData?.PR_HOBBY || '',
      );
      console.log('PROFILE PICTURE', profilePicture);

      // Handle Image Upload
      if (profilePicture?.uri) {
        try {
          const resizedImage = await ImageResizer.createResizedImage(
            profilePicture.uri,
            500, // width
            500, // height
            'JPEG', // format
            80, // quality
            0, // rotation
            undefined,
            false,
            {mode: 'cover'},
          );

          console.log('Resized Image:', resizedImage);

          const imageFile = {
            uri: resizedImage.uri,
            type: 'image/jpeg',
            name: `profile_${Date.now()}.jpg`,
          };

          console.log('IMAGEEEEE', imageFile.uri);

          formData.append('PR_PHOTO_URL', imageFile);
        } catch (resizeError) {
          console.error('Image Resize Error:', resizeError);
          ToastAndroid.showWithGravity(
            'Image processing failed. Try another image.',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
          return;
        }
      } else if (userData?.PR_PHOTO_URL) {
        console.log('Using Existing Image:', userData.PR_PHOTO_URL);
        formData.append('PR_PHOTO_URL', userData.PR_PHOTO_URL);
      }

      // Attach profession if available
      if (professionId) {
        formData.append('PR_PROFESSION_ID', Number(professionId));
      }

      // Handle Children updates
      if (children && Array.isArray(children)) {
        const validChildren = children.filter(child => child.name && child.dob);
        //   .map((child, index) => ({
        //     id: child.id ? child.id.toString() : `new-${index}`,
        //     name: child.name,
        //     dob: child.dob,
        //   })
        // );

        if (validChildren.length > 0) {
          const childrenData = validChildren.map(child => ({
            id: child.id || null, // Keep existing ID or set to null for new children
            name: child.name,
            dob: child.dob,
          }));

          formData.append('Children', JSON.stringify(childrenData));
        }

        console.log('Valid Children:', validChildren);
      }

      console.log('FormData content:', {
        PR_ID: prIdToUse,
      });

      console.log('FormData', formData);

      const response = await axios.post(`${BASE_URL}edit-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pr_id: Number(prIdToUse),
        },
      });

      console.log('Response:', response.data);

      if (response.data?.success) {
        let successMessage = 'Profile created successfully';
        let navigationTarget = 'Signin';

        if (props.pageName === 'profile') {
          successMessage = 'Profile updated successfully';
          navigationTarget = 'HomeScreen';
        } else if (props.pageName === 'AddFamilyMembers') {
          successMessage = 'Family member added successfully';
          navigationTarget = 'Drawer';
        }

        ToastAndroid.showWithGravity(
          successMessage,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );

        props.navigation.navigate(navigationTarget);
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Update failed',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('Updation Error:', error.response || error);
      console.log(error.response?.data?.message);
      ToastAndroid.showWithGravity(
        'Something went wrong. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  const pages =
    props.pageName === 'profile'
      ? useMemo(
          () => [
            <UserDetails
              key="1"
              pageName={props.pageName || 'signup'}
              navigation={isNavigating}
            />,
            <GenderDetails key="2" pageName={props.pageName || 'signup'} />,
            <AddressDetails key="3" pageName={props.pageName || 'signup'} />,
            <EducationDetails key="4" pageName={props.pageName || 'signup'} />,
            <ProfessionDetails key="5" pageName={props.pageName || 'signup'} />,

            <UserMarriedYN key="6" pageName={props.pageName || 'signup'} />,

            ...(userMarried === 'Y'
              ? [
                  <SpouseChildDetails
                    key="7"
                    pageName={props.pageName || 'signup'}
                  />,
                ]
              : []),

            <ParentsDetails key="8" pageName={props.pageName || 'signup'} />,

            <UserBussiness
              key="9"
              BUSSINTRST={BUSSINTRST}
              setBUSSINTRST={setBUSSINTRST}
              pageName={props.pageName || 'signup'}
            />,

            ...(BUSSINTRST === 'Y'
              ? [
                  <BussinessStream
                    key="10"
                    BUSSSTREAM={BUSSSTREAM}
                    setBUSSSTREAM={setBUSSSTREAM}
                    pageName={props.pageName || 'signup'}
                  />,
                  <BussinessType
                    key="11"
                    BUSSTYPE={BUSSTYPE}
                    setBUSSTYPE={setBUSSTYPE}
                    pageName={props.pageName || 'signup'}
                  />,
                ]
              : []),

            <UserHobbies
              key="12"
              HOBBIES={HOBBIES}
              setHOBBIES={setHOBBIES}
              pageName={props.pageName || 'signup'}
            />,
          ],
          [
            fullname,
            date,
            age,
            mobile,
            gender,
            pincode,
            city,
            address,
            cityCode,
            stateCode,
            stateName,
            districtCode,
            districtName,
            education,
            institution,
            profession,
            professionDesc,
            spousename,
            spouseId,
            children,
            fathername,
            fatherId,
            mothername,
            motherId,
            isNavigating,
            userMarried,
            BUSSINTRST,
            BUSSSTREAM,
            BUSSTYPE,
            HOBBIES,
          ],
        )
      : useMemo(
          () => [
            <UserDetails key="1" pageName={props.pageName || 'signup'} />,
            <GenderDetails key="2" pageName={props.pageName || 'signup'} />,
            <AddressDetails key="3" pageName={props.pageName || 'signup'} />,
            <EducationDetails key="4" pageName={props.pageName || 'signup'} />,
            <ProfessionDetails key="5" pageName={props.pageName || 'signup'} />,

            <UserMarriedYN key="6" pageName={props.pageName || 'signup'} />,

            ...(userMarried === 'Y'
              ? [
                  <SpouseChildDetails
                    key="7"
                    pageName={props.pageName || 'signup'}
                  />,
                ]
              : []),

            <ParentsDetails key="8" pageName={props.pageName || 'signup'} />,
          ],
          [
            fullname,
            date,
            age,
            mobile,
            gender,
            pincode,
            city,
            address,
            cityCode,
            stateCode,
            stateName,
            districtCode,
            districtName,
            education,
            institution,
            profession,
            professionDesc,
            spousename,
            spouseId,
            children,
            fathername,
            fatherId,
            mothername,
            motherId,
            isNavigating,
            userMarried,
            BUSSINTRST,
            BUSSSTREAM,
            BUSSTYPE,
            HOBBIES,
          ],
        );

  // Add this to reset to first page when switching between profile and signup
  useEffect(() => {
    if (props.pageName === 'profile') {
      setCurrentPage(0);
      scrollViewRef?.current?.scrollTo({
        x: 0,
        animated: false,
      });
    }
  }, [props.pageName]);

  useEffect(() => {
    // Skip if we're still loading initial profile data
    if (props.pageName === 'profile' && isInitialLoad) return;

    // Skip if we don't have userMarried value yet
    if (userMarried === '') return;

    let targetPage;

    if (userMarried === 'Y') {
      targetPage =
        props.pageName === 'profile'
          ? pages.findIndex(page => page.type?.name === 'SpouseChildDetails')
          : 6;
    } else {
      targetPage =
        props.pageName === 'profile'
          ? pages.findIndex(page => page.type?.name === 'ParentsDetails')
          : 7;
    }

    // Only update if we found a valid target page and we're not already there
    if (targetPage !== -1 && currentPage !== targetPage) {
      //////////////////////
      if (!validateFields()) {
        return;
      }

      //////////////////
      setCurrentPage(targetPage);
      scrollViewRef?.current?.scrollTo({
        x: targetPage * wp(100),
        animated: props.pageName !== 'profile', // Only animate for signup flow
      });
    }
  }, [userMarried, props.pageName]);

  // Add this to handle initial profile data loading
  useEffect(() => {
    if (props.pageName === 'profile' && userData) {
      setCurrentPage(0);
      scrollViewRef?.current?.scrollTo({
        x: 0,
        animated: false,
      });
      setIsInitialLoad(false);
    }
  }, [userData, props.pageName]);

  useEffect(() => {
    const currentPageName = pages[currentPage]?.type?.name;

    if (BUSSINTRST === 'Y' && currentPageName === 'UserBussiness') {
      setCurrentPage(
        pages.findIndex(page => page.type?.name === 'BussinessStream'),
      );
      scrollViewRef?.current?.scrollTo({
        x:
          pages.findIndex(page => page.type?.name === 'BussinessStream') *
          wp(100),
        animated: true,
      });
    }
  }, [BUSSINTRST]);

  useEffect(() => {
    if (
      currentPage ===
      pages.findIndex(page => page.type?.name === 'UserBussiness')
    ) {
      if (BUSSINTRST === 'N') {
        const nextPageIndex = pages.findIndex(
          page => page.type?.name === 'UserHobbies',
        );
        if (currentPage !== nextPageIndex) {
          setCurrentPage(nextPageIndex);
          scrollViewRef?.current?.scrollTo({
            x: nextPageIndex * wp(100),
            animated: true,
          });
        }
      }
    }
  }, [BUSSINTRST]);

  useEffect(() => {
    if (
      currentPage ===
      pages.findIndex(page => page.type?.name === 'BussinessStream')
    ) {
      if (BUSSINTRST === 'Y' && BUSSSTREAM !== '') {
        const nextPageIndex = pages.findIndex(
          page => page.type?.name === 'BussinessType',
        );
        if (currentPage !== nextPageIndex) {
          setCurrentPage(nextPageIndex);
          scrollViewRef?.current?.scrollTo({
            x: nextPageIndex * wp(100),
            animated: true,
          });
        }
      }
    }
  }, [BUSSSTREAM]);

  useEffect(() => {
    if (BUSSTYPE === '') {
      setCurrentPage(
        pages.findIndex(page => page.type?.name === 'BussinessType'),
      );
      scrollViewRef?.current?.scrollTo({
        x:
          pages.findIndex(page => page.type?.name === 'BussinessType') *
          wp(100),
        animated: true,
      });
    }
  }, [BUSSTYPE]);

  useEffect(() => {
    if (
      currentPage ===
      pages.findIndex(page => page.type?.name === 'BussinessType')
    ) {
      if (BUSSTYPE !== '') {
        const nextPageIndex = pages.findIndex(
          page => page.type?.name === 'UserHobbies',
        );
        if (currentPage !== nextPageIndex) {
          setCurrentPage(nextPageIndex);
          scrollViewRef?.current?.scrollTo({
            x: nextPageIndex * wp(100),
            animated: true,
          });
        }
      }
    }
  }, [BUSSTYPE]);

  useEffect(() => {
    if (
      currentPage === pages.findIndex(page => page.type?.name === 'UserHobbies')
    ) {
      if (HOBBIES.length > 0) {
        const nextPageIndex = pages.findIndex(
          page => page.type?.name === 'FinalStep',
        );

        // Ensure 'FinalStep' exists in pages before navigating
        if (nextPageIndex !== -1 && currentPage !== nextPageIndex) {
          setCurrentPage(nextPageIndex);
          scrollViewRef?.current?.scrollTo({
            x: nextPageIndex * wp(100),
            animated: true,
          });
        }
      }
    }
  }, [HOBBIES]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedValidateFields = useMemo(
    () => debounce(validateFields, 300),
    [],
  );

  // const onMomentumScrollEnd = event => {
  //   const offsetX = event.nativeEvent.contentOffset.x;
  //   const pageIndex = Math.round(offsetX / wp(100));

  //   if (!validateFields()) {
  //     console.log('Validation failed, staying on current page');

  //     setTimeout(() => {
  //       if (scrollViewRef.current) {
  //         scrollViewRef.current.scrollTo({
  //           x: wp(100) * currentPage,
  //           animated: false,
  //         });
  //       }
  //     }, 200);

  //     return;
  //   }

  //   setCurrentPage(pageIndex);
  //   // if (pageIndex > 1) {
  //   //   UpdateUser();
  //   // }
  // };

  // const validateFields = () => {
  //   let errors = {};

  //   if (currentPage === 0) {
  //     if (
  //       props.pageName === 'profile' &&
  //       isPersonalDetailsChanged &&
  //       !isMobileVerified
  //     ) {
  //       errors.mobileVerification = 'Please verify your details';
  //     } else if (props.pageName !== 'profile' && !isMobileVerified) {
  //       errors.mobileVerification = 'Please verify your mobile number';
  //     }

  //     if (!fullname) errors.fullname = 'Full name is required';
  //     if (!mobile) {
  //       errors.mobile = 'Mobile number is required';
  //     } else if (mobile.length !== 10) {
  //       errors.mobile = 'Please enter 10 digits mobile number';
  //     }
  //     if (!date) errors.date = 'Date of birth is required';

  //     if (props.pageName !== 'profile' && !isMobileVerified) {
  //       errors.mobileVerification = 'Please verify your mobile number';
  //     }
  //   } else if (currentPage === 2) {
  //     if (!pincode) errors.pincode = 'Pincode is required';
  //     if (!city) errors.city = 'City is required';
  //     if (!address) errors.address = 'Address is required';
  //     // } else if (currentPage === 7 && age < 21) {
  //   } else if (
  //     pages[currentPage]?.type?.name === 'ParentsDetails' &&
  //     age < 21
  //   ) {
  //     if (!fathername) errors.fathername = 'Father name is required';
  //     if (!mothername) errors.mothername = 'Mother name is required';
  //   }

  //   if (
  //     pages[currentPage]?.type?.name === 'SpouseChildDetails' &&
  //     userMarried === 'Y'
  //   ) {
  //     children.forEach((child, index) => {
  //       // Only validate if at least one field is filled
  //       if (child.name?.trim() || child.dob) {
  //         if (!child.name?.trim()) {
  //           errors[`name_${child.id}`] = 'Child Name is required';
  //         }
  //         if (!child.dob) {
  //           errors[`dob_${child.id}`] = 'Child DOB is required';
  //         }
  //       }
  //     });
  //   }

  //   // || (!hasName && hasDOB)
  //   if (JSON.stringify(errors) !== JSON.stringify(errorMessageRegister)) {
  //     setErrorMessageRegister(errors);
  //   }

  //   return Object.keys(errors).length === 0;
  // };

  const onMomentumScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / wp(100));

    if (
      pages[currentPage]?.type?.name === 'SpouseChildDetails' &&
      errorMessageRegister?.spouseId
    ) {
      // Force scroll back if trying to navigate away with spouse ID error
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: wp(100) * currentPage,
          animated: false,
        });
      }, 200);
      return;
    }

    if (
      pages[currentPage]?.type?.name === 'ParentsDetails' &&
      (errorMessageRegister?.fatherId || errorMessageRegister?.motherId)
    ) {
      // Force scroll back if trying to navigate away with parent ID error
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: wp(100) * currentPage,
          animated: false,
        });
      }, 200);
      return;
    }

    // Validate fields when arriving at a new page
    if (pageIndex !== currentPage) {
      if (!validateFields()) {
        console.log('Validation failed, staying on current page');

        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
              x: wp(100) * currentPage,
              animated: false,
            });
          }
        }, 200);

        return;
      }
    }

    setCurrentPage(pageIndex);
  };

  const validateFields = () => {
    let errors = {};

    if (currentPage === 0) {
      if (
        props.pageName === 'profile' &&
        isPersonalDetailsChanged &&
        !isMobileVerified
      ) {
        errors.mobileVerification = 'Please verify your details';
      } else if (props.pageName !== 'profile' && !isMobileVerified) {
        errors.mobileVerification = 'Please verify your mobile number';
      }

      if (!fullname) errors.fullname = 'Full name is required';
      if (!mobile) {
        errors.mobile = 'Mobile number is required';
      } else if (mobile.length !== 10) {
        errors.mobile = 'Please enter 10 digits mobile number';
      }
      if (!date) errors.date = 'Date of birth is required';
    }
    // Add this condition to validate AddressDetails when it's the current page
    else if (
      currentPage === 2 ||
      pages[currentPage]?.type?.name === 'AddressDetails'
    ) {
      if (!pincode) errors.pincode = 'Pincode is required';
      if (!city) errors.city = 'City is required';
      if (!address) errors.address = 'Address is required';
    } else if (
      pages[currentPage]?.type?.name === 'ParentsDetails' &&
      age < 21
    ) {
      if (!fathername) errors.fathername = 'Father name is required';
      if (!mothername) errors.mothername = 'Mother name is required';

      if (errorMessageRegister?.fatherId) {
        errors.fatherId = errorMessageRegister.fatherId;
      }
      if (errorMessageRegister?.motherId) {
        errors.motherId = errorMessageRegister.motherId;
      }
    }

    if (
      pages[currentPage]?.type?.name === 'SpouseChildDetails' &&
      userMarried === 'Y'
    ) {
      if (errorMessageRegister?.spouseId) {
        errors.spouseId = errorMessageRegister.spouseId;
      }

      children.forEach((child, index) => {
        if (child.name?.trim() || child.dob) {
          if (!child.name?.trim()) {
            errors[`name_${child.id}`] = 'Child Name is required';
          }
          if (!child.dob) {
            errors[`dob_${child.id}`] = 'Child DOB is required';
          }
        }
      });
    }

    setErrorMessageRegister(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (isAttempted) {
      validateFields();
    }
  }, [isAttempted]);

  const handleContinue = () => {
    if (isNavigating) return;
    // a;

    if (
      pages[currentPage]?.type?.name === 'SpouseChildDetails' &&
      errorMessageRegister?.spouseId
    ) {
      // Don't proceed if there's a spouse ID error
      return;
    }

    if (
      pages[currentPage]?.type?.name === 'ParentsDetails' &&
      (errorMessageRegister?.fatherId || errorMessageRegister?.motherId)
    ) {
      // Don't proceed if there's a parent ID error
      return;
    }

    const isValid = validateFields();

    setIsAttempted(true);

    if (
      props.pageName === 'profile' &&
      currentPage === 0 &&
      isPersonalDetailsChanged
    ) {
      setErrorMessageRegister({
        ...errorMessageRegister,
        mobileVerification: 'Please verify your details',
      });
      return;
    }

    if (!isValid) {
      console.log('Validation failed, staying on current page');

      // Scroll to top of current page for better UX
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: wp(100) * currentPage,
          y: 0,
          animated: true,
        });
      }

      return; // ⛔ Don't continue if invalid
    }

    setIsNavigating(true); // ✅ Lock navigation

    const nextPage = currentPage + 1;

    // Navigate after short delay for smooth UX
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: wp(100) * nextPage,
          animated: true,
        });
      }

      setTimeout(() => {
        setIsNavigating(false); // ✅ Unlock after scroll
      }, 300);
    }, 100);

    setCurrentPage(nextPage);
  };

  const handleSkip = () => {
    if (isNavigating) return;

    setIsAttempted(true); // Ensure validation will trigger correctly

    setTimeout(() => {
      const isValid = validateFields();

      if (!isValid) {
        console.log(
          `❌ Validation failed at Page ${currentPage}, stopping skip.`,
        );
        return;
      }

      let nextPage = currentPage;
      console.log(`🔹 Current Page: ${currentPage}`);

      // Skip logic
      if (fullname && mobile && date && pincode && city && address) {
        console.log(
          '✅ All required details are filled, skipping to the last page.',
        );
        nextPage = pages.length - 1;
      } else {
        console.log(
          '⚠️ Required details missing, proceeding with normal skip.',
        );

        while (nextPage < pages.length - 1) {
          nextPage++;
          console.log(`➡️ Moving to Page: ${nextPage}`);

          if (nextPage === 2) {
            console.log('⏸️ Stopping at AddressDetails.js for validation.');
            break;
          }

          if (age < 21 && nextPage === 7) {
            console.log('⏸️ Age < 21, stopping at ParentsDetails.js.');
            break;
          }
        }
      }

      setCurrentPage(nextPage);
      console.log(`🔄 Page updated to: ${nextPage}`);

      setTimeout(() => {
        if (scrollViewRef.current) {
          console.log(`📜 Scrolling to Page: ${nextPage}`);
          scrollViewRef.current.scrollTo({
            x: wp(100) * nextPage,
            animated: true,
          });
        }
        // UpdateUser();
      }, 300);
    }, 0); // Ensure `isAttempted` is updated before validation runs
  };

  const progressPercentage = ((currentPage + 1) / pages.length) * 100;

  const registerUser = async () => {
    setErrorMessageRegister('');

    let errors = {};

    if (!fullname) errors.fullname = 'Full name is required';
    if (!mobile) errors.mobile = 'Mobile number is required';
    if (!date) errors.date = 'Date of birth is required';

    if (!pincode) errors.pincode = 'Pincode is required';
    if (!city) errors.city = 'City is required';
    if (!address) errors.address = 'Address is required';

    if (age < 21) {
      if (!fathername) errors.fathername = 'Father name is required';
      if (!mothername) errors.mothername = 'Mother name is required';
    }

    // If there are validation errors, stop registration
    if (Object.keys(errors).length > 0) {
      setErrorMessageRegister(errors);

      if (!fullname || !mobile || !date) {
        setCurrentPage(0);
      } else if (!pincode || !city || !address) {
        setCurrentPage(2);
      } else if (age < 21 && (!fathername || !mothername)) {
        setCurrentPage(7);
      }

      // Scroll to the required section
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: wp(100) * currentPage,
          animated: true,
        });
      }

      return;
    }

    // setApiLoader(true);

    try {
      const response = await axios.post(`${BASE_URL}register`, {
        PR_FULL_NAME: String(fullname),
        PR_DOB: String(date),
        PR_MOBILE_NO: String(mobile),
        PR_GENDER: String(gender),
        PR_PIN_CODE: String(pincode),

        PR_ADDRESS: String(address),
        PR_CITY_CODE: String(cityCode),
        PR_STATE_CODE: String(stateCode),
        PR_STATE_NAME: String(stateName),
        PR_DISTRICT_CODE: String(districtCode),
        PR_DISTRICT_NAME: String(districtName),
        PR_AREA_NAME: String(city),
        PR_EDUCATION: String(education),
        PR_EDUCATION_DESC: String(institution),
        PR_PROFESSION_ID: Number(professionId),
        PR_PROFESSION_DETA: String(professionDesc),
        PR_SPOUSE_NAME: String(spousename),
        PR_FATHER_NAME: String(fathername),
        // PR_FATHER_ID: String(fatherId),
        // PR_MOTHER_ID: String(motherId),
        PR_SPOUSE_ID: Number(spouseId),
        PR_MOTHER_NAME: String(mothername),
        Children: children,
        PR_MARRIED_YN: String(userMarried),
      });

      console.log('TTTTTTT', response.data);

      if (response.data.success) {
        ToastAndroid.showWithGravity(
          'Registration Successful!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        props.navigation.navigate('Signin');
      } else {
        setErrorMessageRegister(response.data.message) ||
          ToastAndroid.showWithGravity(
            response.data.message || 'Registration failed',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
          );
      }
    } catch (error) {
      console.error('Registration Error:', error);
      ToastAndroid.showWithGravity(
        'Something went wrong. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    } finally {
      // setApiLoader(false);
    }
  };

  return (
    <SignupDataContext.Provider value={signupData}>
      <SafeAreaView style={styles.container}>
        <AppLoader loading={apiLoader} />
        <ImageBackground
          source={BackgroundImage}
          style={{opacity: 0.85, flex: 1}}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <LinearGradient
              start={{x: 1, y: 1.7}}
              end={{x: 0.2, y: 0}}
              colors={['#D9674E', '#FFFFFF']}
              style={{flex: 1, height: '100%', width: '100%'}}>
              {props.pageName === 'profile' ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: hp(2),
                      marginHorizontal: wp(5),
                    }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.goBack()}
                      style={{alignSelf: 'flex-start'}}>
                      <Image
                        source={leftback}
                        style={{height: hp(4.5), width: wp(10)}}
                        tintColor={'#000000'}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('OverView', {userData});
                        }}
                        style={{
                          paddingVertical: hp(0.5),
                          paddingHorizontal: wp(2),
                          marginRight: wp(3),
                          borderRadius: wp(2),
                          // elevation: 5,
                          backgroundColor: '#D6D9C5',
                        }}>
                        <Text
                          style={{
                            color: '#1F260F',
                            fontSize: hp(1.4),
                            fontFamily: 'Poppins-SemiBold',
                            alignSelf: 'flex-end',
                          }}>
                          OverView
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('Drawer')}>
                        <Image
                          source={setting}
                          style={{
                            height: hp(3),
                            width: wp(6),
                            alignSelf: 'flex-end',
                            // margin: wp(5),
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{alignItems: 'center', marginBottom: hp(2)}}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      {profilePicture ? (
                        <Image
                          source={{uri: profilePicture.uri}}
                          style={styles.UserImageDesign}
                        />
                      ) : PROFILE ? (
                        <Image
                          source={{uri: PROFILE}}
                          style={styles.UserImageDesign}
                        />
                      ) : (
                        <Image source={user} style={styles.UserImageDesign} />
                      )}
                      {/* <Image
                        source={
                          profilePicture?.uri
                            ? {uri: profilePicture.uri}
                            : PROFILE && typeof PROFILE === 'string'
                            ? {
                                uri: PROFILE.startsWith('http')
                                  ? PROFILE
                                  : `https://${PROFILE}`,
                              }
                            : user
                        }
                        style={{
                          height: hp(13),
                          width: hp(13),
                          borderRadius: hp(6.5),
                          borderWidth: 1,
                          borderColor: 'red',
                          resizeMode: 'cover',
                        }}
                        onError={e => {
                          console.log(
                            '❌ Failed to load image:',
                            e.nativeEvent,
                          );
                          console.log('Attempted URL:', PROFILE);
                        }}
                      /> */}

                      <Image
                        source={add}
                        style={{
                          height: hp(3),
                          width: wp(6),
                          position: 'absolute',
                          bottom: hp(0.5),
                          right: wp(3),
                        }}
                        tintColor={'#000000'}
                      />
                    </TouchableOpacity>

                    <CustomImagePicker
                      modalVisible={modalVisible}
                      onClose={() => setModalVisible(false)}
                      onImageSelect={handleImageSelect}
                    />
                  </View>

                  <Text
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      // marginTop: hp(1),
                      fontSize: hp(2.2),
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {}
                    {fullname || 'Full Name'}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      fontSize: hp(1.6),
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {city
                      ? `${city}${stateName ? ', ' + stateName : ''}`
                      : stateName || 'Jaipur, Rajasthan'}
                  </Text>
                </View>
              ) : props.pageName === 'AddFamilyMembers' ? (
                <>
                  <View
                    style={{
                      paddingVertical: hp(1),
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: hp(2),
                    }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.goBack()}
                      style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
                      <Image
                        source={leftback}
                        style={{height: hp(4.5), width: wp(10)}}
                        tintColor={'#000000'}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        marginTop: hp(1.2),
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontFamily: ' Poppins-SemiBold',
                          fontWeight: '600',
                          fontSize: hp(3),
                        }}>
                        Add Family Members
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.HeadingText}>
                    Keep your family details updated{'\n'}to help build a
                    stronger Rangrej{'\n'}Samaj community
                  </Text>

                  {/* <View
                    style={{
                      alignItems: 'center',
                      marginTop: hp(2),
                      marginBottom: hp(2),
                    }}>
                    <TouchableOpacity>
                      {profilePicture === null ? (
                        <Image source={user} style={styles.UserImageDesign} />
                      ) : (
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                          <Image
                            source={{uri: profilePicture.uri}}
                            style={styles.UserImageDesign}
                          />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                          source={add}
                          style={{
                            height: hp(3),
                            width: wp(6),
                            position: 'absolute',
                            bottom: hp(0.5),
                            right: wp(3),
                          }}
                          tintColor={'#000000'}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>

                    <CustomImagePicker
                      modalVisible={modalVisible}
                      onClose={() => setModalVisible(false)}
                      onImageSelect={handleImageSelect}
                    />
                  </View> */}
                </>
              ) : (
                <View>
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image
                      source={leftback}
                      tintColor={'black'}
                      style={{height: hp(5), aspectRatio: 1 / 1, margin: hp(2)}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: hp(3.1),
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Create Account
                  </Text>

                  <Text
                    style={{
                      alignSelf: 'center',
                      fontFamily: 'Poppins-Regular',
                      fontSize: hp(2),
                      textAlign: 'center',
                      marginTop: hp(2),
                    }}>
                    Create your account to connect {'\n'} grow, and thrive with
                    our Rangrej{'\n'} Samaj community
                  </Text>
                </View>
              )}

              {/* <View>
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image
                      source={leftback}
                      tintColor={'black'}
                      style={{height: hp(5), aspectRatio: 1 / 1, margin: hp(2)}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: hp(3.1),
                      fontFamily: 'Poppins-Medium',
                    }}>
                    Create Account
                  </Text>

                  <Text
                    style={{
                      alignSelf: 'center',
                      fontFamily: 'Poppins-Regular',
                      fontSize: hp(2),
                      textAlign: 'center',
                      marginTop: hp(2),
                    }}>
                    Create your account to connect {'\n'} grow, and thrive with
                    our Rangrej{'\n'} Samaj community
                  </Text>
                </View> */}

              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {width: `${progressPercentage}%`},
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(progressPercentage)}% Completed
              </Text>

              <View style={{flex: 1, height: hp(55)}}>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={onMomentumScrollEnd}
                  style={{flex: 1, height: '100%'}}>
                  {pages.map((page, index) => (
                    <View>
                      <View
                        style={{
                          position: 'absolute',
                          top: hp(4),
                          right: wp(7),
                          zIndex: 100,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Poppins-SemiBold',
                            fontSize: hp(1.8),
                            zIndex: 100,
                          }}>
                          {currentPage + 1}/{pages.length}
                        </Text>
                      </View>
                      <View
                        key={index}
                        style={{
                          width: wp(100),
                          height: hp(55),
                          // flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {page}
                      </View>
                    </View>
                  ))}
                </ScrollView>

                {props.pageName === 'profile' ? (
                  <View style={{alignSelf: 'center', paddingBottom: hp(2)}}>
                    {[
                      // 'GenderDetails',
                      // 'UserMarriedYN',
                      'UserBussiness',
                      'UserHobbies',
                      'BussinessStream',
                      'BussinessType',
                    ].includes(pages[currentPage]?.type?.name)
                      ? null
                      : currentPage < pages.length - 1 && (
                          // <View
                          //   style={{
                          //     flexDirection: 'row',
                          //     justifyContent: 'space-between',
                          //     // marginTop: hp(2),
                          //     // marginTop: hp(-4),
                          //     // marginBottom: hp(2),
                          //     width: wp(75),
                          //     alignItems: 'center',
                          //   }}>
                          <TouchableOpacity
                            onPress={handleContinue}
                            disabled={isNavigating}
                            style={{
                              backgroundColor: isNavigating
                                ? '#A5D6A7'
                                : '#6A994E',
                              width: wp(75),
                              height: hp(5),
                              borderRadius: wp(2),
                              // marginTop: hp(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{color: '#FFF', fontSize: hp(1.8)}}>
                              Continue
                            </Text>
                          </TouchableOpacity>
                          // </View>
                        )}

                    {currentPage === pages.length - 1 && (
                      <TouchableOpacity
                        onPress={UpdateUser}
                        style={{
                          backgroundColor: '#6A994E',
                          width: wp(78),
                          height: hp(5),
                          borderRadius: wp(2),
                          // marginTop: hp(1),
                          // marginBottom: hp(2),

                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: '#FFF', fontSize: hp(2)}}>
                          Save & Continue
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View style={styles.navContainer}>
                    {
                      currentPage !== 1 &&
                        (currentPage < pages.length - 1 ? (
                          <View style={styles.navButtons}>
                            <TouchableOpacity onPress={handleSkip}>
                              <Text style={styles.skipText}>Skip all</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={handleContinue}
                              style={styles.continueButton}>
                              <Text style={styles.continueText}>Continue</Text>
                            </TouchableOpacity>
                          </View>
                        ) : props.pageName === 'profile' ? (
                          //  {currentPage === pages.length - 1 && (
                          <TouchableOpacity
                            onPress={UpdateUser}
                            style={{
                              backgroundColor: '#6A994E',
                              width: wp(78),
                              height: hp(5),
                              borderRadius: wp(2),
                              // marginTop: hp(1),
                              marginBottom: hp(2),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{color: '#FFF', fontSize: hp(2)}}>
                              Save & Continue
                            </Text>
                          </TouchableOpacity>
                        ) : // )}
                        props.pageName === 'AddFamilyMembers' ? (
                          <TouchableOpacity
                            onPress={UpdateUser}
                            style={styles.signUpButton}>
                            <Text style={styles.signUpText}>Add Member</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={UpdateUser}
                            style={styles.signUpButton}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                          </TouchableOpacity>
                        ))
                      // <TouchableOpacity
                      //   onPress={UpdateUser}
                      //   style={styles.signUpButton}>
                      //   <Text style={styles.signUpText}>Sign Up</Text>
                      // </TouchableOpacity>
                    }
                  </View>
                )}
              </View>
            </LinearGradient>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </SafeAreaView>
    </SignupDataContext.Provider>
  );
};

const styles = StyleSheet.create({
  pageContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  navContainer: {
    paddingVertical: hp(2),
    alignItems: 'center',
    paddingBottom: hp(6),
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(75),
    // top: 0,
    alignItems: 'center',
  },
  skipText: {textDecorationLine: 'underline', fontSize: hp(1.8)},
  continueButton: {
    backgroundColor: '#6A994E',
    width: wp(34),
    height: hp(5),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {color: '#FFF', fontSize: hp(1.8)},
  signUpButton: {
    backgroundColor: '#6A994E',
    width: wp(78),
    height: hp(5),
    borderRadius: wp(2),
    marginTop: hp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {color: '#FFF', fontSize: hp(2)},

  container: {
    flex: 1,
  },

  text: {
    color: 'black',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
    marginTop: hp(2.5),
    marginLeft: wp(11),
    textAlign: 'left',
  },
  dropdown1: {
    height: hp(6),

    width: wp(88),

    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',
    // borderWidth: wp(.3),
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(5),
    borderRadius: wp(10),
    color: 'black',
    fontSize: hp(2.4),
    fontFamily: 'Lora-VariableFont_wght',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: 'black',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
  },
  selectedTextStyle1: {
    color: 'black',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
  },
  iconStyle1: {
    width: hp(3.5),
    height: wp(7),
    // paddingRight: wp(1)
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },
  cancelContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: wp(2),
    width: wp(7),
    height: hp(4),
    marginTop: hp(2),
  },
  preview: {
    // flex: 1,
    height: hp(47),
    // width: wp(40),
    // justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    marginHorizontal: wp(4),
    // marginVertical: hp(2),
  },
  insideCaptureButton: {
    width: 65,
    height: 65,
    borderRadius: wp(100),
    backgroundColor: '#4f4f4f',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: wp(100),
    alignSelf: 'center',
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    // backgroundColor: '#303030',
    // maxHeight: 700,

    borderRadius: wp(2),
    top: hp(5),
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outlineContainer: {},
  cameraContainer: {
    height: hp(40),

    justifyContent: 'center',

    marginHorizontal: wp(10),
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  Header: {
    borderBottomWidth: wp(0.4),
    borderColor: '#900075',
    backgroundColor: '#900075',
    height: hp(18.5),
    width: wp(100),
  },
  UserImageDesign: {
    height: hp(14),
    width: wp(28),
    // borderWidth: 1,
    // borderColor: 'red',
    aspectRatio: 1 / 1,
    borderRadius: hp(10),
  },
  EditButton: {
    borderWidth: wp(0.2),
    borderColor: '#fff',
    height: hp(3),
    width: wp(17),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
    marginTop: hp(1),
  },
  SignOptionButton: {
    backgroundColor: '#fff',
    height: hp(5.8),
    width: wp(50),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    top: hp(-2),
    left: wp(-1.5),
  },
  buttonGradient: {
    borderRadius: wp(10),
    borderWidth: wp(0.1),
    alignSelf: 'center',
    width: wp(10),
    height: hp(2.2),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: hp(0.5),
  },

  UserImageDesign: {
    height: hp(13),
    width: wp(28),
    // borderWidth: 1,
    // borderColor: 'red',
    // width: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: hp(10),
  },
  HeadingText: {
    textAlign: 'center',
    marginHorizontal: wp(5),
    justifyContent: 'center',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Regular',
    marginTop: hp(2),
    color: '#177373',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 20,
  // },
  progressBarContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 11,
    backgroundColor: '#D9CAAD',
    borderRadius: 10,
    // marginBottom: 10,
    marginTop: hp(1),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8C6258',
  },
  progressText: {
    fontSize: wp(3.4),
    fontFamily: 'Poppins-Bold',
    marginLeft: wp(5),
    alignSelf: 'flex-start',
  },
  pageContainer: {
    marginBottom: 20,
    // zIndex:100
    // alignItems: 'center',
  },
  pageText: {
    fontSize: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    // marginTop: hp(2),
    // marginBottom: hp(12),
    position: 'absolute',
    bottom: hp(15),
    alignSelf: 'center',
  },
});

export default Signup;
