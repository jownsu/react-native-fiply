import React from 'react'
import { Text as XText } from 'react-native'

export const Text = ({children, style, weight = 'light', color, center, size, numberOfLines,adjustsFontSizeToFit}) => {
    let fontStyle = ''
    let fontColor = color ? { color: color } : {}
    let fontSize = size ? { fontSize: size } : {}
    let fontCenter = center ? { textAlign: 'center' } : {}

    switch (weight) { 
        case 'semi-bold':
            fontStyle = 'EncodeSansExpaded-SemiBold'
            break;
        case 'bold':
            fontStyle = 'EncodeSansExpaded-Bold'
            break;
        case 'light':
            fontStyle = 'EncodeSansExpaded-Light'
            break;
        case 'medium':
            fontStyle = 'EncodeSansExpaded-Medium'
            break;
        default:
            fontStyle = 'EncodeSansExpaded-Light'
    }


    return (
            <XText 
                style={{ ...style, fontFamily: fontStyle, ...fontColor, ...fontSize, ...fontCenter }}
                numberOfLines={numberOfLines}
                adjustsFontSizeToFit={adjustsFontSizeToFit} 
            >
                {children}
            </XText> 
    )
}

export default Text
