import { Navigate } from "react-router-dom";
import { AddContact, Contacts, NotFound } from "./components";
import Contact from "./components/Contact/Contact";
import EditContact from "./components/EditContact/EditContact";
import Home from "./components/Home/Home";
import Layouts from "./components/Layouts/Layouts";
import ViewContact from "./components/ViewContact/ViewContact";

export const routes = [
  {
    path: "/",
    element: <Layouts />,
    children: [
      { index: true, element: <Navigate to='contacts' replace/> },
      { path: "contacts", element: <Contacts /> },
      { path: "contacts/add", element: <AddContact /> },
      { path: "contacts/:contactId", element: <ViewContact /> },
      { path: "contacts/edit/:contactId", element: <EditContact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
