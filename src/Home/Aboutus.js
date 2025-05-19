import {React} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import leftback from '../provider/png/leftback.png';
import BackgroundImage from '../provider/png/BackgroundImage.png';

const Aboutus = props => {
    return(
        <SafeAreaView style={style.MainContainer}>

                  <ImageBackground source={BackgroundImage} style={{height: hp(100), width: wp(100), opacity: 0.85, flex: 1}}> 
            <LinearGradient
                      start={{x: 1, y: 1.7}}
                      end={{x: 0.2, y: 0}}
                      // colors={['#D98471', '#FFFFFF']}
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
                                    About Us
                                  </Text>
                                </View>
                              </View>

                          <KeyboardAwareScrollView
                                keyboardShouldPersistTaps="handled"
                                bounces={false}
                                style={{flex: 1}}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{flexGrow: 1}}>
   <View>
                 <View style ={{ marginBottom: hp(5), alignSelf: "center", justifyContent: "center"}}>
                  <Text style={{alignSelf: "center", marginTop: hp(1.5), fontSize: hp(2.4), fontFamily: "Poppins-Medium", color: "#1F260F"}}>Rangrez About Us</Text>
               <View style={{alignSelf: "center", justifyContent: "center", marginHorizontal: wp(3), marginTop: hp(2)}}>
               <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500",  textAlign: "center", lineHeight: hp(2.8) }}>
               The Rangrej Samaj Rajasthan is a vibrant community bound by a shared heritage, values, and a collective vision for growth and prosperity. For generations, the Rangrej community has been renowned for its mastery of color, celebrated for infusing fabrics with vibrancy and life through the traditional art of dyeing and design. This ancestral craft symbolizes our enduring commitment to spreading joy and harmony within society.
               {'\n'}
           
</Text>
<Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", marginTop: hp(2), textAlign: "center", lineHeight: hp(2.8) }}>
While honoring our rich legacy, the Rangrej Samaj strives to empower its members with opportunities for education, social welfare, and economic progress. We are dedicated to fostering a brighter and more sustainable future for our community by blending tradition with innovation.

               </Text>


               <Text style={{fontSize: hp(2.4), color: "#1F260F", fontFamily: "Poppins-SemiBold",  marginTop: hp(4), alignSelf: "center"}}>Vision</Text>
               <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "center", lineHeight: hp(2.8), marginTop: hp(1.5) }}>
               At the heart of our mission is a commitment to advancing education as the cornerstone of progress. In line with this vision, we are embarking on transformative initiatives to uplift our community: 
           
</Text>


<Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "center", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
While honoring our rich legacy, the Rangrej Samaj strives to empower its members with opportunities for education, social welfare, and economic progress. We are dedicated to fostering a brighter and more sustainable future for our community by blending tradition with innovation.

               </Text>

               <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
             1.  Modern Islamic School and Hostel: Establishing educational institutions to provide quality learning environments that nurture young minds with knowledge and values.{'\n'}
             </Text>
             <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", marginTop: hp(2) }}>
2.  Healthcare for All: In our second phase, we aim to build a state-of-the-art hospital to ensure accessible and affordable healthcare for our community members and beyond.{'\n'}
</Text>
<Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500",textAlign: "center", lineHeight: hp(2.8), marginTop: hp(2.5)}}> 
Through these endeavors, we aspire to create a self-sustaining and prosperous society driven by education, health, and unity.
</Text>


<Text style={{fontSize: hp(2.4), color: "#1F260F", fontFamily: "Poppins-SemiBold",  marginTop: hp(4), alignSelf: "center"}}>What We Offer</Text>

<Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
             1.  Community Engagement: A platform to connect and unite members across various regions, fostering a sense of belonging and shared purpose.{'\n'}
             </Text>
             <Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}>
2.  Education Advocacy: Initiatives to promote learning opportunities, especially for the younger generation.{'\n'}
</Text>
<Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5) }}> 
3.  Economic Empowerment: Support for startups, business interests, and skill development through Zakat fund collections and other resources.


</Text>

<Text style={{fontSize: hp(1.8), fontFamily: "Poppins-Regular", fontWeight: "500", textAlign: "left", lineHeight: hp(2.8), marginTop: hp(2.5)}}> 
4.  Social Welfare: Programs focused on healthcare, pension counseling, and government opportunities to uplift the community.


</Text>


               </View>
               </View>
               
            </View>
                                    
                                </KeyboardAwareScrollView>
                      </LinearGradient>
         </ImageBackground>
        </SafeAreaView>

    );
}

const style = StyleSheet.create({
MainContainer: {
    flex: 1
}
});

export default Aboutus;