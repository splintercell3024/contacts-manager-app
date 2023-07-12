import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Contact from "../Contact/Contact";
import { Container, Row } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { NotFound, Spinner } from "../index";
import { getAllContacts, removeContact } from "../../services/contactsService";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { ContactContext } from "../../context/contactContext";

export default function Contacts() {
  const { state, dispatch } = useContext(ContactContext);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "CHANGE_LOADING" });
        const { data: contactData } = await getAllContacts();
        dispatch({
          type: "GET_ALL_CONTACTS",
          payload: { contacts: contactData },
        });
        dispatch({ type: "CHANGE_LOADING" });
      } catch (error) {
        dispatch({ type: "CHANGE_LOADING" });
      }
    };
    fetchData();
  }, [location]);

  const remove = async (contactId, onClose) => {
    try {
      await removeContact(contactId);
      dispatch({ type: "REMOVE_CONTACT", payload: { contactId } });
      toast.error("مخاطب  با موفقیت حذف شد", {
        position: "top-right",
        closeOnClick: true,
      });
      onClose();
    } catch (error) {}
  };

  const removeContactHandler = (contactId) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <Modal onClose={onClose} contactId={contactId} removeContact={remove} />
      ),
    });
  };

  return (
    <Container>
      <Link to="/contacts/add" className="d-block mx-auto my-3 text-center">
        <span>ساخت مخاطب جدید</span>
        <AiOutlinePlusCircle className="mx-2" />
      </Link>
      <Row className="d-flex gap-1 flex-wrap align-items-center justify-content-center">
        {state.loading ? (
          <Spinner />
        ) : state.contacts.length > 0 && state.filteredContacts.length > 0 ? (
          state.filteredContacts.map((contact) => (
            <Contact
              key={contact.id}
              {...contact}
              remove={removeContactHandler}
            />
          ))
        ) : state.contacts.length > 0 ? (
          state.contacts.map((contact) => (
            <Contact
              key={contact.id}
              {...contact}
              remove={removeContactHandler}
            />
          ))
        ) : (
          <NotFound />
        )}
      </Row>
    </Container>
  );
}
