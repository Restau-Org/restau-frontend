import React from "react";
import TableHeader from "../../pagination/TableHeader";
import "../../../styles/tables.css";
import TablePagination from "../../pagination/TablePagination";

export default function ManagerChefTable({
  openModal,
  closeModal,
  chefs = [],
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

  let displayChefs = [...chefs];

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
        tableData: displayChefs,
        loading
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
  loading
}) => {
  return (
    <div
      style={{ width: "100%", overflowX: "auto", minHeight: "20rem" }}
      className="table-container"
    >
      <table className="table mt-8">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            tableData.map((tr, index) => (
              <>
                <tr className="space"></tr>
                <tr key={index}>
                  <td>{tr?.firstName}</td>
                  <td>{tr?.lastName}</td>
                  <td>{tr?.email}</td>
                  <td className="text-center">{tr?.phoneNumber}</td>
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
