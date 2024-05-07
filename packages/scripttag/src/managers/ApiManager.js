import makeRequest from '../helpers/api/makeRequest';
import data from '../../../functions/.runtimeconfig.json';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;

    const url = `https://${data.app.base_url}/clientApi/getdata?shopifyDomain=${shopifyDomain}`;

    console.log(url);

    const dataFetched = await makeRequest(url, 'GET');

    const {notifications, settings} = dataFetched;
    // console.log(notifications);
    // console.log(settings);

    return {notifications, settings};
  };
}
