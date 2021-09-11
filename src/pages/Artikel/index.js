import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Share,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import {getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {Icon} from 'react-native-elements';

export default function Artikel({navigation, route}) {
  const [visible, setVisible] = useState(true);
  const hideSpinner = () => {
    setVisible(false);
  };

  const id = route.params.id;

  const myUrl = `https://zavalabs.com/gobenk/api/artikel.php?id=` + id;

  console.log(myUrl);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: route.params.judul,
        url: myUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,

        // padding: 10,
      }}>
      <WebView
        onLoad={hideSpinner}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); `}
        // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        source={{
          uri: myUrl,
        }}
      />
      <View
        style={{
          position: 'absolute',
          // top: 0,
          width: '100%',
          flexDirection: 'row',
          backgroundColor: 'transparent',
          height: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 10,
          }}>
          <Icon
            type="ionicon"
            color={colors.white}
            name="arrow-back-outline"
            size={35}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onShare}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingRight: 20,
          }}>
          <Icon
            type="ionicon"
            color={colors.white}
            name="share-social-outline"
            size={30}
          />
        </TouchableOpacity>
      </View>
      {visible && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFF',
            width: '100%',
            top: 0,
            opacity: 0.7,
            height: '100%',
          }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
