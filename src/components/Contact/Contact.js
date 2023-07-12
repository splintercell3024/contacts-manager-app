import React from "react";
import { ListGroup, Card, Button } from "react-bootstrap";
import { BsFillPenFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Contact({
  id,
  fullname,
  photo,
  email,
  mobile,
  remove,
}) {
  return (
    <Card className="m-3 p-0" style={{ width: 300 }}>
      <Card.Img
        variant="top"
        src={photo ? photo : "/images/image-placeholder.jpg"}
        alt={fullname}
        width={100}
        height={250}
      />
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          نام و نام خانوادگی :<span>{fullname}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          شماره موبایل :<span>{mobile}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          ایمیل :<span>{email}</span>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex justify-content-center align-items-center gap-2">
        <Link to={`/contacts/edit/${id}`} className="">
          <BsFillPenFill />
        </Link>
        <Link to={`/contacts/${id}`} className="">
          <BsEyeFill />
        </Link>
        <Button
          onClick={() => remove(id)}
          style={{ background: "none", color: "red", border: "none" }}
        >
          <FaRegTrashAlt />
        </Button>
      </Card.Body>
    </Card>
  );
}
