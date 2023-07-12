import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, ListGroup } from "react-bootstrap";
import { getContactById } from "../../services/contactsService";
import Spinner from "../Spinner/Spinner";
import { getGroupById } from "../../services/groupService";
import { ContactContext } from "../../context/contactContext";

export default function ViewContact() {
  const { contactId } = useParams();
  const { state, dispatch } = useContext(ContactContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "CHANGE_LOADING" });
        const { data: contactData } = await getContactById(contactId);
        const { data: groupData } = await getGroupById(contactData.group);
        dispatch({
          type: "GET_CONTACT_BY_ID",
          payload: { contact: contactData },
        });
        dispatch({
          type: "GET_GROUP_BY_CONTACT_GROUP",
          payload: { group: groupData },
        });
        dispatch({ type: "CHANGE_LOADING" });
      } catch (error) {
        dispatch({ type: "CHANGE_LOADING" });
      }
    };
    fetchData();
  }, []);
  const { fullname, email, job, mobile, photo } = state.contact;
  return state.loading ? (
    <Spinner />
  ) : (
    <Container>
      <div className="d-flex justify-content-between align-content-center mt-3 w-75 border-bottom">
        <h3>اطلاعات مخاطب</h3>
        <Link to="/contacts" className="">
          برگشت به مخاطبین
        </Link>
      </div>
      <div className="d-flex align-items-center mt-4 gap-3">
        <img src={photo} alt={fullname} with={100} height={200} />
        <ListGroup className="w-50">
          <ListGroup.Item>
            نام و نام خانوادگی : <span>{fullname}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            شماره موبایل : <span>{mobile}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            ایمیل : <span>{email}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            شغل : <span>{job}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            گروه : <span>{state.group.name}</span>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Container>
  );
}
