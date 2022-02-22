import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
    BottomSheetModal as BSM,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

import Colors from '../../../utils/Colors'

export const BottomSheetModal = ({
    bottomSheetModalRef = null,
    children,
    pointsSnap = ['25%'],
    appearsOnIndex = 0,
}) => {
    const snapPoints = useMemo(() => pointsSnap, [])

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={appearsOnIndex}
                disappearsOnIndex={-1}
            />
        ),
        []
    )

    return (
        <BottomSheetModalProvider>
            <View style={styles.container}>
                <BSM
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.contentContainer}>{children}</View>
                </BSM>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    container: {},
    contentContainer: {
        flex: 1,
    },
})
