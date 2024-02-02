import {ReactElement} from 'react';

interface TitleWithButtonsProps {
    titles: ReactElement[];
    inputs: ReactElement[];
	columnForTitles: boolean;
	columnForInputs: boolean;
}
export const TitleWithButtons = ({titles, inputs, columnForInputs, columnForTitles}: TitleWithButtonsProps): ReactElement => {
	const titleClasses = ['w-full', 'flex', 'p-2', 'justify-center'];
	if (columnForTitles) {
		titleClasses.push('flex-col');
	} else {
		titleClasses.push('flex-row');
	}

	const inputClasses = ['w-full', 'flex', 'p-2', 'justify-center'];
	if (columnForInputs) {
		inputClasses.push('flex-col');
	} else {
		inputClasses.push('flex-row');
	}

	return (
		<span className="w-full flex flex-row gap-2 bg-white rounded-md">
			<span className={titleClasses.join(' ')}>
				{titles}
			</span>
			<span className={inputClasses.join(' ')}>
				{inputs}
			</span>
		</span>
	);
};
