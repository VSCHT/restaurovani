import React, {useState} from "react";
import { Button, Modal, Icon } from "semantic-ui-react";
import { useConfirmationModal, useDepositApiClient } from "@js/oarepo_ui";
import _isEmpty from "lodash/isEmpty";

export const SaveButton = ({ title = "VYTVOŘIT"}) => {
  const { values, isSubmitting, save, formik } = useDepositApiClient();

  const { isModalOpen, handleCloseModal, handleOpenModal } =
    useConfirmationModal();

  const [successObject, setSuccessObject]= useState(false)

  const handleCloseSuccessModal=()=>{
    setSuccessObject(false)
  }
  return (
    <>
      <Button
        name="save"
        className="form main-page__btn__addPredmety"
        aria-label="tlacitko vytvoreni predmetu"
        disabled={isSubmitting}
        loading={isSubmitting}
        onClick={async () => {
          
          const err = await formik.validateForm();
          formik.setErrors({});
          if (!formik.isValid) {
            handleOpenModal();

            return;
          }
          if (!_isEmpty(err)) {
            console.log(err)
            handleOpenModal();
            return;
          }
          console.log("move to success");
          console.log(formik)
          save();
          setSuccessObject(true)
        }}
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
          <Button
            onClick={handleCloseModal}
            floated="left"
            className="form__btn-err"
          >
            Uzavřít
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        open={successObject}
        onClose={handleCloseSuccessModal}
        size="small"
        closeIcon
        closeOnDimmerClick={false}
        className="form__modal-err"
      >
        <Modal.Header>V pořadku</Modal.Header>

        <Modal.Content>
          <p>
            <Icon name="check" /> Změny byli uspěšně uloženy
          </p>
        </Modal.Content>

        <Modal.Actions>
          <Button
            onClick={handleCloseSuccessModal}
            floated="left"
            className="form__btn-err"
          >
            Uzavřít
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
