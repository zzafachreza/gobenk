import React, {useEffect} from 'react';
import {View, Text, Linking, ActivityIndicator} from 'react-native';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {colors} from '../../utils/colors';
import {useIsFocused} from '@react-navigation/native';

export default function Chat() {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      axios.post('https://zavalabs.com/gobenk/api/company.php').then(res => {
        Linking.openURL('https://api.whatsapp.com/send?phone=' + res.data.tlp);
      });
    }
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
}
