import React from 'react';
import './App.css';
import RCPriorities from './components/RCPriorities.js'
import {SCREENS, REFINEMENT} from "./enums.js"
import RCRefinementScreens from './components/RCRefinementScreens.js'
import $ from './jquery-ajax.js'
import Restaurants from "./restaurants.js"
import deepCopy from "deepCopy";
import RCResults from "components/RCResults.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: SCREENS.PRIORITIES,
      refinementScreen: REFINEMENT.NONE,
      refinements: {cuisines: {}, neighborhoods: {}},
      restaurants: null
    }
  }

  setSearchView(step, refinementScreen, refinements) {
    if (!refinements)
      refinements = {cuisines: {}, neighborhoods: {}}
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

  componentDidMount() {
    $.get("/data/restaurants_recoded.csv", function(data) {
      this.setState({restaurants: new Restaurants(data)});
    }.bind(this))

    document.getElementById("body").style["min-height"] = window.outerHeight + "px";
  }

  render() {
    let view = null;

    let viewResults = function() {
      this.setState({step: SCREENS.SEARCH});
    }.bind(this);

    let viewRefinement = function(e) {
      let refinement = parseInt(e.target.name);
      console.warn(refinement);
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
        neighborhoods={this.state.restaurants.neighborhoods}/>;
    } else if (this.state.step === SCREENS.SEARCH) {
      view = <RCResults 
        restaurants={this.state.restaurants} 
        refinements={this.state.refinements}
        viewRefinement={viewRefinement}/>;
    }

    /*if (this.state.restaurants) 
      debugger;*/

    return (
      <div className="App">
        <header className="App-header">
          Microcosm
        </header>
        {view}
        
      </div>
    );
  }
}

export default App;
