import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { getRequest } from "../../../Services/request.service";
import { useSelector } from "react-redux";
import { getUserID } from "../../../Redux/slices/auth-slice";
import { useCookies } from "react-cookie";

const Home = () => {
  const [userData, setUserData] = useState({});
  const userID = useSelector(getUserID);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const getProfile = async () => {
      if (userID > 0)
        try {
          const response = await getRequest(`users/${userID}`, cookies.token);
          setUserData(response);
        } catch (error) {
          console.error(error);
        }
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  return (
    <>
      <Header />
      {userData !== {} ? (
        <div className="m-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Profile Information
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {userData.firstname} {userData.lastname}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Username
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {userData.username}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {userData.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Location
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {userData.location}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <div className="m-6">No User Data Found</div>
      )}
    </>
  );
};

export default Home;
