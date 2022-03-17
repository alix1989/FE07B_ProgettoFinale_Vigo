import { Comune } from "./comune";
import { Provincia } from "./provincia";

export class Sede {
  id!: number;
  via!: string;
  civico!: string;
  cap!: string;
  localita!: string;
  comune: Comune = new Comune();
  provincia: Provincia = new Provincia();
}
