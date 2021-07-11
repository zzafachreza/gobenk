import React from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IconCategory = ({img, title, onPress, image}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          // flex: 1,
          width: windowWidth / 3.5,
          height: 120,

          // backgroundColor: '#F8781D',
          // backgroundColor: '#FFF',
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          // margin: 5,
          // borderWidth: 1,
          // borderColor: colors.secondary,

          // elevation: 2,
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
          }}>
          <Image
            source={image}
            style={{
              resizeMode: 'contain',
              width: 100,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              // color: '#F8781D',
              color: colors.primary,
              fontSize: windowWidth / 28,
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function MyKategori() {
  const navigation = useNavigation();

  const dataKategori = [
    {
      name: 'Go Bunker',
      image: require('../../assets/bunker.png'),
    },
    {
      name: 'Go Ship',
      image: require('../../assets/ship.png'),
    },

    {
      name: 'Go Truck',
      image: require('../../assets/truck.png'),
    },
  ];

  return (
    <View
      style={{
        // margin: 10,
        // borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          // justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#039F03',
        }}>
        <Icon type="ionicon" name="grid" color="#FFF" size={16} />
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#FFF',
            left: 10,
            fontSize: 16,
          }}>
          PT. MANOLO BERKAH ENERGI
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          // backgroundColor: '#16A858',
        }}>
        {dataKategori.map(item => {
          return (
            <IconCategory
              title={item.name}
              image={item.image}
              // onPress={() =>
              //   navigation.navigate('Kategori', {
              //     kategori: item.value,
              //     menu: item.value,
              //   })
              // }
            />
          );
        })}
      </View>
    </View>
  );
}
