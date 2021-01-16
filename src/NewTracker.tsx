import React, { useState } from "react";
import { NewTrackerForm } from './NewTrackerForm';

export const NewTracker: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(true);

    const handleCloseClick = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
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