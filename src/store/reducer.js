const reducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER": {
            return { ...state, user: action.user }
        }
        case "REMOVE_USER": {
            return { ...state, user: action.user }
        }
        case "STORE_LIST": {
            return { ...state, storeList: action.storeList }
        }
        case "ORDER_REQUEST": {
            return { ...state, orderRequest: action.orderRequest }
        }
        case "MY_ORDER": {
            return { ...state, myOrder: action.myOrder }
        }
        case "MY_ITEMS": {
            return { ...state, myItems: action.myItems }
        }
        default: {
            return state;
        }
    }
}

export default reducer;