import "tailwindcss/tailwind.css";
import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Anime from "./Anime"; // Import the Anime component
import Manhwa from "./Manhwa"; // Import the Manhwa component
import Chapter from "./Chapter";
import ChapterList from "./ChapterList";
import Register from "./Register";
import Login from "./Login";
import SavedManhwa from "./SavedManhwa";

const navigation = [
  { name: "Anime", href: "/anime", current: false },
  { name: "Manhwa", href: "/manhwa", current: false }
];

const loggedInUserNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Saved", href: "/mySaves" },
  { name: "Sign out", href: "#" },
];

const nonLoggedInUserNavigation = [
  { name: "login", href: "/login" },
  { name: "Sign up", href: "/signup" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Landing() {
  const [selectedManhwa, setSelectedManhwa] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState([]);
  const [chapterListData, setChapterListData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null);

  const userJSON = localStorage.getItem("loggedInUser");

  useEffect(() => {
    const userJSON = localStorage.getItem("loggedInUser");
    const userToken = localStorage.getItem("token")

    if (userJSON) {
      // Convert the JSON string back to an object
      const user = JSON.parse(userJSON);
      const localToken = JSON.parse(userToken);
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    // Remove the user data from local storage
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token")
    // Update the state to null
    setLoggedInUser(null);
    setToken(null);
  };

  const user = {
    name: loggedInUser?.username,
    email: loggedInUser?.email,
    imageUrl: loggedInUser?.profileImageUrl,
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-blue-500">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-15"
                        src="/drangonball.png"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
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
    {loggedInUser ? (
      <>
        {loggedInUserNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => (
              // Render the "Sign out" button differently
              item.name === "Sign out" ? (
                <button
                  onClick={handleLogout}
                  className={classNames(
                    "block px-4 py-2 text-sm text-gray-700 w-full text-left",
                    active ? "bg-gray-100" : ""
                  )}
                >
                  {item.name}
                </button>
              ) : (
                <a
                  href={item.href}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )
            )}
          </Menu.Item>
        ))}
      </>
    ) : (
      // Render non-logged-in user navigation items
      nonLoggedInUserNavigation.map((item) => (
        <Menu.Item key={item.name}>
          {({ active }) => (
            <a
              href={item.href}
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700"
              )}
            >
              {item.name}
            </a>
          )}
        </Menu.Item>
      ))
    )}
  </Menu.Items>
</Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    {/* <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {loggedInUser ? (
                      <>
                        {loggedInUserNavigation.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                        {/* Render navigation items specific to logged-in users */}
                        {/* For example: */}
                        {/* <Disclosure.Button
                          as="a"
                          href="/dashboard"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          Dashboard
                        </Disclosure.Button> */}
                        {/* ... Add other logged-in user navigation items */}
                      </>
                    ) : (
                      // Render non-logged-in user navigation items
                      nonLoggedInUserNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div> */}
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {
              <BrowserRouter>
                <Routes>
                  <Route
                    exact
                    path="/anime"
                    element={<Anime loggedInUser={loggedInUser} />}
                  />
                  <Route
                    exact
                    path="/manhwa"
                    element={
                      <Manhwa
                        selectedManhwa={selectedManhwa}
                        setSelectedManhwa={setSelectedManhwa}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/chapters"
                    element={
                      <Chapter
                        selectedManhwa={selectedManhwa}
                        selectedChapter={selectedChapter}
                        setSelectedChapter={setSelectedChapter}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/chapter-List"
                    element={
                      <ChapterList
                      token={token}
                      loggedInUser={loggedInUser}
                        selectedManhwa={selectedManhwa}
                        setSelectedChapter={setSelectedChapter}
                        chapterListData={chapterListData}
                        setChapterListData={setChapterListData}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/signup"
                    element={
                      <Register
                        setLoggedInUser={setLoggedInUser}
                        loggedInUser={loggedInUser}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/login"
                    element={<Login setLoggedInUser={setLoggedInUser} setToken={setToken} />}
                  />

                  <Route
                    exact
                    path="/mySaves"
                    element={<SavedManhwa loggedInUser={loggedInUser} setSelectedManhwa={setSelectedManhwa} token={token} />}
                  />
                </Routes>
              </BrowserRouter>
            }
          </div>
        </main>
      </div>
    </>
  );
}
