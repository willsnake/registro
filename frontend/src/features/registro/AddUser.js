import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Grid, Button, Form, Message } from 'semantic-ui-react';

import { setUserData, printID } from './redux/actions';

const { Group, Input, Select } = Form;
const { Column, Row } = Grid;
const categories = [
  {
    key: 'ASISTENTE',
    value: 'ASISTENTE',
    text: 'ASISTENTE'
  },
  {
    key: 'EXPOSITOR',
    value: 'EXPOSITOR',
    text: 'EXPOSITOR'
  },
  {
    key: 'COMITÉ ORGANIZADOR',
    value: 'COMITÉ ORGANIZADOR',
    text: 'COMITÉ ORGANIZADOR'
  },
  {
    key: 'STAFF',
    value: 'STAFF',
    text: 'STAFF'
  }
];

export class AddUser extends Component {
  static propTypes = {
    registro: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { setUserData, printID } = this.props.actions;
    return (
      <div className="registro-add-user">
        <h1>Agregar Nuevo Usuario</h1>
        <br />
        <br />
        <Grid divided='vertically'>
          <Form
            onSubmit={this.props.actions.addUser}
            loading={this.props.registro.loadingUserAddForm}
            success={this.props.registro.addUserSuccessMessage}
            error={this.props.registro.addUserErrorMessage}
          >
            <h3>Nombre</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Titulo' placeholder='Titulo' name='titulo' onChange={setUserData} />
                  <Input label='Nombre' placeholder='Nombre' name='nombre' onChange={setUserData} />
                  <Input label='Apellido Paterno' placeholder='Apellido Paterno' name='apellido_pa' onChange={setUserData} />
                  <Input label='Apellido Materno' placeholder='Apellido Materno' name='apellido_ma' onChange={setUserData} />
                </Group>
              </Column>
            </Row>
            <h3>Domicilio</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Calle' placeholder='Calle' name='calle' onChange={setUserData} />
                  <Input label='Num. Exterior' placeholder='Num. Exterior' name='no_exterior' onChange={setUserData} />
                  <Input label='Num. Interior' placeholder='Num. Interior' name='no_interior' onChange={setUserData} />
                  <Input label='Colonia' placeholder='Colonia' name='colonia' onChange={setUserData} />
                </Group>
              </Column>
            </Row>
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Delegación (solo CDMX)' placeholder='Delegación (solo CDMX)' name='delegacion' onChange={setUserData} />
                  <Input label='Municipio (solo Provincia)' placeholder='Municipio (solo Provincia)' name='municipio' onChange={setUserData} />
                  <Input label='Ciudad' placeholder='Ciudad' name='ciudad' onChange={setUserData} />
                  <Input label='Codigo Postal' placeholder='Codigo Postal' name='cp' onChange={setUserData} />
                </Group>
              </Column>
            </Row>
            <h3>Teléfonos</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Lada' placeholder='Lada' name='tel_lada' onChange={setUserData} />
                  <Input label='Tel. Casa' placeholder='Tel. Casa' name='tel_casa' onChange={setUserData} />
                  <Input label='Tel. Oficina' placeholder='Tel. Oficina' name='tel_oficina' onChange={setUserData} />
                  <Input label='Tel. Celular' placeholder='Tel. Celular' name='tel_celular' onChange={setUserData} />
                </Group>
              </Column>
            </Row>
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Email' placeholder='Email' name='email' onChange={setUserData} />
                </Group>
              </Column>
            </Row>
            <h3>Otros Datos</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='RFC' placeholder='RFC' name='rfc' onChange={setUserData} />
                  <Input label='CURP' placeholder='CURP' name='curp' onChange={setUserData} />
                  <Input label='Cedula Profesional' placeholder='Cedula Profesional' name='cedula' onChange={setUserData} />
                  <Select label='Categoría' placeholder='Seleccione la categoría' name='categoria' options={categories} onChange={setUserData} />
                </Group>
              </Column>
            </Row>
            <Row columns={1}>
              <Column>
                <Message
                  success
                  visible={this.props.registro.addUserSuccessMessage}
                  header='Usuario agreado'
                  content='El usuario ha sido agregado con éxito'
                />
                <Message
                  error
                  visible={this.props.registro.addUserErrorMessage}
                  header='Error'
                  content='Ha ocurrido un problema al agregar al usuario'
                />
                <Button
                  key='1'
                  type='submit'
                  content='Agregar'
                />
                <Button
                  key='2'
                  onClick={printID}
                  content='Imprimir Gafete'
                />
              </Column>
            </Row>
          </Form>
        </Grid>

      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    registro: state.registro,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, setUserData, printID }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
