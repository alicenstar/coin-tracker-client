import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { NewTracker } from "./NewTracker";

describe("form tests", () => {
    test("When a user clicks the Create New Tracker Button, a form is displayed", () => {
        const handleButtonClick = () => {
            return true;
        };

        const { getByText, getByLabelText } = render(<NewTracker />);
        const newTrackerButton = getByText('+ Create New Tracker');
        fireEvent.click(newTrackerButton);
        const newTrackerField = getByLabelText("Enter a name for your tracker! (Optional)");
        expect(newTrackerField).not.toBeNull();
    });
});