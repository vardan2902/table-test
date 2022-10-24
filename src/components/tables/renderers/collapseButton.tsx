import React from "react";

const CollapseButton = (props: any) => {
  const toggleExpansion = () => {
    if (props.node.expanded) {
      props.node.setExpanded(false);
    } else {
      props.node.setExpanded(true);
    }
    props.api.onGroupExpandedOrCollapsed();
  }

  return (
    <div className="collapse-first-cell">
      <p
        onClick={() => toggleExpansion()}
      >{ props.node.expanded ? "-" : "+" }</p>
    </div>
  );
};

export default CollapseButton;