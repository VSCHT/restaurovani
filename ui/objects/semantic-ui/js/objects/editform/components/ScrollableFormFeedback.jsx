import React from "react";

import { FormFeedback } from "@js/oarepo_ui";
import { useFormikContext } from "formik";
import _isEmpty from "lodash/isEmpty";

export const ScrollableFormFeedback = () => {
  const formik = useFormikContext();

  const formFeedbackRef = React.useRef(null);

  React.useEffect(() => {
    if (formFeedbackRef.current && !_isEmpty(formik.errors)) {
      formFeedbackRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formik.errors]);

  return (
    <div className="form-feedback-wrapper" ref={formFeedbackRef}>
      <FormFeedback />
    </div>
  );
};
