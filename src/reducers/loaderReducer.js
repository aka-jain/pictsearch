export const loaderReducer = (state={}, action) => {
	switch (action.type){
		case 'LOADER':
			let loader = {...state};
			loader.loader = action.data;
			return loader;
		case 'LOADER_REPO':
			let loaderRepo = {...state};
			loaderRepo.loaderRepo = action.data;
			return loaderRepo;
		case 'SET_PAGE':
			let setPage = {...state};
			setPage.page = action.page;
			return setPage;
		case 'RESET_USERS':
			return {}

		default:
      		return state;
	}
}
