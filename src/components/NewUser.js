import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {FormsContainer,Label, Input, Button} from './Styled/Styled'
import {signUp} from '../services/authServices'
import {useGlobalState} from '../utils/stateContext'

//setting out deafault intial form state to be empty
export default function NewUser() {
	const initialFormState = {
		username: '', 
		email: '', 
		password: '', 
		password_confirmation: ''
	}
	const [formState, setFormState] = useState(initialFormState)
	const {dispatch} = useGlobalState()
	let history = useHistory()
	function handleChange(event) {
		setFormState({
			...formState,
			[event.target.name]: event.target.value
		})
	}

	//handling our registering with a event prop 
	//signup with our formstate 
	//then we are setting our user with a token in a storage 
	//finally allowing our user to go to home page 

	function handleRegister(event) {
		event.preventDefault()
		signUp(formState)
		.then((data) => {
			sessionStorage.setItem("token", data.jwt);
			sessionStorage.setItem("user", data.username);
		dispatch({
			type: 'setLoggedInUser', 
			data: data.username})
			history.push('/fitnices')
		})
	}
	return (
		<>
		<FormsContainer>
			<Label>Username:</Label>
			<Input type="text" name='username' value={formState.username} onChange={handleChange}></Input>
			<Label>Email:</Label>
			<Input type='email' name='email' value={formState.email} onChange={handleChange}></Input>
			<Label>Password:</Label>
			<Input type='password' name='password' value={formState.password} onChange={handleChange}></Input>
			<Label>Password Confirmation:</Label>
			<Input type='password' name='password_confirmation' value={formState.password_confirmation} onChange={handleChange}></Input>
			<Button onClick={handleRegister}>Register</Button>
		</FormsContainer>
		</>
	)
}
