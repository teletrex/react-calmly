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
        "High Mark": 1,
        "Middle Mark": 1,
        "Low Mark": 1
    },
    {
        "discount": 0.01,
        "Global": 1.02,
        "High Mark": 1.04,
        "Middle Mark": 1.04,
        "Low Mark": 1.02
    },
    {
        "discount": 0.02,
        "Global": 1.04,
        "High Mark": 1.09,
        "Middle Mark": 1.07,
        "Low Mark": 1.03
    },
    {
        "discount": 0.03,
        "Global": 1.06,
        "High Mark": 1.13,
        "Middle Mark": 1.11,
        "Low Mark": 1.05
    },
    {
        "discount": 0.04,
        "Global": 1.08,
        "High Mark": 1.18,
        "Middle Mark": 1.15,
        "Low Mark": 1.06
    },
    {
        "discount": 0.05,
        "Global": 1.1,
        "High Mark": 1.23,
        "Middle Mark": 1.19,
        "Low Mark": 1.08
    },
    {
        "discount": 0.06,
        "Global": 1.12,
        "High Mark": 1.28,
        "Middle Mark": 1.23,
        "Low Mark": 1.1
    },
    {
        "discount": 0.07,
        "Global": 1.14,
        "High Mark": 1.33,
        "Middle Mark": 1.27,
        "Low Mark": 1.11
    },
    {
        "discount": 0.08,
        "Global": 1.16,
        "High Mark": 1.39,
        "Middle Mark": 1.32,
        "Low Mark": 1.13
    },
    {
        "discount": 0.09,
        "Global": 1.19,
        "High Mark": 1.45,
        "Middle Mark": 1.36,
        "Low Mark": 1.15
    },
    {
        "discount": 0.1,
        "Global": 1.21,
        "High Mark": 1.51,
        "Middle Mark": 1.41,
        "Low Mark": 1.17
    },
    {
        "discount": 0.11,
        "Global": 1.23,
        "High Mark": 1.57,
        "Middle Mark": 1.46,
        "Low Mark": 1.19
    },
    {
        "discount": 0.12,
        "Global": 1.26,
        "High Mark": 1.64,
        "Middle Mark": 1.51,
        "Low Mark": 1.21
    },
    {
        "discount": 0.13,
        "Global": 1.28,
        "High Mark": 1.71,
        "Middle Mark": 1.57,
        "Low Mark": 1.22
    },
    {
        "discount": 0.14,
        "Global": 1.3,
        "High Mark": 1.78,
        "Middle Mark": 1.62,
        "Low Mark": 1.24
    },
    {
        "discount": 0.15,
        "Global": 1.33,
        "High Mark": 1.85,
        "Middle Mark": 1.68,
        "Low Mark": 1.26
    },
    {
        "discount": 0.16,
        "Global": 1.36,
        "High Mark": 1.93,
        "Middle Mark": 1.74,
        "Low Mark": 1.28
    },
    {
        "discount": 0.17,
        "Global": 1.38,
        "High Mark": 2.01,
        "Middle Mark": 1.8,
        "Low Mark": 1.3
    },
    {
        "discount": 0.18,
        "Global": 1.41,
        "High Mark": 2.1,
        "Middle Mark": 1.86,
        "Low Mark": 1.32
    },
    {
        "discount": 0.19,
        "Global": 1.44,
        "High Mark": 2.19,
        "Middle Mark": 1.93,
        "Low Mark": 1.34
    },
    {
        "discount": 0.2,
        "Global": 1.46,
        "High Mark": 2.28,
        "Middle Mark": 1.99,
        "Low Mark": 1.36
    },
    {
        "discount": 0.21,
        "Global": 1.49,
        "High Mark": 2.37,
        "Middle Mark": 2.06,
        "Low Mark": 1.39
    },
    {
        "discount": 0.22,
        "Global": 1.52,
        "High Mark": 2.47,
        "Middle Mark": 2.14,
        "Low Mark": 1.41
    },
    {
        "discount": 0.23,
        "Global": 1.55,
        "High Mark": 2.58,
        "Middle Mark": 2.21,
        "Low Mark": 1.43
    },
    {
        "discount": 0.24,
        "Global": 1.58,
        "High Mark": 2.69,
        "Middle Mark": 2.29,
        "Low Mark": 1.45
    },
    {
        "discount": 0.25,
        "Global": 1.61,
        "High Mark": 2.8,
        "Middle Mark": 2.37,
        "Low Mark": 1.48
    },
    {
        "discount": 0.26,
        "Global": 1.64,
        "High Mark": 2.92,
        "Middle Mark": 2.45,
        "Low Mark": 1.5
    },
    {
        "discount": 0.27,
        "Global": 1.67,
        "High Mark": 3.04,
        "Middle Mark": 2.54,
        "Low Mark": 1.52
    },
    {
        "discount": 0.28,
        "Global": 1.7,
        "High Mark": 3.17,
        "Middle Mark": 2.63,
        "Low Mark": 1.55
    },
    {
        "discount": 0.29,
        "Global": 1.74,
        "High Mark": 3.3,
        "Middle Mark": 2.72,
        "Low Mark": 1.57
    },
    {
        "discount": 0.3,
        "Global": 1.77,
        "High Mark": 3.44,
        "Middle Mark": 2.82,
        "Low Mark": 1.59
    },
    {
        "discount": 0.31,
        "Global": 1.8,
        "High Mark": 3.58,
        "Middle Mark": 2.92,
        "Low Mark": 1.62
    },
    {
        "discount": 0.32,
        "Global": 1.84,
        "High Mark": 3.74,
        "Middle Mark": 3.02,
        "Low Mark": 1.64
    },
    {
        "discount": 0.33,
        "Global": 1.87,
        "High Mark": 3.89,
        "Middle Mark": 3.12,
        "Low Mark": 1.67
    },
    {
        "discount": 0.34,
        "Global": 1.91,
        "High Mark": 4.06,
        "Middle Mark": 3.23,
        "Low Mark": 1.7
    },
    {
        "discount": 0.35,
        "Global": 1.95,
        "High Mark": 4.23,
        "Middle Mark": 3.35,
        "Low Mark": 1.72
    },
    {
        "discount": 0.36,
        "Global": 1.98,
        "High Mark": 4.4,
        "Middle Mark": 3.46,
        "Low Mark": 1.75
    },
    {
        "discount": 0.37,
        "Global": 2.02,
        "High Mark": 4.59,
        "Middle Mark": 3.59,
        "Low Mark": 1.78
    },
    {
        "discount": 0.38,
        "Global": 2.06,
        "High Mark": 4.78,
        "Middle Mark": 3.71,
        "Low Mark": 1.81
    },
    {
        "discount": 0.39,
        "Global": 2.1,
        "High Mark": 4.98,
        "Middle Mark": 3.84,
        "Low Mark": 1.83
    },
    {
        "discount": 0.4,
        "Global": 2.14,
        "High Mark": 5.19,
        "Middle Mark": 3.98,
        "Low Mark": 1.86
    },
    {
        "discount": 0.41,
        "Global": 2.18,
        "High Mark": 5.41,
        "Middle Mark": 4.12,
        "Low Mark": 1.89
    },
    {
        "discount": 0.42,
        "Global": 2.22,
        "High Mark": 5.64,
        "Middle Mark": 4.26,
        "Low Mark": 1.92
    },
    {
        "discount": 0.43,
        "Global": 2.26,
        "High Mark": 5.88,
        "Middle Mark": 4.41,
        "Low Mark": 1.95
    },
    {
        "discount": 0.44,
        "Global": 2.31,
        "High Mark": 6.12,
        "Middle Mark": 4.57,
        "Low Mark": 1.98
    },
    {
        "discount": 0.45,
        "Global": 2.35,
        "High Mark": 6.38,
        "Middle Mark": 4.73,
        "Low Mark": 2.01
    },
    {
        "discount": 0.46,
        "Global": 2.4,
        "High Mark": 6.65,
        "Middle Mark": 4.89,
        "Low Mark": 2.04
    },
    {
        "discount": 0.47,
        "Global": 2.44,
        "High Mark": 6.93,
        "Middle Mark": 5.06,
        "Low Mark": 2.08
    },
    {
        "discount": 0.48,
        "Global": 2.49,
        "High Mark": 7.22,
        "Middle Mark": 5.24,
        "Low Mark": 2.11
    },
    {
        "discount": 0.49,
        "Global": 2.54,
        "High Mark": 7.52,
        "Middle Mark": 5.43,
        "Low Mark": 2.14
    },
    {
        "discount": 0.5,
        "Global": 2.59,
        "High Mark": 7.84,
        "Middle Mark": 5.62,
        "Low Mark": 2.18
    },
    {
        "discount": 0.51,
        "Global": 2.64,
        "High Mark": 8.17,
        "Middle Mark": 5.81,
        "Low Mark": 2.21
    },
    {
        "discount": 0.52,
        "Global": 2.69,
        "High Mark": 8.51,
        "Middle Mark": 6.02,
        "Low Mark": 2.24
    },
    {
        "discount": 0.53,
        "Global": 2.74,
        "High Mark": 8.87,
        "Middle Mark": 6.23,
        "Low Mark": 2.28
    },
    {
        "discount": 0.54,
        "Global": 2.79,
        "High Mark": 9.24,
        "Middle Mark": 6.45,
        "Low Mark": 2.32
    },
    {
        "discount": 0.55,
        "Global": 2.84,
        "High Mark": 9.63,
        "Middle Mark": 6.67,
        "Low Mark": 2.35
    },
    {
        "discount": 0.56,
        "Global": 2.9,
        "High Mark": 10.04,
        "Middle Mark": 6.91,
        "Low Mark": 2.39
    },
    {
        "discount": 0.57,
        "Global": 2.96,
        "High Mark": 10.46,
        "Middle Mark": 7.15,
        "Low Mark": 2.43
    },
    {
        "discount": 0.58,
        "Global": 3.01,
        "High Mark": 10.9,
        "Middle Mark": 7.4,
        "Low Mark": 2.46
    },
    {
        "discount": 0.59,
        "Global": 3.07,
        "High Mark": 11.36,
        "Middle Mark": 7.66,
        "Low Mark": 2.5
    },
    {
        "discount": 0.6,
        "Global": 3.13,
        "High Mark": 11.84,
        "Middle Mark": 7.93,
        "Low Mark": 2.54
    },
    {
        "discount": 0.61,
        "Global": 3.19,
        "High Mark": 12.33,
        "Middle Mark": 8.21,
        "Low Mark": 2.58
    },
    {
        "discount": 0.62,
        "Global": 3.25,
        "High Mark": 12.85,
        "Middle Mark": 8.5,
        "Low Mark": 2.62
    },
    {
        "discount": 0.63,
        "Global": 3.31,
        "High Mark": 13.39,
        "Middle Mark": 8.8,
        "Low Mark": 2.66
    },
    {
        "discount": 0.64,
        "Global": 3.38,
        "High Mark": 13.96,
        "Middle Mark": 9.1,
        "Low Mark": 2.7
    },
    {
        "discount": 0.65,
        "Global": 3.44,
        "High Mark": 14.54,
        "Middle Mark": 9.42,
        "Low Mark": 2.75
    },
    {
        "discount": 0.66,
        "Global": 3.51,
        "High Mark": 15.15,
        "Middle Mark": 9.76,
        "Low Mark": 2.79
    },
    {
        "discount": 0.67,
        "Global": 3.57,
        "High Mark": 15.79,
        "Middle Mark": 10.1,
        "Low Mark": 2.83
    },
    {
        "discount": 0.68,
        "Global": 3.64,
        "High Mark": 16.45,
        "Middle Mark": 10.45,
        "Low Mark": 2.88
    },
    {
        "discount": 0.69,
        "Global": 3.71,
        "High Mark": 17.15,
        "Middle Mark": 10.82,
        "Low Mark": 2.92
    },
    {
        "discount": 0.7,
        "Global": 3.78,
        "High Mark": 17.87,
        "Middle Mark": 11.2,
        "Low Mark": 2.97
    },
    {
        "discount": 0.71,
        "Global": 3.86,
        "High Mark": 18.62,
        "Middle Mark": 11.59,
        "Low Mark": 3.02
    },
    {
        "discount": 0.72,
        "Global": 3.93,
        "High Mark": 19.4,
        "Middle Mark": 12,
        "Low Mark": 3.06
    },
    {
        "discount": 0.73,
        "Global": 4.01,
        "High Mark": 20.22,
        "Middle Mark": 12.42,
        "Low Mark": 3.11
    },
    {
        "discount": 0.74,
        "Global": 4.08,
        "High Mark": 21.07,
        "Middle Mark": 12.86,
        "Low Mark": 3.16
    },
    {
        "discount": 0.75,
        "Global": 4.16,
        "High Mark": 21.95,
        "Middle Mark": 13.31,
        "Low Mark": 3.21
    },
    {
        "discount": 0.76,
        "Global": 4.24,
        "High Mark": 22.88,
        "Middle Mark": 13.78,
        "Low Mark": 3.26
    },
    {
        "discount": 0.77,
        "Global": 4.32,
        "High Mark": 23.84,
        "Middle Mark": 14.26,
        "Low Mark": 3.31
    },
    {
        "discount": 0.78,
        "Global": 4.4,
        "High Mark": 24.84,
        "Middle Mark": 14.76,
        "Low Mark": 3.36
    },
    {
        "discount": 0.79,
        "Global": 4.49,
        "High Mark": 25.89,
        "Middle Mark": 15.28,
        "Low Mark": 3.42
    },
    {
        "discount": 0.8,
        "Global": 4.58,
        "High Mark": 26.97,
        "Middle Mark": 15.82,
        "Low Mark": 3.47
    },
    {
        "discount": 0.81,
        "Global": 4.66,
        "High Mark": 28.11,
        "Middle Mark": 16.37,
        "Low Mark": 3.52
    },
    {
        "discount": 0.82,
        "Global": 4.75,
        "High Mark": 29.29,
        "Middle Mark": 16.95,
        "Low Mark": 3.58
    },
    {
        "discount": 0.83,
        "Global": 4.84,
        "High Mark": 30.52,
        "Middle Mark": 17.54,
        "Low Mark": 3.63
    },
    {
        "discount": 0.84,
        "Global": 4.94,
        "High Mark": 31.8,
        "Middle Mark": 18.16,
        "Low Mark": 3.69
    },
    {
        "discount": 0.85,
        "Global": 5.03,
        "High Mark": 33.14,
        "Middle Mark": 18.79,
        "Low Mark": 3.75
    },
    {
        "discount": 0.86,
        "Global": 5.13,
        "High Mark": 34.53,
        "Middle Mark": 19.45,
        "Low Mark": 3.81
    },
    {
        "discount": 0.87,
        "Global": 5.23,
        "High Mark": 35.99,
        "Middle Mark": 20.14,
        "Low Mark": 3.87
    },
    {
        "discount": 0.88,
        "Global": 5.33,
        "High Mark": 37.5,
        "Middle Mark": 20.84,
        "Low Mark": 3.93
    },
    {
        "discount": 0.89,
        "Global": 5.43,
        "High Mark": 39.08,
        "Middle Mark": 21.58,
        "Low Mark": 3.99
    },
    {
        "discount": 0.9,
        "Global": 5.53,
        "High Mark": 40.72,
        "Middle Mark": 22.33,
        "Low Mark": 4.05
    },
    {
        "discount": 0.91,
        "Global": 5.64,
        "High Mark": 42.43,
        "Middle Mark": 23.12,
        "Low Mark": 4.12
    },
    {
        "discount": 0.92,
        "Global": 5.75,
        "High Mark": 44.22,
        "Middle Mark": 23.93,
        "Low Mark": 4.18
    },
    {
        "discount": 0.93,
        "Global": 5.86,
        "High Mark": 46.07,
        "Middle Mark": 24.77,
        "Low Mark": 4.25
    },
    {
        "discount": 0.94,
        "Global": 5.97,
        "High Mark": 48.01,
        "Middle Mark": 25.64,
        "Low Mark": 4.31
    },
    {
        "discount": 0.95,
        "Global": 6.09,
        "High Mark": 50.03,
        "Middle Mark": 26.54,
        "Low Mark": 4.38
    },
    {
        "discount": 0.96,
        "Global": 6.2,
        "High Mark": 52.13,
        "Middle Mark": 27.47,
        "Low Mark": 4.45
    },
    {
        "discount": 0.97,
        "Global": 6.32,
        "High Mark": 54.33,
        "Middle Mark": 28.44,
        "Low Mark": 4.52
    },
    {
        "discount": 0.98,
        "Global": 6.44,
        "High Mark": 56.61,
        "Middle Mark": 29.44,
        "Low Mark": 4.59
    },
    {
        "discount": 0.99,
        "Global": 6.57,
        "High Mark": 58.99,
        "Middle Mark": 30.47,
        "Low Mark": 4.66
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-04-10",
        "tactic": "Low Mark",
        "discount": 0.294,
        "yLift": 1.175
    },
    {
        "startDate": "2021-03-21",
        "endDate": "2021-04-10",
        "tactic": "Low Mark",
        "discount": 0.293,
        "yLift": 1.182
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-03-27",
        "tactic": "Low Mark",
        "discount": 0.296,
        "yLift": 1.307
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-03-20",
        "tactic": "Low Mark",
        "discount": 0.299,
        "yLift": 1.352
    },
    {
        "startDate": "2021-03-14",
        "endDate": "2021-04-03",
        "tactic": "Middle Mark",
        "discount": 0.295,
        "yLift": 1.413
    }
].sort( (a,b)=> (a.discount - b.discount));


const myTacticLegendLabels =
{
"Global":"Global",
"High Mark":"High Mark",
"Middle Mark":"Middle Mark",
"Low Mark":"Low Mark"
};

export {mydata, myTacticLegendLabels};

