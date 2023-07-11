export class TasInformationModel {
    constructor(public data: Object) { }

    static adapt(data: any): TasInformationModel {
        return new TasInformationModel(data);
    }
}