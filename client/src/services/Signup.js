
async function SignupFrom(data) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(
      data
    ),
  };
  try {
    const response = await fetch(
      "http://localhost:3001/signup",
      requestOptions
    );
    console.log("response:",response)
    const result1 = await response.json();
    console.log("111111111111:", result1);
    return result1;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export default SignupFrom;
console.log(">11111111");
