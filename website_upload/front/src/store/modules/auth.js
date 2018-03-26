import api from '@/api'
import ls from '@/services/ls'

const initialState = {
	connected: false,
	user: {}
}

export default {
	namespaced: true,//permet d'y accéder de façon nommée
	state: {
		connected: false,
		user: {}
	},
	getters: {
		isConnected (state) {
			return state.connected
		},
		getConnectedUser (state) {
			return state.user
		}
	},
	mutations: {
		setConnectedUser (state, u) {
			state.user = u
			state.connected = true
		},
		initState(state) {
			Object.assign(state, initialState)
		}
	},
	actions: {
		login ({commit}, credentials) {
			return api.post('users/login/', credentials).then(response => {
				ls.set('token', response.data.sessiontoken);
				ls.set('apikey', response.data.apikey);
				commit("setConnectedUser", response.data);
			}).catch(error => {
				console.log(error);
			})
		},
		signup ({commit},credentials){
			return api.post('users/register/', credentials).then(response => {
				return api.post('users/login/', credentials).then(response => {
					ls.set('token', response.data.sessiontoken)
					commit("setConnectedUser", response.data)
				}).catch(error => {
					console.log(error)
				})
			}).catch(error => {
				console.log(error)
			})

		},
		logout ({commit}, forceDeco) {
			commit("initState")
			api.defaults.headers.common['sessiontoken'] = "token="+ls.get("token");
			ls.remove('token')
			if(forceDeco){
				api.post('users/logout/').then(response => {
					commit("initState")
				}).catch(error => {
					reject("store > auth > logout -> error")
				})
			}
		}
	}
}
