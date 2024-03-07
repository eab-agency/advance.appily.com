function percentageSplit(initialPercentage = 0.25) {
    // Generate a random number between 0 and 1
    const randomNum = Math.random();
  
    // Compare with the initialPercentage to determine the result
    return randomNum < initialPercentage;
  }
  
  export default percentageSplit;