import React, { MouseEvent, PropsWithChildren } from "react";

interface IProps {
  className?: string;
  onClick?: (ev: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  disabled?: boolean;
}

export default function Button(props: PropsWithChildren<IProps>) {
  return (
    <button
      type="button"
      className={`${props.className} button`}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.className}
    >
      {props.children}
    </button>
  );
}
