import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView, Container, Text, FlatList } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import Colors from '../../../utils/Colors'
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'
import SampleData from '../../../utils/SampleData'

const JobsScreen = ({navigation}) => {

    const [navIndex, setNavIndex] = useState(0)

    const renderJobList = (item, isPending = false) => (
        <View style={jobListTyle.cardContainer}>
            <View style={jobListTyle.cardHeaderContainer}>
                <Text weight='semi-bold' color={Colors.primary} style={jobListTyle.txtTitle}>{item.title}</Text>
                <Text style={{ marginHorizontal: 10 }}>{'\u25CF'}</Text>
                <Text size={11}>{ item.type }</Text>
            </View>

            <View style={jobListTyle.cardBodyContainer}>
                <View style={jobListTyle.bodyHeadContainer}>
                    <View style={jobListTyle.imgContainer}>
                        <Image 
                            source={item.image}
                            style={jobListTyle.img}
                            resizeMode='contain'
                        />
                    </View>

                    <Text weight='medium' style={jobListTyle.txtCompany}>{item.company}</Text>
                </View>

                { !isPending ? renderJobListBodyFoot(item) : renderPendingBodyFoot(item)}

                { !isPending ? renderJobListFooter(item) : renderPendingFooter(item) }

            </View>

        </View>
    )

    const renderJobListBodyFoot = (item) => (
        <View style={jobListTyle.bodyFootContainer}>
            <Ionicons name="location-sharp" size={24} color={Colors.primary} style={{ marginRight: 10 }}/>
            <Text size={11} >{item.location}</Text>
        </View>
    )

    const renderJobListFooter = (item) => (
        <View style={jobListTyle.cardFooterContainer}>
            <TouchableOpacity activeOpacity={.7} style={{ ...jobListTyle.footerBtn, borderRightWidth: .5}}>
                <FontAwesome name="bookmark" size={24} color={ item.isSave ? Colors.black : Colors.primary} style={{ marginRight: 15 }}/>
                <Text weight='medium' color={ item.isSave ? Colors.black : Colors.primary}>
                    {item.isSave ? 'REMOVE' : 'SAVE' }                                        
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.7} style={{ ...jobListTyle.footerBtn,  borderLeftWidth: .5}}>
                <Text weight='medium' color={ item.isApply ? Colors.black : Colors.primary}>
                    {item.isApply ? 'APPLIED' : 'APPLY' }
                </Text>
            </TouchableOpacity>
        </View>
    )

    const renderPendingBodyFoot = (item) => (
        <View style={{ ...jobListTyle.bodyFootContainer, justifyContent: 'space-between'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="location-sharp" size={24} color={Colors.primary} style={{ marginRight: 5 }}/>
                <Text size={11} >{item.location}</Text>
            </View>
            <View>
                {
                    item.status 
                        ? 
                        <View style={{ flexDirection: 'row' }}>
                            <Text size={12} weight='semi-bold' color={Colors.primary}>Status: </Text>
                            <Text size={12}>{item.status}</Text>
                        </View>
                        : null
                }
                {
                    item.when 
                        ? 
                        <View style={{ flexDirection: 'row' }}>
                            <Text size={12} weight='semi-bold' color={Colors.primary}>When: </Text>
                            <Text size={12}>{item.when}</Text>
                        </View>
                        : null
                }
            </View>
        </View>
    )

    const renderPendingFooter = (item) => (
        <View style={jobListTyle.cardFooterContainer}>
            <TouchableOpacity activeOpacity={.7} style={{ ...jobListTyle.footerBtn, borderRightWidth: .5}} onPress={() => navigation.navigate('InitialInterviewScreen', {questions: item.questions})}>
                <Text weight='medium' color={ Colors.primary }>
                    PROCEED                                       
                </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.7} style={{ ...jobListTyle.footerBtn, borderLeftWidth: .5}}>
                <Text weight='medium' color={ Colors.black }>
                    CANCEL
                </Text>
            </TouchableOpacity>
        </View>
    )

    const renderList = (id) => {
        switch (id) {
            case 0:
                return <FlatList 
                            data={SampleData.jobDiscoverList}
                            renderItem={item => renderJobList(item)} 
                        />
            case 1: 
                return <FlatList 
                            data={SampleData.jobSavedList}
                            renderItem={item => renderJobList(item)} 
                        />
            case 2: 
                return <FlatList 
                            data={SampleData.jobAppliedList}
                            renderItem={item => renderJobList(item)} 
                        />
            case 3:
                return (
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.myInterviewContainer} activeOpacity={.7} onPress={() => navigation.navigate('MyInterviewScreen')}>
                            <FontAwesome5 name="calendar-alt" size={32} color={Colors.primary} style={{ marginRight: 10 }} />
                            <View style={styles.interviewDetailsContainer}>
                                <Text weight='medium' color={Colors.primary}>My Interviews</Text>
                                <Text size={9}>0 Pending, 0 Confirmed</Text>
                            </View>
                            <FontAwesome name="angle-right" size={38} color={Colors.light} />
                        </TouchableOpacity>

                        <FlatList 
                            data={SampleData.jobPendingList}
                            renderItem={item => renderJobList(item, true)} 
                        />
                        
                        {/* <PendingList 
                            data={SampleData.jobPendingList} 
                            onProceedPress={(questions) => navigation.navigate('InitialInterviewScreen', {questions})}
                        /> */}
                    </View>
                )
            default:
                return <FlatList 
                            data={SampleData.jobDiscoverList}
                            renderItem={item => renderJobList(item)} 
                        />
        }
    }

    return (
        <SafeAreaView flex>
            <SearchHeader
                rightIcon={ () => 
                    <TouchableOpacity onPress={() => navigation.navigate('MessageStack')} activeOpacity={.5}>
                        <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />
                    </TouchableOpacity>
                }
            /> 

            <Container style={{ paddingHorizontal: 0 }}>
                <TitleFilter 
                    title='JOBS'
                    titleColor={Colors.primary}
                    hideLine
                />

                <TopNavigation
                    navTitles={['Discover', 'Saved', 'Applied', 'Pending']}
                    onBtnPress={i => setNavIndex(i)}
                />

                { renderList(navIndex) }

            </Container>



        </SafeAreaView>
    )
}

export default JobsScreen

const styles = StyleSheet.create({
    myInterviewContainer:{
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        marginLeft: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.light,
        width: 200,
        elevation: 3
    },
    interviewDetailsContainer:{
        marginRight: 10
    },
})

const jobListTyle = StyleSheet.create({
    img:{
        height: 75,
        width: 75,
        borderRadius: 100,
        backgroundColor: Colors.white,
        borderWidth: 1 
    },
    imgContainer:{
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 15
    },
    cardContainer:{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 15,
        backgroundColor: Colors.white,
        marginBottom: 10,
        elevation: 5
    },
    cardHeaderContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtTitle:{
        textTransform: 'uppercase'
    },
    bodyHeadContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    txtCompany:{
        textTransform: 'uppercase'
    },
    bodyFootContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    cardFooterContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: Colors.grey
    },
    footerBtn:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.grey
    },
})


