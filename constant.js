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
export function emojiResturn(number) {
  const emojiarr = ["🏆", "💎", "💰", "✨"];
  const emoji =
    number > 10000
      ? emojiarr[3]
      : number > 3000
      ? emojiarr[2]
      : number > 2000
      ? emojiarr[1]
      : number > 1000
      ? emojiarr[0]
      : "level unlocked";

  return emoji;
}
