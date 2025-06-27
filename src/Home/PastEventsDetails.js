import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
  Linking,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import logo1 from '../provider/png/logo1.png';
import Swiper from 'react-native-swiper';
import donation1 from '../provider/png/donation1.png';
import donation2 from '../provider/png/donation2.png';
import donation3 from '../provider/png/donation3.png';
import donation4 from '../provider/png/donation4.png';
import doller from '../provider/png/doller.png';
import whatsapp from '../provider/png/whatsapp.png';
import share from '../provider/png/share.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import moment from 'moment';
import Modal from 'react-native-modal';
import RazorpayCheckout from 'react-native-razorpay';
import {getData, async_keys} from '../api/UserPreference';
import axios from 'axios';
import PaymentSucessfully from '../provider/png/PaymentSucessfully.png';
import cancel from '../provider/png/cancel.png';
import processingpayment from '../provider/png/paymentprocessing.png';
import moneychecked from '../provider/png/moneychecked.png';
import {BASE_URL} from '../api/ApiInfo';
import PastEvent from '../Home/PastEvent';
import {
  sendAdminNotification,
  sendTestNotification,
} from '../Notification/Foreground';
import {useTranslation} from 'react-i18next';
import RenderHtml from 'react-native-render-html';

const PastEventsDetails = ({route, props, navigation}) => {
  const {width} = useWindowDimensions();

  const {pastEvent} = route.params || {};
  const [isAmountModalVisible, setIsAmountModalVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [userData, setUserData] = useState(null);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentProcessingSuccess, setPaymentProcessingSuccess] =
    useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const {t} = useTranslation();
  const openWhatsApp = () => {
    const url = `https://wa.me/91${pastEvent.EventContact}`;
    Linking.openURL(url).catch(err =>
      console.error(t('PastEvnDetail.An error occurred'), err),
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getData(async_keys.user_data);
      setUserData(userData);
    };
    fetchUserData();
  }, []);

  // const PaymentCaptureComponent = ({
  //   paymentId,
  //   amount,
  //   eventId,
  //   userId,
  //   prId,
  // }) => {
  //   const [isCaptured, setIsCaptured] = useState(false);

  //   useEffect(() => {
  //     const capturePayment = async () => {
  //       try {
  //         const response = await axios.post(
  //           'https://node2-plum.vercel.app/api/user/capture-payment',
  //           {
  //             paymentId,
  //             amount: parseFloat(amount),
  //             eventId,
  //             PR_ID: prId,
  //             userId,
  //             currency: 'INR',
  //             status: 'completed',
  //             timestamp: new Date().toISOString(),
  //           },
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         );

  //         if (response.data.success) {
  //           setIsCaptured(true);
  //         }
  //       } catch (error) {
  //         console.error(
  //           'Error during capture:',
  //           error.response?.data || error.message,
  //         );
  //       }
  //     };
  //     capturePayment();
  //   }, [paymentId, amount, isCaptured, eventId, userId, prId]);

  //   return null;
  // };

  const [amount, setAmount] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const [scrollDirection, setScrollDirection] = useState('up');
  const prevScrollY = useRef(0);

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: false,
      listener: event => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        if (currentScrollY > prevScrollY.current) {
          setScrollDirection('down');
        } else if (currentScrollY < prevScrollY.current) {
          setScrollDirection('up');
        }
        prevScrollY.current = currentScrollY;
      },
    },
  );

  // const openCheckout = async amount => {
  //   const amountInPaise = parseFloat(amount) * 100;

  //   try {
  //     const orderResponse = await axios.post(
  //       'https://api.razorpay.com/v1/orders',
  //       {
  //         amount: amountInPaise,
  //         currency: 'INR',
  //         receipt: `receipt_${Date.now()}`,
  //         payment_capture: 1,
  //       },
  //       {
  //         auth: {
  //           username: 'rzp_test_ANawZDTfnQ7fjY',
  //           password: 'wLd92JBcxtJbGVh0GWCToYYx',
  //         },
  //       },
  //     );

  //     const orderId = orderResponse.data.id;

  //     var options = {
  //       order_id: orderId,
  //       description: `Payment for ${pastEvent.name}`,
  //       image: 'https://your-logo-url.com',
  //       currency: 'INR',
  //       key: 'rzp_test_ANawZDTfnQ7fjY',
  //       amount: amountInPaise.toString(),
  //       name: pastEvent.name,
  //       prefill: {
  //         contact: userData.PR_MOBILE_NO || '',
  //         name: userData.PR_FULL_NAME || '',
  //       },
  //       method: {
  //         netbanking: false,
  //         card: false,
  //         upi: true,
  //         wallet: false,
  //         emi: false,
  //         paylater: false,
  //       },
  //       theme: {color: '#53a20e'},
  //     };

  //     const paymentData = await RazorpayCheckout.open(options);

  //     if (!paymentData.razorpay_payment_id) {
  //       throw new Error('No payment ID received from Razorpay');
  //     }

  //     setPaymentProcessingSuccess(true);

  //     const razorpayPaymentDetails = await axios.get(
  //       `https://api.razorpay.com/v1/payments/${paymentData.razorpay_payment_id}`,
  //       {
  //         auth: {
  //           username: 'rzp_test_ANawZDTfnQ7fjY',
  //           password: 'wLd92JBcxtJbGVh0GWCToYYx',
  //         },
  //       },
  //     );

  //     const fullPaymentData = razorpayPaymentDetails.data;
  //     const capturePayload = {
  //       paymentId: paymentData.razorpay_payment_id,
  //       amount: parseFloat(amount),
  //       ENVIT_ID: pastEvent.id,
  //       PR_ID: userData?.PR_ID,
  //       PR_FULL_NAME: userData?.PR_FULL_NAME || '',
  //       entity: fullPaymentData.entity || 'payment',
  //       currency: fullPaymentData.currency || 'INR',
  //       status: fullPaymentData.status || 'captured',
  //       order_id: fullPaymentData.order_id || orderId,
  //       invoice_id: fullPaymentData.invoice_id || null,
  //       international: fullPaymentData.international ? 1 : 0,
  //       method: fullPaymentData.method || '',
  //       amount_refunded: fullPaymentData.amount_refunded || 0,
  //       refund_status: fullPaymentData.refund_status ? 1 : 0,
  //       captured: fullPaymentData.captured || false,
  //       description:
  //         fullPaymentData.description || `Payment for ${pastEvent.name}`,
  //       bank: fullPaymentData.bank ? 1 : 0,
  //       wallet: fullPaymentData.wallet ? 1 : 0,
  //       vpa: fullPaymentData.vpa ? 1 : 0,
  //       email: fullPaymentData.email || '',
  //       contact: fullPaymentData.contact || userData.PR_MOBILE_NO || '',
  //       fee: fullPaymentData.fee || 0,
  //       tax: fullPaymentData.tax || 0,
  //       error_code: fullPaymentData.error_code || '',
  //       error_description: fullPaymentData.error_description || '',
  //       error_source: fullPaymentData.error_source || '',
  //       error_step: fullPaymentData.error_step || '',
  //       error_reason: fullPaymentData.error_reason || '',
  //       JSON_LOG: JSON.stringify(fullPaymentData),
  //       cate_id: pastEvent?.eventCategoryID || 1,
  //     };

  //     const captureResponse = await axios.post(
  //       'https://node2-plum.vercel.app/api/user/capture-payment',
  //       capturePayload,
  //     );

  //     if (captureResponse.data.success) {
  //       setPaymentSuccess(true);

  //       if (userData?.PR_FULL_NAME) {
  //         const templateParams = {
  //           title: 'Payment Done Successfully',
  //           body: `Dear ${userData.PR_FULL_NAME}, your payment of ₹${amount} is completed.`,
  //         };
  //         const templateParams2 = {
  //           title: 'Payment Done Successfully',
  //           body: `User ${userData.PR_FULL_NAME}, paying ₹${amount} is completed.`,
  //         };
  //         // console.log('🔔 Sending local notification:', templateParams);
  //         sendTestNotification(templateParams);
  //         sendAdminNotification(templateParams2.title, templateParams2.body);
  //       }
  //     } else {
  //       throw new Error(captureResponse.data.error || 'Payment capture failed');
  //     }
  //   } catch (error) {
  //     console.error('Payment processing error:', error);
  //   }
  // };

  const tagsStyles = {
    p: {
      color: '#000',
      fontSize: hp(1.6),
      marginTop: hp(1.2), // Top spacing
      marginBottom: hp(1.2),
      fontWeight: '500',
      letterSpacing: hp(0.1),

      // marginTop: hp(0.1),
      width: wp(86),
      marginLeft: wp(2),
      fontFamily: 'Poppins-Medium',
      // maxHeight: hp(5), // Adjust this value based on your font size and line height
      // overflow: 'hidden',
    },
    strong: {
      fontWeight: '500',
      fontFamily: 'Poppins-Medium',
    },
    // Add other HTML tag styles as needed for your content
    h1: {
      fontSize: hp(2),
      fontWeight: 'bold',
      color: '#000',
      fontFamily: 'Poppins-SemiBold',
    },
    ul: {
      marginLeft: wp(5),
    },
    li: {
      color: '#000',
      fontSize: hp(1.7),
      fontFamily: 'Poppins-Regular',
    },
  };

  return (
    <LinearGradient
      colors={['#86a1ce', '#FFFFFF']}
      start={{x: 1, y: 1.7}}
      end={{x: 0.2, y: 0}}
      style={styles.gradientContainer}>
      <SafeAreaView style={styles.MainContainer}>
        {/* Floating Header */}
        <Animated.View
          style={[
            styles.floatingTextContainer,
            {
              opacity: scrollDirection === 'up' ? textOpacity : 0,
            },
          ]}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.leftButton}>
              <Image
                source={leftback}
                style={styles.leftButtonImage}
                tintColor="#FFFFFF"
              />
            </TouchableOpacity>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>{pastEvent.name}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          {/* Header Image */}
          <ImageBackground
            source={pastEvent.headerImage}
            style={styles.headerImage}>
            {/* <View style={styles.imageButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.imageBackButton}>
                <Image
                  source={leftback}
                  style={styles.leftButtonImage}
                  tintColor="#000000"
                />
              </TouchableOpacity>
            </View> */}
          </ImageBackground>

          {/* Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.eventName}>{pastEvent.name}</Text>

            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{pastEvent.message}</Text>
            </View>

            <View style={styles.detailContainer}>
              {/* <Text style={styles.detailText}>{pastEvent.Detail}</Text> */}
              <RenderHtml
                contentWidth={width}
                source={{html: pastEvent.Detail}}
                tagsStyles={tagsStyles}
              />
            </View>

            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                {t('PastEvnDetail.Location:')} {pastEvent.address}
              </Text>
              <Text style={styles.cityText}>
                {t('PastEvnDetail.City:')} {pastEvent.city}
              </Text>
            </View>

            {/* Image Swiper */}
            <View style={styles.swiperContainer}>
              <Swiper
                style={styles.swiper}
                showsButtons={false}
                autoplay={false}
                showsPagination={true}
                paginationStyle={styles.paginationStyle}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}>
                {pastEvent.EventsImage?.uri &&
                  pastEvent.EventsImage.uri
                    .split(', ')
                    .map((image, index) => (
                      <Image
                        key={index}
                        source={{uri: image.trim()}}
                        style={styles.eventImage}
                      />
                    ))}
              </Swiper>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtonsContainer}>
          <LinearGradient
            start={{x: 1, y: 1.7}}
            end={{x: 0.2, y: 0}}
            colors={['#152340', '#FFFFFF']}
            style={styles.bottomButtonsGradient}>
            {/* <TouchableOpacity
              onPress={() => setIsAmountModalVisible(true)}
              style={styles.donateButtonContainer}>
              <LinearGradient
                start={{x: 1, y: 1.7}}
                end={{x: 0.2, y: 0}}
                colors={['#F27141', '#F2A950']}
                style={styles.donateButton}>
                <Text style={styles.buttonText}>Donate Me</Text>
                <Image source={doller} style={styles.buttonIcon} />
              </LinearGradient>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={openWhatsApp}
              style={styles.chatButtonContainer}>
              <LinearGradient
                start={{x: 1, y: 1.7}}
                end={{x: 0.2, y: 0}}
                colors={['#02733E', '#038C4C']}
                style={styles.chatButton}>
                <Text style={styles.buttonText}>{t('PastEvnDetail.Chat')}</Text>
                <Image source={whatsapp} style={styles.buttonIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Donation Modal */}
        {/* <Modal
          transparent={true}
          visible={isAmountModalVisible}
          animationType="slide"
          onRequestClose={() => setIsAmountModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Donation Amount</Text>

              <View style={styles.quickAmountsContainer}>
                <TouchableOpacity
                  onPress={() => setAmount('100')}
                  style={[
                    styles.quickAmountButton,
                    amount === '100' && styles.quickAmountButtonActive,
                  ]}>
                  <Text style={styles.quickAmountText}>100 ₹</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setAmount('500')}
                  style={[
                    styles.quickAmountButton,
                    amount === '500' && styles.quickAmountButtonActive,
                  ]}>
                  <Text style={styles.quickAmountText}>500 ₹</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setAmount('1000')}
                  style={[
                    styles.quickAmountButton,
                    amount === '1000' && styles.quickAmountButtonActive,
                  ]}>
                  <Text style={styles.quickAmountText}>1000 ₹</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.orText}>OR</Text>

              <TextInput
                style={styles.amountInput}
                placeholder="Enter custom amount"
                keyboardType="numeric"
                value={customAmount}
                onChangeText={text => setCustomAmount(text)}
              />

              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsAmountModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.donateButtonModal}
                  onPress={() => {
                    const donationAmount = customAmount || amount;
                    if (donationAmount) {
                      setIsAmountModalVisible(false);
                      openCheckout(donationAmount);
                    } else {
                      alert('Please enter an amount');
                    }
                  }}>
                  <Text style={styles.donateButtonText}>Proceed to Pay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}

        {/* Payment Processing Modal */}
        {/* <Modal
          transparent={true}
          visible={paymentProcessingSuccess}
          animationType="slide"
          onRequestClose={() => setPaymentProcessingSuccess(false)}>
          <View style={styles.modalContainerSuccessPayment}>
            <TouchableOpacity
              onPress={() => setPaymentProcessingSuccess(false)}
              style={styles.modalCloseButton}>
              <Image source={cancel} style={styles.modalCloseIcon} />
            </TouchableOpacity>
            <Image source={processingpayment} style={styles.processingImage} />
            <Text style={styles.processingText}>
              Payment successful! {'\n'} Processing donation...
            </Text>
          </View>
        </Modal> */}

        {/* Payment Success Modal */}
        {/* <Modal
          transparent={true}
          visible={paymentSuccess}
          animationType="slide"
          onRequestClose={() => setPaymentSuccess(false)}>
          <View style={styles.modalContainerSuccessPayment}>
            <TouchableOpacity
              onPress={() => setPaymentSuccess(false)}
              style={styles.modalCloseButton}>
              <Image source={cancel} style={styles.modalCloseIcon} />
            </TouchableOpacity>
            <Image source={moneychecked} style={styles.successImage} />
            <Text style={styles.successText}>
              Donation processed successfully! {'\n'} Thank you.
            </Text>
          </View>
        </Modal> */}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
  },
  floatingTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    paddingHorizontal: 10,
  },
  leftButton: {
    zIndex: 2,
  },
  leftButtonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(10),
    alignSelf: 'center',
  },
  titleText: {
    fontSize: hp(2.3),
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: hp(15),
  },
  headerImage: {
    height: hp(25),
    width: '100%',
  },
  imageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    paddingHorizontal: hp(2.3),
  },
  imageBackButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    aspectRatio: 1 / 1,
    borderRadius: wp(100),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: wp(4.5),
  },
  eventName: {
    color: '#386641',
    fontWeight: '500',
    fontSize: hp(2.3),
    width: wp(90),
    fontFamily: 'Poppins-SemiBold',
    marginTop: hp(2),
  },
  messageContainer: {
    backgroundColor: '#DFE9F2',
    borderRadius: wp(5),
    marginTop: hp(0.5),
    width: wp(90),
  },
  messageText: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    color: '#152340',
    fontSize: hp(1.7),
    width: wp(90),
    marginTop: hp(1),
    fontFamily: 'Poppins-Medium',
  },
  detailContainer: {
    backgroundColor: '#F2F0CE',
    elevation: 5,
    borderRadius: wp(5),
    marginTop: hp(1.2),
    width: wp(90),
  },
  detailText: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    color: '#000',
    fontWeight: '500',
    fontSize: hp(1.6),
    width: wp(90),
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
  },
  addressContainer: {
    backgroundColor: '#D9C6A3',
    elevation: 5,
    borderRadius: wp(5),
    marginTop: hp(1.2),
    width: wp(90),
  },
  addressText: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    color: '#000',
    fontWeight: '600',
    fontSize: hp(1.6),
    width: wp(90),
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
  },
  cityText: {
    paddingHorizontal: wp(3),
    paddingBottom: wp(2),
    color: '#000',
    fontWeight: '600',
    fontSize: hp(1.6),
    width: wp(73),
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
  },
  swiperContainer: {
    marginTop: hp(2),
    marginHorizontal: wp(2),
  },
  swiper: {
    height: hp(30),
  },
  paginationStyle: {
    position: 'absolute',
    top: 0,
    height: hp(57),
  },
  dot: {
    backgroundColor: '#7C8C42',
    width: 7,
    height: 7,
    borderRadius: 5,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  activeDot: {
    backgroundColor: '#1F260F',
    width: 18,
    height: 7,
    borderRadius: 6,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  eventImage: {
    height: hp(25),
    width: wp(90),
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: wp(8),
    marginTop: hp(1),
    resizeMode: 'cover',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: hp(2),
  },
  bottomButtonsGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(0.8),
    backgroundColor: '#FFFFFF',
    width: wp(83),
    borderRadius: wp(10),
    paddingHorizontal: wp(1.6),
  },
  donateButtonContainer: {
    flex: 1,
    marginRight: wp(1),
  },
  chatButtonContainer: {
    flex: 1,
    marginLeft: wp(1),
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    borderRadius: wp(10),
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    borderRadius: wp(10),
  },
  buttonText: {
    fontSize: hp(1.8),
    marginRight: wp(2.3),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  buttonIcon: {
    height: hp(2.5),
    width: wp(5.2),
  },
  modalContainer: {
    height: hp(100),
    alignSelf: 'center',
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#F2F0EB',
    padding: 20,
    borderRadius: 10,
    width: wp(85),
  },
  modalTitle: {
    fontSize: hp(2.2),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: '#386641',
  },
  quickAmountsContainer: {
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    borderWidth: wp(0.4),
    borderColor: '#D9C3A9',
    borderRadius: wp(2),
    height: hp(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(20),
    backgroundColor: '#FFFFFF',
  },
  quickAmountButtonActive: {
    backgroundColor: '#F2DC6D',
    borderColor: '#A6896F',
    borderWidth: wp(0.5),
  },
  quickAmountText: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#A64138',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  donateButtonModal: {
    backgroundColor: '#F27141',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  donateButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFF',
  },
  modalContainerSuccessPayment: {
    backgroundColor: '#FFFFFF',
    height: hp(45),
    width: wp(78),
    elevation: 5,
    alignItems: 'center',
    borderRadius: wp(3),
    alignSelf: 'center',
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    margin: wp(3),
    right: wp(0.3),
    position: 'absolute',
    zIndex: 1,
  },
  modalCloseIcon: {
    height: hp(3),
    width: wp(6),
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  processingImage: {
    height: hp(33),
    width: wp(45),
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  processingText: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginHorizontal: wp(1),
    color: '#2D4B73',
  },
  successImage: {
    marginTop: hp(3),
    height: hp(30),
    width: wp(40),
    resizeMode: 'contain',
    backgroundColor: '#FFFFFF',
  },
  successText: {
    fontSize: hp(2.1),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginHorizontal: wp(2),
    color: '#000000',
    letterSpacing: 0.3,
  },
});

export default PastEventsDetails;
