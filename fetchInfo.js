const AUTH_TOKEN = "Bearer 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";

export const GITHUB_URL_ITEMS =
  "https://aryaemami59.github.io/simplysuppliesAPI/items.json";

export const GITHUB_URL_VENDORS =
  "https://aryaemami59.github.io/simplysuppliesAPI/vendors.json";

export const GITHUB_URL_NAVLIST =
  "https://aryaemami59.github.io/simplysuppliesAPI/navList.json";
// export const GITHUB_URL_ITEMS =
//   "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";

// export const GITHUB_URL_VENDORS =
//   "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/vendors.json";

// export const GITHUB_URL_NAVLIST =
//   "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/navList.json";

export const FETCH_CONFIG = {
  method: "GET",
  headers: {
    Accept: "application/vnd.github.v3.raw.json",
    Authorization: AUTH_TOKEN,
  },
};
