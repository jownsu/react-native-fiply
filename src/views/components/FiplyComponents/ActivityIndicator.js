import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator as AI } from 'react-native-paper'
import Colors from '../../../utils/Colors'

export const ActivityIndicator = ({visible = false}) => {
  return (
      <AI
          animating={visible}
          size={32}
          color={Colors.secondary}
          style={styles.loadingStyle}
      />
  );
};

const styles = StyleSheet.create({
    loadingStyle: {
        marginVertical: 20,
    }
});
