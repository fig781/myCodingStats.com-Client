//http://localhost:3000/
//https://my-coding-stats-server.herokuapp.com/
function setGlobalUrl() {
  if (process.env.VUE_APP_LOCAL_URL) {
    return process.env.VUE_APP_LOCAL_URL;
  } else {
    return 'https://my-coding-stats-server.herokuapp.com/';
  }
}
let globalUrl = setGlobalUrl();
export default globalUrl;
