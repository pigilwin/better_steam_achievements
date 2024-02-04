export const wait = (seconds: number): Promise<void> => {
	return new Promise((resolve) => window.setTimeout(resolve, seconds));
};

export const getJsonFromApiWithRetry = async <T>(url: string): Promise<T> => {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise<T>(async (resolve, reject) => {
		try {
			let response = await window.fetch(url);
			while (response.status === 429) {
				const secondsToWait = Number.parseInt(response.headers.get('Retry-After') ?? '0') * 1000;
				await wait(secondsToWait);
				response = await window.fetch(url);
			}
			if (response.ok) {
				resolve(await response.json());
			}
			reject('Failed to load api');
		} catch (e) {
			reject('Failed to load api');
		}
	});
};

/**
 * Calculate the percentage of how much the `value` is of the `totalValue`.
 * This will floor the output.
 *
 * @param {number} value
 * @param {number} totalValue
 * @return {number}
 */
export const percentage = (value: number, totalValue: number): number => {
	return Math.floor((100 * value) / totalValue);
};