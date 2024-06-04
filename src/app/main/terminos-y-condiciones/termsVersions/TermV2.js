import React from 'react';
import { List, ListItem, UnorderedList, Text, Box } from '@chakra-ui/react';
import { Typography } from '@material-ui/core/';
import { COLORS } from '@CVTemplate/core/CVThemes';

const TermV2 = ({ children, date }) => {
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
      <List spacing={3} color='#444'>
        <ListItem>
          I. Aplicación y términos generales
          <br />
          <Typography align='justify'>
            Al acceder o utilizar nuestros Servicios, aceptas voluntaria e
            incondicionalmente que has leído y estás plenamente de acuerdo con
            estos Términos y Condiciones junto a políticas mencionadas en otras
            partes del Sitio. Las nuevas herramientas o funciones que se añadan
            al sitio posteriormente también estarán sujetas a los presentes
            Términos y Condiciones.
          </Typography>
          <br />
          <Typography align='justify'>
            a. Sobre los Vendedores Se entiende por Vendedor a todo aquel que
            publica un producto en nuestro Sitio con la intención de que sea
            adquirido por un Comprador. Al momento de aceptar estos Términos y
            Condiciones, el Vendedor declara: - Proporcionar datos personales
            verídicos, actualizados y disponibles de verificación. -
            Proporcionar datos de la empresa verídicos, actualizados y
            disponibles de verificación. La empresa debe estar legalmente
            constituida cumpliendo las leyes vigentes a nivel nacional. - Tener
            la capacidad de actuar en representación de la empresa vinculada a
            su registro y de obligar a la misma al cumplimiento de los Términos
            y Condiciones. - Vender productos fabricados, importados o
            adquiridos lícitamente y disponibles para la entrega en los plazos
            establecidos. Además, declara contar con todos los permisos
            requeridos por la ley para comercializar sus productos, tales como
            registro sanitario u otras licencias. En caso de productos
            reacondicionados, el Vendedor deberá proporcionar información clara,
            precisa y completa sobre la condición del producto. - Proporcionar
            información verídica y disponible de verificación de sus productos
            tales como procedencia, marca, descripción, precio, stock. - Asumir
            el compromiso de actualizar cualquier dato sobre su Cuenta o los
            productos conforme resulte necesario. - Ser responsable de todas las
            obligaciones y cargas impositivas que deriven de la venta de sus
            productos. - No establecer ni intentar tener contacto alguno con los
            Compradores por ninguna razón y bajo ningún medio, excepto el
            autorizado expresamente por por Covende. b. Sobre los Compradores Se
            entiende por Comprador a todo aquel que paga por un producto con la
            intención de adquirirlo. Al momento de aceptar estos Términos y
            Condiciones, el Comprador declara: - Ser mayor de edad o ser mayor
            de 13 años y contar con el consentimiento de los padres. Cualquier
            acción realizada por los menores en el Sitio será responsabilidad de
            sus padres, tutores o encargados, y por tanto se considerarán
            realizados por éstos dada la representación legal con la que
            cuentan. - Proporcionar datos personales verídicos, actualizados y
            disponibles de verificación. - Asumir el compromiso de actualizar
            sus datos conforme resulte necesario. - Haber leído y analizado
            todos los detalles del producto que desea adquirir y acepta quedar
            obligado por las condiciones de compra.
          </Typography>
        </ListItem>
        <ListItem>
          II. Uso de la cuenta
          <br />
          <Typography align='justify'>
            La navegación en el Sitio no requiere registro; sin embargo, para
            concretar y gestionar una compra, Covende requerirá del Vendedor y
            Comprador un correo electrónico y una contraseña. Estos datos serán
            otorgados al momento del registro. El Vendedor y Comprador declaran
            utilizar la dirección de correo electrónico ingresado como principal
            método de comunicación entre ellos y Covende. Tanto el Vendedor como
            el Comprador son responsables por todas las acciones (incluido
            cualquier uso no autorizado) efectuadas en su Cuenta, ya que el
            acceso a su Cuenta está restringido al proporcionar un usuario y
            contraseña que es de conocimiento exclusivo del dueño de la Cuenta.
            Ambos declaran ser responsables de mantener su contraseña de una
            manera segura y confidencial. El Vendedor y el Comprador se
            comprometen a notificar a Covende de manera clara e inmediata
            cualquier uso sospechoso o no autorizado de su Cuenta. Covende no
            será responsable por cualquier perjuicio que sufra el usuario de la
            Cuenta debido al uso indebido de la misma. En particular, y a título
            meramente indicativo y no exhaustivo, el Vendedor y el Comprador se
            comprometen a utilizar el Sitio en conformidad con la ley y con los
            presentes Términos y Condiciones, quedando prohibida la utilización
            del Sitio con fines ilícitos o contrarios a lo establecido en el
            presente documento. Covende otorgará al Vendedor los permisos y
            accesos necesarios para poner sus productos en venta en el Sitio,
            una vez que haya verificado la naturaleza legal de sus operaciones
            al examinar la siguiente documentación que debió entregar el
            Vendedor: - Ficha RUC con vigencia no mayor a 90 días - Estado de
            cuenta bancaria de un plazo no mayor a 90 días - DNI vigente Estos
            archivos adjuntados al momento del registro deben corroborar los
            datos que el Vendedor proporcionó en el formulario de Registro. Al
            estar todo conforme, el negocio es dado de alta y puede entrar en
            operación en el Sitio y hacer uso de los Servicios. De lo contrario,
            Covende dará la retroalimentación necesaria para que el Vendedor
            corrija o complete la información mínima requerida. El Vendedor
            puede añadir más de un agente para la gestión de la información de
            su tienda. Para otorgar acceso al agente deberá proporcionar un
            correo electrónico y una contraseña. El Vendedor es el único
            responsable por las acciones que el agente realice en su cuenta.
          </Typography>
        </ListItem>
        <ListItem>
          III. Publicación de productos
          <br />
          <Typography align='justify'>
            a. Prohibiciones generales Queda expresamente prohibido publicar
            productos que estén prohibidos por la Ley peruana. En el Anexo A se
            enumeran los productos prohibidos, sin carácter limitativo. El
            Vendedor también se compromete a no publicar contenido ofensivo,
            abusivo, difamatorio, pornográfico, amenazante u obsceno;
            información que tenga la intención de promover y/o cometer un acto
            ilegal de cualquier tipo; o información que incite a involucrarse en
            prácticas peligrosas o nocivas para la salud y el equilibrio mental.
            b. Información del producto en el Sitio El Vendedor acepta actuar de
            buena fe y asegurar la publicación de texto, imágenes y otros
            contenidos que no incluya información engañosa, falsa o fraudulenta.
            Queda expresamente prohibido publicar en los textos, imágenes u
            otros contenidos datos personales o de contacto, tales como, y sin
            limitarse a, celular, correos electrónicos, dirección o links de
            páginas de Internet; o publicar información que tenga la intención
            de solicitar información personal. Respetando lo anteriormente
            establecido, el Vendedor debe proporcionar estos datos sobre su
            producto: - Categoría o subcategorías correspondientes - Nombre del
            producto - Marca. Si se trata de una marca registrada, el Vendedor
            declara ser titular o tener la autorización indicada para su
            utilización. - Material, modelo, procedencia y condición del
            producto - Licencias o permisos especiales. El Vendedor adjuntará
            los documentos correspondientes. - Detalle del producto, conteniendo
            información clara, completa y pormenorizada. - Peso y dimensiones
            del producto expresado en kilogramos y centímetros según
            corresponda. - Fotos que comuniquen una imagen realista del
            producto, respeten las dimensiones establecidas y cumplan otras
            políticas de Covende. - Indicar si el producto se ajusta a la venta
            por menor y/o mayor. - Stock. - Precio expresado en la moneda local
            (S/ - soles). Además, debe incluir el IGV correspondiente. - El
            precio de oferta y plazo del mismo, en caso aplique - Indicar si se
            permite la reserva del producto - Tiempo de preparación expresado en
            días (tiempo que toma preparar un producto para que esté listo para
            recoger por el courier), este tiempo está sujeto a penalidad en caso
            de incumplimiento. - Información sobre el paquete: tipo, peso,
            dimensiones u otros datos convenientes. - Tipo de comprobante a
            emitir y el IGV aplicable - Garantía, especificando el tiempo y
            condiciones - Otros que Covende vea necesario. El Vendedor declara
            ser el único responsable del contenido subido sobre sus productos,
            asegurando que toda la información proporcionada es completa,
            actualizada, verídica y disponible de verificación sin previo aviso.
            Si el Comprador toma alguna acción alegando que la información sobre
            el producto expuesta en el Sitio es incompleta, falsa o fraudulenta;
            el Vendedor asume plena responsabilidad ante el Comprador, habiendo
            incurrido en la falta de manera voluntaria o no, liberando a Covende
            de cualquier consecuencia. Esto significa que el Vendedor responderá
            ante cualquier reclamo, solicitud de devolución o indemnización que
            exija el Comprador. Si estas exigencias envuelven un pago hacia el
            Comprador, el Vendedor autoriza a Covende retener sus pagos y
            descontar de sus ventas el monto correspondiente. Covende ha
            establecido mecanismos para garantizar la fiabilidad y veracidad de
            la información que se publica en el Sitio en la medida de lo
            posible. No obstante, no puede garantizar el cumplimiento a plenitud
            de los aspectos citados y no se hará responsable de ello. Aún así,
            Covende tomará las medidas necesarias para frenar y erradicar
            acciones fraudulentas. El Vendedor reconoce que Covende tomará
            acciones que afectarán su cuenta en el Sitio dependiendo de la
            gravedad y la reincidencia del incumplimiento de estas políticas, lo
            que puede resultar en el bloqueo, suspensión temporal o permanente,
            entre otras acciones definidas más adelante. Se deja claro que las
            condiciones de compra establecidas por el Vendedor, incluyendo la
            información sobre el producto, no podrán cambiar durante el proceso
            de compra y/o entrega del producto. c. Derechos de autor y Propiedad
            Intelectual El Vendedor declara que sus productos respetan los
            derechos de propiedad industrial e intelectual, que están protegidos
            por leyes nacionales e internacionales vigentes y que cuenta con la
            documentación necesaria para probarlo. Además, declara ser titular y
            poseer los derechos necesarios sobre las imágenes y fotografías que
            publica en el Sitio. Asimismo, el Vendedor concede a Covende la
            autorización para reproducir, adaptar, publicar y crear piezas
            gráficas derivadas de la información que ingresa en su Cuenta, tales
            como el texto e imágenes de sus productos, para ser usados en
            campañas de marketing por medios físicos o virtuales, incluirlas en
            el Sitio o las redes sociales de Covende, o en cualquier medio de
            comunicación que Covende crea necesario. Queda expresamente
            prohibido cualquier tentativa de engañar o confundir al Comprador al
            publicar productos que utilicen una marca sin la debida autorización
            del titular. En caso de concretarse la venta de un producto que
            infrinja esta política, el Vendedor asumirá los perjuicios
            ocasionados: entregará al Comprador el producto original, asumiendo
            el costo de la devolución del producto fraudulento y de la compra y
            entrega del producto original; o cubrirá los costos que Covende
            invertirá en la adquisición del producto original, lo que incluirá
            los gastos administrativos. Cabe resaltar que Covende se reserva el
            derecho de eliminar del Sitio de manera inmediata los productos que
            infrinjan estas políticas sin previo aviso. Covende ha puesto a
            disposición de terceros los mecanismos necesarios para reportar
            cualquier violación de los derechos mencionados. Si Covende es
            notificado por alguna infracción podrá, a su exclusivo criterio,
            eliminar el texto, imagen o contenido en cuestión y podrá tomar
            otras medidas que considere apropiadas, sin notificación previa al
            Vendedor. Si el Vendedor considera que su contenido no infringe las
            normas, podrá, en determinadas circunstancias, enviar un mensaje a
            Covende solicitando la restauración del contenido eliminado y
            explicando sus razones; solicitud que puede o no ser aceptada por
            Covende. El Vendedor es el único responsable ante cualquier
            infracción de los derechos de terceros. Covende no está obligado a
            responder por estas infracciones ante cualquier acción legal.
          </Typography>
        </ListItem>
        <ListItem>
          IV. Medios de pago
          <br />
          <Typography align='justify'>
            Covende pone a disposición del Comprador el pago con Tarjeta de
            crédito o Tarjeta de débito para la adquisición de productos. Los
            medios de pago podrán variar, sin perjuicio de lo antes mencionado.
            El Comprador, quien debe ser el mismo que el tarjetahabiente, está
            en la obligación de cumplir el Contrato de Servicios contraído con
            su respectiva entidad financiera. Este Contrato prevalecerá a los
            actuales Términos y condiciones ante casos de conflicto. Se tomará
            nota de acciones sospechosas como compras por grandes cantidades,
            múltiples transacciones con una misma tarjeta, compras en horas
            inusuales y múltiples transacciones con una misma dirección IP,
            entre otros criterios, para prevenir operaciones fraudulentas o
            riesgosas. Según lo determine necesario, Covende está facultado para
            cancelar un pedido, suspender una cuenta o iniciar acciones
            judiciales contra quien vulnere la seguridad de una transacción.{' '}
          </Typography>
        </ListItem>
        <ListItem>
          V. Pedidos y políticas de entrega
          <br />
          <Typography align='justify'>
            a. Estados de un pedido Los estados de un Pedido y sus respectivas
            definiciones son las siguientes: - Pendiente: un pedido se encuentra
            Pendiente cuando el Comprador ha efectuado el pago correspondiente.
            El sistema valida el pago y envía una notificación al Vendedor para
            procesar el pedido. - Procesado: un pedido se encuentra Procesado
            cuando el Vendedor recibió la orden de atender un pedido y realiza
            los procedimientos propios del negocio para disponer del pedido para
            su recojo. Esto sucede en un plazo que el propio Vendedor definió
            como su Tiempo de Preparación. - Enviado: un pedido se encuentra
            Enviado cuando el courier recoge el pedido en las instalaciones del
            Vendedor y procede a llevarlo a la dirección de entrega que el
            Comprador estableció. - Completado. un pedido se encuentra
            Completado cuando el Comprador recibe el pedido y el courier
            notifica a Covende la conformidad de la recepción. El Comprador
            tiene plazo de cancelar un pedido sólo cuando se encuentra en estado
            Pendiente o Procesado. Al efectuarse la cancelación, el Comprador
            puede volver a realizar la compra condicionado al precio, stock y
            otras características actuales aunque sean diferentes de las
            anteriores. De solicitar la cancelación cuando el pedido se
            encuentra en estado Enviado, el Comprador acepta cubrir los costos
            incurridos hasta el momento de la cancelación. b. Tiempo de entrega
            El tiempo de entrega se cuenta desde que Covende valida el pago del
            pedido. Este plazo está determinado por el tiempo que el Vendedor
            demora en alistar su producto para luego ser enviado (denominado
            Tiempo de preparación) más el tiempo que el courier ha establecido
            para la entrega al Comprador. El tiempo de Preparación es definido
            por el propio Vendedor según los procesos y características de su
            negocio, tiempo que es de estricto cumplimiento y está sujeto a
            penalidades. Covende parte de estos datos para exponer en el Sitio
            un tiempo de entrega estimado de los productos. El tiempo de entrega
            está definido en días hábiles y es un dato estimado, contemplando la
            posibilidad de extenderse debido al estado de emergencia, bloqueos
            en la carretera o por algunos destinos con restricciones. En este
            sentido, si el pedido no puede ser enviado por motivos de fuerza
            mayor, coordinaremos una nueva fecha de entrega o, a solicitud del
            Comprador, la cancelación y reembolso de la compra. Las entregas se
            realizan de lunes a viernes de 8 am a 6 pm y los sábados de 9 am a 1
            pm. c. Cobertura y dirección de entrega El servicio de entrega es
            válido para envíos a nivel de Lima y provincias. Se excluyen
            campamentos mineros y centros petroleros, asentamientos humanos,
            centros poblados, o destinos que no cuentan con rutas de transporte
            público diario. El Sitio informará al Comprador la disponibilidad de
            entrega a su destino al ingresar el departamento, provincia y
            distrito de su dirección. El Comprador es el responsable exclusivo
            de la exactitud de la información del lugar de entrega. Por lo
            tanto, se asegurará de que los datos ingresados son exactos y
            actualizados para garantizar la correcta y oportuna entrega del
            pedido. El servicio de entrega quedará sin efecto si los datos
            proporcionados son incorrectos y los costos incurridos serán
            asumidos por el Comprador. El Comprador podrá solicitar el cambio de
            dirección de entrega mientras, y solo cuando, el pedido se encuentra
            en estado Pendiente. El Comprador acepta que el cambio de dirección
            puede estar sujeto a nuevos costos que él asumirá. La opción de
            cambiar la dirección de entrega queda inhabilitada una vez que el
            Vendedor procesa el pedido. d. Costo de entrega y otros El costo de
            envío es variable y depende del tamaño del producto, peso y lugar de
            destino. Este costo está incluido en el precio final de la compra y
            es asumido por el Comprador, quien declara estar de acuerdo al
            efectuar el pago. El servicio de entrega se realiza en la puerta del
            domicilio. El transportista no está en la facultad de ingresar un
            producto usando sogas, poleas, o a través de ventanas, balcones, o
            cualquier otro medio que el Comprador pretenda usar. Se exige que la
            recepción del pedido sea realizada por un mayor de edad. Este último
            dará su conformidad al otorgar sus datos y firmar la guía de
            remisión. Antes de firmar debe corroborar que lo entregado se
            encuentra en buen estado y corresponda a la compra. Verificará que
            el paquete esté sellado y sin señales de intento de apertura. Si no
            está conforme, debe rechazar el producto y ponerse en contacto con
            Covende. Su firma es interpretada como la aceptación satisfactoria y
            final de la compra; por lo tanto, no se da lugar a reclamos
            posteriores atribuibles a malos procedimientos de entrega. El
            servicio de entrega contempla 2 (dos) intentos. Después del segundo
            intento, el paquete regresará a su destinatario y cancelaremos el
            pedido. Los costos incurridos serán asumidos por el Comprador. Para
            facilitar el seguimiento de un pedido Covende actualiza y publica
            los estados del mismo en la interfaz del Comprador y Vendedor;
            también mostrará el número de Tracking que podrá ser ingresado y
            consultado en la web del Courier. El Comprador contactará a Covende
            cuando no reciba su pedido en el tiempo establecido. Si la compra
            incluye más de un producto, estos podrían llegar por separado. e.
            Obligaciones del vendedor para envío Se respetará la dirección de
            recojo que el Vendedor determine en su cuenta. El Vendedor es el
            único responsable de verificar la exactitud del dato y declara
            mantenerlo actualizado. El tiempo de preparación determina la fecha
            de recojo. El Vendedor está obligado a tener listo su envío para el
            momento de recojo. En tal sentido, la demora o cancelación del
            recojo producirá penalidades que el Vendedor declara estar dispuesto
            a asumir. El Vendedor se compromete a cumplir lo dispuesto en la Ley
            N° 30884. Usará empaques que no generen daño ambiental, tales como
            bolsas de papel o caja de cartón.
          </Typography>
        </ListItem>
        <ListItem>
          VI. Calificación del Vendedor y penalidades
          <br />
          <Typography align='justify'>
            Covende seguirá de cerca el desempeño del Vendedor para asegurar el
            correcto funcionamiento del Servicio y la satisfacción del
            Comprador. Para tal fin, Covende utilizará criterios de calificación
            (explicados en el Anexo B) que determinarán si el Vendedor tiene un
            desempeño bueno, regular o malo. El Vendedor podrá consultar su
            calificación ingresando a su cuenta. Cada falta detectada impactará
            negativamente la calificación del Vendedor, habiendo incurrido en
            ella de manera voluntaria o no. Las reincidencias podrán
            descalificar al Vendedor para su continuidad en el Servicio; así
            como también una penalidad y potencial sanción. Covende se reserva
            el derecho de suspender, bloquear o eliminar la cuenta del Vendedor.
            Las penalidades se determinan en base al porcentaje final de
            Calificación del Vendedor. De acuerdo a la gravedad, estas serán las
            penalidades: - Una calificación menor a 95% pero mayor a 85%
            (Regular desempeño) conlleva la Suspensión temporal de la cuenta.
            Habiendo notificado al Vendedor, Covende le dará un plazo para que
            regularice su estado. La suspensión temporal consiste en que no
            podrá gestionar pedidos, agregar productos o disponer de sus
            ingresos. - Una calificación menor a 85% (Mal desempeño) implica el
            Cierre de cuenta permanente. En tal sentido, Covende bloqueará la
            cuenta y el Vendedor no tendrá opción de volver a registrarse.
          </Typography>
        </ListItem>
        <ListItem>
          VII. Políticas de devolución
          <br />
          <Typography align='justify'>
            El Vendedor podrá establecer sus propias políticas de devolución y
            las expondrá en la descripción del producto en el Sitio. Estas
            prevalecerán sobre las políticas de devolución de Covende al surgir
            contradicciones. En todo momento la responsabilidad recae plena y
            únicamente sobre el Vendedor. Al efectuar el pago por una compra, el
            Comprador declara conocer y estar de acuerdo con las políticas de
            devolución del Vendedor y/o las de Covende. Antes de iniciar un
            proceso de devolución, el Comprador deberá verificar que su producto
            no se encuentra en la Lista de productos que no permiten devolución,
            detallada en el Anexo C. Hecha la verificación, tiene 7 días
            hábiles, contados a partir de la recepción del producto, para
            solicitar una devolución desde su cuenta. El Comprador deberá
            señalar el motivo de devolución en la solicitud. Los motivos pueden
            ser únicamente uno de los siguientes: ○ No es el producto comprado ○
            El producto es diferente a la descripción mostrada, ○ El producto
            está dañado, defectuoso o no funciona bien ○ Faltan partes o
            accesorios prometidos. ○ Producto con señales de uso Además, el
            Comprador debe dar detalles de su caso. Para lo cual es necesario
            que sea minucioso y veraz al redactar este contenido y debe adjuntar
            todas las evidencias posibles. Por último, debe indicar el método de
            devolución de su preferencia: la reposición del producto o reembolso
            a cuenta. La solicitud de devolución es enviada al Vendedor, quien
            deberá evaluar y responder en un plazo de 3 días hábiles; superado
            este plazo la solicitud es aceptada automáticamente. Si la solicitud
            de devolución es aceptada, el sistema notificará al Comprador y
            emitirá la Guía de Devolución. A partir de entonces, el Comprador
            tiene 2 días hábiles para llevar el paquete al Courier más cercano
            señalado por Covende. Todo gasto de desplazamiento será cubierto por
            el Comprador. Junto al paquete a devolver, el Comprador debe
            adjuntar la Guía de Devolución y el comprobante de pago original. La
            solicitud de devolución se cancela cuando el Comprador no cumple con
            enviar el producto en el plazo indicado o sin los documentos
            requeridos. Por otro lado, la solicitud de devolución puede ser
            rechazada por el Vendedor, quien abrirá una disputa y explicará las
            razones de rechazo de la solicitud, misma que deberá estar completa
            y acompañada de evidencias. El Comprador se compromete a devolver el
            producto exactamente en las mismas condiciones que las recibió. Se
            devolverá en el empaque original y conteniendo absolutamente todos
            los artículos o papeles que haya enviado el Vendedor en el paquete.
            La ausencia de alguno de los mencionados invalida la devolución. El
            paquete debe estar correctamente embalado a responsabilidad del
            Comprador. El Vendedor cubrirá los costos relacionados con la
            devolución, los cuales serán retenidos y descontados de sus ventas.
            El Comprador deberá emitir una Nota de Crédito y subirlo en su
            cuenta en los casos en los que aplique. El proceso de reembolso o el
            envío de un producto nuevo, según haya indicado el Comprador en la
            solicitud, iniciará cuando el Vendedor otorgue la conformidad de la
            recepción del paquete devuelto en su cuenta. El Vendedor estará a
            cargo de todo el proceso de envío del nuevo producto, hará las
            gestiones necesarias y cubrirá todos los costos. Una vez recibido el
            producto nuevo, es deber del Comprador poner fin al proceso de
            devolución en su cuenta como prueba de su conformidad. Los
            reembolsos se harán en la misma tarjeta utilizada para la compra en
            un plazo de 10 a 15 días hábiles. La entidad financiera que emitió
            la tarjeta puede generar demoras o dificultades en el proceso,
            Covende no se hará responsable. Como acción final, el Comprador debe
            dar su conformidad en su cuenta. El Vendedor tiene la potestad de
            rechazar el paquete devuelto porque el producto devuelto no es el
            mismo que se entregó o porque el paquete devuelto está incompleto o
            dañado. En estas circunstancias, dada la responsabilidad del
            Comprador en perjuicio del Vendedor, el Comprador deberá escoger una
            de estas dos opciones para dar fin al proceso de devolución: aceptar
            el producto en las condiciones en las que se encuentre o aceptar
            como reembolso el 50% del precio de compra (el restante del importe
            se usará para compensar lo desembolsado por el Vendedor). En
            cualquier etapa del proceso de devolución, el Vendedor o el
            Comprador podrán solicitar la intervención de Covende cuando no
            puedan llegar a un acuerdo. Covende participará como mediador y
            ayudará a determinar el grado de responsabilidad de las partes para
            así tomar una decisión. Covende puede requerir del Comprador o
            Vendedor más documentación o evidencias para esclarecer el asunto.
            Cualquiera de las partes tiene libertad de tomar acciones legales,
            sin que Covende contraiga responsabilidad alguna.
          </Typography>
        </ListItem>
        <ListItem>
          VIII. Planes
          <br />
          <Typography align='justify'>
            El Vendedor debe seleccionar y pagar un Plan para utilizar los
            servicios de Covende. Los detalles de los Planes, tales como precio
            y vigencia, son publicados en el Sitio. Al realizar el pago por
            determinado Plan, el Vendedor acepta sujetarse a los términos y
            condiciones del servicio de Covende. El Plan se renovará
            automáticamente al finalizar la vigencia del mismo, a menos que el
            Vendedor solicite la cancelación del Plan. La cancelación entrará en
            vigor al día siguiente al último día del período de vigencia actual.
            De ser el caso, Covende restringirá el uso, más no el acceso, a la
            plataforma; así el Vendedor podrá acceder a la información que hasta
            ese momento se haya acumulado. Si el Vendedor exige la cancelación
            del Plan antes de cumplirse la vigencia del mismo, Covende no
            reembolsará el pago realizado. Covende puede cambiar las condiciones
            de los Planes periódicamente, previa notificación a los Vendedores
            y, si corresponde, se les informará cómo aceptar las nuevas
            condiciones.
          </Typography>
        </ListItem>
        <ListItem>
          IX. Protección de datos personales
          <br />
          <Typography align='justify'>
            La utilización del Sitio por parte del Vendedor, Comprador o
            terceros, les otorga la condición de Usuario e implica la aceptación
            de los presentes Términos y Condiciones. El Usuario declara
            proporcionar sus datos de manera voluntaria a Covende para que sean
            añadidos a su base de datos y sean utilizados con fines comerciales,
            publicitarios o de análisis de mercado. Covende se compromete a
            mantener la confidencialidad de la información respetando lo
            establecido en la Ley N° 29733, Ley de Protección de Datos
            Personales y su reglamento aprobado por Decreto Supremo N°
            003-2013-JUS. Los datos personales de los Usuarios serán utilizados
            para brindar información sobre los servicios vinculados a Covende,
            pudiendo tratarse de nuevas funcionalidades, actualizaciones o
            promociones. Además serán utilizados para la entrega de pedidos,
            informar el estado de tales y el seguimiento de consultas o
            reclamos. El tratamiento de datos abarca fines estadísticos de
            ventas, propuestas comerciales, perfiles de compra y campañas
            publicitarias. El Usuario es libre de retirar su consentimiento para
            el tratamiento de sus datos personales con fines de marketing.
            Covende se compromete a no compartir la información personal del
            Usuario con terceros sin su consentimiento, a menos que una
            autoridad estatal lo requiera. En cualquier caso, Covende actuará en
            estricto cumplimiento de la Ley. Covende utiliza las cookies para
            facilitar el acceso a nuestros servicios. Las “cookies” son pequeños
            archivos que permiten guardar la información sobre los datos y
            preferencias del Usuario. Esto permite mostrar al Usuario
            información personalizada. El Usuario declara estar conforme con la
            utilización de Cookies en el Sitio. El Usuario tiene pleno derecho
            de acceder a sus datos almacenados en el Sitio y solicitar su
            modificación. Hay datos que no podrán ser modificados sin previa
            coordinación con Covende, debido al riesgo de afectar el normal
            funcionamiento del Servicio. Los datos personales del Usuario serán
            almacenados mientras no se solicite su cancelación.
          </Typography>
        </ListItem>
        <ListItem>
          X. Atención al cliente
          <br />
          <Typography align='justify'>
            Tanto el Comprador como el Vendedor tienen a disposición un
            formulario para preguntas relacionas con su cuenta y los pedidos.
            ambos se comprometen a revisar cuidadosamente el Centro de ayuda
            para resolver sus interrogantes. En última instancia acudirán al
            formulario para ponerse en contacto con Covende, el cual se
            compromete a responder cada caso dentro de un plazo razonable.
            Además, pueden presentar sus quejas en el Libro de Reclamaciones en
            la sección Acerca de nosotros en nuestro Sitio.
          </Typography>
        </ListItem>
        <ListItem>
          XI. Sobre el Sitio
          <br />
          <Typography align='justify'>
            Las presentes condiciones regulan el acceso a los contenidos y a
            todos los servicios ofrecidos por Covende a través del Sitio.
            Covende realizará todos los esfuerzos para mantener el Sitio en
            correcto funcionamiento en la medida de lo razonable. Aun así,
            pueden surgir interrupciones temporales debido a actualizaciones,
            mantenimiento o pruebas. Covende se reserva el derecho de suspender
            o modificar funciones y características del Sitio por razones que la
            ley permita tales como: implementación de mejoras en ciencia y
            tecnología, mejorar la operabilidad, necesidad de reparación y/o
            mantenimiento o por exigencias legales. Covende notificará estas
            acciones siempre que sea posible. Sucesos como fallo del servicio de
            hosting, imposibilidad de acceso a redes de terceros o fallo de
            servidores pueden dejar inoperativo el Sitio. Dado que acaecen fuera
            del control razonable de Covende, este no será responsable de
            pérdida de información, daños indirectos y/o por lucro cesante.
            Quedan reservados todos los derechos de Propiedad Intelectual e
            Industrial sobre los contenidos y servicios de Covende. Está
            prohibida cualquier acción que intente copiar, transformar o
            distribuir los contenidos y servicios de Covende incluídos en el
            Sitio, ya sea de manera parcial o total, sin la autorización previa,
            expresa y escrita de Covende.
          </Typography>
        </ListItem>
        <ListItem>
          XII. Limitaciones de Covende
          <br />
          <Typography align='justify'>
            Es un Marketplace que conecta compradores y vendedores para la venta
            de productos dentro del territorio peruano. Las ventas se efectúan
            de manera directa entre el Vendedor y el Comprador, siendo el
            Vendedor el único responsable de la satisfacción del Comprador por
            la adquisición del producto. Covende no se responsabiliza por los
            datos personales proporcionados por el Comprador o Vendedor, son
            estos los que garantizan y responden, en cualquier caso, por la
            autenticidad y vigencia de los datos. Asimismo, Covende no tiene
            ninguna obligación ni responsabilidad ante los contenidos que el
            Vendedor publica sobre sus productos. Aunque Covende cuenta con
            procesos y herramientas para verificar la publicación de información
            verídica, el Vendedor es el único responsable de la información que
            proporciona. Covende ofrece los medios necesarios para la resolución
            de cualquier disputa entre el Comprador y el Vendedor, más no asume
            la responsabilidad ante el Comprador o el Vendedor por las malas
            prácticas a las que pueden incurrir cualquiera de ellos. En última
            instancia, depende del Vendedor resolver cualquier disputa vinculada
            a la venta. El Vendedor y el Comprador eximen a Covende a sus
            accionistas, gerentes, empleados, agentes, y representantes de toda
            responsabilidad relacionada con la venta de productos. Covende no
            asume la responsabilidad por los reclamos iniciados por otros
            usuarios, terceros o por cualquier Organismo, ante actividades del
            Vendedor o Comprador en el Sitio, incumplimiento de los Términos y
            Condiciones o por alguna violación de los derechos de terceros. El
            Vendedor y el Comprador aceptan indemnizar a Covende contra todos
            los daños, pérdidas y gastos que se generen por el incumplimiento de
            los Términos y Condiciones.
          </Typography>
        </ListItem>
        <ListItem>I. Aplicación y términos generales</ListItem>
      </List>
      <span color='#444' fontSize='sm'>
        ANEXO A
        <br />
        PRODUCTOS PROHIBIDOS
        <br />
        <Typography align='justify'>
          Está prohibida la venta de los siguientes productos: 1. Productos
          perecibles o refigerados. 2. Documentos de valor, vale y/o tarjetas de
          consumo. 3. Celulares bloqueados por robo o pérdida reportados por
          OSIPTEL, en cumplimiento al Decreto Legislativo N° 1338. Covende se
          reserva el derecho de notificar de inmediato a las autoridades
          competentes, siendo el Vendedor el único responsable de asumir todas
          las sanciones que sean imputables. 4. Drogas psicotrópicas, naturales,
          sintéticas; narcóticos, tranquilizantes, esteroides y otras sustancias
          controladas, incluyendo cualquier objeto relacionado con las
          mencionadas. 5. Explosivos, equipos de encendido y detonación
          relacionados, sustancias radiactivas y sustancias químicas tóxicas o
          venenosas. 6. Armas biológicas, químicas, nucleares, o cualquier otra
          Arma de Destrucción Masiva (ADM); armamento, munición, artefacto
          militar, armas de fuego, y/o cualquier parte o componente relacionado.
          La prohibición abarca cualquier servicio o producto para el proceso de
          fabricación de los mencionados. 7. Medicamentos con receta,
          psicotrópicos y narcóticos. Se prohíbe incluir o vender alimentos o
          suplementos que, administrados oralmente o ingeridos, potencien la
          actividad sexual. No se pueden incluir productos veterinarios con
          receta. Los miembros podrán publicar anuncios de medicamentos de venta
          libre en la Web Covende.com tras aportar a la Web el correspondiente
          permiso de producción y venta. Covende no permite la publicación de
          dispositivos médicos no autorizados. Los miembros solo podrán publicar
          anuncios de dispositivos médicos autorizados tras aportar a la Web el
          correspondiente permiso de producción y venta. 8. Material
          pornográfico, Se prohíben terminantemente los artículos que
          representen o sugieran zoofilia, violación, incesto o sexo con
          violencia o degradación gráfica, y cualquier artículo que represente o
          sugiera sexo que implique a menores de edad. Aunque los juguetes
          sexuales y otros productos relacionados pueden ser incluidos, las
          descripciones de los productos no pueden contener imágenes de desnudos
          o imágenes que de cualquier otra forma sean sexualmente explícitas. 9.
          Quedan prohibidos los decodificadores y otros artículos que puedan
          utilizarse para obtener acceso no autorizado a programas de televisión
          (como televisión por satélite y por cable), acceso a Internet,
          teléfono, datos u otros servicios protegidos, restringidos o premium.
          Algunos ejemplos de artículos no permitidos incluyen tarjetas
          inteligentes y programadores de tarjetas, decodificadores, emuladores
          DSS y software de piratería. Se prohíben los dispositivos diseñados
          para bloquear, sobrecargar o interferir intencionalmente las
          comunicaciones de radio autorizadas, como servicios de comunicación
          móvil y personal, radares policiales, sistemas de posicionamiento
          global (GPS) y servicios de redes inalámbricas (Wi-Fi). No se permite
          la inclusión o venta en la Web de equipos de espionaje y de aparatos
          utilizados para la interceptación de comunicaciones por cable,
          verbales y electrónicas. Está prohibido incluir lectores de tarjetas
          bancarias y “skimmers” 10. Covende prohíbe estrictamente la compra y
          venta de divisas, monedas, billetes de banco, acciones, bonos, giros
          postales, tarjetas de crédito y de débito, intereses en inversiones.
          11. Covende. prohíbe la publicación de partes del cuerpo humano y
          restos humanos. 12. Productos usados: No se podrán vender prendas
          interiores usadas y cosméticos usados. Se pueden incluir otras prendas
          de vestir usadas, siempre y cuando la ropa haya sido limpiada a fondo.
          13. Queda prohibida la publicación o venta de propiedad robada o
          tomada sin la autorización correspondiente. Cualquier intento de venta
          de los productos mencionados puede resultar en el bloqueo o suspensión
          permanente de la cuenta del Vendedor.
        </Typography>
        <br />
        <br />
        ANEXO B
        <br />
        CALIFICACIÓN DEL VENDEDOR
        <br />
        tabla
        <br />
        <br />
        ANEXO C
        <br />
        Lista de productos que no permiten devolución
        <br />
      </span>
      <UnorderedList>
        <ListItem>
          Vitaminas, suplementos alimenticios y /o productos naturales
        </ListItem>
        <ListItem>Libros (sólo en casos de error de impresión)</ListItem>
        <ListItem>Ropa Interior</ListItem>
        <ListItem>Ropa de baño</ListItem>
        <ListItem>Modeladores / Fajas</ListItem>
        <ListItem>Panty-medias</ListItem>
        <ListItem>Productos de lactancia o alimentación para bebés</ListItem>
        <ListItem>Bisutería y perfumes</ListItem>
        <ListItem>Tarjetas de memoria para PC</ListItem>
        <ListItem>Colchones</ListItem>
        <ListItem>Consumibles</ListItem>
        <ListItem>Termómetros</ListItem>
        <ListItem>
          Productos de copia inmediata (CD, DVD,Software, Videojuegos)
        </ListItem>
        <ListItem>Disfraces (sólo aplica por cambio de talla)</ListItem>
        <ListItem>
          Cosméticos y Perfumes (sólo si el producto está sellado)
        </ListItem>
        <ListItem>Perecibles</ListItem>
      </UnorderedList>
    </>
  );
};

export default TermV2;
