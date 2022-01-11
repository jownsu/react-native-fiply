import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    BottomSheetModal as BSM,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet'

import Colors from '../../../utils/Colors'
import CustomBackdrop from '../CustomBackdrop'

export const BottomSheetModal = ({bottomSheetModalRef = null, children }) => {


    const snapPoints = useMemo(() => ['25%', '35%'], []);
    
    return (
        <BottomSheetModalProvider            >
            <View style={styles.container}>
                <BSM
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    backdropComponent={CustomBackdrop}
                >
                <View style={styles.contentContainer}>
                    {children}
                </View>
                </BSM>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    contentContainer:{
    }
})
