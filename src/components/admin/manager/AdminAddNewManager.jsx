import React from "react";
import { FaTimes } from "react-icons/fa";
import "../../../styles/forms.css";
import Input from "../../Input";
import checkIcon from "../../../assets/icons/check.png";
import {
  postManager,
  dispatchReloadManagers
} from "../../../actions/AdminManagersAction";
import Select from "react-select";
import { getAllRestaurants } from "../../../actions/AdminRestaurantsAction";

const AdminAddNewManager = ({
  isEdit = false,
  managerDataToEdit = {},
  openModal,
  closeModal,
  sending,
  dispatch,
}) => {
  const [managerPostData, setManagerPostData] = React.useState(
    isEdit ? managerDataToEdit : {}
  );
  const [localSending, setlocalSending] = React.useState(false);
  const [error, seterror] = React.useState("");
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    async function loadRestaurants() {
      setRestaurants(await getAllRestaurants("ACTIVE"));
    }
    loadRestaurants();
  }, []);

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setManagerPostData({ ...managerPostData, [name]: value });
  };

  const selectHandler = (payload) => {
    var name = payload.name;
    var value = payload.value;
    setManagerPostData({ ...managerPostData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    let response = await postManager(managerPostData);
    if (response.success) {
      openModal(renderSuccessNotice(managerPostData, closeModal));
      seterror("");
      dispatch(dispatchReloadManagers());
    } else {
      seterror(response.error?.response?.data?.message || "Error occured");
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="table-holder">
        <div className="header text-white flex justify-center items-center relative">
          {"Register Manager"}
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
                      defaultInputValue={managerPostData.firstName || ""}
                      required={true}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      labelName="Lastname"
                      name="lastName"
                      inputHandler={inputHandler}
                      defaultInputValue={managerPostData.lastName || ""}
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
                      defaultInputValue={managerPostData.email || ""}
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
                      defaultInputValue={managerPostData.mobile || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>
                <div className="form-row">
                    <div className="form-group-full">
                        <label>Restaurant</label>
                        <Select
                            options={restaurants}
                            name="restaurantId"
                            onChange={(payload) =>
                                selectHandler({ ...payload, name: "restaurantId" })
                            }
                            className="mt-3 select-input"
                            placeholder={
                                <div className="select-placeholder-text">Select Restaurant</div>
                            }
                            defaultValue={managerPostData.restaurantId || ""}
                        />
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

function renderSuccessNotice(managerData, closeModal) {
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

export default AdminAddNewManager;
