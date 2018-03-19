
<template>
	<div id="login">
		<div class="imgcontainer">
			<img src="../assets/logo.png"/>
		</div>
		<div id="formulaires">
		<div class="formulaire">
			<h1>Sign in</h1>
			<form @submit.prevent="signin()">
				<div>
					<label for="email">Email :</label>
					<input v-model="user.email" id="email" type="text" />
				</div>
				<div>
					<label for="password">Password :</label>
					<input v-model="user.password" id="password" type="password" />
				</div>
				<div class="buttons"><input type="submit" value="Go !"/></div>
			</form>
		</div>
		<div class="formulaire" id="signup">
			<h1>Sign up</h1>
			<form @submit.prevent="signup()">
				<div>
					<label for="fullname">fullname :</label>
					<input v-model="user_signup.fullname" id="fullname" type="text" />
				</div>
				<div>
					<label for="email">Email :</label>
					<input v-model="user_signup.email" id="email" type="text" />
				</div>
				<div>
					<label for="password">Password :</label>
					<input v-model="user_signup.password" id="password" type="password" />
				</div>
				<div class="buttons"><input type="submit" value="Go !"/></div>
			</form>
		</div>
		</div>
	</div>
</template>

<script>
import api from '../api'

export default {
	data () {
		return {
			user:{email: "", password: ""},
			user_signup:{email:"",possword:"",fullname:""}
		}
	},
	methods: {
		signin () {
			this.$store.dispatch('auth/login', this.user).then(response => {
				this.$router.push({name: "home"})
			})
		},
	signup (){
			this.$store.dispatch('auth/signup',this.user_signup).then(response =>{
				this.$router.push({name: "home"})

			})
		}
	}
}
</script>

<style lang="css" scoped>
	.imgcontainer{
	  text-align: center;
	  display: flex;
		flex-wrap: wrap;
	}

	img {
		margin: auto;
	}

	#login{
		width:100%;
	}
	#formulaires{
		margin-top: 1em;
		width:100%;
		display: flex;
		flex-wrap: wrap;
	}
	.formulaire{
		border: 3px solid #f1f1f1;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		width: 100%;
		display: inline-flex;
		margin: auto;
	}

	form{
		display: flex;
		flex-wrap: wrap;
	}

	form div{
		margin: auto;
		width: 100%;
	}

	@media screen and (min-width: 600px){
		#signup form div:nth-child(1), #signup form div:nth-child(2){
			width: 50%;
		}
		.formulaire{
			width: 45%;
		}
	}


	input[type=text], input[type=password] {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		box-sizing: border-box;
	}

	input[type=submit] {
	  background-color: deepskyblue;
	  color: white;
	  padding: 14px 20px;
	  margin: 8px 0;
	  border: none;
	  cursor: pointer;
	  width: 100%;
	}
</style>
