// api table
export async function GetApi() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch("http://localhost:3001/todo", requestOptions);
    const result = await response.json();
    //   console.log("result:",result)
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error
  }
}

// api boxindex
export async function ListApi() {
  const requestOptionss = {
    method: "GET",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://localhost:3001/GetListAPI",
      requestOptionss
    );
    const result1 = await response.json();
    console.log("1:", result1);
    return result1;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// export async function LOGIN(){

//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
  
//   const raw = JSON.stringify({
//     "email": "cuong@gmail.com",
//     "password": "1234567"
//   });
  
//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow"
//   };
  
//   fetch("http://localhost:3001/signin", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
// }




