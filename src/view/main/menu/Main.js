export default {
  inject: [
    'menuCommand'
  ],
  data() {
    return {
      games: []
    }
  },
  created() {
    this.menuCommand.getMenu().then(resp => {
      this.games = resp.games;
    });
  }
}