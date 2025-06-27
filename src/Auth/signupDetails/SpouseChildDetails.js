import {
  React,
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import spouse from '../../provider/png/spouse.png';
import childrenw from '../../provider/png/children.png';
import dob from '../../provider/png/dob.png';
import id from '../../provider/png/id.png';
import {SignupDataContext} from '../SignupDataContext';
import {ProfileDataContext} from '../ProfileDataContext';
import {BASE_URL} from '../../api/ApiInfo';
import {useTranslation} from 'react-i18next';

const SpouseChildDetails = ({pageName = 'signup'}) => {
  const {t} = useTranslation();
  // Context and state initialization
  const signupContext = useContext(SignupDataContext) || {};
  const profileContext = useContext(ProfileDataContext) || {};

  const {
    spousename,
    setSpouseName,
    children,
    setChildren,
    isNavigating,
    errorMessageRegister,
    setErrorMessageRegister,
    isAttempted,
    pages,
    currentPage,
    spouseId,
    setSpouseId,
    fatherId,
    motherId,
  } = signupContext;

  const {SPOUSENAME, setSPOUSENAME, CHILDREN, setCHILDREN} = profileContext;

  const [errors, setErrors] = useState({});
  const [localChildren, setLocalChildren] = useState([
    {id: 1, name: '', dob: null},
  ]);
  const scrollViewRef = useRef();

  const isCurrentPage =
    pages?.[currentPage]?.type?.name === 'SpouseChildDetails';

  // Date handling functions
  const openDatePicker = id => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          const updatedFields = localChildren.map(child =>
            child.id === id ? {...child, dob: selectedDate} : child,
          );
          setLocalChildren(updatedFields);
          setChildren(updatedFields);

          // Clear any errors for this field
          setErrors(prev => ({
            ...prev,
            [`${t('SpouseDetail.dob_')}${id}`]: undefined,
          }));
          setErrorMessageRegister?.(prev => ({
            ...prev,
            [`${t('SpouseDetail.dob_')}${id}`]: undefined,
          }));
        }
      },
      mode: 'date',
      is24Hour: true,
      maximumDate: new Date(),
    });
  };

  const formatDate = date => {
    if (!date) return '';
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj)) return '';

      return `${dateObj.getDate().toString().padStart(2, '0')}-${(
        dateObj.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${dateObj.getFullYear()}`;
    } catch {
      return '';
    }
  };

  // Child management functions
  const handleValueChange = (text, id, field) => {
    const updatedFields = localChildren.map(child =>
      child.id === id ? {...child, [field]: text} : child,
    );
    setLocalChildren(updatedFields);
    setChildren(updatedFields);
    setErrors(prev => ({...prev, [`${field}_${id}`]: undefined}));
    setErrorMessageRegister?.(prev => ({
      ...prev,
      [`${field}_${id}`]: undefined,
    }));
  };

  const addChild = () => {
    if (!validateFields()) return;
    const newChild = {id: localChildren.length + 1, name: '', dob: null};
    setLocalChildren([...localChildren, newChild]);
  };

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    localChildren.forEach(child => {
      // Check if either name or dob is present but not both
      if ((child.name && !child.dob) || (!child.name && child.dob)) {
        if (!child.name.trim()) {
          newErrors[`${t('SpouseDetail.name_')}${child.id}`] = t(
            'SpouseDetail.Child Name is required',
          );
        }
        if (!child.dob) {
          newErrors[`${t('SpouseDetail.dob_')}${child.id}`] = t(
            'SpouseDetail.Child DOB is required',
          );
        }
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    if (isAttempted && isCurrentPage) {
      validateFields();
    }
  }, [isAttempted, isCurrentPage]);

  const validateSpouseId = useCallback(
    async id => {
      if (!id) {
        setErrors(prev => ({...prev, spouseId: undefined}));
        setErrorMessageRegister?.(prev => ({...prev, spouseId: undefined}));
        return true;
      }

      try {
        // Check against fatherId and motherId from context
        if (id === fatherId) {
          const errorMessage = t(
            'SpouseDetail.Spouse ID cannot be same as Father ID',
          );
          setErrors(prev => ({...prev, spouseId: errorMessage}));
          setErrorMessageRegister?.(prev => ({
            ...prev,
            spouseId: errorMessage,
          }));
          return false;
        }

        if (id === motherId) {
          const errorMessage = t(
            'SpouseDetail.Spouse ID cannot be same as Mother ID',
          );
          setErrors(prev => ({...prev, spouseId: errorMessage}));
          setErrorMessageRegister?.(prev => ({
            ...prev,
            spouseId: errorMessage,
          }));
          return false;
        }

        const response = await fetch(`${BASE_URL}/user/check/${id}`);
        const result = await response.json();

        if (!result.success) {
          const errorMessage = result.message.includes(
            t('SpouseDetail.PR_UNIQUE_ID not present'),
          )
            ? t('SpouseDetail.Spouse ID not found in registry')
            : result.message;

          setErrors(prev => ({...prev, spouseId: errorMessage}));
          setErrorMessageRegister?.(prev => ({
            ...prev,
            spouseId: errorMessage,
          }));
          return false;
        } else {
          setErrors(prev => ({...prev, spouseId: undefined}));
          setErrorMessageRegister?.(prev => ({...prev, spouseId: undefined}));

          // Auto-fill Spouse Name if available
          if (result.data?.PR_FULL_NAME) {
            setSpouseName?.(result.data.PR_FULL_NAME);
            setSPOUSENAME?.(result.data.PR_FULL_NAME);
          }

          return true;
        }
      } catch (error) {
        console.error(t('SpouseDetail.Error validating spouse ID:'), error);
        const networkErrorMessage = t(
          'SpouseDetail.Unable to validate Spouse ID. Please check your connection.',
        );
        setErrors(prev => ({...prev, spouseId: networkErrorMessage}));
        setErrorMessageRegister?.(prev => ({
          ...prev,
          spouseId: networkErrorMessage,
        }));
        return false;
      }
    },
    [fatherId, motherId, setErrorMessageRegister, setSpouseName, setSPOUSENAME],
  );

  const getOrdinal = n => {
    const ordinals = [
      t('SpouseDetail.First'),
      t('SpouseDetail.Second'),
      t('SpouseDetail.Third'),
      t('SpouseDetail.Fourth'),
      t('SpouseDetail.Fifth'),
      t('SpouseDetail.Sixth'),
      t('SpouseDetail.Seventh'),
      t('SpouseDetail.Eighth'),
      t('SpouseDetail.Ninth'),
      t('SpouseDetail.Tenth'),
    ];
    return ordinals[n - 1] || `${n}${t('SpouseDetail.th')}`;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {pageName === 'profile' ? 'Spouse Details' : 'Spouse/Child Details'}
        </Text>

        {/* Spouse Name Input */}
        <View style={styles.inputContainer}>
          <Image
            source={spouse}
            style={styles.inputIcon}
            tintColor={'#BFBDBE'}
          />
          <TextInput
            style={styles.inputField}
            placeholder={t('SpouseDetail.Spouse Name')}
            placeholderTextColor={'#BFBDBE'}
            value={spousename || SPOUSENAME}
            onChangeText={text => {
              setSpouseName?.(text);
              setSPOUSENAME?.(text);
            }}
          />
        </View>

        {/* Spouse ID Input */}
        <View
          style={[
            styles.inputContainer,
            errors.spouseId && styles.errorBorder,
          ]}>
          <Image source={id} style={styles.inputIcon} tintColor={'#BFBDBE'} />
          <TextInput
            style={styles.inputField}
            placeholder={t('SpouseDetail.Spouse ID [Optional]')}
            placeholderTextColor={'#BFBDBE'}
            value={spouseId || ''}
            onChangeText={text => {
              setSpouseId?.(text);
              setErrors(prev => ({...prev, spouseId: undefined}));
            }}
            onBlur={async () => {
              const isValid = await validateSpouseId(spouseId);
              if (!isValid && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({y: 0, animated: true});
              }
            }}
          />
        </View>
        {errors.spouseId && (
          <Text style={styles.errorText}>{errors.spouseId}</Text>
        )}

        {/* Children Fields */}
        {pageName === 'signup' && (
          <View>
            {localChildren.map((child, index) => {
              const ordinalLabel = getOrdinal(index + 1);
              return (
                <View key={child.id}>
                  {/* Child Name Input */}
                  <View style={styles.inputContainer}>
                    <Image
                      source={childrenw}
                      style={styles.inputIcon}
                      tintColor={'#BFBDBE'}
                    />
                    <TextInput
                      style={styles.inputField}
                      placeholder={`${ordinalLabel} ${t(
                        'SpouseDetail.Child Name',
                      )}`}
                      placeholderTextColor={'#BFBDBE'}
                      value={child.name}
                      onChangeText={text =>
                        handleValueChange(text, child.id, 'name')
                      }
                    />
                  </View>
                  {(errors[`${t('SpouseDetail.name_')}${child.id}`] ||
                    (child.dob && !child.name.trim())) && (
                    <Text style={styles.errorText}>
                      {errors[`${t('SpouseDetail.name_')}${child.id}`] ||
                        t('SpouseDetail.Child Name is required')}
                    </Text>
                  )}

                  {/* Child DOB Picker */}
                  <TouchableOpacity
                    onPress={() => openDatePicker(child.id)}
                    style={styles.datePicker}>
                    <Image
                      source={dob}
                      style={styles.inputIcon}
                      tintColor={'#BFBDBE'}
                    />
                    <Text
                      style={[
                        styles.dateText,
                        child.dob && {color: '#000000'},
                      ]}>
                      {child.dob
                        ? formatDate(child.dob)
                        : `${ordinalLabel} ${t('SpouseDetail.Child DOB')}`}
                    </Text>
                  </TouchableOpacity>
                  {(errors[`${t('SpouseDetail.dob_')}${child.id}`] ||
                    (child.name.trim() && !child.dob)) && (
                    <Text style={styles.errorText}>
                      {errors[`${t('SpouseDetail.dob_')}${child.id}`] ||
                        t('SpouseDetail.Child DOB is required')}
                    </Text>
                  )}
                </View>
              );
            })}

            {/* Add Child Button */}
            <TouchableOpacity onPress={addChild} style={styles.addButton}>
              <Text style={styles.addButtonText}>
                {t('SpouseDetail.Add Child')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(197, 206, 217, 0.7)',
    padding: hp(2),
    marginBottom: hp(1.5),
    borderRadius: wp(5),
    marginTop: hp(3),
  },
  contentContainer: {
    marginBottom: hp(3),
    width: wp(83),
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(2.5),
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    color: '#000000',
  },
  inputContainer: {
    width: wp(83),
    borderRadius: wp(2),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: hp(2),
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: wp(0.3),
  },
  inputIcon: {
    height: hp(2.8),
    width: wp(5.8),
    position: 'absolute',
    zIndex: 11,
    marginLeft: wp(2.5),
  },
  inputField: {
    paddingLeft: wp(10),
    width: wp(80),
    color: 'black',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
  datePicker: {
    width: wp(83),
    height: hp(5.5),
    marginTop: hp(2),
    paddingLeft: wp(5.5),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: wp(2),
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    marginLeft: wp(4.5),
    fontSize: hp(1.8),
    fontFamily: 'Poppins-Medium',
    color: '#BFBDBE',
  },
  addButton: {
    backgroundColor: '#F27F3D',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.8),
    borderRadius: wp(2),
    width: wp(80),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
    marginRight: wp(1),
  },
  addButtonText: {
    fontSize: hp(1.4),
    fontFamily: 'Poppins-Medium',
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    fontSize: hp(1.5),
    fontFamily: 'Poppins-Medium',
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
});

export default SpouseChildDetails;
