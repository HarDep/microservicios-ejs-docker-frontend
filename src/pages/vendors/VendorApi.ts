import Vendor from "./Vendor";

let url:string =  import.meta.env.VITE_APP_API + 'vendors'

export async function searchVendors(){
    let response = await fetch( url,{
        'method':'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export async function removeVendor(id:number){
    await fetch(url + '/' + id,{
        'method':'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
}

export async function saveVendor(vendor:Vendor){
    if(isNaN(Number(vendor.id))){
        await fetch(url, {
            'method':'POST',
            'body': JSON.stringify(vendor),
            'headers': {
                'Content-Type': 'application/json'
            }
        });
    }else{
        await fetch(url + '/' + vendor.id, {
            'method':'PUT',
            'body': JSON.stringify(vendor),
            'headers': {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function searchVendor(id:number){
    let response = await fetch( url + '/' + id,{
        'method':'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}