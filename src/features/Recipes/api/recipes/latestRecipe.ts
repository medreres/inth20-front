import { API_URL } from "../index";
import { Recipe } from "../../interface/index";
import axios from "axios";
export default async function latestRecipe(n: number = 3) {
  return axios.get(API_URL + "/latest.php").then(({ data }) => data["meals"].slice(0, n) as Recipe[]);
}
