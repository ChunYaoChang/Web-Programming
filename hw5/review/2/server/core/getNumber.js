let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if(typeof number === "undefined" || forceRestart)number = Math.floor(Math.random()*100);
  return number;
}

export default getNumber
