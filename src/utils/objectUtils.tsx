export const isObj = (val: any) => {

  if (!Array.isArray(val) && val && typeof val === "object") {

      return true;

  }

  return false;

}

export const excludeObjFields = (fields: string[], object: { [key: string]: any }) => {

    let returnObject: { [key: string]: any } = {};

    Object.entries(object).forEach(([key, value]) => {

        if (![...fields].includes(key)) {

            returnObject[key] = value;
        }

    });

    return returnObject;
}

export type primitiveObj = { [key: string]: string | number | undefined };
