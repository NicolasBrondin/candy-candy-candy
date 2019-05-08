const state = {
  lang: "fr"
}

const mutations = {
    mutate_lang(state, payload) {
        if (payload && payload.key === "fr" || payload.key === "en") {
            state.lang = payload.key;
        } else {
            throw new Error("Language key: '" + payload.key + "' not recognized");
        }
  }
}

const actions = {
    set_lang(context, payload) {
        context.commit('mutate_lang', payload);
  }
}

export default {
  state,
  mutations,
  actions
}
