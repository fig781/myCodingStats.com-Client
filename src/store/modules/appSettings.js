import globalUrl from '../../globalFunctions/globalUrl';

const state = {
  allTags: [],
  allProjects: [],
  tagIdToDelete: Number,
  projectIdToDelete: Number,
};

const getters = {
  getAllTags: (state) => state.allTags,
  getAllProjects: (state) => state.allProjects,
};

const mutations = {
  setAllTags: (state, payload) => {
    state.allTags = payload;
  },
  setAllProjects: (state, payload) => {
    state.allProjects = payload;
  },
  addTagToAllTags: (state, payload) => {
    let formattedObject = {
      id: payload.tagid,
      name: payload.tagname,
      type: 'tag',
    };
    state.allTags.push(formattedObject);
  },
  deleteTagFromAllTags: (state, payload) => {
    for (let a = 0; a < state.allTags.length; a++) {
      if (state.allTags[a].id === payload) {
        state.allTags.splice(a, 1);
      }
    }
  },
  insertTagType: (state) => {
    if (state.allTags.length > 0) {
      for (let x = 0; x < state.allTags.length; x++) {
        state.allTags[x].type = 'tag';
      }
    }
  },
  activeTagExists: (state, payload) => {
    for (let a = 0; a < state.allTags.length; a++) {
      if (state.allTags[a].name === payload) {
        return true;
      }
    }
    return false;
  },
  deleteProjectFromAllProjects: (state, payload) => {
    for (let a = 0; a < state.allProjects.length; a++) {
      if (state.allProjects[a].id === payload) {
        state.allProjects.splice(a, 1);
      }
    }
  },
  addProjectToAllProjects: (state, payload) => {
    let formattedObject = {
      id: payload.projectid,
      name: payload.projectname,
      type: 'project',
    };
    state.allProjects.push(formattedObject);
  },
  insertProjectType: (state) => {
    if (state.allProjects.length > 0) {
      for (let x = 0; x < state.allProjects.length; x++) {
        state.allProjects[x].type = 'project';
      }
    }
  },
  activeProjectExists: (state, payload) => {
    for (let a = 0; a < state.allProjects.length; a++) {
      if (state.allProjects[a].name === payload) {
        return true;
      }
    }
    return false;
  },
};

const actions = {
  fetchAllTags: async ({ commit, rootState }) => {
    try {
      const res = await fetch(
        `${globalUrl}settings/tags/${rootState.userAccounts.loggedInUser.userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonResponse = await res.json();

      if (res.status == 200) {
        commit('setAllTags', jsonResponse);
        commit('insertTagType');
      } else {
        console.log(jsonResponse);
      }
    } catch (err) {
      console.log('fetchAllTags: ' + err);
    }
  },
  addTag: async ({ commit, rootState }, tagName) => {
    try {
      const res = await fetch(`${globalUrl}settings/tags/`, {
        method: 'POST',
        body: JSON.stringify({
          userId: rootState.userAccounts.loggedInUser.userId,
          tagName: tagName,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const jsonResponse = await res.json();
      if (res.status == 200) {
        commit('addTagToAllTags', jsonResponse);
      } else {
        console.log(jsonResponse);
      }
    } catch (err) {
      console.log('addTag: ' + err);
    }
  },
  deleteTag: async ({ commit }, tagId) => {
    try {
      const res = await fetch(`${globalUrl}settings/tags/`, {
        method: 'PUT',
        body: JSON.stringify({ tagId: tagId }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (res.status == 200) {
        commit('deleteTagFromAllTags', tagId);
      } else {
        const jsonResponse = await res.json();
        console.log(jsonResponse);
      }
    } catch (err) {
      console.log('deleteTag: ' + err);
    }
  },
  fetchAllProjects: async ({ commit, rootState }) => {
    try {
      const res = await fetch(
        `${globalUrl}settings/projects/${rootState.userAccounts.loggedInUser.userId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const jsonResponse = await res.json();
      if (res.status == 200) {
        commit('setAllProjects', jsonResponse);
        commit('insertProjectType');
      } else {
        console.log(jsonResponse);
      }
    } catch (err) {
      console.log('fetchAllProjects: ' + err);
    }
  },
  deleteProject: async ({ commit }, projectId) => {
    try {
      const res = await fetch(`${globalUrl}settings/projects`, {
        method: 'PUT',
        body: JSON.stringify({ projectId: projectId }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (res.status == 200) {
        commit('deleteProjectFromAllProjects', projectId);
      } else {
        const jsonResponse = await res.json();
        console.log(jsonResponse);
      }
    } catch (err) {
      console.log('deleteProject: ' + err);
    }
  },
  addProject: async ({ commit, rootState }, projectName) => {
    try {
      const res = await fetch(`${globalUrl}settings/projects`, {
        method: 'POST',
        body: JSON.stringify({
          userId: rootState.userAccounts.loggedInUser.userId,
          projectName: projectName,
        }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const jsonResponse = await res.json();
      if (res.status == 200) {
        commit('addProjectToAllProjects', jsonResponse);
      } else {
        console.log(jsonResponse);
      }
    } catch (err) {
      console.log('addTag: ' + err);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
