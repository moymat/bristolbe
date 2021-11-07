import Nestable from "react-nestable";
import NestedItem from "./NestedItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
					// <span className="iconCollapse">+</span>
					<KeyboardArrowRightIcon
						sx={{
							position: "relative",
							top: "5px",
							marginRight: "4px",
							"&:hover": {
								cursor: "pointer",
							},
						}}
					/>
				) : (
					// <span className="iconCollapse">-</span>
					<KeyboardArrowDownIcon
						sx={{
							position: "relative",
							top: "5px",
							marginRight: "4px",
							"&:hover": {
								cursor: "pointer",
							},
						}}
					/>
				)
			}
		/>
	);
};

export default NestedBristols;
