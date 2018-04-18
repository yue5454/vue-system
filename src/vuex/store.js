import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { styles, features, elements } from '@/api/mapParams'

Vue.use(Vuex)

const state = {
	optionsList: styles,
	features: features,
	elements: elements
}

export default new Vuex.Store({
	state, mutations, actions, getters
})