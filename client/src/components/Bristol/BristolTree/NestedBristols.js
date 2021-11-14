import Nestable from "react-nestable";
import NestedItem from "./NestedItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./nestedStyles.css";

const NestedBristols = ({ handleItemMove = null, items, handleConfirm }) => {
	return (
		<Nestable
			groupe={1}
			collapsed={true}
			maxDepth={15}
			items={items}
			renderItem={({ item, collapseIcon }) => (
				<NestedItem item={item} collapseIcon={collapseIcon} key={item.id} />
			)}
			onChange={handleItemMove}
			confirmChange={handleConfirm}
			renderCollapseIcon={({ isCollapsed }) =>
				isCollapsed ? (
					<KeyboardArrowRightIcon fontSize="small" />
				) : (
					<KeyboardArrowDownIcon fontSize="small" />
				)
			}
		/>
	);
};

export default NestedBristols;
