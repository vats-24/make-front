import { Link, useLocation } from "react-router-dom";
import service from "@assets/service.svg"
import rupee from "@assets/badge-indian-rupee.svg"
import dashboard from "@assets/dashboard.svg"
import profile from "@assets/profile.svg"
import logout from "@assets/log-out.svg"
import { toast } from "react-hot-toast";
import useGetprofileDetails from "@/queries/profile/use-get-profile";

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    toast.success("You are successfully logged out. Please login using your registered google account to continue")
  }

  const { data: profileData, isLoading } = useGetprofileDetails();
  if(isLoading) return <div>Loading</div>
  return (
    <div className="flex flex-col justify-between h-screen fixed top-0 left-0 w-96 p-4 bg-white">
      <div>
        <div className="flex justify-center items-center">
          <div className="h-8 w-8 rounded-full bg-[#6425FE]" />
          <div className="p-4 text-center text-xl font-semibold">
            Delta Factor
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <nav className="mt-7 flex flex-col space-y-5">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 h-14 rounded-md text-lg gap-3 ${
                location.pathname === "/" ? "bg-[#EFE9FF] text-[#6425FE]" : "hover:bg-[#EFE9FF] hover:text-[#6425FE]"
              }`}
            >
              <img src={dashboard}/>
              Dashboard
            </Link>
            <Link
              to="/services"
              className={`flex items-center px-4 py-2 h-14 rounded-md text-lg gap-3 ${
                location.pathname === "/services" ? "bg-[#EFE9FF] text-[#6425FE]" : "hover:bg-[#EFE9FF] hover:text-[#6425FE]"
              }`}
            >
              <img src={service}/>
              Services
            </Link>
            <Link
              to="/earnings"
              className={`flex items-center px-4 py-2 h-14 rounded-md text-lg gap-3 ${
                location.pathname === "/earnings" ? "bg-[#EFE9FF] text-[#6425FE]" : "hover:bg-[#EFE9FF] hover:text-[#6425FE]"
              }`}
            >
              <img src={rupee} className="stroke-[#6425FE] text-[#6425FE]"/>
              Earnings
            </Link>
          </nav>
          <hr />
          <nav className="flex flex-col space-y-5">
            <Link
              to="/profile"
              className={`flex items-center px-4 py-2 h-14 rounded-md text-lg gap-3 ${
                location.pathname === "/profile" ? "bg-[#EFE9FF] text-[#6425FE]" : "hover:bg-[#EFE9FF] hover:text-[#6425FE]"
              }`}
            >
              <img src={profile}/>
              Profile
            </Link>
            <Link
              to="/auth/signin"
              onClick={handleLogout}
              className="flex items-center px-4 py-2 hover:bg-[#EFE9FF] h-14 rounded-md hover:text-[#6425FE] text-lg gap-3"
            >
              <img src={logout}/>
              Logout
            </Link>
          </nav>
        </div>
      </div>
      <div className="p-4 mt-10">
        <div className="flex items-center gap-4">
          <img
            src="/path/to/profile.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full mr-2 border"
          />
          <div>
            <p>{profileData?.firstName} {profileData?.lastName}</p>
            <p>@{profileData?.profileName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
