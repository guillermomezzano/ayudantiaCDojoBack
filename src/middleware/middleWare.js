export const validationShema = (err, req, res, next) => {
  console.log("error del middleware", err);
  let statusCode = err.statusCode || 500;
  let mensaje = err.message || "Ocurrio un error";
  let nombre = err.name || "Error";

  if (err.name === "ValidationError") {
    console.log(err.errors);
    statusCode = 400;
    mensaje = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    console.log(err.errors);
    statusCode = 400;
    mensaje = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }
  const errorNormalizado = {
    statusCode,
    mensaje,
    nombre,
  };
  res.status(errorNormalizado.statusCode).json(errorNormalizado);
};
