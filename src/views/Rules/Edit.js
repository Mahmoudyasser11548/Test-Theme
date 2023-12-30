import React from 'react'
import SelectOption from '../../Components/SelectOption'
import { Button, Row } from 'reactstrap'
import InputField from '../../Components/InputField'
import { useSelector } from 'react-redux'

const Edit = (prop) => {
  const {values} = prop
  const {loading, error} = useSelector(state => state.rule)

  const properyNameOptions = [
    {key: 'String', value: 'String'},
    {key: 'Integer', value: 'Integer'}
  ]

  const operatorStringOptions = [
    {key: 'Equals', value: 'Equals'},
    {key: 'Contains', value: 'Contains'},
    {key: 'Not Contains', value: 'Not Contains'},
    {key: 'Ends With', value: 'Ends With'},
    {key: 'Starts With', value: 'Starts With'}
  ]

  const operatorIntegerOptions = [
    {key: 'Equals', value: 'Equals'},
    {key: 'Greater than', value: 'Greater than'},
    {key: 'Less than', value: 'Less than'},
    {key: 'Maximum', value: 'Maximum'},
    {key: 'Minimum', value: 'Minimum'}
  ]

  return (
    <>
      <Row>
        <SelectOption 
          name="property"
          label='Property Name'
          options={properyNameOptions}
        />
        
        <SelectOption 
          name="operator"
          label="Operator"
          options={
            values.property === "String" ? operatorStringOptions : operatorIntegerOptions
          }
        />

        <InputField 
          name="value"
          type="text"
          label="Rule Value"
          placeholder="value"
        />
      </Row>

      { loading ? <div className='w-100 my-2'>
          <button type="submit" className="btn btn-primary text-center">Loading..</button>
        </div> : <div className='w-100 my-2'>
          <button type="submit" className="btn btn-primary text-center">Apply</button>
        </div>
      }

      { error && loading === false && 'error ....' }

    </>
  )
}

export default Edit