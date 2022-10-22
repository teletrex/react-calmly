/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import PropTypes from 'prop-types';

import { colorsMap } from '../../guidelines/Theme/colors';  // TODO: proper color map not in guidelines.

export const GenericStatusIconShape = ({ fill, size, className, children }) => (
  <svg className={className} height={size} viewBox="0 0 10 10" width={size}>
    {children}
    <circle cx={5} cy={5} fill={fill} r={5} />
  </svg>
);

GenericStatusIconShape.propTypes = {
  children: PropTypes.node,
  fill: PropTypes.string,
  size: PropTypes.number,
};

GenericStatusIconShape.defaultProps = {
  children: null,
  fill: '#29AB87',
  size: 10,
};

export const DraftIcon = ({ fill = 'none', stroke = '#5A5D77', size = 10, className }) => (
  <svg className={className} height={size} viewBox="0 0 10 10" width={size}>
    <circle cx={5} cy={5} fill={fill} r={4.2} stroke={stroke} strokeWidth={1.5} />
  </svg>
);

DraftIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
  stroke: PropTypes.string,
};

DraftIcon.defaultProps = {
  fill: 'none',
  size: 10,
  stroke: '#5A5D77',
};

export const CancelledIcon = ({ fill = '#CE0110', size = 10, className }) => (
  <svg className={className} height={size} viewBox="0 0 10 10" width={size}>
    <circle cx="5" cy="5" fill={fill} r={5} />
    <line
      stroke="#ffffff"
      strokeLinecap="round"
      strokeWidth="2"
      x1="3.5"
      x2="6.5"
      y1="3.5"
      y2="6.5"
    />
  </svg>
);

CancelledIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

CancelledIcon.defaultProps = {
  fill: '#CE0110',
  size: 10,
};

export const ScheduledIcon = ({ fill = '#FF8C2A', size = 10, className }) => (
  <svg className={className} height={size} viewBox="0 0 10 10" width={size}>
    <circle cx="5" cy="5" fill={fill} r={5} />
    <path
      d="M 4.7,2 L 4.7,5 L 7,7"
      fill="none"
      stroke="#ffffff"
      strokeLinecap="round"
      strokeWidth={1.5}
    />
  </svg>
);

ScheduledIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

ScheduledIcon.defaultProps = {
  fill: '#FF8C2A',
  size: 10,
};

export const ProgressIcon = ({ stroke = '#0292D4', fill = 'none', size = 10, className }) => (
  <svg className={className} height={size} viewBox="0 0 10 10" width={size}>
    <circle cx="5" cy="5" fill={fill} r={4.2} stroke={stroke} strokeWidth={1.5} />
    <circle cx="5" cy="5" fill={stroke} r={2} />
  </svg>
);

ProgressIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
  stroke: PropTypes.string,
};

ProgressIcon.defaultProps = {
  fill: 'none',
  size: 10,
  stroke: '#0292D4',
};

export const CompleteIcon = ({ fill, size = 10, className }) => (
  <svg className={className} height={size} viewBox="0 0 10 10" width={size}>
    <g>
      <circle cx="5" cy="5" fill={fill} r="5" />
      <path
        d="M7.26241838,2.25 L8.35843389,3.34601551 L3.9390165,7.76543289 L3.937,7.763 L3.93041937,7.77093389 L1.65,5.49051452 L2.74601551,4.39449901 L3.932,5.58 L7.26241838,2.25 Z"
        fill="#FFFFFF"
      />
    </g>
  </svg>
);

CompleteIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
};

CompleteIcon.defaultProps = {
  fill: '#29AB87',
  size: 10,
};

export const RoutineIcon = ({ size = 10, className }) => (
  <svg className={className} height={size} viewBox="0 0 12 12" width={size}>
    <g>
      <path
        d="M9.75,2.25 L2.18625,2.25 L3.52875,0.90375 L3,0.375 L0.75,2.625 L3,4.875 L3.52875,4.34625 L2.18625,3 L9.75,3 L9.75,5.625 L10.5,5.625 L10.5,3 C10.5,2.58578644 10.1642136,2.25 9.75,2.25 Z M8.47125,7.65375 L9.81375,9 L2.25,9 L2.25,6.375 L1.5,6.375 L1.5,9 C1.5,9.41421356 1.83578644,9.75 2.25,9.75 L9.81375,9.75 L8.47125,11.09625 L9,11.625 L11.25,9.375 L9,7.125 L8.47125,7.65375 Z"
        fill="#000000"
      />
    </g>
  </svg>
);

RoutineIcon.propTypes = {
  size: PropTypes.number,
};

RoutineIcon.defaultProps = {
  size: 10,
};

export const EventIcon = ({ size = 10, className }) => (
  <svg className={className} height={size} viewBox="0 0 12 12" width={size}>
    <g>
      <path
        d="M6,11.25 C3.10050506,11.25 0.75,8.89949494 0.75,6 C0.75,3.10050506 3.10050506,0.75 6,0.75 C8.89949494,0.75 11.25,3.10050506 11.25,6 C11.25,8.89949494 8.89949494,11.25 6,11.25 L6,11.25 Z M6,1.5 C3.51471863,1.5 1.5,3.51471863 1.5,6 C1.5,8.48528137 3.51471863,10.5 6,10.5 C8.48528137,10.5 10.5,8.48528137 10.5,6 C10.5,3.51471863 8.48528137,1.5 6,1.5 Z M7.72125,8.25 L5.625,6.15375 L5.625,2.625 L6.375,2.625 L6.375,5.8425 L8.25,7.72125 L7.72125,8.25 Z"
        fill="#000000"
      />
    </g>
  </svg>
);

EventIcon.propTypes = {
  size: PropTypes.number,
};

EventIcon.defaultProps = {
  size: 10,
};

const ApprovedIcon = ({ size, className }) => (
  <svg className={className} height={size} viewBox="0 0 10 10" width={size}>
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g fill="#5A5D77" transform="translate(-174.000000, -178.000000)">
        <g transform="translate(171.000000, 103.000000)">
          <g transform="translate(0.000000, 72.000000)">
            <path d="M8,3 C10.7614237,3 13,5.23857625 13,8 C13,10.7614237 10.7614237,13 8,13 C5.23857625,13 3,10.7614237 3,8 C3,5.23857625 5.23857625,3 8,3 Z M8,4 C5.790861,4 4,5.790861 4,8 C4,10.209139 5.790861,12 8,12 C10.209139,12 12,10.209139 12,8 C12,5.790861 10.209139,4 8,4 Z M10.863961,6.12132034 C11.2544853,6.51184464 11.2544853,7.14500961 10.863961,7.53553391 L8.03553391,10.363961 C7.64500961,10.7544853 7.01184464,10.7544853 6.62132034,10.363961 L5.20710678,8.94974747 C4.81658249,8.55922318 4.81658249,7.9260582 5.20710678,7.53553391 C5.59763107,7.14500961 6.23079605,7.14500961 6.62132034,7.53553391 L7.32842712,8.24264069 L9.44974747,6.12132034 C9.84027176,5.73079605 10.4734367,5.73079605 10.863961,6.12132034 Z" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

ApprovedIcon.propTypes = {
  size: PropTypes.number,
};

ApprovedIcon.defaultProps = {
  size: 10,
};

export const DisabledXS = ({ className }) => (
  <GenericStatusIconShape className={className} fill={colorsMap['$disabled-02']} size={6} />
);

export const DisabledS = ({ className }) => (
  <GenericStatusIconShape className={className} fill={colorsMap['$disabled-02']} size={8} />
);

export const DisabledM = ({ className }) => (
  <GenericStatusIconShape className={className} fill={colorsMap['$disabled-02']} size={10} />
);

export const DisabledL = ({ className }) => (
  <GenericStatusIconShape className={className} fill={colorsMap['$disabled-02']} size={12} />
);

export const SuccessXS = ({ className }) => (
  <GenericStatusIconShape className={className} size={6} />
);

export const SuccessS = ({ className }) => (
  <GenericStatusIconShape className={className} size={8} />
);

export const SuccessM = ({ className }) => (
  <GenericStatusIconShape className={className} size={10} />
);

export const SuccessL = ({ className }) => (
  <GenericStatusIconShape className={className} size={12} />
);

export const EnabledXS = SuccessXS;

export const EnabledS = SuccessS;

export const EnabledM = SuccessM;

export const EnabledL = SuccessL;

export const ApprovedXS = ({ className }) => <ApprovedIcon className={className} size={6} />;

export const ApprovedS = ({ className }) => <ApprovedIcon className={className} size={8} />;

export const ApprovedM = ({ className }) => <ApprovedIcon className={className} size={10} />;

export const ApprovedL = ({ className }) => <ApprovedIcon className={className} size={12} />;

export const PausedXS = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#FF8C2A" size={6} />
);

export const PausedS = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#FF8C2A" size={8} />
);

export const PausedM = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#FF8C2A" size={10} />
);

export const PausedL = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#FF8C2A" size={12} />
);

export const PendingXS = ({ className }) => <ScheduledIcon className={className} size={6} />;

export const PendingS = ({ className }) => <ScheduledIcon className={className} size={8} />;

export const PendingM = ({ className }) => <ScheduledIcon className={className} size={10} />;

export const PendingL = ({ className }) => <ScheduledIcon className={className} size={12} />;

export const ScheduledXS = PendingXS;

export const ScheduledS = PendingS;

export const ScheduledM = PendingM;

export const ScheduledL = PendingL;

export const FailedXS = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#CE0110" size={6} />
);

export const FailedS = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#CE0110" size={8} />
);

export const FailedM = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#CE0110" size={10} />
);
export const FailedL = ({ className }) => (
  <GenericStatusIconShape className={className} fill="#CE0110" size={12} />
);

export const CancelledXS = ({ className }) => <CancelledIcon className={className} size={6} />;

export const CancelledS = ({ className }) => <CancelledIcon className={className} size={8} />;

export const CancelledM = ({ className }) => <CancelledIcon className={className} size={10} />;

export const CancelledL = ({ className }) => <CancelledIcon className={className} size={12} />;

export const RetiredXS = CancelledXS;

export const RetiredS = CancelledS;

export const RetiredM = CancelledL;

export const RetiredL = CancelledL;

export const InprogressXS = ({ className }) => <ProgressIcon className={className} size={6} />;

export const InprogressS = ({ className }) => <ProgressIcon className={className} size={8} />;

export const InprogressM = ({ className }) => <ProgressIcon className={className} size={10} />;

export const InprogressL = ({ className }) => <ProgressIcon className={className} size={12} />;

export const DraftXS = ({ className }) => <DraftIcon className={className} size={6} />;

export const DraftS = ({ className }) => <DraftIcon className={className} size={8} />;

export const DraftM = ({ className }) => <DraftIcon className={className} size={10} />;

export const DraftL = ({ className }) => <DraftIcon className={className} size={12} />;

export const CompleteXS = ({ className }) => (
  <CompleteIcon className={className} fill={colorsMap['$interactive-04']} size={6} />
);

export const CompleteS = ({ className }) => (
  <CompleteIcon className={className} fill={colorsMap['$interactive-04']} size={8} />
);

export const CompleteM = ({ className }) => (
  <CompleteIcon className={className} fill={colorsMap['$interactive-04']} size={10} />
);

export const CompleteL = ({ className }) => (
  <CompleteIcon className={className} fill={colorsMap['$interactive-04']} size={12} />
);

export const PublishedXS = CompleteXS;

export const PublishedS = CompleteS;

export const PublishedM = CompleteM;

export const PublishedL = CompleteL;

export const RoutineXS = ({ className }) => (
  <RoutineIcon className={className} fill={colorsMap['$interactive-04']} size={6} />
);

export const RoutineS = ({ className }) => (
  <RoutineIcon className={className} fill={colorsMap['$interactive-04']} size={8} />
);

export const RoutineM = ({ className }) => (
  <RoutineIcon className={className} fill={colorsMap['$interactive-04']} size={10} />
);

export const RoutineL = ({ className }) => (
  <RoutineIcon className={className} fill={colorsMap['$interactive-04']} size={12} />
);

export const EventXS = ({ className }) => (
  <EventIcon className={className} fill={colorsMap['$interactive-04']} size={6} />
);

export const EventS = ({ className }) => (
  <EventIcon className={className} fill={colorsMap['$interactive-04']} size={8} />
);

export const EventM = ({ className }) => (
  <EventIcon className={className} fill={colorsMap['$interactive-04']} size={10} />
);

export const EventL = ({ className }) => (
  <EventIcon className={className} fill={colorsMap['$interactive-04']} size={12} />
);
