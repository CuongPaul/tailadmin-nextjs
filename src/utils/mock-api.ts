const mockApi = (options?: {
  time?: number;
  isError?: boolean;
  requestData?: unknown;
  responseData?: unknown;
}) => {
  const { isError, time = 1000, requestData, responseData } = options || {};

  if (requestData) {
    console.log("requestData: ", requestData);
  }

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      return isError
        ? reject("An error occurred")
        : responseData
        ? resolve(responseData)
        : resolve("Success");
    }, time)
  );
};

export default mockApi;
