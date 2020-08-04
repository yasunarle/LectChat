import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret,
  faSearch,
  faPen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faSearch, faPen)

Vue.component('font-awesome-icon', FontAwesomeIcon)
