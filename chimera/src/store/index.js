import Vue from 'vue'
import Vuex from 'vuex'
import { connect } from '@holochain/hc-web-client'
import tags from '@/components/parts/Tags/TagsStore'
import instancemanager from '@/components/parts/InstanceManager/InstanceManagerStore'
// NewImportModule
import app from '@/store/modules/app'
import auth from '@/store/modules/auth'
import downloads from '@/store/modules/downloads'
import friends from '@/store/modules/friends'
import happs from '@/store/modules/happs'
import parts from '@/store/modules/parts'
import home from '@/store/modules/home'
import install from '@/store/modules/install'
import library from '@/store/modules/library'
import portfolio from '@/store/modules/portfolio'
import personalInformation from '@/store/modules/personalInformation'
import fieldNames from '@/store/modules/fieldNames'
import profiles from '@/store/modules/profiles'
import personas from '@/store/modules/personas'
import snackbar from '@/store/modules/snackbar'
import zomes from '@/store/modules/zomes'
import mediaLibrary from '@/store/modules/mediaLibrary'
import tracks from '@/store/modules/tracks'
import verify from '@/store/modules/verify'
import root from '@/store/modules/rootStore'
import knowledgeBaseStore from '@/store/modules/knowledgeBaseStore'

Vue.use(Vuex)
console.log(process.env.VUE_APP_HOLOCHAIN_URL)
const store = new Vuex.Store({
  state: {
    holochainConnection: connect({ url: process.env.VUE_APP_HOLOCHAIN_URL })
  },
  modules: {
    tags,
    instancemanager,
    // NewModule
    app,
    auth,
    downloads,
    friends,
    happs,
    parts,
    home,
    install,
    library,
    portfolio,
    personalInformation,
    fieldNames,
    profiles,
    personas,
    snackbar,
    zomes,
    verify,
    mediaLibrary,
    tracks,
    root,
    knowledgeBaseStore
  },
  actions: {
    init: async () => {
      await Promise.all([])
    }
  },
  mutations: {
    connect (state) {
      state.holochainConnection = connect({ url: process.env.VUE_APP_HOLOCHAIN_URL })
    }
  }
})

store.dispatch('init')

export default store
