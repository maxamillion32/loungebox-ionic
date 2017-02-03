export interface IClubberModel {
  ClubberID: string,

}

export class ClubberModel implements IClubberModel {
  constructor() { }

  ClubberID: string;
  Badges: Badge[];

}

class Badge {
  Name: string;
  Value: string;
  AcquiredAt: Date;
  Source: string;
}

