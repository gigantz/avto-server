export const sanitizedObject = (body) => {
  const obj = {};
  for(let prop in body) {
    if(body[prop]) {
      obj[prop] = body[prop];
    }
  }
  return obj;
};

export default sanitizedObject;