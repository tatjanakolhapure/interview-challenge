import React from "react";
import "./menu-builder.css";
import { MenuItem } from "./menu-item.js";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

export class MenuBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ngUnsubscribe: new Subject(),
      onSearch$: new Subject(),
    };
  }

  componentDidMount() {
    this.state.onSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.state.ngUnsubscribe)
      )
      .subscribe((searchTerm) => {
        this.props.onSearch(searchTerm);
      });
  }

  componentWillUnmount() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSearch = (e) => {
    const search = e.target.value;
    this.state.onSearch$.next(search);
  };

  renderMenuItem(menuItem, isRemovable = false) {
    return (
      <MenuItem
        key={menuItem.id}
        menuItem={menuItem}
        onClick={() => this.props.onClick(menuItem.id)}
        onRemoveClick={
          isRemovable ? () => this.props.onRemoveClick(menuItem.id) : null
        }
      />
    );
  }

  render() {
    const menuItems = (this.props.menuItems || []).map((menuItem) =>
      this.renderMenuItem(menuItem)
    );

    const selectedMenuItems = this.props.selectedMenuItems.length
      ? this.props.selectedMenuItems.map((menuItem) =>
          this.renderMenuItem(menuItem, true)
        )
      : null;

    return (
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <div className="filters">
              <input
                className="form-control"
                placeholder="Name"
                onChange={this.onSearch}
              />
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
}
