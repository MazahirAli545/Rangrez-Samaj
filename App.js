import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/Auth/SplashScreen';
import Onboarding from './src/Auth/Onboarding';
import Signin from './src/Auth/Signin';
import Signup from './src/Auth/Signup';
// import {initializeApp} from '@react-native-firebase/app';

import HomeScreen from './src/Home/HomeScreen';
import Donation from './src/Home/Donation';
import DonationDetail from './src/Home/DonationDetail';
import Directory from './src/Home/Directory';
import Announcement from './src/Home/Announcement';
import AnnouncementDetail from './src/Home/AnnouncementDetail';
import Profile from './src/Home/Profile';
import Drawer from './src/Home/Drawer';
import PrivacyPolicy from './src/Home/PrivacyPolicy';
import TermsAndConditions from './src/Home/TermsAndConditions';
import Aboutus from './src/Home/Aboutus';
import FeedBack from './src/Home/FeedBack';
import Contact from './src/Home/Contact';
import Fundinsights from './src/Home/Fundinsights';
import OverView from './src/Home/OverView';
import MyDonation from './src/Home/MyDonation';
import PaymentGateway from './src/Home/PaymentGateway';
import AddFamilyMembers from './src/Home/AddFamilyMembers';
import FamilyMemberDetails from './src/Home/FamilyMemberDetails';
import MemberDetailDescription from './src/Home/MemberDetailDescription';
import DownloadCertificate from './src/Home/DownloadCertificate';
import PastEvent from './src/Home/PastEvent';
import PastEventsDetails from './src/Home/PastEventsDetails';
import MyDonationDetail from './src/Home/MyDonationDetail';
import BackgroundImage from './src/provider/png/BackgroundImage.png';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import i18n from './src/components/i18n';
import {I18nextProvider} from 'react-i18next';
import {setupForegroundNotificationHandler} from './src/Notification/Foreground';
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    setupForegroundNotificationHandler();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        {/* <StatusBar barStyle="dark-content" translucent={true} backgroundColor={"transparent"} /> */}

        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Donation" component={Donation} />
          <Stack.Screen name="DonationDetail" component={DonationDetail} />
          <Stack.Screen name="Directory" component={Directory} />
          <Stack.Screen name="Announcement" component={Announcement} />
          <Stack.Screen
            name="AnnouncementDetail"
            component={AnnouncementDetail}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Drawer" component={Drawer} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />
          <Stack.Screen name="Aboutus" component={Aboutus} />
          <Stack.Screen name="FeedBack" component={FeedBack} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Fundinsights" component={Fundinsights} />
          <Stack.Screen name="OverView" component={OverView} />
          <Stack.Screen name="MyDonation" component={MyDonation} />
          <Stack.Screen name="MyDonationDetail" component={MyDonationDetail} />
          <Stack.Screen name="PaymentGateway" component={PaymentGateway} />
          <Stack.Screen name="AddFamilyMembers" component={AddFamilyMembers} />
          <Stack.Screen
            name="FamilyMemberDetails"
            component={FamilyMemberDetails}
          />
          <Stack.Screen
            name="MemberDetailDescription"
            component={MemberDetailDescription}
          />
          <Stack.Screen
            name="DownloadCertificate"
            component={DownloadCertificate}
          />
          <Stack.Screen name="PastEvent" component={PastEvent} />
          <Stack.Screen
            name="PastEventsDetails"
            component={PastEventsDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
