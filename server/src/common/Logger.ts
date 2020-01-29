import * as moment from 'moment';

export default class Logger {

    public static time = moment().format('DD-MM-YY HH:IIa')
    public static nectar = "[" + moment().format('DD-MM-YY hh:mma') + "]" + "[NECTAR]"
    public static log(message: string): void {
        console.log(this.nectar + ' ' + message);
    }

    public static imp(message: string): void {
        console.log(this.nectar + '[IMPORTANT] ' + message);
    }

    public static error(message: string): void {
        console.log(this.nectar + '[ERROR] ' + message);
    }

    public static user(message: string): void {
        console.log(this.nectar + '[USER]' + message);
    }
}