import { Field } from 'formik'
import React from 'react'
import { Col, Input, Label } from 'reactstrap'

const InputField = (prop) => {
  const {name, label, ...rest} = prop

  return (
    <Col lg='6' md='6' sm='12'>
      <Label className='fs-5 mt-1'>{label}</Label>
      <Field name={name} id={name} {...rest} className="form-control"/>
    </Col>
  )
}

export default InputField