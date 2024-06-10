function percentageSplit(initialPercentage: number = 100): boolean {
   // Convert values greater than 1 into a decimal
   if (initialPercentage > 1) {
    initialPercentage /= 100;
  }
    // Generate a random number between 0 and 1
    const randomNum = Math.random();
    // console.log("🚀 ~ randomNum/initialPercentage:", randomNum, initialPercentage)
  
    // Compare with the initialPercentage to determine the result
    return randomNum < initialPercentage;
  }
  
  export default percentageSplit;