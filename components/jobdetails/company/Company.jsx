import React from 'react'
import {Image, Text, View} from 'react-native'

import styles from './company.style'
import {checkImageURL} from "../../../utils";
import {icons} from "../../../constants";

const Company = ({
                     companyLogo,
                     jobTitle,
                     companyName,
                     location
                 }) => {
    return (
        <View
            style={styles.container}>
            <View
                style={styles.logoBox}>
                <Image
                    source={
                        {
                            uri: checkImageURL(companyLogo)
                                ? companyLogo
                                : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'
                        }
                    }
                    style={styles.logoImage}
                />
            </View>
            <View
                style={styles.jobTitleBox}>
                <Text
                    style={styles.jobTitle}>
                    {jobTitle}
                </Text>
            </View>

            <View
                style={styles.locationBox}>
                <Text
                    style={styles.companyName}>
                    {companyName} /
                </Text>
                <Image
                    style={styles.locationImage}
                    resizeMode="contain"
                    source={icons.location}/>
                <Text
                    style={styles.locationName}>
                    {location}
                </Text>
            </View>
        </View>
    )
}

export default Company