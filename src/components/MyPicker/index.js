import React from 'react';
import {StyleSheet, Text, View, Picker, Image} from 'react-native';
import {Icon, ListItem, Button} from 'react-native-elements';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {TextInput} from 'react-native-gesture-handler';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon type="ionicon" name="location" size={40} />
        </View>

        <View
          style={{
            flex: 1,

            borderBottomWidth: 1,
            marginHorizontal: 10,
          }}>
          <Picker selectedValue={value} onValueChange={onValueChange}>
            {data.map(item => {
              return <Picker.Item value={item.value} label={item.label} />;
            })}
          </Picker>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
