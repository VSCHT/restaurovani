import React, { useEffect, useRef } from "react";
import { h, render } from "preact";

export const ReactWrapperPdf = ({ preactComponent, props }) => {

    const preactCompRef = useRef();
  
    useEffect(() => {
   
      render(
        h(preactComponent, {
          TriggerComponent:({onClick, ...props})=>   h("button", { className: 'predmety__form__attachments__btn', onClick: onClick }, "Dodat soubory"),
          ...props 
        }),
        preactCompRef.current
      );

      
    });
  
    return <div ref={preactCompRef} />;
  };

  export const ReactWrapperImg = ({ preactComponent, props }) => {

    const preactCompRef = useRef();
  
    useEffect(() => {
   
      render(
        h(preactComponent, {
          TriggerComponent:({onClick, ...props})=>   h("button", { className: 'predmety__form__attachments__btn', onClick: onClick }, "Dodat obrázky"),
          ...props 
        }),
        preactCompRef.current
      );

      
    });
  
    return <div ref={preactCompRef} />;
  };
  

  export const ReactWrapperEdit = ({ preactComponent, props }) => {

    const preactCompRef = useRef();
  
    useEffect(() => {
   
      render(
        h(preactComponent, {
          TriggerComponent:({onClick, ...props})=>   h("button", { className: 'predmety__form__attachments__btn', onClick: onClick }, "Editovat existujicí přílohy"),
          ...props 
        }),
        preactCompRef.current
      );

      
    });
  
    return <div ref={preactCompRef} />;
  };
  
  