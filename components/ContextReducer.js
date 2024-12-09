const { createContext, useReducer, useContext } = require("react");

const CartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Debugging: Log the action data
      console.log("Action Data in ADD:", action);

      // Validation: Check if the price is a valid number
      const validPrice = !isNaN(parseFloat(action.price)) ? parseFloat(action.price) : 0;

      // Debugging: Log the valid price
      console.log("Valid Price Calculated:", validPrice);
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: parseFloat(action.price) || 0, img: action.img }];


    case "REMOVE":
      return state.filter((item, index) => index !== action.index);

      case "UPDATE":
        let arr = [...state]
        arr.find((food, index) => {
            if (food.id === action.id) {
                console.log(food.qty, parseInt(action.qty), action.price + food.price)
                arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
            }
            return arr
        })
        return arr
        case "DROP":
            let empArray = []
            return empArray

    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  
  return (
    <CartStateContext.Provider value={state}>
      <cartDispatchContext.Provider value={dispatch}>
        {children}
      </cartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart=()=>useContext(CartStateContext);
export const useDispatchCart=()=>useContext(cartDispatchContext);