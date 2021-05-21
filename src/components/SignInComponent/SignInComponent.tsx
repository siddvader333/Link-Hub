import { makeStyles, Paper, Tab, Tabs, TextField, Button } from '@material-ui/core';
import React, { SetStateAction } from 'react';
import { useAppSelector } from '../../app/hooks';

const SignInComponent = (props: any) => {
	const darkMode = useAppSelector((state) => state.darkMode.status);
	const useStyles = makeStyles({
		paper: {
			height: '40vh',
			paddingTop: '1vh',
			//background: '#707793',
			opacity: 0.9
		},
		inputField: {
			marginTop: '3vh',
			color: 'blue',
			width: '80%',
			'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
				borderColor: '#9DA5C2'
			},
			'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
				borderColor: '#9DA5C2'
			},
			'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: '#9DA5C2'
			},
			'& .MuiOutlinedInput-input': {
				color: '#9DA5C2'
			},
			'&:hover .MuiOutlinedInput-input': {
				color: '#9DA5C2'
			},
			'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
				color: '#9DA5C2'
			},
			'& .MuiInputLabel-outlined': {
				color: '#9DA5C2'
			},
			'&:hover .MuiInputLabel-outlined': {
				color: '#9DA5C2'
			},
			'& .MuiInputLabel-outlined.Mui-focused': {
				color: '#9DA5C2'
			}
		},
		loginButton: {
			width: '50%',
			margin: '4.5vh 25% 3.5vh 25%',
			padding: '1.5vh 0% 1.5vh 0%',
			background: darkMode
				? 'linear-gradient(45deg, #393e46 5%, #707793 90%)'
				: 'linear-gradient(45deg, #3bba9c 30%, #707793 90%)',
			opacity: 0.85,
			boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
			transition: 'all 0.3s ease 0s',
			cursor: 'pointer',
			outline: 'none',
			color: 'rgb(226, 226, 226)',
			borderRadius: '500px',
			'&:hover': {
				background: darkMode
					? 'linear-gradient(45deg, #3bba9c 30%, #707793 90%)'
					: 'linear-gradient(45deg, #3bba9c 30%, #707793 90%)',
				boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
				color: '#fff',
				transform: 'translateY(-15%)',
				border: 'none',
				opacity: 1.0
			}
		}
	});

	const classes = useStyles();
	return (
		<Paper className={classes.paper} square>
			<TextField variant="outlined" className={classes.inputField} label="Email" />
			<TextField variant="outlined" type="Password" className={classes.inputField} label="Password" />
			<Button onClick={props.onSubmit} className={classes.loginButton}>
				Login
			</Button>
		</Paper>
	);
};

export default SignInComponent;
