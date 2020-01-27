export default class Logger {

    public static start(message: string): void {
        console.log(message);
    }

    public static imp(message: string): void {
        console.log('[IMPORTANT] ' + message);
    }
    public static error(message: string): void {
        console.log('[ERROR] ' + message);
    }
}