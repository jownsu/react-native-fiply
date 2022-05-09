import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { Dropdown } from './views/components/FiplyComponents'
import React, { useEffect, useState } from 'react'
import useJobTitle from './api/hooks/useJobTitle'

const TestScreen1 = () => {
    const { jobTitles, loading: jobTitleLoading, getJobTitles } = useJobTitle()

    useEffect(() => {
        getJobTitles()
    }, [])

    const [job, setJob] = useState('')
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <Dropdown
                    label={'Most recent job'}
                    value={job}
                    isLoading={jobTitleLoading}
                    onSubmit={(text) => setJob(text)}
                    data={jobTitles}
                    style={{ marginBottom: 5 }}
                />
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default TestScreen1

const styles = StyleSheet.create({})
