export function getStoredPlant(id) {
  // console.log('getStoredPlant');
  return fetch(process.env.PUBLIC_URL + "/data/plants/"+id+".json", {
    headers : {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  })
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    return data
  });
}
