export interface Article {
  id: number;
  nom: string;
  prix: string;
  img: string;
}

export class articleStateModel {
  articles: Article[];
  prix: number;
}
