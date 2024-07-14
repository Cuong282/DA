import { Button, Input, Modal } from "antd";
import { useState } from "react";

const LogIn = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  return (
    
    <>
     <Button
        danger
        size="small"
        type="primary"
        className="ml-2"
        onClick={showModal}
      >
        Đăng nhập
      </Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="modal-content max-w-4xl overflow-hidden h-96 flex item-center w-full">
          <div className="modal-body text-color-primary flex item-center ">
            <div className="pict h-full w-full">
              <div className=" ">
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
                  <div className="mt-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p> mật khẩu</p>
                  <Input.Password
                    className="mb-2"
                    size="large"
                    placeholder=""
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
                        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </div>
             
                  <div className="google_login">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogIn;