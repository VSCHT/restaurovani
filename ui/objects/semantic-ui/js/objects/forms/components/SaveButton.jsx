import React from "react";
import { Button } from "semantic-ui-react";
import { useDepositApiClient } from "@js/oarepo_ui";
import _isEmpty from "lodash/isEmpty";
import _unset from "lodash/unset";
import _has from "lodash/has";
import _isObject from "lodash/isObject";
import _forEach from "lodash/forEach";
import _isArray from "lodash/isArray";
import {
  OARepoDepositSerializer,
} from "@js/oarepo_ui";

class RestorationDepositSerializer extends OARepoDepositSerializer {
  removeKeysFromNestedObjects = (obj, keyPathsToRemove) => {
    for (let keyPathToRemove of keyPathsToRemove) {
      if (_isObject(obj)) {
        if (obj[keyPathToRemove] !== undefined || _has(obj, keyPathToRemove)) {
          _unset(obj, keyPathToRemove);
        }

        _forEach(obj, (value, key) => {
          if (_isObject(value) || _isArray(value)) {
            obj[key] = this.removeKeysFromNestedObjects(value, keyPathsToRemove);
          }
        });
      } else if (_isArray(obj)) {
        _forEach(obj, (item, index) => {
          obj[index] = this.removeKeysFromNestedObjects(item, keyPathsToRemove);
        });
      }
    }

    return obj;
  };
}

const RESTORATION_KEY_PATHS_TO_REMOVE = [
  "__key",
  "metadata.restorationWork.supervisors.data",
  "metadata.restorationWork.supervisors.key",
  "metadata.restorationWork.supervisors.value",
  "metadata.restorationWork.supervisors.title",
  "metadata.restorationWork.supervisors.name",
]

export const SaveButton = ({ title = "VYTVOŘIT", edit = false }) => {
  const { isSubmitting, preview, formik } = useDepositApiClient({ 
    serializer: RestorationDepositSerializer, 
    keysToRemove: RESTORATION_KEY_PATHS_TO_REMOVE 
  });

  const previewRecord = async () => {
    const err = await formik.validateForm();
    if (!formik.isValid || !_isEmpty(err)) {
      return;
    }

    const res = await preview();

    if (!res) {
      console.error("BEvalidationErrors", formik.errors["BEvalidationErrors"]);
      console.error("httpErrors", formik.errors["httpErrors"]);
    }
  }

  return (
    <Button
      primary
      name="save"
      aria-label="tlacitko vytvoreni predmetu"
      disabled={isSubmitting}
      loading={isSubmitting}
      data-testid="submit-button"
      onClick={previewRecord}
      content={title}
      type="submit"
    />
  );
};
