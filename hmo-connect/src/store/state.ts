export const state: any = {
    quiz: {
        page: 1,
        minPage: 1,
        maxPage: 3,
        checked: [],
        dataSource: [],
        didRequestReturnEmptyResult: false,
        familyPlanSelected:false,
        covers:"",
        
        responses: {
            budget: [300000,350000],
            type: "individual",
            firstName: "",
            lastName: "",
            email: "",
            state: "",
            adult:1,
            children:0,
            infants:0,
            services: {
                cancerCare:false,
                physiotherapy:false,
                psychiatricTreatment:false,
                familyPlanningServices:false,
                mortuaryServices:false,
                natalCare:false,
                dentalOptions:false,
                opticalOptions:false,
                diagnostics:false

            }
        }
    },
    compare: {
        fetching:false,
        plans: [],
        sort: {
            mode: "desc",
            icon: "sort-ascending",
            description: "Sort by price (most expensive first)"
        },
        bestPlan: {},
        cheapestPlan: {},
        mostExpensivePlan:{}
       
    },
    details: {
        email: "",
        price: 0,
        notGettingProviders:true,
        buyingPlan:false
    }
};