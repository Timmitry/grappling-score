import * as enzyme from 'enzyme';
import * as React from 'react';
import FighterDetail from './Fighter';

describe('FighterDetail', () => {
  let props;
  let mountedFighterDetail;
  const fighterDetail = () => {
    if (!mountedFighterDetail) {
      mountedFighterDetail = enzyme.shallow(
        <FighterDetail {...props}/>
      );
    }
    return mountedFighterDetail;
  }

  beforeEach(() => {
    props = {
      match: { params: { number: 3 } },
      firstName: 'Roger',
      lastName: 'Gracie',
      score: 1234.56,
      isLoaded: true,
      error: null,
    }
    mountedFighterDetail = undefined;
  });

  it('does something', () => {
    expect(fighterDetail().state().isLoaded).toEqual(false);
    expect(fighterDetail().text()).toMatch('First Name:');
  });
});
