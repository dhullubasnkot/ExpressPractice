import { error } from "console";
export interface Category {
  id: number;
  name: string;
}
const categories: Category[] = [];
export default categories;
export function getAllCategories(): Category[] {
  return categories;
}
