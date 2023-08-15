import Customer from "./Customer";

let url:string =  import.meta.env.VITE_APP_API + 'customers'

export async function searchCustomers() {
    let response = await fetch( url,{
        'method':'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export async function removeCustomer(id:number){
    await fetch(url + '/' + id,{
        'method':'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
}

export async function saveCustomer(customer:Customer){
    if(isNaN(Number(customer.id))){
        await fetch(url, {
            'method':'POST',
            'body': JSON.stringify(customer),
            'headers': {
                'Content-Type': 'application/json'
            }
        });
    }else{
        await fetch(url + '/' + customer.id, {
            'method':'PUT',
            'body': JSON.stringify(customer),
            'headers': {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function searchCustomer(id:number){
    let response = await fetch( url + '/' + id,{
        'method':'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}