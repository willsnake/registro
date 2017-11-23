import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Button, Form, Message } from 'semantic-ui-react';
import * as actions from './redux/actions';
import { setEditUserData, printIDEdit, printDiploma } from './redux/actions';


const { Group, Input, Select } = Form;
const { Column, Row } = Grid;
const categories = [
  {
    key: 'ACOMPAÑANTE',
    value: 'ACOMPAÑANTE',
    text: 'ACOMPAÑANTE'
  },
  {
    key: 'PROFESOR',
    value: 'PROFESOR',
    text: 'PROFESOR'
  },
  {
    key: 'PONENTE',
    value: 'PONENTE',
    text: 'PONENTE'
  },
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
            <Row columns={1}>
              <Column>
                <Group widths='equal'>
                  <Input label='Tel. Celular' placeholder='Tel. Celular' name='tel_celular' onChange={setEditUserData} value={userEdit.tel_celular} />
                  <Input label='Email' placeholder='Email' name='email' onChange={setEditUserData} value={userEdit.email} />
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
