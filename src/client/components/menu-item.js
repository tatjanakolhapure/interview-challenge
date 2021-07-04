import React from "react";
import "./menu-item.css";
import { DietaryIcon } from "./dietary-icon.js";

export function MenuItem(props) {
  const dietaries = props?.menuItem?.dietaries
    ? props.menuItem.dietaries.map((dietary, index) => (
        <DietaryIcon key={props.menuItem.id + "-" + index} dietary={dietary} />
      ))
    : [];

  function onRemoveClick(event) {
    event.stopPropagation();
    props.onRemoveClick();
  }

  return props?.menuItem ? (
    <li className="item" onClick={props.onClick}>
      <h2>{props.menuItem.name}</h2>
      <p>{dietaries}</p>
      {props.onRemoveClick ? (
        <button type="button" className="remove-item" onClick={onRemoveClick}>
          x
        </button>
      ) : null}
    </li>
  ) : null;
}
