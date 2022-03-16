export const success = (message, results, statusCode) => ({
  message,
  error: false,
  code: statusCode,
  results,
});

export const error = (message, statusCode) => {
  const codes = [200, 201, 400, 401, 404, 403, 409, 422, 500, 11000];

  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    error: true,
  };
};
