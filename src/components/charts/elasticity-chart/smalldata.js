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
    }

].sort( (a,b)=> (a.discount - b.discount));

const myTacticLegendLabels =
  {
    "discount":"Elasticity",
    "Global":"Global",
    "Cents/Dollars Off - Without Vehicle":"Cents/Dollars Off - Without Vehicle",
    "Promoted Price - With Vehicle":"Promoted Price - With Vehicle",
    "Promoted Price - Without Vehicle":"Promoted Price - Without Vehicle"
  };

export {mydata, myTacticLegendLabels};
