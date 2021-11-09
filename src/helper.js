export const shuffleArr = (arr) => {
  const copyArr = [...arr];

  for (let i = copyArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copyArr[i];
    copyArr[i] = copyArr[j];
    copyArr[j] = temp;
  }

  return copyArr;
};
