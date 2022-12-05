import React, { useState } from "react";
// components
import TrainerRegisteration from "../../components/register-users/TrainerRegisteration";
import SchoolManagerReg from "../../components/register-users/SchoolManagerReg";
import DDERegistration from '../../components/register-users/DDERegistration';
import RTBRegistration from '../../components/register-users/RTBRegistration';
import MayorRegistration from '../../components/register-users/MayorRegistration';
import Countdown from '../../components/applicant/countdown';
import ModalContainer from "../../components/Reusable/ModalContainer";
import RenderPdf from '../../components/rtb-flow/RenderPdf';
import SEORegister from "../../components/register-users/SEORegister";
import CompanyManagerReg from "../../components/register-users/CompanyManagerReg";

// images 
import Logo from '../../assets/logos/restau.svg'
// css 
import "../../styles/register.css";
import { Link } from "react-router-dom";
const defaultModalStatus = {
  shown: false,
  component: null,
};
const Register = () => {
  const [openTab, setOpenTab] = useState(1);
  const [trainerTab, setTrainerTab] = useState(1);

  const [modalShown, setmodalShown] = React.useState(defaultModalStatus);

  const closeModal = () => {
    setmodalShown(defaultModalStatus);
  };
  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };
  return (
    <>
      <div className="register-container py-10 min-h-screen	">
        <div className="w-full max-w-3xl bg-white flex flex-col py-5 px-8 rounded-lg mx-auto">
          {/* logo */}
          <div className="logo-container">
            <img src={Logo} alt="RTB Logo" className="m-auto logo" />
          </div>
          <div className="text-center font-bold primary-color uppercase text-lg header-reg px-10">
            TVET MANAGEMENT PORTAL
          </div>
          {openTab !== 1 && (
            <div className="py-5">
              <h1 className="text-center mb-5 font-bold primary-color uppercase text-2xl header-reg">
                Register
              </h1>
            </div>
          )}
          {/* tabs and registeration */}

          <div className="flex flex-wrap">
            <div className="w-full">
              {trainerTab <= 1 && (
                <ul
                  className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                  role="tablist"
                >
                  <li className="-mb-px mt-2 flex-auto text-center">
                    <a
                      className={
                        "transition duration-500 ease-in-out text-xs max-w-md mx-auto px-5 py-3 rounded block leading-normal tab-text " +
                        (openTab === 1
                          ? "text-white active-tab"
                          : "inactive-color bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(1);
                      }}
                      data-toggle="tab"
                      href="#trainer"
                      role="tablist"
                    >
                      {/* TVET TRAINERS RECRUITMENT */}
                      Trainer
                    </a>
                  </li>

                  <li className="circle-container">
                    <div
                      className={
                        "cirlce r-0 rounded-full transition duration-500 ease-in-out h-2 w-2 " +
                        (openTab === 1 ? "bg-primary" : "bg-gray-400")
                      }
                    ></div>
                  </li>
                  <li className="-mb-px mt-2 flex-auto text-center">
                    <a
                      className={
                        "transition duration-500 ease-in-out text-xs   px-5 py-3 rounded block leading-normal tab-text " +
                        (openTab === 2
                          ? "text-white active-tab"
                          : "inactive-color bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(2);
                      }}
                      data-toggle="tab"
                      href="#schoolmanager"
                      role="tablist"
                    >
                      School Manager
                    </a>
                  </li>
                  <li className="circle-container">
                    <div
                      className={
                        "cirlce r-0 rounded-full transition duration-500 ease-in-out h-2 w-2 " +
                        (openTab === 2 ? "bg-primary" : "bg-gray-400")
                      }
                    ></div>
                  </li>
                  <li className="-mb-px mt-2 flex-auto text-center">
                    <a
                      className={
                        "transition duration-500 ease-in-out text-xs   px-5 py-3 rounded block leading-normal tab-text " +
                        (openTab === 3
                          ? "text-white active-tab"
                          : "inactive-color bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(3);
                      }}
                      data-toggle="tab"
                      href="#schoolmanager"
                      role="tablist"
                    >
                      Mayor
                    </a>
                  </li>
                  <li className="circle-container">
                    <div
                      className={
                        "cirlce r-0 rounded-full transition duration-500 ease-in-out h-2 w-2 " +
                        (openTab === 3 ? "bg-primary" : "bg-gray-400")
                      }
                    ></div>
                  </li>
                  <li className="-mb-px mt-2 flex-auto text-center">
                    <a
                      className={
                        "transition duration-500 ease-in-out text-xs  px-5 py-3 rounded block leading-normal tab-text " +
                        (openTab === 4
                          ? "text-white active-tab"
                          : "inactive-color bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(4);
                      }}
                      data-toggle="tab"
                      href="#dde"
                      role="tablist"
                    >
                      DDE
                    </a>
                  </li>
                  <li className="circle-container">
                    <div
                      className={
                        "cirlce r-0 rounded-full transition duration-500 ease-in-out h-2 w-2 " +
                        (openTab === 4 ? "bg-primary" : "bg-gray-400")
                      }
                    ></div>
                  </li>
                  <li className="-mb-px mt-2 flex-auto text-center">
                    <a
                      className={
                        "transition duration-500 ease-in-out text-xs   px-5 py-3 rounded block leading-normal tab-text " +
                        (openTab === 5
                          ? "text-white active-tab"
                          : "inactive-color bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(5);
                      }}
                      data-toggle="tab"
                      href="#rtb"
                      role="tablist"
                    >
                      RTB
                    </a>
                  </li>
                  <li className="circle-container">
                    <div
                      className={
                        "cirlce r-0 rounded-full transition duration-500 ease-in-out h-2 w-2 " +
                        (openTab === 5 ? "bg-primary" : "bg-gray-400")
                      }
                    ></div>
                  </li>

                  <li className="-mb-px mt-2 flex-auto text-center">
                    <a
                      className={
                        "transition duration-500 ease-in-out text-xs   px-5 py-3 rounded block leading-normal tab-text " +
                        (openTab === 6
                          ? "text-white active-tab"
                          : "inactive-color bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(6);
                      }}
                      data-toggle="tab"
                      href="#seo"
                      role="tablist"
                    >
                      SEO
                    </a>
                  </li>

                  <li className="circle-container">
                    <div
                      className={
                        "cirlce r-0 rounded-full transition duration-500 ease-in-out h-2 w-2 " +
                        (openTab === 5 ? "bg-primary" : "bg-gray-400")
                      }
                    ></div>
                  </li>
                  <li className="-mb-px mt-2 flex-auto text-center">
                    <a
                      className={
                        "transition duration-500 ease-in-out text-xs   px-5 py-3 rounded block leading-normal tab-text " +
                        (openTab === 7
                          ? "text-white active-tab"
                          : "inactive-color bg-white")
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTab(7);
                      }}
                      data-toggle="tab"
                      href="#companymanager"
                      role="tablist"
                    >
                      Company Manager 
                    </a>
                  </li>
                </ul>
              )}
              {/* <div className="flex justify-center"> */}
              {/* <Countdown /> */}
              {/* </div> */}
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="trainer"
                    >
                      <TrainerRegisteration
                        activeTab={trainerTab}
                        setActiveTab={setTrainerTab}
                      />
                    </div>

                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="schoolmanager"
                    >
                      <SchoolManagerReg />
                    </div>
                    <div
                      className={openTab === 3 ? "block" : "hidden"}
                      id="schoolmanager"
                    >
                      <MayorRegistration />
                    </div>
                    <div
                      className={openTab === 4 ? "block" : "hidden"}
                      id="dde"
                    >
                      <DDERegistration />
                    </div>
                    <div
                      className={openTab === 5 ? "block" : "hidden"}
                      id="rtb"
                    >
                      <RTBRegistration />
                    </div>
                    <div
                      className={openTab === 6 ? "block" : "hidden"}
                      id="seo"
                    >
                      <SEORegister />
                    </div>
                    <div
                      className={openTab === 7 ? "block" : "hidden"}
                      id="companymanager"
                    >
                      <CompanyManagerReg 
                        activeTab={trainerTab}
                        setActiveTab={setTrainerTab}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {/* <iframe src="/assets/files/1October2021ListofPlacedTrainersinTVETSchools.pdf"  width="100%" height="500px"/> */}
          {/* <a href="https://docs.google.com/spreadsheets/d/15QHVRf7ed-aUxN46wvYJeN8CwYiig1LC/edit?usp=sharing&ouid=108291599827253353418&rtpof=true&sd=true" target="_blank"> */}
          {/* <button className="bg-white  mt-6  font-bold ml-4 py-2 px-10 rounded inline-flex items-center">
              <span className="primary-color">List of waiting candidates with transcript for year 2020</span>
            </button> */}
          {/* </a> */}
          {/* <a href="https://recruitment.rtb.gov.rw:8088/ETrainerBackend/docs/ListofPlacedTrainersinTVETSchools.pdf" target="_blank"> */}
          {/* <Link
            to="/curricula"
          >
            <button className="bg-white ml-4 mt-6  font-bold  py-2 px-10 rounded inline-flex items-center">
              <span className="primary-color">View Curricula</span>

            </button>
          </Link> */}
          {/* <button className="bg-white ml-4 mt-6  font-bold  py-2 px-10 rounded inline-flex items-center"
            onClick={() => openModal(<RenderPdf closeModal={closeModal} filteType="pdf" url="first" ></RenderPdf>)}
          >
            <span className="primary-color">List of Placed Candidates</span>

          </button>
          <button className="bg-white ml-4 mt-6  font-bold  py-2 px-10 rounded inline-flex items-center"
            onClick={() => openModal(<RenderPdf closeModal={closeModal} filteType="pdf" url="second" ></RenderPdf>)}
          >
            <span className="primary-color">List of Placed Candidates In all positions</span>

          </button> */}
          <Link
            to="/available-positions"
          >
            <button className="bg-white ml-4 mt-6  font-bold  py-2 px-10 rounded inline-flex items-center">
              <span className="primary-color">List of available positions</span>

            </button>
          </Link>
          {/* </a> */}
          {/* ListofPlacedCandidatesInAllPositions.pdf */}
        </div>
      </div>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};

export default Register;
