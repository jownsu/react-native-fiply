import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Switch } from 'react-native-paper'
import { Text } from '../FiplyComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';

const PostFilterDialog = ({visible = false, onDismiss = () => {}, }) => {

    const [activeSwitch, setActiveSwitch] = useState({
        post: false,
        sharedPost: false,
        bookmarkedPost: false,
        mostUpvoted: false,
    })

    const toggleSwitch = (action) => {
        setActiveSwitch({...activeSwitch, ...action})
    }
    
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={onDismiss} style={styles.backIcon} activeOpacity={0.7}>
                            <FontAwesome5 name="chevron-left" size={21} color={Colors.black}/>
                        </TouchableOpacity>
                        <Text weight='medium'>Post Filters</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={styles.actionContainer}>
                            <Text>Your Post</Text>
                            <Switch style={styles.swithStyle} value={activeSwitch.post} onValueChange={() => toggleSwitch({post: !activeSwitch.post})} color={Colors.primary}/>
                        </View>
                        <View style={styles.actionContainer}>
                            <Text>Shared Post</Text>
                            <Switch style={styles.swithStyle} value={activeSwitch.sharedPost} onValueChange={() => toggleSwitch({sharedPost: !activeSwitch.sharedPost})} color={Colors.primary}/>
                        </View>
                        <View style={styles.actionContainer}>
                            <Text>Bookmarked Post</Text>
                            <Switch style={styles.swithStyle} value={activeSwitch.bookmarkedPost} onValueChange={() => toggleSwitch({bookmarkedPost: !activeSwitch.bookmarkedPost})} color={Colors.primary}/>
                        </View>
                        <View style={styles.actionContainer}>
                            <Text>Most Upvoted</Text>
                            <Switch style={styles.swithStyle} value={activeSwitch.mostUpvoted} onValueChange={() => toggleSwitch({mostUpvoted: !activeSwitch.mostUpvoted})} color={Colors.primary}/>
                        </View>
                    </View>
                </Dialog>
            </Portal>
        </View>
        );
    };

const styles = StyleSheet.create({
    dialogContainer:{
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
    },
    headerContainer:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor:  Colors.light,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    bodyContainer:{
        paddingVertical: 10
    },
    backIcon:{
        position: 'absolute',
        left :0,
        alignSelf: 'center'
    },
    actionContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    swithStyle:{
        height: 40
    }
})

export default PostFilterDialog