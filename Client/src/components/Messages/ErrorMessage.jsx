import React from 'react';

function ErrorMessege({ setWrongRequest }) {
  return (
    <div >
      <h1>ERROR!!</h1>
      <button onClick={() => { setWrongRequest(false) }}>Try Again</button>
    </div>
  );
}

export default ErrorMessege;
