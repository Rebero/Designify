import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, change as changeFieldValue } from 'redux-form';
import { updateFurniture } from '../actions/furniture.action';
import ColorInput from '../../rooms/components/colorPicker.component.jsx';

const UpdateFurnitureForm = (props) => {
  const { fields: {
    itemName, price, size, description, originalItemName, color
  }, handleSubmit } = props;
  const currentFurnitureObj = props.rooms[props.roomSelected].furniture[props.name];
  const boundUpdateFurniture = props.updateFurniture.bind(null,
    props.name, props.roomSelected, currentFurnitureObj
  );

  return (
    <form onSubmit={ handleSubmit(boundUpdateFurniture) }>
      <table className="furniture-detail">
        <tbody>
          <tr>
            <td>
              <label>Name
                <input type="text" id="itemName" className={ (itemName.touched && itemName.error) ? 'invalid' : 'valid'} { ...itemName }  />
              </label>
              <div className="help-text"><span className="form-warning">{ itemName.touched ? itemName.error : null}</span></div>
            </td>
            <td>
              <label>Price
                <input type="text" className={ price.error ? 'invalid' : 'valid'} { ...price }  />
              </label>
              <div className="help-text"><span className="form-warning">{ price.error }</span></div>
            </td>
          </tr>
          <tr>
            <td>
              <label s={10}>Color
                <input type="text" className={ color.error ? 'invalid' : 'valid'} { ...color }  />
              </label>
                <ColorInput s={2} action={ colorObj => props.changeFieldValue( 'UpdateFurnitureForm' , 'color', colorObj.hex) } />
              <div className="help-text"><span className="form-warning">{ color.error }</span></div>
            </td>
            <td>
              <label>Dimensions
                <input type="text" className={ size.error ? 'invalid' : 'valid'} { ...size }  />
              </label>
              <div className="help-text"><span className="form-warning">{ size.error }</span></div>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <label>Notes
                <textarea className={ description.error ? 'invalid' : 'valid'} { ...description }  />
              </label>
              <div className="help-text"><span className="form-warning">{ description.error }</span></div>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" disabled={props.pristine}>Submit</button>
      <input type="text" className="hidden-field" value={ props.name } disabled { ...originalItemName } aria-hidden="true" />
    </form>
  );
};

const mapStateToProps = ({ roomSelected, rooms }) => ({ roomSelected, rooms });

function validate(values) {
  const errors = {};

  if (!values.itemName) {
    errors.itemName = 'The item must have a name.'
  }
  if (values.price && values.price.match(/\D/)) {
    errors.price = 'The price must only contain numbers.';
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateFurniture, changeFieldValue }, dispatch);
}

export default reduxForm({
  form: 'UpdateFurnitureForm',
  fields: ['itemName', 'price', 'size', 'description', 'color', 'originalItemName'],
  validate,
}, mapStateToProps, mapDispatchToProps)(UpdateFurnitureForm);