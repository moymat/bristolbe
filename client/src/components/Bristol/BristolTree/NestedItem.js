import React from "react";

const NestedItem = ({ collapseIcon, item, itemsClass = "" }) => {
	return (
		<div className={itemsClass} data-itemid={item.id}>
			{collapseIcon}
			{item.title}
		</div>
	);
};

export default NestedItem;
