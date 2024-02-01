import {ReactElement, useEffect, useState} from 'react';
import {RedButton} from '@components/Buttons';
import {Spinner} from '@components/icons';

enum ApiConnectionCheckerStates {
    notConnected,
    checking,
    connected
}

export const ApiConnectionChecker = (): ReactElement => {
	const [
		apiConnectionState,
		setApiConnectionState
	] = useState<ApiConnectionCheckerStates>(ApiConnectionCheckerStates.notConnected);

	const checkIfApiIsUp = async () => {
		try {
			await window.fetch(import.meta.env.VITE_API_URL, {
				method: 'HEAD'
			});
			return ApiConnectionCheckerStates.connected;
		} catch (e) {
			return ApiConnectionCheckerStates.notConnected;
		}
	};

	useEffect(() => {
		checkIfApiIsUp().then((res) => {
			setApiConnectionState(res);
		});
	}, [apiConnectionState]);

	const children: ReactElement[] = [];
	if (apiConnectionState === ApiConnectionCheckerStates.connected) {
		children.push(
			<span key="success" className="flex justify-center items-center gap-4 border border-green-500 text-black rounded-md p-2">
                API connection successful
			</span>
		);
	} else if (apiConnectionState === ApiConnectionCheckerStates.checking) {
		children.push(
			<span key="warning" className="flex justify-center items-center gap-4 border border-yellow-500 text-black rounded-md p-2">
                API connection checking
				<Spinner/>
			</span>
		);
	} else {
		const checkAgainHandler = () => {
			setApiConnectionState(ApiConnectionCheckerStates.checking);
		};

		children.push(
			<span key="failure" className="flex justify-center items-center gap-4 border border-red-500 text-black rounded-md p-2">
                API connection not working
				<RedButton buttonText="Check again" onClick={checkAgainHandler}/>
			</span>
		);
	}

	return (
		<span className="w-full flex flex-row justify-center items-center h-full gap-3">
			{children}
		</span>
	);
};
