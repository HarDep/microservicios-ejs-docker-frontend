import Employee from "./Employee";

let url:string =  import.meta.env.VITE_APP_API + 'employees'

export async function searchEmployees(){
    let response = await fetch( url,{
        'method':'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export async function removeEmployee(id:number){
    await fetch(url + '/' + id,{
        'method':'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
}

export  async function saveEmployee(employee:Employee){
    if(isNaN(Number(employee.id))){
        await fetch(url, {
            'method':'POST',
            'body': JSON.stringify(employee),
            'headers': {
                'Content-Type': 'application/json'
            }
        });
    }else{
        await fetch(url + '/' + employee.id, {
            'method':'PUT',
            'body': JSON.stringify(employee),
            'headers': {
                'Content-Type': 'application/json'
            }
        });
    }
}

export async function searchEmployee(id:number){
    let response = await fetch( url + '/' + id,{
        'method':'GET',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}