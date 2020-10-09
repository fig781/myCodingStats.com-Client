const state = {
  tagIdToDelete: Number,
  projectIdToDelete: Number,
};

const getters = {};

const mutations = {};

const actions = {
  // deleteRow: async (rowId) => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:3000/settings/tags/${rowId}`,
  //       {
  //         method: 'DELETE',
  //         credentials: 'include',
  //       }
  //     );
  //     const jsonResponse = await res.json();
  //     if (res.status == 200) {
  //       console.log(jsonResponse);
  //       return jsonResponse;
  //     } else {
  //       alert(jsonResponse.error);
  //       router.push('/forbidden');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
