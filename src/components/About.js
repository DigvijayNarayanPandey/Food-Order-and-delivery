import React from 'react'
import UserClass from './UseClass';

class About extends React.Component {
  render() {
    return (
      <div>
        <h1>This is About Page</h1>
        <UserClass name={"Digvijay (class compo)"} />
      </div>
    );
  }
}

export default About;