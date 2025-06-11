import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../components/Footer';
import leftback from '../provider/png/leftback.png';
import search from '../provider/png/search.png';
import rightpage from '../provider/png/rightpage.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import user from '../provider/png/user.png';
import {BASE_URL} from '../api/ApiInfo';
import {getData, async_keys} from '../api/UserPreference';
import axios from 'axios';

const FamilyMemberDetails = ({navigation}) => {
  // Add the conversion function
  const convertUniqueIdToPrId = async uniqueId => {
    if (!uniqueId) return null;
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

  // State management
  const [state, setState] = useState({
    token: '',
    searchText: '',
    familyMembers: [],
    loading: true,
    error: null,
    userData: null,
  });

  // Memoized fetch function - updated to convert IDs
  const fetchFamilyMembers = useCallback(
    async userData => {
      try {
        setState(prev => ({...prev, loading: true, error: null}));

        // Convert parent IDs if they exist
        let fatherPrId = userData.PR_FATHER_ID;
        let motherPrId = userData.PR_MOTHER_ID;

        if (
          userData.PR_FATHER_ID &&
          typeof userData.PR_FATHER_ID === 'string'
        ) {
          fatherPrId = await convertUniqueIdToPrId(userData.PR_FATHER_ID);
          if (!fatherPrId) {
            throw new Error('Invalid father ID');
          }
        }

        if (
          userData.PR_MOTHER_ID &&
          typeof userData.PR_MOTHER_ID === 'string'
        ) {
          motherPrId = await convertUniqueIdToPrId(userData.PR_MOTHER_ID);
          if (!motherPrId) {
            throw new Error('Invalid mother ID');
          }
        }

        const queryParams = [];
        if (fatherPrId) queryParams.push(`father_id=${fatherPrId}`);
        if (motherPrId) queryParams.push(`mother_id=${motherPrId}`);
        queryParams.push(`id=${userData.PR_ID}`);

        const response = await fetch(
          `${BASE_URL}users/family-members?${queryParams.join('&')}`,
          {headers: {Authorization: `Bearer ${state.token}`}},
        );

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch family members');
        }

        const filteredMembers = (data.familyMembers || []).filter(
          member => member.PR_ID !== userData.PR_ID,
        );

        setState(prev => ({
          ...prev,
          familyMembers: filteredMembers,
          loading: false,
          error: null,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error.message || 'Failed to load family members',
          loading: false,
        }));
        console.error('Fetch error:', error);
      }
    },
    [state.token],
  );

  // Initial data loading
  useEffect(() => {
    const initializeData = async () => {
      try {
        const [storedToken, storedUserData] = await Promise.all([
          getData(async_keys.auth_token),
          getData(async_keys.user_data),
        ]);

        setState(prev => ({
          ...prev,
          token: storedToken || '',
          userData: storedUserData || null,
        }));

        if (storedUserData) {
          fetchFamilyMembers(storedUserData);
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to initialize data',
          loading: false,
        }));
      }
    };

    initializeData();
  }, [fetchFamilyMembers]);

  // Filter data based on search text
  const filteredData = state.familyMembers.filter(item =>
    item.PR_FULL_NAME?.toLowerCase().includes(state.searchText.toLowerCase()),
  );

  // Render loading state
  if (state.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render error state
  if (state.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{state.error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => state.userData && fetchFamilyMembers(state.userData)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render list item
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MemberDetailDescription', {member: item})
      }
      style={styles.cardContainer}>
      <View style={styles.memberInfoContainer}>
        {item.PR_PHOTO_URL?.trim() ? (
          <Image
            source={{uri: item.PR_PHOTO_URL}}
            style={styles.profileImage}
            onError={() => console.log('Image failed:', item.PR_ID)}
          />
        ) : (
          <Image source={user} style={styles.profileImage} />
        )}

        <View style={styles.memberDetails}>
          <Text style={styles.nameText}>{item.PR_FULL_NAME}</Text>
          <Text style={styles.phoneText}>{item.PR_MOBILE_NO}</Text>
          {item.Profession && (
            <Text style={styles.professionText}>
              {item.Profession.PR_PROFESSION_NAME}
            </Text>
          )}
        </View>
      </View>
      <Image source={rightpage} tintColor="#888" style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={styles.backgroundImage}
        imageStyle={{opacity: 0.85}}>
        <LinearGradient
          colors={['#BDD9F2', '#F0F2F2']}
          style={styles.gradientContainer}
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={leftback}
                style={styles.backIcon}
                tintColor="#000"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Family Details</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Image source={search} style={styles.searchIcon} />
            <TextInput
              placeholder="Search family members..."
              placeholderTextColor="#000"
              value={state.searchText}
              onChangeText={text =>
                setState(prev => ({...prev, searchText: text}))
              }
              style={styles.searchInput}
              clearButtonMode="while-editing"
            />
          </View>

          {/* Member List */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.listContainer}>
            {filteredData.length === 0 ? (
              <Text style={styles.noResultsText}>
                {state.searchText
                  ? 'No matching family members found'
                  : 'No family members found'}
              </Text>
            ) : (
              <FlatList
                removeClippedSubviews={false}
                data={filteredData}
                keyExtractor={item => item.PR_ID}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={10}
                showsVerticalScrollIndicator={false}
              />
            )}
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>

      {/* Footer */}
      {/* <View style={styles.footer}>
        <Footer title="Directory" />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F2',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradientContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: hp(2),
    marginBottom: hp(2),
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#BDD9F2',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: wp(2),
  },
  retryButtonText: {
    color: '#000',
    fontSize: hp(2),
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  backButton: {
    marginRight: wp(2),
  },
  backIcon: {
    height: hp(4.5),
    width: wp(10),
  },
  headerTitle: {
    flex: 1,
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: hp(3),
    textAlign: 'center',
    marginRight: wp(10), // Balance the back button space
  },
  searchContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  searchIcon: {
    height: hp(3),
    width: wp(6),
    marginLeft: wp(2),
  },
  searchInput: {
    flex: 1,
    fontSize: hp(2.2),
    color: '#000',
    paddingLeft: wp(10),
    paddingRight: wp(3),
    fontFamily: 'Poppins-Regular',
  },
  listContainer: {
    flex: 1,
    marginTop: hp(1.5),
    // paddingBottom: hp(10),
  },
  listContent: {
    paddingHorizontal: wp(5),
  },
  noResultsText: {
    fontSize: hp(2),
    color: '#555',
    marginTop: hp(5),
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#F2E8CF',
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    height: hp(7),
    width: hp(7),
    borderRadius: hp(3.5),
    resizeMode: 'cover',
  },
  memberDetails: {
    marginLeft: wp(5),
    flex: 1,
  },
  nameText: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
    color: '#1F260F',
  },
  phoneText: {
    fontSize: hp(1.6),
    fontFamily: 'Poppins-Medium',
    color: '#4E5927',
    marginTop: hp(0.3),
  },
  professionText: {
    fontSize: hp(1.5),
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: hp(0.3),
  },
  arrowIcon: {
    height: hp(2.5),
    width: hp(2.5),
  },
  footer: {
    position: 'absolute',
    bottom: hp(4),
    alignSelf: 'center',
    borderRadius: wp(10),
  },
});

export default FamilyMemberDetails;
