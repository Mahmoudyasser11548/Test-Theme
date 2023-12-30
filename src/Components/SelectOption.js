import { Field } from 'formik'
import React from 'react'
import { Col, Label } from 'reactstrap'

const SelectOption = (prop) => {
  const {name, label, options, ...rest} = prop
  return (
    <Col lg='6' md='6' sm='12'>  
      <Label for='select' className='fs-5 w-50'>{label}</Label>
      <Field 
        as='select' 
        name={name} 
        {...rest} 
        className="w-100 form-control" 
        id='select'

      >
        {
          options.map(option => {
            return (                
              <option 
                className='dropdown-item'
                value={option.value} 
                key={option.value}
              >
                {option.key}
              </option>
            )
          })
        }
      </Field>
    </Col>
  )
}

export default SelectOption