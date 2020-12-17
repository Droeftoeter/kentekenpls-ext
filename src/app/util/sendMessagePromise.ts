export default function sendMessagePromise<T>(message: any): Promise<T> {
    return new Promise(
        (resolve, reject) => {
            chrome.runtime.sendMessage(
                undefined,
                message,
                response => {
                    if (response.resolved) {
                        resolve(response.resolved);
                    } else {
                        reject(response.error || 'Error occurred');
                    }
                }
            );
        }
    );
}
