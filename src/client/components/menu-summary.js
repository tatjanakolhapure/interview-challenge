import React from "react";
import "./menu-summary.css";
import { DietaryIcon } from "./dietary-icon.js";

export function MenuSummary(props) {
  function renderDietary(dietary) {
    return (
      <span key={dietary.name}>
        <span>{dietary.total}x</span>
        <DietaryIcon dietary={dietary.name} />
      </span>
    );
  }

  const dietaries = (props?.dietaries || []).map((dietary) =>
    renderDietary(dietary)
  );

  return (
    <div className="menu-summary">
      <div className="container">
        <div className="row">
          <div className="col-6 menu-summary-left">
            <span>{props?.total || 0} items</span>
          </div>
          <div className="col-6 menu-summary-right">{dietaries}</div>
        </div>
      </div>
    </div>
  );
}
