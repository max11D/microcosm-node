export const FIELD_RECODES = {"cuisines":["Afghan","American","Bengali","Chinese","Colombian","Creole","Eastern European","Halal Cart","Indian","Italian","Jamaican","Japanese","Korean","Latin","Malaysian","Mexican","Thai","Venezuelan","Vietnamese"],"diets":["Halal","Kosher","Vegan","Vegan Friendly","Vegetarian","Vegetarian Friendly"],"establishment_types":["Bakery","Bar","Cafe","Food Cart/Truck","Grocery Store","Restaurant","Supermarket","Take-out"]};
export enum Cuisines {
	AFGHAN = "Afghan",
	AMERICAN = "American",
	BENGALI = "Bengali",
	CHINESE = "Chinese",
	COLOMBIAN = "Colombian",
	CREOLE = "Creole",
	EASTERN_EUROPEAN = "Eastern European",
	HALAL_CART = "Halal Cart",
	INDIAN = "Indian",
	ITALIAN = "Italian",
	JAMAICAN = "Jamaican",
	JAPANESE = "Japanese",
	KOREAN = "Korean",
	LATIN = "Latin",
	MALAYSIAN = "Malaysian",
	MEXICAN = "Mexican",
	THAI = "Thai",
	VENEZUELAN = "Venezuelan",
	VIETNAMESE = "Vietnamese"
};

export const CuisinesMap: { [key: string]: Cuisines; } = {	"Afghan": Cuisines.AFGHAN,
	"American": Cuisines.AMERICAN,
	"Bengali": Cuisines.BENGALI,
	"Chinese": Cuisines.CHINESE,
	"Colombian": Cuisines.COLOMBIAN,
	"Creole": Cuisines.CREOLE,
	"Eastern European": Cuisines.EASTERN_EUROPEAN,
	"Halal Cart": Cuisines.HALAL_CART,
	"Indian": Cuisines.INDIAN,
	"Italian": Cuisines.ITALIAN,
	"Jamaican": Cuisines.JAMAICAN,
	"Japanese": Cuisines.JAPANESE,
	"Korean": Cuisines.KOREAN,
	"Latin": Cuisines.LATIN,
	"Malaysian": Cuisines.MALAYSIAN,
	"Mexican": Cuisines.MEXICAN,
	"Thai": Cuisines.THAI,
	"Venezuelan": Cuisines.VENEZUELAN,
	"Vietnamese": Cuisines.VIETNAMESE
}

export enum Diets {
	HALAL = "Halal",
	KOSHER = "Kosher",
	VEGAN = "Vegan",
	VEGAN_FRIENDLY = "Vegan Friendly",
	VEGETARIAN = "Vegetarian",
	VEGETARIAN_FRIENDLY = "Vegetarian Friendly"
};

export const DietsMap: { [key: string]: Diets; } = {	"Halal": Diets.HALAL,
	"Kosher": Diets.KOSHER,
	"Vegan": Diets.VEGAN,
	"Vegan Friendly": Diets.VEGAN_FRIENDLY,
	"Vegetarian": Diets.VEGETARIAN,
	"Vegetarian Friendly": Diets.VEGETARIAN_FRIENDLY
}

export enum EstablishmentTypes {
	BAKERY = "Bakery",
	BAR = "Bar",
	CAFE = "Cafe",
	FOOD_CART_TRUCK = "Food Cart/Truck",
	GROCERY_STORE = "Grocery Store",
	RESTAURANT = "Restaurant",
	SUPERMARKET = "Supermarket",
	TAKE_OUT = "Take-out"
};

export const EstablishmentTypesMap: { [key: string]: EstablishmentTypes; } = {	"Bakery": EstablishmentTypes.BAKERY,
	"Bar": EstablishmentTypes.BAR,
	"Cafe": EstablishmentTypes.CAFE,
	"Food Cart/Truck": EstablishmentTypes.FOOD_CART_TRUCK,
	"Grocery Store": EstablishmentTypes.GROCERY_STORE,
	"Restaurant": EstablishmentTypes.RESTAURANT,
	"Supermarket": EstablishmentTypes.SUPERMARKET,
	"Take-out": EstablishmentTypes.TAKE_OUT
}

