/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */


// import  React from 'react';

import settings from './settings';

import {CheckboxTree} from "./components/checkbox-tree";
import {LazyLoadCheckboxTree} from "./components/checkbox-tree";

import AnalyticalCard from "./components/analytical-card";

import { translationResources } from './i18n';

// charts
import ElasticityChart from "./components/charts/elasticity-chart";
import MultiLineChart from "./components/charts/multiline-chart";
import MagicWidgetGrid from "./components/widget/MagicWidgetGrid";
import DirectedGraphChart from "./components/charts/directed-graph-chart";
import HaloChart from "./components/charts/halo-chart";
import ClickTooltip from "./components/charts/components/ClickTooltip";

// controls
import MultiSelectComboBox from "./components/multi-select-combo-box";
import PagerControl from "./components/pager-control";

// summary components
import ValueIndicatorWithBarCharts from "./components/value-indicator-with-bar-charts/ValueIndicatorWithBarCharts";

// grid
import MagicTable from "./components/magic-table/MagicTable";
import FlexibleColumnHeader from "./components/magic-table/flexible-column-header";
import TableSearch from "./components/magic-table/TableSearch";
import HeaderRowSelector from "./components/magic-table/HeaderRowSelector";
import RowSelector from "./components/magic-table/RowSelector";

// grid-configurator
import TableConfigurator from "./components/table-configurator/TableConfigurator";
import TableConfiguratorModal from "./components/table-configurator/TableConfiguratorModal";
import useUserReportPrefService from "./components/table-configurator/useUserReportPrefService";
import useTableFormatters from "./components/magic-table/useTableFormatters";

//tooltips
import ElevenTooltip from "./components/eleven-tooltip";
import HoverPopup from "./components/hover-popup";


// cells
import CheckmarkCell from "./components/magic-table/cells/CheckmarkCell";
import CurrencyCell from "./components/magic-table/cells/CurrencyCell";
import NumberCell from "./components/magic-table/cells/NumberCell";
import OpportunityCell from "./components/magic-table/cells/OpportunityCell";
import PercentCell from "./components/magic-table/cells/PercentCell";
import TagCell from "./components/magic-table/cells/TagCell";
import TextCell from "./components/magic-table/cells/TextCell";
import PercentileIndicator from "./components/percentile-indicator";
import OpportunityRankTooltip from "./components/magic-table/cells/OpportunityRankTooltip";
import BiLevelPercentileIndicator from "./components/bi-level-percentile-indicator";

// editors

import CheckboxEditor from "./components/magic-table/editors/CheckboxEditor";
import DateInputEditor from "./components/magic-table/editors/DateInputEditor";
import TextInputEditor from "./components/magic-table/editors/TextInputEditor";
import SystemSelectEditor from "./components/magic-table/editors/SystemSelectEditor";
import SelectEditor from "./components/magic-table/editors/SelectEditor";
import ComboSelectEditor from "./components/magic-table/editors/ComboSelectEditor";

// sorting
import {sortingObjToString, sortingStringToObj, useSortRowsByColumn, useSortColumn} from "./components/sorting"

// dropdowns
import ElevenDropDown from "./components/hover-better-dropdown/HoverBetterDropDown";
import ComboButton from "./components/combo-button/ComboButton";

// components
import TeleTrexLogo from "./components/logo/TeleTrexLogo";
import LabeledData from "./components/labeled-data";
import LabeledDataSet from "./components/labeled-data-set";
import ValidationMessages from "./components/validation-messages";
import CheckboxIndicator from "./components/checkbox-indicator";
import Text from './components/text';
import HR from './components/hr';
import {H1, H2, H3, H4,H5,H6 } from './components/heading';

//progressindicator
import {
  ProgressIndicator,
  ProgressIndicatorSkeleton,
  ProgressStep,
  VerticalProgressIndicator,
} from './components/progress-indicator';

// progress bar
import ProgressBar from './components/progress-bar/ProgressBar';

// containers
import FlexBox from './containers/FlexBox';

// example data
import {mydata, myconfig} from "./components/magic-table/smalltable.js";

import PDFViewer from "./components/pdf-viewer";

export {
  settings,
  FlexBox,
  ValueIndicatorWithBarCharts,
  CheckboxTree,
  LazyLoadCheckboxTree,
  //InlineCheckbox,
  MultiSelectComboBox,
  MagicTable,
  ElevenDropDown,
  ComboButton,
  mydata,
  myconfig,
  FlexibleColumnHeader,
  Text,
  H1,H2,H3,H4,H5,H6,
  HR,
  TableSearch,
  HeaderRowSelector,
  RowSelector,
  TableConfigurator,
  TableConfiguratorModal,
  useUserReportPrefService,
  useTableFormatters,
  sortingObjToString,
  sortingStringToObj,
  useSortRowsByColumn,
  useSortColumn,
  ElevenTooltip,
  CheckmarkCell,
  CurrencyCell,
  NumberCell,
  OpportunityCell,
  PercentCell,
  TagCell,
  TextCell,
  PercentileIndicator,
  OpportunityRankTooltip,
  BiLevelPercentileIndicator,
  CheckboxEditor,
  DateInputEditor,
  TextInputEditor,
  SystemSelectEditor,
  SelectEditor,
  ComboSelectEditor,
  TeleTrexLogo,
  ProgressIndicator,
  ProgressIndicatorSkeleton,
  ProgressStep,
  VerticalProgressIndicator,
  LabeledData,
  ElasticityChart,
  MultiLineChart,
  DirectedGraphChart,
  HaloChart,
  ValidationMessages,
  AnalyticalCard,
  ClickTooltip,
  LabeledDataSet,
  PagerControl,
  CheckboxIndicator,
  MagicWidgetGrid,
  PDFViewer,
  ProgressBar,
  HoverPopup
};
