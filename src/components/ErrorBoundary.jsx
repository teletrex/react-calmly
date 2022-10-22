/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //  logErrorToMyService(error, errorInfo);
    this.state = {hasError: true, error:error, errorInfo: errorInfo};
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div><h4>This widget is not currently available. </h4>
               <p>{this.state.error}</p>
               <p>{this.state.errorInfo}</p>
      </div>;
    }
    return this.props.children;
  }
};

export default ErrorBoundary;


