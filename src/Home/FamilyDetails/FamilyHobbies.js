import {React, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
// import leftpage from '../provider/png/leftpage.png';
import leftpage from '../../provider/png/leftpage.png';
import rightpage from '../../provider/png/rightpage.png';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import cricket from '../../provider/png/cricket.png';
import football from '../../provider/png/football.png';
import painting from '../../provider/png/painting.png';
import singing from '../../provider/png/singing.png';



import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const FamilyHobbies = () => {
  const [value, setValue] = useState(null);
  const [child, setChilds] = useState([{id: 1, value: ''}]);
    const [selectedHobbies, setSelectedHobbies] = useState(null);

  const data = {
    Hobbies: [
      {type: 'Cricket', id: '1', logo: cricket},
      {type: 'Football', id: '2', logo: football},
      {type: 'Painting', id: '3', logo: painting},
      {type: 'Singing', id: '4', logo: singing},
     

      


      

      

      
    ],
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} horizontal={false} style={styles.MainContainer}>

              <View style={{marginBottom: hp(2),           width: wp(83),
                        marginTop: hp(2)}}>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: 'Poppins-Medium',
                      alignSelf: 'center',
                      color: '#000000',
                    }}>
                    Hobbies & Interest
                  </Text>
            
                  
                  
            
                 
            
                    <Text
                      style={{
                        marginLeft: wp(1),
                        color: '#697368',
                        fontFamily: 'Poppins-Medium',
                        fontSize: hp(2),
                        marginTop: hp(3),
                      }}>
                      Select your Hobbies
                    </Text>

{/* <FlatList
              data={data.Hobbies}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              style={{ marginTop: hp(1.5)  }}

              renderItem={({item}) => {
               
const isSelected = selectedHobbies === item.id;
                return (
                
                    <TouchableOpacity
                  style={{
                    backgroundColor: isSelected ? '#0468BF' : '#697368',
                    height: hp(5.5),
                    width: wp(81),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: hp(1),
                    borderRadius: wp(2),
                     marginHorizontal: wp(2),
                    //  elevation: 5,
                     flexDirection: "row"
                  }}
                  onPress={() => setSelectedHobbies(item.id)} 
                  >
                    <Image source={item.logo} style={{height: hp(3.2), width: wp(6.4), marginRight: wp(3)}}/>
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontFamily: 'Poppins-Medium',
                      color: '#FFFFFF',
                    }}>
                    {item.type}
                  </Text>
                </TouchableOpacity>
                  );
                }}

           
            />  */}

             <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                                  <View 
                                    style={{
                                      flexDirection: "row",
                                      flexWrap: "wrap",  // Enables wrapping to the next line
                                      justifyContent: "center", // Ensures items are centered
                                    }}
                                  >
                                    {data.Hobbies.map((item) => {
                                      const isSelected = selectedHobbies === item.id;
                                      return (
                                        <TouchableOpacity
                                          key={item.id}
                                          onPress={() => setSelectedHobbies(item.id)}
                                          style={{
                                            backgroundColor: isSelected ? "#0468BF" : "#697368",
                                            height: hp(6.5),
                                            width: wp(33),
                                            margin: wp(2), // Margin for spacing
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: wp(2),
                                            flexDirection: "row",
                                          }}
                                          // disabled={!isEditable}
                                        >
                                          <Image source={item.logo} style={{ height: hp(3.2), width: wp(6.4), marginRight: wp(2) }} />
                                          <Text style={{ fontSize: hp(2), fontFamily: "Poppins-Medium", color: "#FFFFFF" }}>{item.type}</Text>
                                        </TouchableOpacity>
                                      );
                                    })}
                                  </View>
                                </View>
            
           
            
                   
                  </View>


    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
 flex: 1,
        backgroundColor: 'rgba(197, 206, 217, 0.7)',
                padding: hp(2),
              marginBottom: hp(1.5),
        // marginBottom: hp(10),
        borderRadius: wp(5),
               marginTop: hp(3),
   
  },
});

export default FamilyHobbies;
