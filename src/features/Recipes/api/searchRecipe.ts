import { Recipe } from './../interface/index';
import axios from "axios";

export default async function searchRecipe(name: string) {
  // TODO difficulty
  return axios
    .get("https://themealdb.com/api/json/v1/1/search.php?s=" + name)
    .then(({ data }) => (data.meals as Recipe[]) ?? []);
}
