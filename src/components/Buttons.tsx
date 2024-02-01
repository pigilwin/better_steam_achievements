import {MouseEventHandler, ReactElement} from 'react';

interface ButtonProps {
    buttonText: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
}
export const BlueButton = ({buttonText, disabled, onClick}: ButtonProps): ReactElement => {
	return (
		<CustomButton color="bg-blue-600" buttonText={buttonText} onClick={onClick} disabled={disabled}/>
	);
};

export const GreenButton = ({buttonText, disabled, onClick}: ButtonProps): ReactElement => {
	return (
		<CustomButton color="bg-green-600" buttonText={buttonText} onClick={onClick} disabled={disabled}/>
	);
};

export const RedButton = ({buttonText, disabled, onClick}: ButtonProps): ReactElement => {
	return (
		<CustomButton color="bg-red-600" buttonText={buttonText} onClick={onClick} disabled={disabled}/>
	);
};

interface ColouredButtonProps extends ButtonProps {
    color: string;
}
const CustomButton = ({color, buttonText, disabled, onClick}: ColouredButtonProps) => {
	const classes = ['text-gray-200', 'p-2', 'rounded'];
	classes.push(color);
	return (
		<button
			disabled={disabled}
			className={classes.join(' ')}
			onClick={onClick}
		>{buttonText}</button>
	);
};
