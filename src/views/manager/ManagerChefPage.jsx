import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchChefs, postChefs } from "../../actions/manager/ManagerChefAction";
import ManagerChefTable from "../../components/manager/chef/ManagerChefTable";
import ManagerAddNewChef from "../../components/manager/chef/ManagerAddNewChef";
import { decrypt } from "../../services/crypto";
const defaultModalStatus = {
  shown: false,
  component: null,
};

const ManagerChefsPage = ({ dispatch, loading, chefs, sending }) => {
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
    dispatch(fetchChefs(0, { name: null }, activeTab));
  }, [dispatch, activeTab]);

  const changeActiveTab = (newValue) => {
    setactiveTab(newValue);
  };

  const changePage = (newPage, searchValues) => {
    if (newPage !== chefs.number)
      dispatch(fetchChefs(newPage, searchValues));
  };

  let breadCrumbData = ["Restaurant Manager", "Dashboard", "Chefs"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !chefs.searchValues) {
    } else {
      dispatch(fetchChefs(0, searchValues));
    }
  };
  const submitChefs = (dataTOSubmit) => {
    dispatch(postChefs(dataTOSubmit, history));
  };
  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.MANAGER}
        whiteSidebar={false}
        pageGray={true}
        title="System Chefs"
        classes="p-4 md:p-8"
      >
        <ManagerChefTable
          openModal={openModal}
          closeModal={closeModal}
          chefs={chefs?.content}
          pages={chefs?.totalPages}
          currentPage={chefs?.number + 1}
          changePage={changePage}
          loading={loading}
          searchPage={searchPage}
          defaultSearchValues={chefs?.searchValues}
          dispatch={dispatch}
          sending={sending}
          role={profile?.role?.name}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        ></ManagerChefTable>
        {profile?.role?.name === "MANAGER" && (
          <div className="flex w-full justify-center">
            <div className="bg-white flex items-center justify-center w-full">
              <button
                className="button-link"
                onClick={() =>
                  openModal(
                    <ManagerAddNewChef
                      isEdit={false}
                      openModal={openModal}
                      closeModal={closeModal}
                      submit={submitChefs}
                      sending={sending}
                      dispatch={dispatch}
                    ></ManagerAddNewChef>
                  )
                }
              >
                Register Chef
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
  loading: state.managerChefs.loading,
  chefs: state.managerChefs.chefs,
  sending: state.managerChefs.sending,
});

export default connect(mapStateToProps)(ManagerChefsPage);
