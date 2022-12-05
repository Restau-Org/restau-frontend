import React from "react";
import "../../styles/tables.css";
import TableHeaderInput from "../Reusable/TableHeaderInput";
import TrainerButtons from "../rtb-flow/TrainerButtons";

const TableHeader = ({
  headerData = [],
  tabs = [],
  activeTab,
  changeActiveTab,
  trainerButtons = false,
  trainerButtonsData,
  activePage,
  changeActivePage,
  academicYears,
  installmentNumbers,
}) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-between table-header gap-4 md:gap-1">
      <div className="left">
        {trainerButtons ? (
          <TrainerButtons
            active={activePage}
            changeActive={changeActivePage}
            data={trainerButtonsData}
          ></TrainerButtons>
        ) : (
          <div className="table-header-buttons flex">
            {tabs.map((tab, index) => (
              <React.Fragment key={index}>
                {index > 1 && <div className="dot"></div>}
                <button
                  key={tab}
                  className={`${activeTab === tab && "active"}`}
                  onClick={() => changeActiveTab(tab)}
                >
                  {tab}
                </button>
              </React.Fragment>
            ))}
            {headerData
              .filter((inp) => inp.placement === "left")
              .map((h, index) => (
                <TableHeaderInput
                  select={h.type === "select"}
                  {...h}
                  key={index}
                ></TableHeaderInput>
              ))}
          </div>
        )}
      </div>
      <div className="right flex flex-wrap gap-2">
        {academicYears ? (
          <div className="flex table-header items-center">
            <p className="payment-totals font-bold">
              <span>Academic Year:</span>
              {/* <div className="full-group"> */}
            </p>
          </div>
              ) : null}
              
        {installmentNumbers ? (
          <div className="flex table-header items-center">
            <p className="payment-totals font-bold">
              <span>Installment Number:</span>
            </p>
          </div>
              ) : null}
        {headerData
          .filter((inp) => inp.placement !== "left")
          .map((h, index) => (
            <TableHeaderInput
              select={h.type === "select"}
              {...h}
              key={index}
            ></TableHeaderInput>
          ))}
      </div>
    </div>
  );
};

export default TableHeader;
