import { useState, useEffect, useCallback, useRef } from "react";
import Nestable from "react-nestable";
import NestedItem from "./NestedItem";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./nestedStyles.css";

const NestedBristols = ({ handleItemMove = null, items, handleConfirm }) => {
	const currentScroll = useRef(0);

	useEffect(() => {
		const tree = document.querySelector(".tree-container");
		tree.addEventListener("scroll", () => {
			currentScroll.current = tree.scrollTop;
		});
	}, []);

	useEffect(() => {
		const nestable = document.querySelector(".nestable");
		const observer = new MutationObserver(mutationList => {
			let drag;
			mutationList.forEach(mut => {
				drag = Array.from(mut.addedNodes).find(
					node => node.className === "nestable-drag-layer"
				);
				if (drag) {
					drag.style.top = `${currentScroll.current}px`;
				}
			});
		});
		observer.observe(nestable, { childList: true });
	}, []);

	return (
		<Box>
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
		</Box>
	);
};

export default NestedBristols;
