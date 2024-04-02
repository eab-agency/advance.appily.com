function percentageSplit(initialPercentage: number = 0.25): boolean {
  if (initialPercentage >= 1 || initialPercentage < 0) {
    throw new Error('initialPercentage must be between 0 and 1');
  }
    // Generate a random number between 0 and 1
    const randomNum = Math.random();
  
    // Compare with the initialPercentage to determine the result
    return randomNum < initialPercentage;
  }
  
  export default percentageSplit;