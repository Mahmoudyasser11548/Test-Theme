import { Field } from 'formik'
import React from 'react'
import { Col, Input, Label } from 'reactstrap'

const RadioButton = (prop) => {
  const {name, label, options, ...rest} = prop
  
  return (
    <>
      <div>
        <Label className='fs-3'>{label}</Label>
        <Field name={name} {...rest}>
          {({field}) => {
              return options.map(option => {
                return (
                  <React.Fragment key={option.key}>
                    <Col className='m-2' lg='6' md='6' sm='6'>
                      <Input 
                        className=''
                        type='radio'
                        id={option.value}
                        {...field}
                        value={option.value}
                        checked={field.value === option.value}
                      />
                      <Label for={option.value} className='ms-1 fs-5'>{option.key}</Label>
                    </Col>
                  </React.Fragment>
                )
              })
            }
          }
        </Field>
      </div>
    </>
  )
}

export default RadioButton