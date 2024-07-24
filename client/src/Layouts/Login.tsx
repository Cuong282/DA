import { Button, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  email: string;
  password: string;
}
const LogIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  let navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
useEffect(()=>{
  if(localStorage.getItem('user-info')){
    navigate("/danhmuc");
  }
},[])

  async function login(event:any) {
    // fetch("https://jsonplaceholder.typicode.com/posts").then(response => {  console.log(response.status, response.ok); });

    // event.preventDefault();
    const item = { email, password };
   
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1b25nQGdtYWlsLmNvbSIsImV4cCI6MTcyMTgxMTQ1NH0.t6z5HvwPnDhEVIfGrQsalNHxpeH39pHtq4v_zDs40Gk");

fetch("http://localhost:3001/todo", {
  method: "GET",
  // body: JSON.stringify(item),
  headers: {
    "Content-Type": "application/json",
    "Accept":'application/json'
  },
  // mode: "no-cors",
  
}).then(response => {  console.log(response); });
  };
  return (
    <>
      <div>
        <form>
          <Modal 
          open={isModalOpen} 
          onCancel={() => setIsModalOpen(false)}
          okText="Đăng nhập"footer={null}>
            <div className="modal-content max-w-4xl overflow-hidden h-96 flex item-center w-full">
              <div className="modal-body text-color-primary flex item-center ">
                <div className="pict h-full w-full">
                  <div className="h-full w-full ">
                    <img
                      src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
                      alt=""
                      className="h-full pt-10"
                    />
                  </div>
                </div>
                <div className=" flex items-center w-full ">
                  <div className="w-full h-full p-6">
                    <div className=" object-cover inset-1  w-full h-full">
                      <div className="flex items-center justify-center pb-4">
                        <h1 className="text-lg">Đăng nhập</h1>
                      </div>
                      <p> Tên đăng nhập</p>
                      <div className="mt-2 w-full">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="mb-2 w-full"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <p> mật khẩu</p>
                      <Input.Password
                        className="mb-2"
                        size="large"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="text-sm mb-6 flex justify-end">
                        <a
                          href="#"
                          className="font-semibold text-red-600 hover:text-red-500 "
                        >
                          Quên mật khẩu ?
                        </a>
                      </div>
                      <div className="mt-2">
                        <div>
                          <button
                            type="submit"
                            onClick={login}
                            className="flex w-full justify-center rounded-md bg-red-600 
                          px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
                           hover:bg-red-700 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                          Đăng nhập
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Button
            danger
            size="small"
            type="primary"
            className="ml-2"
            onClick={showModal}
          >
            Đăng nhập
          </Button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
