import React, { Component } from "react";
import Navbar from "../components/Navbar/";
import Dapp from "../components/Dapp/";
import allDapps from "../data/all-dapps";

export default class Category extends Component {
  state = {
    category: null,
  };

  updateCategory = () => {
    const category = allDapps.find(
      (cat) =>
        cat.name.toLowerCase().replace(" ", "-") ===
        this.props.match.params.category
    );

    if (JSON.stringify(category) !== JSON.stringify(this.state.category)) {
      this.setState({ category });
    }
  };

  componentDidMount() {
    this.updateCategory();
  }

  componentDidUpdate() {
    this.updateCategory();
  }

  render() {
    const { category } = this.state || {};
    if (!category) {
      return null;
    }
    return (
      <div>
        <Navbar title={category.name} />
        <div className={"category-wrapper"}>
          {category.dapps
            .sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0))
            .map((dapp, i) => (
              <Dapp data={dapp} key={dapp.url} position={i} />
            ))}
        </div>
      </div>
    );
  }
}
