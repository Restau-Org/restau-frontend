import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchClerks, postClerks } from "../../actions/manager/ManagerClerksAction";
import ManagerClerksTable from "../../components/manager/clerk/ManagerClerksTable";
import ManagerAddNewClerk from "../../components/manager/clerk/ManagerAddNewClerk";
import { decrypt } from "../../services/crypto";
const defaultModalStatus = {
  shown: false,
  component: null,
};

const ManagerClerksPage = ({ dispatch, loading, clerks, sending }) => {
  const [modalShown, setmodalShown] = React.useState(defaultModalStatus);
  const [activeTab, setactiveTab] = React.useState("Active");

  const history = useHistory();
  const hash = sessionStorage.getItem("hash");
  const decode = decrypt(hash);
  const { profile } = decode;
  const closeModal = () => {
    setmodalShown(defaultModalStatus);
  };
  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  React.useEffect(() => {
    dispatch(fetchClerks(0, { name: null }, activeTab));
  }, [dispatch, activeTab]);

  const changeActiveTab = (newValue) => {
    setactiveTab(newValue);
  };

  const changePage = (newPage, searchValues) => {
    if (newPage !== clerks.number)
      dispatch(fetchClerks(newPage, searchValues));
  };

  let breadCrumbData = ["Restaurant Manager", "Dashboard", "Clerks"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !clerks.searchValues) {
    } else {
      dispatch(fetchClerks(0, searchValues));
    }
  };
  const submitClerks = (dataTOSubmit) => {
    dispatch(postClerks(dataTOSubmit, history));
  };
  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.MANAGER}
        whiteSidebar={false}
        pageGray={true}
        title="System Clerks"
        classes="p-4 md:p-8"
      >
        <ManagerClerksTable
          openModal={openModal}
          closeModal={closeModal}
          clerks={clerks?.content}
          pages={clerks?.totalPages}
          currentPage={clerks?.number + 1}
          changePage={changePage}
          loading={loading}
          searchPage={searchPage}
          defaultSearchValues={clerks?.searchValues}
          dispatch={dispatch}
          sending={sending}
          role={profile?.role?.name}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        ></ManagerClerksTable>
        {profile?.role?.name === "MANAGER" && (
          <div className="flex w-full justify-center">
            <div className="bg-white flex items-center justify-center w-full">
              <button
                className="button-link"
                onClick={() =>
                  openModal(
                    <ManagerAddNewClerk
                      isEdit={false}
                      openModal={openModal}
                      closeModal={closeModal}
                      submit={submitClerks}
                      sending={sending}
                      dispatch={dispatch}
                    ></ManagerAddNewClerk>
                  )
                }
              >
                Register Clerk
              </button>
            </div>
          </div>
        )}
      </SidebarPage>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.managerClerks.loading,
  clerks: state.managerClerks.clerks,
  sending: state.managerClerks.sending,
});

export default connect(mapStateToProps)(ManagerClerksPage);
