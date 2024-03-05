import React from "react";
import { Button, Modal, Message, Icon } from "semantic-ui-react";
import { useConfirmationModal, useDepositApiClient } from "@js/oarepo_ui";

export const PublishButton = ({ modalMessage, modalHeader }) => {
  const { isModalOpen, handleCloseModal, handleOpenModal } =
    useConfirmationModal();
  const { isSubmitting, publish } = useDepositApiClient();

  return (
    <React.Fragment>
      <Button
        name="publish"
        onClick={handleOpenModal}
        labelPosition="left"
        content={"Publish"}
        type="button"
        disabled={isSubmitting}
        loading={isSubmitting}
        fluid
      />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        size="small"
        closeIcon
        closeOnDimmerClick={false}
      >
        <Modal.Header>{modalHeader}</Modal.Header>
        {modalMessage && (
          <Modal.Content>
            <Message visible warning>
              <p>
                <Icon name="warning sign" /> {modalMessage}
              </p>
            </Message>
          </Modal.Content>
        )}
        <Modal.Actions>
          <Button onClick={handleCloseModal} floated="left">
            {"Cancel"}
          </Button>
          <Button
            name="publish"
            disabled={isSubmitting}
            loading={isSubmitting}
            color="green"
            onClick={() => {
              publish();
              handleCloseModal();
            }}
            labelPosition="left"
            content={"Publish"}
            type="submit"
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

