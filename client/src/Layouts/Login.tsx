import { Button, Input, Modal, Form } from "antd";
import type { FormProps } from "antd";
import { useEffect, useState } from "react";
import LoginFrom from "../services/Login";
interface LoginResponse {
  email: string;
  password: string;
}
type FieldType = {
  email?: string;
  password?: string;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const LogIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LoginResponse[] | []>([]);
  const [User, setUser] = useState("");
  
  async function handleLogin(data: any) {
    try {
      const dataFrom: any = await LoginFrom(data);
      setData(data);
      console.log("data:", dataFrom);
    } catch (error) {
      console.error("Error:", error);

      console.log(setError);
    }
  }

  
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          okText="Đăng nhập"
          footer={null}
        >
          <Form
         
            onFinishFailed={onFinishFailed}
            onFinish={function (data) {
              handleLogin(data);
            }}
          >
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
                  <div className="w-full h-full pt-14">
                    {/* <div className=" object-cover inset-1  w-full h-full"> */}
                      <div className="flex items-center justify-center pb-4">
                        <h1 className="text-lg">Đăng nhập</h1>
                      </div>
                      <div className="mt-2">
                        <Form.Item<FieldType>
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Item>
                      </div>
                      <div className="mt-2 flex items-center ">
                      <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <div>
                        <Input.Password
                        className="p-2"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                       
                      </Form.Item>
                      </div>
                     
                      <div className="">
                        <Form.Item
                          wrapperCol={{
                            offset: 8,
                            span: 16,
                          }}
                        >
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="flex items-center w-full justify-center rounded-md bg-red-600 
                          text-sm font-semibold leading-6 text-white shadow-sm
                           hover:bg-red-700 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Submit
                          </Button>
                        </Form.Item>
                      </div>
                      {error && <div className="text-red-600">{error}</div>}
                    </div>
                  </div>
                {/* </div> */}
              </div>
            </div>
          </Form>
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
      </div>
    </>
  );
};

export default LogIn;
