export const errorMessage = (htmltag, error) => {
  return (htmltag.textContent = error);
};
export function dateTimeReturen() {
  const date = new Date().toLocaleDateString();
  const timedata = new Date().toLocaleTimeString(
    ([], { hour: "2-digit", minute: "2-digit" })
  );
  return {
    date,
    timedata,
  };
}