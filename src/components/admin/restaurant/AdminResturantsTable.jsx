import React from "react";
import TableHeader from "../../pagination/TableHeader";
import "../../../styles/tables.css";
import TablePagination from "../../pagination/TablePagination";
import { editRestaurant,enableRestaurant,disableRestaurant } from "../../../actions/admin/AdminRestaurantsAction";
import AdminAddNewRestaurant from "./AdminAddNewResturant";
import { FaPen, FaTimes, FaToggleOff,FaToggleOn } from "react-icons/fa";

export default function AdminRestaurantsTable({
  openModal,
  closeModal,
  restaurants = [],
  pages = 0,
  currentPage = 0,
  changePage,
  loading,
  dispatch,
  searchPage,
  defaultSearchValues,
  sending,
  role,
  activeTab,
  changeActiveTab,
}) {
  let searchValues = defaultSearchValues || {
    name: "",
  };
  const [checked, setchecked] = React.useState([]);

  const handleCheck = (newValue, id) => {
    let tempChecked = checked;
    if (newValue && !tempChecked.includes(id)) {
      tempChecked.push(id);
    } else {
      tempChecked = tempChecked.filter((c) => c !== id);
    }
    setchecked(tempChecked);
  };

  const handleFilterChange = (e) => {
    searchPage({ ...searchValues, [e.target.name]: e.target.value });
  };

  const headerData = [
    {
      type: "input",
      name: "name",
      handleChange: handleFilterChange,
      placeholder: "Search by name",
      placement: "right",
      value: searchValues.name,
    },
  ];

  let displayRestaurants = [...restaurants];

  let tabs = ["Active", "Deactivated"];

  return (
    <>
      <TableHeader
        headerData={headerData}
        tabs={tabs}
        activeTab={activeTab || tabs[0]}
        changeActiveTab={changeActiveTab}
        key={activeTab}
      >
        {""}
      </TableHeader>
      {renderTable({
        tableData: displayRestaurants,
        openModal,
        closeModal,
        loading,
        handleCheck,
        dispatch,
        sending,
        role,
        activeTab
      })}
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
      <div className="h-10"></div>
    </>
  );
}

const renderTable = ({
  tableData = [],
  openModal,
  closeModal,
  loading,
  handleCheck,
  dispatch,
  sending,
  role,
  activeTab
}) => {
  const submitRestaurant = (dataToSubmit) => {
    dispatch(editRestaurant(dataToSubmit));
  };

  return (
    <div
      style={{ width: "100%", overflowX: "auto", minHeight: "20rem" }}
      className="table-container"
    >
      <table className="table mt-8">
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Edit</th>
            {activeTab === "Active" ? (
              <>
                <th>Deactivate</th>
              </>
            ) : (
              <>
                <th> Activate</th>
              </>
            )}
          </tr>
        </thead>

        <tbody>
          {!loading &&
            tableData.map((tr, index) => (
              <>
                <tr className="space"></tr>
                <tr key={index}>
                  <td>{tr?.name}</td>
                  <td className="text-center">{tr?.email}</td>
                  <td className="text-center">{tr?.phoneNumber}</td>
                  <td className="text-center">{tr?.longitude}</td>
                  <td className="text-center">{tr?.latitude}</td>

                  <td>
                    <FaPen
                      onClick={() =>
                        openModal(
                          <AdminAddNewRestaurant
                            isEdit={true}
                            openModal={openModal}
                            closeModal={closeModal}
                            restaurantDataToEdit={tr}
                            submit={submitRestaurant}
                            sending={sending}
                            key={tr.id + "-" + Date.now()}
                            dispatch={dispatch}
                          ></AdminAddNewRestaurant>
                        )
                      }
                      className="ml-2 cursor-pointer"
                      style={{ fontSize: "12px", color: "#9A9A9A" }}
                    ></FaPen>
                  </td>

                  {activeTab === "Active" ? (
                        <>
                          <td>
                            <FaToggleOff
                              className="ml-4 cursor-pointer"
                              style={{ fontSize: "20px", color: "#AD1D1D" }}
                              onClick={() => dispatch(disableRestaurant(tr?.id))}
                            ></FaToggleOff>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <FaToggleOn
                              className="ml-4 cursor-pointer"
                              style={{ fontSize: "20px", color: "#3da158" }}
                              onClick={() => dispatch(enableRestaurant(tr?.id))}
                            ></FaToggleOn>
                          </td>
                        </>
                      )}
                </tr>
              </>
            ))}
        </tbody>
      </table>
      {(loading || tableData.length === 0) && (
        <p
          className="mt-6 text-base"
          style={{
            color: "#868585",
          }}
        >
          {loading ? "Loading..." : "No results Found"}
        </p>
      )}
    </div>
  );
};
