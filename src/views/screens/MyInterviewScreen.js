import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Text, SafeAreaView, Container, FlatList } from '../components/FiplyComponents'
import Header from '../components/headers/Header'
import TopNavigation from '../components/headers/TopNavigation'
import Colors from '../../utils/Colors'
import SampleData from '../../utils/SampleData'
import { Ionicons } from '@expo/vector-icons';

const MyInterviewScreen = ({ navigation }) => {

    const [navIndex, setNavIndex] = useState(0)

    const renderInterviewList = (item) => (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeaderContainer}>
                <Text weight='semi-bold' color={Colors.primary} style={styles.txtTitle}>{item.title}</Text>
                <Text style={{ marginHorizontal: 10 }}>{'\u25CF'}</Text>
                <Text size={11}>{ item.type }</Text>
            </View>

            <View style={styles.cardBodyContainer}>
                <View style={styles.bodyHeadContainer}>
                    <View style={styles.imgContainer}>
                        <Image 
                            source={item.image}
                            style={styles.img}
                            resizeMode='contain'
                        />
                    </View>

                    <Text weight='medium' style={styles.txtCompany}>{item.company}</Text>
                </View>
                <View style={styles.bodyFootContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location-sharp" size={24} color={Colors.primary} style={{ marginRight: 5 }}/>
                        <Text size={11} >{item.location}</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text size={12} weight='semi-bold' color={Colors.primary}>Employer: </Text>
                            <Text size={12}>{item.employer}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text size={12} weight='semi-bold' color={Colors.primary}>When: </Text>
                            <Text size={12}>{item.when}</Text>
                        </View>
                    </View>

                </View>

            </View>

            <View style={styles.cardFooterContainer}>
                <TouchableOpacity activeOpacity={.7} style={{ ...styles.btnFooter, borderRightWidth: .5 }} >
                    <Text weight='medium' color={ Colors.primary}>
                        PROCEED
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.7} style={{ ...styles.btnFooter, borderLeftWidth: .5  }} >
                    <Text weight='medium' color={ Colors.black}>
                        CALL OFF
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const renderList = (id) => {
        switch (id) {
            case 0:
                return <FlatList 
                            data={SampleData.interviewPendingList} 
                            renderItem={item => renderInterviewList(item)}
                        />
            case 1:
                return <FlatList 
                            data={SampleData.interviewConfirmedList} 
                            renderItem={item => renderInterviewList(item)}    
                        />
            default:
                return <FlatList 
                            data={SampleData.interviewPendingList} 
                            renderItem={item => renderInterviewList(item)}
                        />
        }
    }

  return (
    <SafeAreaView flex statusBarColor={Colors.white} >
        <Header
            title='My Interviews'
            onBackPress={() => navigation.pop()}
            style={{ backgroundColor: Colors.white, marginBottom: 10 }}
        />
        <Container style={{ paddingHorizontal: 0 }}>
            <TopNavigation
                navTitles={['Pending', 'Confirmed']}
                onBtnPress={i => setNavIndex(i)}
            />

            { renderList(navIndex) }
        </Container>
    </SafeAreaView>
  );
};

export default MyInterviewScreen;

const styles = StyleSheet.create({    img:{
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
    justifyContent: 'space-between',
    marginBottom: 10
},
cardFooterContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: Colors.grey
},
btnFooter:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grey
},
});
