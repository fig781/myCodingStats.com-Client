export const inputValidation = {
  checkIfInputEmpty: (userInput) => {
    if (userInput.length == 0) {
      return true;
    } else {
      return false;
    }
  },
  checkIfInputTooLong: (userInput, maxLength) => {
    if (userInput.length > maxLength) {
      return true;
    } else {
      return false;
    }
  },
  checkIfActiveEntryExists: (userInput, currentEntries) => {
    for (let a = 0; a < currentEntries.length; a++) {
      if (currentEntries[a].name === userInput) {
        return true;
      }
    }
    return false;
  },
};
