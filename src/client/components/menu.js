import React from "react";
import "./menu.css";
import { MenuSummary } from "./menu-summary.js";
import { MenuBuilder } from "./menu-builder.js";

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      selectedMenuItems: [],
    };
  }

  componentDidMount() {
    fetch("/api/items")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            menuItems: result.items,
          });
        },
        (error) => {}
      );
  }

  selectMenuItem(menuItemId) {
    const selectedMenuItem = this.state.menuItems.filter(
      (menuItem) => menuItem.id === menuItemId
    )[0];

    if (selectedMenuItem) {
      this.setState({
        menuItems: this.state.menuItems,
        selectedMenuItems: [
          ...new Set([...this.state.selectedMenuItems, selectedMenuItem]),
        ],
      });
    }
  }

  removeMenuItem(menuItemId) {
    const selectedMenuItems = [...this.state.selectedMenuItems].filter(
      (menuItem) => menuItem.id !== menuItemId
    );

    this.setState({
      menuItems: this.state.menuItems,
      selectedMenuItems,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <MenuSummary />
        <MenuBuilder
          menuItems={this.state.menuItems}
          selectedMenuItems={this.state.selectedMenuItems}
          onClick={(menuItemId) => this.selectMenuItem(menuItemId)}
          onRemoveClick={(menuItemId) => this.removeMenuItem(menuItemId)}
        />
      </div>
    );
  }
}
