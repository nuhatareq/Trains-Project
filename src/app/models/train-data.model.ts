export class TrainInfo {
  constructor(
    public trainNumber: number,
    public trainType: string,
    public compositionNumber: number,
    public startDate: Date,
    public endDate: Date
  ) {}
}
export class TrainType {
  constructor(public trainTypeName: string, public trainTypeId?: number) {}

  onCreate() {
    return {
      train_type_name: this.trainTypeName,
    };
  }
}
