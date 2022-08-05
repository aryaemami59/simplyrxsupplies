const myURL =
  "https://api.github.com/repos/aryaemami59/simplysuppliesAPI/contents/items.json";
export default async function myItems() {
  const response = await fetch(myURL, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3.raw",
      Authorization: "Bearer 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",
    },
  })
    .then(res => res.json())
    .then(data => data.items);

  console.log(response);
}
