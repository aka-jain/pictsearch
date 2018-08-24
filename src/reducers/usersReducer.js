export const usersReducer = (state=[], action) => {
	switch (action.type){
		case 'SET_USERS':
			let usersData = [...state];
			usersData = [...state, ...action.data];
			usersData[usersData.length - 1].pagination = action.pagination;
			return usersData;
		case 'ERROR_USERS':
			let errorData = {...state};
			errorData.message = action.data;
			return errorData;
		case 'SET_ERROR_USERS':
			let errorState = {...state};
			errorState.isError = action.data
			return errorState;
		case 'RESET_USERS':
			return {}
		default:
      		return state;
	}
}
