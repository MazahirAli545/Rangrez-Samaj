import {React, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import doller from '../provider/png/doller.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import {getData, async_keys} from '../api/UserPreference';
import axios from 'axios';
import {BASE_URL} from '../api/ApiInfo';
import MyDonationDetail from '../Home/MyDonationDetail';
import Modal from 'react-native-modal';
import RazorpayCheckout from 'react-native-razorpay';
import cancel from '../provider/png/cancel.png';
import processingpayment from '../provider/png/paymentprocessing.png';
import moneychecked from '../provider/png/moneychecked.png';
import {sendTestNotification} from '../Notification/Foreground';
import {useTranslation} from 'react-i18next';

const MyDonation = props => {
  const [userData, setUserData] = useState(null);
  const [apiLoader, setApiLoader] = useState(true);
  const [donationList, setDonationList] = useState([]);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAmountModalVisible, setIsAmountModalVisible] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentProcessingSuccess, setPaymentProcessingSuccess] =
    useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await getData(async_keys.user_data);
      setUserData(storedUserData);

      if (storedUserData?.PR_ID) {
        fetchDonations(storedUserData?.PR_ID);
      }
    };

    const fetchDonations = async PR_ID => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getDonationByDonar/${PR_ID}`,
        );

        if (response.data.success) {
          setDonationList(response.data.data);
        } else {
          console.log('Donation fetch failed:', response.data.error);
        }
      } catch (error) {
        console.error(t('MyDonation.Error fetching donations:'), error);
      } finally {
        setApiLoader(false);
      }
    };

    fetchUserData();
  }, []);

  console.log('DONation', donationList);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getData(async_keys.user_data);
      console.log('User Data:', userData?.PR_MOBILE_NO);
      setUserData(userData);
    };
    fetchUserData();
  }, []);

  const PaymentCaptureComponent = ({
    paymentId,
    amount,
    eventId,
    userId,
    prId,
  }) => {
    const [isCaptured, setIsCaptured] = useState(false);

    useEffect(() => {
      const capturePayment = async () => {
        try {
          const response = await axios.post(
            'https://node2-plum.vercel.app/api/user/capture-payment',
            {
              paymentId,
              amount: parseFloat(amount),
              eventId,
              PR_ID: prId,
              userId,
              currency: 'INR',
              status: 'completed',
              timestamp: new Date().toISOString(),
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );

          if (response.data.success) {
            console.log('Payment captured successfully:', response.data.data);
            setIsCaptured(true); // Prevent re-calling
            // show success message or update UI
          } else {
            console.error(
              t('MyDonation.Payment capture failed:'),
              response.data.error,
            );
          }
        } catch (error) {
          console.error(
            t('MyDonation.Error during capture:'),
            error.response?.data || error.message,
          );
        }
      };

      // Trigger only when both paymentId and amount are available and not already captured
      capturePayment();
    }, [paymentId, amount, isCaptured, eventId, userId, prId]);

    return null; // or return a message like "Capturing payment..."
  };

  // console.log('Donation', donationList);
  const openCheckout = async amount => {
    const amountInPaise = parseFloat(amount) * 100;

    try {
      // First create the order
      const orderResponse = await axios.post(
        'https://api.razorpay.com/v1/orders',
        {
          amount: amountInPaise,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          payment_capture: 1, // auto-capture payment
        },
        {
          auth: {
            username: 'rzp_test_ANawZDTfnQ7fjY',
            password: 'wLd92JBcxtJbGVh0GWCToYYx',
          },
        },
      );

      const orderId = orderResponse.data.id;

      // Then open checkout with this order ID
      var options = {
        order_id: orderId, // Add the order_id here
        // description: `Payment for ${event.name}`,
        description: `${t('MyDonation.Payment for')} ${
          selectedEvent?.event?.ENVT_DESC
        }`,

        image: 'https://your-logo-url.com',
        currency: 'INR',
        key: 'rzp_test_ANawZDTfnQ7fjY',
        amount: amountInPaise.toString(),
        name: selectedEvent?.event?.ENVT_DESC,
        prefill: {
          contact: userData.PR_MOBILE_NO || '',
          name: userData.PR_FULL_NAME || '',
        },
        method: {
          netbanking: false,
          card: false,
          upi: true,
          wallet: false,
          emi: false,
          paylater: false,
        },
        theme: {color: '#53a20e'},
      };

      const paymentData = await RazorpayCheckout.open(options);
      console.log('Full Payment Data:', paymentData);

      if (!paymentData.razorpay_payment_id) {
        throw new Error(t('MyDonation.No payment ID received from Razorpay'));
      }

      setPaymentProcessingSuccess(true);

      // console.log('Full Payment Data:', paymentData);
      const razorpayPaymentDetails = await axios.get(
        `https://api.razorpay.com/v1/payments/${paymentData.razorpay_payment_id}`,
        {
          auth: {
            username: 'rzp_test_ANawZDTfnQ7fjY',
            password: 'wLd92JBcxtJbGVh0GWCToYYx',
          },
        },
      );

      const fullPaymentData = razorpayPaymentDetails.data;
      console.log('Full Payment Details:', fullPaymentData);

      const capturePayload = {
        paymentId: paymentData.razorpay_payment_id,
        amount: parseFloat(amount),
        // ENVIT_ID: event?.ENVT_ID || selectedEvent?.event_id || 0,
        ENVIT_ID: selectedEvent?.event?.ENVT_ID || selectedEvent?.event_id || 0,

        PR_ID: userData?.PR_ID,
        PR_FULL_NAME: userData?.PR_FULL_NAME || '',
        entity: fullPaymentData.entity || t('MyDonation.payment'),
        currency: fullPaymentData.currency || t('MyDonation.INR'),
        status: fullPaymentData.status || t('MyDonation.captured'),
        order_id: fullPaymentData.order_id || orderId,
        invoice_id: fullPaymentData.invoice_id || null,
        international: fullPaymentData.international ? 1 : 0,
        method: fullPaymentData.method || '',
        amount_refunded: fullPaymentData.amount_refunded || 0,
        refund_status: fullPaymentData.refund_status ? 1 : 0,
        captured: fullPaymentData.captured || false,
        description:
          fullPaymentData.description ||
          `${'MyDonation.Payment for'} ${selectedEvent?.event?.ENVT_DESC}`,
        bank: fullPaymentData.bank ? 1 : 0,
        wallet: fullPaymentData.wallet ? 1 : 0,
        vpa: fullPaymentData.vpa ? 1 : 0,
        email: fullPaymentData.email || '',
        contact: fullPaymentData.contact || userData.PR_MOBILE_NO || '',
        fee: fullPaymentData.fee || 0,
        tax: fullPaymentData.tax || 0,
        error_code: fullPaymentData.error_code || '',
        error_description: fullPaymentData.error_description || '',
        error_source: fullPaymentData.error_source || '',
        error_step: fullPaymentData.error_step || '',
        error_reason: fullPaymentData.error_reason || '',
        JSON_LOG: JSON.stringify(fullPaymentData),
        cate_id: selectedEvent?.event?.ENVT_CATE_ID || 1,
      };

      const captureRes = await axios.post(
        'https://node2-plum.vercel.app/api/user/capture-payment',
        capturePayload,
      );

      if (captureRes.data.success) {
        setPaymentSuccess(true);
        if (userData?.PR_FULL_NAME) {
          sendTestNotification({
            title: t('MyDonation.Payment Done Successfully'),
            body: `${'MyDonation.Dear'} ${userData.PR_FULL_NAME}, ${t(
              'MyDonation.your payment of',
            )} ₹${amount} ${'MyDonation.is completed'}.`,
          });
        }
      } else {
        throw new Error(
          captureRes.data.error || t('MyDonation.Payment capture failed'),
        );
      }
    } catch (error) {
      console.error(t('MyDonation.Payment processing error:'), error);
    }
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ImageBackground
        source={BackgroundImage}
        style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}>
        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          colors={['#BDD9F2', '#F0F2F2']}
          style={{flex: 1}}>
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
                }}>
                {t('MyDonation.My Donations')}
              </Text>
            </View>
          </View>

          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.donationContainer}>
              {apiLoader ? (
                <FlatList
                  removeClippedSubviews={false}
                  data={Array(5).fill({})}
                  renderItem={() => (
                    <LinearGradient
                      start={{x: 0, y: 0.1}}
                      end={{x: 0.4, y: 1}}
                      colors={['#FFFFFF', '#ffffcc']}
                      style={styles.card}>
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerTitle}
                        autoRun
                      />
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerMessage}
                        autoRun
                      />
                      <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={styles.shimmerAddress}
                        autoRun
                      />
                    </LinearGradient>
                  )}
                />
              ) : donationList.length > 0 ? (
                <FlatList
                  removeClippedSubviews={false}
                  data={donationList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    // <TouchableOpacity>
                    <LinearGradient
                      start={{x: 0, y: 0.1}}
                      end={{x: 0.4, y: 1}}
                      colors={['#FFFFFF', '#ffffcc']}
                      style={styles.card}>
                      <Text style={styles.eventName}>
                        {item.event?.ENVT_DESC || t('MyDonation.No Title')}
                      </Text>
                      <Text style={styles.eventMessage}>
                        {item.event?.ENVT_EXCERPT ||
                          t('MyDonation.No Description')}
                      </Text>
                      <Text style={styles.eventAddress}>
                        ${t('MyDonation.Amount:')} ₹{item.amount} | $
                        {t('MyDonation.Status:')} {item.status}
                      </Text>
                      <Text style={styles.eventAddress}>
                        ${t('MyDonation.Method:')} {item.method} | $
                        {t('MyDonation.Date:')}{' '}
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>

                      {new Date(item.event?.EVNT_UPTO_DT) >= new Date() && (
                        <TouchableOpacity
                          // onPress={() =>
                          //   props.navigation.navigate('MyDonationDetail', {
                          //     donationList: item,
                          //   })
                          // }
                          onPress={() => {
                            setSelectedEvent(item); // <-- this is critical!
                            setIsAmountModalVisible(true);
                          }}
                          style={{alignSelf: 'center'}}>
                          <LinearGradient
                            start={{x: 1, y: 1.7}}
                            end={{x: 0.2, y: 0}}
                            colors={['#F27141', '#F2A950']}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingVertical: hp(1),
                              marginTop: hp(2),
                              paddingHorizontal: wp(10),
                              borderRadius: wp(10),
                            }}>
                            <Text
                              style={{
                                fontSize: hp(1.8),
                                marginRight: wp(2.3),
                                fontFamily: 'Poppins-SemiBold',
                                color: '#FFFFFF',
                              }}>
                              ${t('MyDonation.Donate again')}
                            </Text>
                            <Image
                              source={doller}
                              style={{height: hp(2.5), width: wp(5.2)}}
                            />
                          </LinearGradient>
                        </TouchableOpacity>
                      )}
                    </LinearGradient>
                    // </TouchableOpacity>
                  )}
                />
              ) : (
                <Text
                  style={{
                    marginTop: hp(4),
                    fontSize: hp(2),
                    textAlign: 'center',
                    color: '#555',
                  }}>
                  {t('MyDonation.No donations found.')}
                </Text>
              )}
            </View>

            <Modal
              transparent={true}
              visible={isAmountModalVisible}
              animationType="slide"
              onRequestClose={() => setIsAmountModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    {t('MyDonation.Enter Donation Amount')}
                  </Text>

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

                  <Text style={styles.orText}>${t('MyDonation.OR')}</Text>

                  <TextInput
                    style={styles.amountInput}
                    placeholder={t('MyDonation.Enter custom amount')}
                    keyboardType="numeric"
                    value={customAmount}
                    onChangeText={text => setCustomAmount(text)}
                  />

                  <View style={styles.modalButtonsContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => setIsAmountModalVisible(false)}>
                      <Text style={styles.cancelButtonText}>
                        ${t('MyDonation.Cancel')}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.donateButton}
                      onPress={() => {
                        const donationAmount = customAmount || amount;
                        if (donationAmount) {
                          setIsAmountModalVisible(false);
                          openCheckout(donationAmount);
                        } else {
                          alert(t('MyDonation.Please enter an amount'));
                        }
                      }}>
                      <Text style={styles.donateButtonText}>
                        ${t('MyDonation.Proceed to Pay')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            {/* Modal for payment processing*/}
            <Modal
              transparent={true}
              visible={paymentProcessingSuccess}
              animationType="slide"
              onRequestClose={() => setPaymentProcessingSuccess(false)}>
              <View style={styles.modalContainerSuccessPayment}>
                <TouchableOpacity
                  onPress={() => setPaymentProcessingSuccess(false)}
                  style={{
                    alignSelf: 'flex-end',
                    margin: wp(3),
                    right: wp(0.3),
                    position: 'absolute',
                    zIndex: 1,
                  }}>
                  <Image
                    source={cancel}
                    style={{
                      height: hp(3),
                      width: wp(6),
                      aspectRatio: 1 / 1,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={processingpayment}
                  style={{
                    height: hp(33),
                    width: wp(45),
                    resizeMode: 'contain',
                    backgroundColor: '#FFFFFF',
                  }}
                />

                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                    marginHorizontal: wp(1),
                    color: '#2D4B73',
                  }}>
                  ${t('MyDonation.Payment successful!')} {'\n'} $
                  {t('MyDonation.Processing donation...')}
                </Text>
              </View>
            </Modal>

            {/* Modal for payment confirmation */}
            <Modal
              transparent={true}
              visible={paymentSuccess}
              animationType="slide"
              onRequestClose={() => setPaymentSuccess(false)}>
              <View style={styles.modalContainerSuccessPayment}>
                <TouchableOpacity
                  onPress={() => setPaymentSuccess(false)}
                  style={{
                    alignSelf: 'flex-end',
                    margin: wp(3),
                    right: wp(0.3),
                    position: 'absolute',
                    zIndex: 1,
                  }}>
                  <Image
                    source={cancel}
                    style={{
                      height: hp(3),
                      width: wp(6),
                      aspectRatio: 1 / 1,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={moneychecked}
                  style={{
                    marginTop: hp(3),
                    height: hp(30),
                    width: wp(40),
                    resizeMode: 'contain',
                    backgroundColor: '#FFFFFF',
                  }}
                />

                <Text
                  style={{
                    fontSize: hp(2.1),
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                    marginHorizontal: wp(2),
                    color: '#000000',
                    letterSpacing: 0.3,
                  }}>
                  ${t('MyDonation.Donation processed successfully!')} {'\n'} $
                  {t('MyDonation.Thank you.')}
                </Text>
              </View>
            </Modal>
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
  donationContainer: {
    marginTop: hp(1.5),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(10),
  },
  shimmerTitle: {
    height: hp(2),
    width: wp(75),
    marginLeft: wp(3),
    borderRadius: wp(1),
    marginBottom: hp(1),
  },
  shimmerMessage: {
    height: hp(5),
    width: wp(75),
    marginLeft: wp(3),
    borderRadius: wp(1),
    marginBottom: hp(1.5),
  },
  shimmerAddress: {
    height: hp(2),
    width: wp(50),
    alignSelf: 'flex-end',
    marginRight: wp(3.5),
    borderRadius: wp(1),
    marginTop: hp(2.7),
  },
  card: {
    marginHorizontal: wp(1),
    width: wp(90),
    paddingVertical: hp(2),
    borderRadius: wp(3),
    marginBottom: hp(2),
  },
  eventName: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp(2),
    width: wp(75),
    marginLeft: wp(3),
    marginTop: hp(0.6),
    fontFamily: 'Poppins-Medium',
  },
  eventMessage: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp(1.4),
    width: wp(75),
    marginLeft: wp(3),
    marginTop: hp(1),
    fontFamily: 'Poppins-Regular',
  },
  eventAddress: {
    color: '#000',
    fontWeight: '500',
    fontSize: hp(1.6),
    width: wp(75),
    marginLeft: wp(3),
    marginTop: hp(0.8),
    fontFamily: 'Poppins-Medium',
  },
  floatingTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,1)',
    padding: 20,
  },
  floatingText: {
    fontSize: hp(2),
    color: '#000',
    fontFamily: 'Poppins-Medium',
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
    // height: hp(45),
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
    // marginBottom: 15,
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
  donateButton: {
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
  MainContainer: {
    flex: 1,
  },
  imageBackground: {
    width: wp(100),
    position: 'relative',
  },
  imageContainer: {
    width: wp(100),
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  imageBackground: {
    flex: 1,
    // height: hp(27),
    width: '100%',
    resizeMode: 'cover',
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
    zIndex: 2, // Ensures it's above the title if overlapping
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
    // width: wp(100),
    // width: wp(60),
    marginHorizontal: wp(10),
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // alignContent: 'center',
  },

  titleText: {
    fontSize: hp(2.3),
    color: '#FFFFFF',
    justifyContent: 'center',
    textAlign: 'center',
    // width: wp(60),
    fontWeight: '500',

    // fontFamily: 'Poppins-SemiBold',
  },
  rightButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    aspectRatio: 1 / 1,
    borderRadius: wp(100),
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonImage: {
    height: hp(3),
    width: wp(6),
  },
});

export default MyDonation;
