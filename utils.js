export const random = (min, max) => {
  if (max === undefined) {
    return Math.ceil(Math.random() * min);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const countClick = (limit = 6, $el) => {
  let count = limit;

  $el.innerText = `${$el.innerText} (${count})`;

  return () => {
    count--;
    if (count <= 0) {
      $el.disabled = true;
    }
    const textWithoutCount = $el.innerText.replace(/\s*\(\d+\)$/, '');
    $el.innerText = `${textWithoutCount} (${count})`;
    return count;
  };
};