import { css } from 'lit-element';

export const base = css`
	.calculator div::selection {
	  color: none;
	  background: none;
	}
	.calculator {
		--display-background-color: #333;
		--display-text-color: white;

		--button-background-color: #F2F2F2;
		--button-text-color: black;
		--button-border: 1px solid #999;

		--operator-background-color: orange;
		--operator-text-color: white;

		--zero-color: yellow;
		--zero-text-color: var(--button-text-color);

		--font-size: 40px;
	}
	.calculator {
		margin: 0 auto;
		font-size: var(--font-size);
		display: grid;
		grid-auto-rows: 1fr 1fr 1fr 1fr 1fr;
		background-color: black;
		min-height: 100vh;
		margin: 0px;
		width: 100vw;
		height: 100vh;
		left: 10px; 
		right: 10px;
		grid-template-columns: repeat(4, 1fr);
		grid-template-areas: 
			"display display display display"
			"clear   sign    percent multiply"
			"digit-7 digit-8 digit-9 divide"
			"digit-4 digit-5 digit-6 plus"
			"digit-1 digit-2 digit-3 minus"
			"digit-0 digit-0 dot     equals";
	}
	.display {
		grid-area: display;
		background-color: var(--display-background-color);
		color: var(--display-text-color);
	}
	button {
		color: var(--button-text-color);
		border: 1px solid #999;
		text-align: center;
		font-size: 40px;
		background-color:var(--button-background-color);
		border: var(--button-border);
	}
	.operator {
		background-color: var(--operator-background-color);
		color: var(--operator-text-color);
	}
	#sign { grid-area: sign }
	#clear { grid-area: clear }
	#percent { grid-area: percent }
	#sign { grid-area: sign }
	#digit-0 {
		grid-area: digit-0;
		background-color: var(--zero-color);
		color: var(--zero-text-color);
	}
	#digit-1 {	grid-area: digit-1; }
	#digit-2 {	grid-area: digit-2; }
	#digit-3 {	grid-area: digit-3; }
	#digit-4 {	grid-area: digit-4; }
	#digit-5 {	grid-area: digit-5; }
	#digit-6 {	grid-area: digit-6; }
	#digit-7 {	grid-area: digit-7; }
	#digit-8 {	grid-area: digit-8; }
	#digit-9 {	grid-area: digit-9; }
	#multiply {	grid-area: multiply; }
	#divide {	grid-area: divide; }
	#minus {	grid-area: minus; }
	#plus {	grid-area: plus; }
	#dot { grid-area dot; }
	#backspace { grid-area backspace; display: none; }
`;