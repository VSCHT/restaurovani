import React, { useEffect, useRef } from "react";
import { h, render } from "preact";

export const ReactWrapper = ({ preactComponent, props }) => {

    const preactCompRef = useRef();
  
    useEffect(() => {
   
      render(
        h(preactComponent, {
          TriggerComponent:({onClick, ...props})=>   h("button", { className: 'predmety__form__attachments__btn', onClick: onClick }, "Dodat přílohy"),
          ...props 
        }),
        preactCompRef.current
      );

      
    });
  
    return <div ref={preactCompRef} />;
  };
  
  