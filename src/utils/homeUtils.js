export const CAN_LOG = false;

export function stripNonNumeric(x) {
    x = x !== undefined ? x.toString() : "";
    var n = parseFloat(
        (x.charAt(0) == "-" ? "-" : "") + x.replace(/[^0-9]+/g, "")
    );
    return isNaN(n) ? 0 : n;
}

export const steps = [
    {
        h3: "No medicals required",
        p: "Compare HMO plans in Nigeria from the comfort of your home",
    },
    {
        h3: "Like to get HMO plans for",
        p: "Tell us who you would",
    },
    {
        h3: "Select your city",
        p: "Just one last detail",
    },
];

export const mobile_steps = [
    {
        h3: "",
        p: "",
    },
    {
        h3: "No medicals required",
        p: "Compare HMO plans in Nigeria from the comfort of your home",
    },
    {
        h3: "Like to get HMO plans for",
        p: "Tell us who you would",
    },
    {
        h3: "Select your city",
        p: "Just one last detail",
    },
];

export const providers = [
    "Living Spring Hospital & Maternity Home",
    "Westcare Hospital",
    // {
    //     name: "",
    //     id: ""
    // },
    // {
    //     name: "Westcare Hospital",
    //     id: "wch"
    // }
]

export const providersInfo = [{
    id: "lshmh",
    name: "Living Spring Hospital & Maternity Home",
    address: "Alafia Avenue Street",
    specialty: "Nurse Practioner · Family",
    city: "Ejigbo",
    state: "Lagos"
},
{
    id: "wch",
    name: "Westcare Hospital",
    address: "Ejibo Last Bustop",
    specialty: "Nurse Practioner · Family",
    city: "Ejigbo",
    state: "Lagos"
}
]

export const prescriptions = [
    "Coartem",
    "Gascol"
]

export const prescriptionsInfo = [
    {
        name: "Coartem",
        mg: "Coartem 80/480mg"
    },

    {
        name: "Gascol",
        mg: "Gascol Antacid Suspension 150ml"
    }
]

export const locations = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Enugu",
    "Edo",
    "Ekiti",
    /* "Federal Capital Territory",*/
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    /* "Lagos",*/
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    /* "Oyo",*/
    "Plateau",
    /*"Rivers",*/
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
];

export const hmos = [
    {
        id: "HYG00001",
        name: "Hygeia",
        title: "Hygeia HMO",
    },

    {
        name: "Metrohealth",
        id: "MET00001",
        title: "Metrohealth HMO",
    },

    {
        name: "Novo Health Africa",
        id: "NOV00001",
        title: "Novo Health Africa HMO",
    },

    {
        name: "Swift",
        id: "SWI00001",
        title: "Swift HMO",
    },

    {
        name: "Reliance",
        id: "REL00001",
        title: "Reliance HMO",
    },

    {
        name: "Princeton Health Limited",
        id: "PRI00001",
        title: "Princeton Health Limited HMO",
    },

    {
        name: "AIICO Multi-Shield Nig Ltd",
        id: "AMS00001",
        title: "AIICO Multi-Shield Nig Ltd HMO",
    },

    {
        name: "Integrated Healthcare Limited",
        id: "IHC00001",
        title: "Integrated Healthcare Limited HMO",
    },

    {
        name: "Total Health Trust",
        id: "THT00001",
        title: "Total Health Trust HMO",
    },

    {
        name: "Avon ",
        id: "AVON00001",
        title: "Avon HMO",
    },

    {
        id: "AXA00001",
        name: "AXA Mansard Health",
        title: "AXA Mansard Health HMO",
    },

    {
        id: "PRO00001",
        name: "Pro-Health",
        title: "Pro Health HMO"
    }
];

export const options = [
    { value: 0, label: "Select Age" },
    { value: 18, label: "18 Years" },
    { value: 19, label: "19 Years" },
    { value: 20, label: "20 Years" },
    { value: 21, label: "21 Years" },
    { value: 22, label: "22 Years" },
    { value: 23, label: "23 Years" },
    { value: 24, label: "24 Years" },
    { value: 25, label: "25 Years" },
    { value: 26, label: "26 Years" },
    { value: 27, label: "27 Years" },
    { value: 28, label: "28 Years" },
    { value: 29, label: "29 Years" },
    { value: 30, label: "30 Years" },
    { value: 31, label: "31 Years" },
    { value: 32, label: "32 Years" },
    { value: 33, label: "33 Years" },
    { value: 34, label: "34 Years" },
    { value: 35, label: "35 Years" },
    { value: 36, label: "36 Years" },
    { value: 37, label: "37 Years" },
    { value: 38, label: "38 Years" },
    { value: 39, label: "39 Years" },
    { value: 40, label: "40 Years" },
    { value: 41, label: "41 Years" },
    { value: 42, label: "42 Years" },
    { value: 43, label: "43 Years" },
    { value: 44, label: "44 Years" },
    { value: 45, label: "45 Years" },
    { value: 46, label: "46 Years" },
    { value: 47, label: "47 Years" },
    { value: 48, label: "48 Years" },
    { value: 49, label: "49 Years" },
    { value: 50, label: "50 Years" },
    { value: 51, label: "51 Years" },
    { value: 52, label: "52 Years" },
    { value: 53, label: "53 Years" },
    { value: 54, label: "54 Years" },
    { value: 55, label: "55 Years" },
    { value: 56, label: "56 Years" },
    { value: 57, label: "57 Years" },
    { value: 58, label: "58 Years" },
    { value: 59, label: "59 Years" },
    { value: 60, label: "60 Years" },
    { value: 61, label: "61 Years" },
    { value: 62, label: "62 Years" },
    { value: 63, label: "63 Years" },
    { value: 64, label: "64 Years" },
    { value: 65, label: "65 Years" },
    { value: 66, label: "66 Years" },
    { value: 67, label: "67 Years" },
    { value: 68, label: "68 Years" },
    { value: 69, label: "69 Years" },
    { value: 70, label: "70 Years" },
    { value: 71, label: "71 Years" },
    { value: 72, label: "72 Years" },
    { value: 73, label: "73 Years" },
    { value: 74, label: "74 Years" },
    { value: 75, label: "75 Years" },
    { value: 76, label: "76 Years" },
    { value: 77, label: "77 Years" },
    { value: 78, label: "78 Years" },
    { value: 79, label: "79 Years" },
    { value: 80, label: "80 Years" },
    { value: 81, label: "81 Years" },
    { value: 82, label: "82 Years" },
    { value: 83, label: "83 Years" },
    { value: 84, label: "84 Years" },
    { value: 85, label: "85 Years" },
    { value: 86, label: "86 Years" },
    { value: 87, label: "87 Years" },
    { value: 88, label: "88 Years" },
    { value: 89, label: "89 Years" },
    { value: 90, label: "90 Years" },
    { value: 91, label: "91 Years" },
    { value: 92, label: "92 Years" },
    { value: 93, label: "93 Years" },
    { value: 94, label: "94 Years" },
    { value: 95, label: "95 Years" },
    { value: 96, label: "96 Years" },
    { value: 97, label: "97 Years" },
    { value: 98, label: "98 Years" },
    { value: 99, label: "99 Years" },
    { value: 100, label: "100 Years" },
];

export const hmoKeysMapping = {
    "1": "lz9857oj", //Hygeia
    "2": "rm2mq7dl", //Avon
    "3": "j8gkvmnl", //THT
    "4": "l318g53j", //Integrated Healthcare Limited
    "5": "l1v1p36l", //AIICO
    "6": "r5qygn9r", //Princeton
    "7": "rdon3m6j", //Reliance
    "8": "jx954qyj", //Swift
    "9": "ly51gomj", //Novo
    "10": "jp317g5l" //Metro
}

export const sections = [
    {
        text:
            "Take our survey/quiz and we will provide you with plans tailored for your needs.",
        icon: "snippets",
        color: " #38A169",
    },
    {
        text:
            "We would ask you some personal questions, but we will treat the data you provide us with as anonymous.",
        icon: "key",
        color: " #38A169",
    },
    {
        text:
            "We select policies for you based on a wide range of criteria, using processed data from our rich database.",
        icon: "database",
        color: " #38A169",
    },
    {
        text: "Manage your active policy from an intuitive dashboard.",
        icon: "user",
        color: " #38A169",
    },
    {
        text:
            "Process payments to your providers securely. You sometimes get discounts!",
        icon: "safety-certificate",
        color: "#38A169",
    },
];

export const child_options = [
    { value: 0, label: "Select Age" },
    { value: 1, label: "1 Year" },
    { value: 2, label: "2 Years" },
    { value: 3, label: "3 Years" },
    { value: 4, label: "4 Years" },
    { value: 5, label: "5 Years" },
    { value: 6, label: "6 Years" },
    { value: 7, label: "7 Years" },
    { value: 8, label: "8 Years" },
    { value: 9, label: "9 Years" },
    { value: 10, label: "10 Years" },
    { value: 11, label: "11 Years" },
    { value: 12, label: "12 Years" },
    { value: 13, label: "13 Years" },
    { value: 14, label: "14 Years" },
    { value: 15, label: "15 Years" },
    { value: 16, label: "16 Years" },
    { value: 17, label: "17 Years" },
    { value: 18, label: "18 Years" },
];

export const plan_types = [
    {
        id: "all",
        name: "All",
        max_num: 1000
    },
    {
        id: "individual",
        name: "Individual",
        max_num: 1
    },

    {
        id: "family",
        name: "Family",
        max_num: ""
    },

    {
        id: "couple",
        name: "Couples",
        max_num: "2"
    },
    {
        id: "senior_citizen",
        name: "Senior Citizens",
        max_num: ""
    },
    {
        id: "group",
        name: "SMES and Small Groups",
        max_num: ""
    },
    {
        id: "corporate",
        name: "Corporate and Large Groups",
        max_num: ""
    },
    {
        id: "intl_coverage",
        name: "International Coverage",
        max_num: ""
    }
]

export const plan_range = [
    {
        id: "all",
        name: "All",
        //  price_range: [0, 49999]
    },
    {
        id: "bronze",
        name: "Bronze",
        //   price_range: [50000, 149999]
    },
    {
        id: "silver",
        name: "Silver",
        //    price_range: [150000, 299999]
    },
    {
        id: "gold",
        name: "Gold",
        //   price_range: [300000, 599999]
    },
    {
        id: "diamond",
        name: "Diamond",
    },
    {
        id: "platinum",
        name: "Platinum",
        //price_range: [, 600000]
    },
    {
        id: "platinum_plus",
        name: "Platinum Plus",
        //    price_range: [, ]
    }
]