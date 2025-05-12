export const dependencyGenerator = (

    safeParams: string[] | undefined,

    rawPageQuery: { [key: string]: string | undefined } | undefined

) => {

    let safeParamsObj: { [key: string]: undefined } = {};

    safeParams?.map(item => safeParamsObj[item] = undefined);

    let dependencies: any[] = [];

    Object.entries(safeParamsObj).forEach(([key,]) => {

        dependencies.push((rawPageQuery || {})[key]);

    })

    return dependencies;

}
