/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React from 'react';
import { PDFViewer } from './PDFViewer';
import { text } from "@storybook/addon-knobs";
import { useTranslation } from '../../translation';
import i18n from "i18next";
import testPDF from "./static/test.pdf";

export default {
  title: 'Components/PDFViewer',
  component: PDFViewer
};

i18n.init({
  resources: {
    en: {
      translation: {
        "PDFViewer.iconDescription": "View PDF",
        "PDFViewer.zoomOut": "Zoom Out",
        "PDFViewer.zoomIn": "Zoom In",
        "PDFViewer.download": "Download File",

      },
    },
  },
  lng: 'en',
});

export const Default = () => {
  const { t } = useTranslation();
  return (
    <div style={{ width: '100%', height: '200px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
      <PDFViewer
        pdfURL={text('pdfURL', testPDF)}
        pdfTitle={text('pdfTitle', "PDF Title")}
        fileName={text('fileName','')}
        t={t}
      />
    </div>
  )
};
