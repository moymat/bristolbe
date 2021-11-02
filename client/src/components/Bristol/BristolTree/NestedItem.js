const NestedItem = ({ collapseIcon, item }) => {
	return (
		<div
			className={`listMenu${item.role === "editor" ? "" : "Read"}`}
			data-itemid={item.id}>
			{collapseIcon}
			{item.title}
		</div>
	);
};

export default NestedItem;
