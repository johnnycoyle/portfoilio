const alphabet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|[]$@/._- ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|[]$@/._- ';

const createDictionary = () => {
  let obj = {};
  for (let i = 0; i < alphabet.length/2; i++){
    obj[alphabet[i]] = i;
  }
  return obj;
}