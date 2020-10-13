import React from "react";
import { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const MyModal = () => {
  const [is_open, set_open] = useState(false);

  var modal_msg = "Oops, not sure what got you here";

  var handleOpen = () => set_open(true);
  var handleClose = () => set_open(false);

  window.globals.launch_modal = function(opts) {
    var { header, msg } = opts;
    console.log("Opening model with msg: " + msg);
    window.globals.modal_msg = msg;
    window.globals.modal_header = header;
    set_open(true);
  };

  return (
    <Modal open={is_open} onClose={handleClose} size="small">
      {window.globals.modal_header ? (
        <Header content={window.globals.modal_header} />
      ) : null}

      <Modal.Content>
        <h3>{window.globals.modal_msg}</h3>
      </Modal.Content>

      <Modal.Actions>
        <Button color="green" onClick={handleClose} inverted>
          <Icon name="checkmark" />
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default MyModal;
