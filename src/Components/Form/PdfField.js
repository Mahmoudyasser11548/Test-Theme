/* eslint-disable no-useless-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";
import { useField, useFormikContext } from "formik"; // Import Formik hooks
import { useRef } from "react";

const PdfField = ({
  name,
  enableRemove = true,
  maxFileSize = 50000000,
  multiple = false,
  // eslint-disable-next-line no-unused-vars
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const toast = useRef(null);
  const fileUploadRef = useRef(null);
  const [field, meta] = useField(name);

  const { error } = meta;
  const { value } = field;
  const { base64, url, readUrl } = value;

  let pdfValue =
    base64 || (readUrl && `${process.env.VITE_BASE_URL}/${readUrl}`);

  const isValidpdf = (file) => file?.type?.match(".pdf");

  const onPdfSelect = (e) => {
    let reader = new FileReader();
    let pdfFile = e.files[0];
    let validPdf = isValidpdf(pdfFile);

    let fileName = pdfFile.name.split(".")[0].toLowerCase();
    let extension = pdfFile.name.split(".")[1].toLowerCase();

    if (validPdf && validPdf !== null) {
      reader.onloadend = () => {
        setFieldValue(name, {
          ...value,
          base64: reader.result,
          readUrl: null,
          fileStatus: url ? 2 : 1,
          name: fileName,
          extension,
        });
      };
      reader.readAsDataURL(pdfFile);
      return;
    }
  };

  const onPdfRemove = () =>
    setFieldValue(name, {
      ...value,
      base64: null,
      readUrl: null,
      fileStatus: 3,
    });

  const chooseOptions = {
    icon: "pi pi-fw pi-file",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined d-none",
    disabled: true,
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded rounded-pill p-button-outlined",
  };

  return (
    <div>
      <Toast ref={toast}></Toast>

      <Tooltip
        target=".custom-choose-btn"
        content="Choose Video"
        position="bottom"
      />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        {...field}
        {...props}
        url={pdfValue}
        accept=".pdf"
        maxFileSize={maxFileSize}
        emptyTemplate={
          <p className="m-0">Drag and drop files to here to upload.</p>
        }
        multiple={multiple}
        onSelect={onPdfSelect}
        onError={onPdfRemove}
        onClear={onPdfRemove}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
};

export default PdfField;
