
export type Category = 'All' | 'Action' | 'Puzzle' | 'Retro' | 'Sports' | 'Arcade';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: Category;
  rating: number;
}
