import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllGroups } from "../../services/groupService";
import { getContactById, updateContact } from "../../services/contactsService";
import { Container, Button } from "react-bootstrap";
import {toast} from 'react-toastify'
import { ContactContext } from "../../context/contactContext";
import { useContext } from "react";
import Spinner from "../Spinner/Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validation/contactValidation";


export default function EditContact() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const {state,dispatch}=useContext(ContactContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({type:"CHANGE_LOADING"})
        const { data: contactSelected } = await getContactById(contactId);
        const { data: groupsData } = await getAllGroups();
        if (contactSelected) {
          dispatch({type:"GET_CONTACT_BY_ID",payload:{contact:contactSelected}})
          dispatch({type:"GET_ALL_GROUPS",payload:{groups:groupsData}})
          dispatch({type:"CHANGE_LOADING"})
        }
      } catch (error) {
        dispatch({type:"CHANGE_LOADING"})

      }
    };
    fetchData();
  }, [contactId]);


  const setContactInfo = (e) => {
    dispatch({type:"CREATE_CONTACT",payload:{[e.target.name]: e.target.value}})
  };

  const submitFormHandler = async(values) => {
     try {
        dispatch({type:"UPDATE_CONTACT",payload:{contactId,values}})
        await updateContact(contactId,values);
        dispatch({type:"CLEAR_CONTACT"})
        toast.success("مخاطب با موفقیت ویرایش شد", {
          position: "top-right",
          closeOnClick: true,
        });
        navigate("/contacts");
      
     } catch (error) {
      
     }
  };
  const resetForm = () => {
  dispatch({type:"CLEAR_CONTACT"})
 
    navigate("/contacts")
  };
  return (
    state.loading  
    ? <Spinner/>
    :<Container>
      <div className="mt-5">
        <div className="d-flex justify-content-between gap-5  align-items-center">
        <img src="/images/man-taking-note.png" className="flex-grow-1 w-50" />

        <Formik
            initialValues={state.contact}
            validationSchema={contactSchema}
            onSubmit={(values) => submitFormHandler(values)}
          >
            <Form className="d-flex flex-column gap-2 flex-grow-1 w-50">
              <Field
                type="text"
                name="fullname"
                placeholder="نام و نام خانوادگی"
                className="form-control"
              />
              <ErrorMessage name="fullname">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field
                type="text"
                name="photo"
                className="form-control"
                placeholder="آدرس تصویر"
              />
              <ErrorMessage name="photo">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field
                type="text"
                name="mobile"
                className="form-control"
                placeholder="شماره موبایل"
              />
              <ErrorMessage name="mobile">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="آدرس ایمیل"
              />
              <ErrorMessage name="email">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field
                type="text"
                name="job"
                className="form-control"
                placeholder="شغل"
              />
              <ErrorMessage name="job">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <Field as="select" name="group" className="form-control">
                {state.groups.length > 0
                  ? state.groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))
                  : null}
              </Field>
              <ErrorMessage name="group">
                {(msg) => <div style={{ color: "red" }}>{msg}</div>}
              </ErrorMessage>
              <div className="d-flex mt-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="me-3"
                  size="sm"
                >
                  ویرایش مخاطب
                </Button>
                <Button variant="danger" size="sm" onClick={resetForm}>
                  انصراف
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Container>
  );
}
