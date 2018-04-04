import { Comment } from './comment';

export class Dish {
  _id: number;
  featured: boolean;
  name: string;
  image: string;
  label: string;
  price: string;
  description: string;
  comments: Comment[];
}
