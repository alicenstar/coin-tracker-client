import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

type ErrorSummaryProps<T> = {
    errors: FieldErrors<T>;
};

export function ErrorSummary<T>({ errors }: ErrorSummaryProps<T>) {
    if (Object.keys(errors).length === 0) {
        return null;
    }
    return (
        <div className="error-summary">
            {Object.keys(errors).map((fieldName) => (
                <ErrorMessage
                 errors={errors}
                 name={fieldName as any}
                 render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                        <p key={type}>{message}</p>
                    ))
                 }
                 key={fieldName}
                />
            ))}
        </div>
    );
};

type ErrorMessageContainerProps = {
    children?: React.ReactNode;
};

export const ErrorMessageContainer = ({ children }: ErrorMessageContainerProps) => (
    <span className="error">{children}</span>
);