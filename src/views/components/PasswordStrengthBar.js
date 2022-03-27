import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from './FiplyComponents'
const colors = {
    red: '#C00000',
    orange: '#FF7400',
    yellowOrange: '#FF9A00',
    yellow: '#F3D55B',
    green: '#28B446',
    grey: '#DEDEDE',
}
const PasswordStrengthBar = ({ password = '', startLength = 8 }) => {
    const [score, setScore] = useState(0)
    let statusColor = colors.green
    let barDescription = ''

    useEffect(() => {
        if (password.length >= startLength) {
            let currScore = 0

            if (password.match(/[a-z]+/g)) {
                currScore++
            }

            if (password.match(/[A-Z]+/g)) {
                currScore++
            }

            if (password.length >= 8) {
                currScore++
            }

            if (password.match(/\d+/g)) {
                currScore++
            }

            if (password.match(/(?=.*[@$!%*#?&])/g)) {
                currScore++
            }

            setScore(currScore)
        }
    }, [password])

    switch (score) {
        case 1:
            statusColor = colors.red
            barDescription = 'Poor'
            break
        case 2:
            statusColor = colors.orange
            barDescription = 'Weak'
            break
        case 3:
            statusColor = colors.yellowOrange
            barDescription = 'Fair'
            break
        case 4:
            statusColor = colors.yellow
            barDescription = 'Average'
            break
        case 5:
            statusColor = colors.green
            barDescription = 'Strong'
            break
        default:
            statusColor = colors.grey
            barDescription = ''
    }

    return (
        <View style={{ display: password.length >= startLength ? 'flex' : 'none' }}>
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.bar,
                        score >= 1
                            ? { backgroundColor: statusColor }
                            : { backgroundColor: colors.grey },
                    ]}
                ></View>
                <View
                    style={[
                        styles.bar,
                        score >= 2
                            ? { backgroundColor: statusColor }
                            : { backgroundColor: colors.grey },
                    ]}
                ></View>
                <View
                    style={[
                        styles.bar,
                        score >= 3
                            ? { backgroundColor: statusColor }
                            : { backgroundColor: colors.grey },
                    ]}
                ></View>
                <View
                    style={[
                        styles.bar,
                        score >= 4
                            ? { backgroundColor: statusColor }
                            : { backgroundColor: colors.grey },
                    ]}
                ></View>
                <View
                    style={[
                        styles.bar,
                        score >= 5
                            ? { backgroundColor: statusColor }
                            : { backgroundColor: colors.grey },
                    ]}
                ></View>
            </View>
            <Text
                weight="semi-bold"
                size={12}
                style={{ alignSelf: 'flex-end' }}
                color={statusColor}
            >
                {barDescription}
            </Text>
        </View>
    )
}

export default PasswordStrengthBar

const styles = StyleSheet.create({
    container: {},
    barContainer: {
        flexDirection: 'row',
    },
    bar: {
        flex: 1,
        height: 3,
        borderRadius: 5,
        marginHorizontal: 1.5,
    },
})
