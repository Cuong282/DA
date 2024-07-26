
async function LoginFrom(dataUser) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify(
      dataUser
    ),
  };
  try {
    const response = await fetch(
      "http://localhost:3001/signin",
      requestOptions
    );
    const result1 = await response.text();
    console.log("1:", result1);
    return result1;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export default LoginFrom;
console.log(">>>>>>>>>>>>>>>>>", LoginFrom());
