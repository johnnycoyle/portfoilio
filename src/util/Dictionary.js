const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789|[]$@/._- ';
const alphabet = characters.repeat(2);

const createDictionary = () => {
  let obj = {};
  for (let i = 0; i < alphabet.length/2; i++) {
    obj[alphabet[i]] = i;
  }
  console.log(obj);
  return obj;
}