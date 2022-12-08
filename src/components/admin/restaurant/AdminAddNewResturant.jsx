import React from "react";
import { FaTimes } from "react-icons/fa";
import "../../../styles/forms.css";
import Input from "../../Reusable/Input";
import checkIcon from "../../../assets/icons/check.png";
import { postRestaurant,dispatchReloadRestaurants,changeRestaurant} from "../../../actions/admin/AdminRestaurantsAction"

const AdminAddNewRestaurant = ({
    isEdit = false,
    restaurantDataToEdit = {},
    openModal,
    closeModal,
    sending,
    dispatch
}) => {

    const [restaurantPostData, setRestaurantPostData] = React.useState(isEdit ? restaurantDataToEdit : {})
    const [localSending, setlocalSending] = React.useState(false);
    const [error, seterror] = React.useState("")

    const inputHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setRestaurantPostData({ ...restaurantPostData, [name]: value });
    };

    const selectHandler = (payload) => {
        var name = payload.name;
        var value = payload.value;
        setRestaurantPostData({ ...restaurantPostData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setlocalSending(true);
        let response = isEdit
            ? await changeRestaurant(restaurantPostData)
            : await postRestaurant(restaurantPostData);
        if (response.success) {
            openModal(renderSuccessNotice(restaurantPostData, closeModal));
            seterror("");
            dispatch(dispatchReloadRestaurants())
        } else {
            seterror(response.error?.response?.data?.message || "Error occured");
        }
        setlocalSending(false);
    };

    return (
        <>
            <div className="table-holder">
                <div className="header text-white flex justify-center items-center relative">
                    {isEdit ? "Edit Restaurant" : "Add New Restaurant"}
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
                                    <div className="form-group-full">
                                        <Input
                                            labelName="Restaurant name"
                                            name="name"
                                            inputHandler={inputHandler}
                                            defaultInputValue={restaurantPostData.name || ""}
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
                                            defaultInputValue={restaurantPostData.email || ""}
                                            placeholder="Enter email"
                                            required={true}
                                        ></Input>
                                    </div>
                                    
                                </div>

                                <div className="form-row">
                                    <div className="form-group-full">
                                            <Input
                                                labelName="Phone Number"
                                                name="phoneNumber"
                                                inputHandler={inputHandler}
                                                defaultInputValue={restaurantPostData.phoneNumber || ""}
                                                required={true}
                                            ></Input>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                            <Input
                                                labelName="Latitude"
                                                name="latitude"
                                                inputHandler={inputHandler}
                                                defaultInputValue={restaurantPostData.latitude || ""}
                                                required={true}
                                            ></Input>
                                    </div>
                                    <div className="form-group">
                                            <Input
                                                labelName="Longitude"
                                                name="longitude"
                                                inputHandler={inputHandler}
                                                defaultInputValue={restaurantPostData.longitude || ""}
                                                required={true}
                                            ></Input>
                                    </div>
                                </div>
                                


                                    <button type="submit" className="save-btn">
                                        {sending || localSending
                                            ? "wait..."
                                            : isEdit
                                                ? "Save"
                                                : "Create"}
                                    </button>
                                </div>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

function renderSuccessNotice(restaurantData, closeModal) {
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

export default AdminAddNewRestaurant