import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { AddUser } from 'src/features/registro/AddUser';

describe('registro/AddUser', () => {
  it('renders node with correct class name', () => {
    const props = {
      registro: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddUser {...props} />
    );

    expect(
      renderedComponent.find('.registro-add-user').getElement()
    ).to.exist;
  });
});
