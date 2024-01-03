import { useField } from "formik";
import { FormFeedback, Input, Label } from "reactstrap";
import { AutoComplete } from "primereact/autocomplete";
import classnames from "classnames";
import { useDebouncedCallback } from "use-debounce";

function AutoCompleteInput({
  label,
  name,
  options = [],
  optionLabel = "",
  callBack = () => {},
  ...props
}) {
  const [field, meta, helpers] = useField(name);

  const debounced = useDebouncedCallback(
    // function
    ({ query }) => {
      callBack(query);
    },
    // delay in ms
    1000,
  );

  return (
    <>
      {label && (
        <Label className="form-label" htmlFor={name}>
          <h6>{label}</h6>
        </Label>
      )}
      <div className="p-inputgroup">
        <AutoComplete
          className={classnames({
            "p-invalid": meta.error && meta.touched,
          })}
          placeholder={label}
          value={field.value}
          suggestions={options}
          completeMethod={debounced}
          onChange={(e) => {
            helpers.setValue(e.value);
          }}
          field={optionLabel}
          forceSelection
          {...field}
          {...props}
        />
      </div>
      {meta.error && meta.touched && <FormFeedback>{meta.error}</FormFeedback>}
    </>
  );
}

export default AutoCompleteInput;
