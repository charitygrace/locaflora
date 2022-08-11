import React from 'react';

function Spinner(props) {
  let size = "";
  if (props.size === 'sm') size='spinner-border-sm'
  return(
      <div className={"spinner-border text-primary ml-3 " + size} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
  );
}

export default Spinner
