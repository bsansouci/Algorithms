function freqHelper(acc) {
  if (acc.length > 20) {
    return acc;
  }
  acc.push(acc[acc.length - 1] / 1.059463094359295264561825);
  return freqHelper(acc);
}

function getFreqFrom(freq) {
  return freqHelper([freq]);
}

// This will return an array of a tempered scale starting from the given
// frequency
console.log(getFreqFrom(200));