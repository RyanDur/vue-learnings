import http from 'axios';
import titleize from 'titleize';

export const MenuCommand = ({endpoint}) => {
  const instance = http.create({baseURL: 'http://localhost:7771'});
  const toTitle = (name) => titleize(name.replace(/_/gi, '-'));

  return {
    getMenu: async () => {
      const {data} = await instance.get(endpoint);
      return {games: data.games.map(game => toTitle(game))};
    }
  }
};