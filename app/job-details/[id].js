import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from "../../components";
import {COLORS, icons, SIZES} from "../../constants";
import useFetch from "../../hook/useFetch";
import {useRouter, useLocalSearchParams, Stack} from "expo-router";
import Icons from "../../constants/icons";
import {useState} from "react";

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetails = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const {data, isLoading, error, refetch} = useFetch('job-details',
        {
            job_id: params.id
        }
    )

    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const onRefresh = () => {
    };

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return <Specifics
                    title={"Qualifications"}
                    points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            case "About":
                return <JobAbout
                    info={data[0].job_description ?? ['No data provided']}
                />
            case "Responsibilities":
                return <Specifics
                    title={"Responsibilities"}
                    points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
            default:
                break;
        }
    }

    return (
        <SafeAreaView
            style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerBackVisible: false,
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={Icons.share}
                            dimension="60%">
                        </ScreenHeaderBtn>
                    ),
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={Icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}>
                        </ScreenHeaderBtn>
                    ),
                    headerTitle: ''
                }}/>
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    {
                        isLoading ?
                            (<ActivityIndicator
                                size={"large"}
                                color={COLORS.primary}
                            ></ActivityIndicator>)
                            : error ? (
                                <Text>Something went wrong</Text>
                            ) : data.length === 0 ? (
                                <Text>No data</Text>
                            ) : (
                                <View
                                    style={{
                                        padding: SIZES.medium,
                                        paddingBottom: 100
                                    }}>
                                    <Company
                                        companyLogo={data[0].employer_logo}
                                        jobTitle={data[0].job_title}
                                        companyName={data[0].employer_name}
                                        location={data[0].job_country}
                                    />
                                    <JobTabs
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />

                                    {displayTabContent()}
                                </View>
                            )
                    }
                </ScrollView>

                <JobFooter
                    url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
                />
            </>
        </SafeAreaView>
    );
}

export default JobDetails;