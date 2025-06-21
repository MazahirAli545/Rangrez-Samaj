import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  //   Share,
} from 'react-native';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import ViewShot from 'react-native-view-shot';
import user from '../provider/png/user.png';
import share from '../provider/png/share.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import leftback from '../provider/png/leftback.png';
import downloadicon from '../provider/png/downloadicon.png';
import CertificateUser from '../provider/png/CertificateUser.png';
import Share from 'react-native-share';
import {sendTestNotification} from '../Notification/Foreground';
import {useTranslation} from 'react-i18next';
const CertificateScreen = ({route, navigation}) => {
  const {t} = useTranslation();

  console.log('Data', userData?.PR_NOTIFICATION);
  const userData = route.params;

  const viewShotRef = useRef(null);

  console.log('WEWEWEWE', userData?.PR_NOTIFICATION);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const sdkInt = Platform.constants.Release;
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission, {
        title: t('DownLoadCertificate.Storage Permission'),
        message: t(
          'DownLoadCertificate.App needs access to your storage to save the certificate.',
        ),
        buttonNeutral: t('DownLoadCertificate.Ask Me Later'),
        buttonNegative: t('DownLoadCertificate.Cancel'),
        buttonPositive: t('DownLoadCertificate.OK'),
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const CertificateTemplate = ({userName, userUniqueId}) => (
    <View style={styles.templateContainer}>
      <ImageBackground
        source={CertificateUser}
        style={styles.certificateBackground}
        resizeMode="contain">
        {/* User Unique ID - Positioned at top-right */}
        <View style={styles.idContainer}>
          <Text style={styles.templateUser1}>{userUniqueId}</Text>
        </View>

        {/* User Name - Centered */}
        <View style={styles.nameContainer}>
          <Text style={styles.templateUser}>{userName}</Text>
        </View>
      </ImageBackground>
    </View>
  );
  const captureAndSaveCertificate = async () => {
    try {
      const permission = await requestPermission();
      if (!permission) {
        Alert.alert(
          t(
            'DownLoadCertificate.Permission denied',
            'Cannot save without permission.',
          ),
        );
        return;
      }

      setTimeout(async () => {
        if (!viewShotRef.current) {
          Alert.alert(
            t('DownLoadCertificate.Error'),
            t('DownLoadCertificate.Certificate not ready for capture.'),
          );
          return;
        }

        const uri = await viewShotRef.current.capture();
        const folderPath = `${RNFS.DownloadDirectoryPath}/${t(
          'DownLoadCertificate.Rangrez',
        )}`;
        const fileName = `${t('DownLoadCertificate,Certificate')}_${
          userData.PR_FULL_NAME
        }_${userData.PR_UNIQUE_ID}.png`;
        const destPath = `${folderPath}/${fileName}`;

        // ✅ Create the folder if it doesn't exist
        const folderExists = await RNFS.exists(folderPath);
        if (!folderExists) {
          await RNFS.mkdir(folderPath);
        }

        // ✅ Save the image to the new folder
        await RNFS.copyFile(uri, destPath);

        // Alert.alert('Success', `Certificate saved to: ${destPath}`);

        if (userData?.PR_NOTIFICATION === 'Y') {
          const templateParams = {
            title: t('DownLoadCertificate.DownLoad Certificate Successfully'),
            body: `${t(
              'DownLoadCertificate.certificate Saved at',
            )} ${destPath} `,
          };

          sendTestNotification(templateParams);
        }
        await FileViewer.open(destPath);
      }, 500);
    } catch (error) {
      console.error(t('DownLoadCertificate.Save error:'), error);
      Alert.alert('Error', error.message || 'Failed to save certificate');
    }
  };

  const shareCertificate = async () => {
    try {
      if (!viewShotRef.current) {
        Alert.alert(
          t('DownLoadCertificate.Error'),
          t('DownLoadCertificate.Certificate not ready for sharing.'),
        );
        return;
      }

      // Capture the certificate
      const uri = await viewShotRef.current.capture();
      let shareUri = uri;

      if (Platform.OS === 'android') {
        const destPath = `${RNFS.CachesDirectoryPath}/${t(
          'DownLoadCertificate.certificate',
        )}_${Date.now()}.png`;
        await RNFS.copyFile(uri, destPath);
        shareUri = `${t('DownLoadCertificate.file')}://${destPath}`; // ✅ use shareUri, not uri
      }

      const shareOptions = {
        title: t('DownLoadCertificateShare Certificate'),
        url: shareUri,
        subject: t('DownLoadCertificate.Certificate of Completion'),
      };

      await Share.open(shareOptions); // If using react-native-share
      // await Share.share(shareOptions); // If using React Native's built-in Share API
    } catch (error) {
      console.error(t('DownLoadCertificate.Share error:'), error);
      //   Alert.alert('Error', 'Failed to share certificate. Please try again.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#BDD9F2', '#F0F2F2']}
            style={{flex: 1}}>
            {/* Top Header */}
            <View
              style={{
                paddingVertical: hp(1),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: hp(2),
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{alignSelf: 'flex-start', marginLeft: hp(2.3)}}>
                <Image
                  source={leftback}
                  style={{height: hp(4.5), width: wp(10)}}
                  tintColor={'#000000'}
                />
              </TouchableOpacity>

              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: ' Poppins-SemiBold',
                    fontWeight: '600',
                    fontSize: hp(3),
                    marginTop: hp(9),
                  }}>
                  {t('DownLoadCertificate.DownLoad Certificate')}
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <ViewShot
                ref={viewShotRef}
                options={{format: 'png', quality: 1.0}}>
                <CertificateTemplate
                  userName={userData.PR_FULL_NAME}
                  userUniqueId={userData.PR_UNIQUE_ID}
                  // userId={userData.PR_ID}
                  // userDOB={userData.PR_DOB}

                  //   courseName={userDetails.courseName}
                  //   date={userDetails.issuedDate}
                />
              </ViewShot>

              <TouchableOpacity
                onPress={captureAndSaveCertificate}
                style={styles.buttonContainer}>
                <Image
                  source={downloadicon}
                  style={{
                    tintColor: '#FFFFFF',
                    width: hp(3),
                    aspectRatio: 1 / 1,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontSize: hp(2.2),
                    marginLeft: wp(2),
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {t('DownLoadCertificate.DownLoad Certificate')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={shareCertificate}
                style={[styles.buttonContainer, styles.shareButton]}>
                <Image
                  source={share}
                  style={{
                    tintColor: '#FFFFFF',
                    width: hp(3),
                    aspectRatio: 1 / 1,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontSize: hp(2.2),
                    marginLeft: wp(2),
                    color: '#FFFFFF',
                  }}>
                  {t('DownLoadCertificate.Share Certificate')}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  templateContainer: {
    width: wp(100),
    aspectRatio: 1.4, // Match your certificate's aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
  },
  certificateBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  idContainer: {
    alignSelf: 'flex-end',
    paddingTop: hp(5.6),
    paddingRight: wp(10),
  },
  nameContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    // marginBottom: hp(10), // Adjust based on your design
  },
  templateUser1: {
    fontSize: hp(0.99),
    textAlign: 'right',
    // right: wp(6),
    // top: hp(3.6),
    color: '#000000', // Ensure contrast with background
  },
  templateUser: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#000000',
  },
  // });
  // templateUser1: {
  //   position: 'absolute',
  //   right: wp(11), // Use responsive width instead of fixed value
  //   top: hp(5.8), // Use responsive height for top position
  //   fontSize: hp(0.95),
  //   textAlign: 'right', // Ensure text alignment is consistent
  // },
  buttonContainer: {
    borderWidth: wp(0.2),
    borderColor: '#FFFFFF',

    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#658DA6',
    width: wp(90),
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: hp(6.5),
    marginTop: hp(4),
    borderRadius: wp(3),
  },
  container: {
    // flex: 1,
    // padding: 16,
    marginTop: hp(5),
  },
  headerContainer: {
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  backIcon: {
    height: hp(4.5),
    width: wp(10),
  },
  headerTitleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: hp(3),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  previewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  // templateContainer: {
  //   alignSelf: 'center',
  //   height: hp(35),
  //   width: wp(100),
  //   justifyContent: 'center',
  //   alignItems: 'flex-end', // Align children to the right
  //   paddingRight: wp(11), // Padding instead of absolute positioning
  //   paddingTop: hp(5.8),
  // },

  templateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  templateUser: {
    fontSize: hp(1),
    // marginTop: hp(1),
    // marginLeft: wp(25),
    fontWeight: 'bold',
    alignSelf: 'center',
    // marginBottom: 10,
  },
  templateCourse: {
    fontSize: 18,
    marginBottom: 5,
  },
  templateCourseName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  templateDate: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default CertificateScreen;
