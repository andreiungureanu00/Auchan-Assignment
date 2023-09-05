import React from "react";
import { PersonCircle, List } from "react-bootstrap-icons";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { getAuthStatus, setAuthStatus } from "../../Redux/slices/auth-slice";

const Header = () => {
  const [, , removeCookies] = useCookies("token");
  const authStatus = useSelector(getAuthStatus);
  const dispatch = useDispatch();

  const logout = () => {
    removeCookies("token");
    dispatch(setAuthStatus(false));
  };

  const navigationItems = authStatus
    ? [
        { name: "Home", href: "/", current: true },
        { name: "Weather", href: "/weather", current: false },
      ]
    : [];

  const menuItems = authStatus
    ? [
        {
          name: "Sign Out",
          href: "/login",
          method: logout,
        },
      ]
    : [];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <List color="white" size={30} />
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigationItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white
                          rounded-md px-3 py-2 text-sm font-medium"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {menuItems.length ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <PersonCircle size={30} color="white" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {menuItems.map((item) => (
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700"
                            onClick={item.method}
                          >
                            {item.name}
                          </a>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigationItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white
                    block rounded-md px-3 py-2 text-base font-medium"
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
