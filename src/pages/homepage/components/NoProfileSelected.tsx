import {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';

export const NoProfileSelected = (): ReactElement => {
	const navigate = useNavigate();
	const handler = () => {
		navigate('/profiles');
	};

	const link = <a onClick={handler} className="text-blue-300 cursor-pointer">please select a profile</a>;

	return (
		<article className="flex flex-row justify-center bg-white w-full p-2 rounded-md">
			<h2 className="text-xl">No profile has been selected, {link}</h2>
		</article>
	);
};
