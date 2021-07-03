import React from "react";
import "./menu-summary.css";
import { DietaryIcon } from "./dietary-icon.js";

export function MenuSummary() {
  return (
    <div className="menu-summary">
      <div className="container">
        <div className="row">
          <div className="col-6 menu-summary-left">
            <span>6 items</span>
          </div>
          <div className="col-6 menu-summary-right">
            6x <DietaryIcon dietary="ve" />
            4x <DietaryIcon dietary="v" />
            12x <DietaryIcon dietary="n!" />
          </div>
        </div>
      </div>
    </div>
  );
}
