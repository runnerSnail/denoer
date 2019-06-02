
export function checkParamsObject(params: Object) {
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            if (!params[key]) return false;
        }
    }
    return true;
}

export function checkParamsByArrayString(arr:Array<string>,params:Object){
    for (const item of arr) {
        if(!params[item]) return false;
    }
    return true;
}