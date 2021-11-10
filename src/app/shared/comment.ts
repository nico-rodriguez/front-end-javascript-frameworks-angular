import { User } from "./user";

export class Comment {
  rating!: number;
  comment!: string;
  author!: User;
  date!: string;
}