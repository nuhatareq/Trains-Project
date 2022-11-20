import { Coach } from './coach.model';
export class TrainComposition {
  constructor(
    public trainCompositionId: number,
    public coachCount: number,
    public coachesTypes: Coach[]
  ) {}
}
