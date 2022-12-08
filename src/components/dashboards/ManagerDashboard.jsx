import React from 'react'
import avatar2Image from "../../assets/images/avatar2.jpg";

function ManagerDashboard({
  ManagerProfile,
  displayRole
}) {
  const avatar2 =
    !ManagerProfile?.firstName && !ManagerProfile?.lastName
      ? avatar2Image
      : `https://ui-avatars.com/api/?name=${ManagerProfile?.firstName}+${ManagerProfile?.lastName}&bold=true`;

  return (
    <>
      {ManagerProfile && (
        <div className="flex flex-col items-center w-full test-profile">
          <img src={avatar2} alt={`${ManagerProfile.fullName}`}></img>
          <hr></hr>
          <h3 className="names">{ManagerProfile.fullName}</h3>
          <h5 className="role">{displayRole}</h5>
        </div>
      )}
    </>
  )
}

export default ManagerDashboard
