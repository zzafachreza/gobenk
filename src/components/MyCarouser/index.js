import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ImageBackground,
  TouchableNativeFeedback,
  FlatList,
  Image,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../utils/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../utils/fonts';
import {ExpandingDot} from 'react-native-animated-pagination-dots';

export default function MyCarouser() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  useEffect(() => {
    // axios.get('https://zavalabs.com/sebatiku/api/slider.php').then(res => {
    //   setData(res.data);
    // });
  }, []);

  const [data, setData] = useState([
    {
      image: require('../../assets/gobenkslider1.png'),
    },
    {
      image: require('../../assets/gobenkslider2.png'),
    },
    {
      image: require('../../assets/gobenkslider3.png'),
    },
  ]);

  const Pagination = () => {
    const {entries, activeSlide} = useState();

    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <Image
          key={item.id}
          resizeMode="cover"
          source={item.image}
          style={{
            width: windowWidth,

            height: Math.round((windowWidth * 9) / 15),
          }}
        />
      </View>
    );
  };

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        padding: 10,
      }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={data}
        renderItem={({item}) => {
          return (
            <Image
              source={item.image}
              style={{
                alignSelf: 'center',
                width: windowWidth - 40,
                height: Math.round((windowWidth * 9) / 15),
                resizeMode: 'cover',
                marginHorizontal: 10,
                borderRadius: 20,
              }}
            />
          );
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
      <ExpandingDot
        data={data}
        expandingDotWidth={10}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        activeDotColor={colors.white}
        inActiveDotColor={colors.black}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: colors.border,
          // backgroundColor: 'red',
          // borderRadius: 5,
          // marginHorizontal: 5
        }}
        containerStyle={{
          bottom: '10%',
        }}
      />

      {/* <Carousel
        // layout="stack"
        // layoutCardOffset={18}

        data={data}
        sliderWidth={windowWidth - 20}
        itemWidth={windowWidth - 20}
        renderItem={_renderItem}
        activeDotIndex
        autoplay={true}
        autoplayDelay={2000}
        autoplayInterval={3000}
        onSnapToItem={index => setActiveSlide(index)}
        activeAnimationType="timing"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({});
