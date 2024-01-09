import { MouseEventHandler, forwardRef } from "react";

interface ButtonProps {
    buttonText: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({buttonText, disabled, onClick}, ref): JSX.Element => {
    return (
        <button
            ref={ref}
            disabled={disabled}
            className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100"
            onClick={onClick}
        >{buttonText}</button>
    );
});