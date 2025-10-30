//latest.json  currencies.json historical/2013-02-16.json
                                  
                                  
const API_DOMAIN = "https://openexchangerates.org/api/";
const APP_ID = import.meta.env.VITE_OXR_APP_ID


export const getRatesURL = () => `${API_DOMAIN}latest.json?app_id=${APP_ID}`;
