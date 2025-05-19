//page number

import {React, useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  FlatList,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Footer from '../components/Footer';
import setting from '../provider/png/setting.png';
import add from '../provider/png/add.png';
import {useCamera} from 'react-native-camera-hooks';
// import CustomImagePicker from '../components/CameraComponent';
import user from '../provider/png/user.png';
import CustomImagePicker from '../components/CameraComponent';
import CameraComponent from '../components/CameraComponent';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import PasswordHide from '../provider/png/PasswordHide.png';
import PasswordShow from '../provider/png/PasswordShow.png';
import leftpage from '../provider/png/leftpage.png';
import rightpage from '../provider/png/rightpage.png';
import leftback from '../provider/png/leftback.png';

import AddressDetails from '../Auth/signupDetails/AddressDetails';
import EducationDetails from '../Auth/signupDetails/EducationDetails';
import GenderDetails from '../Auth/signupDetails/GenderDetails';
import ParentsDetails from '../Auth/signupDetails/ParentsDetails';
import SpouseChildDetails from '../Auth/signupDetails/SpouseChildDetails';
import UserDetails from '../Auth/signupDetails/userDetails';

import UserBussiness from '../Auth/signupDetails/UserBussiness';
import BussinessStream from '../Auth/signupDetails/BussinessStream';
import BussinessType from '../Auth/signupDetails/BussinessType';
import UserHobbies from '../Auth/signupDetails/UserHobbies';
import ProfessionDetails from '../Auth/signupDetails/ProfessionDetails';
import UserMarriedYN from '../Auth/signupDetails/UserMarriedYN';

import OverView from '../Home/OverView';
// import Setting from './Drawer';
import Drawer from '../Home/Drawer';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {Card} from 'react-native-paper';
import {storeData, async_keys, getData} from '../api/UserPreference';
import AppLoader from '../components/AppLoader';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileDataContext} from '../Auth/ProfileDataContext';
import ImageResizer from 'react-native-image-resizer';

const Profile = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const handleImageSelect = image => {
    console.log('Selected image:', image);
    setProfilePicture(image);
  };
  const [PROFILE, SETPROFILE] = useState(null);

  useEffect(() => {
    console.log('Updated profilePicture state:', profilePicture);
  }, [profilePicture]);

  // console.log('PPPPPP', PROFILE);

  const [FULLNAME, setFULLNAME] = useState('');
  const [DATE, setDATE] = useState(null);
  const [AGE, setAGE] = useState(0);
  const [MOBILE, setMOBILE] = useState('');
  const [GENDER, setGENDER] = useState('');
  const [PINCODE, setPINCODE] = useState('');
  const [CITY, setCITY] = useState('');
  const [ADDRESS, setADDRESS] = useState('');
  const [STATECODE, setSTATECODE] = useState('');
  const [STATENAME, setSTATENAME] = useState('');
  const [DISTRICTCODE, setDISTRICTCODE] = useState('');
  const [DISTRICTNAME, setDISTRICTNAME] = useState('');
  const [EDUCATION, setEDUCATION] = useState('');
  const [INSTITUTION, setINSTITUTION] = useState('');
  const [PROFESSIONID, setPROFESSIONID] = useState(null);
  const [PROFESSION, setPROFESSION] = useState('');
  const [PROFESSIONDESC, setPROFESSIONDESC] = useState('');
  const [USERMARRIED, setUSERMARRIED] = useState('');
  const [SPOUSENAME, setSPOUSENAME] = useState('');
  const [CHILDRENN, setCHILDREN] = useState([{id: 1, name: '', dob: null}]);
  const [FATHERNAME, setFATHERNAME] = useState('');
  const [MOTHERNAME, setMOTHERNAME] = useState('');
  const [apiLoader, setApiLoader] = useState(false);
  const [errorMessageRegister, setErrorMessageRegister] = useState('');
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAttempted, setIsAttempted] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState('');

  const [BUSSINTRST, setBUSSINTRST] = useState('');
  const [BUSSSTREAM, setBUSSSTREAM] = useState('');
  const [BUSSTYPE, setBUSSTYPE] = useState('');
  const [HOBBIES, setHOBBIES] = useState([]);

  const [PRID, setPRID] = useState(null);

  console.log('HWHWHWH', USERMARRIED);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getData(async_keys.auth_token);
      setToken(storedToken || 'No Token Found');
    };

    fetchToken();
  }, []);

  const normalizeDate = inputDate => {
    if (!inputDate) return '';
    const parts = inputDate.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return inputDate;
  };

  const calculateAge = dob => {
    if (!dob) return 0;

    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    if (DATE) {
      const normalizedDate = normalizeDate(DATE);
      console.log('Normalized Date:', normalizedDate);

      const calculatedAge = calculateAge(normalizedDate);
      setAGE(calculatedAge);

      console.log('Calculated Age:', calculatedAge);
    }
  }, [DATE]);

  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      // setApiLoader(true);
      try {
        const response = await fetch(`${BASE_URL}profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success && data.data) {
          setUserData(data.data);
          // setProfilePicture(data.data.PR_PHOTO_URL);
          setPRID(data.data.PR_ID);
          SETPROFILE(data.data.PR_PHOTO_URL);
          setFULLNAME(data.data.PR_FULL_NAME);
          setDATE(data.data.PR_DOB);
          setMOBILE(data.data.PR_MOBILE_NO);
          setGENDER(data.data.PR_GENDER);
          setPINCODE(data.data.PR_PIN_CODE);
          setCITY(data.data.PR_AREA_NAME);
          setADDRESS(data.data.PR_ADDRESS);
          setSTATECODE(data.data.PR_STATE_CODE);
          setSTATENAME(data.data.City.CITY_ST_NAME);
          setEDUCATION(data.data.PR_EDUCATION);
          setINSTITUTION(data.data.PR_EDUCATION_DESC);
          setDISTRICTCODE(data.data.PR_DISTRICT_CODE);
          setDISTRICTNAME(data.data.City.CITY_DS_NAME);
          setPROFESSIONID(data.data.Profession.PROF_ID);
          setPROFESSIONDESC(data.data.PR_PROFESSION_DETA);
          setPROFESSION(data.data.Profession.PROF_NAME);
          setFATHERNAME(data.data.PR_FATHER_NAME);
          setMOTHERNAME(data.data.PR_MOTHER_NAME);
          setSPOUSENAME(data.data.PR_SPOUSE_NAME);
          setCHILDREN(data.data.Children);
          setUSERMARRIED(data.data.PR_MARRIED_YN);
          // setHOBBIES(data.data.PR_HOBBY);

          setBUSSINTRST(data.data.PR_BUSS_INTER || 'N');
          setBUSSSTREAM(data.data.PR_BUSS_STREAM || '');
          setBUSSTYPE(data.data.PR_BUSS_TYPE || '');
          setHOBBIES(data.data.PR_HOBBY || []);
        } else {
          setErrorMessage(data.data.message);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('Failed to load user data.');
      }
      // finally {
      //   setApiLoader(false);
      // }
    };

    fetchUserProfile();
  }, [token]);

  console.log('User Data:', userData);

  const existingHobbies = userData?.PR_HOBBY
    ? userData.PR_HOBBY.split(',')
    : [];

  // Check if hobbies have changed
  const hobbiesChanged =
    Array.isArray(HOBBIES) &&
    (HOBBIES.length !== existingHobbies.length ||
      HOBBIES.some(hobby => !existingHobbies.includes(hobby)));

  const UpdateUser = async () => {
    if (!PRID) {
      console.error('PR_ID is missing!');
      return;
    }

    const formData = new FormData();
    formData.append('PR_ID', PRID);
    formData.append('PR_FULL_NAME', FULLNAME || '');
    formData.append('PR_DOB', DATE || '');
    formData.append('PR_MOBILE_NO', MOBILE || '');
    formData.append('PR_GENDER', GENDER || '');
    formData.append('PR_PIN_CODE', PINCODE || '');
    formData.append('PR_AREA_NAME', CITY || '');
    formData.append('PR_ADDRESS', ADDRESS || '');
    formData.append('PR_STATE_CODE', STATECODE || '');
    formData.append('PR_DISTRICT_CODE', DISTRICTCODE || '');
    formData.append('PR_EDUCATION', EDUCATION || '');
    formData.append('PR_EDUCATION_DESC', INSTITUTION || '');
    formData.append('PR_PROFESSION_DETA', PROFESSIONDESC || '');
    formData.append('PR_MARRIED_YN', USERMARRIED || '');
    formData.append('PR_FATHER_NAME', FATHERNAME || '');
    formData.append('PR_MOTHER_NAME', MOTHERNAME || '');
    formData.append('PR_SPOUSE_NAME', SPOUSENAME || '');
    formData.append('PR_BUSS_INTER', BUSSINTRST || 'N');
    formData.append(
      'PR_BUSS_STREAM',
      BUSSINTRST === 'N' ? '' : BUSSSTREAM || '',
    );
    formData.append('PR_BUSS_TYPE', BUSSINTRST === 'N' ? '' : BUSSTYPE || '');
    formData.append(
      'PR_HOBBY',
      hobbiesChanged ? HOBBIES.join(',') : userData?.PR_HOBBY || '',
    );
    // console.log('PROFILE PICTURE', profilePicture);

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
          type: 'image/jpeg', // Ensure it's the correct type
          name: `profile_${Date.now()}.jpg`, // Unique filename
        };

        console.log('IMAGEEEEE', imageFile.uri);

        formData.append('PR_PHOTO_URL', imageFile); // Append the image to FormData
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
      formData.append('PR_PHOTO_URL', userData.PR_PHOTO_URL); // Keep the existing image if no new one is selected
    }

    // Attach profession if available
    if (PROFESSIONID) {
      formData.append('PROFESSION_ID', Number(PROFESSIONID));
    }

    // Handle Children updates
    if (CHILDRENN && Array.isArray(CHILDRENN)) {
      const validChildren = CHILDRENN.filter(
        child => child.name && child.dob,
      ).map((child, index) => ({
        id: child.id ? child.id.toString() : `new-${index}`,
        name: child.name,
        dob: child.dob,
      }));

      if (validChildren.length > 0) {
        formData.append('Children', JSON.stringify(validChildren));
      }

      // console.log('before valid children');

      console.log('Valid Children:', validChildren);
    }

    console.log('formdata: ', formData);

    try {
      const response = await axios.post(`${BASE_URL}edit-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Explicitly set Content-Type
          // Authorization: `Bearer ${token}`, // Ensure token is passed if required
          // Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
          pr_id: Number(PRID),
        },
      });

      console.log('Response:', response.data);

      if (response.data?.success) {
        ToastAndroid.showWithGravity(
          'Profile updated successfully',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } else {
        ToastAndroid.showWithGravity(
          response.data.message || 'Update failed',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } catch (error) {
      console.error('Updation Error:', error.response || error);
      console.log(error.response.data.message);
      ToastAndroid.showWithGravity(
        'Something went wrong. Please try again.',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  const profileData = useMemo(
    () => ({
      FULLNAME,
      setFULLNAME,
      DATE,
      setDATE,
      AGE,
      setAGE,
      MOBILE,
      setMOBILE,
      GENDER,
      setGENDER,
      PINCODE,
      setPINCODE,
      CITY,
      setCITY,
      ADDRESS,
      setADDRESS,
      STATECODE,
      setSTATECODE,
      STATENAME,
      setSTATENAME,
      DISTRICTCODE,
      setDISTRICTCODE,
      DISTRICTNAME,
      setDISTRICTNAME,
      EDUCATION,
      setEDUCATION,
      INSTITUTION,
      setINSTITUTION,
      PROFESSIONID,
      setPROFESSIONID,
      PROFESSION,
      setPROFESSION,
      PROFESSIONDESC,
      setPROFESSIONDESC,
      SPOUSENAME,
      setSPOUSENAME,
      CHILDRENN,
      setCHILDREN,
      FATHERNAME,
      setFATHERNAME,
      MOTHERNAME,
      setMOTHERNAME,
      errorMessageRegister,
      setErrorMessageRegister,
      scrollViewRef,
      currentPage,
      setCurrentPage,
      isAttempted,
      setIsAttempted,
      isNavigating,
      setIsNavigating,
      userData,
      setUserData,
      BUSSINTRST,
      setBUSSINTRST,
      BUSSSTREAM,
      setBUSSSTREAM,
      BUSSTYPE,
      setBUSSTYPE,
      USERMARRIED,
      setUSERMARRIED,
      HOBBIES,
      setHOBBIES,
    }),
    [
      FULLNAME,
      DATE,
      AGE,
      MOBILE,
      GENDER,
      PINCODE,
      CITY,
      ADDRESS,
      STATECODE,
      STATENAME,
      DISTRICTCODE,
      DISTRICTNAME,
      EDUCATION,
      INSTITUTION,
      PROFESSIONID,
      PROFESSION,
      PROFESSIONDESC,
      SPOUSENAME,
      CHILDRENN,
      FATHERNAME,
      MOTHERNAME,
      errorMessageRegister,
      scrollViewRef,
      setCurrentPage,
      currentPage,
      isAttempted,
      isNavigating,
      userData,
      BUSSINTRST,
      BUSSSTREAM,
      BUSSTYPE,
      USERMARRIED,
      HOBBIES,
    ],
  );

  console.log('PROFILE DATA', profileData);
  const pages = useMemo(
    () => [
      <UserDetails
        key="1"
        FULLNAME={FULLNAME}
        setFULLNAME={setFULLNAME}
        DATE={DATE}
        setDATE={setDATE}
        AGE={AGE}
        setAGE={setAGE}
        MOBILE={MOBILE}
        setMOBILE={setMOBILE}
        errorMessageRegister={errorMessageRegister}
        setErrorMessageRegister={setErrorMessageRegister}
        scrollViewRef={scrollViewRef}
        setCurrentPage={setCurrentPage}
        isAttempted={isAttempted}
        setIsAttempted={setIsAttempted}
        isNavigating={isNavigating}
        setIsNavigating={setIsNavigating}
        isEditable={false}
        hideVerifyButton={true}
        userData={userData}
        setUserData={setUserData}
      />,
      <GenderDetails
        key="2"
        GENDER={GENDER}
        setGENDER={setGENDER}
        errorMessageRegister={errorMessageRegister}
        setErrorMessageRegister={setErrorMessageRegister}
        scrollViewRef={scrollViewRef}
        setCurrentPage={setCurrentPage}
        isAttempted={isAttempted}
        setIsAttempted={setIsAttempted}
        isNavigating={isNavigating}
        setIsNavigating={setIsNavigating}
        isEditable={false}
        hideVerifyButton={true}
        userData={userData}
        setUserData={setUserData}
      />,
      <AddressDetails
        key="3"
        PINCODE={PINCODE}
        setPINCODE={setPINCODE}
        CITY={CITY}
        setCITY={setCITY}
        ADDRESS={ADDRESS}
        setADDRESS={setADDRESS}
        STATECODE={STATECODE}
        setSTATECODE={setSTATECODE}
        STATENAME={STATENAME}
        setSTATENAME={setSTATENAME}
        DISTRICTCODE={DISTRICTCODE}
        setDISTRICTCODE={setDISTRICTCODE}
        DISTRICTNAME={DISTRICTNAME}
        setDISTRICTNAME={setDISTRICTNAME}
        errorMessageRegister={errorMessageRegister}
        setErrorMessageRegister={setErrorMessageRegister}
        scrollViewRef={scrollViewRef}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAttempted={isAttempted}
        setIsAttempted={setIsAttempted}
        isNavigating={isNavigating}
        setIsNavigating={setIsNavigating}
      />,
      <EducationDetails
        key="4"
        EDUCATION={EDUCATION}
        setEDUCATION={setEDUCATION}
        INSTITUTION={INSTITUTION}
        setINSTITUTION={setINSTITUTION}
        isNavigating={isNavigating}
        setIsNavigating={setIsNavigating}
      />,
      <ProfessionDetails
        key="5"
        PROFESSIONID={PROFESSIONID}
        setPROFESSIONID={setPROFESSIONID}
        PROFESSION={PROFESSION}
        setPROFESSION={setPROFESSION}
        PROFESSIONDESC={PROFESSIONDESC}
        setPROFESSIONDESC={setPROFESSIONDESC}
        isNavigating={isNavigating}
        setIsNavigating={setIsNavigating}
      />,

      <UserMarriedYN
        key="6"
        USERMARRIED={USERMARRIED}
        setUSERMARRIED={setUSERMARRIED}
      />,

      ...(USERMARRIED === 'Y'
        ? [
            <SpouseChildDetails
              key="7"
              SPOUSENAME={SPOUSENAME}
              setSPOUSENAME={setSPOUSENAME}
              CHILDREN={CHILDRENN}
              setCHILDREN={setCHILDREN}
              isNavigating={isNavigating}
              setIsNavigating={setIsNavigating}
            />,
          ]
        : []),

      ...(USERMARRIED === 'N'
        ? [
            <ParentsDetails
              key="8"
              FATHERNAME={FATHERNAME}
              setFATHERNAME={setFATHERNAME}
              MOTHERNAME={MOTHERNAME}
              setMOTHERNAME={setMOTHERNAME}
              errorMessageRegister={errorMessageRegister}
              setErrorMessageRegister={setErrorMessageRegister}
              scrollViewRef={scrollViewRef}
              setCurrentPage={setCurrentPage}
              isAttempted={isAttempted}
              setIsAttempted={setIsAttempted}
              isNavigating={isNavigating}
              setIsNavigating={setIsNavigating}
            />,
          ]
        : [
            <ParentsDetails
              key="8"
              FATHERNAME={FATHERNAME}
              setFATHERNAME={setFATHERNAME}
              MOTHERNAME={MOTHERNAME}
              setMOTHERNAME={setMOTHERNAME}
              errorMessageRegister={errorMessageRegister}
              setErrorMessageRegister={setErrorMessageRegister}
              scrollViewRef={scrollViewRef}
              setCurrentPage={setCurrentPage}
              isAttempted={isAttempted}
              setIsAttempted={setIsAttempted}
              isNavigating={isNavigating}
              setIsNavigating={setIsNavigating}
            />,
          ]),

      <UserBussiness
        key="9"
        BUSSINTRST={BUSSINTRST}
        setBUSSINTRST={setBUSSINTRST}
      />,

      ...(BUSSINTRST === 'Y'
        ? [
            <BussinessStream
              key="10"
              BUSSSTREAM={BUSSSTREAM}
              setBUSSSTREAM={setBUSSSTREAM}
            />,
            <BussinessType
              key="11"
              BUSSTYPE={BUSSTYPE}
              setBUSSTYPE={setBUSSTYPE}
            />,
          ]
        : []),
      <UserHobbies key="12" HOBBIES={HOBBIES} setHOBBIES={setHOBBIES} />,
    ],
    [
      FULLNAME,
      DATE,
      AGE,
      MOBILE,
      GENDER,
      PINCODE,
      CITY,
      ADDRESS,
      STATECODE,
      STATENAME,
      DISTRICTCODE,
      DISTRICTNAME,
      EDUCATION,
      INSTITUTION,
      PROFESSION,
      PROFESSIONDESC,
      SPOUSENAME,
      CHILDRENN,
      FATHERNAME,
      MOTHERNAME,
      isNavigating,
      userData,
      BUSSINTRST,
      BUSSSTREAM,
      BUSSTYPE,
      USERMARRIED,
      HOBBIES,
    ],
  );

  useEffect(() => {
    if (GENDER !== '' && currentPage === 1) {
      setCurrentPage(2);
      scrollViewRef?.current?.scrollTo({x: 2 * wp(100), animated: true});
    }
  }, [GENDER]);

  useEffect(() => {
    const currentPageName = pages[currentPage]?.type?.name;

    if (USERMARRIED === 'Y' && currentPageName === 'UserMarriedYN') {
      setCurrentPage(6);
      scrollViewRef?.current?.scrollTo({x: 6 * wp(100), animated: true});
    }
  }, [USERMARRIED]);

  useEffect(() => {
    const currentPageName = pages[currentPage]?.type?.name;
    if (USERMARRIED === 'N' && currentPageName === 'UserMarriedYN') {
      setCurrentPage(6);
      scrollViewRef?.current?.scrollTo({x: 6 * wp(100), animated: true});
    }
  }, [USERMARRIED]);

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

  const progressPercentage = ((currentPage + 1) / pages.length) * 100;

  const handleContinue = () => {
    if (currentPage < pages.length - 1) {
      setIsNavigating(true);
      setCurrentPage(prev => prev + 1);

      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * wp(100),
        animated: true,
      });

      setTimeout(() => setIsNavigating(false), 500);
    }
  };

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SafeAreaView style={styles.MainContainer}>
        <AppLoader loading={apiLoader} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ImageBackground
            source={BackgroundImage}
            style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
            <LinearGradient
              start={{x: 1, y: 1.7}}
              end={{x: 0.2, y: 0}}
              // colors={['#ac6f82', '#cfa093']}
              colors={['#BDD9F2', '#F0F2F2']}
              style={{flex: 1, paddingBottom: hp(14)}}>
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
                    onPress={() => props.navigation.navigate('OverView')}
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

                        // margin: wp(5),
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

              <View style={{alignItems: 'center', marginBottom: hp(3)}}>
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
                  marginTop: hp(1),
                  fontSize: hp(2.2),
                  fontFamily: 'Poppins-Medium',
                }}>
                Mazahir Ali
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: hp(1.6),
                  fontFamily: 'Poppins-Regular',
                }}>
                JAIPUR, RAJASTHAN
              </Text>

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

              <View style={{height: hp(56)}}>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={{flex: 1}}
                  onMomentumScrollEnd={event => {
                    const pageIndex = Math.round(
                      event.nativeEvent.contentOffset.x / wp(100),
                    );
                    setCurrentPage(pageIndex);
                  }}>
                  {pages.map((page, index) => (
                    <View key={index} style={{width: wp(100), height: hp(47)}}>
                      {index === currentPage && (
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
                      )}

                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {page}
                      </View>
                    </View>
                  ))}
                </ScrollView>

                <View style={{alignSelf: 'center'}}>
                  {[
                    'GenderDetails',
                    'UserMarriedYN',
                    'UserBussiness',
                    'UserHobbies',
                    'BussinessStream',
                    'BussinessType',
                  ].includes(pages[currentPage]?.type?.name)
                    ? null
                    : currentPage < pages.length - 1 && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: hp(2),
                            width: wp(75),
                            alignItems: 'center',
                          }}>
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
                              marginTop: hp(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{color: '#FFF', fontSize: hp(1.8)}}>
                              Continue
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}

                  {currentPage === pages.length - 1 && (
                    <TouchableOpacity
                      onPress={UpdateUser}
                      style={{
                        backgroundColor: '#6A994E',
                        width: wp(78),
                        height: hp(5),
                        borderRadius: wp(2),
                        marginTop: hp(3),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#FFF', fontSize: hp(2)}}>
                        Save & Continue
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ProfileDataContext.Provider>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  disabledButton: {
    // backgroundColor: '#d3d3d3', // Gray color for disabled state
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressBarContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 10,

    backgroundColor: '#e0e0df',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: hp(2),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
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

  MainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  text: {
    color: 'black',
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
    marginTop: hp(1.5),
    textAlign: 'left',
  },
  dropdown1: {
    height: hp(5.5),

    width: wp(88),

    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderBottomColor: 'gray',

    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    color: 'black',
    fontSize: hp(2.4),
    fontFamily: 'Lora-VariableFont_wght',
  },
  icon1: {
    marginRight: 5,
  },
  placeholderStyle1: {
    // fontSize: hp(1.8),
    color: '#BFBDBE',
    fontSize: hp(1.8),
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
    // width: wp(28),
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
});

export default Profile;
