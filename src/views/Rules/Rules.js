import React from 'react'
import { Card, CardBody } from 'reactstrap'
import * as Yup from 'yup'
import RadioButton from '../../Components/RadioButton'
import { Form, Formik } from 'formik'
import Edit from './Edit'
import { useDispatch } from 'react-redux'
import { addRule } from '../../redux/rules'

const Rules = () => {
  const dispatch = useDispatch()

  const RadioOptions = [
    {key: 'Refund', value: 'Refund'},
    {key: 'RefundRequest', value: 'RefundRequest'}
  ]

  const initialValues = {
    rule: '',
    property: '' || 'String',
    operator: '' || 'Equals',
    value: ''
  }

  const validationSchema = Yup.object().shape({
    rule: Yup.string().required(),
    property: Yup.string().required(),
    operator: Yup.string().required(),
    value: Yup.string().required()
  })

  const onSubmit = (values) => {
    dispatch(addRule({...values}))
  }

  return (
    <>
    <Card>
      <CardBody>
        <h2 className='text-center'>Rules</h2>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
            {({values}) => {
              
              return (
                <Form>
                  <RadioButton 
                    name="rule"
                    label="Select Rule"
                    options={RadioOptions}
                    />
                  {values.rule !== '' ? <Edit values={values}/> : ''}
                  {console.log(values)}
                </Form>
              )
            }}
        </Formik>
      </CardBody>
    </Card>
      
    </>
  )
}

export default Rules