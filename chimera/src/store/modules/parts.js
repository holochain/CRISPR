export default {
  namespaced: true,
  state: {
    parts: [
      {
        id: 'QmHashyNotes',
        name: 'Notes',
        src: 'notes',
        description: 'The Notes part has a title and content field for you to record simple notes. You can add edit and delete notes and if an agent tries to edit or delete a note they do not have permission to a validation error will show.',
        price: 1.99,
        compareAt: 1.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1585864353040
      },
      {
        id: 'QmHashyTasks',
        name: 'Tasks',
        src: 'tasks',
        description: 'Task lists are super handy. Manage your tasks in a list or combine with other parts such as Notes and Kanban to get the kanban board to the left.',
        price: 9.99,
        compareAt: 12.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1588546955113
      },
      {
        id: 'QmHashyratings',
        name: 'Ratings',
        src: 'ratings',
        description: 'Add a ratings part to any other part.',
        price: 1.99,
        compareAt: 8.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1588890779424
      },
      {
        id: 'QmHashyWhoIs',
        name: 'Whois',
        src: 'whois',
        description: 'Identify the Agent with a profile so you know who youre communicating with. Works with any DNA built with the "Identify" option',
        price: 1.99,
        compareAt: 8.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1588900779424
      },
      {
        id: 'QmHashytags',
        name: 'Tags',
        src: 'tags',
        description: 'Tag any entry',
        price: 1.99,
        compareAt: 8.99,
        publisher: 'Eat Sleep Code Repeat',
        updated: 1588900779424
      }
    ]
  },
  actions: {
    addPart: ({ state, commit, rootState }, payload) => {
      commit('addPart', payload)
    },
    acceptInvite: ({ state, commit, rootState }, payload) => {
      commit('acceptInvite', payload)
      commit('addPart', payload)
    },
    rejectInvite: ({ state, commit, rootState }, payload) => {
      commit('rejectInvite', payload)
    }
  },
  mutations: {
    addPart (state, payload) {
      console.log(payload)
      const basePart = state.partParts.find(p => p.base === payload.base)
      if (basePart) {
        basePart.parts.push(payload.part)
      } else {
        state.partParts.push(
          {
            base: payload.base,
            parts: [payload.part]
          }
        )
      }
    },
    acceptInvite (state, payload) {
      state.invites = state.invites.filter(i => i.id !== payload.id)
    },
    rejectInvite (state, payload) {
      state.invites = state.invites.filter(i => i.id !== payload)
    }
  },
  getters: {
    parsedParts: state => {
      return state.parts.map(part => ({
        ...part,
        bg: `parts/${part.src}/bg.png`,
        bg2: `parts/${part.src}/bg2.png`,
        logo: `parts/${part.src}/logo.png`,
        avatar: `parts/${part.src}/avatar.png`
      }))
    },
    partNames: state => {
      return state.parts.map(part => (part.name))
    },
    partParts: state => (base) => {
      const basePart = state.partParts.find(p => p.base === base)
      if (basePart) {
        console.log('parts')
        return basePart.parts
      } else {
        console.log('no parts')
        return []
      }
    },
    allParts: state => {
      return state.parts
    },
    partInvites: state => (base) => {
      return state.invites.filter(p => p.base === base)
    }
  }
}
