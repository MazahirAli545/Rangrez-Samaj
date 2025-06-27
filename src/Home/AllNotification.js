import {React, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import i18n from '../components/i18n';
import {getData, async_keys} from '../api/UserPreference';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';

const AllNotification = props => {
  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          colors={['#BDD9F2', '#F0F2F2']}
          style={styles.gradient}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.backButton}>
              <Image
                source={leftback}
                style={styles.backIcon}
                tintColor={'#000000'}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Notification</Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {renderContentSections()}
          </KeyboardAwareScrollView>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    height: hp(100),
    width: wp(100),
    opacity: 0.85,
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: hp(2.3),
  },
  backIcon: {
    height: hp(4.5),
    width: wp(10),
  },
  titleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: hp(3),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(5),
    paddingHorizontal: wp(3),
  },
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontFamily: 'Poppins-SemiBold',
    color: '#1F260F',
    textAlign: 'center',
    marginBottom: hp(2),
    marginTop: hp(2),
  },
  htmlContent: {
    paddingHorizontal: wp(3),
  },
  errorText: {
    color: '#000000',
    fontSize: hp(2),
    textAlign: 'center',
    marginHorizontal: wp(5),
  },
  retryButton: {
    marginTop: hp(2),
  },
  retryText: {
    color: '#1F260F',
    fontSize: hp(2),
    textDecorationLine: 'underline',
  },
});

export default AllNotification;
