import React, { useState } from 'react';
import '../App.css';
import { PhotoshopPicker } from 'react-color';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ColorBox from '../ColorBox/ColorBox';

const MainApp = (props) => {
	let [ timer, setTimer ] = useState(1);
	let [ seconds, setSeconds ] = useState(5);

	const [ isAppRunning, setIsAppRunning ] = useState(false);
	const [ colors, setColors ] = useState([]);
	const [ color, setColor ] = useState('');
	const [ currentColor, setCurrentColor ] = useState('');
	const [ showColorPicker, setShowColorPicker ] = useState(false);
	const [ IDs, setIDs ] = useState([]);

	const clear = () => {
		for (let id of IDs) {
			clearInterval(id);
		}
		setIsAppRunning(false);
	};
	const test = () => {
		const secondsCounter = setInterval(() => {
			console.log(seconds);
			if (seconds > 0) {
				setSeconds(--seconds);
			} else {
				clearInterval(secondsCounter);
				setIsAppRunning(false);
			}
		}, 1000);
		const backgroudColorChanger = setInterval(() => {
			if (seconds > 0) {
				const randomNumber = Math.floor(Math.random() * colors.length);
				setCurrentColor(colors[randomNumber]);
			} else {
				clearInterval(backgroudColorChanger);
			}
		}, timer * 1000);
		setIDs([ ...IDs, secondsCounter, backgroudColorChanger ]);
		console.log(secondsCounter, backgroudColorChanger);
	};
	return isAppRunning ? (
		<div className="main-wrapper" style={{ backgroundColor: currentColor }}>
			<div className="wrapper">
				<div className="counter">{seconds}</div>
				<Button variant="contained" onClick={() => clear()}>
					Stop interval
				</Button>
			</div>
		</div>
	) : (
		<div className="wrapper">
			<div className="info-panel">
				<Button variant="contained" onClick={() => setShowColorPicker(!showColorPicker)}>
					Choose color
				</Button>
				{showColorPicker ? (
					<PhotoshopPicker
						color={color}
						onChange={(e) => {
							setColor(e.hex);
						}}
						onAccept={() => {
							setColors([ ...colors, color ]);
						}}
						onCancel={() => setShowColorPicker(!showColorPicker)}
					/>
				) : null}

				<p style={{ marginBottom: '5px' }}>Chosen colors:</p>
				<div className="color-boxes">
					{colors.map((element) => (
						<ColorBox
							color={element}
							onClick={() => {
								const newArray = colors.filter((el) => el != element);
								setColors(newArray);
							}}
						/>
					))}
				</div>
				<TextField
					className="input"
					label="Set time interval"
					margin="normal"
					variant="outlined"
					value={timer}
					onChange={(e) => setTimer(e.target.value)}
				/>
				<TextField
					className="input"
					label="Set timer (seconds)"
					margin="normal"
					variant="outlined"
					value={seconds}
					onChange={(e) => setSeconds(e.target.value)}
				/>
				<Button
					variant="contained"
					className="button"
					color="primary"
					size="large"
					onClick={() => {
						setIsAppRunning(true);
						test();
					}}
				>
					Start
				</Button>
			</div>
		</div>
	);
};
export default MainApp;
