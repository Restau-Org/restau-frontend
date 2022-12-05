import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import AdminDashboard from "../../components/dashboards/AdminDashboard";
import ManagerDashboard from "../../components/dashboards/ManagerDashboard"
import ModalContainer from "../../components/Reusable/ModalContainer";

const defaultModalStatus = {
  shown: false,
  component: null,
};

function Dashboard() {
  const [modalShown, setmodalShown] = React.useState(defaultModalStatus);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const profile = user?.profile;

  const logOut = () => {
    dispatch(logout());
    history.push("/login");
  };

  const closeModal = () => {
    setmodalShown(defaultModalStatus);
  };
  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  let breadCrumbData = ["Dashboard"];
  let role = profile?.role?.name;
  let sidebarRole = "";
  let displayRole = "Admin";
  switch (role) {
    case "ADMIN":
      sidebarRole = sidebarRoles.ADMIN;
      breadCrumbData.splice(0, 0, "System Admin");
      displayRole = "System Admin";
      break;
    case "MANAGER":
      sidebarRole = sidebarRoles.MANAGER;
      breadCrumbData.splice(0, 0, "Restaurant Manager");
      displayRole = "Restaurant Manager";
      break;
    default:
      break;
  }

  const [render, setrender] = useState(false);

  useEffect(() => {
    console.warn(role)
    setrender(true);
  }, []);

  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRole}
        whiteSidebar={true}
        pageGray={false}
        title=""
        classes="p-4 md:p-8"
      >
        <>
          <div className="flex w-full">
            {user && (
              <div className="flex flex-col md:pl-10 items-center w-full test-profile">
                {displayRole === "Restaurant Manager" && (
                  <AdminDashboard
                    AdminProfile={profile}
                    displayRole={displayRole}
                  />
                )}
                {role === "ADMIN" && (
                  <AdminDashboard
                    AdminProfile={profile}
                    displayRole={displayRole}
                  />
                )}
                {
                  role === "MANAGER" && (
                    <ManagerDashboard 
                      ManagerProfile={profile}
                      displayRole={displayRole}
                    />
                  )
                }
              </div>
            )}
          </div>
        </>
      </SidebarPage>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
}

export default Dashboard;
