export const wait = (seconds: number): Promise<void> => {
    return new Promise((resolve) => window.setTimeout(resolve, seconds));
};

export const getJsonFromApiWithRetry = async <T>(url: string): Promise<T> => {
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
