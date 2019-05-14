import React from 'react';
import { Container } from 'reactstrap';
import Navbar from './Navbar';

export default ({ toggle, isOpened, isAuthorized, ...props }) => {
  return (
    <div className='container'>
      <Navbar toggle={toggle} isOpened={isOpened} isAuthorized={isAuthorized} />
      <Container>
        {props.children}
      </Container>
      <div className="notifications-container"></div>
    </div>
  );
}
