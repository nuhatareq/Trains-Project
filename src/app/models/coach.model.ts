export class Coach {
  constructor(
    public coachCompositionId: number,
    public seatsCounts: number,
    public rowNumber: number,
    public columnsNumber: number,
    public firstRowSeatCount: number,
    public lastRowSeatCount: number
  ) {}
}
