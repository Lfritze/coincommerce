import React from 'react';

// props title, description, children
const Layout = ({title = 'Title', 
  description="Just a filler", 
  className, 
  children
}) => (
  <div>
    <div className="jumbotron">
    <h2>{title}</h2>
    <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;