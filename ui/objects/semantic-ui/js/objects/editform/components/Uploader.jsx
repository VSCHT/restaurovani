import React, { useEffect, useRef } from "react";
import { h, render } from "preact";

export const ReactWrapperPdf = ({ preactComponent, props }) => {
  const preactCompRef = useRef();

  useEffect(() => {
    render(
      h(preactComponent, {
        TriggerComponent: ({ onClick, ...props }) =>
          h(
            "button",
            { className: "ui button", onClick: onClick },
            "Dodat soubory"
          ),
        ...props,
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
        TriggerComponent: ({ onClick, ...props }) =>
          h(
            "button",
            { className: "ui button", onClick: onClick },
            "Dodat obrázky"
          ),
        ...props,
      }),
      preactCompRef.current
    );
  });

  return <div ref={preactCompRef} />;
};

export const EditWrapper = ({ preactComponent, props }) => {
  const preactCompRef = useRef();

  useEffect(() => {
    const triggerComponent = ({ onClick, ...triggerProps }) =>
      h(
        "button",
        {
          className: "ui small transparent button",
          title: "Editovat",
          onClick: onClick,
          ...triggerProps,
        },
        [h("img", { src: "/static/images/edit-icon.png", alt: "Edit Button" })]
      );

    render(
      h(preactComponent, { TriggerComponent: triggerComponent, ...props }),
      preactCompRef.current
    );
  }, [preactComponent, props]);

  return <div ref={preactCompRef} />;
};

export const ExtractWrapper = ({ preactComponent, props }) => {
  const preactCompRef = useRef();

  useEffect(() => {
    const triggerComponent = ({ onClick, ...triggerProps }) =>
      h(
        "button",
        {
          className: "ui small transparent button",
          title: "Extrahovat obrázky",
          onClick: onClick,
          ...triggerProps,
        },
        [
          h("img", {
            src: "/static/images/image-icon.png",
            alt: "Extract Button",
          }),
        ]
      );

    render(
      h(preactComponent, { TriggerComponent: triggerComponent, ...props }),
      preactCompRef.current
    );
  }, [preactComponent, props]);

  return <div ref={preactCompRef} />;
};
