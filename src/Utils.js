import { CURRENCY } from "./AppConfig";

export function ToFixedDeci(value, places){
    let val = parseFloat(value);
    places = places || 2;
    return (!isNaN(val))?(val.toFixed(places)):0;
}

export function formatPrice(value, currency){
    currency = currency || CURRENCY
    let val = parseFloat(value)
    if(isNaN(val))return value;
    return currency + val.toFixed(2);
    let parts = val.toFixed(2).split('.');
    return currency + parts[0]+`<sup >${parts[1]}</sup>`
}


