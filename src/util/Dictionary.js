const alphabet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|[]$@/. ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|[]$@/. ';

const createDictionary = () => {
  let obj = {};
  for (let i = 0; i < alphabet.length/2; i++){
    obj[alphabet[i]] = i;
  }
  return obj;
}