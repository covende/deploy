import React from 'react';
import { List, ListItem, UnorderedList, Text, Box } from '@chakra-ui/react';
import { Typography } from '@material-ui/core/';
import { COLORS } from '@CVTemplate/core/CVThemes';
import TablaPersonalizada from './Tablas3x3';




const TermV1 = ({ children, date }) => {

  const contenidoCeldas1 = [
    ['', 'Lunes a Viernes', 'Sàbados'],
    ['Recojo', '8AM a 6PM', '8AM a 12PM'],
    ['Entrega', '8AM a 6PM', '8AM a 12PM'],
  ];

  const contenidoCeldas2 = [
    ['', 'Same day', 'Next Day', 'Next day 48 horas'],
    ['Recojo', '1PM a 3PM*', '5PM a 10PM ', '(8AM a 8PM). Diá 2: se recoge el pedido'],
    ['Entrega', '4PM a 9PM', '8AM a 9PM del diá siguiente al recojo', '(8AM a 9PM). Diá 3: seentrega el pedido'],
  ];

  const contenidoCeldas3 = [
    ['ZONA', 'PRECIO'],
    ['ZONA 1 y 2', 'S/. 10.00'],
    ['ZONA 3', 'S/. 13.00' ],
    ['ZONA 4', 'S/. 15.00' ],
  ];

  return (
    <>
      <Box color={COLORS['blue']} textAlign='center' py='2rem'>
        <Text fontWeight={600} fontSize='18px'>
          {children}
        </Text>
        <Text fontWeight={600} fontSize='18px'>
          ({date})
        </Text>
      </Box>
      <List spacing={3} color='#444'style={{ userSelect: 'none' }} >
        <ListItem>
        <h2 style={{ fontWeight: '1000' }}> 1. OBJETIVO DEL CONTRATO </h2>
          <br />
          <Typography align='justify'>
            El presente documento tiene por objeto detallar el acuerdo comercial entre COVENDE y el
            VENDEDOR, para que este último pueda ofertar de manera legal sus productos a través del
            MARKETPLACE cuyo dominio es COVENDE.COM, el cual es propiedad de COVENDE. La empresa
            COVENDE SAC proporciona a los vendedores profesionales (en Adelante VENDEDOR) una solución
            técnica, que les permite registrarse para vender sus productos a través de la SOLUCIÓN COVENDE (en
            adelante PLATAFORMA), a diversos compradores en el ámbito del territorio peruano. La
            PLATAFORMA permite crear sus fichas de productos, gestionar sus existencias, sus precios, sus
            ofertas, su facturación, procesar sus pedidos y otros. Los presentes Términos y condiciones generales
            tienen por objeto definir las condiciones de uso de la PLATAFORMA COVENDE y los servicios
            asociados.<br /><br />
            La firma o aceptación del presente contrato, por cualquier medio, ya sean contratos firmados o
            medios electrónicos a través del Registro Online por parte de un VENDEDOR en la PLATAFORMA,
            incluyendo, de manera enunciativa más no limitativa, a través de un apoderado, representante y/o
            dependiente de otro documento relativo a la PLATAFORMA, se entenderá como una aceptación pura,
            simple e incondicional a estos términos y condiciones. El VENDEDOR está de acuerdo que por el
            simple hecho de que acepte y se registre en la PLATAFORMA, acepta consciente, incondicional y
            expresamente todos los efectos legales a que haya lugar por los presentes Términos y Condiciones.<br /><br />
            El VENDEDOR, sabe y reconoce en el momento de creación de su cuenta, los presentes Términos y
            Condiciones son aplicables única y exclusivamente para la PLATAFORMA en el territorio de Perú. Las
            Partes acuerdan que estos Términos y Condiciones, prevalecerán sobre cualquier otro acuerdo y/o
            convenio anterior, verbal o escrito, celebrado entre las partes con respecto a la PLATAFORMA
            prestada por parte de COVENDE al VENDEDOR.<br /><br />
            COVENDE se reserva el derecho de hacer modificaciones a estos Términos y Condiciones y a la
            PLATAFORMA, la cual deberá ser comunicada por cualquiera de los siguientes medios: (i)
            directamente al VENDEDOR o, (ii) a través de la PLATAFORMA, dentro de los cinco (05) días calendario
            anteriores a su entrada en vigor. El uso que el VENDEDOR hiciera de la PLATAFORMA con
            posterioridad a dichas modificaciones, constituye conocimiento y aceptación de los mismos.
          </Typography><br />
        </ListItem>

        <ListItem>
        <h2 style={{ fontWeight: '1000' }}> 2. DEFINICIONES </h2>
          <br />
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <Typography align='justify'>
            <strong>1. Catálogo:</strong> Base de datos de productos que COVENDE pone a disposición de los
            compradores.<br />
            <strong>2. Comprador o Compradores:</strong> Consumidor final o cliente profesional que compra Productos
            al VENDEDOR en la PLATAFORMA.<br />
            <strong>3. Covende:</strong> Empresa legalmente constituida como COVENDE SAC cuyo RUC es 20606114207,
            con marca registrada ante INDECOPI, que ofrece el servicio de venta online a través de la
            plataforma.<br />
            <strong>4. Covende.com:</strong> Dominio que alberga el sistema COVENDE.<br />
            <strong>5. Drop-Shipping:</strong> Modelo de negocio en el que no se cuenta físicamente con el stock que
            vende, ya que es el VENDEDOR (o dropshipper) quien se encarga de almacenar, preparar y
            enviar el pedido.<br />
            <strong>6. Ficha de Producto:</strong> La descripción del Producto ofertado por el VENDEDOR que contiene el
            texto, la descripción comercial y técnica, la referencia del Producto y su fotografía.<br />
            <strong>7. Las Partes:</strong> Se refiere a ambas partes, el VENDEDOR y COVENDE.<br />
            <strong>8. Marketplace:</strong> Portal cuyo dominio es COVENDE.COM que ofrece una solución técnica para
            la venta online de productos en la que diversos vendedores tienen sus tiendas ofreciendo
            un abanico amplio de opciones al comprador final.<br />
            <strong>9. Mayorista:</strong> Se refiere a la venta de productos en grandes cantidades.<br />
            <strong>10. Minorista:</strong> Se refiere a la venta de productos desde la cantidad mínima de 1 unidad.<br />
            <strong>11. Plataforma:</strong> Hace referencia la Interfaz para VENDEDOR puesta a disposición de
            vendedores por COVENDE, para que pueda gestionar y admininistrar su tienda, productos,
            stock, pedidos y otros.<br />
            <strong>12. Producto:</strong> Bien vendido en línea por los VENDEDORES a los COMPRADORES en el
            Marketplace.<br />
            <strong>13. Quiebre de stock:</strong> Significa que no hay inventario de un producto.<br />
            <strong>14. Registro online:</strong> Proceso de registro en el que el VENDEDOR registra toda su información
            profesional, comercial, legal y bancaria para suscribir el presente contrato.<br />
            <strong>15. Servicios:</strong> Servicios básicos y servicios opcionales descritos en el artículo 4, puestos a
            disposición del VENDEDOR a través de la Solución COVENDE.<br />
            <strong>16. Solicitud de cotizaciones:</strong> Es cuando el COMPRADOR puede pedir al VENDEDOR la
            cotización de productos siempre y cuando esta venta sea al por mayor, esto se dará desde
            la web pública.<br />
            <strong> 17. Solicitud de Devolución</strong>: Se refiere a la acción que el COMPRADOR puede pedir cuando el
            producto que le ha llegado no es el correcto o está dañado.<br />
            <strong>18. Solución COVENDE:</strong> Solución técnica compuesta por el portal COVENDE.COM, la Interfaz
            para Vendedor, a Interfaz para comprador y el Backoffice puesta a disposición de
            vendedores y compradores por COVENDE para ofrecer los servicios.<br />
            <strong>19. Tienda:</strong> Espacio donde los vendedores podrán exhibir sus productos.<br />
            <strong>20. Vendedor o Vendedores:</strong> El que sucribe el contrato para ser parte de COVENDE.COM,
            vendedor profesional que ofrece Productos a la venta en el marketplace a los compradores.
          </Typography>
          </ul>
        </ListItem><br />

        <ListItem>
        <h2 style={{ fontWeight: '1000' }}> 3. ANTECEDENTES </h2>
          <br />
          <Typography align='justify'>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <h3 style={{ fontWeight: '800' }}>3.1 COVENDE</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <strong>COVENDE S.A.C.</strong> Es una persona jurídica constituida en el Perú, su objetivo principal es brindar
            la SOLUCIÓN COVENDE, la cual es de autoría propia, para facilitar el intercambio comercial de
            bienes entre COMPRADORES y VENDEDORES, dando lugar a la comercialización de productos
            de los VENDEDORES que se suscriban al servicio, tanto al por mayor como al por menor. Este
            Marketplace pone a disposición del público en general una variedad de productos, ofrecidos
            por los VENDEDORES.<br /><br />
            </ul>
            Datos importantes acerca de COVENDE: <br /><br />

          <table style={{ width: '60%', borderCollapse: 'collapse', marginBottom: '20px', margin: '0 auto', border: '1px solid #050505', }}>
          <tr>
                <th style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Razón Social</th>
                <th style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>COVENDE S.A.C</th>
              </tr>
              <tr>
                <th style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>RUC</th>
                <td style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>20606114207</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Domicilio</th>
                <td style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Jr. Enrique Barrón Nro. 310 Int. 1505, 
                Urb. La Viñita, Barranco, Lima, Perú</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}> Representante
            Legal</th>
            <td style={{ border: '1px solid ##050505', padding: '8px', textAlign: 'center',}}>Ruth Cardenas Vega</td>
              </tr>
              <tr>
                <th style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Correo</th>
                <td style={{ border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>info@covende.com</td>
              </tr>   
          </table><br />

            <h3 style={{ fontWeight: '800' }}>3.2 VENDEDOR</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            VENDEDOR se define como la persona natural con negocio o persona jurídica constituida de
            forma legal y bajo el reglamento peruano, quien por voluntad propia se suscribe a la SOLUCIÓN
            COVENDE a tráves del “Registro Online” de Tienda, en donde deberá brindar sus datos y
            adjuntar determinada información y documentación (a detallarse en el punto 3.3). Es
            responsabilidad de COVENDE verificar que la información enviada corresponda a la solicitada,
            para dar de alta la tienda y que el VENDEDOR pueda utilizar la PLATAFORMA y todas sus
            funcionalidades.<br /><br />
            </ul>
            <h3 style={{ fontWeight: '800' }}>3.3 REGISTRO ONLINE</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            Pueden registrarse como Vendedores a la SOLUCIÓN COVENDE, personas jurídicas o personas
            naturales con capacidad tributaria para vender Productos de forma profesional, registradas en
            la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT). Una misma
            persona jurídica sólo puede tener una cuenta de VENDEDOR. El VENDEDOR deberá ser titular
            de una cuenta bancaria profesional en una entidad bancaria que ofrezca garantías suficientes
            dentro del territorio peruano.<br /><br />
            Para registrarse en la PLATAFORMA, el VENDEDOR debe completar de manera precisa y
            exhaustiva el formulario de solicitud de apertura de cuenta e ingresar correctamente sus datos
            bancarios. COVENDE se reserva el derecho de solicitar cualquier documento de respaldo
            adicional, incluso después del registro del VENDEDOR. COVENDE también se reserva el derecho
            de validar o rechazar cualquier solicitud de registro.<br /><br />
            Al registrarse y al utilizar la PLATAFORMA, el VENDEDOR se compromete a no proporcionar
            información inexacta o incompleta. Asimismo, está obligado a comunicar espontáneamente a
            COVENDE, a través de su CUENTA, cualquier modificación en los datos registrados. El VENDEDOR
            responderá en caso de incumplimiento de cualquiera de estas obligaciones.<br /><br />
            Si se ha proporcionado información falsa durante el registro y/o si el VENDEDOR no notifica un
            cambio, COVENDE puede cancelar su registro en la PLATAFORMA de pleno derecho, en las
            condiciones previstas en este documento. COVENDE se reserva el derecho de transmitir la
            información brindada por el VENDEDOR al registrarse en la PLATAFORMA a cualquier tercer
            proveedor de servicios de COVENDE involucrado en la prestación de la SOLUCIÓN COVENDE.<br /><br />
            El REGISTRO ONLINE de tienda es el proceso a través del cual el VENDEDOR decide
            voluntariamente suscribirse a la SOLUCIÓN COVENDE, para lo cual brinda los siguientes datos a
            través de la PLATAFORMA, en donde da la ACEPTACIÓN y conformidad de regirse a los términos
            y condiciones. En dicha interfaz se le solicita al VENDEDOR:
            </ul>
            </ul><br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <h4 style={{ fontWeight: '700' }} >3.3.1 Datos de usuario </h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            1. Correo Electrónico <br />
            2. Tipo de documento <br />
            3. Nombres <br />
            4. Apellidos <br />
            5. Contraseña <br />
            6. Confirmación de Contraseña <br />
            7. ¿Soy el representante legal o titular de la empresa? SI / NO
            </ul><br />
            <h4 style={{ fontWeight: '700' }}>3.3.2 Datos del negocio </h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            1. RUC <br />
            2. Nombre comercial <br />
            3. Razón social <br />
            4. Adjuntar ficha RUC <br />
            5. Tipo de Sociedad <br />
            6. Dirección fiscal <br />
            7. Responsable de Pedidos <br />
            8. Teléfono de Contacto <br />
            9. Departamento <br />
            10. Provincia <br />
            11. Distrito <br />
            12. Referencia <br />
            13. Tipo de venta
            </ul><br />
            <h4 style={{ fontWeight: '700' }}>3.3.3 Datos del representante legal</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            1. Nombres <br />
            2. Apellidos <br />
            3. Tipo de documento <br />
            4. Nro de Documento <br />
            5. Adjuntar DNI <br />
            6. Correo Electrónico <br />
            7. Celular 
            </ul><br />
            <h4 style={{ fontWeight: '700' }}>3.3.4 Datos bancarios</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            1. Titular de la cuenta bancaria <br />
            2. Banco <br />
            3. Número de cuenta <br />
            4. CCI <br />
            5. Adjuntar estado de cuenta <br />
            </ul>
            </ul>
            </ul>
          </Typography>
        </ListItem><br />
        
        <ListItem>
          <h2 style={{ fontWeight: '1000' }}>  4. COMUNICACIÒN ENTRE LAS PARTES </h2>
          <br />
          <Typography align='justify'>
            Toda comunicación o notificación entre las partes deberá constar por escrito, estando las partes de
            acuerdo con que el intercambio de datos electrónicos también será un medio válido de comunicación
            entre ellas.<br />
            El VENDEDOR señala como su información de contacto, la que detalla en su REGISTRO ONLINE
            (detallado en la clausula 3.3), toda comunicación se dirigirá válidamente a los datos del usuario.<br /><br />
            Cualquier modificación se considerará entregada y recibida si: (i) se entrega personalmente a su
            destinatario, al momento de ser recibida; (ii) se envía por correo, en la fecha de entrega a su dirección
            de remisión; (iii) se envía mediante correo electrónico o por el portal, al momento del despacho de
            dicha comunicación, siempre que se haya recibido confirmación electrónica u otra del recibo del
            despacho.{' '}<br /><br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <h4 style={{ fontWeight: '800' }}>4.1 Comunicación a travès de la plataforma</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li> Comunicación y envío de documentos a COVENDE: los comprobantes/ justificantes/anexos
            comunicados por el VENDEDOR a COVENDE deberán adjuntarse a través de la PLATAFORMA o
            a través de correo electrónico en caso el VENDEDOR designe a COVENDE para la creación de
            su tienda.</li>
            <li>El VENDEDOR está consciente de que COVENDE le enviará notificaciones a través de la
            plataforma y/o por correo electrónico. </li>
            <li>El VENDEDOR acepta no mantener correspondencia con el COMPRADOR más que a través de
            la PLATAFORMA. El VENDEDOR tendrá acceso al nombre y apellido del COMPRADOR a través
            de la PLATAFORMA para la gestión de reclamaciones del COMPRADOR.</li>
            </ul>
            </ul>
            </ul>
          </Typography>

        </ListItem><br />

        <ListItem>
          <h2 style={{ fontWeight: '1000' }}>  5. RESPONSABILIDAD </h2>
          <br />
          <Typography align='justify'>
            Cada parte es responsable individualmente frente a los daños y perjuicios que podrían ocurrir dentro
            de sus obligaciones indicadas en el presente documento. La responsabilidad que asume cada parte,
            incluye a cualquier tipo de daño que se derive de su incumplimiento total o parcial a las prestaciones
            pactadas, y exista dolo o culpa inexcusable.

          </Typography>
        </ListItem><br />

        <ListItem>
          <h2 style={{ fontWeight: '1000' }}> 6. SERVICIOS DE LA PLATAFORMA </h2>
          <br />
          <Typography align='justify'>
            COVENDE ha desarrollado un software con código fuente propio denominado la PLATAFORMA
            COVENDE, esta PLATAFORMA permite al VENDEDOR la gestión comercial, el control de ventas,
            promociones, stock de sus productos y otras acciones comerciales. El VENDEDOR reconoce que la
            PLATAFORMA ha sido puesta a su disposición por COVENDE y que el uso de la misma puede ser
            descontinuado en cualquier momento a entera discreción de COVENDE.<br /><br />
            El VENDEDOR reconoce y acepta que COVENDE no asume ninguna responsabilidad por las acciones
            del VENDEDOR o sus compradores en relación a los siguientes aspectos: (i) El uso de la PLATAFORMA,
            ya sea directamente o a través de los usuarios designados por el VENDEDOR. (ii) Inconsistencias o
            falta de actualización de la información de la tienda proporcionada por el VENDEDOR o los usuarios
            designados. (iii) La certeza y precisión de la información ingresada en la PLATAFORMA por el
            VENDEDOR o los usuarios designados. (iv) El funcionamiento ininterrumpido de la PLATAFORMA.
            En este sentido, el VENDEDOR declara ser el único responsable frente a COVENDE y a los compradores
            en lo que respecta a la información de los productos, ya sea que esté incluida en la PLATAFORMA o
            no, así como de proteger adecuadamente su información comercial fuera de la PLATAFORMA.<br /><br />
            El VENDEDOR será el único responsable de mantener la seguridad de la contraseña proporcionada
            por COVENDE para acceder a la PLATAFORMA, y no deberá revelarla a terceras personas. El
            VENDEDOR será responsable de cualquier mal uso de su contraseña y se compromete a informar a
            COVENDE de cualquier uso inapropiado tan pronto como tenga conocimiento de ello, además de
            indemnizar por los daños y perjuicios que se deriven de dicho uso.<br /><br />
            No obstante, en la medida de lo posible, COVENDE informará previamente sobre cualquier
            interrupción en el funcionamiento de la PLATAFORMA. Sin embargo, si el VENDEDOR no puede
            acceder a la PLATAFORMA, sigue siendo su obligación informar de manera completa utilizando los
            canales de atención designados por COVENDE.<br /><br />
            El VENDEDOR acepta y reconoce que el Servicio de la PLATAFORMA es prestado por COVENDE,
            mediante el cual COVENDE proporciona al VENDEDOR el uso de la PLATAFORMA, como el medio de
            conexión comercial entre este último y sus compradores, así como los procesos asociados, en
            particular siendo estos los siguientes:<br /><br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <h4 style={{ fontWeight: '800' }}>6.1 Funciòn de codificaciòn y carga de productos en la PLATAFORMA</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <p>
              El VENDEDOR contará con un espacio dedicado a los productos, dónde deberá cargar sus
              productos de manera individual o masiva (Excel), respetando las características mínimas que
              exige la ficha de producto para poderse mostrar satisfactoriamente a los compradores de
              COVENDE. En ese sentido, el VENDEDOR proporcionará para cada producto la información
              requerida en la Ficha de Producto según lo especificado por COVENDE. Cada Ficha de Producto
              deberá contener los datos mínimos obligatorios, exactos y completos, así como las
              actualizaciones útiles para que la información comunicada sea exacta y completa en todo
              momento.<br /><br /> 
              El VENDEDOR es el responsable de subir la información de sus productos de acuerdo con los
              requisitos establecidos por las normas peruanas que regulan la materia, con las especificaciones
              que COVENDE le otorga al VENDEDOR a través de la PLATAFORMA.
            </p><br />

            <h4>FICHA DE PRODUCTO</h4><br />

            <table style={{ width: '60%', borderCollapse: 'collapse', marginBottom: '60px', margin: '0 auto', border: '1px solid #050505', }}>
            
              <tr>
                <th style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>CARGA MASIVA</th>
                <th style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>CARGA MANUAL</th>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Código_categoría</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Nombre de categoría</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Nombre_categoría</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Nombre del Producto</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Fotografías</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Fotografía Principal</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Nombre</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Fotografía (2,3,4 y 5)*</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Modelo</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Modelo</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Marcas</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Precio producto</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>SKU</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Marca</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Precio</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Stock</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Stock</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Oferta</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Descripción</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Descripción</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Detalles</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Marca</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Colores</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Peso producto</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Tallas</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Ancho producto</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Palabras clave</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Largo producto</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Material</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>SKU</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Largo producto(cm)</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Oferta*</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Ancho producto(cm)</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Palabras clave</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Alto producto(cm) </td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Detalles del producto</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Peso producto(kg)</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Largo del paquete</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Largo paquete(cm)</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Ancho del paquete</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Ancho paquete(cm) </td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Alto del paquete</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Alto paquete(cm)</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Dias preparaciòn paquete</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Peso paquete(kg)</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Tipo de comprobante</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Días preparación del paquete</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center', 
                background: `linear-gradient(to right, #7fd6fa 100%, transparent 20%)`,}}>
                  Información adicional del paquete
                </td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Garantía</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center', 
                background: `linear-gradient(to right, #7fd6fa 100%, transparent 20%)`,}}>Garantía</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Condiciones de garantía</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center', 
                background: `linear-gradient(to right, #7fd6fa 100%, transparent 20%)`,}}>Devoluciones</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Tipo de oferta</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center', 
                background: `linear-gradient(to right, #7fd6fa 100%, transparent 20%)`,}}>Atributos</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Oferta</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center', 
                background: `linear-gradient(to right, #7fd6fa 100%, transparent 20%)`,}}>Procedencia</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Inicio de oferta</td>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center', 
                background: `linear-gradient(to right, #7fd6fa 100%, transparent 20%)`,}}>Condición</td>
              </tr>
              <tr>
                <td style={{ width: '235px', border: '1px solid #050505', padding: '8px', textAlign: 'center',}}>Fin de oferta</td>
                <td style={{ width: '235px', border: '1px solid #050505', borderBottom: '1px solid white', borderRight: '1px solid white', padding: '8px', 
                textAlign: 'center', }}></td>
              </tr>
              </table>

              <table style={{ width: '60%', borderCollapse: 'collapse', marginBottom: '60px', margin: '0 auto', border: '1px solid #050505', }}>
              <tr>
                <td style={{ border: '1px solid #050505', padding: '8px', height: '90px', width: '235px', }}>
                
              <p style={{ backgroundColor: '#7fd6fa', padding: '10px', width: '90px'}}>
                <strong>LEYENDA:</strong>
              </p>
              <p>* Son datos opcionales</p>
              </td>
              <td style={{ width: '235px', border: '1px solid #050505', borderTop: '1px solid white', borderBottom: '1px solid white', borderRight: '1px solid white', padding: '8px', 
              textAlign: 'center', }}></td>
              </tr>
              </table>
              <br />

            <p>
              El VENDEDOR es responsable de cargas sus productos en la PLATAFORMA, lo que implica
              verificar y asumir la responsabilidad de la exactitud de la descripción del producto puesto
              a la venta, respetando las exigencias técnicas de la PLATAFORMA y la legislación peruana
              en materia de comercio electrónico y el Código de Protección y Defensa al Consumidor (Ley
              Nº 29571). Sin perjuicio de ello, COVENDE podrá modificar la descripción e imágenes de la
              publicación con el fin de mejorar o corregir el contenido de esta, previo aviso al VENDEDOR.
            </p>
            <br />
            <p>En ese sentido, el VENDEDOR se hace responsable de despachar al comprador todas las
              piezas ofrecidas en la ficha de producto en un solo paquete o caja. En caso de que las
              dimensiones del producto requieran que se envíen piezas por separado, el VENDEDOR debe
              etiquetar cada paquete indicando qué pieza contiene y cuántas piezas hay en total en el
              envío. Además, se debe asegurar que las piezas estén debidamente aseguradas al empaque
              y no puedan desprenderse fácilmente. El VENDEDOR es responsable de enviar los
              productos con el empaque adecuado, incluso si utiliza las guías de envío proporcionadas
              por COVENDE. El VENDEDOR será responsable ante el comprador y COVENDE por cualquier
              perjuicio causado en caso de no cumplir con la entrega completa o en un solo envío.</p>
            <br />

            <p>A través de la PLATAFORMA, el VENDEDOR deberá mantener actualizado el stock y los
              precios de la lista de productos ofrecidos, según las especificaciones previamente
              establecidas. Es responsabilidad del VENDEDOR asegurar la disponibilidad de los Productos
              en la PLATAFORMA. En caso de que el VENDEDOR no actualice su stock en un plazo de 21
              días naturales, los productos dejarán de ser ofrecidos en la PLATAFORMA y serán
              desactivados. Durante el plazo establecido, el VENDEDOR recibirá 3 notificaciones, la
              primera será a los 7 días, la segunda a los 14 días y la última a los 20 días, siendo el día 21
              el día de la desactivación.</p>
            <br />

            <p>Si hay errores o falta de información en la ficha de producto que resulten en reclamos,
              quejas, devoluciones o perjuicios para el COMPRADOR, COVENDE tiene plena libertad para
              cancelar el pedido y reembolsar al comprador. Es responsabilidad exclusiva del VENDEDOR
              revisar constantemente toda la información relacionada con sus productos y pedidos,
              liberando a COVENDE de cualquier responsabilidad en este sentido.</p>
            <br />
            <p>El VENDEDOR determinará el precio de venta de los productos y, en caso de ofertas, su
              vigencia en la PLATAFORMA, a su discreción, siempre teniendo en cuenta la legislación
              aplicable, incluyendo el Código de Protección y Defensa del Consumidor y otras normativas
              complementarias o modificatorias.</p>
            <br />
            <p>Las partes reconocen que tienen una relación comercial como contratistas independientes
              y no colaborarán en el establecimiento de precios, ya que es una decisión exclusiva del
              VENDEDOR. Por lo tanto, en el canal de venta de la PLATAFORMA, se establece plena
              libertad competitiva para el VENDEDOR, quien debe garantizar las condiciones de venta
              más atractivas para sus productos. En este sentido, el VENDEDOR se compromete a ofrecer
              en la plataforma de COVENDE un precio igual o inferior al que ofrezca en cualquier otra
              plataforma o canal de venta.</p>
            <br />
            <p>COVENDE se reserva el derecho, a su discreción, de decidir no publicar uno o varios
              productos en la PLATAFORMA.</p>
              </ul>
              </ul>
            <br />

            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <h4 style={{ fontWeight: '700' }}>6.1.1 Políticas de contenido gráfico en la PLATAFORMA</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>

            <p>Las siguientes políticas ayudan a garantizar que las imágenes de los productos
              publicados en la PLATAFORMA creen una experiencia positiva para los compradores.</p><br />

            <p>El VENDEDOR es responsable de que las imágenes publicadas satisfagan todas las
              leyes y reglamentaciones aplicables.</p>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
                El VENDEDOR es responsable de publicar una o varias imágenes dónde se
                visualice claramente el producto y sus características, el contenido publicado
                debe ser relevante para ayudar a que los compradores tomen su decisión de
                compra. No se permiten imágenes que no tengan relación con la descripción del
                producto. COVENDE quitará las imágenes que no cumplan con este estándar.
              </li><br />
              <li>
                Para que el producto sea publicado, el VENDEDOR deberá publicar imágenes de
                los productos que respeten las siguientes características <br /><br />
                <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                  <li>Imágenes del producto con una resolución de al menos 700 píxeles x 700 píxeles, con un margen interno de 30 píxeles por lado.</li>
                  <li>El formato deberá ser en PNG o JPG si la carga es manual y por medio de un enlace si la carga es masiva.</li>
                  <li>La imagen principal deberá tener el fondo blanco y mostrará exclusivamente el producto.</li>
                  <li>El VENDEDOR deberá evitar imágenes que presenten sombras, desenfocadas, de baja calidad, o contenido irreconocible.</li>
                  <li>Las imágenes deberán ser sin marcas de agua, logos o números de teléfono superpuestos que engañen a los compradores.</li>
                </ul>
              </li>
              </ul>
              </ul>
              </ul>
              </ul>
            <br />

            <h4 style={{ fontWeight: '800' }}>6.2 Funciòn de Gestión de pedidos</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR será el único responsable de atender sus pedidos respetando las políticas de
              ventas estipuladas por sí mismo en la PLATAFORMA al momento de hacer la carga de productos
              (Según detalle de la ficha de producto - clausula 6.1).</p><br />

            <p>La solución COVENDE facilitará al VENDEDOR acceder a datos sobre seguimiento y envío de
              productos. Para lograrlo, el VENDEDOR debe procesar el envío del producto en la PLATAFORMA
              y descargar automáticamente la guía de remisión.</p><br />

            <p>El VENDEDOR recibirá sus órdenes de pedidos en la interfaz de VENDEDOR de la PLATAFORMA
              para que proceda a iniciar la atención del pedido (“procesar pedido”), luego procederá con la
              preparación del paquete, descargará la guía de remisión y posteriormente la entrega del o los
              productos al COMPRADOR o, en su caso, a la Empresa de Transporte contratada por COVENDE.
              Cabe resaltar que, la orden de pedido mostrada en la interfaz del vendedor contiene la siguiente
              información: ID del pedido, número de Código Interno de Producto de Vendedor (SKU), Precio
              del Producto, estatus de la orden, datos del comprador (ID del comprador, nombre, DNI, email,
              teléfonos, dirección). El plazo de entrega al transportista lo establecerá el VENDEDOR al
              momento de subir el producto en el paso 3 en la sección 3.1 “Tiempo de preparación”. Cabe
              resaltar que, el VENDEDOR podrá atender sus pedidos de manera manual o de manera masiva.</p><br />

            <p>El VENDEDOR es responsable de asegurar que el o los productos sean entregados a la Empresa
              de Transporte Contratada por COVENDE dentro del tiempo de despacho que estableció al
              momento de cargar sus productos.</p><br />
            <p>Una vez que el VENDEDOR confirme el envío, COVENDE se encargará de hacer seguimiento del
              proceso de entrega y recepción de los productos por parte del comprador. En caso de que el
              VENDEDOR no utilice las Empresas de Transporte Contratadas por COVENDE, deberá informar
              a COVENDE sobre el estado de los pedidos.</p>
              </ul>
            <br />
            <h4 style={{ fontWeight: '800' }}>6.3 Función de Gestión de devolución de Productos (<i>Logística Inversa y Fallos de Entrega</i>)</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>
              Con el objetivo de brindar seguridad al COMPRADOR, este podrá hacer la devolución o cambio
              de los productos adquiridos a través de la PLATAFORMA. Por otro lado, el VENDEDOR se
              compromete a establecer de manera clara las políticas relacionadas con la devolución de sus
              productos. Este proceso se llevará a cabo al momento de cargar los productos en la
              PLATAFORMA, ya sea mediante la carga individual o la carga masiva. Es responsabilidad del
              VENDEDOR especificar al menos dos motivos de devolución de la lista de opciones
              proporcionada por COVENDE en la sección 4.3 del menú (Productos &gt; Crear productos &gt;
              Devoluciones).
            </p>
            <br />
            <p>Los motivos de devolución que el VENDEDOR debe detallar son los siguientes:</p>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Cambio de talla</li>
              <li>Errores de fabricación</li>
              <li>Descripción no coincidente</li>
              <li>Producto dañado o en mal estado</li>
              <li>Producto incorrecto</li>
              </ul>
            </ul>
            <br />
            <p>Quedan exentos de devolución los siguientes tipos de productos:</p>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Productos de cuidado personal (como cremas, sueros, maquillaje y productos de higiene personal o íntima, entre otros).</li>
              <li>Productos de copia inmediata (contenido audiovisual, entretenimiento y otros).</li>
              <li>Accesorios o artículos usados cerca del cuerpo (como sombreros, guantes, medias, ropa íntima, trajes de baño, aretes, collares y lentes).</li>
            </ul>
            </ul>
            <br />
            <p>Por otro lado, en el caso de la carga masiva, el sistema establecerá automáticamente los siguientes campos:</p>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Devolución por ser diferente a la descripción detallada en la ficha de producto.</li>
              <li>Devolución por fallas de fabricación</li>
              </ul>
            </ul><br />

            <p>El COMPRADOR podrá solicitar la reposición de producto comprado. Esta solicitud le llegará al
              VENDEDOR en la pestaña de “Gestion de devoluciones” en la interfaz del VENDEDOR, donde el
              VENDEDOR tendrá la potestad de rechazar o aprobar la solicitud según sea el caso. La solicitud de
              reposicion de producto será evaluada por el VENDEDOR. En caso de aprobación se cordinará la
              entrega del nuevo producto.</p>
            <br />
            <p>Si la devolución o cambio del Producto es de responsabilidad del Vendedor, el costo del envío por
              devolución o cambio de Productos será asumido por éste.</p>
              </ul>
            <br />
           
            <h4 style={{ fontWeight: '800' }}>6.4 Funciòn de Centro de Ayuda</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p> El VENDEDOR contará con una sección de ayuda denominada CENTRO DE AYUDA, dónde podrá
              acceder a información relacionada a la gestión de la PLATAFORMA, dicho espacio funcionará
              tambiéncomo centro de aprendizaje donde encontrará instrucciones y/o tutoriales para facilitar
              la creación de productos, gestión de pedidos, preguntas frecuentes y otros.</p><br />
              </ul>
            <h4 style={{ fontWeight: '800' }}>6.5 Funciòn de Cotizaciones</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p> En caso se haya registrado como vendedor Mayorista o Minorista y mayorista, en esta sección el
              VENDEDOR podrá recepcionar solicitud de cotizaciones para poder vender sus productos a gran
              escala enviando su respectiva cotización.</p><br />
              </ul>
            <h4 style={{ fontWeight: '800' }}>6.6 Funciòn de Estadísticas</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>En esta sección el VENDEDOR podrá visualizar un resumen detallado de sus ventas, calificación y
              reputación de su tienda (los niveles de reputación por ítem, reputación por periodo de tiempo y
              el nivel de reputación dentro de la PLATAFORMA), ingresos de venta, monto de venta promedio,
              número de ventas, número de compradores y calificación de la tienda.</p><br />
            <p>El VENDEDOR se compromete a respetar los índices de calidad de servicio propios del uso de la
              Solución COVENDE definidos en los presentes Términos y Condiciones. Los indicadores de calidad
              accesibles a través de la PLATAFORMA tienen como único objetivo informar al VENDEDOR sobre
              su desempeño.</p><br />
            </ul>
            <h4 style={{ fontWeight: '800' }}>6.7 Funciòn de Configuracón</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>En esta sección el VENDEDOR podrá acceder a la información que registró en la plataforma y
              revisar sus datos de registro</p><br />
            </ul>
            <h4 style={{ fontWeight: '800' }}>6.8 Funciòn de Ingresos</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p> En esta sección el VENDEDOR podrá visualizar y gestionar sus ingresos, comisiones, resumen de
              movimientos con detalle y facturación. Asimismo, se podrá descargar las facturas emitidas por
              COVENDE.</p><br />
              </ul>
              </ul>

          </Typography>
        </ListItem>


        <ListItem>
        <h2 style={{ fontWeight: '1000' }}> 7. OBLIGACIONES DE LAS PARTES </h2><br />
          <Typography align='justify'>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <h4 style={{ fontWeight: '800' }}>7.1 Oblicaciones de COVENDE</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Es responsabilidad de COVENDE el diseño, rediseño, diagramación y desarrollo de la
                plataforma COVENDE.</li>
              <li>COVENDE tiene la facultad de elegir la ubicación, lugar, categoría y sub-categoría de los
                productos publicados en la plataforma.</li>
              <li>COVENDE establece la manera en que se publicará la información de los productos y
                vendedores, incluyendo la clasificación de los primeros y segundos por los compradores.</li>
              <li>Realizar los pagos correspondientes al VENDEDOR, en función a la retención de los adeudos
                aplicables (comisión, penalidades, solución de reclamos, etc.)</li>
              <li>COVENDE es un intermediario donde el COMPRADOR adquiere los productos ofertados por
                el VENDEDOR, ofrecidos a través de la PLATAFORMA</li>
              <li>COVENDE tendrá la función de promocionar los productos del vendedor, a través de
                exposición en su PLATAFORMA, así como también se encargará de traer flujo comercial a su
                plataforma, para que así pueda existir movimiento y operaciones de compra-venta en la
                misma.</li>
              <li>El encargado de administrar la PLATAFORMA será COVENDE, además del mantenimiento y
                buen funcionamiento de la misma, asimismo tiene la responsabilidad de dar soporte en
                primera línea de la plataforma en cuanto a los requerimientos de los compradores finales.</li>
              <li>Es responsabilidad de COVENDE realizar el procesamiento y recaudación del pago generado
                a partir de las ventas del VENDEDOR, las cuales se efectuaron a través de COVENDE,
                también de la liquidación de los pagos entre COVENDE y el VENDEDOR.</li>
              <li>Es responsabilidad de COVENDE el servicio post-venta y atención al comprador para efectos
                de mediar o intermediar sobre las devoluciones y garantías que ofrezca el VENDEDOR.</li>
              <li>Es responsabilidad de COVENDE el diseño y ejecución de campañas publicitarias y
                actividades de mercadeo para promocionar la PLATAFORMA. COVENDE se reserva el
                derecho de definir los medios, los lineamientos y las condiciones para la ejecución de
                promociones, campañas publicitarias y actividades de mercadeo.</li>
              <li>COVENDE es responsable del pago de detracciones de las facturas por comisiones y otros
                conceptos que son emitidos al VENDEDOR, éste pago se realiza como máximo hasta el
                séptimo (07) día hábil del mes siguiente.</li>
                </ul>
            </ul><br />

            <h4 style={{ fontWeight: '800' }}>7.2 Oblicaciones del VENDEDOR</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>El VENDEDOR declara estar legalmente constituido según las leyes aplicables en el Perú, su
                representante tiene la autoridad para suscribir los documentos pertinentes y aceptar estos
                términos y condiciones, y cuenta con todas las autorizaciones necesarias para utilizar la
                PLATAFORMA y cumplir con estos Términos y Condiciones, así como cualquier otro
                documento o comunicación relacionada, no se encuentra en situación de cesación de pagos
                o incapacidad de pago inminente, y el uso de la PLATAFORMA no infringe ningún contrato
                acuerdo vigente a su cargo.</li>
              <li>El VENDEDOR garantiza que todos los productos que serán ofertados bajo el dominio
                COVENDE.COM, tienen origen lícito, es decir que estos serán nuevos, originales y han sido
                diseñados y fabricados de acuerdo con las leyes del país donde están registrados, que
                cumplen con todas las especificaciones de calidad requeridas para su comercialización
                según las leyes del Perú, incluyendo los registros sanitarios y las normas oficiales peruanas
                aplicables; y cumplen con las leyes, requisitos y regulaciones aplicables, incluida la Ley de
                Protección y Defensa del Consumidor (Ley N° 29571 y sus modificaciones). El VENDEDOR
                será responsable ante COVENDE y los compradores por defectos en materiales,
                rendimiento, operación y fabricación de los productos.</li>
              <li>En cuanto a las marcas que el VENDEDOR oferte en COVENDE, todas deben estar
                debidamente registradas en INDECOPI, y no infringir derechos de terceros. COVENDE
                podrá solicitar documentación que acredite ello en cualquier momento. De presentarse
                demandas sobre irregularidades en cuanto lo anterior, el VENDEDOR asumirá total
                responsabilidad de ello.</li>
              <li>Es responsabilidad del VENDEDOR subir a la PLATAFORMA, la codificación y stock de los
                productos que pretende comercializar junto con las especificaciones, dibujos, imágenes,
                criterios de desempeño, garantía, funcionalidades y demás descripción sobre los productos
                que comercializará mediante la PLATAFORMA. Las descripciones de los productos deben
                coincidir con las características físicas reales de los productos. Asimismo, cualquier
                equivocación en el número de productos disponibles es responsabilidad total del
                VENDEDOR asumir los cobros extraordinarios citados en la cláusula 9.2. según sea el caso.</li>
              <li>El VENDEDOR reconoce que es el único y exclusivo responsable de las imágenes, marcas,
                descripciones y productos que anuncie, publique y/o venda a través del MARKETPLACE, en
                el caso de los productos fabricados en el extranjero, declara que han sido importados
                cumpliendo con los requisitos legales y cuentan con todas las licencias, permisos y
                autorizaciones para su comercialización en el Perú. El VENDEDOR declara que dispone de
                la documentación necesaria para demostrar ante cualquier autoridad competente,
                compradores o COVENDE la legalidad y validez de los productos que comercializa a través
                del MARKETPLACE, y se responsabiliza de no infringir ninguna marca registrada, patente
                de invención, diseño industrial, modelo de utilidad ni ningún otro derecho de propiedad
                intelectual legalmente protegido.</li>
              <li>Es total responsabilidad del VENDEDOR, gestionar la atención de órdenes de pedidos de
                manera segura para las personas y bienes, utilizando para ello la interfaz de vendededor
                de la PLATAFORMA, así como operar con la misma calidad de servicio ofrecido en su tienda,
                garantizando con las indicaciones de entrega y devolución de productos, al igual que la
                atención al cliente.</li>
              <li>Si el VENDEDOR decide retirar un producto de la plataforma COVENDE, deberá de cumplir
                con los despachos del producto que tenga pendiente de entrega.</li>
              <li>De presentarse la situación en que se haya registrado la venta de un producto y el
                VENDEDOR no cuente con stock disponible, COVENDE procederá a realizar el reembolso
                del dinero al comprador a través de una nota de crédito.</li>
              <li>Es responsabilidad del VENDEDOR realizar la entrega de los productos en correctas
                condiciones teniendo en cuenta las condiciones técnicas ofrecidas, perfectamente
                embaladas, envasadas y/o embolsadas según corresponda, en buen funcionamiento,
                según las especificaciones técnicas ofrecidas y con los más altos estándares de calidad, así
                como en el plazo establecido en la PLATAFORMA.</li>
              <li>Es responsabilidad del VENDEDOR, garantizar el stock mínimo de productos disponibles en
                la PLATAFORMA. El VENDEDOR tiene la opción de activar una alerta en la PLATAFORMA,
                que le notifique cuando su stock llegue a 3 unidades.</li>
              <li>En caso de que el VENDEDOR utilice su propio delivery, una vez entregado el producto, es
                responsabilidad del VENDEDOR, subir el reporte de conformidad de entrega del producto.</li>
              <li>El VENDEDOR se obliga a no tener contacto alguno con los compradores por ninguna razón
                y en ningún supuesto, excepto el autorizado expreso y escrito por COVENDE, como en el
                caso que la entrega de los productos la haga el propio VENDEDOR sin utilizar una empresa
                transportista contratada por COVENDE.</li>
              <li>El VENDEDOR es responsable de declarar y pagar sus impuestos ante la SUNAT, en forma,
                monto y tiempo correcto. En ese sentido, en cumplimiento de la Ley, es entera
                responsabilidad del VENDEDOR emitir una boleta o factura de venta, de acuerdo al régimen
                tributario correspondiente. Queda estrictamente prohibido limitar la emisión de un
                comprobante de pago cuando, por Ley, el VENDEDOR está obligado a hacerlo, así como
                indicar "Solo Emite Boleta" cuando también puede emitir factura. En caso de que el
                Vendedor, a pesar de estar obligado, no emita factura, boleta de venta u otro documento
                equivalente, COVENDE se reserva el derecho de retener el valor correspondiente al monto
                de la factura.</li>
              <li>Al momento de enviar los pedidos al COMPRADOR, el VENDEDOR es responsable de emitir
                y enviar fisicamente la factura o boleta correspondiente que cumpla con los requisitos
                establecidos por la legislación peruana. Este documento debe reflejar el valor total de los
                productos, incluyendo el costo de envío si corresponde. COVENDE se reserva el derecho
                de solicitar al VENDEDOR a través de la PLATAFORMA copias de las facturas emitidas por
                sus ventas, la cual deberá ser entregada en un plazo máximo de cuarenta y ocho (48) horas.
                Cabe resaltar que, si el VENDEDOR no cuenta con delivery propio, COVENDE le emitirá una
                factura o boleta por el valor del costo de envío para que compense la factura o boleta que
                emitió por el costo de envío.</li>
                </ul>
            </ul>
            <br />
            <h4 style={{ fontWeight: '800' }}>7.3 Oblicaciones de Ambas partes</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Ambas partes se encuentran en iguales condiciones y se autorizan el uso de sus marcas
                logotipos, nombres comerciales y/o elementos publicitarios identificable a cada una de ellascon
                la finalidad de realizar comunicaciones frente a los compradores finales.</li>
              <li>Ambas partes podrán coordinar para realizar promociones en la plataforma y otros medios de
                publicidad para fomentar la venta de productos, sobre los términos de estas promociones,
                serán acordados entre el VENDEDOR y COVENDE.</li>
              <li>No se podrán usar los elementos referidos para fines que no fueron indicados en el párrafo
                anterior, pero si existe autorización alguna de una de las partes se podrá realizar uso de los
                elementos para otros fines.</li>
                </ul>
                </ul>
            </ul>



          </Typography>
        </ListItem><br />

        <ListItem>
          <h2 style={{ fontWeight: '1000' }}> 8. CONDICIONES ECONÓMICAS </h2><br />
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <h4 style={{ fontWeight: '800' }}>8.1 Suscripción del servicio y comisiones</h4>
          <Typography align='justify'>
          <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>
              El registro del VENDEDOR en la PLATAFORMA y los Servicios básicos son gratuitos. Asimismo, por
              el uso de la PLATAFORMA el VENDEDOR pagará a COVENDE una comisión del 10% (diez por
              ciento) más el Impuesto General a las Ventas - IGV, sobre los productos vendidos dentro de la
              plataforma. COVENDE se reserva el derecho de revisar el porcentaje y categorías de las
              Comisiones en cualquier momento. En caso de que se realicen cambios en dichas comisiones, se
              notificará al VENDEDOR con una antelación de cinco (05) días calendario antes de la fecha en la
              que entrarán en vigor.
            </p><br />
            <p>
              En virtud de la firma del presente contrato, el VENDEDOR reconoce y acepta que COVENDE
              asume la responsabilidad exclusiva de llevar a cabo la gestión de cobro y recaudación del valor
              monetario de los pedidos (valor de productos adquiridos más el valor de envío) pagado por los
              compradores, siempre en nombre y por cuenta del VENDEDOR. El VENDEDOR acepta que
              COVENDE recibirá el pago de los productos en su representación. Asimismo, COVENDE transferirá
              al VENDEDOR el valor monetario de las ventas recaudadas exitosamente, previa deducción de su
              Comisión y de cualquier otro monto al que COVENDE tenga derecho conforme a los presentes
              términos y condiciones.
            </p><br />
            <p>
              COVENDE ejecutará el pago por el valor de las ventas que cumplan las siguientes condiciones: (i)
              quesean satisfactoriamente recepcionadas por el comprador y (ii) cuyo plazo de devolución se
              haya extinguido. En ese sentido, los pagos serán realizados por parte de COVENDE a la cuenta
              señalada por el VENDEDOR , cada quince (15) días calendario, por los productos que haya
              cumplido las DOS condiciones. COVENDE realizará los pagos única y exclusivamente a una cuenta
              bancaria a nombre del VENDEDOR. Dentro de un plazo máximo de CINCO (05) días hábiles
              después de recibir la transferencia, el VENDEDOR realizará la conciliación de dichas transferencias
              y comunicará por escrito a COVENDE cualquier observación en el plazo máximo de UN (01) día
              hábil. Si el VENDEDOR no presenta ninguna observación dentro de ese plazo, se entenderá que
              está de acuerdo con las transferencias realizadas por COVENDE. En caso contrario, COVENDE
              revisará las observaciones presentadas por el VENDEDOR durante el período mencionado y
              proporcionará una respuesta dentro de los TRES (03) días hábiles siguientes.
            </p>
            </ul>
            <br />
            <h4 style={{ fontWeight: '800' }}>8.2 Cobros extraordinarios</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>
              El VENDEDOR acepta asumir y cumplir con los cobros extraordinarios establecidos en la presente
              cláusula, dichos cobros serán debitados automáticamente de su saldo por las ventas. En este
              sentido, COVENDE tiene la plena facultad de negar el acceso y uso de la PLATAFORMA en caso de
              daños, problemas y/o incumplimiento por parte del VENDEDOR, además de realizar cobros
              extraordinarios en los siguientes casos:
            </p>
            </ul>
            <br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <h4 style={{ fontWeight: '700' }}>8.2.1 Envío de pedidos no solicitados en el MARKETPLACE:</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>En caso que el VENDEDOR utilice las
              Empresas de Transporte Contratadas por COVENDE para envíos de productos que no hayan sido
              solicitados por el comprador en el Marketplace, COVENDE se reserva el derecho de deducir el
              costo de dichos envíos de los montos a los que el VENDEDOR tenga derecho según el contrato,
              además de imponer una multa equivalente al 40% (cuarenta por ciento) del costo de envío
              correspondiente.</p>
              </ul>
              <br />

            <h4 style={{ fontWeight: '700' }}>8.2.2. Venta de Productos no Originales: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>En caso de que el VENDEDOR publique productos no
              originales, se podrá aplicar una multa que implicará la retención total del precio del producto o
              productos, como sanción.</p>
              </ul>
              <br />

            <h4 style={{ fontWeight: '700' }}>8.2.3. Venta de productos reacondicionados o productos ilegales: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>COVENDE se reserva el
              derecho de sancionar al VENDEDOR en caso de detectar incumplimiento por parte del
              VENDEDOR en las reglas de publicación y/o por la venta de productos reacondicionados siempre
              y cuando estos productos no cuenten con la especificación adecuada o productos ilegales como
              (Arma de fuego, sustancias ilicitas, etc.)</p>
              </ul>
              <br />
            <h4 style={{ fontWeight: '700' }}>8.2.4. Multa por envío de Publicidad o Propaganda: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR se compromete a no enviar
              propaganda o publicidad a través de su ficha de producto, correos, flyers, mensajes u otros
              medios, que indiquen o informen sobre ventas de sus productos a los compradores finales, ni
              contradecir los Términos y Condiciones. En caso de incumplimiento, se cobrará al VENDEDOR una
              multa de S/ 1,100.00 (Mil cien con 00/100 soles) por cada evento reportado de COVENDE, tendrá
              la facultad de suspender productos o la cuenta completa del VENDEDOR a su discreción.</p>
              </ul>
              <br />
            <h4 style={{ fontWeight: '700' }}>8.2.5. Retraso en la entrega del Pedido: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>Si el VENDEDOR envía un pedido después de su límite
              de entrega estipulado por él mismo al momento de registrar sus productos en la PLATAFORMA y
              la orden es cancelada, COVENDE podrá cobrar una multa equivalente a la comisión de venta
              correspondiente.<br />
              En caso de que el VENDEDOR no atienda el pedido en el plazo establecido por el mismo al
              momento de registrar el producto en la PLATAFORMA, el pedido será cancelado de forma
              automática y COVENDE cobrará el 10% + IGV como si el pedido hubiese sido procesado. En el
              caso de que el COMPRADOR cancele el pedido COVENDE no efectuará ningún cobro.</p>
              </ul>
              <br />
            <h4 style={{ fontWeight: '700' }}>8.2.6. Errores de Peso y Dimensiones: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>En caso el VENDEDOR coloque peso y dimensiones
              inferiores a los reales, COVENDE ajustará el peso y dimensiones del pedido según los rangos
              establecidos para calcular el costo de envío. La diferencia entre el precio pagado por el
              comprador y el precio real será asumida por el VENDEDOR.<br />
              En caso de que el VENDEDOR coloque el peso y dimensiones inferiores a los reales, el
              TRASPORTISTA notificará a COVENDE y este realizará el cobro de la diferencia entre ambas
              dimensiones que será asumida por el VENDEDOR.</p>
              </ul>
              <br />
            <h4 style={{ fontWeight: '700' }}>8.2.7. Despacho incorrecto o incompleto del Producto por parte del VENDEDOR:  </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>Si el
              VENDEDOR envía un producto con características y especificaciones diferentes a las adquiridas
              por el comprador, un producto defectuoso o no original, y el comprador solicita la devolución del
              producto, se le cobrará al VENDEDOR el 100% de la comisión, además de los gastos de transporte
              del producto. En caso de que el comprador decida no devolver el producto incorrecto debido a
              que es de mayor valor al adquirido o por cualquier otra razón, COVENDE no se hará responsable
              ni realizará ningún pago por la diferencia de valor entre los productos. En todos los casos
              mencionados en este punto, se generará un cobro logístico que dependerá de las dimensiones y
              peso del producto.</p>
              </ul>
              <br />
            <h4 style={{ fontWeight: '700' }}>8.2.8. En cuanto a la Calidad del Producto:</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR será responsable de cumplir con la
              entrega de productos de calidad de acuerdo a lo establecido en su ficha de producto. En caso de
              surgir un reclamo al Servicio de Atención al Cliente y/o una denuncia administrativa debido a la
              falta de calidad, el VENDEDOR asumirá expresamente las acciones y pronunciamientos
              administrativos (multas) por parte del INDECOPI. Estas acciones estarán directamente
              relacionadas con situaciones como cancelaciones arbitrarias sin aviso al consumidor, errores de
              precio, gastos relacionados con reembolsos y pagos de costas y costos del procedimiento, así
              como adquisiciones externas y/o cupones de compensación al coprador</p>
              </ul>
              <br />

            <h4 style={{ fontWeight: '700' }}>8.2.9. Error de Descripción y Precio del Producto en el MARKETPLACE:</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR será responsable de responder ante cualquier queja, reclamo o denuncia administrativa relacionada
              con errores de descripción y precio del producto en el MARKETPLACE. Asimismo, el VENDEDOR
              asumirá los gastos incurridos debido a dichos errores. COVENDE no se hará cargo de los gastos
              ocasionados por la responsabilidad del VENDEDOR.</p>
              </ul>
              <br />

            <h4 style={{ fontWeight: '700' }}>8.2.10.Cancelación por parte del VENDEDOR: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>Si el VENDEDOR cancela uno o varios pedidos
              debido a la falta de stock u otros motivos, se aplicará el costo de la comisión de dicha orden (10%
              + IGV), así como cargos adicionales del 40% (cuarenta por ciento) de la comisión correspondiente.</p>
              
              </ul><br />

            <h4 style={{ fontWeight: '700' }}>8.2.11. Falta de Entrega o Entrega Incorrecta de Comprobante de Pago:</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>En caso de que el
              VENDEDOR no entregue el comprobante de pago o lo entregue de forma incorrecta, deberá
              corregirlo y entregarlo dentro de los dos (02) días hábiles siguientes. El VENDEDOR deberá hacer
              frente a cualquier queja, reclamo o denuncia administrativa por parte del COMPRADOR, así como
              a los gastos derivados de la falta de entrega, tal como se establece en el punto sobre Obligaciones
              tributarias del Vendedor.</p>
              </ul>
              <br />

            <h4 style={{ fontWeight: '700' }}>8.2.12. Cancelación por parte de COVENDE: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR debe cumplir con lo establecido en
              los presentes Términos y condiciones. En caso contrario, COVENDE tiene el derecho de cancelar
              el pedido correspondiente y revertir el monto del pago mediante un cupón recibido del
              COMPRADOR en un plazo máximo de diez (10) días hábiles. Sin embargo, COVENDE aplicará la
              comisión establecida por la prestación de sus servicios y la deducirá en la siguiente transferencia
              de dinero al VENDEDOR, o podrá cobrarla directamente al VENDEDOR, según su discreción.
              Además, COVENDE puede decidir cancelar un pedido generado por errores del sistema, sin que
              esto genere comisiones para el VENDEDOR. En este caso, COVENDE comunicará la cancelación del
              pedido al VENDEDOR.</p>
              </ul>
              <br />

            <h4 style={{ fontWeight: '700' }}>8.2.13. Cancelación debido a un siniestro del Transportista: </h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>En caso de que la Empresa
              Transportista Contratada por COVENDE indique que durante el transporte los productos han
              sufrido daños o pérdidas, COVENDE procederá a cancelar el pedido correspondiente y notificará
              al VENDEDOR. No obstante, se considerará como una venta realizada a efectos de pago. En este
              caso se procederá a la activación del seguro por parte del TRANSPORTISTA, siempre y cuando que
              el despacho haya sido realizado por parte de COVENDE.</p>
              </ul>
            <br />
            </ul>
          </Typography>
          </ul>
        </ListItem>

        <ListItem>
          <h2 style={{ fontWeight: '1000' }}> 9. PROMOCIONES Y DESCUENTOS </h2><br />
          <Typography align='justify'>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>El VENDEDOR se compromete a hacer todo lo posible para participar en las promociones,
                concursos y descuentos que COVENDE ofrezca a los compradores. Para este propósito,
                COVENDE puede informar al VENDEDOR sobre las promociones y campañas de venta que
                lance, y el VENDEDOR puede optar por unirse a ellas, siempre y cuando se cumplan las
                condiciones establecidas previamente por ambas partes. Una vez que el VENDEDOR se haya
                unido a una campaña, no podrá retirarse de la misma.</li>
              <li>El VENDEDOR y COVENDE podrán acordar y negociar la existencia de promociones y
                descuentos exclusivos, en cuanto al precio de venta de los productos ofrecidos en el
                MARKETPLACE. Acerca de las promociones y descuentos ofrecidos, estos podrán ser asumidos
                de manera individual por el VENDEDOR o COVENDE, asimismo ambas partes podrán acordar
                asumir la responsabilidad de manera compartida.</li>
              <li>COVENDE cuenta con la facultad de ofrecer diferentes tipos de descuentos a los clientes que
                forman parte del MARKETPLACE (posibles COMPRADORES y clientes registrados), sin previo
                aviso al VENDEDOR. De presentarse esta situación, se entiende que el monto del descuento
                será asumido únicamente por COVENDE. Acerca de los descuentos, estos podrán ser ofrecidos
                sobre todos los productos de una sección, de una tienda, o sobre todos los ofrecidos en el
                MARKETPLACE.</li>
              <li>Existen 3 formas, según los términos y condiciones, en las que se pueden presentar los
                descuentos en la plataforma:<br /><br />
                <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                  <li>Por producto, con la finalidad de mantener igualdad con los descuentos ofrecidos por
                    otros vendedores, en los MARKETPLACE de la competencia.</li>
                  <li>Descuentos otorgados a través de cupones de descuentos.</li>
                  <li>Descuentos otorgados por COVENDE, para su plataforma a través de cualquier medio
                    de pago en toda la tienda, sección o categoría.</li>
                </ul>
              </li>
            </ul>
          </Typography>
        </ListItem><br />


        <ListItem>
          <h2 style={{ fontWeight: '1000' }}> 10. LIQUIDACIÓN Y FACTURACIÓN </h2>
          <br />
          <Typography align='justify'>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
              <li><strong>Periodicidad:</strong> La facturación se realizará con cortes quincenales, la primera quincena, que
                incluirá las ventas del día 1 a las 00 horas al día 15 a las 23.59 horas, que cumplan las
                condiciones y la segunda quincena, que incluirá las ventas del día 16 a las 00 horas al día
                28, 29, 30 o 31, según el mes, a las 23:59 horas. Asimismo, al término del periodo
                respectivo de facturación.</li>
              <li>
                <strong> Liquidación:</strong> COVENDE liquidará las cuentas pendientes de pago, teniendo en cuenta los
                plazos establecidos en el ciclo de facturación correspondiente. En dicha liquidación:
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Se añadirá en positivo el monto total correspondiente a los productos vendidos mediante
                    el MARKETPLACE durante el periodo de facturación liquidado. Los productos vendidos
                    deben cumplir con las dos condiciones: Producto recepcionado satisfactoriamente por el
                    comprador y con el plazo de devolución extinto.</li>
                  <li>Se deducirá las comisiones generadas por la venta de productos del VENDEDOR más IGV
                    y las tarifas adeudadas por el VENDEDOR.</li>
                  <li>Se deducirá el monto total correspondiente a los servicios contratados por el VENDEDOR
                    y prestados al mismo durante el periodo de facturación liquidado y el detalle de las
                    tarifas correspondientes.</li>
                  <li>Se deducirá, de ser el caso, el monto total correspondiente al consolidado de las
                    devoluciones de los productos, hechas por los compradores del VENDEDOR durante el
                    periodo de facturación liquidado y los cargos procedentes por devoluciones y
                    destrucción de productos.</li>
                  <li>Se deducirá, de ser el caso que los paquetes superen los límites establecidos, un cargo
                    adicional por exceso de envío. El cálculo de este costo adicional se basa en la diferencia
                    entre el peso real del paquete y el peso especificado en la plataforma. de la siguiente
                    manera:<br />
                    <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                    - (Costo exceso de envío = Peso dimensional real del paquete – Peso dimensional
                    del paquete especificado en la plataforma).</ul></li><br />
                  <li>Se deducirá, de ser el caso, cualquiera de los cobros extraordinarios estipulados en la
                    cláusula 9.2</li>
                  <li>Se añade y se deduce el monto total por el servicio de envío, de ser el caso que el servicio
                    de entrega sea realizado por el transportista contratado por COVENDE. Este monto figura
                    en el balance como ingreso y salida porque no es depositado al VENDEDOR. Sin embargo,
                    el VENDEDOR es responsable de facturar cada pedido incluyendo el valor del servicio de
                    envío de cada producto.</li>
                  <li> <strong>Facturación:</strong> COVENDE hace un balance a través de la plataforma en donde se suma el
                    valor total por los productos vendidos exitosamente y a ello se le deduce las comisiones
                    y todos los gastos en los que haya incurrido el VENDEDOR en dicho periodo. Dicho
                    balance figurará en la plataforma en la pestaña “ Ingresos” donde podrá visualizar
                    ingresos, devoluciones, cancelaciones, excesos de envío y el saldo anterior. Para una
                    visión más detallada, el VENDEDOR podrá acceder al “Detalle de Transacciones”. Aquí
                    encontrará información específica como la fecha del depósito, el ID del pedido, Precios,
                    Comisiones, Exceso de envío, Descuentos y el total a depositar. Además, desde la
                    interfaz, tendrá la opción de descargar la factura electrónica emitida por COVENDE.</li>
                  <li>COVENDE emitirá una factura al VENDEDOR a través de la PLATAFORMA, que respalde
                    todas las operaciones que sean debitadas al VENDEDOR en el periodo correspondiente,
                    el VENDEDOR podrá visualizar el detalle de dicho monto facturado en sus
                    “Movimientos”. Adicional a ello, COVENDE adicionará en su factura el monto por el
                    servicio de entrega en caso de que el delivery este a cargo de los transportistas
                    contratados por COVENDE. Una vez generada la factura al VENDEDOR, COVENDE tiene
                    hasta 5 días hábiles para efectuar el pago al VENDEDOR correspondiente al ciclo
                    indicado.</li>
                </ul>
              </li>
            </ol>
          </Typography>
        </ListItem><br />

        <ListItem>
          <h2 style={{ fontWeight: '1000' }}> 11. TRANSPORTE DE PRODUCTOS VENDIDOS EN COVENDE </h2>
          <br />
          <Typography align='justify'>
            <p>
              El VENDEDOR reconoce y acepta que COVENDE brinda la SOLUCIÓN COVENDE bajo la modalidad
              conocida como "Drop-Shipping". En virtud de esta modalidad, COVENDE facilita al VENDEDOR el
              transportista para poder entregar los productos comprados.
            </p><br />
            <p>
              En ese sentido, COVENDE cuenta con una relación contractual con las siguientes empresas de
              transporte de mercancías (en adelante, el “TRANSPORTISTA”): OLVA COURIER S.A.C, SCHARFF
              LOGISTICA INTEGRADA S.A y 99 MINUTOS PERU S.A.C.; COVENDE prestará al VENDEDOR el servicio
              de entrega de los pedidos a los compradores con los TRANSPORTISTAS mencionados anteriormente.
              Cabe resaltar que, el MARKETPLACE ofrece múltiples opciones de transportistas al COMPRADOR para
              que elija la mejor opción basándose en el precio y tiempo de entrega que le conviene.
            </p><br />
            <p>
              En caso que las dos partes lleguen a un acuerdo por escrito, el VENDEDOR podrá usar una empresa
              de transporte diferente a las Empresas Contratadas por COVENDE, en dicho caso COVENDE no será
              responsable por los daños o siniestros que se presenten durante el transporte de los productos hasta
              su destino. Asimismo, deberá informar a COVENDE sobre la entrega del producto dentro de las
              veinticuatro (24) horas posteriores al despacho, deberá proporcionar el número de guía del envío y
              mantener a COVENDE informado sobre el estado del envío de manera regular. Además, si el
              VENDEDOR opta por utilizar una empresa de transporte distinta, será responsabilidad del VENDEDOR
              contratar un seguro que cubra los riesgos asociados a los productos enviados a los compradores. El
              VENDEDOR deberá lidiar directamente con el asegurador y/o la empresa de transporte en caso de
              siniestros o situaciones relacionadas con la póliza y/o el envío de los productos. También deberá
              demostrar a COVENDE que cuenta con dicha póliza de seguro.
            </p><br />
            <p>El VENDEDOR es responsable de realizar la entrega del producto correctamente embalado y rotulado,
              evitando así cualquier deterioro del paquete por un mal embalaje que puedan causar daños en el
              producto. La responsabilidad por la pérdida de los Productos recae en el VENDEDOR hasta que sean
              entregados al TRANSPORTISTA, siempre y cuando sea una de las empresas de transporte contratadas
              por COVENDE. En caso contrario, el VENDEDOR asumirá la responsabilidad total del producto hasta
              su entrega al COMPRADOR.</p>
          </Typography>
        </ListItem><br />

        <ListItem>
          <h2 style={{ fontWeight: '1000' }}> 12. RESPONSABILIDAD SOBRE PRODUCTOS Y RETIROS MASIVOS </h2>
          <br />
          <Typography align='justify'>
            <p>
              En el caso de que exista productos sobre los cuales se hayan emitido comunicados o avisos de
              advertencia de seguridad y ello involucre planes o medidas de retiro, ya sea por el fabricante o
              distribuidor, o por alguna medida Gubernamental, el VENDEDOR acepta que estos productos no se
              publicarán o serán vendidos en COVENDE. En tal sentido, se tendrá en cuenta, los avisos o alertas
              emitidos por los siguientes:
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Fabricante o distribuidor del producto.</li>
                <li>Autoridades del Gobierno Peruano.</li>
                <li>Autoridades de protección al consumidor.</li>
                <li>Autoridades encargadas de vigilar la calidad y condiciones de seguridad de productos
                  eléctricos o electrónicos, según cada territorio.</li>
                  </ul>
              </ul>
            </p>
            <br />
            <p>
              En cuanto COVENDE tenga conocimiento de la existencia de la advertencia de seguridad antes
              indicada o alguna similar, realizará el siguiente procedimiento:
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Eliminación o suspensión de los productos mencionados en dicha advertencia, lo cual
                  podríaser de manera temporal o definitiva, según lo que COVENDE crea conveniente a
                  criterio propio.</li>
                <li>COVENDE podrá cancelar las órdenes que estén en curso de envío de aquellos productos
                  afectados, y del mismo modo tendrá que efectuar la devolución de los importes
                  recaudados de los mismos a los clientes, con cargo al VENDEDOR.</li>
                  </ul>
              </ul>
            </p>
          </Typography>
        </ListItem><br />

        <ListItem>
          <h2 style={{ fontWeight: '1000' }}> 13. ÍNDICES DE CALIDAD DE SERVICIO </h2>
          <br />
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <Typography align='justify'>
            <h4 style={{ fontWeight: '800' }}>13.1 Niveles de servicio esperados en términos de disponibilidad del Producto</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR se compromete a respetar las siguientes tasas que mide su desempeño como
              VENDEDOR:</p><br />
              <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
                Indice de aceptacion de pedidos igual o superior al 97,5% calculada de la siguiente manera:
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <p style={{ paddingLeft: '20px' }}> <strong> - INDICE DE ACEPTACIÓN DE PEDIDOS </strong> = Número total de Productos pedidos por
                  los Compradores y aceptados por el VENDEDOR) / número total de Productos
                  transmitidos para su aceptación al VENDEDOR por COVENDE] x 100</p> <br />
                  <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <p>Esta tasa se calcula con la actividad de los últimos treinta (30) días.</p><br />
                <p>Sin respuesta del VENDEDOR en el plazo de dos días desde la transmisión del pedido
                  a través de la PLATAFORMA, éste queda automáticamente cancelado, lo que
                  deteriora en consecuencia el citado índice de aceptación.</p><br />
                  </ul>
                  </ul>
              </li>
              <li>
                Indice de envío de productos igual o superior al 97,5% calculada de la siguiente manera:
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <p style={{ paddingLeft: '20px' }}> <strong> - INDICE DE ENVÍO DE PRODUCTOS </strong> = [número total de Productos enviados por el
                  VENDEDOR / número total de productos aceptados por el VENDEDOR en
                  COVENDE)] x 100</p> <br />
                  <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <p>Esta tasa se calcula con la actividad de los últimos treinta (30) días.</p><br />
                <p>Tras la validación del pedido por parte del Comprador y sin información sobre el
                  envío del Producto por parte del VENDEDOR dentro del tiempo máximo de
                  preparación anunciado por el VENDEDOR, el pedido será automáticamente
                  cancelado, lo que deteriora la tasa de dicho envío.</p><br />
                  </ul>
                  </ul>
              </li>
              </ul>
              </ul>
            </ul>

            <h4 style={{ fontWeight: '800' }}>13.2 Niveles de servicio esperados en términos de entrega</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>Los dos índices mencionados en (i) y (ii) son distintas y se aplican de manera independiente:</p><br />
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR se obliga a respetar:</p> <br />
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>

            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
                <p>El Índice de cumplimiento de los tiempos de preparación de los pedidos igual o superior
                  al 96% calculado de la siguiente manera:</p><br />
                <p style={{ paddingLeft: '20px' }}> <strong> - INDICE DE CUMPLIMIENTO DE TIEMPOS DE PREPARACIÓN DE PEDIDO </strong> = [Total
                  de pedidos enviados dentro del plazo máximo de preparación anunciado por el VENDEDOR a COVENDE / (Total de pedidos enviados + total de pedidos no
                  enviados porque se superó el plazo de preparación de pedido anunciado por el
                  VENDEDOR a COVENDE)] x100</p> <br />

              </li>
              <li>
                <p> El índice de Entrega dentro del plazo máximo indicado igual o superior al 94% calculada de la
                  siguiente manera, para paquetes enviados con seguimiento: </p><br />
                <p style={{ paddingLeft: '20px' }}> <strong> - INDICE DE ENTREGA DENTRO DEL PLAZO MÁXIMO </strong> = [Número total de paquetes
                  entregados a tiempo (en comparación con la promesa de entrega máxima)
                  /Número total de paquetes enviados] x100</p> <br />
                  <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <p>El índice de envío calculada anteriormente se basa en paquetes enviados en
                  modo de seguimiento, cuyo seguimiento debe ser completado por el
                  VENDEDOR.</p>
                  </ul>
                  <br />

              </li>
              </ul>
              </ul>
              </ul>
            </ul>

            <h4 style={{ fontWeight: '800' }}>13.3 Modalidad de envío Express</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>COVENDE se reserva el derecho de retirar la modalidad de envío Express al VENDEDOR, si
              éste no respeta el siguiente indicador:</p><br />


            <p style={{ paddingLeft: '20px' }}> <strong> - INDICE DE ENVÍO EXPRESS EN EL PLAZO MÁXIMO INDICADO</strong> , igual o superior al 94%:
              [Número total de paquetes entregados por Express a tiempo (en comparación
              con la promesa de entrega máxima/Número total de paquetes entregados por
              Express) x100</p> 
              </ul>
              <br />



            <h4 style={{ fontWeight: '800' }}>13.4 Niveles de servicio esperados en términos de reclamos</h4>
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>El VENDEDOR se compromete a respetar una tasa máxima de "pedidos con reclamos" realizados
              en la PLATAFORMA igual o inferior al 1% calculado de la siguiente manera:</p><br />
              <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <p>[Número total de pedidos con reclamos registrados en contra del VENDEDOR / el número total
              de pedidos aceptados por el Usuario] x 100.</p><br />
            <p>Nota: “Reclamo” significa únicamente en los siguientes casos:</p><br />
            <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>

            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>
                La manifestación expresa de insatisfacción por parte de un COMPRADOR después de que el
                VENDEDOR haya dado respuesta a su reclamo; o
              </li>
              <li>
                La falta de respuesta del VENDEDOR al Comprador dentro del plazo establecido en el presente
                a raíz de una reclamación del COMPRADOR al VENDEDOR. En consecuencia, las solicitudes de
                los COMPRADORES relativas a un error en la referencia del Producto entregado, a la falta de
                un Producto o accesorio, a un Producto que no se ajusta a su descripción, a un Producto
                defectuoso, a un Producto que no ha sido enviado, a un pedido que ha sido enviado, pero no
                recibido por el COMPRADOR, un Producto dañado, etc., solo se incluirán en las tarifas de
                reclamación en los casos mencionados anteriormente. Además, las solicitudes de los
                COMPRADORES relacionadas con: una solicitud de información sobre el Producto, o una
                solicitud de factura, se incluirán en el cálculo de la tasa de quejas a partir de un recordatorio
                del COMPRADOR o la determinación de la PLATAFORMA de la falta de respuesta del
                VENDEDOR en el plazo fijado de acuerdo con las presentes condiciones
              </li>
              </ul>
            </ul>
            </ul>
            </ul>

          </Typography>
          </ul>
        </ListItem><br />


        <h2 style={{ fontWeight: '1000' }}> 14. DESPACHOS </h2><br />
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <h4 style={{ fontWeight: '800' }}>14.1 Despacho por parte de COVENDE</h4>
        <Typography align='justify'>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>

          <p>El VENDEDOR gestionará sus pedidos en la PLATAFORMA dirigiéndose a la sección “Pedidos”,
            donde podrá visualizar y/o exportar en Excel la lista de pedidos pendientes de atender. Cabe
            resaltar que, el VENDEDOR deberá respetar el plazo de preparación del pedido estipulado por el
            mismo al momento de cargar sus productos. Asimismo, El plazo máximo de entrega varía de
            acuerdo al tiempo de preparación del paquete y el plazo determinado por el transportista.</p><br />
          <p>Los pedidos, por su naturaleza del ciclo de entregas, podrán mantener los siguientes estados:</p><br />
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li> <strong>Confirmado:</strong>  Es el pedido que ya pasó por el proceso de compra, culminando con el pago
              que se realizó de manera exitosa.</li>
            <li> <strong>Procesado:</strong> Es el pedido que después de ser confirmado, indica que el VENDEDOR ya
              tiene el paquete listo para ser recogido por el TRANSPORTISTA.
              que se realizó de manera exitosa.</li>
            <li> <strong>Enviado:</strong> El pedido fue recogido por el TRANSPORTISTA y está en camino a su destino.</li>
            <li> <strong>Completado:</strong>  Es el pedido que después de ser enviado, fue entregado y confirmado
              por el COMPRADOR.</li>
            <li> <strong>Cancelado:</strong>   El estado “Cancelado” figurará en dos casos:</li>
            <li> Si el comprador decide cancelar el pedido antes de su envío o entrega.</li>
            <li> Si el pedido se cancela automáticamente una vez que ha transcurrido el plazo
              predeterminado sin que se haya completado o enviado.</li>
            <li> <strong>Devuelto:</strong>  Este estado figurara únicamente si la devolución de pedido fue efectuada.</li>
            </ul>
          </ul><br />

          <p>En ese sentido, para poder atender exitosamente un pedido, el VENDEDOR puede hacerlo de
            manera individual como se indica a continuación:</p><br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>

            <li> El VENDEDOR recibirá la notificación del pedido por medio de la plataforma y correo
              electrónico, esta notificación llegará únicamente cuando el pedido esté en estado
              “confirmado”, es decir el pedido fue pagado.</li>
            <li>Para iniciar con el proceso de atención al pedido, el VENDEDOR deberá dar Click al icono
              del camión “procesar” y luego al botón “continuar”.</li>
            <li> Luego podrá visualizar la ventana con la siguiente información (ID del pedido, producto,
              dirección de recojo y transportista). El VENDEDOR deberá de darle Click al botón “procesar”
              para notificar el recojo del paquete al TRASPORTISTA.</li>
            <li> Es deber del VENDEDOR descargar la guía de envío que muestra la plataforma.</li>
            <li>Esta guía deberá ser impresa y colocada en la parte posterior de la caja, cabe recalcar que
              dicha guía debe de ser legible por el trasportista, se recomienda imprimir dos copias una
              de ellas será el cargo de entrega del paquete. </li>
              </ul>
          </ul><br />

          <p>Para poder atender exitosamente los pedidos, el VENDEDOR puede hacerlo de manera masiva
            como se indica a continuación:</p><br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>

            <li> El VENDEDOR recibirá la notificación del pedido por medio de la plataforma y correo
              electrónico, esta notificación llegará únicamente cuando el pedido esté en estado
              “confirmado”, es decir el pedido fue pagado.</li>
            <li>Para iniciar con el proceso de atención a los pedidos, el VENDEDOR primero deberá
              seleccionar los pedidos que atenderá, luego se deberá dirigir a “Acciones en lote” y
              seleccionar “Procesar” y después “continuar”.</li>
            <li> Luego podrá visualizar la ventana con la siguiente información de los pedidos (N.º, ID del
              pedido, producto, dirección de recojo y Courier). El VENDEDOR deberá de darle Click al
              botón “procesar” para notificar el recojo de los paquetes al TRASPORTISTA.</li>
            <li> Posteriormente se mostrará el detalle de los envíos donde se visualizará las guías de envío
              y N.º de tracking.</li>
            <li>Es deber del VENDEDOR descargar las guías de envío que muestra la plataforma.</li>
            <li> Estas guías deberán ser impresas y colocadas en la parte posterior de las cajas, cabe
              recalcar que estas guías deben de ser legible por el trasportista, se recomienda imprimir
              dos copias de cada guía ya que una de ellas será el cargo de entrega del paquete.</li>
              </ul>
          </ul><br />

          <p>El VENDEDOR puede verificar la fecha límite de despacho en la PLATAFORMA. Es responsabilidad
            del VENDEDOR tener la mercadería lista para su recolección y marcar el estado “Procesar” en la
            PLATAFORMA. El TRANSPORTISTA esperará un máximo de 10 minutos, y si la mercadería no está
            lista, se retirará y se notificará a COVENDE. El recojo solo se realizará en el primer piso. COVENDE
            informará al VENDEDOR sobre las visitas realizadas a través de correo electrónico.</p><br />
          <p>Es importante tener en cuenta que el TRANSPORTISTA no recogerá paquetes que tengan variaciones
            con respecto a la programación o que no hayan sido programados.</p><br />
          <p>En caso de que se haya programado el recojo de un paquete y el operador llegue al punto indicado
            cuando el envío no esté listo, no se encuentre al responsable o no haya nada para despachar, se
            considerará como un recojo falso y se cobrará una tarifa de acuerdo a cada operador logístico.</p><br />
          <p>La asignación de TRANSPORTISTA de recolección será predeterminada por el COMPRADOR dentro
            de la plataforma al momento de realizar la compra del producto. El servicio de recolección se
            ofrecerá según los criterios establecidos por COVENDE.</p><br />
          <p>En caso de que el VENDEDOR encuentre alguna incidencia al actualizar la información y no pueda
            cumplir con la obligación de "Procesar" su pedido, debe informarlo a través de la plataforma de
            COVENDE.</p><br />
          <p>El VENDEDOR es responsable del contenido y el comprobante tributario del Producto enviado.
            Asimismo, el VENDEDOR podrá solicitar la identificación del transportista funcionario antes de
            entregar los productos físicos y hacer que se selle la guía.</p><br />
          <p>El empaque y embalaje del producto es responsabilidad exclusiva del VENDEDOR. Cualquier daño o
            deterioro del producto debido a su embalaje será responsabilidad del VENDEDOR, y COVENDE no
            se hará responsable del valor del producto dañado. El VENDEDOR debe cumplir en todo momento
            con las recomendaciones de empaque y rotulado de COVENDE. Para los envíos de valor, el
            VENDEDOR siempre debe declarar el tipo de contenido y su valor al transportista.</p><br />


            <p> COVENDE se reserva el derecho de evaluar al VENDEDOR que tenga reincidencias en no realizar el
              despacho a tiempo cuando sean programados en la ruta de recolección. Si el pedido no es
              entregado al TRANSPORTISTA, este pedido pasará a ser cancelado. En caso de incidencia reiteradas
              la cuenta del VENDEDOR será bloqueada:</p><br />
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
            <li> <strong>1ra incidencia:</strong> Llamada de atención por correo electrónico (Correo automático)</li>
            <li><strong>2da incidencia:</strong> Suspensión temporal de la cuenta</li>
            <li><strong> 3ra incidencia:</strong> Suspensión PERMANENTE.</li>
           </ul>
          </ul><br />

          <p>El tiempo de evaluación para las cuentas será quincenalmente. Las incidencias no son
            acumulables semana a semana por lo que cada lunes el VENDEDOR iniciará el día con 0
            incidencias.</p><br />
          <p>En caso de que los productos sean recogidos por un TRANSPORTISTA autorizado por
            COVENDE, es responsabilidad total del VENDEDOR cumplir con lo siguiente según el
            TRANSPORTISTA que el comprador elija:</p>
            </ul>
            <br />
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <h4 style={{ fontWeight: '700' }}>14.1.1 OLVA COURIER S.A.C.</h4>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <ol style={{ listStyleType: 'upper-alpha', paddingLeft: '20px' }}>
            <li>
              <strong> MODALIDADES DE ENTREGA</strong>
              <p>OLVA ofrece un servicio de entrega puerta a puerta. El paquete se recoge en la dirección
                proporcionada por el VENDEDOR. Luego, se entrega en el domicilio o dirección
                proporcionada por el COMPRADOR. El transporte se realiza por tierra y aire.</p>
            </li><br />
            <li>
              <strong> PROGRAMACIÓN (RECOJO Y ENTREGA)</strong>
              <p>La programación del recojo por el TRANSPORTISTA se debe realizar un día antes hasta las
                5:30 PM. Se recomienda tomar las precauciones necesarias y realizarlo con la mayor
                antelación posible. Si por diversos motivos la programación cae un día previo a un día
                laborable, se comunicará a través de la plataforma el día y hora de recojo.</p><br />
              <p>El horario de recolección es de lunes a viernes, de 09:00 AM a 05:00 PM, y los sábados de
                09:00 AM a 12:00 M. Se debe tener en cuenta que no se realizan recojos los domingos ni
                feriados. COVENDE programará la recolección al día siguiente de la asignación de este
                estatus, considerando que la programación del recojo se realizará un día antes. Hasta las
                5:30 PM.</p>
            </li><br />
            <li>
              <strong> PAQUETERIA </strong>
              <p>El paquete debe de estar correctamente embalado no tener signos de deterioro o un
                empaque incorrecto para ser entregado al personal de OLVA, todo envío debe estar
                correctamente rotulado. Los artículos que sean frágiles deberán ser declarados y
                embalados adecuadamente considerando el manual de embalaje.</p>
            </li><br />
            <li>
              <strong> ALCANCE </strong>
              <p>OLVA ofrece un servicio con cobertura nacional, cubriendo así 1832 distritos. Esto significa
                que Olva Courier puede entregar paquetes a cualquier lugar del Perú. La empresa cuenta
                con una amplia red de agencias y puntos de atención distribuidos en todo el país, lo que
                garantiza que los paquetes lleguen a su destino de manera rápida y segura.</p>
            </li><br />
            <li>
              <strong> SEGURO </strong>
              <p>Si el envío tiene un valor comercial a partir de S/ 101 (ciento un con 00/100 soles) deberá
                asegurarse pagando el valor de seguro 0.6% del valor del bien declarado adicional a la tarifa
                por el flete.<br />
                Si el envío tiene un valor comercial a partir de S/ 3,001 (tres mil un con 00/1 soles) deberá
                asegurarse pagando el valor de seguro 2% del valor del bien declarado adicional a la tarifa
                por el flete.<br /><br />
                Recuerde que el seguro cubre el 90 % del valor del paquete.</p>
            </li>
          </ol><br />
          </ul>
          <h4 style={{ fontWeight: '700' }}>14.1.2 SCHARFF LOGISTICA INTEGRADA S.A.</h4><br />
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <ol style={{ listStyleType: 'upper-alpha', paddingLeft: '20px' }}>
            <li>
              <strong> MODALIDADES DE ENTREGA</strong><br /><br />
              <p>La modalidad de entrega que ofrece Sharff son envíos programados</p><br />
              <p>Next Day: El servicio de Nextday se encarga de realizar entregas dentro de las 24 horas o 72
                horas aproximadamente.</p>
            </li><br />
            <li>
              <strong> PROGRAMACIÓN (RECOJO Y ENTREGA)</strong>

              <TablaPersonalizada contenidoCeldas={contenidoCeldas1} />

              <p>Cabe recalcar que Scharff no labora domingos ni feriados.</p><br />
            </li>

            <li>
              <strong> PAQUETERIA</strong><br /><br />
              <p>El paquete debe de estar correctamente embalado, no tener signos de deterioro o un
                empaque incorrecto para ser entregado al personal de Scharff, dentro del paquete debe
                contener la boleta o factura, el producto y (opcional) el manual de uso.</p>
            </li><br />
            <li>
              <strong> ALCANCE </strong><br /><br />
                Scharff cuenta con una cobertura tanto en Lima, como:
                <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li><strong>LIMA URBANA:</strong> Barranco, Miraflores, Surco, San Borja, Surquillo, San Isidro,
                  Chorrillos.</li>
                <li><strong>LIMA PERIFÉRICO: </strong> Callao, Cercado de Lima, San Martin de Porres, Rímac, San
                  Juan de Lurigancho, El Agustino, Ate, Santa Anita y La Victoria.</li>
                <li><strong>LIMA SUR: </strong> San Juan de Miraflores, Villa María del Triunfo, Villa El Salvador,
                  Pachacamac, Lurín, Punta Hermosa, Punta Negra, San Bartolo, Santa María y
                  Pucusana.</li> <br />
                  </ul>
              </ul>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                Scharff también tiene cobertura en Departamentos como:
                <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <li> Amazonas, Ancash, Apurímac, Ayacucho, Cajamarca, Cusco, Huancavelica,
                  Huánuco, Ica, Junín, La Libertad, Lambayeque, Loreto, Madre de Dios,
                  Moquegua, Pasco, Juliaca, San Martín, Tacna, Tumbes, Ucayali. </li> </ul>
                  </ul>
            </li><br />

            <li>
              <strong> SEGURO </strong>
              <p>Todos los montos de envío de Scharff vienen incluido con un seguro, este seguro
                cubre la totalidad de monto del paquete o producto recibido.<br />
                La póliza de transporte cubre hasta un monto máximo de S/ 50.000 (cincuenta mil
                soles) para camiones y un monto máximo de S/ 15.000 (Quince mil soles) para
                motos, en caso de que el valor de los productos exceda estas cantidades, se tendrá
                que agregar un seguro extra según el valor del producto que será agregado por
                parte de Scharff al comprador.</p><br />
              <p>Cabe recalcar que todos los seguros se activan de forma automática desde el
                momento en el que el paquete fue entregado al personal de Scharff.</p>
            </li>
          </ol> 
          </ul><br />
          
          <h4 style={{ fontWeight: '700' }}>14.1.3 99 MINUTOS PERU S.A.C</h4><br />
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <ol style={{ listStyleType: 'upper-alpha', paddingLeft: '20px' }}>
            <li>
              <strong> MODALIDADES DE ENTREGA</strong><br />
              <p>SameDay: El servicio de Sameday se encarga de realizar entregas de paquetes el mismo día
                de haberse generado el pedido para la Zona 1, que se detalla en el apartado C.4</p><br />
              <p>Next day: El servicio de Nextday se encarga de realizar entregas de paquetes en la Zona 1,2.</p><br />
              <p>Next day 48 hrs: El servicio de Nextday se encarga de realizar entregas de paquetes en
                máximo 48 horas en zonas 3,4.</p>
            </li><br />

            <li>
              <strong> PROGRAMACIÓN (RECOJO Y ENTREGA)</strong>

              <TablaPersonalizada contenidoCeldas={contenidoCeldas2} />


            </li>

            <li>
              <strong> PAQUETERIA</strong>
              <p>Los paquetes deben estar empaquetados correctamente y no mostrar signos de deterioro
                o embalaje incorrecto antes de que puedan entregarse al personal.</p>
            </li><br />
            <li>
              <strong> ALCANCE </strong><br />
                Cuenta con una cobertura en lima la cual se divide en cuatro zonas:<br />
                <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li><strong>ZONA 1: </strong> Barranco, Jesús María, La Victoria, Lince, Magdalena del Mar, Miraflores,
                  San Borja, San Isidro, San Luis, Santiago de Surco, Surquillo, Pueblo Libre</li>
                <li><strong>ZONA 2:  </strong> CERCADO Lima, El Agustino, Independencia, La Molina, Los Olivos, Rímac,
                  San Juan de Lurigancho, San Juan de Miraflores, San Martín de Porres, San Miguel,
                  Santa Anita, Villa el Salvador, Villa María del Triunfo, Callao, La Perla, Breña,
                  Chorrillos.</li>
                <li><strong>ZONA 3: </strong> Ancón, Carabayllo, Chaclacayo, Cieneguilla, Comas, Lurigancho, Lurín,
                  Pachacámac, Puente Piedra, Punta Hermosa, Santa Rosa, La Punta, Ventanilla,
                  Carmen de la legua Reynoso, Bellavista, Mi Perú.</li>
                <li><strong>ZONA 4: </strong> Punta Negra, San Bartolo, Santa María del Mar, Pucusana</li>
                </ul>
              </ul>
            </li><br />

            <li>
              <strong> SEGURO </strong>
              <p>En el caso que se transporten productos cuyo valor sea mayor a S/ 1,000 en los servicios
                Same day o Programado, se debe considerar un 2% del valor del producto adicional a las
                tarifas de delivery acordadas por concepto de seguro.</p><br />
              <p>La póliza de transporte cubre hasta $70,000.00 y en caso se necesite activar, se podrá
                realizar siempre y cuando nos hagan llegar los siguientes requisitos:
              </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Guía de remisión remitente </li>
                <li> Factura comercial u otro documento que sustente el valor costo de los bienes y los
                  valores indicados en el Detalle Valorizado.</li>
                <li> Detalle valorizado de los bienes robados en Excel</li>
                <li> Detalle valorizado de los bienes robados en Excel</li>
                <li>Carta de reclamo al asegurado por el propietario de los bienes afectados</li>
                </ul>
              </ul><br />
              <p>Si no cuenta con alguno de estos documentos mencionados NO se podrá activar el seguro.</p>
            </li>
          </ol>
          </ul>
          </ul><br />

          <h4 style={{ fontWeight: '800' }}>14.2 Despachos truncos (No entregados):</h4>
          <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
          <p>Se considera a los pedidos que no han sido entregados exitosamente al COMPRADOR,
            debido a intentos fallidos de entrega.</p><br />
          <p>COVENDE llevará a cabo el proceso de devolución de los pedidos con fallo en la entrega de
            la siguiente manera: los pedidos serán enviados a la dirección registrada en la PLATAFORMA
            como la dirección del almacén. Si no se logra concretar la devolución por responsabilidad
            del VENDEDOR, COVENDE notificará al VENDEDOR al día siguiente de la visita (a través de
            correo electrónico registrado en la PLATAFORMA). En dicha notificación, se instruirá al
            VENDEDOR a recibir los pedidos en su almacén. Se realizarán un máximo de dos (02)
            intentos de entrega, incluyendo la visita previa a la notificación. En caso de agotarse el
            máximo de intentos de entrega el VENDEDOR deberá recoger su paquete en las
            instalaciones del transportista en un plazo máximo de 10 días calendario, luego de ello, se
            procederá a declarar los productos como abandonados y no se realizará el pago
            correspondiente a dichos productos, ya que se consideran cancelados en la PLATAFORMA y
            abandonados, tal como se advirtió en las comunicaciones previas de aviso a desechar el
            paquete. Asimismo, es responsabilidad directa del VENDEDOR informar oportunamente
            sobre cualquier cambio de su información en la PLATAFORMA.</p><br />
          <p>Asimismo, el VENDEDOR no debe aceptar una devolución del producto por fallo en la
            entrega si el producto está en mal estado, dañado o muestra signos de manipulación
            incorrecta. En tales casos, el VENDEDOR debe rechazar la entrega del producto e informarlo
            inmediatamente a COVENDE; de lo contrario, COVENDE no se hará responsable de la
            devolución.</p><br />
          <p>A partir del momento en que el VENDEDOR entregue el pedido al TRANSPORTISTA asignado,
            si se presenta un caso de entrega fallida, los plazos para la devolución del producto por
            parte del TRANSPORTISTA al VENDEDOR son los siguientes: Devolución en Lima: Hasta 15
            días calendario y devolución en provincias: Hasta 30 días calendario.</p>
            </ul>
            <br />
           
          <h4 style={{ fontWeight: '800' }}>14.3 Despacho por parte del VENDEDOR</h4>
          <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
          <p>En el caso de que los pedidos no sean enviados a través de un TRANSPORTISTA contratado
            por COVENDE, el VENDEDOR deberá utilizar una empresa de transporte que incluya seguro
            de mercancías bajo su responsabilidad para las entregas en Lima y Provincia.</p><br />
          <p>La entrega directa del VENDEDOR solo aplica cuando haya un acuerdo expreso y firmado
            por ambas partes en las que COVENDE autoriza al VENDEDOR a realizar sus despachos por
            sus propios medios, este servicio está dirigido principalmente para aquellos VENDEDORES
            que sean fabricantes o cuyos productos no puedan ser recolectados por COVENDE.</p><br />
          <p>El costo de envío para las entregas en Lima y/o Provincia será asumido por el comprador
            según la tarifa que especifique el VENDEDOR, al momento de rellenar el formulario de
            solicitud de su operador logístico en cuyo caso COVENDE abonará al VENDEDOR el costo de
            envío.</p><br />
          <p>En caso de que el VENDEDOR fabrique productos a gran escala y sobre pedido, el
            VENDEDOR es responsable de comunicar a COVENDE el tiempo de fabricación para una
            asignación adecuada del tiempo de entrega.</p><br />
          <p>El VENDEDOR es responsable de cambiar el estado presionando el botón “Procesar” en la
            PLATAFORMA. COVENDE se reserva el derecho de cancelar la orden si no ha sido procesada
            dentro del plazo definido por el VENDEDOR.</p><br />
          <p>El VENDEDOR deberá comunicar a COVENDE cualquier incidencia en la atención del pedido.</p><br />
          <p>COVENDE requiere que el VENDEDOR comunique a diario, antes de las 10:00 AM, al correo
            info@covende.com las pruebas de las entregas de pedidos realizadas el día anterior,
            adjuntando las fotografías y/o la "Guía de entrega" firmada por el VENDEDOR y el
            COMPRADOR. COVENDE se reserva el derecho de cancelar el pedido si el VENDEDOR no
            envía la información dentro de las 24 horas posteriores al vencimiento del pedido.</p><br />
          <p>En caso de que el VENDEDOR deba ponerse en contacto directo con el COMPRADOR, la
            comunicación debe estar orientada únicamente a garantizar la entrega del pedido o
            coordinar la devolución. Queda expresamente prohibido al VENDEDOR solicitar o acordar
            con el COMPRADOR cambios de fecha, postergaciones de entrega o cobros adicionales. El
            VENDEDOR es responsable de entregar el o los productos junto con la Boleta o Factura
            impresa.</p><br />
          <p>El VENDEDOR es responsable de garantizar que el o los productos lleguen al COMPRADOR
            dentro del plazo máximo establecido por el VENDEDOR al momento de cargar sus
            productos. El incumplimiento reiterado de esta disposición dará a COVENDE la facultad de
            ejecutar sanciones y/o poner fin a la relación con el VENDEDOR sin ninguna responsabilidad.</p><br />
          <p>El costo del envío será determinado por COVENDE en función de los tarifarios que
            previamente fue proporcionado por el VENDEDOR a menos que ambas partes acuerden
            previamente que el VENDEDOR asuma dicho costo.</p><br />
          <p>Si el VENDEDOR no cumple con lo anteriormente mencionado, COVENDE tendrá el derecho
            de cancelar el pedido correspondiente. En tal caso, COVENDE procederá a reembolsar el
            dinero recibido del comprador dentro de un plazo de diez (10) días hábiles. Sin embargo,
            COVENDE deducirá la comisión establecida por la prestación de sus servicios en la siguiente
            transferencia de dinero realizada al VENDEDOR, o la cobrará directamente al VENDEDOR, a
            su entera discreción.</p><br />
            </ul>
        </Typography>
        </ul>


        
        <h2 style={{ fontWeight: '1000' }}> 15. CAMBIOS Y DEVOLUCIONES </h2>



        <Typography align='justify'>
          <p>El VENDEDOR será responsable de administrar los cambios y/o devoluciones directamente con el
            COMPRADOR; en ese sentido, el VENDEDOR tiene la obligación de dar respuesta a través de la
            PLATAFORMA las reclamaciones, cambios, garantías y/o devoluciones en un plazo máximo de DOS
            (02) días hábiles. Para tal efecto, el VENDEDOR recibirá una notificación así como un correo
            electrónico. Tanto el VENDEDOR como COVENDE están comprometidos a cumplir con los
            procedimientos de envíos, cambios y Devoluciones, detallados en los presentes términos y
            condiciones. Cabe resaltar que, en caso de que no haya resolución de la controversia entre el
            COMPRADOR y el VENDEDOR, COVENDE pasará a intervenir para colaborar en la resolución</p><br />
          <h4 style={{ fontWeight: '800' }}>15.1 DEVOLUCIONES</h4>
          <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
          <p>El VENDEDOR es responsable de definir sus políticas de devolución al momento de cargar sus
            productos a la PLATAFORMA de manera individual, en ese sentido, debe elegir los motivos de
            devolución (debe marcar al menos 2 motivos de devolución de la lista). Asimismo, al realizar la
            carga masiva, los motivos de devolución se cargan de manera predeterminada por los siguientes
            motivos: Errores de fábrica y diferente a la descripción detallada</p><br />

          <p>El VENDEDOR se compromete a recibir y procesar las solicitudes de devolución que le sean
            notificadas a través de la PLATAFORMA y por correo electrónico en un plazo máximo de 2 días
            hábiles.</p><br />

          <p>COVENDE cobrará al VENDEDOR el costo de la logística inversa de productos que hagan sus clientes
            en el MARKETPLACE, independiente de las razones que tenga para hacerlo. Este monto se cobrará
            por hacer llegar el producto de regreso a su almacén. Cabe resaltar que, la responsabilidad sobre
            la información brindada en la FICHA DE PRODUCTO recae completamente en el VENDEDOR. Si no
            se proporcionan detalles como el uso, el idioma, la compatibilidad, el contenido de la caja
            (manuales y/o componentes), el plazo de garantía, las políticas de devolución, entre otros, se
            considerará en favor del comprador. Esta información debe ser clara, precisa y respetar el Código de
            Protección al Consumidor.</p><br />

          <p>A continuación, se detalla el proceso de Devolución:</p>
          <ol style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li ><strong>Solicitud de devolución:</strong> El comprador comunica su intención de devolución enviando la
              solicitud de devolución al VENDEDOR desde la interfaz de comprador. El VENDEDOR recibe
              una notificación en su interfaz. Y un correo electrónico en la cuenta registrada en COVENDE.</li>
            <li ><strong>Recepción de la solicitud de devolución:</strong> El VENDEDOR es responsable de revisar y atender la
              solicitud de devolución para aprobarla o rechazarla analizando la información remitida por el
              COMPRADOR. En ese sentido, el VENDEDOR validará si está “conforme con el producto
              devuelto” o “NO está conforme con el producto devuelto”.</li>
            <li ><strong>Revisión de la solicitud: Si la solicitud de devolución es APROBADA</strong> por el VENDEDOR, el
              comprador deberá ENVIAR el producto directamente al VENDEDOR de la siguiente manera:
              <ol style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <li>El comprador deberá asegurarse de que el producto se encuentre en las mismas
                  condiciones en las que se entregó el paquete y dentro del embalaje original.</li>
                <li>El comprador deberá imprimir la guía de devolución que deberá colocarse en el
                  paquete de forma visible.</li>
              </ol>
            </li>
            <li ><strong>Si la solicitud de devolución es RECHAZADA,</strong> se aperturará un chat donde el vendedor podrá
              presentar su descargo de los motivos de rechazo de la devolución, asimismo COVENDE
              monitoreará la interacción entre ambas partes. <br />
              Si el comprador queda conforme por el descargo presentado por el vendedor se dará por
              finalizado el proceso, en caso de que el comprador persista en que el motivo de rechazo no es
              el adecuado generando disconformidad, COVENDE podrá intervenir para intermediar.</li>
            <li ><strong>Envío del producto devuelto.</strong> En caso sea aprobada la solicitud de devolución, el COMPRADOR
              deberá entregar el producto correctamente empaquetado y etiquetado con la guía de
              devolución en la agencia Olva más cercana en el plazo máximo de 2 días hábiles.</li>
            <li ><strong>Recepción y revisión del producto devuelto: </strong>Una vez que el VENDEDOR recibe el producto,
              debe revisarlo para asegurarse de que está en buen estado. En ese sentido, se podrán
              presentar las siguientes situaciones:
              <ol style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <li>Si el producto devuelto está en buen estado, el VENDEDOR debe notificar que está
                  CONFORME con la devolución, en ese caso COVENDE procede a realizar el reembolso del
                  valor del producto devuelto, un ticket de recompra o generará un nuevo pedido. COVENDE
                  descontará el monto total del producto al VENDEDOR así como la comisión por la venta de
                  dicho producto.</li>
                <li><strong>Si el VENDEDOR rechaza la devolución por considerar que no cumple con las condiciones
                  establecidas, </strong>tendrá la posibilidad de abrir una disputa con el comprador donde deberá
                  especificar el motivo del rechazo. COVENDE se encargará de monitorear el intercambio de
                  mensajes y podrá intervenir en caso de que sea necesario. El VENDEDOR remitirá un
                  informe detallado a COVENDE a través de la PLATAFORMA en la opción "Devoluciones” en
                  donde adjuntará imágenes del producto y las razones del rechazo de la devolución.</li>
                COVENDE evaluará las razones expuestas en el informe y, si determina que los motivos de
                  rechazo no son válidos y que la devolución es procedente, descontará el monto total del
                  producto al VENDEDOR así como la comisión por la venta de dicho producto. Si COVENDE
                  determina que el rechazo de la devolución es válido y, por lo tanto, el retracto no es
                  aceptado, COVENDE solicitará al VENDEDOR que envíe el producto al almacén de
                  COVENDE junto con la documentación correspondiente, previa coordinación.
              </ol><br />


            </li>
            <p>Asimismo, las devoluciones tienen los siguientes estados:</p><br />
            <ol style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li><strong>En revisión: </strong>El VENDEDOR ha recibido la solicitud de devolución y está revisando si cumple
                con los requisitos establecidos.</li>
              <li><strong>Pendiente: </strong>La solicitud de devolución cumple con los requisitos establecidos y está pendiente
                de que el vendedor la acepte o rechace.</li>
              <li><strong>Aprobada: </strong> El VENDEDOR ha aceptado la devolución y el producto se ha enviado al almacén
                de COVENDE.</li>
              <li><strong>Enviada: </strong>El producto ha sido enviado al almacén de VENDEDOR.</li>
              <li><strong>Devuelta:  </strong>El producto ha sido recibido en el almacén de VENDEDOR.</li>
              <li><strong>Completada: </strong>El reembolso o el nuevo pedido ha sido procesado.</li>
              <li><strong>Anulada: </strong>La solicitud de devolución ha sido cancelada por el vendedor, el comprador o <strong> COVENDE.</strong></li>
              <li><strong>Rechazada: </strong>El VENDEDOR ha rechazado la devolución.</li>
              <li><strong>Cancelada: </strong>La devolución ha sido cancelada por el vendedor, el comprador o COVENDE.</li>
            </ol>
          </ol><br />

          <p>Si el VENDEDOR no informa a COVENDE si acepta o rechaza la devolución en un plazo de DOS (02)
            días hábiles después de recibir el producto, se entenderá que la devolución ha sido aceptada. En
            este caso, COVENDE, a su entera discreción, ofrecerá al comprador: (i) un cupón por el valor del
            producto para realizar una nueva compra en COVENDE, (ii) el reembolso del dinero o (iii) la
            reposición del producto. Posteriormente, COVENDE descontará el monto de esa venta al
            VENDEDOR. Si el producto tiene un valor mayor al ofrecido por el VENDEDOR en el MARKETPLACE,
            el VENDEDOR asumirá la diferencia en el precio del nuevo pedido.</p><br />
          <p>Si el retracto se debe a causas imputables al VENDEDOR, COVENDE podrá cobrar la comisión como
            cobro extraordinario según los establecido en la sección 9.2 de los Términos y Condiciones.</p><br />
          <p>El costo de traslado del producto desde la dirección del comprador hasta la ubicación del
            VENDEDOR se calculará en función del peso del producto (comparando peso seco vs peso
            volumétrico) y será asumido por el VENDEDOR, siempre que se cumplan los motivos mencionados
            anteriormente. Cabe resaltar que, los costos de devolución variarán de acuerdo al operador
            logístico:<br /><br />
            <ol style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li><strong>Olva Courier</strong><br />
                El monto que se cobrará por los servicios de logística inversa es el mismo que se cobró por el
                envío del paquete.
              </li><br />
              <li><strong>99 minutos</strong><br />
                El costo variara de acuerdo a la zona
                  <div>
                  <TablaPersonalizada contenidoCeldas={contenidoCeldas3} />
                  </div>
                </li>
              <li><strong>Scharff</strong>
              <p>El monto que se cobrará por los servicios de logística inversa es elmismo que se cobró por el 
                envío del paquete.</p><br />
              <p>Motivos para rechazar una devolución:</p><br />
              <ol style={{ listStyleType: 'square', paddingLeft: '20px' }}>
              <li> No se ajusta a las políticas de devolución estipulada por el VENDEDOR.</li>
              <li> Señales de uso o desgaste: Si el producto presenta suciedad, golpes, huellas, configuración, etc., 
                puede ser motivo de rechazo.</li>
              <li> Empaque original dañado: El empaque original del producto debe estar en buen estado o en las mismas 
                condiciones en las que fue recibido. No se aceptará un rechazo por no incluir un empaque genérico.</li>
              <li> Documentación incompleta: El comprobante de compra (boleta/factura) emitido electrónicamente no debe ser 
                devuelto por el comprador, según la Resolución de la Superintendencia Nacional N.º 097-2012/SUNAT. COVENDE 
                enviará el producto con una guía de Remisión del TRANSPORTISTA o de COVENDE al Vendedor, correctamente rotulada.</li>
                
                </ol>
                <br />
               <p> Las Partes acuerdan que las solicitudes de devoluciones podrán ser recibidas y atendidas a través
                de la misma PLATAFORMA, donde el comprador realizará una solicitud, y COVENDE actuará como
                intermediario. EL VENDEDOR debe seguir las indicaciones para aceptar el cambio y/o devolución
                de los productos.</p> 
                
              </li><br />
               
              <h4 style={{ fontWeight: '800' }}>15.2 CAMBIOS</h4>
              <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
              <p>En caso de que el COMPRADOR solicite la reposición de un producto dañado o equivocado, el
                 VENDEDOR podrá rechazar o aprobar dicha solicitud desde la interfaz de cambios y devoluciones.
                 El COMPRADOR podrá estar en contacto con el VENDEDOR para gestionar el cambio del producto.</p><br />
                </ul>
               <h4 style={{ fontWeight: '800' }}>15.3 CANCELACIONES</h4>
               <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
               <p>En caso de que se produzca una cancelación inmediata por parte del comprador, es decir, cuando
                  el VENDEDOR, aún no ha despachado el producto, se realizará una reversión en el sistema que no
                  ocasionará ninguna incidencia para el VENDEDOR.</p><br />
               <p>En caso de que el VENDEDOR cancele el pedido, después de que el producto ya fue entregado al
                  transportista, COVENDE se encargará de gestionar los cambios y/o devoluciones directamente con
                  el comprador, cuando corresponda.</p><br />
               <p>Después de una cancelación, si esta se debe a la responsabilidad del VENDEDOR, se aplicarán los
                  cobros extraordinarios detallados en la sección 9.2.</p>
                  </ul>
                  <br />

                <h4 style={{ fontWeight: '800' }}>15.4 GARANTÍA</h4>
                <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                <p>El VENDEDOR es responsable de proporcionar una garantía directa al comprador y debe indicarlo
                  en el campo "Garantía" de cada producto en su respectiva FICHA DE PRODUCTO. Esta garantía
                  entrará en vigencia a partir de la entrega del producto. En caso de que el VENDEDOR no especifique
                  el plazo de garantía en su FICHA DE PRODUCTO,se asumirá que cumple con los plazos mínimos de
                  garantías de SEIS (06) MESES indicados por COVENDE exclusivamente para las categorías de
                  Tecnología, Muebles, Electrodomésticos, Celulares, Relojes electrónicos, Línea blanca de
                  Artefactos, Computadoras, Laptos, Televisores y otros aparatos.</p>
                  </ul>
            </ol>
          </p>
          </ul>
        </Typography><br />

       <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 16. DECLARACIÓN DE PRÁCTICAS ÉTICAS DEL VENDEDOR </h2><br />
         <p>El VENDEDOR y sus empresas controladoras, filiales y subsidiarias, operadores y empleados,
            manifiestan trabajar acorde a los más estrictos principios de legalidad y honestidad consistentes en
            nunca ofrecer, pagar, solicitar o aceptar sobornos o participaciones de ninguna forma, sea directa o
            indirecta, ni participar en ningún tipo de actividad corrupta, ya sea de forma directa o a través de un
            tercero.</p>
        <p>En caso de ser sorprendido realizando cualquier actividad que vulnere el prestigio e imagen de
           COVENDE, éste podrá dar por terminada su relación con VENDEDORES, agentes, comisionistas o
           terceros que violen cualquiera de estos principios.</p>
           </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 17. LIBRE COMPETENCIA </h2><br />
        <p>COVENDE no tiene la potestad de subir, bajar ni descontar los precios de los productos que son
           propiedad del VENDEDOR en la plataforma COVENDE, ni tampoco podrá presentar propuestas o
           sugerencias de precio. El VENDEDOR cuenta con entera y absoluta responsabilidad de establecer y
           manejarsus precios, sin injerencia alguna.</p><br />
        <p>COVENDE conduce y lleva a cabo sus operaciones de conformidad a su propio criterio comercial y de
           manera independiente, evitando en todo momento incurrir en cualquier práctica anticompetitiva. En
           tal sentido, la relación entre COVENDE y el VENDEDOR, deberá ser estrictamente bilateral,sin que por
           ningún motivo exista intercambio de información sensible sobre terceros. Es por ello que el
           VENDEDOR no podrá en ningún caso, entregar ni solicitar a COVENDE ningún tipo de información
           referida a los competidores de COVENDE o de los competidores del VENDEDOR. De igual modo,
           COVENDE no podrá entregar nisolicitar al VENDEDOR información alguna referida a los competidores
           de dichos VENDEDORES o a los suyos.</p><br />
         <p>COVENDE garantiza al VENDEDOR que Covende.com, no aplicará reglas de preferencias subjetivas de
           aplicación individual o self-serving en la exhibición de los Productos, sino que la exhibición se
           determinará en función de reglas objetivas y no discriminatorias en base a criterios tales como la
           calidad de los Productos, la calificación de los VENDEDORES, el stock disponible, los tiempos de
           entrega y otros factores similares.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 18. FRAUDES EN MEDIOS DEPAGO </h2><br />
        <p>COVENDE asume el riesgo de fraudes realizados con tarjetas de crédito y/o débito; es decir, el valor
           de los pagos hechos con tarjetas clonadas, robadas, por personas no autorizadas o cualquier otra
           modalidad de fraude cometido con tarjetas de crédito y/o débito. Sin embargo, COVENDE recibirá los
           pagos realizados por los compradores sin responsabilidad de la procedencia que tengan los
           mismos, entendiendo que las operaciones y procedencia de pagos son en todo momento de
           procedencia lícita.</p>  
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 19. CLÁUSULAS DE CUMPLIMIENTO </h2><br />
        <ol style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <h4 style={{ fontWeight: '800' }}>19.1 Origen de ingresos y destinación de los recursos</h4>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
        <p>El VENDEDOR declara que sus recursos provienen de actividades lícitas y que están originados en
           el desarrollo de su objeto social, por lo tanto, los mismos no provienen de ninguna actividad ilícita.
           Igualmente declara que los recursos obtenidos con la ejecución del vínculo comercial establecido
           con COVENDE no serán destinados a la financiación del terrorismo y de actividades ilícitas. Además,
           acepta que cualquier contrato, acuerdo, o negocio celebrado con COVENDE podrá ser terminado
           por este último de forma unilateralsin lugar a indemnizaciones o reparaciones en caso de que quién
           suscribe o acepta las presentes cláusulas, así como, la entidad que representa, sus socios,
           accionistas, directores, administradores, empleados, aliados, agentes o contratistas, sean incluidos
           en listas internacionales vinculantes para Perú de conformidad con el derecho internacional (como
           las listas de las Naciones Unidas), en las listas de la Oficina de Control de Activos Extranjeros del
           Departamento del Tesoro de los Estados Unidos, sean involucrados en procesos administrativos o
           judiciales por conductas asociadas al lavado de activos y la financiación del terrorismo, o en hechos
           que generen impacto reputacional negativo en relación a estos riesgos. De igual manera será causal
           de terminación unilateral del vínculo por parte de COVENDE, así como de reparación e
           indemnización a favor de COVENDE por los perjuicios que se llegasen a causar, la comercialización
           a través de COVENDE de mercancía de contrabando. En consecuencia, responderá por todo daño
           y perjuicio que alguna de las anteriores circunstancias o la falsedad en estas declaraciones le sea
           generado a COVENDE. COVENDE podrá en cualquier momento solicitarle información sobre sus
           socios o accionistas beneficiarios finales o reales, que cuenten con un 5% o más de participación en
           el capital social. COVENDE declara igualmente que sus conductas se ajustan a la ley y que sus
           recursos provienen de fuentes lícitas asociadas al desarrollo de su objeto social. El VENDEDOR se
           obliga a mantener la custodia de todos aquellos documentos que acrediten el origen lícito de sus
           productos y entregarlos a COVENDE en caso de que así lo requiera.</p>
           </ul>
        </ol>
        </Typography><br />

        <Typography align = 'justify'>
          <h2 style={{ fontWeight: '1000' }}> 20. USOS PROHIBIDOS </h2><br />
          <p>Estas son las acciones que el <strong>VENDEDOR</strong> debe evitar realizar:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
         <li> Está prohibido emplear la PLATAFORMA con el fin de extraer información automatizada a
           través de bots, web crawler u otros mecanismos de extracción de información, diferentes a
           aquellos que <strong>COVENDE</strong> haya dispuesto para tales efectos.</li>
        <li>Actividades que se relacionen con la extracción o el intento de extracción sin autorización de
           datos personales de los COMPRADORES, elementos de identificación o de autenticación de
           medios empleados en elsitio de cualquier otra información que por naturaleza, no sea posible
           obtenersin previa autorización del Titular.</li>
        <li>El VENDEDOR evita realizar actividades que impliquen el empleo de procedimientos
            automatizados de extracción de información que sea relacionada al número de visitas,
           consultas u otra clase de actividades para la recuperación de información de manera intensiva.</li>
        <li>Empleando o no los medios de contacto existentes entre VENDEDORES y COMPRADORES
            provistos por COVENDE, para la posterior venta de productos fuera de la plataforma de
            COVENDE. Lo último incluye envío de promociones, descuentos, publicidad o cualquier tipo
            de comunicación en cualquier soporte y formato.</li>
        <li>Motivar a que los compradores cancelen o desistan de una compra, para que ellos puedan
            concretar ventas con ellos por mecanismos externos a COVENDE.</li>
        <li>Emplear la estrategia de incrementar los precios de sus productos en fechas previas a
            campañas de promociones, con el fin de ofrecer un aparente descuento ficticio.</li>
        <li>Dañar la reputación de otro VENDEDOR, sus productos o valoraciones que reciban,
            redactando reseñassobre sus propios productos o sobre productos de la competencia.</li>
        <li>Cometer cualquiertipo de infracción relativo a la competencia desleal.</li>
        </ul>
           </ul>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 21. PROTECCIÓN DEDERECHOS DEL COMPRADOR </h2><br />
        <p>El VENDEDOR tiene la obligación de contar con la disponibilidad (stock) de sus productos en la
           plataforma. En caso de que el COMPRADOR exija el cambio de un producto que sea similar en cuanto
           a características tales como talla, color, repuesto, piezas faltantes entre otros del producto anterior,
           se podrá dar la reposición por parte del VENDEDOR.</p><br />
        <p>Tanto el VENDEDOR como COVENDE garantizarán la protección de los derechos del COMPRADOR. De
           esta manera, ambas partes declaran que serán solidariamente responsables, si los derechos del
           COMPRADOR son vulnerados por acciones u omisiones de cualquiera de las partes, el COMPRADOR
           puede contactar a cualquiera de los involucrados y exigir el cumplimiento, así como proteger sus
           derechos de acuerdo con la normativa vigente enmateria de protección al COMPRADOR. Esta cláusula
           no autoriza al VENDEDOR incumplir sus obligaciones ni lo exime de responsabilidad directa, en cuyo
           caso asumirá toda la responsabilidad ante el COMPRADOR.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 22. PROTECCIÓN DE DATOS PERSONALES </h2><br />
        <ol style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <h4 style={{ fontWeight: '800' }}>22.1 Protección de datos personales del COMPRADOR</h4>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
        <p>En caso de acceder o recibir, datos personales del COMPRADOR por parte de COVENDE para dar
         paso al vínculo comercial, el VENDEDOR es responsable de la información personal con el cuidado
         y cumplimiento de la legislación que sea aplicable tanto al VENDEDOR como a COVENDE y el
         cumplimiento de acuerdos o contratos que refuercen el tratamiento de datos personales en virtud
         del vínculo comercial existente. En consecuencia, deberá adoptar las medidas administrativas y
         técnicas que protejan la confidencialidad, integridad y disponibilidad de la información personal a
         la que accede, obligándose a reparar e indemnizar a COVENDE por cualquier perjuicio que le
         genere dicho incumplimiento de la legislación aplicable en protección de datos personales, así
         como cualquier acción u omisión que derive en un tratamiento inadecuado de la información
         personal a la que accede con fines comerciales, prohibiendo tratar la información para fines
         adicionales a los que fueron designados y autorizados por COVENDE. Tratándose de VENDEDORES,
         estos aceptan que solo podrán tratar los datos proporcionados por COVENDE a través de sus
         plataformas, para prestar el servicio de forma idónea y eficiente. COVENDE podrá auditar el
         cumplimiento de las obligaciones en protección de datos personales por parte del VENDEDOR.</p>
         </ul>
         <br />

         <h4 style={{ fontWeight: '800' }}>22.2 Protección de datos personales del VENDEDOR</h4>
         <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
         <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>El VENDEDOR autoriza a COVENDE a tratar sus datos personales directamente o a través de
              terceros encargados de tratamiento, con las siguientes finalidades:</li>
           <li>Realizar actividades de analítica con el fin de entender el comportamiento del VENDEDOR y
               sus proyecciones a nivel de ventas, productos y otras cifras.</li>
           <li>Hacer partícipe al VENDEDOR de iniciativas de marketing tales como campañas promocionales
               por temporadas de sus productos en COVENDE, entre otras actividades comerciales con
               COVENDE.</li>
           <li>Contactar al VENDEDOR por medios electrónicos, incluyendo llamadas telefónicas, mensajería
               instantánea vía WhatsApp, correo electrónico, con el fin de gestionar trámites, atender
               solicitudes, peticiones, consultas y reclamos, ofrecer productos, bienes y servicios de
               COVENDE, entre otras comunicaciones pertinentes en el marco de la relación comercial
               establecida.</li>
            <li>Hacer consultas y cruces en bases de datos con vocación pública para la gestión de riesgos de
                lavado de activos, financiación del terrorismo, corrupción, entre otros asociados.</li>
            <li>El VENDEDOR autoriza a COVENDE o a quien en el futuro represente sus derechos, a consultar,
                reportar,solicitar y divulgar a cualquier tercero autorizado por la legislación y regulación local
                para administrar bases de datos con fines de información financiera y crediticia, toda la
                información referente a su comportamiento económico, comercial y crediticio, asociada al
                nacimiento, modificación o extinción de obligaciones. En consecuencia, COVENDE podrá
                consultar y reportar información de El VENDEDOR en las bases de datos mencionadas, en las
                cuales se verá reflejado su actual y pasado comportamiento en relación con el cumplimiento
                o incumplimiento de sus obligaciones, información que permanecerá durante el término
                establecido por la normativa vigente y aplicable en materia de protección de datos personales
                financieros y crediticios.</li>
            <li>El VENDEDOR declara que ha sido informado sobre la Política de Privacidad de COVENDE a la
                cual puede acceder a través del sitio web de COVENDE y para presentar reclamos sobre el
                manejo de sus datos personales y ejercer sus derechos sobre su información personal por la
                legislación vigente, puede acudir a rellenar un formulario que se encontrara en la parte
                posterior de la pestaña de “Políticas de Privacidad” en la plataforma con la información de la
                situación acontecida.</li>
            <li>El VENDEDOR declara que la información proporcionada a COVENDE es veraz, completa y
                actualizada, que quien acepta el presente clausulado ha obtenido las autorizaciones de sus
                representantes legales, así como, colaboradores para proporcionar sus datos personales a
                COVENDE para dar desarrollo a las finalidades informadas en este documento y que en
                consecuencia acepta responder ante COVENDE por todo perjuicio que le sea generado.</li>
                </ul>
         </ul>
        </ol>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 23. CONFIDENCIALIDAD</h2><br />
       <p>El VENDEDOR reconoce y acepta que la información que recibe sobre la SOLUCIÓN COVENDE, su
          diseño de marketing, campañas, promociones e información no conocida del público y otra
          información que le sea proporcionada por COVENDE bajo el carácter de confidencialidad, es
          información y propiedad confidencial de COVENDE. El VENDEDOR debe utilizar de manera razonable
          y exclusivamente dicha información para fines contenidos en estos términos y condiciones, y no podrá
          apropiársela, copiarla, utilizarla por fuera de la relación que mantiene con COVENDE, ni divulgarla en
          forma alguna. Dicha información incluye información financiera, comercial, virtual, técnica, métodos,
          información de compradores tales como son sus datos personales, entre otras. Si el VENDEDOR no
          cumple la obligación de confidencialidad aquí prevista, directa o indirectamente, será responsable
          por la totalidad de los daños y perjuicios que se le causen a COVENDE. Esta obligación vincula a
          directivos, empleados, contratistas y compañías subsidiarias y afiliadas del VENDEDOR y
          posteriormente a la terminación de este Contrato.</p>
       <p>En caso que COVENDE requiera la información confidencial del VENDEDOR por Autoridad
          administrativa o judicial competente, deberá notificar dicha situación al VENDEDOR, con el objetivo
          de que éste último esté en condiciones de apelar a su derecho como le convenga, incluyendo la
          obtención de una orden de protección adecuada, medida preventiva u otros recursos apropiados, a
          fin de evitar la divulgación de su Información Confidencial.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 24. LEY Y JURISDICCIÓN APLICABLE</h2><br />
        <p>Los Términos y Condiciones estarán reglamentados en función de la Legislación nacional regente.
           (Leyes de la República Peruana).</p>
        <p>Cualquier desacuerdo que surja del presente Contrato se solucionará entre ambas partes, de no ser
           el caso, se procederá renunciando ambas partes dando fin a este contrato.</p>
        </Typography><br />

         <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 25. INTERPRETACIÓN Y MODIFICACIONES </h2><br />
        <p>Ambas partes estipulan que los presentes Términos y Condiciones, serán interpretadas bajo estricta
           concordancia con todas las secciones que contiene, no es posible realizar interpretaciones parciales
           a beneficio personal.</p>
        <p>Todo lo incluido en los Términos y Condiciones, prevalecerán sobre contradicciones sugeridas.
           Acerca de las modificaciones de los Términos y Condiciones, estas podrán presentarse de dos
           maneras:</p>
           <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
           <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>COVENDE tiene la facultad de realizar modificaciones del contrato en el momento que
                considere conveniente, siempre y cuando notifique con antelación de puesta en vigencia de
                las nuevas modificaciones a los VENDEDORES.</li>
            <li>Los Términos y Condiciones también podrán ser modificados previa coordinación por escrito
                entre COVENDE y el VENDEDOR.</li>
                </ul>
           </ul>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 26. LIBERACIÓN DE RESPONSABILIDAD </h2><br />
         <p>Se entiende que el VENDEDOR usa la SOLUCIÓN COVENDE y administra su tienda en la plataforma bajo
            su propio riesgo, por lo que COVENDE se excluye de responsabilidades en cuanto a las acciones de los
            “usuarios del VENDEDOR”, estarán disponibles de manera permanente, ininterrumpida o libre de
            errores. COVENDE no es responsable de interrupciones delservicio, esto incluye fallas de conexión que
            puedan afectar cualquier transacción en cualquiera de sus etapas, incluyendo también las órdenes
            recibidas por el VENDEDOR.</p><br />
         <p>Las transacciones efectuadas entre COMPRADORES y VENDEDORES no involucran a COVENDE, es por
            ello que de presentarse alguna disputa entre uno o más COMPRADORES y el VENDEDOR, este último
            se obliga a mantener externo a COVENDE respecto de dichas disputas.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 27. LIMITACIÓN DE RESPONSABILIDAD </h2><br />
        <p>Respecto a las pérdidas tales como los costos de inversiones realizadas por el VENDEDOR dentro de la
           SOLUCIÓNCOVENDE. Así como, daños, pérdidas de valor o pérdida de oportunidad de negocios alguna,
           sea que se trate de daños directos o indirectos, daños emergentes, daños morales que podrían afectar
           al VENDEDOR, COVENDE no se hará responsable.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 28. CASO FORTUITO Y FUERZA MAYOR </h2><br />
        <p>COVENDE no será responsable del incumplimiento del VENDEDOR en cualquiera de sus obligaciones
           que se deba a un evento de caso fortuito o fuerza mayor de acuerdo a la Ley Aplicable.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 29. SOLUCIÓN DE CONTROVERSIAS </h2><br />
        <p>Ambas partes deben poner como prioridad el clima de buena fe y trato amigable entre los
          representantes, ante cualquier conflicto generado por el Contrato, incluso las cláusulas que se hablan
          sobre la nulidad de este.</p>
        <p>Solo en caso de que no se pueda llegar a una solución luego de los intentos de negociación, ambas
           partes pueden someterse a la jurisdicción de los tribunales de Lima, para resolver las controversias
           existentes. (PREGUNTAR)</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 30. CESIÓN DE LOS TÉRMINOS Y CONDICIONES </h2><br />
        <p>El VENDEDOR no podrá, por ninguna circunstancia, ceder en cualquier forma y a cualquier título, total
           o parcialmente, los derechos y obligaciones adquiridos por el mismo conforme a lo previsto en los
           T&C o la ejecución de lo previsto, salvo autorización expresa, previa y escrita por COVENDE.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 31. VIGENCIA Y TERMINACIÓN </h2><br />
        <ol style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        <h4 style={{ fontWeight: '800' }}>31.1 Duración</h4>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
        <p>Las relaciones comerciales existentes entre COVENDE y EL VENDEDOR tendrán una duración
           indefinida,salvo manifestación en contrario de cualquiera de las partes, con antelación de quince
           (15) días hábiles, de su deseo de dar porterminada su relación.</p>
          <p>Respectoal VENDEDOR, los T&C entrarán en vigencia a partir de la fecha de aceptación de los T&C,
           mediante cualquier medio de comunicación.</p> 
           </ul>
           <br />
         <h4 style={{ fontWeight: '800' }}>31.2 Terminación anticipada del VENDEDOR</h4>
         <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
         <p>El VENDEDOR podrá dar por terminada la relación comercial que surge de la aceptación de los
            presentes T&C, mediante aviso escrito por correo electrónico a COVENDE con una anticipación de
            quince (15) días hábiles desde la fecha emisión para finalizar el contrato.</p>
            </ul>
            <br />
        <h4 style={{ fontWeight: '800' }}>31.3 Efectos de la terminación</h4>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
        <p>Una vez terminado el uso de MARKETPLACE, el VENDEDOR deberá cumplir con el pago y entrega
           de sus obligaciones pendientes a la fecha de terminación, también deberá cesar de hacer uso del
           MARKETPLACE y la PLATAFORMA. Sin perjuicio de la terminación por cualquier causa, las
           obligaciones y derechos que estén en curso deberán darse por terminados conforme a lo establecido
           en estos T&C.</p>
        <p>Sin perjuicio de ello, se hará la retención del dinero que obtenga a través de nuestro portal web
           durante treinta (30) días hábiles, después de cumplirse este plazo se realizará el depósito del dinero
           con descuento de la comisión por venta ya establecida, dando finalmente porterminada la relación
           entre COVENDE y el VENDEDOR.</p>
           </ul>
           <br />
         <h4 style={{ fontWeight: '800' }}>31.4 Cláusulas sobrevivientes</h4>
         <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
         <p>Las Partes acuerdan que sobrevivirán a la terminación del contrato las siguientes disposiciones:
            devoluciones y garantías de los productos, confidencialidad, protección de datos personales,
            comisiones o cobros, obligaciones y derechos que estén en curso y la naturaleza de la relación
            contractual entre las Partes.</p>
            </ul>
            <br />
        <h4 style={{ fontWeight: '800' }}>31.5 Terminación anticipada por parte de COVENDE</h4>
        <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
        <p>Sin perjuicio de lo anterior, COVENDE podrá dar por terminada en cualquier momento mediante
           correo electrónico al VENDEDOR con tres (03) días calendarios de anticipación a la fecha efectiva
           en los siguientes eventos: incumplimiento de obligaciones de garantía y servicio técnico,
           incumplimiento de tiempos de despacho, incumplimiento de requisitos legales, incumplimiento de
           las obligaciones de actualización de stock de los productos, se encuentren infringiendo derechos
           de propiedad intelectual de terceros o no hayan sido ingresados legalmente al país, Cuando el
           VENDEDOR haya cargado sus productos con información errónea, falsa o inexacta; si el
           incumplimiento en reiteradas ocasiones de alguna de estas exigencias legales aplicables en virtud
           de los presentes términos y condiciones, sin reclamo alguno.</p>
           </ul>
        </ol>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 32. IDIOMA </h2><br />
        <p>El idioma de los presentes T&C y de sus documentos relacionados es el español, que en cualquier
           caso prevalecerá sobre traducciones o versiones en otro idioma.</p>
        </Typography><br />

        <Typography align = 'justify'>
        <h2 style={{ fontWeight: '1000' }}> 33. MONEDA </h2><br />
        <p>La oferta y venta de los Productos bajo el Servicio Marketplace se hará en moneda nacional, soles
           (S/). Por lo que, las transferencias que realice COVENDE al VENDEDOR serán hechas igualmente en
           soles (S/).</p>
        </Typography>

      






      </List>
      <span>
      </span>

    </>
  );
};

export default TermV1;
