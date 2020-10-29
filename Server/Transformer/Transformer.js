const Type = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD'
}

/*
transform function: transforms a given object according to the provided transformation that represents the transformation between two objects.
Accepts the type to specify the type of the transformation, forward or backward.
 - obj: Object to apply transformation to.
 - transformation: An object that specifies the transformation to apply to the object. The transformation can be of a variety of types:
  * manual transformation: specified by fields with f, and b keys whose values are methods that accept the input object and return the transformed object.
  f is used for forward transformation, and b for backward transformation. Can be optionally added alongside object or array transformations.
  * object transformation: specified by a value with an 'o' key, whose value is an array of the form [string1, string2, transformation], where string1 is the key of the backward object and string2 represents the key of the forward object.
  transformation is an optional entry that represents the transformation to be applied to the value of the field.
  * array transformation: specified by an 'a' key whose value is the transformation to apply to every value of the provided input object (assuming it is an array)
 - type: whether transform is forward or backward, one of the values of the Type object (enum).
*/
const transform = (obj, transformation, type) => {
  let res = obj;

  if(transformation) {
    if(transformation.o) {
      res = new Object();
      for(const keyValueTransform of transformation.o) {
        let initialKey = keyValueTransform[0];
        let finalKey = keyValueTransform[1];
        let valueTransform = keyValueTransform[2];

        let originalKey = (type===Type.FORWARD) ? initialKey : finalKey;
        let resultKey = (type===Type.FORWARD) ? finalKey : initialKey;
        if(obj[originalKey] !== undefined) {
          if(obj[originalKey] === null) {
            res[resultKey] = null;
          } else {
            res[resultKey] = transform(obj[originalKey], valueTransform, type);
          }
        }
      }
    } else if(transformation.a) {
      res = [];
      for(const elem of obj) {
        res.push(transform(elem, transformation.a, type));
      }
    }

    if((type===Type.FORWARD)? transformation.f : transformation.b) {
      res = (type===Type.FORWARD)? transformation.f(obj, res) : transformation.b(obj, res);
    }
  }

  return res;
}


export const forwardTransform = (obj, transformation) => transform(obj, transformation, Type.FORWARD)
export const backwardTransform = (obj, transformation) => transform(obj, transformation, Type.BACKWARD)

export const createTransformer = (transformation) => {
  return {
    forward: (obj) => forwardTransform(obj, transformation),
    backward: (obj) => backwardTransform(obj, transformation)
  }
}
