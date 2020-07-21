export function getFieldofObj(obj, k) {
  let keys = k.split(".");
  let values = obj[k];
  if (keys.length === 2) {
    let k1 = keys[0];
    let k2 = keys[1];
    values = obj[k1][k2]
  }
//  console.log(values);
  return values
}
