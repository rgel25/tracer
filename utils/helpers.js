module.exports.rolePrint = (role) => {
  if (role === "ur1") return "Admin";
  if (role === "ur2") return "Project Manager";
  if (role === "ur3") return "Developer";
  if (role === "ur4") return "Submitter";
  if (role === "ur5") return "Unassigned";
};

module.exports.formatName = (...inputs) => {
  return inputs
    .map((input) => {
      return input
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    })
    .join(" ");
};

module.exports.formatDate = (date) => {
  // prettier-ignore
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const toFormat = new Date(date);
  const formattedDate = `${
    month[toFormat.getMonth()]
  } ${toFormat.getDate()}, ${toFormat.getFullYear()}`;
  return formattedDate;
};
