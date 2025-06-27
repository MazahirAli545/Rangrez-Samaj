// import React, {useRef, useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Animated,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   ImageBackground,
//   TextInput,
//   Linking,
//   RefreshControl,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import leftback from '../provider/png/leftback.png';
// import logo1 from '../provider/png/logo1.png';
// import Swiper from 'react-native-swiper';
// import donation1 from '../provider/png/donation1.png';
// import donation2 from '../provider/png/donation2.png';
// import donation3 from '../provider/png/donation3.png';
// import donation4 from '../provider/png/donation4.png';
// import doller from '../provider/png/doller.png';
// import whatsapp from '../provider/png/whatsapp.png';
// import share from '../provider/png/share.png';
// import BackgroundImage from '../provider/png/BackgroundImage.png';
// import moment from 'moment';
// import Modal from 'react-native-modal';
// import RazorpayCheckout from 'react-native-razorpay';
// import {getData, async_keys} from '../api/UserPreference';
// import axios from 'axios';
// import PaymentSucessfully from '../provider/png/PaymentSucessfully.png';
// import cancel from '../provider/png/cancel.png';
// import processingpayment from '../provider/png/paymentprocessing.png';
// import moneychecked from '../provider/png/moneychecked.png';
// import {BASE_URL} from '../api/ApiInfo';
// import PastEvent from '../Home/PastEvent';
// // import PastEventsDetails from '../Home/PastEventsDetails';
// import PastEventsDetails from '../Home/PastEventsDetails';
// import {
//   sendAdminNotification,
//   sendTestNotification,
//   setupForegroundNotificationHandler,
// } from '../Notification/Foreground';
// import {useTranslation} from 'react-i18next';
// // import {getData, async_keys} from '../api/UserPreference';

// const DonationDetail = ({route, props, navigation}) => {
//   const {event} = route.params || {};
//   const [isAmountModalVisible, setIsAmountModalVisible] = useState(false);
//   const [customAmount, setCustomAmount] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [refresh, setRefresh] = useState(false);
//   const [langCode, setLangCode] = useState('en');

//   const {t} = useTranslation();

//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [paymentProcessingSuccess, setPaymentProcessingSuccess] =
//     useState(false);
//   const [apiLoader, setApiLoader] = useState(true);
//   const [pastEvents, setPastEvents] = useState([]);
//   // console.log('Received Event Data:', event.createdEventDate);

//   console.log('Current eventy coming from donation screen', event);
//   console.log('PastEvents', pastEvents);

//   useEffect(() => {
//     setupForegroundNotificationHandler();
//   }, []);

//   // useEffect(() => {
//   //   const fetchEvents = async () => {
//   //     try {
//   //       const response = await fetch(`${BASE_URL}/events`);
//   //       const result = await response.json();
//   //       console.log('Fetched Past Eventswww:', result.events);

//   //       if (Array.isArray(result.events) && result.events.length > 0) {
//   //         const currentDate = new Date();

//   //         const formattedData = result.events
//   //           .filter(item => {
//   //             // Only include events where EventsToDate is in the past
//   //             const eventEndDate = new Date(item.EVNT_UPTO_DT);
//   //             return eventEndDate < currentDate;
//   //           })
//   //           .map(item => ({
//   //             id: item.ENVT_ID,
//   //             eventCategoryID: item.ENVT_CATE_ID,
//   //             name: item.ENVT_DESC,
//   //             message: item.ENVT_EXCERPT,
//   //             Detail: item.ENVT_DETAIL,
//   //             headerImage: {uri: item.ENVT_BANNER_IMAGE},
//   //             EventsImage: {uri: item.ENVT_GALLERY_IMAGES},
//   //             EventContact: item.ENVT_CONTACT_NO,
//   //             EventFromDate: item.EVNT_FROM_DT,
//   //             EventsToDate: item.EVNT_UPTO_DT,
//   //             address: item.ENVT_ADDRESS,
//   //             city: item.ENVT_CITY,
//   //             createdEventDate: item.EVET_CREATED_DT,
//   //             cate_desc: item?.SubCategory?.CATE_DESC || '',
//   //           }));
//   //         setPastEvents(formattedData);
//   //         console.log('Events information', formattedData);
//   //       } else {
//   //         console.warn(t('DonationDetail.No valid events data found.'));
//   //       }
//   //     } catch (error) {
//   //       console.error(t('DonationDetail.Error fetching Events:'), error);
//   //     } finally {
//   //       setApiLoader(false);
//   //     }
//   //   };

//   //   fetchEvents();
//   // }, []);

//   useEffect(() => {
//     const loadLanguagePreference = async () => {
//       try {
//         const savedLangCode = await getData(async_keys.language_code);
//         if (savedLangCode) {
//           setLangCode(savedLangCode);
//         }
//       } catch (error) {
//         console.error('Error loading language preference:', error);
//       }
//     };

//     loadLanguagePreference();
//   }, []);

//   const handleRefresh = async () => {
//     setRefresh(true);
//     await fetchEvents();
//     setRefresh(false);
//   };

//   const fetchEvents = async () => {
//     try {
//       console.log('Fetching past events with lang_code:', langCode);
//       const response = await fetch(`${BASE_URL}/events?lang_code=${langCode}`);
//       const result = await response.json();
//       console.log('Fetched Past Events:', result.events);

//       if (Array.isArray(result.events)) {
//         const currentDate = new Date();

//         const formattedData = result.events
//           .filter(item => {
//             // Filter events that have content in selected language
//             const hasContent =
//               item.ENVT_DESC &&
//               item.ENVT_DESC.trim() !== '' &&
//               item.ENVT_EXCERPT &&
//               item.ENVT_EXCERPT.trim() !== '';

//             // Only include events where EventsToDate is in the past
//             const eventEndDate = new Date(item.EVNT_UPTO_DT);
//             return hasContent && eventEndDate < currentDate;
//           })
//           .map(item => ({
//             id: item.ENVT_ID,
//             eventCategoryID: item.ENVT_CATE_ID,
//             name: item.ENVT_DESC,
//             message: item.ENVT_EXCERPT,
//             Detail: item.ENVT_DETAIL,
//             headerImage: {uri: item.ENVT_BANNER_IMAGE},
//             EventsImage: {uri: item.ENVT_GALLERY_IMAGES},
//             EventContact: item.ENVT_CONTACT_NO,
//             EventFromDate: item.EVNT_FROM_DT,
//             EventsToDate: item.EVNT_UPTO_DT,
//             address: item.ENVT_ADDRESS,
//             city: item.ENVT_CITY,
//             createdEventDate: item.EVET_CREATED_DT,
//             cate_desc: item?.SubCategory?.CATE_DESC || '',
//           }));

//         if (formattedData.length > 0) {
//           setPastEvents(formattedData);
//           console.log('Past events information', formattedData);
//         } else {
//           console.warn(
//             t(
//               'DonationDetail.No past events with content in selected language.',
//             ),
//           );
//           setPastEvents([]);
//         }
//       } else {
//         console.warn(t('DonationDetail.No valid events data found.'));
//         setPastEvents([]);
//       }
//     } catch (error) {
//       console.error(t('DonationDetail.Error fetching Events:'), error);
//       setPastEvents([]);
//     } finally {
//       setApiLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, [langCode]);

//   const openWhatsApp = () => {
//     const url = `https://wa.me/91${event.EventContact}`;

//     // Check if the device can open the URL
//     Linking.openURL(url).catch(err =>
//       console.error(t('DonationDetail.An error occurred'), err),
//     );
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userData = await getData(async_keys.user_data);
//       console.log('User Data:', userData?.PR_MOBILE_NO);
//       setUserData(userData);
//     };
//     fetchUserData();
//   }, []);

//   const PaymentCaptureComponent = ({
//     paymentId,
//     amount,
//     eventId,
//     userId,
//     prId,
//   }) => {
//     const [isCaptured, setIsCaptured] = useState(false);

//     useEffect(() => {
//       const capturePayment = async () => {
//         try {
//           const response = await axios.post(
//             'https://node2-plum.vercel.app/api/user/capture-payment',
//             {
//               paymentId,
//               amount: parseFloat(amount),
//               eventId,
//               PR_ID: prId,
//               userId,
//               currency: 'INR',
//               status: 'completed',
//               timestamp: new Date().toISOString(),
//             },
//             {
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             },
//           );

//           if (response.data.success) {
//             console.log('Payment captured successfully:', response.data.data);
//             setIsCaptured(true); // Prevent re-calling
//             // show success message or update UI
//           } else {
//             console.error(
//               t('DonationDetail.Payment capture failed:'),
//               response.data.error,
//             );
//           }
//         } catch (error) {
//           console.error(
//             t('DonationDetail.Error during capture:'),
//             error.response?.data || error.message,
//           );
//         }
//       };

//       // Trigger only when both paymentId and amount are available and not already captured
//       capturePayment();
//     }, [paymentId, amount, isCaptured, eventId, userId, prId]);

//     return null; // or return a message like "Capturing payment..."
//   };

//   const [amount, setAmount] = useState('');

//   const scrollY = useRef(new Animated.Value(0)).current;
//   const [scrollDirection, setScrollDirection] = useState('up');
//   const prevScrollY = useRef(0);

//   // Text animation values
//   const textOpacity = scrollY.interpolate({
//     inputRange: [0, 50],
//     outputRange: [0, 1], // Show text when scrolling up
//     extrapolate: 'clamp',
//   });

//   const handleScroll = Animated.event(
//     [{nativeEvent: {contentOffset: {y: scrollY}}}],
//     {
//       useNativeDriver: false,
//       listener: event => {
//         const currentScrollY = event.nativeEvent.contentOffset.y;
//         if (currentScrollY > prevScrollY.current) {
//           setScrollDirection('down');
//         } else if (currentScrollY < prevScrollY.current) {
//           setScrollDirection('up');
//         }
//         prevScrollY.current = currentScrollY;
//       },
//     },
//   );

//   const openCheckout = async amount => {
//     const amountInPaise = parseFloat(amount) * 100;

//     try {
//       // First create the order
//       const orderResponse = await axios.post(
//         'https://api.razorpay.com/v1/orders',
//         {
//           amount: amountInPaise,
//           currency: t('DonationDetail.INR'),
//           receipt: `${t('DonationDetail.receipt_')}${Date.now()}`,
//           payment_capture: 1, // auto-capture payment
//         },
//         {
//           auth: {
//             username: 'rzp_test_ANawZDTfnQ7fjY',
//             password: 'wLd92JBcxtJbGVh0GWCToYYx',
//           },
//         },
//       );

//       const orderId = orderResponse.data.id;

//       // Then open checkout with this order ID
//       var options = {
//         order_id: orderId, // Add the order_id here
//         description: `${t('DonationDetail.Payment for')} ${event.name}`,
//         image: 'https://your-logo-url.com',
//         currency: t('DonationDetail.INR'),
//         key: 'rzp_test_ANawZDTfnQ7fjY',
//         amount: amountInPaise.toString(),
//         name: event.name,
//         prefill: {
//           contact: userData.PR_MOBILE_NO || '',
//           name: userData.PR_FULL_NAME || '',
//         },
//         method: {
//           netbanking: false,
//           card: false,
//           upi: true,
//           wallet: false,
//           emi: false,
//           paylater: false,
//         },
//         theme: {color: '#53a20e'},
//       };

//       const paymentData = await RazorpayCheckout.open(options);
//       console.log('Full Payment Data:', paymentData);

//       if (!paymentData.razorpay_payment_id) {
//         throw new Error(
//           t('DonationDetail.No payment ID received from Razorpay'),
//         );
//       }

//       setPaymentProcessingSuccess(true);

//       // Now fetch payment details - order_id should be available now
//       const razorpayPaymentDetails = await axios.get(
//         `https://api.razorpay.com/v1/payments/${paymentData.razorpay_payment_id}`,
//         {
//           auth: {
//             username: 'rzp_test_ANawZDTfnQ7fjY',
//             password: 'wLd92JBcxtJbGVh0GWCToYYx',
//           },
//         },
//       );

//       const fullPaymentData = razorpayPaymentDetails.data;
//       console.log('Full Payment Details:', fullPaymentData);

//       // Rest of your capture payload preparation...
//       const capturePayload = {
//         paymentId: paymentData.razorpay_payment_id,
//         amount: parseFloat(amount),
//         ENVIT_ID: event.id,
//         PR_ID: userData?.PR_ID,
//         PR_FULL_NAME: userData?.PR_FULL_NAME || '',
//         entity: fullPaymentData.entity || t('DonationDetail.payment'),
//         currency: fullPaymentData.currency || t('DonationDetail.INR'),
//         status: fullPaymentData.status || t('DonationDetail.captured'),
//         order_id: fullPaymentData.order_id || orderId, // Use the orderId we created
//         invoice_id: fullPaymentData.invoice_id || null,
//         international: fullPaymentData.international ? 1 : 0,
//         method: fullPaymentData.method || '',
//         amount_refunded: fullPaymentData.amount_refunded || 0,
//         refund_status: fullPaymentData.refund_status ? 1 : 0,
//         captured: fullPaymentData.captured || false,
//         description:
//           fullPaymentData.description ||
//           `${t('DonationDetail.Payment for')} ${event.name}`,
//         bank: fullPaymentData.bank ? 1 : 0,
//         wallet: fullPaymentData.wallet ? 1 : 0,
//         vpa: fullPaymentData.vpa ? 1 : 0,
//         email: fullPaymentData.email || '',
//         contact: fullPaymentData.contact || userData.PR_MOBILE_NO || '',
//         fee: fullPaymentData.fee || 0,
//         tax: fullPaymentData.tax || 0,
//         error_code: fullPaymentData.error_code || '',
//         error_description: fullPaymentData.error_description || '',
//         error_source: fullPaymentData.error_source || '',
//         error_step: fullPaymentData.error_step || '',
//         error_reason: fullPaymentData.error_reason || '',
//         JSON_LOG: JSON.stringify(fullPaymentData),
//         cate_id: event?.eventCategoryID || 1,
//       };

//       // Continue with your capture request...
//       const captureResponse = await axios.post(
//         'https://node2-plum.vercel.app/api/user/capture-payment',
//         capturePayload,
//       );

//       if (captureResponse.data.success) {
//         setPaymentSuccess(true);

//         if (userData?.PR_FULL_NAME) {
//           const templateParams = {
//             title: t('DonationDetail.Payment Done Successfully'),
//             body: `${t('DonationDetail.Dear')} ${userData.PR_FULL_NAME}, ${t(
//               'DonationDetail.your payment of',
//             )} ₹${amount} ${t('DonationDetail.is completed.')}`,
//           };
//           const templateParams2 = {
//             title: t('DonationDetail.Payment Done Successfully'),
//             body: `${t('DonationDetail.User')} ${userData.PR_FULL_NAME}, ${t(
//               'DonationDetail.paying',
//             )} ₹${amount} ${t('DonationDetail.is completed.')}`,
//           };
//           // console.log('🔔 Sending local notification:', templateParams);
//           sendTestNotification(templateParams);
//           sendAdminNotification(templateParams2.title, templateParams2.body);
//         }
//       } else {
//         throw new Error(
//           captureResponse.data.error ||
//             t('DonationDetail.Payment capture failed'),
//         );
//       }
//     } catch (error) {
//       console.error(t('DonationDetail.Payment processing error:'), error);
//     }
//   };
//   return (
//     <SafeAreaView style={styles.MainContainer}>
//       <Animated.View
//         style={[
//           styles.floatingTextContainer,
//           {
//             opacity: scrollDirection === 'up' ? textOpacity : 0,
//           },
//         ]}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.leftButton}>
//             <Image
//               source={leftback}
//               style={styles.leftButtonImage}
//               tintColor="#FFFFFF"
//             />
//           </TouchableOpacity>

//           <View style={styles.titleWrapper}>
//             <Text style={styles.titleText}>{event.name}</Text>
//           </View>
//         </View>
//       </Animated.View>

//       <Animated.ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollViewContent}
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {y: scrollY}}}],
//           {useNativeDriver: false},
//         )}
//         scrollEventThrottle={16}
//         refreshControl={
//           <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
//         }>
//         <KeyboardAwareScrollView
//           keyboardShouldPersistTaps="handled"
//           bounces={false}
//           style={{flex: 1}}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{flexGrow: 1}}>
//           <LinearGradient
//             start={{x: 1, y: 1.7}}
//             end={{x: 0.2, y: 0}}
//             colors={['#86a1ce', '#FFFFFF']}
//             style={{flex: 1, paddingBottom: hp(10)}}>
//             <ImageBackground
//               source={event.headerImage}
//               style={{height: hp(25), width: wp(100)}}></ImageBackground>
//             <View
//               style={{
//                 marginHorizontal: wp(4.5),
//                 //  marginTop: hp(27)
//                 // marginTop: hp(0),
//               }}>
//               <Text
//                 style={{
//                   color: '#386641',
//                   fontWeight: '500',
//                   fontSize: hp(2.3),
//                   width: wp(90),
//                   // borderWidth: wp(0.1),

//                   marginTop: hp(1),
//                   fontFamily: 'Poppins-SemiBold',
//                 }}>
//                 {event.name}
//               </Text>
//               <View
//                 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//                 <View>
//                   <View
//                     style={{
//                       backgroundColor: '#DFE9F2',
//                       borderRadius: wp(5),
//                       marginTop: hp(0.5),
//                       width: wp(90),
//                     }}>
//                     <Text
//                       style={{
//                         // borderWidth: wp(.1),
//                         paddingHorizontal: wp(3),
//                         paddingVertical: wp(2),
//                         color: '#152340',
//                         fontSize: hp(1.7),
//                         width: wp(90), // marginLeft: wp(3),
//                         marginTop: hp(1),
//                         fontFamily: 'Poppins-Medium',
//                       }}>
//                       {event.message}
//                     </Text>
//                   </View>

//                   <View
//                     style={{
//                       backgroundColor: '#F2F0CE',
//                       elevation: 5,
//                       borderRadius: wp(5),
//                       marginTop: hp(1.2),
//                       width: wp(90),
//                     }}>
//                     <Text
//                       style={{
//                         paddingHorizontal: wp(3),
//                         paddingVertical: wp(2),

//                         color: '#000',
//                         fontWeight: '500',
//                         fontSize: hp(1.6),
//                         width: wp(90),
//                         textAlign: 'left',

//                         fontFamily: 'Poppins-Regular',
//                       }}>
//                       {event.Detail}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       backgroundColor: '#D9C6A3',
//                       elevation: 5,
//                       borderRadius: wp(5),
//                       marginTop: hp(1.2),
//                       width: wp(90),
//                     }}>
//                     <Text
//                       style={{
//                         paddingHorizontal: wp(3),
//                         paddingVertical: wp(2),

//                         color: '#000',
//                         fontWeight: '600',
//                         fontSize: hp(1.6),
//                         width: wp(90),
//                         textAlign: 'left',
//                         fontFamily: 'Poppins-Medium',
//                       }}>
//                       {t('DonationDetail.Location')} : {event.address}
//                     </Text>
//                     <Text
//                       style={{
//                         paddingHorizontal: wp(3),
//                         paddingBottom: wp(2),
//                         color: '#000',
//                         fontWeight: '600',
//                         fontSize: hp(1.6),
//                         width: wp(73),
//                         textAlign: 'left',

//                         fontFamily: 'Poppins-Medium',
//                       }}>
//                       ${t('DonationDetail.City')}: {event.city}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View style={{marginTop: hp(2), marginHorizontal: wp(2)}}>
//               <Swiper
//                 style={{height: hp(30)}}
//                 showsButtons={false}
//                 autoplay={false}
//                 showsPagination={true}
//                 paginationStyle={{position: 'absolute', top: 0, height: hp(57)}}
//                 dot={
//                   <View
//                     style={{
//                       backgroundColor: '#7C8C42',
//                       width: 7,
//                       height: 7,
//                       borderRadius: 5,
//                       marginLeft: 2,
//                       marginRight: 2,
//                       marginTop: 2,
//                       marginBottom: 2,
//                     }}
//                   />
//                 }
//                 activeDot={
//                   <View
//                     style={{
//                       backgroundColor: '#1F260F',
//                       width: 18,
//                       height: 7,
//                       borderRadius: 6,
//                       marginLeft: 2,
//                       marginRight: 2,
//                       marginTop: 2,
//                       marginBottom: 2,
//                     }}
//                   />
//                 }>
//                 {event.EventsImage?.uri &&
//                   event.EventsImage.uri.split(', ').map((image, index) => (
//                     <Image
//                       key={index}
//                       source={{uri: image.trim()}} // Ensure no spaces in URLs
//                       style={{
//                         height: hp(25),
//                         width: wp(90),
//                         alignItems: 'center',
//                         alignSelf: 'center',
//                         borderRadius: wp(8),
//                         marginTop: hp(1),
//                         resizeMode: 'cover',
//                       }}
//                     />
//                   ))}
//               </Swiper>
//             </View>

//             {/* PastEvents */}
//             {/* <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 marginHorizontal: wp(6),
//               }}>
//               <Text
//                 style={{
//                   fontSize: hp(2.2),
//                   fontFamily: 'Poppins-Medium',
//                   color: '#1F260F',
//                 }}>
//                 {t('DonationDetail.Past Events')}
//               </Text>

//               <Text
//                 onPress={() => navigation.navigate('PastEvent')}
//                 style={{
//                   fontSize: hp(2.2),
//                   fontFamily: 'Poppins-Medium',
//                   color: '#1F260F',
//                 }}>
//                 {t('DonationDetail.more')}
//               </Text>
//             </View>

//             <View
//               style={{
//                 marginTop: hp(1.5),
//                 alignItems: 'center',
//                 marginHorizontal: wp(4),
//               }}>
//               {pastEvents.length > 0 ? (
//                 <FlatList
//                   removeClippedSubviews={false}
//                   data={[...pastEvents]
//                     .sort(
//                       (a, b) =>
//                         new Date(b.EventsToDate) - new Date(a.EventsToDate),
//                     )
//                     .filter(event => event.eventCategoryID === 1)
//                     .reverse()
//                     .slice(0, 5)}
//                   horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   showsVerticalScrollIndicator={false}
//                   pagingEnabled={true}
//                   keyExtractor={item => item.id.toString()}
//                   renderItem={({item}) => (
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.navigate('PastEventsDetails', {
//                           pastEvent: item,
//                         })
//                       }
//                       style={{
//                         marginHorizontal: wp(1.5),
//                         // marginLeft: wp(1),
//                         // marginRight: wp(1),
//                         width: wp(89),
//                         paddingBottom: hp(1),
//                         borderRadius: wp(3),
//                         backgroundColor: '#D9CAAD',
//                         elevation: 5,
//                         marginBottom: hp(2),
//                       }}>
//                       <Text
//                         style={{
//                           color: '#000',
//                           fontWeight: '500',
//                           fontSize: hp(1.8),
//                           width: wp(78),
//                           // borderWidth: wp(.1),
//                           marginLeft: wp(3),
//                           marginTop: hp(0.6),
//                           fontFamily: 'Poppins-Medium',
//                         }}>
//                         {moment(item.EventsToDate).format('DD MMM YYYY')}
//                       </Text>
//                       <Text
//                         numberOfLines={2}
//                         style={{
//                           // borderWidth: wp(.1),
//                           color: '#73524e',
//                           fontWeight: '500',
//                           fontSize: hp(2.2),
//                           width: wp(78),
//                           marginLeft: wp(3),
//                           marginTop: hp(1),
//                           fontFamily: 'Poppins-Medium',
//                         }}>
//                         {item.name}
//                       </Text>

//                       <Text
//                         style={{
//                           color: '#040c1b',
//                           fontWeight: '500',
//                           fontSize: hp(1.6),
//                           width: wp(78),

//                           marginLeft: wp(3),

//                           marginTop: hp(1.6),
//                           fontFamily: 'Poppins-Regular',
//                         }}>
//                         {item.message}
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               ) : (
//                 <Text
//                   style={{
//                     color: '#73524e',
//                     fontSize: hp(2),
//                     fontFamily: 'Poppins-Medium',
//                     alignSelf: 'center',
//                   }}>
//                   {t('DonationDetail.No past events available.')}
//                 </Text>
//               )}
//             </View> */}

//             {/* Past Events Section - Only show if there are past events with category ID 1 */}
//             {pastEvents.filter(event => event.eventCategoryID === 1).length >
//             0 ? (
//               <>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     marginHorizontal: wp(6),
//                     marginTop: hp(2),
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: hp(2.2),
//                       fontFamily: 'Poppins-Medium',
//                       color: '#1F260F',
//                     }}>
//                     {t('DonationDetail.Past Events')}
//                   </Text>

//                   <Text
//                     onPress={() => navigation.navigate('PastEvent')}
//                     style={{
//                       fontSize: hp(2.2),
//                       fontFamily: 'Poppins-Medium',
//                       color: '#1F260F',
//                     }}>
//                     {t('DonationDetail.more')}
//                   </Text>
//                 </View>

//                 <View
//                   style={{
//                     marginTop: hp(1.5),
//                     alignItems: 'center',
//                     marginHorizontal: wp(4),
//                   }}>
//                   <FlatList
//                     removeClippedSubviews={false}
//                     data={pastEvents
//                       .filter(event => event.eventCategoryID === 1)
//                       .sort(
//                         (a, b) =>
//                           new Date(b.EventsToDate) - new Date(a.EventsToDate),
//                       )
//                       .slice(0, 5)}
//                     horizontal={true}
//                     showsHorizontalScrollIndicator={false}
//                     showsVerticalScrollIndicator={false}
//                     pagingEnabled={true}
//                     keyExtractor={item => item.id.toString()}
//                     renderItem={({item}) => (
//                       <TouchableOpacity
//                         onPress={() =>
//                           navigation.navigate('PastEventsDetails', {
//                             pastEvent: item,
//                           })
//                         }
//                         style={{
//                           marginHorizontal: wp(1.5),
//                           width: wp(89),
//                           paddingBottom: hp(1),
//                           borderRadius: wp(3),
//                           backgroundColor: '#D9CAAD',
//                           elevation: 5,
//                           marginBottom: hp(2),
//                         }}>
//                         <Text
//                           style={{
//                             color: '#000',
//                             fontWeight: '500',
//                             fontSize: hp(1.8),
//                             width: wp(78),
//                             marginLeft: wp(3),
//                             marginTop: hp(0.6),
//                             fontFamily: 'Poppins-Medium',
//                           }}>
//                           {moment(item.EventsToDate).format('DD MMM YYYY')}
//                         </Text>
//                         <Text
//                           numberOfLines={2}
//                           style={{
//                             color: '#73524e',
//                             fontWeight: '500',
//                             fontSize: hp(2.2),
//                             width: wp(78),
//                             marginLeft: wp(3),
//                             marginTop: hp(1),
//                             fontFamily: 'Poppins-Medium',
//                           }}>
//                           {item.name}
//                         </Text>
//                         <Text
//                           style={{
//                             color: '#040c1b',
//                             fontWeight: '500',
//                             fontSize: hp(1.6),
//                             width: wp(78),
//                             marginLeft: wp(3),
//                             marginTop: hp(1.6),
//                             fontFamily: 'Poppins-Regular',
//                           }}>
//                           {item.message}
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                   />
//                 </View>
//               </>
//             ) : null}
//           </LinearGradient>
//         </KeyboardAwareScrollView>
//       </Animated.ScrollView>

//       <LinearGradient
//         start={{x: 1, y: 1.7}}
//         end={{x: 0.2, y: 0}}
//         colors={['#152340', '#FFFFFF']}
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           paddingVertical: hp(0.8),
//           backgroundColor: '#FFFFFF',
//           width: wp(83),
//           alignSelf: 'center',
//           borderRadius: wp(10),
//           marginBottom: hp(3),
//           paddingHorizontal: wp(1.6),
//         }}>
//         <TouchableOpacity onPress={() => setIsAmountModalVisible(true)}>
//           <LinearGradient
//             start={{x: 1, y: 1.7}}
//             end={{x: 0.2, y: 0}}
//             colors={['#F27141', '#F2A950']}
//             style={{
//               backgroundColor: '#F27141',
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingVertical: hp(1),
//               width: wp(38),
//               borderRadius: wp(10),
//             }}>
//             <Text
//               style={{
//                 fontSize: hp(1.8),
//                 marginRight: wp(2.3),
//                 fontFamily: 'Poppins-SemiBold',
//                 color: '#FFFFFF',
//               }}>
//               {t('DonationDetail.Donate Me')}
//             </Text>

//             <Image source={doller} style={{height: hp(2.5), width: wp(5.2)}} />
//           </LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={openWhatsApp}>
//           <LinearGradient
//             start={{x: 1, y: 1.7}}
//             end={{x: 0.2, y: 0}}
//             colors={['#02733E', '#038C4C']}
//             style={{
//               backgroundColor: '#F27141',
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingVertical: hp(1),
//               width: wp(38),
//               borderRadius: wp(10),
//             }}>
//             <Text
//               style={{
//                 fontSize: hp(1.8),
//                 marginRight: wp(2.3),
//                 fontFamily: 'Poppins-SemiBold',
//                 color: '#FFFFFF',
//               }}>
//               {t('DonationDetail.Chat')}
//             </Text>
//             <Image
//               source={whatsapp}
//               style={{height: hp(2.5), width: wp(5.2)}}
//             />
//           </LinearGradient>
//         </TouchableOpacity>
//       </LinearGradient>

//       <Modal
//         transparent={true}
//         visible={isAmountModalVisible}
//         animationType="slide"
//         onRequestClose={() => setIsAmountModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>
//               {t('DonationDetail.Enter Donation Amount')}
//             </Text>

//             <View style={styles.quickAmountsContainer}>
//               <TouchableOpacity
//                 onPress={() => setAmount('100')}
//                 style={[
//                   styles.quickAmountButton,
//                   amount === '100' && styles.quickAmountButtonActive,
//                 ]}>
//                 <Text style={styles.quickAmountText}>100 ₹</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => setAmount('500')}
//                 style={[
//                   styles.quickAmountButton,
//                   amount === '500' && styles.quickAmountButtonActive,
//                 ]}>
//                 <Text style={styles.quickAmountText}>500 ₹</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => setAmount('1000')}
//                 style={[
//                   styles.quickAmountButton,
//                   amount === '1000' && styles.quickAmountButtonActive,
//                 ]}>
//                 <Text style={styles.quickAmountText}>1000 ₹</Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={styles.orText}>{t('DonationDetail.OR')}</Text>

//             <TextInput
//               style={styles.amountInput}
//               placeholder={t('DonationDetail.Enter custom amount')}
//               keyboardType="numeric"
//               value={customAmount}
//               onChangeText={text => setCustomAmount(text)}
//             />

//             <View style={styles.modalButtonsContainer}>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setIsAmountModalVisible(false)}>
//                 <Text style={styles.cancelButtonText}>
//                   {t('DonationDetail.Cancel')}
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.donateButton}
//                 onPress={() => {
//                   const donationAmount = customAmount || amount;
//                   if (donationAmount) {
//                     setIsAmountModalVisible(false);
//                     openCheckout(donationAmount);
//                   } else {
//                     alert(t('DonationDetail.Please enter an amount'));
//                   }
//                 }}>
//                 <Text style={styles.donateButtonText}>
//                   {t('DonationDetail.Proceed to Pay')}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       {/* Modal for payment processing*/}
//       <Modal
//         transparent={true}
//         visible={paymentProcessingSuccess}
//         animationType="slide"
//         onRequestClose={() => setPaymentProcessingSuccess(false)}>
//         <View style={styles.modalContainerSuccessPayment}>
//           <TouchableOpacity
//             onPress={() => setPaymentProcessingSuccess(false)}
//             style={{
//               alignSelf: 'flex-end',
//               margin: wp(3),
//               right: wp(0.3),
//               position: 'absolute',
//               zIndex: 1,
//             }}>
//             <Image
//               source={cancel}
//               style={{
//                 height: hp(3),
//                 width: wp(6),
//                 aspectRatio: 1 / 1,
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//           <Image
//             source={processingpayment}
//             style={{
//               height: hp(33),
//               width: wp(45),
//               resizeMode: 'contain',
//               backgroundColor: '#FFFFFF',
//             }}
//           />

//           <Text
//             style={{
//               fontSize: hp(2),
//               fontFamily: 'Poppins-Medium',
//               textAlign: 'center',
//               marginHorizontal: wp(1),
//               color: '#2D4B73',
//             }}>
//             {t('DonationDetail.Payment successful!')} {'\n'}{' '}
//             {t('DonationDetail.Processing donation...')}
//           </Text>
//         </View>
//       </Modal>

//       {/* Modal for payment confirmation */}
//       <Modal
//         transparent={true}
//         visible={paymentSuccess}
//         animationType="slide"
//         onRequestClose={() => setPaymentSuccess(false)}>
//         <View style={styles.modalContainerSuccessPayment}>
//           <TouchableOpacity
//             onPress={() => setPaymentSuccess(false)}
//             style={{
//               alignSelf: 'flex-end',
//               margin: wp(3),
//               right: wp(0.3),
//               position: 'absolute',
//               zIndex: 1,
//             }}>
//             <Image
//               source={cancel}
//               style={{
//                 height: hp(3),
//                 width: wp(6),
//                 aspectRatio: 1 / 1,
//                 resizeMode: 'contain',
//               }}
//             />
//           </TouchableOpacity>
//           <Image
//             source={moneychecked}
//             style={{
//               marginTop: hp(3),
//               height: hp(30),
//               width: wp(40),
//               resizeMode: 'contain',
//               backgroundColor: '#FFFFFF',
//             }}
//           />

//           <Text
//             style={{
//               fontSize: hp(2.1),
//               fontFamily: 'Poppins-Medium',
//               textAlign: 'center',
//               marginHorizontal: wp(2),
//               color: '#000000',
//               letterSpacing: 0.3,
//             }}>
//             {t('DonationDetail.Donation processed successfully!')} {'\n'}{' '}
//             {t('DonationDetail.Thank you.')}
//           </Text>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   floatingTextContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     zIndex: 200,
//     backgroundColor: 'rgba(0,0,0,1)',
//     padding: 20,
//   },
//   floatingText: {
//     fontSize: hp(2),
//     color: '#000',
//     fontFamily: 'Poppins-Medium',
//   },
//   modalContainerSuccessPayment: {
//     backgroundColor: '#FFFFFF',
//     height: hp(45),
//     width: wp(78),
//     elevation: 5,
//     alignItems: 'center',
//     borderRadius: wp(3),
//     alignSelf: 'center',
//   },
//   modalContainer: {
//     height: hp(100),
//     alignSelf: 'center',

//     width: wp(100),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#F2F0EB',
//     padding: 20,
//     // height: hp(45),
//     borderRadius: 10,
//     width: wp(85),
//   },
//   modalTitle: {
//     fontSize: hp(2.2),
//     fontFamily: 'Poppins-Medium',
//     textAlign: 'center',
//     color: '#386641',
//   },
//   quickAmountsContainer: {
//     marginTop: hp(2),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // marginBottom: 15,
//   },
//   quickAmountButton: {
//     borderWidth: wp(0.4),
//     borderColor: '#D9C3A9',
//     borderRadius: wp(2),
//     height: hp(5.5),
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: wp(20),
//     backgroundColor: '#FFFFFF',
//   },
//   quickAmountButtonActive: {
//     backgroundColor: '#F2DC6D',
//     borderColor: '#A6896F',
//     borderWidth: wp(0.5),
//   },
//   quickAmountText: {
//     fontFamily: 'Poppins-SemiBold',
//     textAlign: 'center',
//   },
//   orText: {
//     textAlign: 'center',
//     marginVertical: 10,
//     fontFamily: 'Poppins-Regular',
//   },
//   amountInput: {
//     borderWidth: 1,
//     borderColor: '#A64138',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontFamily: 'Poppins-Regular',
//   },
//   modalButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cancelButton: {
//     backgroundColor: '#E0E0E0',
//     padding: 10,
//     borderRadius: 5,
//     width: '45%',
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontFamily: 'Poppins-SemiBold',
//     color: '#333',
//   },
//   donateButton: {
//     backgroundColor: '#F27141',
//     padding: 10,
//     borderRadius: 5,
//     width: '45%',
//     alignItems: 'center',
//   },
//   donateButtonText: {
//     fontFamily: 'Poppins-SemiBold',
//     color: '#FFF',
//   },
//   MainContainer: {
//     flex: 1,
//   },
//   imageBackground: {
//     width: wp(100),
//     position: 'relative',
//   },
//   imageContainer: {
//     width: wp(100),
//     position: 'absolute',
//     top: 0,
//     zIndex: 100,
//   },
//   imageBackground: {
//     flex: 1,
//     // height: hp(27),
//     width: '100%',
//     resizeMode: 'cover',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     position: 'relative',
//     paddingHorizontal: 10,
//   },

//   leftButton: {
//     zIndex: 2, // Ensures it's above the title if overlapping
//   },

//   leftButtonImage: {
//     width: 30,
//     height: 30,

//     resizeMode: 'contain',
//   },

//   titleWrapper: {
//     position: 'absolute',
//     left: 0,
//     right: 0,

//     alignItems: 'center',
//     justifyContent: 'center',
//     // width: wp(100),
//     // width: wp(60),
//     marginHorizontal: wp(10),
//     alignContent: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     // alignContent: 'center',
//   },

//   titleText: {
//     fontSize: hp(2.3),
//     color: '#FFFFFF',
//     justifyContent: 'center',
//     textAlign: 'center',
//     // width: wp(60),
//     fontWeight: '500',

//     // fontFamily: 'Poppins-SemiBold',
//   },
//   rightButton: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#FFFFFF',
//     aspectRatio: 1 / 1,
//     borderRadius: wp(100),
//     height: hp(5.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rightButtonImage: {
//     height: hp(3),
//     width: wp(6),
//   },
// });

// export default DonationDetail;
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
  RefreshControl,
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
import PastEventsDetails from '../Home/PastEventsDetails';
import {
  sendAdminNotification,
  sendTestNotification,
  setupForegroundNotificationHandler,
} from '../Notification/Foreground';
import {useTranslation} from 'react-i18next';
import RenderHtml from 'react-native-render-html';

const DonationDetail = ({route, props, navigation}) => {
  const {width} = useWindowDimensions();
  const {event} = route.params || {};
  const [isAmountModalVisible, setIsAmountModalVisible] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [langCode, setLangCode] = useState('en');

  const {t} = useTranslation();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentProcessingSuccess, setPaymentProcessingSuccess] =
    useState(false);
  const [apiLoader, setApiLoader] = useState(true);
  const [pastEvents, setPastEvents] = useState([]);

  console.log('Current eventy coming from donation screen', event);
  console.log('PastEvents', pastEvents);

  useEffect(() => {
    setupForegroundNotificationHandler();
  }, []);

  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLangCode = await getData(async_keys.language_code);
        if (savedLangCode) {
          setLangCode(savedLangCode);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguagePreference();
  }, []);

  const handleRefresh = async () => {
    setRefresh(true);
    await fetchEvents();
    setRefresh(false);
  };

  const fetchEvents = async () => {
    try {
      console.log('Fetching past events with lang_code:', langCode);
      const response = await fetch(`${BASE_URL}/events?lang_code=${langCode}`);
      const result = await response.json();
      console.log('Fetched Past Events:', result.events);

      if (Array.isArray(result.events)) {
        const currentDate = new Date();

        const formattedData = result.events
          .filter(item => {
            const hasContent =
              item.ENVT_DESC &&
              item.ENVT_DESC.trim() !== '' &&
              item.ENVT_EXCERPT &&
              item.ENVT_EXCERPT.trim() !== '';

            const eventEndDate = new Date(item.EVNT_UPTO_DT);
            return hasContent && eventEndDate < currentDate;
          })
          .map(item => ({
            id: item.ENVT_ID,
            eventCategoryID: item.ENVT_CATE_ID,
            name: item.ENVT_DESC,
            message: item.ENVT_EXCERPT,
            Detail: item.ENVT_DETAIL,
            headerImage: {uri: item.ENVT_BANNER_IMAGE},
            EventsImage: {uri: item.ENVT_GALLERY_IMAGES},
            EventContact: item.ENVT_CONTACT_NO,
            EventFromDate: item.EVNT_FROM_DT,
            EventsToDate: item.EVNT_UPTO_DT,
            address: item.ENVT_ADDRESS,
            city: item.ENVT_CITY,
            createdEventDate: item.EVET_CREATED_DT,
            cate_desc: item?.SubCategory?.CATE_DESC || '',
          }));

        if (formattedData.length > 0) {
          setPastEvents(formattedData);
          console.log('Past events information', formattedData);
        } else {
          console.warn(
            t(
              'DonationDetail.No past events with content in selected language.',
            ),
          );
          setPastEvents([]);
        }
      } else {
        console.warn(t('DonationDetail.No valid events data found.'));
        setPastEvents([]);
      }
    } catch (error) {
      console.error(t('DonationDetail.Error fetching Events:'), error);
      setPastEvents([]);
    } finally {
      setApiLoader(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [langCode]);

  const openWhatsApp = () => {
    const url = `https://wa.me/91${event.EventContact}`;

    Linking.openURL(url).catch(err =>
      console.error(t('DonationDetail.An error occurred'), err),
    );
  };

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
            setIsCaptured(true);
          } else {
            console.error(
              t('DonationDetail.Payment capture failed:'),
              response.data.error,
            );
          }
        } catch (error) {
          console.error(
            t('DonationDetail.Error during capture:'),
            error.response?.data || error.message,
          );
        }
      };

      capturePayment();
    }, [paymentId, amount, isCaptured, eventId, userId, prId]);

    return null;
  };

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

  const openCheckout = async amount => {
    const amountInPaise = parseFloat(amount) * 100;

    try {
      const orderResponse = await axios.post(
        'https://api.razorpay.com/v1/orders',
        {
          amount: amountInPaise,
          currency: t('DonationDetail.INR'),
          receipt: `${t('DonationDetail.receipt_')}${Date.now()}`,
          payment_capture: 1,
        },
        {
          auth: {
            username: 'rzp_test_ANawZDTfnQ7fjY',
            password: 'wLd92JBcxtJbGVh0GWCToYYx',
          },
        },
      );

      const orderId = orderResponse.data.id;

      var options = {
        order_id: orderId,
        description: `${t('DonationDetail.Payment for')} ${event.name}`,
        image: 'https://your-logo-url.com',
        currency: t('DonationDetail.INR'),
        key: 'rzp_test_ANawZDTfnQ7fjY',
        amount: amountInPaise.toString(),
        name: event.name,
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
        throw new Error(
          t('DonationDetail.No payment ID received from Razorpay'),
        );
      }

      setPaymentProcessingSuccess(true);

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
        ENVIT_ID: event.id,
        PR_ID: userData?.PR_ID,
        PR_FULL_NAME: userData?.PR_FULL_NAME || '',
        entity: fullPaymentData.entity || t('DonationDetail.payment'),
        currency: fullPaymentData.currency || t('DonationDetail.INR'),
        status: fullPaymentData.status || t('DonationDetail.captured'),
        order_id: fullPaymentData.order_id || orderId,
        invoice_id: fullPaymentData.invoice_id || null,
        international: fullPaymentData.international ? 1 : 0,
        method: fullPaymentData.method || '',
        amount_refunded: fullPaymentData.amount_refunded || 0,
        refund_status: fullPaymentData.refund_status ? 1 : 0,
        captured: fullPaymentData.captured || false,
        description:
          fullPaymentData.description ||
          `${t('DonationDetail.Payment for')} ${event.name}`,
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
        cate_id: event?.eventCategoryID || 1,
      };

      const captureResponse = await axios.post(
        'https://node2-plum.vercel.app/api/user/capture-payment',
        capturePayload,
      );

      if (captureResponse.data.success) {
        setPaymentSuccess(true);

        if (userData?.PR_FULL_NAME) {
          const templateParams = {
            title: t('DonationDetail.Payment Done Successfully'),
            body: `${t('DonationDetail.Dear')} ${userData.PR_FULL_NAME}, ${t(
              'DonationDetail.your payment of',
            )} ₹${amount} ${t('DonationDetail.is completed.')}`,
          };
          const templateParams2 = {
            title: t('DonationDetail.Payment Done Successfully'),
            body: `${t('DonationDetail.User')} ${userData.PR_FULL_NAME}, ${t(
              'DonationDetail.paying',
            )} ₹${amount} ${t('DonationDetail.is completed.')}`,
          };
          sendTestNotification(templateParams);
          sendAdminNotification(templateParams2.title, templateParams2.body);
        }
      } else {
        throw new Error(
          captureResponse.data.error ||
            t('DonationDetail.Payment capture failed'),
        );
      }
    } catch (error) {
      console.error(t('DonationDetail.Payment processing error:'), error);
    }
  };

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
    <SafeAreaView style={styles.MainContainer}>
      <LinearGradient
        start={{x: 1, y: 1.7}}
        end={{x: 0.2, y: 0}}
        colors={['#86a1ce', '#FFFFFF']}
        style={{flex: 1}}>
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
              <Text style={styles.titleText}>{event.name}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
          }>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            bounces={false}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <ImageBackground
              source={event.headerImage}
              style={{height: hp(25), width: wp(100)}}></ImageBackground>
            <View
              style={{
                marginHorizontal: wp(4.5),
                marginTop: hp(1),
              }}>
              <Text
                style={{
                  color: '#386641',
                  fontWeight: '500',
                  fontSize: hp(2.3),
                  width: wp(90),
                  marginTop: hp(1),
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {event.name}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <View
                    style={{
                      backgroundColor: '#DFE9F2',
                      borderRadius: wp(5),
                      marginTop: hp(0.5),
                      width: wp(90),
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingVertical: wp(2),
                        color: '#152340',
                        fontSize: hp(1.7),
                        width: wp(90),
                        marginTop: hp(1),
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {event.message}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: '#F2F0CE',
                      elevation: 5,
                      borderRadius: wp(5),
                      marginTop: hp(1.2),
                      width: wp(90),
                    }}>
                    {/* <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingVertical: wp(2),
                        color: '#000',
                        fontWeight: '500',
                        fontSize: hp(1.6),
                        width: wp(90),
                        textAlign: 'left',
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {event.Detail}
                    </Text> */}
                    <RenderHtml
                      contentWidth={width}
                      source={{html: event.Detail}}
                      tagsStyles={tagsStyles}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: '#D9C6A3',
                      elevation: 5,
                      borderRadius: wp(5),
                      marginTop: hp(1.2),
                      width: wp(90),
                    }}>
                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingVertical: wp(2),
                        color: '#000',
                        fontWeight: '600',
                        fontSize: hp(1.6),
                        width: wp(90),
                        textAlign: 'left',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {t('DonationDetail.Location')} : {event.address}
                    </Text>
                    <Text
                      style={{
                        paddingHorizontal: wp(3),
                        paddingBottom: wp(2),
                        color: '#000',
                        fontWeight: '600',
                        fontSize: hp(1.6),
                        width: wp(73),
                        textAlign: 'left',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      ${t('DonationDetail.City')}: {event.city}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: hp(2), marginHorizontal: wp(2)}}>
              <Swiper
                style={{height: hp(30)}}
                showsButtons={false}
                autoplay={false}
                showsPagination={true}
                paginationStyle={{position: 'absolute', top: 0, height: hp(57)}}
                dot={
                  <View
                    style={{
                      backgroundColor: '#7C8C42',
                      width: 7,
                      height: 7,
                      borderRadius: 5,
                      marginLeft: 2,
                      marginRight: 2,
                      marginTop: 2,
                      marginBottom: 2,
                    }}
                  />
                }
                activeDot={
                  <View
                    style={{
                      backgroundColor: '#1F260F',
                      width: 18,
                      height: 7,
                      borderRadius: 6,
                      marginLeft: 2,
                      marginRight: 2,
                      marginTop: 2,
                      marginBottom: 2,
                    }}
                  />
                }>
                {event.EventsImage?.uri &&
                  event.EventsImage.uri.split(', ').map((image, index) => (
                    <Image
                      key={index}
                      source={{uri: image.trim()}}
                      style={{
                        height: hp(25),
                        width: wp(90),
                        alignItems: 'center',
                        alignSelf: 'center',
                        borderRadius: wp(8),
                        marginTop: hp(1),
                        resizeMode: 'cover',
                      }}
                    />
                  ))}
              </Swiper>
            </View>

            {pastEvents.filter(event => event.eventCategoryID === 1).length >
            0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: wp(6),
                    marginTop: hp(2),
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2.2),
                      fontFamily: 'Poppins-Medium',
                      color: '#1F260F',
                    }}>
                    {t('DonationDetail.Past Events')}
                  </Text>

                  <Text
                    onPress={() => navigation.navigate('PastEvent')}
                    style={{
                      fontSize: hp(2.2),
                      fontFamily: 'Poppins-Medium',
                      color: '#1F260F',
                    }}>
                    {t('DonationDetail.more')}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: hp(1.5),
                    alignItems: 'center',
                    marginHorizontal: wp(4),
                    marginBottom: hp(11),
                  }}>
                  <FlatList
                    removeClippedSubviews={false}
                    data={pastEvents
                      .filter(event => event.eventCategoryID === 1)
                      .sort(
                        (a, b) =>
                          new Date(b.EventsToDate) - new Date(a.EventsToDate),
                      )
                      .slice(0, 5)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled={true}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('PastEventsDetails', {
                            pastEvent: item,
                          })
                        }
                        style={{
                          marginHorizontal: wp(1.5),
                          width: wp(89),
                          paddingBottom: hp(1),
                          borderRadius: wp(3),
                          backgroundColor: '#D9CAAD',
                          elevation: 5,
                          marginBottom: hp(2),
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontWeight: '500',
                            fontSize: hp(1.8),
                            width: wp(78),
                            marginLeft: wp(3),
                            marginTop: hp(0.6),
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {moment(item.EventsToDate).format('DD MMM YYYY')}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={{
                            color: '#73524e',
                            fontWeight: '500',
                            fontSize: hp(2.2),
                            width: wp(78),
                            marginLeft: wp(3),
                            marginTop: hp(1),
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: '#040c1b',
                            fontWeight: '500',
                            fontSize: hp(1.6),
                            width: wp(78),
                            marginLeft: wp(3),
                            marginTop: hp(1.6),
                            fontFamily: 'Poppins-Regular',
                          }}>
                          {item.message}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </>
            ) : null}
          </KeyboardAwareScrollView>
        </Animated.ScrollView>

        <LinearGradient
          start={{x: 1, y: 1.7}}
          end={{x: 0.2, y: 0}}
          colors={['#152340', '#FFFFFF']}
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: hp(0.8),
            backgroundColor: '#FFFFFF',
            width: wp(83),
            alignSelf: 'center',
            borderRadius: wp(10),
            marginBottom: hp(3),
            paddingHorizontal: wp(1.6),
          }}>
          <TouchableOpacity onPress={() => setIsAmountModalVisible(true)}>
            <LinearGradient
              start={{x: 1, y: 1.7}}
              end={{x: 0.2, y: 0}}
              colors={['#F27141', '#F2A950']}
              style={{
                backgroundColor: '#F27141',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: hp(1),
                width: wp(38),
                borderRadius: wp(10),
              }}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  marginRight: wp(2.3),
                  fontFamily: 'Poppins-SemiBold',
                  color: '#FFFFFF',
                }}>
                {t('DonationDetail.Donate Me')}
              </Text>

              <Image
                source={doller}
                style={{height: hp(2.5), width: wp(5.2)}}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={openWhatsApp}>
            <LinearGradient
              start={{x: 1, y: 1.7}}
              end={{x: 0.2, y: 0}}
              colors={['#02733E', '#038C4C']}
              style={{
                backgroundColor: '#F27141',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: hp(1),
                width: wp(38),
                borderRadius: wp(10),
              }}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  marginRight: wp(2.3),
                  fontFamily: 'Poppins-SemiBold',
                  color: '#FFFFFF',
                }}>
                {t('DonationDetail.Chat')}
              </Text>
              <Image
                source={whatsapp}
                style={{height: hp(2.5), width: wp(5.2)}}
              />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>

      <Modal
        transparent={true}
        visible={isAmountModalVisible}
        animationType="slide"
        onRequestClose={() => setIsAmountModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t('DonationDetail.Enter Donation Amount')}
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

            <Text style={styles.orText}>{t('DonationDetail.OR')}</Text>

            <TextInput
              style={styles.amountInput}
              placeholder={t('DonationDetail.Enter custom amount')}
              keyboardType="numeric"
              value={customAmount}
              onChangeText={text => setCustomAmount(text)}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsAmountModalVisible(false)}>
                <Text style={styles.cancelButtonText}>
                  {t('DonationDetail.Cancel')}
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
                    alert(t('DonationDetail.Please enter an amount'));
                  }
                }}>
                <Text style={styles.donateButtonText}>
                  {t('DonationDetail.Proceed to Pay')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
            {t('DonationDetail.Payment successful!')} {'\n'}{' '}
            {t('DonationDetail.Processing donation...')}
          </Text>
        </View>
      </Modal>

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
            {t('DonationDetail.Donation processed successfully!')} {'\n'}{' '}
            {t('DonationDetail.Thank you.')}
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: hp(2.3),
    color: '#FFFFFF',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
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

export default DonationDetail;
