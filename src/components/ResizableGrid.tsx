import {ChangeEventHandler, ReactElement} from 'react';
import {Range} from '@components/Inputs';

interface GridProps {
    elements: ReactElement[],
    howManyToShow: number
}

export const ResizableGrid = ({elements, howManyToShow}: GridProps): ReactElement => {
	const possibleClasses: Record<number, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
		7: 'grid-cols-7',
		8: 'grid-cols-8',
		9: 'grid-cols-9',
		10: 'grid-cols-10',
		11: 'grid-cols-11',
		12: 'grid-cols-12'
	};

	const gridClasses: string[] = [
		'bg-white',
		'w-full',
		'p-2',
		'rounded-md',
		'grid',
		possibleClasses[howManyToShow],
		'gap-4'
	];

	return (
		<article className={gridClasses.join(' ')}>
			{elements}
		</article>
	);
};

interface ResizableGridToggleSwitchProps {
	howManyToShow: number,
	onChange: ChangeEventHandler<HTMLInputElement>,
}
export const ResizableGridToggleSwitch = ({howManyToShow, onChange}: ResizableGridToggleSwitchProps): ReactElement => {
	return (
		<Range
			column={false}
			label="How many columns to show?"
			onChange={onChange}
			id="games-per-row"
			value={howManyToShow}
			min={1}
			max={5}
		/>
	);
};
