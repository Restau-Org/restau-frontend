import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchManagers, postManager } from "../../actions/AdminManagersAction";
import AdminManagersTable from "../../components/admin/manager/AdminManagersTable";
import AdminAddNewManager from "../../components/admin/manager/AdminAddNewManager";
import { decrypt } from "../../services/crypto";
const defaultModalStatus = {
  shown: false,
  component: null,
};

const AdminManagersPage = ({ dispatch, loading, managers, sending }) => {
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
    dispatch(fetchManagers(0, { name: null }, activeTab));
  }, [dispatch, activeTab]);

  const changeActiveTab = (newValue) => {
    setactiveTab(newValue);
  };

  const changePage = (newPage, searchValues) => {
    if (newPage !== managers.number)
      dispatch(fetchManagers(newPage, searchValues));
  };

  let breadCrumbData = ["System Admin", "Dashboard", "Managers"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !managers.searchValues) {
    } else {
      dispatch(fetchManagers(0, searchValues));
    }
  };
  const submitRestuarants = (dataTOSubmit) => {
    dispatch(postManager(dataTOSubmit, history));
  };
  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.ADMIN}
        whiteSidebar={false}
        pageGray={true}
        title="System Managers"
        classes="p-4 md:p-8"
      >
        <AdminManagersTable
          openModal={openModal}
          closeModal={closeModal}
          managers={managers?.content}
          pages={managers?.totalPages}
          currentPage={managers?.number + 1}
          changePage={changePage}
          loading={loading}
          searchPage={searchPage}
          defaultSearchValues={managers?.searchValues}
          dispatch={dispatch}
          sending={sending}
          role={profile?.role?.name}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        ></AdminManagersTable>
        {profile?.role?.name === "ADMIN" && (
          <div className="flex w-full justify-center">
            <div className="bg-white flex items-center justify-center w-full">
              <button
                className="button-link"
                onClick={() =>
                  openModal(
                    <AdminAddNewManager
                      isEdit={false}
                      openModal={openModal}
                      closeModal={closeModal}
                      submit={submitRestuarants}
                      sending={sending}
                      dispatch={dispatch}
                    ></AdminAddNewManager>
                  )
                }
              >
                Register Manager
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
  loading: state.adminManagers.loading,
  managers: state.adminManagers.managers,
  sending: state.adminManagers.sending,
});

export default connect(mapStateToProps)(AdminManagersPage);
