import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchWaiters, postWaiter } from "../../actions/manager/ManagerWaitersAction";
import ManagerWaitersTable from "../../components/manager/waiter/ManagerWaitersTable";
import ManagerAddNewWaiter from "../../components/manager/waiter/ManagerAddNewWaiter";
import { decrypt } from "../../services/crypto";
const defaultModalStatus = {
  shown: false,
  component: null,
};

const ManagerWaitersPage = ({ dispatch, loading, waiters, sending }) => {
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
    dispatch(fetchWaiters(0, { name: null }, activeTab));
  }, [dispatch, activeTab]);

  const changeActiveTab = (newValue) => {
    setactiveTab(newValue);
  };

  const changePage = (newPage, searchValues) => {
    if (newPage !== waiters.number)
      dispatch(fetchWaiters(newPage, searchValues));
  };

  let breadCrumbData = ["Restaurant Manager", "Dashboard", "Waiters"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !waiters.searchValues) {
    } else {
      dispatch(fetchWaiters(0, searchValues));
    }
  };
  const submitWaiters = (dataTOSubmit) => {
    dispatch(postWaiter(dataTOSubmit, history));
  };
  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.MANAGER}
        whiteSidebar={false}
        pageGray={true}
        title="System Waiters"
        classes="p-4 md:p-8"
      >
        <ManagerWaitersTable
          openModal={openModal}
          closeModal={closeModal}
          waiters={waiters?.content}
          pages={waiters?.totalPages}
          currentPage={waiters?.number + 1}
          changePage={changePage}
          loading={loading}
          searchPage={searchPage}
          defaultSearchValues={waiters?.searchValues}
          dispatch={dispatch}
          sending={sending}
          role={profile?.role?.name}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        ></ManagerWaitersTable>
        {profile?.role?.name === "MANAGER" && (
          <div className="flex w-full justify-center">
            <div className="bg-white flex items-center justify-center w-full">
              <button
                className="button-link"
                onClick={() =>
                  openModal(
                    <ManagerAddNewWaiter
                      isEdit={false}
                      openModal={openModal}
                      closeModal={closeModal}
                      submit={submitWaiters}
                      sending={sending}
                      dispatch={dispatch}
                    ></ManagerAddNewWaiter>
                  )
                }
              >
                Register Waiter
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
  loading: state.managerWaiters.loading,
  waiters: state.managerWaiters.waiters,
  sending: state.managerWaiters.sending,
});

export default connect(mapStateToProps)(ManagerWaitersPage);
