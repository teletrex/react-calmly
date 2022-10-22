/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Download, ZoomIn, ZoomOut } from '@carbon/icons-react';
import { Button, ComposedModal, ModalHeader } from "@carbon/react";


const PDFIcon = () => <svg id="icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <title>document--pdf</title>
    <polygon points="30 18 30 16 24 16 24 26 26 26 26 22 29 22 29 20 26 20 26 18 30 18" />
    <path d="M19,26H15V16h4a3.0033,3.0033,0,0,1,3,3v4A3.0033,3.0033,0,0,1,19,26Zm-2-2h2a1.0011,1.0011,0,0,0,1-1V19a1.0011,1.0011,0,0,0-1-1H17Z" />
    <path d="M11,16H6V26H8V23h3a2.0027,2.0027,0,0,0,2-2V18A2.0023,2.0023,0,0,0,11,16ZM8,21V18h3l.001,3Z" />
    <path d="M22,14V10a.9092.9092,0,0,0-.3-.7l-7-7A.9087.9087,0,0,0,14,2H4A2.0059,2.0059,0,0,0,2,4V28a2,2,0,0,0,2,2H20V28H4V4h8v6a2.0059,2.0059,0,0,0,2,2h6v2Zm-8-4V4.4L19.6,10Z" />
    <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" style={{ fill: 'none' }} width="32" height="32" />
</svg>



export const PDFViewer = ({ t, pdfTitle, pdfURL, fileName }) => {
    const [open, setOpen] = useState(false);
    const [zoom, setZoom] = useState(0);

    return (
        <>
            <Button
                renderIcon={() => <PDFIcon />}
                hasIconOnly
                kind="ghost"
                iconDescription={t("PDFViewer.iconDescription")}
                tooltipAlignment="center"
                tooltipPosition="top"
                style={{ padding: 0 }}
                onClick={() => setOpen(true)}
            >
            </Button>
            <ComposedModal
                onClose={() => setOpen(false)}
                size="lg"
                open={open}
                className="bx--pdf-modal"
            >
                <ModalHeader
                    className="bx--pdf-modal-header"
                    title={pdfTitle}
                />
                <div className="bx--pdf-modal-body">
                    <div className="pdf" style={{ width: `${10 * zoom + 100}%`, height: `${10 * zoom + 100}%` }} >
                        <iframe
                            src={`${pdfURL}#toolbar=0&navpanes=0&scrollbar=0&view=fitH`}
                            frameBorder="0"
                            scrolling="no"
                        />
                    </div>

                </div>
                <div className="bx--pdf-modal-tools" >
                    <div className="container">
                        <Button
                            renderIcon={() => <ZoomOut size={24} />}
                            hasIconOnly
                            className="tools"
                            iconDescription={t("PDFViewer.zoomOut")}
                            tooltipAlignment="center"
                            tooltipPosition="top"
                            onClick={() => setZoom(Math.max(zoom - 1, 0))}
                        />
                        <Button
                            renderIcon={() => <ZoomIn size={24} />}
                            hasIconOnly
                            className="tools"
                            iconDescription={t("PDFViewer.zoomIn")}
                            tooltipAlignment="center"
                            tooltipPosition="top"
                            onClick={() => setZoom(Math.min(zoom + 1, 5))}
                        />
                        <a href={pdfURL} target="_blank" download={fileName ? `${fileName}.pdf` : true}>
                            <Button
                                renderIcon={() => <Download size={24} />}
                                hasIconOnly
                                className="tools"
                                iconDescription={t("PDFViewer.download")}
                                tooltipAlignment="center"
                                tooltipPosition="top"
                            />
                        </a>
                    </div>
                </div>
            </ComposedModal>
        </>
    )
}




PDFViewer.propTypes = {
    pdfURL: PropTypes.string.isRequired,
    pdfTitle: PropTypes.string.isRequired,
    fileName: PropTypes.string
}


