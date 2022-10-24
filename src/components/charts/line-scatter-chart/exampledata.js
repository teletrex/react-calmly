/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



const mydata = [
    {
        "discount": 0,
        "Global": 1,
        "Cents/Dollars Off - Without Vehicle": 1,
        "Promoted Price - With Vehicle": 1,
        "Promoted Price - Without Vehicle": 1
    },
    {
        "discount": 0.01,
        "Global": 1.02,
        "Cents/Dollars Off - Without Vehicle": 1.04,
        "Promoted Price - With Vehicle": 1.04,
        "Promoted Price - Without Vehicle": 1.02
    },
    {
        "discount": 0.02,
        "Global": 1.04,
        "Cents/Dollars Off - Without Vehicle": 1.09,
        "Promoted Price - With Vehicle": 1.07,
        "Promoted Price - Without Vehicle": 1.03
    },
    {
        "discount": 0.03,
        "Global": 1.06,
        "Cents/Dollars Off - Without Vehicle": 1.13,
        "Promoted Price - With Vehicle": 1.11,
        "Promoted Price - Without Vehicle": 1.05
    },
    {
        "discount": 0.04,
        "Global": 1.08,
        "Cents/Dollars Off - Without Vehicle": 1.18,
        "Promoted Price - With Vehicle": 1.15,
        "Promoted Price - Without Vehicle": 1.06
    },
    {
        "discount": 0.05,
        "Global": 1.1,
        "Cents/Dollars Off - Without Vehicle": 1.23,
        "Promoted Price - With Vehicle": 1.19,
        "Promoted Price - Without Vehicle": 1.08
    },
    {
        "discount": 0.06,
        "Global": 1.12,
        "Cents/Dollars Off - Without Vehicle": 1.28,
        "Promoted Price - With Vehicle": 1.23,
        "Promoted Price - Without Vehicle": 1.1
    },
    {
        "discount": 0.07,
        "Global": 1.14,
        "Cents/Dollars Off - Without Vehicle": 1.33,
        "Promoted Price - With Vehicle": 1.27,
        "Promoted Price - Without Vehicle": 1.11
    },
    {
        "discount": 0.08,
        "Global": 1.16,
        "Cents/Dollars Off - Without Vehicle": 1.39,
        "Promoted Price - With Vehicle": 1.32,
        "Promoted Price - Without Vehicle": 1.13
    },
    {
        "discount": 0.09,
        "Global": 1.19,
        "Cents/Dollars Off - Without Vehicle": 1.45,
        "Promoted Price - With Vehicle": 1.36,
        "Promoted Price - Without Vehicle": 1.15
    },
    {
        "discount": 0.1,
        "Global": 1.21,
        "Cents/Dollars Off - Without Vehicle": 1.51,
        "Promoted Price - With Vehicle": 1.41,
        "Promoted Price - Without Vehicle": 1.17
    },
    {
        "discount": 0.11,
        "Global": 1.23,
        "Cents/Dollars Off - Without Vehicle": 1.57,
        "Promoted Price - With Vehicle": 1.46,
        "Promoted Price - Without Vehicle": 1.19
    },
    {
        "discount": 0.12,
        "Global": 1.26,
        "Cents/Dollars Off - Without Vehicle": 1.64,
        "Promoted Price - With Vehicle": 1.51,
        "Promoted Price - Without Vehicle": 1.21
    },
    {
        "discount": 0.13,
        "Global": 1.28,
        "Cents/Dollars Off - Without Vehicle": 1.71,
        "Promoted Price - With Vehicle": 1.57,
        "Promoted Price - Without Vehicle": 1.22
    },
    {
        "discount": 0.14,
        "Global": 1.3,
        "Cents/Dollars Off - Without Vehicle": 1.78,
        "Promoted Price - With Vehicle": 1.62,
        "Promoted Price - Without Vehicle": 1.24
    },
    {
        "discount": 0.15,
        "Global": 1.33,
        "Cents/Dollars Off - Without Vehicle": 1.85,
        "Promoted Price - With Vehicle": 1.68,
        "Promoted Price - Without Vehicle": 1.26
    },
    {
        "discount": 0.16,
        "Global": 1.36,
        "Cents/Dollars Off - Without Vehicle": 1.93,
        "Promoted Price - With Vehicle": 1.74,
        "Promoted Price - Without Vehicle": 1.28
    },
    {
        "discount": 0.17,
        "Global": 1.38,
        "Cents/Dollars Off - Without Vehicle": 2.01,
        "Promoted Price - With Vehicle": 1.8,
        "Promoted Price - Without Vehicle": 1.3
    },
    {
        "discount": 0.18,
        "Global": 1.41,
        "Cents/Dollars Off - Without Vehicle": 2.1,
        "Promoted Price - With Vehicle": 1.86,
        "Promoted Price - Without Vehicle": 1.32
    },
    {
        "discount": 0.19,
        "Global": 1.44,
        "Cents/Dollars Off - Without Vehicle": 2.19,
        "Promoted Price - With Vehicle": 1.93,
        "Promoted Price - Without Vehicle": 1.34
    },
    {
        "discount": 0.2,
        "Global": 1.46,
        "Cents/Dollars Off - Without Vehicle": 2.28,
        "Promoted Price - With Vehicle": 1.99,
        "Promoted Price - Without Vehicle": 1.36
    },
    {
        "discount": 0.21,
        "Global": 1.49,
        "Cents/Dollars Off - Without Vehicle": 2.37,
        "Promoted Price - With Vehicle": 2.06,
        "Promoted Price - Without Vehicle": 1.39
    },
    {
        "discount": 0.22,
        "Global": 1.52,
        "Cents/Dollars Off - Without Vehicle": 2.47,
        "Promoted Price - With Vehicle": 2.14,
        "Promoted Price - Without Vehicle": 1.41
    },
    {
        "discount": 0.23,
        "Global": 1.55,
        "Cents/Dollars Off - Without Vehicle": 2.58,
        "Promoted Price - With Vehicle": 2.21,
        "Promoted Price - Without Vehicle": 1.43
    },
    {
        "discount": 0.24,
        "Global": 1.58,
        "Cents/Dollars Off - Without Vehicle": 2.69,
        "Promoted Price - With Vehicle": 2.29,
        "Promoted Price - Without Vehicle": 1.45
    },
    {
        "discount": 0.25,
        "Global": 1.61,
        "Cents/Dollars Off - Without Vehicle": 2.8,
        "Promoted Price - With Vehicle": 2.37,
        "Promoted Price - Without Vehicle": 1.48
    },
    {
        "discount": 0.26,
        "Global": 1.64,
        "Cents/Dollars Off - Without Vehicle": 2.92,
        "Promoted Price - With Vehicle": 2.45,
        "Promoted Price - Without Vehicle": 1.5
    },
    {
        "discount": 0.27,
        "Global": 1.67,
        "Cents/Dollars Off - Without Vehicle": 3.04,
        "Promoted Price - With Vehicle": 2.54,
        "Promoted Price - Without Vehicle": 1.52
    },
    {
        "discount": 0.28,
        "Global": 1.7,
        "Cents/Dollars Off - Without Vehicle": 3.17,
        "Promoted Price - With Vehicle": 2.63,
        "Promoted Price - Without Vehicle": 1.55
    },
    {
        "discount": 0.29,
        "Global": 1.74,
        "Cents/Dollars Off - Without Vehicle": 3.3,
        "Promoted Price - With Vehicle": 2.72,
        "Promoted Price - Without Vehicle": 1.57
    },
    {
        "discount": 0.3,
        "Global": 1.77,
        "Cents/Dollars Off - Without Vehicle": 3.44,
        "Promoted Price - With Vehicle": 2.82,
        "Promoted Price - Without Vehicle": 1.59
    },
    {
        "discount": 0.31,
        "Global": 1.8,
        "Cents/Dollars Off - Without Vehicle": 3.58,
        "Promoted Price - With Vehicle": 2.92,
        "Promoted Price - Without Vehicle": 1.62
    },
    {
        "discount": 0.32,
        "Global": 1.84,
        "Cents/Dollars Off - Without Vehicle": 3.74,
        "Promoted Price - With Vehicle": 3.02,
        "Promoted Price - Without Vehicle": 1.64
    },
    {
        "discount": 0.33,
        "Global": 1.87,
        "Cents/Dollars Off - Without Vehicle": 3.89,
        "Promoted Price - With Vehicle": 3.12,
        "Promoted Price - Without Vehicle": 1.67
    },
    {
        "discount": 0.34,
        "Global": 1.91,
        "Cents/Dollars Off - Without Vehicle": 4.06,
        "Promoted Price - With Vehicle": 3.23,
        "Promoted Price - Without Vehicle": 1.7
    },
    {
        "discount": 0.35,
        "Global": 1.95,
        "Cents/Dollars Off - Without Vehicle": 4.23,
        "Promoted Price - With Vehicle": 3.35,
        "Promoted Price - Without Vehicle": 1.72
    },
    {
        "discount": 0.36,
        "Global": 1.98,
        "Cents/Dollars Off - Without Vehicle": 4.4,
        "Promoted Price - With Vehicle": 3.46,
        "Promoted Price - Without Vehicle": 1.75
    },
    {
        "discount": 0.37,
        "Global": 2.02,
        "Cents/Dollars Off - Without Vehicle": 4.59,
        "Promoted Price - With Vehicle": 3.59,
        "Promoted Price - Without Vehicle": 1.78
    },
    {
        "discount": 0.38,
        "Global": 2.06,
        "Cents/Dollars Off - Without Vehicle": 4.78,
        "Promoted Price - With Vehicle": 3.71,
        "Promoted Price - Without Vehicle": 1.81
    },
    {
        "discount": 0.39,
        "Global": 2.1,
        "Cents/Dollars Off - Without Vehicle": 4.98,
        "Promoted Price - With Vehicle": 3.84,
        "Promoted Price - Without Vehicle": 1.83
    },
    {
        "discount": 0.4,
        "Global": 2.14,
        "Cents/Dollars Off - Without Vehicle": 5.19,
        "Promoted Price - With Vehicle": 3.98,
        "Promoted Price - Without Vehicle": 1.86
    },
    {
        "discount": 0.41,
        "Global": 2.18,
        "Cents/Dollars Off - Without Vehicle": 5.41,
        "Promoted Price - With Vehicle": 4.12,
        "Promoted Price - Without Vehicle": 1.89
    },
    {
        "discount": 0.42,
        "Global": 2.22,
        "Cents/Dollars Off - Without Vehicle": 5.64,
        "Promoted Price - With Vehicle": 4.26,
        "Promoted Price - Without Vehicle": 1.92
    },
    {
        "discount": 0.43,
        "Global": 2.26,
        "Cents/Dollars Off - Without Vehicle": 5.88,
        "Promoted Price - With Vehicle": 4.41,
        "Promoted Price - Without Vehicle": 1.95
    },
    {
        "discount": 0.44,
        "Global": 2.31,
        "Cents/Dollars Off - Without Vehicle": 6.12,
        "Promoted Price - With Vehicle": 4.57,
        "Promoted Price - Without Vehicle": 1.98
    },
    {
        "discount": 0.45,
        "Global": 2.35,
        "Cents/Dollars Off - Without Vehicle": 6.38,
        "Promoted Price - With Vehicle": 4.73,
        "Promoted Price - Without Vehicle": 2.01
    },
    {
        "discount": 0.46,
        "Global": 2.4,
        "Cents/Dollars Off - Without Vehicle": 6.65,
        "Promoted Price - With Vehicle": 4.89,
        "Promoted Price - Without Vehicle": 2.04
    },
    {
        "discount": 0.47,
        "Global": 2.44,
        "Cents/Dollars Off - Without Vehicle": 6.93,
        "Promoted Price - With Vehicle": 5.06,
        "Promoted Price - Without Vehicle": 2.08
    },
    {
        "discount": 0.48,
        "Global": 2.49,
        "Cents/Dollars Off - Without Vehicle": 7.22,
        "Promoted Price - With Vehicle": 5.24,
        "Promoted Price - Without Vehicle": 2.11
    },
    {
        "discount": 0.49,
        "Global": 2.54,
        "Cents/Dollars Off - Without Vehicle": 7.52,
        "Promoted Price - With Vehicle": 5.43,
        "Promoted Price - Without Vehicle": 2.14
    },
    {
        "discount": 0.5,
        "Global": 2.59,
        "Cents/Dollars Off - Without Vehicle": 7.84,
        "Promoted Price - With Vehicle": 5.62,
        "Promoted Price - Without Vehicle": 2.18
    },
    {
        "discount": 0.51,
        "Global": 2.64,
        "Cents/Dollars Off - Without Vehicle": 8.17,
        "Promoted Price - With Vehicle": 5.81,
        "Promoted Price - Without Vehicle": 2.21
    },
    {
        "discount": 0.52,
        "Global": 2.69,
        "Cents/Dollars Off - Without Vehicle": 8.51,
        "Promoted Price - With Vehicle": 6.02,
        "Promoted Price - Without Vehicle": 2.24
    },
    {
        "discount": 0.53,
        "Global": 2.74,
        "Cents/Dollars Off - Without Vehicle": 8.87,
        "Promoted Price - With Vehicle": 6.23,
        "Promoted Price - Without Vehicle": 2.28
    },
    {
        "discount": 0.54,
        "Global": 2.79,
        "Cents/Dollars Off - Without Vehicle": 9.24,
        "Promoted Price - With Vehicle": 6.45,
        "Promoted Price - Without Vehicle": 2.32
    },
    {
        "discount": 0.55,
        "Global": 2.84,
        "Cents/Dollars Off - Without Vehicle": 9.63,
        "Promoted Price - With Vehicle": 6.67,
        "Promoted Price - Without Vehicle": 2.35
    },
    {
        "discount": 0.56,
        "Global": 2.9,
        "Cents/Dollars Off - Without Vehicle": 10.04,
        "Promoted Price - With Vehicle": 6.91,
        "Promoted Price - Without Vehicle": 2.39
    },
    {
        "discount": 0.57,
        "Global": 2.96,
        "Cents/Dollars Off - Without Vehicle": 10.46,
        "Promoted Price - With Vehicle": 7.15,
        "Promoted Price - Without Vehicle": 2.43
    },
    {
        "discount": 0.58,
        "Global": 3.01,
        "Cents/Dollars Off - Without Vehicle": 10.9,
        "Promoted Price - With Vehicle": 7.4,
        "Promoted Price - Without Vehicle": 2.46
    },
    {
        "discount": 0.59,
        "Global": 3.07,
        "Cents/Dollars Off - Without Vehicle": 11.36,
        "Promoted Price - With Vehicle": 7.66,
        "Promoted Price - Without Vehicle": 2.5
    },
    {
        "discount": 0.6,
        "Global": 3.13,
        "Cents/Dollars Off - Without Vehicle": 11.84,
        "Promoted Price - With Vehicle": 7.93,
        "Promoted Price - Without Vehicle": 2.54
    },
    {
        "discount": 0.61,
        "Global": 3.19,
        "Cents/Dollars Off - Without Vehicle": 12.33,
        "Promoted Price - With Vehicle": 8.21,
        "Promoted Price - Without Vehicle": 2.58
    },
    {
        "discount": 0.62,
        "Global": 3.25,
        "Cents/Dollars Off - Without Vehicle": 12.85,
        "Promoted Price - With Vehicle": 8.5,
        "Promoted Price - Without Vehicle": 2.62
    },
    {
        "discount": 0.63,
        "Global": 3.31,
        "Cents/Dollars Off - Without Vehicle": 13.39,
        "Promoted Price - With Vehicle": 8.8,
        "Promoted Price - Without Vehicle": 2.66
    },
    {
        "discount": 0.64,
        "Global": 3.38,
        "Cents/Dollars Off - Without Vehicle": 13.96,
        "Promoted Price - With Vehicle": 9.1,
        "Promoted Price - Without Vehicle": 2.7
    },
    {
        "discount": 0.65,
        "Global": 3.44,
        "Cents/Dollars Off - Without Vehicle": 14.54,
        "Promoted Price - With Vehicle": 9.42,
        "Promoted Price - Without Vehicle": 2.75
    },
    {
        "discount": 0.66,
        "Global": 3.51,
        "Cents/Dollars Off - Without Vehicle": 15.15,
        "Promoted Price - With Vehicle": 9.76,
        "Promoted Price - Without Vehicle": 2.79
    },
    {
        "discount": 0.67,
        "Global": 3.57,
        "Cents/Dollars Off - Without Vehicle": 15.79,
        "Promoted Price - With Vehicle": 10.1,
        "Promoted Price - Without Vehicle": 2.83
    },
    {
        "discount": 0.68,
        "Global": 3.64,
        "Cents/Dollars Off - Without Vehicle": 16.45,
        "Promoted Price - With Vehicle": 10.45,
        "Promoted Price - Without Vehicle": 2.88
    },
    {
        "discount": 0.69,
        "Global": 3.71,
        "Cents/Dollars Off - Without Vehicle": 17.15,
        "Promoted Price - With Vehicle": 10.82,
        "Promoted Price - Without Vehicle": 2.92
    },
    {
        "discount": 0.7,
        "Global": 3.78,
        "Cents/Dollars Off - Without Vehicle": 17.87,
        "Promoted Price - With Vehicle": 11.2,
        "Promoted Price - Without Vehicle": 2.97
    },
    {
        "discount": 0.71,
        "Global": 3.86,
        "Cents/Dollars Off - Without Vehicle": 18.62,
        "Promoted Price - With Vehicle": 11.59,
        "Promoted Price - Without Vehicle": 3.02
    },
    {
        "discount": 0.72,
        "Global": 3.93,
        "Cents/Dollars Off - Without Vehicle": 19.4,
        "Promoted Price - With Vehicle": 12,
        "Promoted Price - Without Vehicle": 3.06
    },
    {
        "discount": 0.73,
        "Global": 4.01,
        "Cents/Dollars Off - Without Vehicle": 20.22,
        "Promoted Price - With Vehicle": 12.42,
        "Promoted Price - Without Vehicle": 3.11
    },
    {
        "discount": 0.74,
        "Global": 4.08,
        "Cents/Dollars Off - Without Vehicle": 21.07,
        "Promoted Price - With Vehicle": 12.86,
        "Promoted Price - Without Vehicle": 3.16
    },
    {
        "discount": 0.75,
        "Global": 4.16,
        "Cents/Dollars Off - Without Vehicle": 21.95,
        "Promoted Price - With Vehicle": 13.31,
        "Promoted Price - Without Vehicle": 3.21
    },
    {
        "discount": 0.76,
        "Global": 4.24,
        "Cents/Dollars Off - Without Vehicle": 22.88,
        "Promoted Price - With Vehicle": 13.78,
        "Promoted Price - Without Vehicle": 3.26
    },
    {
        "discount": 0.77,
        "Global": 4.32,
        "Cents/Dollars Off - Without Vehicle": 23.84,
        "Promoted Price - With Vehicle": 14.26,
        "Promoted Price - Without Vehicle": 3.31
    },
    {
        "discount": 0.78,
        "Global": 4.4,
        "Cents/Dollars Off - Without Vehicle": 24.84,
        "Promoted Price - With Vehicle": 14.76,
        "Promoted Price - Without Vehicle": 3.36
    },
    {
        "discount": 0.79,
        "Global": 4.49,
        "Cents/Dollars Off - Without Vehicle": 25.89,
        "Promoted Price - With Vehicle": 15.28,
        "Promoted Price - Without Vehicle": 3.42
    },
    {
        "discount": 0.8,
        "Global": 4.58,
        "Cents/Dollars Off - Without Vehicle": 26.97,
        "Promoted Price - With Vehicle": 15.82,
        "Promoted Price - Without Vehicle": 3.47
    },
    {
        "discount": 0.81,
        "Global": 4.66,
        "Cents/Dollars Off - Without Vehicle": 28.11,
        "Promoted Price - With Vehicle": 16.37,
        "Promoted Price - Without Vehicle": 3.52
    },
    {
        "discount": 0.82,
        "Global": 4.75,
        "Cents/Dollars Off - Without Vehicle": 29.29,
        "Promoted Price - With Vehicle": 16.95,
        "Promoted Price - Without Vehicle": 3.58
    },
    {
        "discount": 0.83,
        "Global": 4.84,
        "Cents/Dollars Off - Without Vehicle": 30.52,
        "Promoted Price - With Vehicle": 17.54,
        "Promoted Price - Without Vehicle": 3.63
    },
    {
        "discount": 0.84,
        "Global": 4.94,
        "Cents/Dollars Off - Without Vehicle": 31.8,
        "Promoted Price - With Vehicle": 18.16,
        "Promoted Price - Without Vehicle": 3.69
    },
    {
        "discount": 0.85,
        "Global": 5.03,
        "Cents/Dollars Off - Without Vehicle": 33.14,
        "Promoted Price - With Vehicle": 18.79,
        "Promoted Price - Without Vehicle": 3.75
    },
    {
        "discount": 0.86,
        "Global": 5.13,
        "Cents/Dollars Off - Without Vehicle": 34.53,
        "Promoted Price - With Vehicle": 19.45,
        "Promoted Price - Without Vehicle": 3.81
    },
    {
        "discount": 0.87,
        "Global": 5.23,
        "Cents/Dollars Off - Without Vehicle": 35.99,
        "Promoted Price - With Vehicle": 20.14,
        "Promoted Price - Without Vehicle": 3.87
    },
    {
        "discount": 0.88,
        "Global": 5.33,
        "Cents/Dollars Off - Without Vehicle": 37.5,
        "Promoted Price - With Vehicle": 20.84,
        "Promoted Price - Without Vehicle": 3.93
    },
    {
        "discount": 0.89,
        "Global": 5.43,
        "Cents/Dollars Off - Without Vehicle": 39.08,
        "Promoted Price - With Vehicle": 21.58,
        "Promoted Price - Without Vehicle": 3.99
    },
    {
        "discount": 0.9,
        "Global": 5.53,
        "Cents/Dollars Off - Without Vehicle": 40.72,
        "Promoted Price - With Vehicle": 22.33,
        "Promoted Price - Without Vehicle": 4.05
    },
    {
        "discount": 0.91,
        "Global": 5.64,
        "Cents/Dollars Off - Without Vehicle": 42.43,
        "Promoted Price - With Vehicle": 23.12,
        "Promoted Price - Without Vehicle": 4.12
    },
    {
        "discount": 0.92,
        "Global": 5.75,
        "Cents/Dollars Off - Without Vehicle": 44.22,
        "Promoted Price - With Vehicle": 23.93,
        "Promoted Price - Without Vehicle": 4.18
    },
    {
        "discount": 0.93,
        "Global": 5.86,
        "Cents/Dollars Off - Without Vehicle": 46.07,
        "Promoted Price - With Vehicle": 24.77,
        "Promoted Price - Without Vehicle": 4.25
    },
    {
        "discount": 0.94,
        "Global": 5.97,
        "Cents/Dollars Off - Without Vehicle": 48.01,
        "Promoted Price - With Vehicle": 25.64,
        "Promoted Price - Without Vehicle": 4.31
    },
    {
        "discount": 0.95,
        "Global": 6.09,
        "Cents/Dollars Off - Without Vehicle": 50.03,
        "Promoted Price - With Vehicle": 26.54,
        "Promoted Price - Without Vehicle": 4.38
    },
    {
        "discount": 0.96,
        "Global": 6.2,
        "Cents/Dollars Off - Without Vehicle": 52.13,
        "Promoted Price - With Vehicle": 27.47,
        "Promoted Price - Without Vehicle": 4.45
    },
    {
        "discount": 0.97,
        "Global": 6.32,
        "Cents/Dollars Off - Without Vehicle": 54.33,
        "Promoted Price - With Vehicle": 28.44,
        "Promoted Price - Without Vehicle": 4.52
    },
    {
        "discount": 0.98,
        "Global": 6.44,
        "Cents/Dollars Off - Without Vehicle": 56.61,
        "Promoted Price - With Vehicle": 29.44,
        "Promoted Price - Without Vehicle": 4.59
    },
    {
        "discount": 0.99,
        "Global": 6.57,
        "Cents/Dollars Off - Without Vehicle": 58.99,
        "Promoted Price - With Vehicle": 30.47,
        "Promoted Price - Without Vehicle": 4.66
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-04-10",
        "tactic": "Promoted Price - Without Vehicle",
        "discount": 0.294,
        "yLift": 1.175
    },
    {
        "startDate": "2021-03-21",
        "endDate": "2021-04-10",
        "tactic": "Promoted Price - Without Vehicle",
        "discount": 0.293,
        "yLift": 1.182
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-03-27",
        "tactic": "Promoted Price - Without Vehicle",
        "discount": 0.296,
        "yLift": 1.307
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-03-20",
        "tactic": "Promoted Price - Without Vehicle",
        "discount": 0.299,
        "yLift": 1.352
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-04-03",
        "tactic": "Promoted Price - With Vehicle",
        "discount": 0.295,
        "yLift": 1.413
    }
].sort( (a,b)=> (a.discount - b.discount));


const myTacticLegendLabels =
{
"Global":"Global",
"Cents/Dollars Off - Without Vehicle":"Cents/Dollars Off - Without Vehicle",
"Promoted Price - With Vehicle":"Promoted Price - With Vehicle",
"Promoted Price - Without Vehicle":"Promoted Price - Without Vehicle"
};

export {mydata, myTacticLegendLabels};

