import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import '../Page.css';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeCustomer, searchCustomers } from './CustomerApi';
import Customer from './Customer';

const Customers: React.FC = () => {

  const [ customers, setCustomers ] = useState<Customer[]>([]);
  const history = useHistory();

  useEffect(()=>{
    search();
  },[history.location.pathname]);

  const search = async () => {
    let data = await searchCustomers();
    setCustomers(data);
  };

  const deleteCustomer = async (id:any) =>{
    await removeCustomer(id);
    search();
  };

  const addEditCustomer = (id:any) => {
    history.push('/page/customers/' + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Clientes</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle size='large'>Gestion de clientes</IonTitle>
          <IonGrid className='table'>
            <IonRow key='a'>
              <IonCol size="6" size-md="4" size-lg="2">Nombre</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Email</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Telefono</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Direccion</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Acciones</IonCol>
            </IonRow>
            {customers.map((customer: Customer) => 
              <IonRow key={'b' + customer.id}>
                <IonCol size="6" size-md="4" size-lg="2">{customer.name} {customer.lastName}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{customer.email}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{customer.phone}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{customer.address}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">
                  <IonButton onClick={() => addEditCustomer(customer.id)} size="small" size-md="4" size-lg="2" color="primary" fill='solid'><IonIcon icon={pencil}/>Editar</IonButton>
                  <IonButton onClick={() => deleteCustomer(customer.id)} size="small" size-md="4" size-lg="2" color="danger" fill='solid'><IonIcon icon={close}/>Eliminar</IonButton>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
          <IonItem>
            <IonButton onClick={() => addEditCustomer('new')} color="primary" fill='solid' slot='start' size='default'><IonIcon icon={add}/>Agregar cliente</IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Customers;
