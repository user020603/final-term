import {api} from '@assets/helpers';

export const getProduct = async (shopifyDomain, id) => {
  const url = `https://${shopifyDomain}/admin/api/2023-10/products/${id}.json`;
  const response = await api(url);
  const data = await response.json();
  return data;
};
