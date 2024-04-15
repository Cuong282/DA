const requestOptions = {
  method: "GET",
  redirect: "follow"
};

fetch("http://localhost:3001/todo", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));