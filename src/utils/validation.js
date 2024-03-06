export const validateEmail = (str: string) => {
    if (!str) {return false;}
    let re = /^([^<>()\[\]\\.,;:\s@"]+((?:\.[a-zA-Z0-9_]+)*))@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,3}$/;
    let check = re.test(str.toString().trim());
    return check;
};

export const validatePhone = (str: string) => {
    var re = /^[0-9\+]{10,14}$/;
    return re.test(str);
};
