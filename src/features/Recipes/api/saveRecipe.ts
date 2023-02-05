import axios from "axios";
import { Recipe } from "./../interface/index";
export default async function searchRecipe(name: string, difficulty?: string) {
  // TODO difficulty
  return axios
    .post("https://themealdb.com/api/json/v1/1/search.php?s=" + name)
    .then(({ data }) => (data.meals as Recipe[]) ?? []);
}
