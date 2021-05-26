function addCommas(numbers) {
  if (!numbers) return;
  const numbersArray = numbers.toString();
  if (numbersArray.indexOf("-") !== -1) {
    numbersArray.slice(1);
  }

  const [number, decimal] = numbersArray.split(".");

  const reversedArray = number.split("").reverse();
  const addedCommas = [];

  for (let i = 0; i < reversedArray.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      addedCommas.push(",");
    }
    addedCommas.push(reversedArray[i]);
  }

  addedCommas.reverse();

  if (decimal) {
    addedCommas.push(".");
    addedCommas.push(decimal);
  }
  return addedCommas.join("");
}

function abreviateLargeNums(num) {
  const numString = num.toString();
  //trillion
  if (numString.length >= 13) {
    const dec = (num / 1000000000000).toFixed(3);

    return `${dec} T`;
  }

  //billions
  if (numString.length >= 10) {
    const dec = (num / 1000000000).toFixed(3);

    return `${dec} B`;
  }

  //millions
  if (numString.length >= 7) {
    const dec = (num / 1000000).toFixed(3);

    return `${dec} M`;
  } else return `${addCommas(num)}`;
}

export { abreviateLargeNums, addCommas };
