/* <LICENSE>
* 
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
* 
* </LICENSE>
*  */



import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ rootId, children }) => {
  const target = useRef(null);

  useEffect(() => {
    let container = document.getElementById(rootId);
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("id", rootId);
      document.body.appendChild(container);
    }

    container.appendChild(target.current);

    return () => {
      target.current.remove();
      if (container.childNodes.length === 0) {
        container.remove();
      }
    };
  }, [rootId]);

  if (!target.current) {
    target.current = document.createElement("div");
  }

  return ReactDOM.createPortal(children, target.current);
};

export default Portal;
