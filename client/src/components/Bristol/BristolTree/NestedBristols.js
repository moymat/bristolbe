import Nestable from "react-nestable";
import NestedItem from "./NestedItem";
import "./nestedStyles.css";

const NestedBristols = ({
	handleItemMove = null,
	items,
	itemsClass,
	handleConfirm,
}) => {
	return (
		<Nestable
			groupe={1}
			collapsed={true}
			maxDepth={15}
			items={items}
			confirmChange={handleConfirm}
			renderItem={({ item, collapseIcon }) => (
				<NestedItem
					item={item}
					collapseIcon={collapseIcon}
					itemsClass={itemsClass}
					key={item.id}
				/>
			)}
			onChange={handleItemMove}
			renderCollapseIcon={({ isCollapsed }) =>
				isCollapsed ? (
					<span className="iconCollapse">+</span>
				) : (
					<span className="iconCollapse">-</span>
				)
			}
		/>
	);
};

export default NestedBristols;
