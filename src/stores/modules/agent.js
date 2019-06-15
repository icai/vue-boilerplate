import axios from '@/services/base';
export default {
  namespaced: true,
  state: {
    length: 0,
    agents: [],
    summary: {
      all: 0,
      physical: 0,
      virtual: 0
    }
  },
  getters: {
    summary: state => {
      return state.summary
    },
    agents: state => {
      return state.agents
    },
    length: state => {
      return state.length;
    }
  },
  mutations: {
    updateAgent (state, agents) {
      state.agents = agents;
      state.length = state.agents.length;
    },
    updateAgentByModel(state, agent){
      state.agents = state.agents.map((item)=> {
        return item.id != agent.id ? item : agent
      })
    },
    updateSummary(state, agents) {
      // type
      state.summary.all = agents.length;
      state.summary.physical = agents.filter(item => item.type == 'physical').length;
      state.summary.virtual = agents.filter(item => item.type == 'virtual').length;
      // status
      state.summary.building = agents.filter(item => item.status == 'building').length;
      state.summary.idle = agents.filter(item => item.status == 'idle').length;
    }
  },
  actions: {
    async getAgent({ state, commit, getters }, params = {}) {
      const data = await axios.get('agents', {
        params: params
      });
      commit('updateAgent', data.data);
      if(!params.type) {
        commit('updateSummary', data.data);
      }
    },
    async putAgent({ state, commit, getters }, { id, ...rest}) {
      const data = await axios.patch(`agents/${id}`, {
        id,
        ...rest
      });
      if(data.data) {
        commit('updateAgentByModel', data.data);
      }
    }
  }
};
