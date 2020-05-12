import cloneDeep from 'lodash/cloneDeep'

const initState = {
    userInfo: null,
    dataForm: {
        currentPassword: '',
        newPassword: '',
    },
    errors: {
        currentPassword: '',
        newPassword: '',
    }
}
function merge(state, someObject) {
    const clonnedState = cloneDeep(state);
    return Object.assign(clonnedState, someObject);
}
// errorFromServer = { isRequired: true }
function mapErrorFromServer(errorFromServer) {
    const errorCode = Object.keys(errorFromServer)[0];

    switch (errorCode) {
        case 'isRequired':
            return 'Поле обязательно для заполнения';
        case 'minLength':
            return 'Пароль должен содержить минимум из трех символов';
        default:
            return errorCode;
    }
}

function getFormErrors(payload) {

    const errorKeys = Object.keys(payload);
    const errors = errorKeys.reduce(function (result, errorKey) {
        const errorFromServer = payload[errorKey]
        result[errorKey] = mapErrorFromServer(errorFromServer)
        return result;
    }, {});

    return errors;
}

export default function myPageReducer(state = initState, action) {
    switch (action.type) {
        case 'MY_PAGE_GET_INFO_USER_SUCCESS':
            return {
                ...state,
                userInfo: action.payload
            }
        case 'MY_PAGE_CHANGE_DATAFORM':
            return merge(state, {
                dataForm: {
                    ...state.dataForm,
                    [action.payload.fieldId]: action.payload.value
                }
            })
        case 'MY_PAGE_CHANGE_PASSWORD_SUCCESS':
            console.log(action.payload)
            console.log(action.payload.success)
            console.log(action.payload.error)
            return {
                ...state,
                errors: {
                    ...state.errors,
                    currentPassword: action.payload.error || action.payload.error ? 'Введен неправильный пароль' : '',
                }
            }
        case 'MY_PAGE_CHANGE_PASSWORD_FAIL':
            console.log(action.payload)
            console.log(action.payload.currentPassword)
            console.log(action.payload.newPassword)
            return {
                ...state,
                errors: getFormErrors(action.payload)
            };
        default:
            return state;
    }
}


