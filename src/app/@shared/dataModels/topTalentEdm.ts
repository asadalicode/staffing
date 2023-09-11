export class TopTalentEdmModel {
  constructor(
    public talentProfileId: number,
    public externalId: number,
    public score: number,
    public distance: number
  ) {}

  static adapt(data: any): TopTalentEdmModel {
    return data.map((item: any) => {
      return new TopTalentEdmModel(
        item.talentProfileId,
        item.externalId,
        item.score,
        item.distance
      );
    });
  }
}
