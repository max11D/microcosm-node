/* eslint-disable no-restricted-globals */

import React from 'react';
import './App.css';
import RCPriorities from './components/RCPriorities.js'
import {SCREENS, REFINEMENT} from "./enums.js"
import RCRefinementScreens from './components/RCRefinementScreens.js'
import $ from './utils/jquery.js'
import Restaurants from "./restaurants.ts"
import deepCopy from "utils/deepCopy";
import RCResults from "components/RCResults.js";
import RCRestaurantView from "components/RCRestaurantView";

const PATH_STEP_MAP = {
  "/restaurants/search": SCREENS.SEARCH,
  "/restaurants/view": SCREENS.VIEW
};

class App extends React.Component {
  parseRefinementsFromURL() {
    var refinements = {cuisines: {}, neighborhoods: {}, accessibility: {}};

    window.location.search.replace("?", "").split("&").forEach((x) => {
      let y = x.split("=");
      var k = y[0], v = y[1];
      refinements[k] = {};

      if (v) {
        v.split(",").forEach((x) => {
          refinements[k][x] = true;
        });
      }
    });

    return refinements;
  }

  decodeHash() {
    let view = window.location.hash.split("#view=")[1] || null;

    if (view) {
      view = decodeURIComponent(view);
    }

    return view;
  }

  constructor(props) {
    super(props);

    this.state = {
      step: PATH_STEP_MAP[window.location.pathname] || SCREENS.PRIORITIES,
      refinementScreen: REFINEMENT.NONE,
      refinements: this.parseRefinementsFromURL(),
      restaurants: null,
      restaurantView: this.decodeHash()
    }

    console.warn(this.state);
  }

  onCloseModal() {
    this.setState({restaurantView: null});
  }

  setSearchView(step, refinementScreen, refinements) {
    if (!refinements)
      refinements = {cuisines: {}, neighborhoods: {}, accessibility: {}}
    this.setState({
      step: step,
      refinementScreen: refinementScreen || REFINEMENT.NONE,
      refinements: refinements
    })
  }

  onTick(e) {
    let t = e.target;
    let x = t.name.split(".");
    let ns = deepCopy(this.state.refinements);
    ns[x[0]][x[1]] = !ns[x[0]][x[1]];
    this.setState({refinements: ns});
  }

  onClear(category) {
    let ns = deepCopy(this.state.refinements);
    ns[category] = {};
    this.setState({refinements: ns});
  }

  onPopState(event) {
    this.statePopped = true;

    let restaurantView = this.decodeHash();
    
    if (restaurantView)
      document.getElementsByTagName("body")[0].classList.add("hide-overflow");
    else
      document.getElementsByTagName("body")[0].classList.remove("hide-overflow");

    this.setState({
      step: PATH_STEP_MAP[window.location.pathname] || SCREENS.PRIORITIES,
      refinements: this.parseRefinementsFromURL(),
      restaurantView: restaurantView
    });
  }

  componentDidMount() {
    $.get("/data/restaurants_recoded.csv", function(data) {
      let r = new Restaurants(data);
      this.setState({restaurants: r});
    }.bind(this))

    document.getElementById("body").style["min-height"] = window.outerHeight + "px";

    window.onpopstate = this.onPopState.bind(this);
  }

  calculateURL() {
    let s = this.state.step;
    if (s === SCREENS.PRIORITIES) {
      return "/find-some-food";
    } else if (s === SCREENS.SEARCH || s === SCREENS.REFINE) {
      let retval = "/restaurants/search";
      var refinements = this.state.refinements;

      let params = Object.entries(refinements).map((rmnt) => {
        if (!rmnt[1])
          return null;
        let rv =  Object.entries(rmnt[1]).map((x) => { return x[0]; });
        if (rv.length > 0) 
          return rmnt[0] + "=" + rv.join(",");
        else
          return null;
      }).filter((x) => { return !!x; });
        
      if (params.length > 0) {
        retval += "?" + params.join("&");
      }

      if (s === SCREENS.REFINE) {
        retval += "#"+s;
      }

      if (this.state.restaurantView)
        retval += "#view="+this.state.restaurantView;
      else
        retval += "#";
      return retval;
    }
  }

  componentDidUpdate() {
    if (this.state.step !== SCREENS.REFINE) {
      let newURL = this.calculateURL();

      if (!this.statePopped && window.location.pathname + window.location.search + (window.location.hash||"#") !== newURL) {
        let s = deepCopy(this.state);

        history.pushState({
          step: s.step,
          refinementScreen: s.refinementScreen,
          refinements: s.refinements,
          restaurantView: s.restaurantView
        }, "Microcosm", newURL);
      }

      this.statePopped = false;
    }

    if (!this.state.restaurantView)
      document.getElementsByTagName("body")[0].classList.remove("hide-overflow");
  }

  getSnapshotBeforeUpdate() {
    let footer = document.getElementsByTagName("footer")[0];
    if (this.state.step === SCREENS.REFINE || this.state.step === SCREENS.SEARCH)
      footer.classList.add("hidden");
    else
      footer.classList.remove("hidden");
    return null;
  }

  onViewDetails(name) {
    this.setState({restaurantView: name});
    document.getElementsByTagName("body")[0].classList.add("hide-overflow");
  }

  render() {
    let view = null;

    let viewResults = function() {
      this.setState({step: SCREENS.SEARCH});
    }.bind(this);

    let viewRefinement = function(e) {
      let refinement = parseInt(e.target.name);
      this.setState({step: SCREENS.REFINE, refinementScreen: refinement});
    }.bind(this);

    if (this.state.step === SCREENS.PRIORITIES)
      view = <RCPriorities onClick={this.setSearchView.bind(this)}/>
    else if (this.state.step === SCREENS.REFINE) {
      view = <RCRefinementScreens 
        currentRefinement={this.state.refinementScreen} 
        refinements={this.state.refinements} 
        onTick={this.onTick.bind(this)}
        viewResults={viewResults}
        onClear={this.onClear.bind(this)}
        neighborhoods={this.state.restaurants.neighborhoods}/>;
    } else if (this.state.step === SCREENS.SEARCH) {
      view = this.state.restaurants ? <RCResults 
        restaurants={this.state.restaurants} 
        refinements={this.state.refinements}
        viewRefinement={viewRefinement}
        onViewDetails={this.onViewDetails.bind(this)}/> : null;
    }

    var viewData = null;    
    
    if (this.state.restaurantView && this.state.restaurants)
      viewData = this.state.restaurants.get(this.state.restaurantView);

    return (
      <div className="App">
        <header className="App-header">
          Microcosm
        </header>
        {view}
        <RCRestaurantView data={viewData} onClose={this.onCloseModal.bind(this)}/>
      </div>
    );
  }
}

export default App;
