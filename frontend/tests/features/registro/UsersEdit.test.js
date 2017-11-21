import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UsersEdit } from 'src/features/registro/UsersEdit';

describe('registro/UsersEdit', () => {
  it('renders node with correct class name', () => {
    const props = {
      registro: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <UsersEdit {...props} />
    );

    expect(
      renderedComponent.find('.registro-users-edit').getElement()
    ).to.exist;
  });
});
