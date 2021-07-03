import React from "react";
import "./menu-item.css";
import { DietaryIcon } from "./dietary-icon.js";

export function MenuItem(props) {
  const dietaries =
    props.menuItem && props.menuItem.dietaries
      ? props.menuItem.dietaries.map((dietary, index) => (
          <DietaryIcon
            key={props.menuItem.id + "-" + index}
            dietary={dietary}
          />
        ))
      : [];

  return props.menuItem ? (
    <li className="item">
      <h2>{props.menuItem.name}</h2>
      <p>{dietaries}</p>
      {props.isRemovable ? <button className="remove-item">x</button> : null}
    </li>
  ) : null;
}
