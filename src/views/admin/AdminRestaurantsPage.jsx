import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchRestaurants,postRestaurant } from "../../actions/AdminRestaurantsAction";
import AdminRestaurantsTable from '../../components/admin/AdminResturantsTable';
import AdminAddNewRestaurant from "../../components/admin/AdminAddNewResturant"
import { decrypt } from "../../services/crypto";
const defaultModalStatus = {
    shown: false,
    component: null,
};


const AdminRestaurantsPage = ({
    dispatch,
    loading,
    restaurants,
    sending
}) => {
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
        dispatch(fetchRestaurants(0,{name: null}, activeTab));
    }, [dispatch,activeTab]);

    const changeActiveTab = (newValue) => {
        setactiveTab(newValue);
    };

    const changePage = (newPage, searchValues) => {

        if (newPage !== restaurants.number)
            dispatch(fetchRestaurants(newPage, searchValues));
    };

    let breadCrumbData = [
        "System Admin",
        "Dashboard",
        "Restaurants"
    ];
    const searchPage = (searchValues) => {
        if (
            !searchValues?.name &&
            !restaurants.searchValues
        ) {
        } else {
            dispatch(fetchRestaurants(0, searchValues));
        }
    };
    const submitRestuarants = (dataTOSubmit) => {
        dispatch(postRestaurant(dataTOSubmit, history))
    }
    return (
        <>
            <SidebarPage
                breadCrumbData={breadCrumbData}
                role={sidebarRoles.ADMIN}
                whiteSidebar={false}
                pageGray={true}
                title="System Restaurants"
                classes="p-4 md:p-8"
            >
                <AdminRestaurantsTable
                    openModal={openModal}
                    closeModal={closeModal}
                    restaurants={restaurants?.content}
                    pages={restaurants?.totalPages}
                    currentPage={restaurants?.number + 1}
                    changePage={changePage}
                    loading={loading}
                    searchPage={searchPage}
                    defaultSearchValues={restaurants?.searchValues}
                    dispatch={dispatch}
                    sending={sending}
                    role={profile?.role?.name}
                    activeTab={activeTab}
                    changeActiveTab={changeActiveTab}
                >

                </AdminRestaurantsTable>
                {profile?.role?.name === "ADMIN" &&
                    <div className="flex w-full justify-center">

                        <div className="bg-white flex items-center justify-center px-3 w-50">
                            <button className="button-link"
                                onClick={() => openModal(<AdminAddNewRestaurant
                                    isEdit={false}
                                    openModal={openModal}
                                    closeModal={closeModal}
                                    submit={submitRestuarants}
                                    sending={sending}
                                    dispatch={dispatch}
                                ></AdminAddNewRestaurant>)}>
                                Add Restaurant
                            </button>
                        </div>

                    </div>
                }
            </SidebarPage>
            {modalShown.shown && (
                <ModalContainer>{modalShown.component}</ModalContainer>
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    loading: state.adminRestaurants.loading,
    restaurants: state.adminRestaurants.restaurants,
    sending: state.adminRestaurants.sending,
})

export default connect(mapStateToProps)(AdminRestaurantsPage)