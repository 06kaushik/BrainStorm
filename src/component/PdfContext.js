// PdfContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PdfContext = createContext();

export const PdfProvider = ({ children }) => {
    const [openPdf, setOpenPdf] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);

    const getSingleData = async (itemId) => {
        try {
            const rsp = await axios.get(`/learner/getCourseDetailByCourseId/${itemId}`);
            const updatedOpenPdf = rsp?.data?.data[0].subFolderData.map((item) => ({
                ...item,
                count: 0, // Initialize count to 0 for each item
            }));
            setOpenPdf(updatedOpenPdf);
        } catch (error) {
            console.log('error from single', error.response);
        }
    };

    useEffect(() => {
        getSingleData(itemId);
    }, [itemId]);

    const updatePdfItem = (index, status) => {
        const updatedOpenPdf = [...openPdf];
        const clickedItem = updatedOpenPdf[index];

        if (!completedItems.includes(clickedItem.pdfUrl)) {
            // Update the status and progress only if it's the first time
            if (!clickedItem.status) {
                updatedOpenPdf[index] = {
                    ...clickedItem,
                    status,
                    progress: 1,
                    count: clickedItem.count + 1, // Increase the count by 1
                };
                setOpenPdf(updatedOpenPdf);

                // Add the item to the completed items list
                setCompletedItems([...completedItems, clickedItem.pdfUrl]);
            }
        }
    };

    return (
        <PdfContext.Provider value={{ openPdf, updatePdfItem }}>
            {children}
        </PdfContext.Provider>
    );
};

export default PdfContext;
