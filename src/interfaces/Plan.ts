export interface Plan {
  [x: string]: any;
  name: string;
  category_id: string;
  individual_annual_price: number;
  individual_monthly_price: number;
  family_annual_price: number;
  family_monthly_price: number;
  family_no: number;
  total_benefit_limit: number;
  inpatient_limit: number;
  outpatient_limit: number;
  cover_region_id: string;
  covers: string;
  duration: string;
  service_id: object;
}

/*export interface Plan {
    [x: string]: any;
    name: string;
    price: number;
    provider: string;
    type: "family" | "individual" | "couple";
    covers: string;
    totalBenefitLimit: number;
    services: {
        region?: string;
        hospital?: string;
        inpatientLimit?: number;
        outpatientLimit?: number;
        accidentsOrEmergenciesCover: {
            isAvailable: boolean;
            limit: any;
        };
        surgeriesCover: {
            minorSurgeries: number;
            intermediateSurgeries: number;
            majorSurgeries: number;
        };
        diagnostics: any;
        consultations: string[];
        immunizations: {
            offerings: string[];
            validityPeriod: string;
        };
        opticalOptions: {
            offerings: string[];
            additionalFee: number;
        }
        physiotherapy: any;
        psychiatricTreatment: any;
        pharmacyCover: number;
        chronicDiseaseMedication: any;
        cancerCare: {
            offerings: [];
            additionalFee: number;
        };
        ambulance: any;
        mortuaryServices: any;
        deathBenefits: {
            type: string;
            benefit: number;
        };
        dentalOptions?: {
            offerings: string[];
            additionalFee: number;
        };
        icuCover: string;
        wellnessChecks: string[];
        dialysis: number;
        natalCare: string[];
        hivTreatment: boolean;
        familyPlanningServices: string[];
    };
    exclusions: string[];
    imageUrl?: string;
    matches: number;
}*/
