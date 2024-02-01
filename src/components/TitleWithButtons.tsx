import {ReactElement} from 'react';

interface TitleWithButtonsProps {
    titles: ReactElement[]
    inputs: ReactElement[]
}
export const TitleWithButtons = ({titles, inputs}: TitleWithButtonsProps): ReactElement => {
	return (
		<span className="w-full flex flex-row gap-2 bg-white rounded-md">
			<span className="w-full flex flex-col p-2 justify-center">
				{titles}
			</span>
			<span className="w-full flex flex-col p-2 justify-center">
				{inputs}
			</span>
		</span>
	);
};
