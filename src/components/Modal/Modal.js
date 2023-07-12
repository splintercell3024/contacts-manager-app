import React from "react";
import { Button } from "react-bootstrap";

export default function Modal({ onClose, contactId, removeContact }) {
  return (
    <div
      className="custom-ui border-1 bg-dark text-white p-3 rounded-2"
      style={{ background: "#ccc" }}
    >
      <h4>حذف مخاطب</h4>
      <p>آیا شما از حذف این مخاطب اطمینان دارید ؟</p>
      <div className="d-flex justify-content-end">
        <Button
          variant="danger"
          size="sm"
          onClick={() => {
            removeContact(contactId, onClose);
          }}
        >
          تائید
        </Button>
        <Button
          onClick={onClose}
          variant="secondary"
          size="sm"
          className="ms-2"
        >
          انصراف
        </Button>
      </div>
    </div>
  );
}
