import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from './ProfileScreen'
import CommentScreen from '../../screens/CommentScreen'
import FollowScreen from './FollowScreen'
import EditProfileScreen from './EditProfileScreen'
import EditAboutScreen from './EditAboutScreen'
import EditJobPreferenceScreen from './EditJobPreferenceScreen'
import EditEducationalBackgroundScreen from './EditEducationalBackgroundScreen'
import EditExperienceScreen from './EditExperienceScreen'
import ChangePasswordScreen from './ChangePasswordScreen'
import ProfileInfoScreen from './ProfileInfoScreen'
import CreatePostScreen from '../../screens/CreatePostScreen'
import ResumeScreen from './ResumeScreen'
import { PostProvider } from '../../../api/context/posts/PostContext'
import { ProfileProvider } from '../../../api/context/profile/ProfileContext'
const Stack = createStackNavigator()

const ProfileStack = ({ route }) => {
    return (
        <PostProvider>
            <ProfileProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        initialParams={route.params}
                        options={{ headerShown: false }}
                        name={'ProfileScreen'}
                        component={ProfileScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'FollowScreen'}
                        component={FollowScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'ProfileInfoScreen'}
                        component={ProfileInfoScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'ResumeScreen'}
                        component={ResumeScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'EditProfileScreen'}
                        component={EditProfileScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'EditAboutScreen'}
                        component={EditAboutScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'EditJobPreferenceScreen'}
                        component={EditJobPreferenceScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'EditEducationalBackgroundScreen'}
                        component={EditEducationalBackgroundScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'EditExperienceScreen'}
                        component={EditExperienceScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'ChangePasswordScreen'}
                        component={ChangePasswordScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'CommentScreen'}
                        component={CommentScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name={'CreatePostScreen'}
                        component={CreatePostScreen}
                        initialParams={{ edit: false, data: {} }}
                    ></Stack.Screen>
                </Stack.Navigator>
            </ProfileProvider>
        </PostProvider>
    )
}

export default ProfileStack
