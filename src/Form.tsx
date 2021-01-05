import React from "react";


export interface IValues {
    [key: string]: any;
}

export interface IErrors {
    [key: string]: string[];
}

export interface IFormState {
    errors: IErrors;
    submitted: boolean;
    submitting: boolean;
    values: IValues | undefined;
    visibilityClass: string;
}

interface ISubmitResult {
    success: boolean;
    errors?: IErrors;
}

interface IFormProps {
    action: string;
    defaultValues?: IValues;
    submitButtonText?: string;
    onSubmit?: (values: IValues) => Promise<ISubmitResult>;
    render: () => React.ReactNode;
}


export class Form extends React.Component<IFormProps, IFormState> {
    public constructor(props: IFormProps) {
        super(props);
        const errors: IErrors = {};
        if (props.defaultValues) {
            Object.keys(props.defaultValues).forEach(fieldName => {
                errors[fieldName] = [];
            });
        }
        this.state = {
            errors,
            submitted: false,
            submitting: false,
            values: props.defaultValues,
            visibilityClass: "alert hidden"
        };
    }

    private haveErrors(errors: IErrors) {
        let haveError: boolean = false;
        Object.keys(errors).forEach((key: string) => {
            if (errors[key].length > 0) {
                haveError = true;
            }
        });
        return haveError;
    }


    private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({ submitting: true });
            const result = await this.submitForm();
            this.setState({
                // errors: result.errors || {},
                submitted: result,
                submitting: false,
                visibilityClass: "alert"
            });
        }
    };



    private validateForm(): boolean {
        const errors: IErrors = {};
        let haveError: boolean = false;
        // if (this.props.defaultValues) {
        //     Object.keys(this.props.defaultValues).forEach(fieldName => {
        //         errors[fieldName] = this.validateForm(
        //             fieldName,
        //             this.state.values[fieldName]
        //         );
        //         if (errors[fieldName].length > 0) {
        //             haveError = true;
        //         }
        //     })
        // }

        this.setState({ errors });
        return !haveError;
    }

    private async submitForm(): Promise<boolean> {
        return true;
    }


    public render() {
        const { submitted, errors, visibilityClass } = this.state;
        return (
            <form onSubmit={this.handleSubmit} noValidate={true}>
                <div className="form-container">

                    {this.props.render()}

                    <div className="form-group">
                        <button
                         type="submit"
                         className="submit-button"
                         disabled={this.haveErrors(errors)}
                        >
                            {this.props.submitButtonText}
                        </button>
                    </div>
                    <div
                     className={visibilityClass}
                     role="alert"
                    >
                        {this.state.submitted && "The form was successfully submitted!"}
                        {submitted === false &&
                            !this.haveErrors(errors) &&
                                "Sorry, an unexpected error has occurred."
                        }
                        {submitted === false &&
                            this.haveErrors(errors) &&
                                "Sorry, the form is invalid. Please try again."
                        }
                    </div>
                    
                </div>
            </form>
        )
    }
}