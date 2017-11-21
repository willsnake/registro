import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Grid, Button, Form, Message } from 'semantic-ui-react';

import { setEditUserData, printIDEdit, printDiploma } from './redux/actions';

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
    match: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { fetchSingleUser } = this.props.actions;
    const { params } = this.props.match;
    fetchSingleUser({ id: params.id });
  }

  render() {
    const { setEditUserData, printIDEdit, printDiploma } = this.props.actions;
    const { userEdit } = this.props.registro;
    return (
      <div className="registro-add-user">
        <h1>Editar Usuario</h1>
        <br />
        <br />
        <Grid divided='vertically'>
          <Form
            onSubmit={this.props.actions.editUser}
            loading={this.props.registro.loadingUserEditForm}
            success={this.props.registro.editUserSuccessMessage}
            error={this.props.registro.editUserErrorMessage}
          >
            <h3>Nombre</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Titulo' placeholder='Titulo' name='titulo' onChange={setEditUserData} value={userEdit.titulo} />
                  <Input label='Nombre' placeholder='Nombre' name='nombre' onChange={setEditUserData} value={userEdit.nombre} />
                  <Input label='Apellido Paterno' placeholder='Apellido Paterno' name='apellido_pa' onChange={setEditUserData} value={userEdit.apellido_pa} />
                  <Input label='Apellido Materno' placeholder='Apellido Materno' name='apellido_ma' onChange={setEditUserData} value={userEdit.apellido_ma} />
                </Group>
              </Column>
            </Row>
            <h3>Domicilio</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Calle' placeholder='Calle' name='calle' onChange={setEditUserData} value={userEdit.calle} />
                  <Input label='Num. Exterior' placeholder='Num. Exterior' name='no_exterior' onChange={setEditUserData} value={userEdit.no_exterior} />
                  <Input label='Num. Interior' placeholder='Num. Interior' name='no_interior' onChange={setEditUserData} value={userEdit.no_interior} />
                  <Input label='Colonia' placeholder='Colonia' name='colonia' onChange={setEditUserData} value={userEdit.colonia} />
                </Group>
              </Column>
            </Row>
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Delegación (solo CDMX)' placeholder='Delegación (solo CDMX)' name='delegacion' onChange={setEditUserData} value={userEdit.delegacion} />
                  <Input label='Municipio (solo Provincia)' placeholder='Municipio (solo Provincia)' name='municipio' onChange={setEditUserData} value={userEdit.municipio} />
                  <Input label='Ciudad' placeholder='Ciudad' name='ciudad' onChange={setEditUserData} value={userEdit.ciudad} />
                  <Input label='Codigo Postal' placeholder='Codigo Postal' name='cp' onChange={setEditUserData} value={userEdit.cp} />
                </Group>
              </Column>
            </Row>
            <h3>Teléfonos</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Lada' placeholder='Lada' name='tel_lada' onChange={setEditUserData} value={userEdit.tel_lada} />
                  <Input label='Tel. Casa' placeholder='Tel. Casa' name='tel_casa' onChange={setEditUserData} value={userEdit.tel_casa} />
                  <Input label='Tel. Oficina' placeholder='Tel. Oficina' name='tel_oficina' onChange={setEditUserData} value={userEdit.tel_oficina} />
                  <Input label='Tel. Celular' placeholder='Tel. Celular' name='tel_celular' onChange={setEditUserData} value={userEdit.tel_celular} />
                </Group>
              </Column>
            </Row>
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Email' placeholder='Email' name='email' onChange={setEditUserData} value={userEdit.email} />
                </Group>
              </Column>
            </Row>
            <h3>Otros Datos</h3>
            <br />
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='RFC' placeholder='RFC' name='rfc' onChange={setEditUserData} value={userEdit.rfc} />
                  <Input label='CURP' placeholder='CURP' name='curp' onChange={setEditUserData} value={userEdit.curp} />
                  <Input label='Cedula Profesional' placeholder='Cedula Profesional' name='cedula' onChange={setEditUserData} value={userEdit.cedula} />
                  <Select label='Categoría' placeholder='Seleccione la categoría' name='categoria' options={categories} onChange={setEditUserData} defaultValue={userEdit.categoria} />
                </Group>
              </Column>
            </Row>
            <Row columns={1}>
              <Column>
                <Message
                  success
                  visible={this.props.registro.editUserSuccessMessage}
                  header='Usuario editado'
                  content='El usuario ha sido editado con éxito'
                />
                <Message
                  error
                  visible={this.props.registro.editUserErrorMessage}
                  header='Error'
                  content='Ha ocurrido un problema al editar al usuario'
                />
                <Button
                  key='1'
                  type='submit'
                  content='Actualizar'
                />
                <Button
                  key='2'
                  onClick={printIDEdit}
                  content='Imprimir Gafete'
                />
                <Button
                  key='3'
                  onClick={printDiploma}
                  content='Imprimir Constancia'
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
    actions: bindActionCreators({ ...actions, setEditUserData, printIDEdit, printDiploma }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
