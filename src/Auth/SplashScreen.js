import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
// import Rangrez from '../provider/png/provider/png/rangrez-high-resolution-logo.png';
import Rangrez from '../provider/png/rangrez-high-resolution-logo.png';
import logo from '../provider/png/logo.png';
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigation.navigate('SignupScreen');
      navigation.navigate('Onboarding');
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={logo}
        style={{
          height: hp(20),
          width: wp(40),
          alignSelf: 'center',
          borderRadius: wp(5),
          borderColor: '#D6D9C5',
          borderWidth: wp(0.3),
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8E021D',
    justifyContent: 'center',
    alignSelf: 'center',
    height: hp(100),
    width: wp(100),
  },
});

export default SplashScreen;
