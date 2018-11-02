const api = {};

api.helpers = {};
api.helpers.page = (page, size, axiosConfig) => {
  if (utils.isNullOrUndefined(axiosConfig)) {
    console.log("axios config is null");
    return;
  }

  if (utils.isNullOrUndefined(axiosConfig.params)) {
    axiosConfig.params = {};
  }

  axiosConfig.params.paging = {
    num: page,
    size: size
  };

  // technically don't need to return it, the object is already updated
  // doing it as more of a pass through
  return axiosConfig;
};

api.helpers.logErrorObject = (error) => {
  // console.log(error);
  if (!utils.isNullOrUndefined(error.response) &&
    error.response.status === 400) {
    console.log(error.response.data);
  } else {
    console.error(error);
  }
};

api.helpers.complexParams = (axiosConfig) => {
  const ob = axiosConfig.params || {};
  const params = {};
  for (const key in ob) {
    if (!ob.hasOwnProperty(key)) {
      continue;
    }
    const value = ob[key];
    if (value instanceof Array) {
      
    }
    else if (value instanceof Object) {
      for (const subKey in value) {
        if (!value.hasOwnProperty(subKey)) {
          continue;
        }
        const newKey = `${key}[${subKey}]`;
        params[newKey] = value[subKey];
      }
    }
    else {
      params[key] = value;
    }
  }

  axiosConfig.params = params;
  return axiosConfig;
};

api.helpers.STEAM_URL_COOKIE_NAME = 'sl_steamurl';
api.helpers.JWT_COOKIE_NAME = 'jwt_token';
api.helpers.XSRF_COOKIE_NAME = 'X-XSRF';