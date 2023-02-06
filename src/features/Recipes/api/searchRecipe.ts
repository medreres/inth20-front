import { API_URL } from './index';
import { Recipe } from './../interface/index';
import axios from "axios";

export default async function searchRecipe(name: string) {
  // TODO difficulty
  return axios
    .get(API_URL + "/search.php?s=" + name)
    .then(({ data }) => (data.meals as Recipe[]) ?? []);
}
