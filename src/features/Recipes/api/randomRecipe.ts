import { Recipe } from './../interface/index';
import axios from "axios";
export default async function randoRecipe() {
  return axios.get("https://themealdb.com/api/json/v1/1/random.php").then(({ data }) => data["meals"][0] as Recipe);
}
