import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Table, Dimmer, Loader, Input, Icon } from 'semantic-ui-react';

import { searchUser } from './redux/actions';

const { Header, Row, Body, HeaderCell, Cell } = Table;

export class UsersList extends Component {
  static propTypes = {
    registro: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { fetchUsers } = this.props.actions;
    fetchUsers();
  }

  render() {
    const { users, usersShowLoader, searchUsersLoader } = this.props.registro;
    const { searchUser } = this.props.actions;
    return (
      <div>
        <h1>Lista de Usuarios</h1>
        <br />
        <Dimmer active={usersShowLoader}>
          <Loader size='massive'>Cargando Usuarios</Loader>
        </Dimmer>
        <Input placeholder='Buscar Usuario' loading={searchUsersLoader} onChange={searchUser} />
        <Table celled>
          <Header fullWidth>
            <Row>
              <HeaderCell>Título</HeaderCell>
              <HeaderCell width={3}>Nombre</HeaderCell>
              <HeaderCell>Categoría</HeaderCell>
              <HeaderCell>Opciones</HeaderCell>
            </Row>
          </Header>

          <Body>
            {
              users.length > 0 ?
              users.map(item =>
                <Row key={item.id}>
                  <Cell>{item.titulo}</Cell>
                  <Cell width={3}>{`${item.nombre} ${item.apellido_pa} ${item.apellido_ma}`}</Cell>
                  <Cell>{item.categoria}</Cell>
                  <Cell selectable>
                    <a href={`/registro/users-edit/${item.id}`}>Editar Usuario</a>
                  </Cell>
                </Row>
              )
                : <Row><Cell /></Row>
            }
          </Body>
        </Table>
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
    actions: bindActionCreators({ ...actions, searchUser }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
