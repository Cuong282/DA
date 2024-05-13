// api table
export async function GetApi() {
  const requestOptions = {
      method: "GET",
      redirect: "follow"
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
      redirect: "follow"
  };

  try {
      const response = await fetch("http://localhost:3001/GetListAPI", requestOptionss);
      const result1 = await response.json();
      console.log("1:",result1)
      return result1; 
  } catch (error) {
      console.error("Error:", error);
      throw error; 
  }
}
export async function ApiChart1() {
  const requestOptionss = {
      method: "GET",
      redirect: "follow"
  };

  try {
      const response = await fetch("http://localhost:3001/ApiChart1", requestOptionss);
      const result2 = await response.json();
      console.log("apichart:",result2)
      return result2; 
  } catch (error) {
      console.error("Error:", error);
      throw error; 
  }
}
export async function ApiChart2() {
  const requestOptionss = {
      method: "GET",
      redirect: "follow"
  };

  try {
      const response = await fetch("http://localhost:3001/ApiChart2", requestOptionss);
      const result2 = await response.json();
      console.log("apichart:",result2)
      return result2; 
  } catch (error) {
      console.error("Error:", error);
      throw error; 
  }
}
export async function ApiChart3() {
  const requestOptionss = {
      method: "GET",
      redirect: "follow"
  };

  try {
      const response = await fetch("http://localhost:3001/ApiChart3", requestOptionss);
      const result2 = await response.json();
      console.log("apichart:",result2)
      return result2; 
  } catch (error) {
      console.error("Error:", error);
      throw error; 
  }
}
export async function ApiChart4() {
  const requestOptionss = {
      method: "GET",
      redirect: "follow"
  };

  try {
      const response = await fetch("http://localhost:3001/ApiChart4", requestOptionss);
      const result2 = await response.json();
      console.log("apichart:",result2)
      return result2; 
  } catch (error) {
      console.error("Error:", error);
      throw error; 
  }
}



