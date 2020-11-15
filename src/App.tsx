/* eslint-disable no-restricted-globals */

import React from 'react';
import './App.css';
import RCPriorities from './components/RCPriorities'
import {SCREENS, REFINEMENT} from "./enums.js"
import RCRefinementScreens from './components/RCRefinementScreens'
import $ from './utils/jquery.js'
import Restaurants from "./restaurants"
import RCResults from "./components/RCResults";
import RCRestaurantView from "./components/RCRestaurantView";
import RestaurantSearch from './restaurantSearch';
import Restaurant from './restaurant';
import RCBurgerMenu from './components/RCBurgerMenu';

const PATH_STEP_MAP: { [key: string]: number } = {
  "/restaurants/search": SCREENS.SEARCH,
  "/restaurants/view": SCREENS.VIEW
};

type AppProps = {};

type AppState = {
  step: number, 
  refinementScreen: number, 
  restaurantSearch: RestaurantSearch, 
  restaurants: Restaurants | null,
  restaurantView: string | null,
  openBurgerMenu: boolean
}

class App extends React.Component<AppProps, AppState> {
  statePopped: boolean = false;

  extractViewFromSearch(): string | null {
    let name = (window.location.search.split("name=")[1] || "").split("&")[0] || "";
    name = name.replace("+", " ");
    if (name)
      return decodeURIComponent(name);
    return null;
  }

  decodeHash(): string | null {
    let step = PATH_STEP_MAP[window.location.pathname]
    let view = window.location.hash.split("#view=")[1] || null;
    return decodeURIComponent(view || "") || null;
  }

  constructor(props: AppProps) {
    super(props);

    this.state = {
      step: PATH_STEP_MAP[window.location.pathname] || SCREENS.PRIORITIES,
      refinementScreen: REFINEMENT.NONE,
      restaurantSearch: new RestaurantSearch(window.location.search),
      restaurants: null,
      restaurantView: this.decodeHash() || this.extractViewFromSearch(),
      openBurgerMenu: false
    }

    
  }

  onCloseModal() {
    this.setState({restaurantView: null});
  }

  setSearchView(step: number, refinementScreen: number, refinements: string | undefined) {
    if (!refinements)
      refinements = ""
    this.setState({
      step: step,
      refinementScreen: refinementScreen || REFINEMENT.NONE,
      restaurantSearch: new RestaurantSearch(refinements)
    })
  }

  onTick(e: React.ChangeEvent<HTMLInputElement>) {
    let ns = this.state.restaurantSearch.clone();
    let n = e.currentTarget.name, v = e.currentTarget.value;
    if (n === "cuisines")
      ns.toggleCuisine(v);
    else if (n === 'neighborhoods') 
      ns.toggleNeighborhood(v)
    else if (n === "accessibility")
      ns.toggleAccessibilityCode(v);
    else if (n === "diets")
      ns.toggleDietCode(v);
      
    this.setState({restaurantSearch: ns});
  }

  onClear(category: string) {
    let ns = this.state.restaurantSearch.clone();
    ns.clear(category);
    this.setState({restaurantSearch: ns});
  }

  onPopState(event: Event) {
    this.statePopped = true;

    // Modal stuff
    let restaurantView = this.decodeHash();
    
    if (restaurantView)
      document.getElementsByTagName("body")[0].classList.add("hide-overflow");
    else
      document.getElementsByTagName("body")[0].classList.remove("hide-overflow");

    if (!restaurantView)
      restaurantView = this.extractViewFromSearch();
    
    this.setState({
      step: PATH_STEP_MAP[window.location.pathname] || SCREENS.PRIORITIES,
      restaurantSearch: new RestaurantSearch(window.location.search),
      restaurantView: restaurantView
    });
  }

  componentDidMount() {
    $.get("/data/restaurants_recoded.csv", function(this: App, data: string) {
      let r = new Restaurants(data);
      this.setState({restaurants: r});
    }.bind(this))

    document.getElementsByTagName("body")[0].style.minHeight = window.outerHeight + "px";

    window.onpopstate = this.onPopState.bind(this);
  }

  calculateURL() {
    let s = this.state.step;
    if (s === SCREENS.PRIORITIES) {
      return "/find-some-food";
    } else if (s === SCREENS.SEARCH || s === SCREENS.REFINE) {
      let retval = "/restaurants/search";

      retval += this.state.restaurantSearch.toQueryString();

      if (s === SCREENS.REFINE) {
        retval += "#"+s;
      }

      if (this.state.restaurantView)
        retval += "#view="+this.state.restaurantView;
      return retval;
    } else if (s === SCREENS.VIEW) {
      return "/restaurants/view?name=" + this.state.restaurantView;
    }
  }

  componentDidUpdate() {
    if (this.state.step !== SCREENS.REFINE) {
      let newURL = this.calculateURL();

      if (!this.statePopped && window.location.pathname + window.location.search + (window.location.hash||"#") !== newURL) {
        history.pushState({
          step: this.state.step,
          refinementScreen: this.state.refinementScreen,
          restaurantSearch: this.state.restaurantSearch.toQueryString(),
          restaurantView: this.state.restaurantView
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

  onViewDetails(name: string) {
    this.setState({restaurantView: name});
    document.getElementsByTagName("body")[0].classList.add("hide-overflow");
  }

  toggleMenu() {
    this.setState({openBurgerMenu: !this.state.openBurgerMenu});
  }

  render() {
    let view = null;

    let viewResults = function(this: App) {
      this.setState({step: SCREENS.SEARCH});
    }.bind(this);

    let viewRefinement = function(this: App, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      let refinement = parseInt(e.currentTarget.name);
      this.setState({step: SCREENS.REFINE, refinementScreen: refinement});
    }.bind(this);

    let rs = this.state.restaurantSearch;

    let matches: Restaurant[] = this.state.restaurants?.filter(rs.restaurantMatches.bind(rs)) || [];
    let modal = true;

    if (this.state.step === SCREENS.PRIORITIES)
      view = <RCPriorities onClick={this.setSearchView.bind(this)}/>
    else if (this.state.step === SCREENS.REFINE) {
      view = <RCRefinementScreens 
        currentRefinement={this.state.refinementScreen} 
        restaurantSearch={this.state.restaurantSearch} 
        onTick={this.onTick.bind(this)}
        viewResults={viewResults}
        onClear={this.onClear.bind(this)}
        neighborhoods={this.state.restaurants?.neighborhoods || []}
        resultCount={matches.length}/>;
    } else if (this.state.step === SCREENS.SEARCH) {
      view = this.state.restaurants ? <RCResults 
        restaurants={matches} 
        viewRefinement={viewRefinement}
        onViewDetails={this.onViewDetails.bind(this)}
        restaurantSearch={this.state.restaurantSearch}/> : null;
    } else if (this.state.step === SCREENS.VIEW) {
      modal = false;
    }

    var viewData = null;    
    
    if (this.state.restaurantView && this.state.restaurants)
      viewData = this.state.restaurants.get(this.state.restaurantView);

    return (
      <div className="App">
        <header className="App-header">
          <div className="inner-header">
            <img className="burger-menu-icon" alt="hamburger menu icon" src="/icons/burger-menu.png" onClick={this.toggleMenu.bind(this)}/>
            Microcosm
          </div>
        </header>
        <RCBurgerMenu open={this.state.openBurgerMenu}/>
        {view}
        <RCRestaurantView data={viewData} onClose={this.onCloseModal.bind(this)} modal={modal}/>
      </div>
    );
  }
}

export default App;
