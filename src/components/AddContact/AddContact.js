import React, { useEffect, useState, useContext } from "react";
import { Button, Container, Group, Label } from "react-bootstrap";
import { getAllGroups } from "../../services/groupService";
import { addContact } from "../../services/contactsService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContactContext } from "../../context/contactContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validation/contactValidation";

export default function AddContact() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ContactContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "CLEAR_CONTACT" });
        dispatch({ type: "CHANGR_LOADING" });
        const { data: groupsData } = await getAllGroups();
        dispatch({ type: "GET_ALL_GROUPS", payload: { groups: groupsData } });
        dispatch({ type: "CHANGR_LOADING" });
      } catch (error) {
        dispatch({ type: "CHANGR_LOADING" });
      }
    };
    fetchData();
  }, []);

  const createContact = (e) => {
    dispatch({
      type: "CREATE_CONTACT",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const submitFormHandler = async (values) => {
    try {
      dispatch({ type: "ADD_CONTACT", payload: { values } });
      await addContact(values);
      dispatch({ type: "CLEAR_CONTACT" });
      toast.success("مخاطب با موفقیت ایجاد شد", {
        position: "top-right",
        closeOnClick: true,
      });
      navigate("/contacts");
    } catch (error) {
      toast.error("عملیات  ایجاد مخاطب با مشکل مواجه شد", {
        position: "top-right",
        closeOnClick: true,
      });
    }
  };
  const resetForm = () => {
    dispatch({ type: "CLEAR_CONTACT" });
  };
  return (
    <Container>
      <div>
        <div className="d-flex gap-5 align-items-center justify-content-between mt-5">
          <Formik
            initialValues={{
              fullname: "",
              photo: "",
              job: "",
              email: "",
              mobile: "",
              group: "",
            }}
            validationSchema={contactSchema}
            onSubmit={(values) => submitFormHandler(values)}
          >
            <Form className="d-flex flex-column gap-2 flex-grow-1 w-25">
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
                <option>گروه را انتخاب نمائید</option>
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
                  ساخت مخاطب
                </Button>
                <Button variant="danger" size="sm" onClick={resetForm}>
                  انصراف
                </Button>
              </div>
            </Form>
          </Formik>
          <img src="/images/man-taking-note.png" className="flex-grow-1 w-50" />
        </div>
      </div>
    </Container>
  );
}
