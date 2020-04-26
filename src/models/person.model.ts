export interface Person {
  id: number;
  firstNames: string;
  shortName: string;
  surname: string;
  dateOfBirth: string;
  placeOfBirth: string;
  dateOfDeath: string;
  placeOfDeath: string;
  fatherId: number | null;
  motherId: number | null;
  marriedWith: string;
  datesOfMarriages: string[];
  placesOfMarriages: string[];
  datesOfDivorces: string[];
  partnerWith: number[];
  partnerShipsStartYears: string[];
  partnerShipsEndYears: string[];
}
