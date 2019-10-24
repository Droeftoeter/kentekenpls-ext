/**
 * Turns sendMessage into a promise
 * 
 * @param {*} message 
 */
export default function sendMessagePromise(message) {
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