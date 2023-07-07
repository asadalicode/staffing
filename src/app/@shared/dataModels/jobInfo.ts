export class JobInfoModel {
  constructor(
    public jobId: number,
    public jobTitle: string,
    public description: string,
    public role: Object,
    public countryId: number,
    public workTypeId: number,
    public salary: Object,
    public geoData: Object,
    public contactId: number,
    public numberMatches: number,
    public edmId: string
  ) {}

  static adapt(item: any): JobInfoModel {
    return new JobInfoModel(
      item.jobId,
      item.jobTitle,
      item.description,
      item.role,
      item.countryId,
      item.workTypeId,
      item.salary,
      item.geoData,
      item.contactId,
      item.numberMatches,
      item.edmId
    );
  }
}
