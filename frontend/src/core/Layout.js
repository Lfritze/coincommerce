import React from 'react';
import Menu from './Menu'

// props title, description, children
const Layout = ({title = 'Title Filler', 
  description="Description Filler", 
  className, 
  children
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
    <h2>{title}</h2>
    <p className="lead">{description}</p>
    </div>
    {/* We can pass this {className} to render {children} - the main content of the children props*/}
    <div className={className}>{children}</div>
  </div>
);

export default Layout;