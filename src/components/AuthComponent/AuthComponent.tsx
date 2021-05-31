import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import React, { SetStateAction } from 'react';
import { useAppSelector } from '../../app/hooks';
import SignInComponent from '../SignInComponent/SignInComponent';
import SignUpComponent from '../SignUpComponent/SignUpComponent';

const AuthComponent = () => {
	const darkMode = useAppSelector((state) => state.darkMode.status);
	const [ value, setValue ] = React.useState(0);
	const handleChange = (event: any, newValue: SetStateAction<number>) => {
		console.log(newValue);
		setValue(newValue);
	};
	const useStyles = makeStyles({
		paper: {
			background: darkMode
				? 'linear-gradient(45deg, #3bba9c 30%, #707793 90%)'
				: 'linear-gradient(45deg, #3bba9c 30%, #707793 90%)',
			opacity: 0.9,
			color: '#EEEEEE'
		},
		paper2: {
			height: '70vh',
			opacity: 0.9
		},
		tab: {
			color: darkMode ? 'white' : '#EEEEEE',
			opacity: 1.0,
			textTransform: 'none',
			'&:focus': {
				color: darkMode ? 'white' : '#EEEEEE',
				opacity: 1.0
			},
			'&:hover': {
				color: darkMode ? '#white' : '#EEEEEE',
				opacity: 1.0
			}
		}
	});

	const classes = useStyles();
	return (
		<div>
			<Paper className={classes.paper} square>
				<Tabs
					centered
					value={value}
					textColor="primary"
					onChange={handleChange}
					aria-label="disabled tabs example"
					indicatorColor="primary"
				>
					<Tab className={classes.tab} label="Sign In" />
					<Tab className={classes.tab} label="Sign Up" />
				</Tabs>
			</Paper>
			{value ? <SignUpComponent /> : <SignInComponent />}
		</div>
	);
};

export default AuthComponent;
