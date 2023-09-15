import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Fiscales = ({ route, navigation }) => {
  const handleCotizarServicio = () => {
    const phoneNumber = '+525532647592'; // Replace with the phone number you want to contact on WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    Linking.openURL(whatsappUrl);
  };

  const navigateToHome = () => {
    navigation.goBack(); // Navigate back to the previous screen (Home)
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
              <TouchableOpacity onPress={navigateToHome}>
                <Image source={require('../../assets/3.png')} style={styles.headerLogo} />
              </TouchableOpacity>
            <TouchableOpacity>
           </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>

        <Text style={styles.title}>Recepción de Efectivo</Text>
        <Text style={styles.paragraph}>
        En caso de entregar el efectivo en una locación diferente a la oficina de Grupo Empresarial, se debe validar la dirección para poder programar el movimiento.{"\n"}
        {"\n"}
        Retorno en transferencia simple (mxn): __%{"\n"}
        Retorno como “Préstamo” (mxn): __%{"\n"}
        Retorno en “Tarjeta no nominativa” (mxn): __%{"\n"}
        Retorno “Asimilado no Acumulado” (mxn): __%{"\n"}
        Retorno “Asimilado Acumulado” (mxn): __%{"\n"}
        Retorno “Efectivo en otro Estado” (mxn): __%{"\n"}
        {"\n"}
        Si requieren cualquiera de las opciones anteriores con divisa, aumenta 2% y no tenemos injerencia en el tipo de cambio (lo otorga el banco o intermediario).
        </Text>

        <Text style={styles.title}>Asesoria Fiscal especializada</Text>
        <Text style={styles.paragraph}>
        Contamos con estrategias para q las Empresas cuentamen con Opinión de Cumplimiento SAT, Pago de Impuestos, Glosa de IMSS, Pagos de IMSS, Opinión de Cumplimiento de IMSS, Acta Constitutiva, Constancia de Situación Fiscal, Comprobante de Domicilio, Página Web (dominio), Número de Teléfono Empresarial, Datos Generales de los Socios.{"\n"}
        {"\n"}
        Manejo en transferencia simple (mxn): __%{"\n"}
        Manejo como “Préstamo” (mxn): __%{"\n"}
        Manejo en “Tarjeta no nominativa” (mxn): __%{"\n"}
        Manejo “Asimilado no Acumulado” (mxn): __%{"\n"}
        Manejo “Asimilado Acumulado” (mxn): __%{"\n"}
        Manejo “Efectivo en otro Estado” (mxn): __%{"\n"}
        {"\n"}
        Si requieren cualquiera de las opciones anteriores con divisa, aumenta 2% y no tenemos injerencia en el tipo de cambio (lo otorga el banco o intermediario).
        </Text>

        <Text style={styles.title}>Tesoreria Tercerizada</Text>
        <Text style={styles.paragraph}>
        Este tipo de estrategia, apoya Rn manejar tu recurso y admini no cuentan con la documentación que se ofrece con las Empresas Estructura A. Pueden facturar de acuerdo con las necesidades del cliente, independientemente del giro de la empresa. En caso de realizar transferencias sin requerir facturas, también se utiliza esta Estructura B.{"\n"}
        {"\n"}
        Retorno en transferencia simple (mxn): __%{"\n"}
        Retorno como “Préstamo” (mxn): __%{"\n"}
        Retorno en “Tarjeta no nominativa” (mxn): __%{"\n"}
        Retorno “Asimilado no Acumulado” (mxn): __%” {"\n"}
        Retorno “Asimilado Acumulado” (mxn): __%” {"\n"}
        Retorno “Efectivo en otro Estado” (mxn): __%{"\n"}
        {"\n"}
        Si requieren cualquiera de las opciones anteriores con divisa, aumenta 2% y no tenemos injerencia en el tipo de cambio (lo otorga el banco o intermediario).{"\n"}
        {"\n"}
        Importante: Se considera un tiempo para cierre de la operación una vez que se cuente con el recurso en firme y las instrucciones de retorno especificadas:{"\n"}
        Retorno en transferencia simple (mxn): 24hrs{"\n"}
        Retorno en “Tarjeta no nominativa” (mxn): 48hrs{"\n"}
        Retorno “Asimilado no Acumulado” (mxn): 24hrs{"\n"}
        Retorno “Asimilado Acumulado” (mxn): 24hrs{"\n"}
        Retorno “Efectivo en otro Estado” (mxn): 72hrs{"\n"}
        Retorno en transferencia (divisas): de 24 a 72hrs, una vez ejecutada la transferencia al beneficiario. Esto puede variar de acuerdo con los cortes de los bancos en cada país.{"\n"}
        Retorno en efectivo (divisas): de 24 a 72hrs. Esto puede variar por la denominación y lugar de entrega.{"\n"}
        {"\n"}
        Sólo es posible pactar tipos de cambio cuando se tiene el recurso confirmado en nuestras cuentas o lo recibimos en efectivo, de lo contrario, únicamente se proporciona tipo de cambio informativo para dar un panorama de cómo puede proceder la operación, sabiendo que de un momento a otro pudiera cambiar si existe volatilidad en el mercado. Si nosotros recibimos el recurso posterior a las
        15:00 hrs cuenta como “siguiente día hábil”. Favor de siempre consultar para los casos de movimientos en divisa, pues existen peculiaridades según el tipo de operación que se deben coordinar muy puntualmente y al momento.

        </Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleCotizarServicio}>
          <Text style={styles.loginButtonText}>COTIZAR SERVICIO</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: 82,
    height: 82,
    borderRadius: 50,
  },
  backButton: {
    paddingHorizontal: 12,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#fafafa',
    borderRadius: 5,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Fiscales;
