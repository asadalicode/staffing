export class SalaryGraphModel {
    constructor(public data: Object) { }

    static adapt(data: any): SalaryGraphModel {
        return new SalaryGraphModel(data);
    }
}