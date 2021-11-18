import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonToolbar, Modal } from "reactstrap";
import classNames from "classnames";

const DeleteModal = ({
    page,
  color,
  title,
  message,
  colored,
  header,
  modal,
  setModal,
  id,
  actionFunction,
}) => {
  const dispatch = useDispatch();
  let Icon;

  switch (color) {
    case "primary":
      Icon = <span className="lnr lnr-pushpin modal__title-icon" />;
      break;
    case "success":
      Icon = <span className="lnr lnr-thumbs-up modal__title-icon" />;
      break;
    case "warning":
      Icon = <span className="lnr lnr-flag modal__title-icon" />;
      break;
    case "danger":
      Icon = <span className="lnr lnr-cross-circle modal__title-icon" />;
      break;
    default:
      break;
  }
  const modalClass = classNames({
    "modal-dialog--colored": colored,
    "modal-dialog--header": header,
  });

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        modalClassName={`ltr-support`}
        className={`modal-dialog--${color} ${modalClass}`}
      >
        <div className="modal__header">
          <button
            className="lnr lnr-cross modal__close-btn"
            type="button"
            onClick={() => setModal(false)}
          />
          {header ? "" : Icon}
          <h4 className="text-modal  modal__title">{title}</h4>
        </div>
        <div className="modal__body">{message}</div>
        <ButtonToolbar className="modal__footer">
          <Button className="modal_cancel" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button
            className="modal_ok"
            color={color}
            onClick={() => {
              dispatch(actionFunction({
                  id:id,
                  page:page
                }));
              setModal(false);
            }}
          >
            Ok
          </Button>
        </ButtonToolbar>
      </Modal>
    </div>
  );
};

export default DeleteModal;

// <Modal
// color="success"
// title="Well Done!"
// header
// btn="Success"
// message="Extremely we promotion remainder eagerness enjoyment an. Ham her demands removal
//  brought minuter raising invited gay. Contented consisted continual curiosity contained get sex.
//  Forth child dried in in aware do. You had met they song how feel lain evil near. Small she
//  avoid six yet table china. And bed make say been then dine mrs. To household rapturous
//  fulfilled attempted on so. "
// />
