import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import '../Page.css';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeVendor, searchVendors } from './VendorApi';
import Vendor from './Vendor';

const Vendors: React.FC = () => {

  const [ vendors, setVendors ] = useState<Vendor[]>([]);
  const history = useHistory();

  useEffect(()=>{
    search();
  },[history.location.pathname]);

  const search = async () => {
    let data = await searchVendors();
    setVendors(data);
  };

  const deleteVendor = async (id:any) =>{
    await removeVendor(id);
    search();
  };

  const addEditVendor = (id:any) => {
    history.push('/page/vendors/' + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Proveedores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Proveedores</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle size='large'>Gestion de proveedores</IonTitle>
          <IonGrid className='table'>
            <IonRow key='a'>
              <IonCol size="6" size-md="4" size-lg="2">Nombre</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Email</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Telefono</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Direccion</IonCol>
              <IonCol size="6" size-md="4" size-lg="2">Acciones</IonCol>
            </IonRow>
            {vendors.map((vendor: Vendor) => 
              <IonRow key={'b' + vendor.id}>
                <IonCol size="6" size-md="4" size-lg="2">{vendor.name} {vendor.lastName}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{vendor.email}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{vendor.phone}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">{vendor.address}</IonCol>
                <IonCol size="6" size-md="4" size-lg="2">
                  <IonButton onClick={() => addEditVendor(vendor.id)} size="small" size-md="4" size-lg="2" color="primary" fill='solid'><IonIcon icon={pencil}/>Editar</IonButton>
                  <IonButton onClick={() => deleteVendor(vendor.id)} size="small" size-md="4" size-lg="2" color="danger" fill='solid'><IonIcon icon={close}/>Eliminar</IonButton>
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
          <IonItem>
            <IonButton onClick={() => addEditVendor('new')} color="primary" fill='solid' slot='start' size='default'><IonIcon icon={add}/>Agregar proveedor</IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Vendors;
