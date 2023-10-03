import React from "react";
import { Button, Modal,  Message, Icon } from "semantic-ui-react";
import { i18next } from "@translations/restoration_ui/i18next";
import {  useConfirmationModal, useDepositApiClient } from "@js/oarepo_ui";

export const SaveButton = ({ title, ...uiProps }) => {
  const { isSubmitting, save , formik} = useDepositApiClient();
  const { isModalOpen, handleCloseModal, handleOpenModal } =
  useConfirmationModal();
  console.log(useDepositApiClient);

  return (
    <>
     <Button
      name="save"
      className="form main-page__btn__addPredmety"
      aria-label="tlacitko vytvoreni predmetu"
      disabled={isSubmitting}
      loading={isSubmitting}
      onClick={() => {
        const finished= formik.validateForm()
        if(finished == null){
          save()
        }
        console.log(finished)
      }}
      content="VYTVOŘIT PŘEDMĚT"
      type="submit"
    />
     <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        size="small"
        closeIcon
        closeOnDimmerClick={false}
      >
        <Modal.Header>Chyba</Modal.Header>
        
          <Modal.Content>
            <Message visible warning>
              <p>
                <Icon name="warning sign" /> Chyba udaju
              </p>
            </Message>
          </Modal.Content>
        
        <Modal.Actions>
          <Button onClick={handleCloseModal} floated="left">
            {i18next.t("Cancel")}
          </Button>
          <Button
            name="save"
            disabled={isSubmitting}
            loading={isSubmitting}
            color="green"
            onClick={() => {
              save();
              handleCloseModal();
            }}
            labelPosition="left"
            content={i18next.t("Save")}
            type="submit"
          />
        </Modal.Actions>
      </Modal>
    </>
   
  );
};
