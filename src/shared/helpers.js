export const randomNumber=(min, max) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const totalAmtToBePaid=(investment)=>{
    //If we want to keep 5% as the participation fee, then the following will be the totalAmtToBePaid 
    return investment + 0.025*investment;
    //return investment;
}

export const getReturnAmount=(investment, stakeFactor)=>{
    return investment*stakeFactor;
}
  
