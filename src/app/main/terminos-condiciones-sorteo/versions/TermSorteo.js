import React from 'react';
import { List, ListItem, UnorderedList, Text, Box } from '@chakra-ui/react';
import { Typography } from '@material-ui/core/';
import { COLORS } from '@CVTemplate/core/CVThemes';
import TablaPersonalizada from '@CVPages/core/terminos-y-condiciones/termsVersions/Tablas3x3';
import { color } from '@/app/assets/icons/index';


TablaPersonalizada


const TermSorteo = ({ children, date }) => {

    const contenidoCeldas1 = [

        ['Alarma puerta abierta', 'No'],
        ['Alto', '184'],
        ['Anaqueles en puerta', 'Si'],
        ['Ancho', '71'],
        ['Cantidad de bandejas', '2'],
        ['Cantidad de cajones', '1'],
        ['Cantidad de cajones 1', '1'],
        ['Capacidad bruta', '440 L'],
        ['Capacidad del freezer', '107.3'],
        ['Capacidad neta', '435 L'],
        ['Capacidad Refrigeración', '351L a 500L'],
        ['Clasificación energética', 'A'],
        ['Control de temperatura', 'Automático'],
        ['Dispensador de agua', 'Si'],
        ['Dispensador de hielo', 'Si'],
        ['Función', 'Congelador/Conservador'],
        ['Garantía', '1 año todo el equipo / 10 años compresor'],
        ['Iluminación interna', 'Si'],
        ['Información adicional', 'Capacidad de Botellas - 6'],
        ['Marca', 'Whirlpool'],
        ['Material de bandeja', 'Vidrio'],
        ['Modelo', 'WRJ45AKGWW'],
        ['Número de puertas', '2'],
        ['Panel digital', 'No'],
        ['Peso (kg)', '74'],
        ['Ruedas de desplazamiento', 'Si'],
        ['Sistema de enfriamiento', 'No Frost'],
        ['Tipo de refrigeradora', '2 Puertas'],

    ];

    const contenidoCeldas2 = [

        ['Pulgadas', '42'],
        ['Reconocimiento facial', 'No'],
        ['Resolución de pantalla', '1920 × 1080'],
        ['Reproduce formatos de video', 'Mp4,Mkv,VP8,VP9,Hevc'],
        ['Reproduce formatos de imagen', 'JPG,PNG'],
        ['Reproduce formatos de audio', 'Mp3,h264 Dolby, AAC'],
        ['Peso sin base (kg)', '6 Kgs'],
        ['Peso con base (kg)', '6 Kgs'],
        ['NFC', 'No'],
        ['Modo fútbol', 'Modo Deporte'],
        ['Modelo', 'HYLED427GIM'],
        ['Peso (kg)', '6 Kgs / 7.2 Kgs'],
        ['Wi-Fi', 'Si'],
        ['Puertos USB', '2'],
        ['TV Curvo', 'No'],
        ['3D', 'No'],
        ['Sistema de sonido', 'Dolby audio'],
        ['Sintonizador digital', 'Si'],
        ['Smart TV', 'Si'],
        ['Conexión RCA', 'No'],
        ['Dimensiones sin base', '54.2 cm / 95.6 cm/ 7.8cm'],
        ['Dimensiones con base', '59 cm / 95.6 cm/ 7.8cm'],
        ['Dimensiones', '59 cm / 95.6 cm/ 7.8cm'],
        ['Control remoto', 'Si'],
        ['Control por voz', 'Si'],
        ['Conexión VGA', 'No'],
        ['Marca', 'Hyundai'],
        ['Cámara integrada', 'No'],
        ['Bluetooth', 'Si'],
        ['Lector memoria SD', 'No'],
        ['Lentes 3D incluidos', 'No'],
        ['Puerto Ethernet', 'Si'],
        ['Entradas video por componente', 'No'],
        ['Puertos HDMI', '3'],
        ['Garantía', '12 meses'],
        ['Frecuencia de refresco (Hz)', '60 Hz'],

    ];
    const contenidoCeldas3 = [
        ['Alto', '38.5'],
        ['Ancho', '35.2'],
        ['Apagado automático', 'Si'],
        ['Garantía', '1 año'],
        ['Luz indicadora de encendido', 'Si'],
        ['Modelo', 'EAF50'],
        ['Peso (kg)', '5.5'],
        ['Potencia', '1700'],
        ['Profundidad', '35.2'],
        ['Temporizador', 'Si'],
        ['Tipo', 'Freidoras']
    ];

    const contenidoCeldas4 = [
        ['Peso (kg)', '8.7 kg'],
        ['Potencia', '2000W'],
        ['Profundidad', '44 cm'],
        ['Número de bandejas', '1'],
        ['Modelo', 'BOHE55'],
        ['Temperatura máxima', '250° C'],
        ['Temporizador', 'Si'],
        ['Tipo', 'Hornos eléctricos'],
        ['Marca', 'Bord'],
        ['Alto', '35.4 cm'],
        ['Ancho', '56.2 cm'],

        ['Capacidad', '55 L'],
        ['Luz indicadora de encendido', 'Si'],
        ['Luz interior', 'Si'],
        ['Funciones', '5'],
        ['Garantía', '2 año'],
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
            <List spacing={3} color='#444' style={{ userSelect: 'none' }} >

                <h2 style={{ fontWeight: '1000' }}> 1. PARTICIPANTES </h2>

                <Typography align='justify'>
                    Podrán participar todas aquellas personas naturales 
                    mayores de edad que realicen la compra de algún producto a través de
                    covende.com, cada compra significa una oportunidad de ganar.
                </Typography>

                <h2 style={{ fontWeight: '1000' }}> 2. VIGENCIA </h2>

                <Typography align='justify'>
                    La presente promoción estará vigente desde el 09/03/2024 
                    a las 00.00 hs. hasta el 12/05/2024 hasta las 16.00 hs.
                    Periodo de inscripción será como máximo el día 12/05/2024 a las 00.00 hs.
                </Typography>

                <h2 style={{ fontWeight: '1000' }}> 3. DE LOS ORGANIZADORES</h2>

                <Typography align='justify'>
                    COVENDE SAC. con domicilio en JR. ENRIQUE
                    BARRON NRO. 310 INT. 1505 URB. LA VIÑITA LIMA - LIMA – BARRANCO,
                    organizadores del presente sorteo denominado “Sorteo de Lanzamiento”
                    resultando ser responsables de la mecánica, desarrollo y proceso de
                    selección final de ganadores. Sin perjuicio de ello, una vez entregado el
                    premio, los Organizadores se deslindan de toda responsabilidad vinculada
                    con el uso y/o goce del premio pertinente.
                </Typography>

                <h2 style={{ fontWeight: '900' }}> 4. MECANISMO DEL CONCURSO</h2>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li>El concurso sólo está disponible para quienes, encontrándose dentro
                        de las personas detalladas en el punto 1 del presente:</li>
                    <li>Realicen la compra de 1 producto con precio base de S/ 50.00</li>
                    <li>Tendrán doble chance si el participante sigue todas las redes sociales
                        a COVENDE.
                        Sean seguidores de COVENDE en su cuenta de Instagram, Facebook
                        y Tik tok comentando el posteo todas las cuentas y Etiqueten (@) a
                        al menos 1 persona en su comentario/en respuesta al posteo del
                        sorteo.</li>
                    <li>Se podrá participar todas las veces que se desee, ya que cada
                        compra significa una oportunidad de ganar.</li>
                </ul>

                <h2 style={{ fontWeight: '900' }}> 5. PREMIOS</h2>
                <p>Se sorteará a 3 distintos ganadores con los siguientes puestos:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li>1er Lugar: Refrigeradora</li>
                    <li>2do Lugar: TV</li>
                    <li>3er Lugar: Horno + Freidora</li>
                </ul>
                
                <h4 style={{ fontWeight: '700' }}>5.1 - 1er Lugar: Refrigeradora</h4>
                <br/>
                <p style={{ fontWeight: '600', textAlign: 'center' }}>Especificaciones Refrigeradora</p>
                <TablaPersonalizada contenidoCeldas={contenidoCeldas1} />


                <br/> <h4 style={{ fontWeight: '700' }}>5.2 - 2do Lugar: TV</h4>
                <br/>
                <p style={{ fontWeight: '600', textAlign: 'center' }}>Especificaciones TV</p>
                <TablaPersonalizada contenidoCeldas={contenidoCeldas2} />

                <br/> <h4 style={{ fontWeight: '700' }}>5.3 - 3er Lugar: Horno + Freidora</h4> <br/>
                <p style={{ fontWeight: '600', textAlign: 'center' }}>Especificaciones Freidora de aire</p>
                <TablaPersonalizada contenidoCeldas={contenidoCeldas3} />
                <p style={{ fontWeight: '600', textAlign: 'center' }}>Especificaciones Horno</p>
                <TablaPersonalizada contenidoCeldas={contenidoCeldas4} /> <br/>


                <h2 style={{ fontWeight: '900' }}> 6. FECHA DEL SORTEO</h2>

                <Typography align='justify'>
                    El sorteo se realizará el próximo 12 de Mayo de
                    2024.
                    Los ganadores serán notificados dentro de las 24hs posteriores al mismo
                    vía las redes sociales.
                </Typography>

                <h2 style={{ fontWeight: '900' }}> 7. SELECCIÓN DEL GANADOR</h2>

                <Typography align='justify'>
                    El sorteo estará publicado en las redes
                    sociales de COVENDE. Se realizará el día indicado entre todas aquellas
                    personas que hayan cumplimentado el mecanismo del punto 4.
                </Typography>

                <h2 style={{ fontWeight: '900' }}> 8. ADJUDICACION Y ENTREGA DE PREMIO</h2>

                <Typography align='justify'>
                    Los ganadores serán notificados por mensaje privado por la cuenta de <strong>COVENDE</strong> y por correo electrónico. 
                    Ellos mismos deberán responder confirmando su nombre completo, número de DNI, teléfono, dirección y Ciudad de Procedencia. 
                    Una vez recibida la información, el ganador será contactado por email para coordinar la entrega del premio en la agencia de Caja 
                    Huancayo más cercano al domicilio de los ganadores, sin cargo alguno para el ganador. El premio será enviado por <strong>CAJA HUANCAYO</strong> que 
                    tiene la facultad de seleccionar la agencia donde se realizara la premiación, quien validara conformidad de recepción.
                </Typography>


                <h2 style={{ fontWeight: '900' }}> 9. RESPONSABILIDADES</h2>

                <Typography align='justify'>
                    Sin perjuicio de lo estipulado en otras cláusulas
                    de estas Bases y Condiciones, los concursantes acuerdan que el
                    Organizador, empresas afiliadas y/o subsidiadas, accionistas, gerentes,
                    directores, agentes, empleados y/o representantes no serán responsables
                    por las pérdidas, daños o perjuicios de cualquier tipo que resulten de la
                    aceptación, uso o gozo de los Premios y/o de la participación en el
                    Concurso o de cualquier mal funcionamiento técnico de la red telefónica,
                    sistemas de computación en línea, mecanismos de fecha computarizados,
                    equipos de computación, software, u cualquier otra combinación de los
                    mismos, o cualquier daño a la computadora y/o sus contenidos propiedad
                    del Concursante (o de terceros), en relación con, o que resulte de, cualquier
                    pate o con motivo de este concurso.
                    Facebook, Instagram ni cualquier otra red social no patrocina, avala ni
                    administra de modo alguno este concurso, ni está asociado a la misma. El
                    participante proporciona su información a <strong>COVENDE.com</strong>
                </Typography>


                <h2 style={{ fontWeight: '900' }}> 10. AUTORIZACIÓN</h2>

                <Typography align='justify'>
                    Se deja constancia que el ganador autoriza
                    expresamente a Covende, empresas asociadas y/o afiliadas a difundir sus
                    datos personales, domicilio, imágenes, voces, con fines comerciales y/o
                    promocionales, en los medios y formas que disponga, sin derecho a
                    compensación alguna, hasta transcurrido 1 año de finalización del presente.
                </Typography>


                <h2 style={{ fontWeight: '900' }}> 11. MODIFICACIÓN, CANCELACIÓN O SUSPENSIÓN</h2>

                <p>El organizador podrá a su sólo criterio: </p>
                <ol style={{ listStyleType: 'decimal', paddingLeft: '20px' }}>
                    <li> ampliar o disminuir la nómina de sorteos y premios establecidos en estas
                        bases y condiciones o reemplazarlo por otro</li>
                    <li>modificar las fechas de comienzo y finalización de la promoción</li>
                    <li>modificar estas bases</li>
                    <li>desistir de llevar a cabo el presente, comunicándolo en forma masiva y
                        previo al acto de sorteo, sin que ello otorgue derecho alguno a los
                        participantes.</li>
                </ol>



                <h2 style={{ fontWeight: '900' }}> 12. PUBLICIDAD DE LA PROMOCIÓN</h2>

                <Typography align='justify'>
                    La operatoria de esta promoción,
                    los requisitos de participación, el premio y los requisitos para
                    su adjudicación, estimación de probabilidades de obtener el premio, y toda
                    la demás información que surge de estas bases y condiciones, serán
                    publicados en cada una de las redes sociales en las que tendrá vigencia
                    la promoción, a fin que el consumidor conozca detallada y acabadamente
                    las condiciones de la misma. Asimismo, COVENDE se reserva el derecho de
                    publicar y promocionar esta promoción y el resultado del sorteo en
                    cualquier medio de comunicación, ya sea impreso, digital, y/o a través de
                    redes sociales.
                </Typography>


                <h2 style={{ fontWeight: '900' }}> 13. ACEPTACIÓN</h2>

                <p>Quienes participen en las promociones y sorteos
                    organizados por COVENDE por su sola participación aceptan de pleno
                    derecho todas y cada una de la disposición prevista en las presentes bases
                    y condiciones. </p>

                <p>En el concurso no podrán participar: </p>

                <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '20px' }}>
                    <li> personas jurídicas </li>
                    <li> menores de edad</li>
                    <li> personas domiciliadas fuera del territorio peruano </li>
                    <li> Empleados de Covende y Caja Huancayo de las agencias de publicidad
                        y promociones del mismo, de los proveedores de cualquier otro producto o
                        servicio relacionado con el premio de este sorteo ni las personas que se
                        hubieren desvinculado de cualquiera de ellas dentro de los treinta (30) días
                        anteriores al inicio de la Promoción. Tampoco los parientes por
                        consanguinidad directa o afinidad de tales empleados o ex empleados
                        hasta el segundo grado inclusive y sus cónyuges.</li>
                </ol>

            </List>

        </>
    );
};

export default TermSorteo;
