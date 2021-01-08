import React, { useState } from "react";
// import { CreateNewTrackerForm } from "./CreateNewTrackerForm";
import { NewTrackerForm } from './NewTrackerForm';

export const NewTracker: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
        setModalOpen(true);
    };

    const handleCloseClick = () => {
        setModalOpen(false);
    };

    // const TrackerForm: React.FC = () => {
    //     return (
    //         <div id="new-tracker-form">
    //             <button className="close" onClick={handleCloseClick}>
    //                 <img
    //                  src="x.svg"
    //                  alt="Close New Tracker Form"
    //                  height="22px"
    //                  width="22px"
    //                 />
    //             </button>
    //             <CreateNewTrackerForm />
    //         </div>
    //     );
    // };

    return (
        <React.Fragment>
            <button id="new-tracker-button" onClick={handleButtonClick}>
                + Create New Tracker
            </button>
            {modalOpen && (
                <div id="modal-container">
                    <div id="new-tracker-form">
                        <button className="close" onClick={handleCloseClick}>
                            <img
                            src="x.svg"
                            alt="Close New Tracker Form"
                            height="22px"
                            width="22px"
                            />
                        </button>
                        <NewTrackerForm />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};