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

const HobbiesDetails = () => {
  const [value, setValue] = useState(null);
  const [child, setChilds] = useState([{id: 1, value: ''}]);

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
      <Text
        style={{
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: hp(3),
          marginTop: hp(2),
          fontFamily: 'Poppins-Medium',
        }}>
        Hobbies
      </Text>

      <Text
        style={{
          marginLeft: wp(6),
          color: '#000000',
          fontFamily: 'Poppins-Medium',
          fontSize: hp(2),
          marginTop: hp(3),
        }}>
        Select your Hobbies
      </Text>

      <FlatList
              data={data.Hobbies}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              style={{ flex: 1  }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#697368',
                    height: hp(5.5),
                    width: wp(75),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: hp(1),
                    borderRadius: wp(2),
                     marginHorizontal: wp(2),
                    //  elevation: 5,
                     flexDirection: "row"
                  }}
                  // onPress={() => {
                  //   setValue(item.type); // Set selected Business Stream
                  //   setDropdownVisible(false); // Hide dropdown
                  // }}
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
              )}
            />


    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // marginBottom: hp(16),
    //  alignItems: "center", alignSelf: "center",
    //  marginHorizontal: wp(12)
  },
});

export default HobbiesDetails;
