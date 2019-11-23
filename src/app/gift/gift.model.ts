export class Gift {
    constructor(public id: number, public title: string, public power: number, 
        public url: string = null, public deleted: boolean = false) {
    }
}