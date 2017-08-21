export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const dictionary = () => {
  let obj = {};
  for (let i = 0; i < alphabet.length/2; i++){
    obj[alphabet[i]] = i;
  }
  return obj;
}