import { makeStyles, Modal, Button, TextField, Typography, useTheme, Paper, Tabs, Tab } from '@material-ui/core';
import React from 'react';
import AuthComponent from '../AuthComponent/AuthComponent';
import { useAppSelector } from '../../app/hooks';

export interface EditCollectionModalProps {
	collectionTitle: string;
	modalOpen: boolean;
	handleClose: () => void;
}

const EditCollectionModal = (props: EditCollectionModalProps) => {
	const darkMode = useAppSelector((state) => state.darkMode.status);
	const theme = useTheme();
	const useStyles = makeStyles({
		modalDiv: {
			outline: 'none',
			width: '30%',
			marginLeft: '35%',
			marginTop: '10vh',
			textAlign: 'center',
			[theme.breakpoints.down('sm')]: {
				width: '80%',
				marginLeft: '10%'
			}
		},
		paper: {
			background: darkMode
				? 'linear-gradient(45deg, #3bba9c 30%, #707793 90%)'
				: 'linear-gradient(45deg, #3bba9c 30%, #707793 90%)',
			opacity: 0.9,
			color: '#EEEEEE'
		},
		paper2: {
			height: '40vh',
			paddingTop: '1vh',
			//background: '#707793',
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
		confirmButton: {
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
		<div>
			<Modal open={props.modalOpen} onClose={props.handleClose}>
				<div className={classes.modalDiv}>
					<Paper className={classes.paper} square>
						<Tabs
							centered
							value={0}
							textColor="primary"
							aria-label="disabled tabs example"
							indicatorColor="primary"
						>
							<Tab className={classes.tab} label="Edit Link" />
						</Tabs>
					</Paper>
					<Paper className={classes.paper2} square>
						<TextField variant="outlined" className={classes.inputField} label="New Link Title" />
						<TextField variant="outlined" className={classes.inputField} label="New Link URL" />
						<Button href="/dashboard" className={classes.confirmButton}>
							Confirm
						</Button>
					</Paper>
				</div>
			</Modal>
		</div>
	);
};
export default EditCollectionModal;
