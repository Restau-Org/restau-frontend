import React from "react";
import { FaTimes } from "react-icons/fa";
import "../../../styles/forms.css";
import Input from "../../Reusable/Input";
import checkIcon from "../../../assets/icons/check.png";
import {
  postChefs,
  dispatchReloadChefs
} from "../../../actions/manager/ManagerChefAction";

const ManagerAddNewChef = ({
  isEdit = false,
  chefDataToEdit = {},
  openModal,
  closeModal,
  sending,
  dispatch
}) => {
  const [chefPostData, setChefPostData] = React.useState(
    isEdit ? chefDataToEdit : {}
  );
  const [localSending, setlocalSending] = React.useState(false);
  const [error, seterror] = React.useState("");

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setChefPostData({ ...chefPostData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    let response = await postChefs(chefPostData);
    if (response.success) {
      openModal(renderSuccessNotice(chefPostData, closeModal));
      seterror("");
      dispatch(dispatchReloadChefs());
    } else {
      seterror(response.error?.response?.data?.message || "Error occured");
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="table-holder">
        <div className="header text-white flex justify-center items-center relative">
          {"Register Chef"}
          <FaTimes
            className="text-white absolute right-4 cursor-pointer"
            onClick={closeModal}
          ></FaTimes>
        </div>
        <div className="content bg-white p-4">
          <form className="form" onSubmit={handleSubmit}>
            <div className="w-full ">
              <div className="flex flex-col items-center  justify-center">
                <div className="form-row">
                  <div className="form-group">
                    <Input
                      labelName="Firstname"
                      name="firstName"
                      inputHandler={inputHandler}
                      defaultInputValue={chefPostData.firstName || ""}
                      required={true}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      labelName="Lastname"
                      name="lastName"
                      inputHandler={inputHandler}
                      defaultInputValue={chefPostData.lastName || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-full">
                    <Input
                      labelName="Email"
                      name="email"
                      inputHandler={inputHandler}
                      defaultInputValue={chefPostData.email || ""}
                      placeholder="Enter email"
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-full">
                    <Input
                      labelName="Phone Number"
                      name="mobile"
                      inputHandler={inputHandler}
                      defaultInputValue={chefPostData.mobile || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <button type="submit" className="save-btn">
                  {sending || localSending ? "wait..." : "Register"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

function renderSuccessNotice(chefData, closeModal) {
  return (
    <div className="table-holder small">
      <div className="header text-white flex justify-center items-center relative">
        Notice
        <FaTimes
          className="text-white absolute right-4 cursor-pointer"
          onClick={closeModal}
        ></FaTimes>
      </div>
      <div className="content bg-white p-2 flex flex-col items-center justify-center">
        <p className="text-lg" style={{ color: "#868585" }}>
          Successfull
        </p>
        <img src={checkIcon} className="mt-2 h-8" alt="success"></img>
      </div>
    </div>
  );
}

export default ManagerAddNewChef;
