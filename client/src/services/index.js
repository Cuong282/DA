export async function GetApi() {
  const requestOptions = {
      method: "GET",
      redirect: "follow"
  };

  try {
      const response = await fetch("http://localhost:3001/todo", requestOptions);
      const result = await response.json();
      // console.log("result:",result)
      return result; 
  } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error
  }
}

