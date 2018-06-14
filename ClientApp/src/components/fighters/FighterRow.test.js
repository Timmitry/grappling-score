import * as enzyme from 'enzyme';
import * as React from 'react';
import FighterRow from './FighterRow';

describe('FighterRow', () => {
  let props;
  let mountedFighterRow;
  const fighterRow = () => {
    if (!mountedFighterRow) {
      mountedFighterRow = enzyme.shallow(
        <FighterRow {...props}/>
      );
    }
    return mountedFighterRow;
  }

  beforeEach(() => {
    props = {
      id: 5,
      rank: 2,
      firstName: 'Roger',
      lastName: 'Gracie',
      score: 1234.56,
    }
    mountedFighterRow = undefined;
  });

  it('does something', () => {
    expect(fighterRow().text()).toMatch('Gracie');
  });
});
