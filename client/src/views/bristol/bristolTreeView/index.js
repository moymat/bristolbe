import React from "react";
import Nestable from "react-nestable";
import "./styles.css";
import { createNestedMenu, generateFlatMenu, menus } from "./helper.js";

export default class BristolView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsTemp: []
        };

        this.handleOnChangeSort = this.handleOnChangeSort.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
    }

    componentDidMount() {
        this.setState({
            itemsTemp: createNestedMenu(menus)
        });
    }

    handleOnChangeSort(items) {
        this.setState({
            itemsTemp: items
        });
    }

    handleGenerate() {
        const { itemsTemp } = this.state;
        const flatMenu = generateFlatMenu(itemsTemp);

        console.log(flatMenu);
        console.log(itemsTemp);
    }

    render() {
        return (
            <div>
                <Nestable
                    collapsed={true}
                    maxDepth={15}
                    items={this.state.itemsTemp}
                    renderItem={({ item, collapseIcon }) => (
                        <div className="listMenu">
                            {collapseIcon}
                            {item.label}
                        </div>
                    )}
                    onChange={this.handleOnChangeSort}
                    renderCollapseIcon={({ isCollapsed }) =>
                        isCollapsed ? (
                            <span className="iconCollapse">+</span>
                        ) : (
                            <span className="iconCollapse">-</span>
                        )
                    }
                />

                {/* <button onClick={this.handleGenerate}>Generate</button> */}
            </div>
        );
    }
}

