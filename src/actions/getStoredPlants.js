export function getStoredPlants(file = 'plants.json') {
  // console.log('getStoredPlants');
  const filePath = process.env.PUBLIC_URL + "/data/" + file

  return fetch(filePath, {
    headers: {
      'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // console.log(filePath);
      // console.log(data);
      return data
    }).catch((error) => {
      // console.log(filePath);
      // console.log(error);
      return "nofile"
    });
}


// // const fileExists = filePath => {
// function ifFileExisits(filePath) {
//   return fetch(filePath, { method: 'HEAD', cache: 'no-store' })
//     .then(
//       r => {
//         console.log(r)
//         // r.status == 200
//       });
// }