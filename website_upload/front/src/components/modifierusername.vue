<template>
	<div class="formulaire">
		<h1>Modifier son nom d'utilisateur</h1>
		<form @submit.prevent="modify()">
			<div>
				<input v-model="user.username" id="username" type="text" />
			</div>
			<div class="buttons"><input type="submit" value="Go !"/></div>
		</form>
	</div>
</template>

<script>
import api from '../api'

export default {
	data () {
		return {
			user:{username: ""}
		}
	},
	methods: {
		modify () {
			this.$store.dispatch('auth/changeusername', this.user).then(response => {
				this.$router.push({name: "home"})
			})
		}
	}
}
</script>

<style lang="css" scoped>
	.formulaire{
		justify-content: center;
		flex-direction: column;
		text-align: center;
		width: 100%;
		display: inline-flex;
		margin: auto;
		display: flex;
		flex-wrap: wrap;
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
