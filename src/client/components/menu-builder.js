import React from "react";
import "./menu-builder.css";
import { MenuItem } from "./menu-item.js";

export function MenuBuilder(props) {
  const menuItems = (props.menuItems || []).map((menuItem) => (
    <MenuItem
      key={menuItem.id}
      menuItem={menuItem}
      onClick={() => props.onClick(menuItem.id)}
    />
  ));

  const selectedMenuItems = props.selectedMenuItems.length
    ? props.selectedMenuItems.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          menuItem={menuItem}
          isRemovable="true"
          onClick={() => props.onClick(menuItem.id)}
        />
      ))
    : null;

  return (
    <div className="container menu-builder">
      <div className="row">
        <div className="col-4">
          <div className="filters">
            <input className="form-control" placeholder="Name" />
          </div>
          <ul className="item-picker">{menuItems}</ul>
        </div>
        <div className="col-8">
          <h2>Menu preview</h2>
          <ul className="menu-preview">{selectedMenuItems}</ul>
        </div>
      </div>
    </div>
  );
}
