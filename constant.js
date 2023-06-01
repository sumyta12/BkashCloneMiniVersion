export const errorMessage = (htmltag, error) => {
  return (htmltag.textContent = error);
};
