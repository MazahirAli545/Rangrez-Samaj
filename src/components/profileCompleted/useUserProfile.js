// hooks/useUserProfile.js
import {useEffect, useState} from 'react';
import {getData, async_keys} from '../../api/UserPreference';
import {BASE_URL} from '../../api/ApiInfo';

const useUserProfile = () => {
  const [userDataa, setUserDataa] = useState(null);
  const [PRmodalVisible, setPRModalVisible] = useState(false);
  const [completionPercentagee, setCompletionPercentagee] = useState(0);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getData(async_keys.auth_token);
      setToken(storedToken || '');
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success && data.data) {
          setUserDataa(JSON.stringify(data.data));
          calculateCompletionPercentage(JSON.stringify(data.data));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const calculateCompletionPercentage = data => {
    const requiredFields = [
      'PR_PHOTO_URL',
      'PR_FULL_NAME',
      'PR_DOB',
      'PR_MOBILE_NO',
      'PR_GENDER',
      'PR_PIN_CODE',
      'PR_AREA_NAME',
      'PR_ADDRESS',
      'PR_STATE_CODE',
      'City.CITY_ST_NAME',
      'PR_EDUCATION',
      'PR_EDUCATION_DESC',
      'PR_DISTRICT_CODE',
      'City.CITY_DS_NAME',
      'PR_PROFESSION_DETA',
      'Profession.PROF_NAME',
      'PR_FATHER_NAME',
      'PR_MOTHER_NAME',
      'PR_SPOUSE_NAME',
      'Children',
      'PR_MARRIED_YN',
      'PR_BUSS_INTER',
      'PR_BUSS_STREAM',
      'PR_BUSS_TYPE',
      'PR_HOBBY',
    ];

    let filledFields = 0;

    requiredFields.forEach(field => {
      const value = field.includes('.')
        ? field.split('.').reduce((obj, key) => obj?.[key], data)
        : data[field];
      if (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        filledFields++;
      }
    });

    const completion = Math.round((filledFields / requiredFields.length) * 100);
    setCompletionPercentagee(completion);

    if (data.PR_IS_COMPLETED === 'N') {
      setPRModalVisible(true);
    }
  };

  return {userDataa, PRmodalVisible, setPRModalVisible, completionPercentagee};
};

export default useUserProfile;
