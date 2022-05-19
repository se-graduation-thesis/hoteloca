import { ACTION_TYPES } from "../actions/account.action";
const SET_USER_AUTHENTICATE = 'user_authenticated'
if (localStorage.getItem(SET_USER_AUTHENTICATE) === null) {
    localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify())
}
//localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify());
const userAuth = localStorage.getItem(SET_USER_AUTHENTICATE);

const initialState = {
    isAuthenticated: null,
    userAuth: userAuth,
    listAccount: [],
    account: null,
    hashPass: null,
};

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGOUT: {
            localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify())
            return {
                ...state,
                userAuth: 'undefined'
            }
        }
        case 'AUTHENTICATE_SIGNAL': {
            if (localStorage.getItem(SET_USER_AUTHENTICATE) === 'undefined') {
                localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify(action.userExitedid))
                return {
                    ...state,
                    userAuth: action.userExitedid
                }
            }
            if (localStorage.getItem(SET_USER_AUTHENTICATE) !== action.userExitedid) {
                localStorage.setItem(SET_USER_AUTHENTICATE, JSON.stringify(action.userExitedid))
                return {
                    ...state,
                    userAuth: action.userExitedid
                }
            }
        }
        case ACTION_TYPES.FETCH_ALL_ACCCOUNT:
            return {
                ...state,
                listAccount: [...action.payload],
            };
        case ACTION_TYPES.LOGIN:
            return {
                ...state,
                login: action.payload
            }
        case ACTION_TYPES.ADD_ACCOUNT:
            return {
                ...state,
                listAccount: [...action.payload]
            }
        case ACTION_TYPES.CHANGE_STATUS:
            return {
                ...state,
                listAccount: [...action.payload]
            }
        case ACTION_TYPES.RESET_PASS:
            return {
                ...state,
                listAccount: [...action.payload]
            }
        case ACTION_TYPES.GET_BY_ID:
            return {
                ...state,
                account: action.payload
            }
        case ACTION_TYPES.HASH_PASS:
            return {
                ...state,
                hashPass: action.payload
            }
        default:
            return state;
    }
};