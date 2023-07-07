export class TalentSummaryModel {
  constructor(public data: Object) {}

  static adapt(data: any): TalentSummaryModel {
    return new TalentSummaryModel(data);
  }
}
