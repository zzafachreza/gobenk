import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import WebView from 'react-native-webview';
import {colors} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {fonts, windowWidth} from '../../utils/fonts';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import FileViewer from 'react-native-file-viewer';

export default function ListView2({navigation, route}) {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(true);

  const hideSpinner = () => {
    setVisible(false);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Go - Benk',
          message: 'Izinikan Aplikasi Untuk Menyimpan Data',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        axios.post(myUrl2).then(res => {
          console.log(res.data);
          createPDF('Kurir', res.data);
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const createPDF = async (nama_file, html) => {
    let options = {
      html: html,
      fileName: 'GO_BENK_' + nama_file,
      directory: '',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    // alert(file.filePath);

    // const path = // absolute-path-to-my-local-file.
    FileViewer.open(file.filePath, {showOpenWithDialog: false})
      .then(() => {
        // success
        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: 'zvl-bigetronesports', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          title: 'Gobenk - Invoice', // (optional)
          message: 'Download Selesai, ' + file.filePath, // (required)
        });
      })
      .catch(error => {
        // error
      });
  };

  const myUrl =
    `https://zavalabs.com/gobenk/api/inv_kurir.php?kode=` + route.params.kode;

  const myUrl2 =
    `https://zavalabs.com/gobenk/api/inv_kurir2.php?kode=` + route.params.kode;

  const sendServer = () => {
    requestCameraPermission();
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
      <TouchableOpacity
        onPress={sendServer}
        style={{
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: colors.danger,
        }}>
        <Icon type="ionicon" name="download-outline" color={colors.white} />
        <Text
          style={{
            left: 10,
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.white,
          }}>
          DOWNLOAD
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
