import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../content/header/Header';
import {useNavigation} from '@react-navigation/native';

const CategoryMenu = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header
        onBack={() => navigation.goBack(null)}
        title={'Category Menu'}
        shadow={true}
        right={false}
      />
    </View>
  );
};

export default CategoryMenu;

const styles = StyleSheet.create({});
