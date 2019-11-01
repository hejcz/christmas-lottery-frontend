export class Gift {
    constructor(public id: number, public title: string, public power: number, 
        public url: string = null, public locked: boolean = false, public deleted: boolean = false) {
    }
}