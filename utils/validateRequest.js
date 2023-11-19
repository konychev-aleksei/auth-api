import ErrorUtils, { Unprocessable } from "./Errors.js";

export default async (req, res, next, schema) => {
  try {
    await schema.validate({
      body: req.body,
    });

    return next();
  } catch (error) {
    return ErrorUtils.catchError(res, new Unprocessable(error));
  }
};
