/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';
import PagerControl from "../pager-control";
import LabeledDataSet from "../labeled-data-set";
import ElevenTooltip from "../eleven-tooltip";
import {Link} from "@carbon/react";
import settings from "../../settings.js";

const {prefix} = settings;

export const AnalyticalCard = (
  {
    totalPages,
    currentPage,
    valueIndicator,
    linkLabel,
    linkUrl,
    onLinkClick,
    primaryData,
    secondaryData,
    onNextPage,
    onPreviousPage,
    ofLabel,
    ...props
  }
) => {

  return (
    <div className={`${prefix}--analytical-card`}>
      <div className={"two-column align-vertically"}>
        {(linkLabel && (
          onLinkClick || linkUrl
        ) && <div style={{maxWidth:"200px"}}><ElevenTooltip text={linkLabel} align={"right"}><Link onClick={onLinkClick} href={linkUrl}> {linkLabel}</Link></ElevenTooltip></div>)
        ||
        linkLabel
        }
        {currentPage && totalPages &&
        <PagerControl
          totalPages={totalPages}
          currentPage={currentPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          ofLabel={ofLabel}
        />
        }
      </div>
      <div className={"two-column gap-40"}>
        <div className={"rows"}>
          <LabeledDataSet data={primaryData} />
        </div>
        <div>{valueIndicator}</div>
      </div>
      {secondaryData &&
      <LabeledDataSet data={secondaryData}/>
      }
    </div>
  );
};

AnalyticalCard.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  valueIndicator: PropTypes.object,
  linkLabel: PropTypes.string,
  linkUrl: PropTypes.string,
  onLinkClick: PropTypes.func,
  // data sits to the left of the value indicator
  primaryData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    format: PropTypes.string, // number, string, currency
  })),
  // data sits below the primary data AND value indicator
  secondaryData: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    format: PropTypes.string, // number, string, currency
  })),
  onNextPage: PropTypes.func,
  onPreviousPage: PropTypes.func,
  ofLabel:PropTypes.string
}

AnalyticalCard.defaultProps = {
  totalPages: null,
  currentPage: null,
  valueIndicator: null,
  linkLabel: null,
  linkUrl: null,
  onLinkClick: null,
  // data sits to the left of the value indicator
  primaryData: null,
  // data sits below the primary data AND value indicator
  secondaryData: null,
  onNextPage: null,
  onPreviousPage: null,
  ofLabel:"of"
}
