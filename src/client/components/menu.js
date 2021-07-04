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
      dietaries: [],
    };
  }

  componentDidMount() {
    fetch("/api/items")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            menuItems: result?.items,
          });
        },
        (error) => {}
      );
  }

  getDietaries(items) {
    const itemDietaries = items.reduce((result, item) => {
      result.push(...item.dietaries);
      return result;
    }, []);

    const dietaries = [];

    itemDietaries.forEach((item) => {
      const matchingDietaries = dietaries.filter((dietary) => {
        return dietary.name === item;
      });
      const total = (matchingDietaries?.[0]?.total || 0) + 1;

      if (matchingDietaries?.length) {
        matchingDietaries[0].total = total;
      } else {
        dietaries.push({
          name: item,
          total,
        });
      }
    });

    return dietaries;
  }

  onSearch(searchTerm) {
    fetch(`/api/items?search=${searchTerm}`)
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

  removeMenuItem(menuItemId) {
    const selectedMenuItems = [...this.state.selectedMenuItems].filter(
      (menuItem) => menuItem.id !== menuItemId
    );

    this.setState({
      selectedMenuItems,
      dietaries: this.getDietaries(selectedMenuItems),
    });
  }

  selectMenuItem(menuItemId) {
    const selectedMenuItem = this.state.menuItems.filter(
      (menuItem) => menuItem.id === menuItemId
    )[0];

    const selectedMenuItems = [
      ...new Set([...this.state.selectedMenuItems, selectedMenuItem]),
    ];

    if (selectedMenuItem) {
      this.setState({
        selectedMenuItems,
        dietaries: this.getDietaries(selectedMenuItems),
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <MenuSummary
          dietaries={this.state.dietaries}
          total={this.state.selectedMenuItems?.length}
        />
        <MenuBuilder
          menuItems={this.state.menuItems}
          selectedMenuItems={this.state.selectedMenuItems}
          onClick={(menuItemId) => this.selectMenuItem(menuItemId)}
          onRemoveClick={(menuItemId) => this.removeMenuItem(menuItemId)}
          onSearch={(searchTerm) => this.onSearch(searchTerm)}
        />
      </div>
    );
  }
}
