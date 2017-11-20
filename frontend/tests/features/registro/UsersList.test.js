import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UsersList } from 'src/features/registro/UsersList';

describe('registro/UsersList', () => {
  it('renders node with correct class name', () => {
    const props = {
      registro: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UsersList {...props} />
    );

    expect(
      renderedComponent.find('.registro-users-list').getElement()
    ).to.exist;
  });
});
