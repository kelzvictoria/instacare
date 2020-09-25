import numeral from "numeral";

export const NAIRA_SIGN = "₦";

export const formatAsCurrency = (value: number) => `${NAIRA_SIGN}${numeral(value).format("0,0")}`;

export const PAYSTACK_PUBLIC_KEY="pk_test_0c1c04d62b1746b3d59210fdebcded80735e9356";