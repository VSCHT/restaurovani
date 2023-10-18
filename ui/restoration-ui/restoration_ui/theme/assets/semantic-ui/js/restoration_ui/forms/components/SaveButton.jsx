import React from "react";
import { Button, Modal, Message, Icon } from "semantic-ui-react";
import { i18next } from "@translations/restoration_ui/i18next";
import { useConfirmationModal, useDepositApiClient } from "@js/oarepo_ui";
import _isEmpty from "lodash/isEmpty";

export const SaveButton = ({ title = "VYTVOŘIT" }) => {
  const { values, isSubmitting, save, formik, setSubmitting } =
    useDepositApiClient();
  const { isModalOpen, handleCloseModal, handleOpenModal, setModalOpen } =
    useConfirmationModal();
  console.log(useDepositApiClient);

  console.log(formik);
  return (
    <>
      <Button
        name="save"
        className="form main-page__btn__addPredmety"
        aria-label="tlacitko vytvoreni predmetu"
        disabled={isSubmitting}
        loading={isSubmitting}
        onClick={
          async () => {
            const err = await formik.validateForm();
            if (!formik.isValid) {handleOpenModal(); return};
            if (!_isEmpty(err)) {handleOpenModal(); return};
            let isVal =
              formik.isValid && Object.keys(formik.touched).length > 0;
            if (isVal) {
              console.log("move to success");
              save();
            }
          }
        }
        content={title}
        type="submit"
      />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        size="small"
        closeIcon
        closeOnDimmerClick={false}
        className="form__modal-err"
      >
        <Modal.Header>Chyba</Modal.Header>

        <Modal.Content>
          
            <p>
              <Icon name="warning sign" /> Všechna vstupní pole musí být vyplněna
            </p>
          
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={handleCloseModal} floated="left" className="form__btn-err">
          Uzavřít
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
