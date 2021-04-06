export const state = {
    quiz: {
        quiz: {
            page: 2,
            minPage: 1,
            maxPage: 4,
            checked: [],
            dataSource: [],
            didRequestReturnEmptyResult: false,
            familyPlanSelected: false,
            covers: '',
            isOpen: false,
            isMobileViewModalOpen: false,
            isOthersInputOpen: false,
            isFeaturesModalOpen: false,
            isFeaturePopUpOpen: false,
            isDesktopView: true,
            isSonCheckboxChecked: false,
            isDaughterCheckboxChecked: false,
            sonCount: 1,
            daughterCount: 1,
            tab_opened: 'highlights',
            responses: {
                budget: [
                    20000,
                    80000
                ],
                num_of_people: 1,
                type: 'single',
                firstName: '',
                lastName: '',
                email: '',
                state: '',
                provider: '',
                adult: 1,
                children: 0,
                infants: 0,
                gender: 'm',
                full_name: '',
                phone_num: '',
                individual_age: 19,
                father_age: 0,
                mother_age: 0,
                grand_father_age: 0,
                grand_mother_age: 0,
                father_in_law_age: 0,
                mother_in_law_age: 0,
                spouse_age: 0,
                child_1_age: 0,
                child_2_age: 0,
                child_3_age: 0,
                child_4_age: 0,
                child_5_age: 0,
                child_6_age: 0,
                child_7_age: 0,
                child_8_age: 0,
                plan_duration: '1',
                price_range: 'medium'
            }
        },
        compare: {
            fetching: false,
            plans: [],
            sort: {
                mode: 'desc',
                icon: 'sort-ascending',
                description: 'Sort by price (most expensive first)'
            },
            bestPlan: {},
            cheapestPlan: {},
            mostExpensivePlan: {}
        },
        details: {
            email: '',
            price: 0,
            notGettingProviders: true,
            buyingPlan: false
        },
        plans: [
            {
                duration: '1 year',
                individual_annual_price: 39660,
                individual_monthly_price: 3755,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Intensive Care Services',
                    'Investigations',
                    'Major Surgeries',
                    'Minor Surgeries'
                ],
                name: 'HyBasic',
                cover_region_id: {
                    name: 'Domestic',
                    id: 'domestic',
                    text: 'domestic'
                },
                hmo_id: {
                    id: 'lz9857oj',
                    website_address: 'https://www.hygeiahmo.com',
                    address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                    contact: '0700-494342-466',
                    name: {
                        name: 'Hygeia',
                        id: '1',
                        text: 'Hygeia'
                    },
                    logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                    provider_id: ''
                },
                inpatient_limit: 350000,
                outpatient_limit: 100000
            },
            {
                duration: '1 year',
                individual_annual_price: 133360,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Accommodation',
                    'Ante Natal Care ',
                    'Intensive Care Services',
                    'Minor Surgeries'
                ],
                name: 'HyPrime',
                cover_region_id: {
                    name: 'Domestic',
                    id: 'domestic',
                    text: 'domestic'
                },
                hmo_id: {
                    id: 'lz9857oj',
                    website_address: 'https://www.hygeiahmo.com',
                    address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                    contact: '0700-494342-466',
                    name: {
                        name: 'Hygeia',
                        id: '1',
                        text: 'Hygeia'
                    },
                    logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                    provider_id: ''
                },
                inpatient_limit: 500000,
                outpatient_limit: 200000
            },
            {
                duration: '',
                individual_annual_price: 66250,
                individual_monthly_price: 6000,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Accidents & Emergencies',
                    'Accommodation',
                    'Ante Natal Care ',
                    'Intensive Care Services',
                    'Intermediate Surgeries',
                    'Investigations',
                    'Major Surgeries',
                    'Maternity Services',
                    'Minor Surgeries',
                    'Post Natal Care '
                ],
                name: 'Alexandrite',
                total_benefit_limit: 1800000,
                hmo_id: {
                    id: 'rdon3m6j',
                    website_address: 'https://www.reliancehmo.com',
                    address: '18, Jimoh Oladehinde Street, Gbagada, Lagos, Nigeria',
                    contact: '0700-73542623',
                    name: {
                        id: 'Reliance ',
                        text: 'Reliance '
                    },
                    logo: 'https://cdn.formelo.com/20210318/10/1616065131401-reliance.png',
                    provider_id: '["54gene","ab_pharm","abbott_clinics","abelo_eye","abi_clinic","abuja_clinics","access_oral","acron_med","galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
                }
            },
            {
                duration: '',
                individual_annual_price: 38650,
                individual_monthly_price: 3500,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Accommodation',
                    'Ante Natal Care ',
                    'Investigations'
                ],
                name: 'Red Beryl',
                total_benefit_limit: 1200000,
                hmo_id: {
                    id: 'rdon3m6j',
                    website_address: 'https://www.reliancehmo.com',
                    address: '18, Jimoh Oladehinde Street, Gbagada, Lagos, Nigeria',
                    contact: '0700-73542623',
                    name: {
                        id: 'Reliance ',
                        text: 'Reliance '
                    },
                    logo: 'https://cdn.formelo.com/20210318/10/1616065131401-reliance.png',
                    provider_id: '["54gene","ab_pharm","abbott_clinics","abelo_eye","abi_clinic","abuja_clinics","access_oral","acron_med","galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
                }
            },
            {
                duration: '',
                individual_annual_price: 42000,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Accidents & Emergencies',
                    'Accommodation',
                    'Ante Natal Care ',
                    'Investigations',
                    'Maternity Services'
                ],
                name: 'Royal Plan',
                hmo_id: {
                    id: 'r5qygn9r',
                    website_address: 'https://www.princetonhmo.net',
                    address: '25, Mogaji Are Road, Opp Vitas Bakery Ring Road, Ibadan, Oyo State',
                    contact: '07004004000, 08151205555, 08185955555, 09060005674',
                    name: {
                        id: 'Princeton Health Limited',
                        text: 'Princeton Health Limited'
                    },
                    logo: 'https://cdn.formelo.com/20210312/06/1615530024624-princeon.png',
                    provider_id: '["3-J Dental Clinic Limited","abbott_clinics","adetula_optical","galbose_hospital","new_era"]'
                }
            },
            {
                duration: '',
                individual_annual_price: 25000,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Investigations',
                    'Minor Surgeries'
                ],
                name: 'Blue Plan',
                hmo_id: {
                    id: 'r5qygn9r',
                    website_address: 'https://www.princetonhmo.net',
                    address: '25, Mogaji Are Road, Opp Vitas Bakery Ring Road, Ibadan, Oyo State',
                    contact: '07004004000, 08151205555, 08185955555, 09060005674',
                    name: {
                        id: 'Princeton Health Limited',
                        text: 'Princeton Health Limited'
                    },
                    logo: 'https://cdn.formelo.com/20210312/06/1615530024624-princeon.png',
                    provider_id: '["3-J Dental Clinic Limited","abbott_clinics","adetula_optical","galbose_hospital","new_era"]'
                }
            },
            {
                duration: '',
                individual_annual_price: 42999,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Ante Natal Care ',
                    'Investigations'
                ],
                name: 'Life Plus',
                cover_region_id: {
                    name: 'Domestic',
                    id: 'domestic',
                    text: 'domestic'
                },
                hmo_id: {
                    id: 'rm2mq7dl',
                    website_address: 'https://www.avonhealthcare.com',
                    address: '29, Rumens Road, Off Bourdillon Road, Ikoyi Lagos, Nigeria',
                    contact: '0700-277-9800, 01-277-9800',
                    name: {
                        id: 'Avon ',
                        text: 'Avon '
                    },
                    logo: 'https://cdn.formelo.com/20210317/17/1616003760211-avon.png',
                    provider_id: '["abbott_clinics","abuja_clinics","access_oral","acron_med","adetula_optical"]'
                }
            },
            {
                duration: '',
                individual_annual_price: 19999,
                category_id: {
                    name: 'Personal',
                    id: 'personal',
                    text: 'personal'
                },
                service_id: [
                    'Accommodation',
                    'Investigations'
                ],
                name: 'Life Starter',
                cover_region_id: {
                    name: 'Domestic',
                    id: 'domestic',
                    text: 'domestic'
                },
                hmo_id: {
                    id: 'rm2mq7dl',
                    website_address: 'https://www.avonhealthcare.com',
                    address: '29, Rumens Road, Off Bourdillon Road, Ikoyi Lagos, Nigeria',
                    contact: '0700-277-9800, 01-277-9800',
                    name: {
                        id: 'Avon ',
                        text: 'Avon '
                    },
                    logo: 'https://cdn.formelo.com/20210317/17/1616003760211-avon.png',
                    provider_id: '["abbott_clinics","abuja_clinics","access_oral","acron_med","adetula_optical"]'
                }
            },
            {
                duration: '',
                individual_annual_price: 291400,
                category_id: {
                    name: 'Senior Citizens',
                    id: 'senior_citizens',
                    text: 'senior_citizens'
                },
                service_id: [
                    'Accidents & Emergencies',
                    'Accommodation',
                    'Intensive Care Services',
                    'Investigations',
                    'Minor Surgeries'
                ],
                name: 'Senior Midi',
                cover_region_id: {
                    name: 'Domestic',
                    id: 'domestic',
                    text: 'domestic'
                },
                hmo_id: {
                    id: 'lz9857oj',
                    website_address: 'https://www.hygeiahmo.com',
                    address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                    contact: '0700-494342-466',
                    name: {
                        name: 'Hygeia',
                        id: '1',
                        text: 'Hygeia'
                    },
                    logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                    provider_id: ''
                },
                inpatient_limit: 1600000,
                outpatient_limit: 700000
            },
            {
                duration: '',
                individual_annual_price: 621340,
                category_id: {
                    name: 'Senior Citizens',
                    id: 'senior_citizens',
                    text: 'senior_citizens'
                },
                service_id: [
                    'Intensive Care Services',
                    'Intermediate Surgeries',
                    'Major Surgeries',
                    'Minor Surgeries'
                ],
                name: 'Senior Premium',
                cover_region_id: {
                    name: 'Domestic',
                    id: 'domestic',
                    text: 'domestic'
                },
                hmo_id: {
                    id: 'lz9857oj',
                    website_address: 'https://www.hygeiahmo.com',
                    address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                    contact: '0700-494342-466',
                    name: {
                        name: 'Hygeia',
                        id: '1',
                        text: 'Hygeia'
                    },
                    logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                    provider_id: ''
                },
                inpatient_limit: 3350000,
                outpatient_limit: 1350000
            }
        ],
        recommended_plans: [],
        clicked_plan: [],
        hmos: [
            {
                id: 'lz9857oj',
                website_address: 'https://www.hygeiahmo.com',
                address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                contact: '0700-494342-466',
                name: {
                    name: 'Hygeia',
                    id: '1',
                    text: 'Hygeia'
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                provider_id: ''
            },
            {
                id: 'j8gkvmnl',
                website_address: 'https://www.totalhealthtrust.com',
                address: '2, Marconi Road, Palmgrove Estate, Lagos, Nigeria',
                contact: '+234 1448 2106, +234 812 241 3534, +234 812 242 2479',
                name: {
                    id: 'Total Health Trust ',
                    text: 'Total Health Trust '
                },
                logo: 'https://cdn.formelo.com/20210316/06/1615876081968-download.png',
                provider_id: '["3-J Dental Clinic Limited","ab_pharm","abaji_gen","abi_clinic","abuja_clinics"]'
            },
            {
                id: 'l318g53j',
                website_address: 'https://www.integratedhealthcareltd.com',
                address: 'No. 19, Jos Street, Area 3, Garki District, Abuja, Nigeria',
                contact: '+234 81 4612 0236, +234 90 2000 8294, +234 80 9723 6759',
                name: {
                    id: 'Integrated Healthcare Limited',
                    text: 'Integrated Healthcare Limited'
                },
                logo: 'https://cdn.formelo.com/20210312/06/1615530281957-integrated.jpg',
                provider_id: '["galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
            },
            {
                id: 'rm2mq7dl',
                website_address: 'https://www.avonhealthcare.com',
                address: '29, Rumens Road, Off Bourdillon Road, Ikoyi Lagos, Nigeria',
                contact: '0700-277-9800, 01-277-9800',
                name: {
                    id: 'Avon ',
                    text: 'Avon '
                },
                logo: 'https://cdn.formelo.com/20210317/17/1616003760211-avon.png',
                provider_id: '["abbott_clinics","abuja_clinics","access_oral","acron_med","adetula_optical"]'
            },
            {
                id: 'l1v1p36l',
                website_address: 'https://www.aiicomultishield.com',
                address: '322, Ikorodu Road, Anthony B/Stop, Anthony Village, Anthony, Lagos',
                contact: '+23401 2930823',
                name: {
                    id: 'AIICO Multi-Shield Nig. Ltd',
                    text: 'AIICO Multi-Shield Nig. Ltd'
                },
                logo: 'https://cdn.formelo.com/20210312/06/1615530082829-aiico.jpeg',
                provider_id: '["abelo_eye","abi_clinic","acron_med","living_word","1325 Pharmacy (CPN Nexus)"]'
            },
            {
                id: 'r5qygn9r',
                website_address: 'https://www.princetonhmo.net',
                address: '25, Mogaji Are Road, Opp Vitas Bakery Ring Road, Ibadan, Oyo State',
                contact: '07004004000, 08151205555, 08185955555, 09060005674',
                name: {
                    id: 'Princeton Health Limited',
                    text: 'Princeton Health Limited'
                },
                logo: 'https://cdn.formelo.com/20210312/06/1615530024624-princeon.png',
                provider_id: '["3-J Dental Clinic Limited","abbott_clinics","adetula_optical","galbose_hospital","new_era"]'
            },
            {
                id: 'rdon3m6j',
                website_address: 'https://www.reliancehmo.com',
                address: '18, Jimoh Oladehinde Street, Gbagada, Lagos, Nigeria',
                contact: '0700-73542623',
                name: {
                    id: 'Reliance ',
                    text: 'Reliance '
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616065131401-reliance.png',
                provider_id: '["54gene","ab_pharm","abbott_clinics","abelo_eye","abi_clinic","abuja_clinics","access_oral","acron_med","galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
            },
            {
                id: 'jx954qyj',
                website_address: 'https://www.swifthmo.com',
                address: 'FABAC Centre. 3 Ligali Ayorinde Avenue Victoria Island, Lagos',
                contact: '08079438466, 07080601050',
                name: {
                    id: 'Swift ',
                    text: 'Swift '
                },
                logo: 'https://cdn.formelo.com/20210312/06/1615529936719-swift.jpeg',
                provider_id: '["3-J Dental Clinic Limited","54gene","abbey_med","abi_clinic","access_oral"]'
            },
            {
                id: 'ly51gomj',
                website_address: 'https://www.novohealthafrica.org',
                address: 'Plot 10A Akiogun Road, Oniru Lekki, Lagos, Nigeria',
                contact: '09090404387, 07037602736, +23412900047',
                name: {
                    id: 'Novo Health Africa ',
                    text: 'Novo Health Africa '
                },
                logo: 'https://cdn.formelo.com/20210312/06/1615529895850-novo.png',
                provider_id: '["abike_memorial","acron_med","galbose_hospital","hammersmith_medical","st_vincents"]'
            },
            {
                id: 'j4q8q88r',
                website_address: '',
                address: '',
                contact: '',
                name: 'Hygeia HMO',
                provider_id: '',
                hmo_id: 'hyg101',
                plan_id: '',
                desc: ''
            },
            {
                id: 'rgvxvxkr',
                website_address: '',
                address: '',
                contact: '',
                name: 'Avon HMO',
                provider_id: '',
                hmo_id: 'avon101',
                plan_id: '',
                desc: ''
            },
            {
                id: 'jp317g5l',
                website_address: 'https://www.metrohealthhmo.com.ng',
                address: 'St. Nicholas House, 26 Catholic Mission Street, Lagos, Nigeria.',
                contact: '+234 01 460 6790, +234 0163 0038',
                name: {
                    name: 'Metrohealth',
                    id: '10',
                    text: '10'
                },
                logo: 'https://cdn.formelo.com/20210316/14/1615903842187-metrohealth-hmo-limited.jpg',
                provider_id: '["3-J Dental Clinic Limited","1325 Pharmacy (CPN Nexus)"]'
            }
        ],
        services: [],
        providers: [],
        fetching_plans: false,
        fetching_hmos: false,
        fetching_services: false,
        fetching_providers: false,
        fetching_recommended_plans: false,
        compare_plans_mobile_indexes: [],
        compare_plans_desktop_indexes: [],
        checked_plans_list: [],
        cheapest_plan_by_hmo: null,
        cheapest_plan: 19999,
        provider_plans: [],
        filter_plans_by_hmo: false,
        selected_providers: []
    },
    details: {
        quiz: {
            page: 2,
            minPage: 1,
            maxPage: 4,
            checked: [],
            dataSource: [],
            didRequestReturnEmptyResult: false,
            familyPlanSelected: false,
            covers: '',
            isOpen: false,
            isMobileViewModalOpen: false,
            isOthersInputOpen: false,
            isFeaturesModalOpen: false,
            isFeaturePopUpOpen: false,
            isDesktopView: true,
            isSonCheckboxChecked: false,
            isDaughterCheckboxChecked: false,
            sonCount: 1,
            daughterCount: 1,
            tab_opened: 'highlights',
            responses: {
                budget: [
                    20000,
                    80000
                ],
                num_of_people: 1,
                type: 'single',
                firstName: '',
                lastName: '',
                email: '',
                state: '',
                provider: '',
                adult: 1,
                children: 0,
                infants: 0,
                gender: 'm',
                full_name: '',
                phone_num: '',
                individual_age: 19,
                father_age: 0,
                mother_age: 0,
                grand_father_age: 0,
                grand_mother_age: 0,
                father_in_law_age: 0,
                mother_in_law_age: 0,
                spouse_age: 0,
                child_1_age: 0,
                child_2_age: 0,
                child_3_age: 0,
                child_4_age: 0,
                child_5_age: 0,
                child_6_age: 0,
                child_7_age: 0,
                child_8_age: 0,
                plan_duration: '1',
                price_range: 'medium'
            }
        },
        compare: {
            fetching: false,
            plans: [],
            sort: {
                mode: 'desc',
                icon: 'sort-ascending',
                description: 'Sort by price (most expensive first)'
            },
            bestPlan: {},
            cheapestPlan: {},
            mostExpensivePlan: {}
        },
        details: {
            email: '',
            price: 0,
            notGettingProviders: true,
            buyingPlan: false
        },
        plans: [],
        recommended_plans: [],
        clicked_plan: [],
        hmos: [],
        services: [],
        providers: [],
        fetching_plans: false,
        fetching_hmos: false,
        fetching_services: false,
        fetching_providers: false,
        fetching_recommended_plans: false,
        compare_plans_mobile_indexes: [],
        compare_plans_desktop_indexes: [],
        checked_plans_list: [],
        cheapest_plan_by_hmo: 0,
        cheapest_plan: 0,
        provider_plans: [],
        filter_plans_by_hmo: false,
        provider_info: [],
        selected_providers: []
    },

    plans: [
        {
            duration: '1 year',
            individual_annual_price: 39660,
            individual_monthly_price: 3755,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Intensive Care Services',
                'Investigations',
                'Major Surgeries',
                'Minor Surgeries'
            ],
            name: 'HyBasic',
            cover_region_id: {
                name: 'Domestic',
                id: 'domestic',
                text: 'domestic'
            },
            hmo_id: {
                id: 'lz9857oj',
                website_address: 'https://www.hygeiahmo.com',
                address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                contact: '0700-494342-466',
                name: {
                    name: 'Hygeia',
                    id: '1',
                    text: 'Hygeia'
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                provider_id: ''
            },
            inpatient_limit: 350000,
            outpatient_limit: 100000
        },
        {
            duration: '1 year',
            individual_annual_price: 133360,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Accommodation',
                'Ante Natal Care ',
                'Intensive Care Services',
                'Minor Surgeries'
            ],
            name: 'HyPrime',
            cover_region_id: {
                name: 'Domestic',
                id: 'domestic',
                text: 'domestic'
            },
            hmo_id: {
                id: 'lz9857oj',
                website_address: 'https://www.hygeiahmo.com',
                address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                contact: '0700-494342-466',
                name: {
                    name: 'Hygeia',
                    id: '1',
                    text: 'Hygeia'
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                provider_id: ''
            },
            inpatient_limit: 500000,
            outpatient_limit: 200000
        },
        {
            duration: '',
            individual_annual_price: 66250,
            individual_monthly_price: 6000,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Accidents & Emergencies',
                'Accommodation',
                'Ante Natal Care ',
                'Intensive Care Services',
                'Intermediate Surgeries',
                'Investigations',
                'Major Surgeries',
                'Maternity Services',
                'Minor Surgeries',
                'Post Natal Care '
            ],
            name: 'Alexandrite',
            total_benefit_limit: 1800000,
            hmo_id: {
                id: 'rdon3m6j',
                website_address: 'https://www.reliancehmo.com',
                address: '18, Jimoh Oladehinde Street, Gbagada, Lagos, Nigeria',
                contact: '0700-73542623',
                name: {
                    id: 'Reliance ',
                    text: 'Reliance '
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616065131401-reliance.png',
                provider_id: '["54gene","ab_pharm","abbott_clinics","abelo_eye","abi_clinic","abuja_clinics","access_oral","acron_med","galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
            }
        },
        {
            duration: '',
            individual_annual_price: 38650,
            individual_monthly_price: 3500,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Accommodation',
                'Ante Natal Care ',
                'Investigations'
            ],
            name: 'Red Beryl',
            total_benefit_limit: 1200000,
            hmo_id: {
                id: 'rdon3m6j',
                website_address: 'https://www.reliancehmo.com',
                address: '18, Jimoh Oladehinde Street, Gbagada, Lagos, Nigeria',
                contact: '0700-73542623',
                name: {
                    id: 'Reliance ',
                    text: 'Reliance '
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616065131401-reliance.png',
                provider_id: '["54gene","ab_pharm","abbott_clinics","abelo_eye","abi_clinic","abuja_clinics","access_oral","acron_med","galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
            }
        },
        {
            duration: '',
            individual_annual_price: 42000,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Accidents & Emergencies',
                'Accommodation',
                'Ante Natal Care ',
                'Investigations',
                'Maternity Services'
            ],
            name: 'Royal Plan',
            hmo_id: {
                id: 'r5qygn9r',
                website_address: 'https://www.princetonhmo.net',
                address: '25, Mogaji Are Road, Opp Vitas Bakery Ring Road, Ibadan, Oyo State',
                contact: '07004004000, 08151205555, 08185955555, 09060005674',
                name: {
                    id: 'Princeton Health Limited',
                    text: 'Princeton Health Limited'
                },
                logo: 'https://cdn.formelo.com/20210312/06/1615530024624-princeon.png',
                provider_id: '["3-J Dental Clinic Limited","abbott_clinics","adetula_optical","galbose_hospital","new_era"]'
            }
        },
        {
            duration: '',
            individual_annual_price: 25000,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Investigations',
                'Minor Surgeries'
            ],
            name: 'Blue Plan',
            hmo_id: {
                id: 'r5qygn9r',
                website_address: 'https://www.princetonhmo.net',
                address: '25, Mogaji Are Road, Opp Vitas Bakery Ring Road, Ibadan, Oyo State',
                contact: '07004004000, 08151205555, 08185955555, 09060005674',
                name: {
                    id: 'Princeton Health Limited',
                    text: 'Princeton Health Limited'
                },
                logo: 'https://cdn.formelo.com/20210312/06/1615530024624-princeon.png',
                provider_id: '["3-J Dental Clinic Limited","abbott_clinics","adetula_optical","galbose_hospital","new_era"]'
            }
        },
        {
            duration: '',
            individual_annual_price: 42999,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Ante Natal Care ',
                'Investigations'
            ],
            name: 'Life Plus',
            cover_region_id: {
                name: 'Domestic',
                id: 'domestic',
                text: 'domestic'
            },
            hmo_id: {
                id: 'rm2mq7dl',
                website_address: 'https://www.avonhealthcare.com',
                address: '29, Rumens Road, Off Bourdillon Road, Ikoyi Lagos, Nigeria',
                contact: '0700-277-9800, 01-277-9800',
                name: {
                    id: 'Avon ',
                    text: 'Avon '
                },
                logo: 'https://cdn.formelo.com/20210317/17/1616003760211-avon.png',
                provider_id: '["abbott_clinics","abuja_clinics","access_oral","acron_med","adetula_optical"]'
            }
        },
        {
            duration: '',
            individual_annual_price: 19999,
            category_id: {
                name: 'Personal',
                id: 'personal',
                text: 'personal'
            },
            service_id: [
                'Accommodation',
                'Investigations'
            ],
            name: 'Life Starter',
            cover_region_id: {
                name: 'Domestic',
                id: 'domestic',
                text: 'domestic'
            },
            hmo_id: {
                id: 'rm2mq7dl',
                website_address: 'https://www.avonhealthcare.com',
                address: '29, Rumens Road, Off Bourdillon Road, Ikoyi Lagos, Nigeria',
                contact: '0700-277-9800, 01-277-9800',
                name: {
                    id: 'Avon ',
                    text: 'Avon '
                },
                logo: 'https://cdn.formelo.com/20210317/17/1616003760211-avon.png',
                provider_id: '["abbott_clinics","abuja_clinics","access_oral","acron_med","adetula_optical"]'
            }
        },
        {
            duration: '',
            individual_annual_price: 291400,
            category_id: {
                name: 'Senior Citizens',
                id: 'senior_citizens',
                text: 'senior_citizens'
            },
            service_id: [
                'Accidents & Emergencies',
                'Accommodation',
                'Intensive Care Services',
                'Investigations',
                'Minor Surgeries'
            ],
            name: 'Senior Midi',
            cover_region_id: {
                name: 'Domestic',
                id: 'domestic',
                text: 'domestic'
            },
            hmo_id: {
                id: 'lz9857oj',
                website_address: 'https://www.hygeiahmo.com',
                address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                contact: '0700-494342-466',
                name: {
                    name: 'Hygeia',
                    id: '1',
                    text: 'Hygeia'
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                provider_id: ''
            },
            inpatient_limit: 1600000,
            outpatient_limit: 700000
        },
        {
            duration: '',
            individual_annual_price: 621340,
            category_id: {
                name: 'Senior Citizens',
                id: 'senior_citizens',
                text: 'senior_citizens'
            },
            service_id: [
                'Intensive Care Services',
                'Intermediate Surgeries',
                'Major Surgeries',
                'Minor Surgeries'
            ],
            name: 'Senior Premium',
            cover_region_id: {
                name: 'Domestic',
                id: 'domestic',
                text: 'domestic'
            },
            hmo_id: {
                id: 'lz9857oj',
                website_address: 'https://www.hygeiahmo.com',
                address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
                contact: '0700-494342-466',
                name: {
                    name: 'Hygeia',
                    id: '1',
                    text: 'Hygeia'
                },
                logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
                provider_id: ''
            },
            inpatient_limit: 3350000,
            outpatient_limit: 1350000
        }
    ],

    hmos: [
        {
            id: 'lz9857oj',
            website_address: 'https://www.hygeiahmo.com',
            address: '214, Broad Street, Elephant House, Floors 6-8, Lagos Island',
            contact: '0700-494342-466',
            name: {
                name: 'Hygeia',
                id: '1',
                text: 'Hygeia'
            },
            logo: 'https://cdn.formelo.com/20210318/10/1616063657278-hygeia-favicon.png',
            provider_id: ''
        },
        {
            id: 'j8gkvmnl',
            website_address: 'https://www.totalhealthtrust.com',
            address: '2, Marconi Road, Palmgrove Estate, Lagos, Nigeria',
            contact: '+234 1448 2106, +234 812 241 3534, +234 812 242 2479',
            name: {
                id: 'Total Health Trust ',
                text: 'Total Health Trust '
            },
            logo: 'https://cdn.formelo.com/20210316/06/1615876081968-download.png',
            provider_id: '["3-J Dental Clinic Limited","ab_pharm","abaji_gen","abi_clinic","abuja_clinics"]'
        },
        {
            id: 'l318g53j',
            website_address: 'https://www.integratedhealthcareltd.com',
            address: 'No. 19, Jos Street, Area 3, Garki District, Abuja, Nigeria',
            contact: '+234 81 4612 0236, +234 90 2000 8294, +234 80 9723 6759',
            name: {
                id: 'Integrated Healthcare Limited',
                text: 'Integrated Healthcare Limited'
            },
            logo: 'https://cdn.formelo.com/20210312/06/1615530281957-integrated.jpg',
            provider_id: '["galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
        },
        {
            id: 'rm2mq7dl',
            website_address: 'https://www.avonhealthcare.com',
            address: '29, Rumens Road, Off Bourdillon Road, Ikoyi Lagos, Nigeria',
            contact: '0700-277-9800, 01-277-9800',
            name: {
                id: 'Avon ',
                text: 'Avon '
            },
            logo: 'https://cdn.formelo.com/20210317/17/1616003760211-avon.png',
            provider_id: '["abbott_clinics","abuja_clinics","access_oral","acron_med","adetula_optical"]'
        },
        {
            id: 'l1v1p36l',
            website_address: 'https://www.aiicomultishield.com',
            address: '322, Ikorodu Road, Anthony B/Stop, Anthony Village, Anthony, Lagos',
            contact: '+23401 2930823',
            name: {
                id: 'AIICO Multi-Shield Nig. Ltd',
                text: 'AIICO Multi-Shield Nig. Ltd'
            },
            logo: 'https://cdn.formelo.com/20210312/06/1615530082829-aiico.jpeg',
            provider_id: '["abelo_eye","abi_clinic","acron_med","living_word","1325 Pharmacy (CPN Nexus)"]'
        },
        {
            id: 'r5qygn9r',
            website_address: 'https://www.princetonhmo.net',
            address: '25, Mogaji Are Road, Opp Vitas Bakery Ring Road, Ibadan, Oyo State',
            contact: '07004004000, 08151205555, 08185955555, 09060005674',
            name: {
                id: 'Princeton Health Limited',
                text: 'Princeton Health Limited'
            },
            logo: 'https://cdn.formelo.com/20210312/06/1615530024624-princeon.png',
            provider_id: '["3-J Dental Clinic Limited","abbott_clinics","adetula_optical","galbose_hospital","new_era"]'
        },
        {
            id: 'rdon3m6j',
            website_address: 'https://www.reliancehmo.com',
            address: '18, Jimoh Oladehinde Street, Gbagada, Lagos, Nigeria',
            contact: '0700-73542623',
            name: {
                id: 'Reliance ',
                text: 'Reliance '
            },
            logo: 'https://cdn.formelo.com/20210318/10/1616065131401-reliance.png',
            provider_id: '["54gene","ab_pharm","abbott_clinics","abelo_eye","abi_clinic","abuja_clinics","access_oral","acron_med","galbose_hospital","hammersmith_medical","living_word","new_era","st_vincents"]'
        },
        {
            id: 'jx954qyj',
            website_address: 'https://www.swifthmo.com',
            address: 'FABAC Centre. 3 Ligali Ayorinde Avenue Victoria Island, Lagos',
            contact: '08079438466, 07080601050',
            name: {
                id: 'Swift ',
                text: 'Swift '
            },
            logo: 'https://cdn.formelo.com/20210312/06/1615529936719-swift.jpeg',
            provider_id: '["3-J Dental Clinic Limited","54gene","abbey_med","abi_clinic","access_oral"]'
        },
        {
            id: 'ly51gomj',
            website_address: 'https://www.novohealthafrica.org',
            address: 'Plot 10A Akiogun Road, Oniru Lekki, Lagos, Nigeria',
            contact: '09090404387, 07037602736, +23412900047',
            name: {
                id: 'Novo Health Africa ',
                text: 'Novo Health Africa '
            },
            logo: 'https://cdn.formelo.com/20210312/06/1615529895850-novo.png',
            provider_id: '["abike_memorial","acron_med","galbose_hospital","hammersmith_medical","st_vincents"]'
        },
        {
            id: 'j4q8q88r',
            website_address: '',
            address: '',
            contact: '',
            name: 'Hygeia HMO',
            provider_id: '',
            hmo_id: 'hyg101',
            plan_id: '',
            desc: ''
        },
        {
            id: 'rgvxvxkr',
            website_address: '',
            address: '',
            contact: '',
            name: 'Avon HMO',
            provider_id: '',
            hmo_id: 'avon101',
            plan_id: '',
            desc: ''
        },
        {
            id: 'jp317g5l',
            website_address: 'https://www.metrohealthhmo.com.ng',
            address: 'St. Nicholas House, 26 Catholic Mission Street, Lagos, Nigeria.',
            contact: '+234 01 460 6790, +234 0163 0038',
            name: {
                name: 'Metrohealth',
                id: '10',
                text: '10'
            },
            logo: 'https://cdn.formelo.com/20210316/14/1615903842187-metrohealth-hmo-limited.jpg',
            provider_id: '["3-J Dental Clinic Limited","1325 Pharmacy (CPN Nexus)"]'
        }
    ]
}