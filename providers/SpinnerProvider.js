import React, { createContext } from "react";

const SpinnerContext = createContext();

function SpinnerProvider(props) {
	const [spinnerVisible, setSpinnerVisible] = React.useState(false);
	function startSpinner() {
		setSpinnerVisible(true);
	}
	function stopSpinner() {
		setSpinnerVisible(false);
	}
	return (
		<SpinnerContext.Provider
			value={{
				spinnerVisible,
				startSpinner,
				stopSpinner,
			}}
		>
			{props.children}
		</SpinnerContext.Provider>
	);
}

export { SpinnerProvider, SpinnerContext };
