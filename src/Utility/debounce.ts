export function debounceAPICall(callback: Function, delay: number) {
    let timeout: NodeJS.Timeout;
    return function(...args: Array<any>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    }
}