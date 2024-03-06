import Types from '../types';


const initState = {
	data_answer: []
};

const readingD11Reducer = (state = initState, action) => {
	const { type, payload } = action;
	switch (type) {
		case Types.READINGD11:
			return {
				data_answer: payload,
			};
		default:
			return state;
	}
};

export default readingD11Reducer;