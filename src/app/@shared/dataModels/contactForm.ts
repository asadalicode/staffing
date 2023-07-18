export class ContactFormModel {
    constructor(public data: Object) { }

    static adapt(data: any): ContactFormModel {
        return new ContactFormModel(data);
    }
}