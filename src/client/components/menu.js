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

  render() {
    return (
      <div className="wrapper">
        <MenuSummary />
        <MenuBuilder menuItems={this.state.menuItems} />
      </div>
    );
  }
}
