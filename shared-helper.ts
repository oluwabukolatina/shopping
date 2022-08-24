const SharedHelper= {
    replaceValue(param: string, oldValue: string | any, newValue: string | any) {
   return param.replace(oldValue, newValue);
    },
    titleCase(str: string) {
        const splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] =
                splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    },
}; export default SharedHelper