import axios from "axios";

export function getCategories() {
  axios
    .get("https://int20h.onrender.com/recipes", {
      headers: {
        "Authorization-Google":
          "ya29.a0AVvZVsp_MoY3v9iDX1MFbL3OlsuqniVc4cxuPmRcgsN42ivQcYhBAN1Da7CE9jkNHRIqGFBrs7L3H1CiWW2R0MFIWWQ91dofv8WZUiJEf-MCUQB0T73diuTdJ4PnLO98W_v2MEXJr66wmxSs3-iMUjGI93RGaCgYKAQASARMSFQGbdwaITrkmPnDBr8GCUw2NF7T2Hg0163",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => console.log(res));
}
