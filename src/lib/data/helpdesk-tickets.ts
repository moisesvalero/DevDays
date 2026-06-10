import type { HelpdeskModule, HelpdeskTicket } from '$lib/types/helpdesk';

export const moduleLabels: Record<HelpdeskModule, string> = {
	identidad: 'Identidad y acceso',
	red: 'Red y conectividad',
	correo: 'Correo y colaboración',
	impresion: 'Impresión',
	sistema: 'Sistema Windows',
	perifericos: 'Periféricos',
	seguridad: 'Seguridad'
};

export const helpdeskTickets: HelpdeskTicket[] = [
	{
		ticketId: 'HD-001',
		module: 'identidad',
		difficulty: 'suave',
		estimatedMinutes: 12,
		title: 'Contraseña caducada',
		userMessage:
			'Buenos días, no puedo entrar en el ordenador. Dice que mi contraseña ha expirado y tengo una reunión en 15 minutos.',
		environment: ['Windows 11 Empresa', 'Usuario de dominio', 'MFA activo', 'Portátil corporativo'],
		symptoms: [
			'El inicio de sesión muestra contraseña expirada',
			'El usuario recuerda la clave actual'
		],
		actions: [
			{
				id: 'confirmar-identidad',
				type: 'pregunta',
				label: 'Confirmar identidad del usuario',
				result: 'El usuario confirma nombre, departamento y teléfono registrado.'
			},
			{
				id: 'revisar-caducidad',
				type: 'configuracion',
				label: 'Revisar estado de la cuenta en el directorio',
				result: 'La cuenta está activa y solo aparece la contraseña caducada.'
			},
			{
				id: 'guiar-cambio',
				type: 'configuracion',
				label: 'Guiar cambio de contraseña desde pantalla de Windows',
				result: 'Windows permite crear una contraseña nueva cumpliendo la política.'
			},
			{
				id: 'desactivar-mfa',
				type: 'seguridad',
				label: 'Desactivar MFA temporalmente',
				result: 'No procede: MFA no bloquea este caso y no debe desactivarse sin causa.'
			}
		],
		requiredActionIds: ['confirmar-identidad', 'revisar-caducidad', 'guiar-cambio'],
		expectedDiagnosis: {
			summary: 'La cuenta está activa y el bloqueo se debe a contraseña caducada.',
			keywords: ['contraseña caducada', 'cuenta activa', 'expirada']
		},
		expectedSolution: {
			summary: 'Verificar identidad, guiar cambio de contraseña y pedir nuevo inicio de sesión.',
			keywords: ['verificar identidad', 'cambiar contraseña', 'iniciar sesión']
		},
		escalation: {
			required: false,
			when: 'Solo escalar si el directorio no permite el cambio o hay sospecha de compromiso.',
			reason: 'Es una resolución estándar de nivel 1.'
		},
		mentorHints: [
			'Primero confirma que hablas con la persona correcta.',
			'No desactives controles de seguridad si no son la causa.',
			'El cierre debe dejar claro que el usuario puede iniciar sesión de nuevo.'
		],
		closureCue: 'Acceso recuperado sin tocar MFA.'
	},
	{
		ticketId: 'HD-002',
		module: 'identidad',
		difficulty: 'suave',
		estimatedMinutes: 10,
		title: 'Cuenta bloqueada por intentos',
		userMessage:
			'He probado varias veces y ahora el portal me dice que mi cuenta está bloqueada. Creo que me equivoqué con la contraseña.',
		environment: ['Microsoft 365', 'Active Directory', 'Usuario remoto'],
		symptoms: ['Bloqueo tras varios intentos', 'No hay aviso de actividad sospechosa'],
		actions: [
			{
				id: 'validar-usuario',
				type: 'pregunta',
				label: 'Validar identidad y teléfono de contacto',
				result: 'La identidad coincide con los datos registrados.'
			},
			{
				id: 'comprobar-bloqueo',
				type: 'configuracion',
				label: 'Comprobar estado de bloqueo',
				result: 'La cuenta está bloqueada por cinco intentos fallidos.'
			},
			{
				id: 'desbloquear-cuenta',
				type: 'configuracion',
				label: 'Desbloquear cuenta',
				result: 'La cuenta queda desbloqueada.'
			},
			{
				id: 'reiniciar-router',
				type: 'fisico',
				label: 'Pedir reinicio del router',
				result: 'No cambia el estado de una cuenta bloqueada.'
			}
		],
		requiredActionIds: ['validar-usuario', 'comprobar-bloqueo', 'desbloquear-cuenta'],
		expectedDiagnosis: {
			summary: 'Bloqueo automático por intentos fallidos, sin indicios de ataque.',
			keywords: ['bloqueada', 'intentos fallidos', 'sin indicios']
		},
		expectedSolution: {
			summary: 'Validar identidad, desbloquear la cuenta y recomendar usar la contraseña correcta.',
			keywords: ['validar identidad', 'desbloquear', 'contraseña correcta']
		},
		escalation: {
			required: false,
			when: 'Escalar si aparecen inicios desde ubicaciones extrañas o bloqueo repetido inmediato.',
			reason: 'El desbloqueo estándar es tarea de nivel 1.'
		},
		mentorHints: [
			'Un desbloqueo siempre empieza por identidad.',
			'No reinicies cosas de red si el síntoma es de autenticación.',
			'Una recomendación final evita que el ticket vuelva en diez minutos.'
		],
		closureCue: 'Cuenta desbloqueada y usuario informado.'
	},
	{
		ticketId: 'HD-003',
		module: 'red',
		difficulty: 'media',
		estimatedMinutes: 18,
		title: 'Wi-Fi conectado sin Internet',
		userMessage:
			'Estoy conectado al Wi-Fi de la oficina, pero no me abre ninguna web. A mis compañeros sí les funciona.',
		environment: ['Windows 11', 'Wi-Fi corporativo', 'DHCP automático'],
		symptoms: ['Wi-Fi conectado', 'Sin navegación', 'Afecta solo a un equipo'],
		actions: [
			{
				id: 'comparar-alcance',
				type: 'pregunta',
				label: 'Comprobar si afecta a más usuarios',
				result: 'Solo falla este portátil.'
			},
			{
				id: 'ipconfig',
				type: 'comando',
				label: 'Ejecutar ipconfig',
				result: 'El equipo tiene IP 169.254.x.x, sin puerta de enlace.'
			},
			{
				id: 'renovar-dhcp',
				type: 'comando',
				label: 'Renovar DHCP',
				result: 'Tras renovar obtiene IP corporativa, puerta de enlace y DNS.'
			},
			{
				id: 'borrar-perfil',
				type: 'configuracion',
				label: 'Borrar perfil Wi-Fi',
				result: 'Es más invasivo; puede usarse si renovar DHCP no funciona.'
			}
		],
		requiredActionIds: ['comparar-alcance', 'ipconfig', 'renovar-dhcp'],
		expectedDiagnosis: {
			summary: 'El equipo no recibió configuración DHCP válida y quedó con IP APIPA.',
			keywords: ['dhcp', '169.254', 'apipa']
		},
		expectedSolution: {
			summary: 'Renovar DHCP, confirmar IP/gateway/DNS y probar navegación.',
			keywords: ['renovar dhcp', 'puerta de enlace', 'probar navegación']
		},
		escalation: {
			required: false,
			when: 'Escalar si varios usuarios fallan o el equipo no obtiene IP tras renovar.',
			reason: 'La renovación DHCP de un equipo aislado entra en nivel 1.'
		},
		mentorHints: [
			'Si solo falla una persona, empieza por su equipo.',
			'Una IP 169.254 suele señalar que DHCP no entregó configuración.',
			'No cierres sin probar navegación después del cambio.'
		],
		closureCue: 'Conectividad restaurada con DHCP renovado.'
	},
	{
		ticketId: 'HD-004',
		module: 'red',
		difficulty: 'media',
		estimatedMinutes: 18,
		title: 'DNS no resuelve nombres',
		userMessage:
			'Puedo entrar a una aplicación por IP, pero si pongo el nombre no carga. Me pasa desde esta mañana.',
		environment: ['Windows 10', 'Ethernet', 'DNS corporativo'],
		symptoms: ['Conectividad por IP', 'Fallan nombres internos y web', 'Cable conectado'],
		actions: [
			{
				id: 'ping-ip',
				type: 'comando',
				label: 'Probar ping a una IP conocida',
				result: 'La IP responde correctamente.'
			},
			{
				id: 'nslookup',
				type: 'comando',
				label: 'Ejecutar nslookup',
				result: 'El servidor DNS configurado no responde.'
			},
			{
				id: 'revisar-dns',
				type: 'configuracion',
				label: 'Revisar DNS configurado',
				result: 'Hay un DNS manual antiguo en la tarjeta de red.'
			},
			{
				id: 'cambiar-monitor',
				type: 'fisico',
				label: 'Cambiar monitor del puesto',
				result: 'No tiene relación con resolución de nombres.'
			}
		],
		requiredActionIds: ['ping-ip', 'nslookup', 'revisar-dns'],
		expectedDiagnosis: {
			summary: 'La red funciona por IP, pero DNS está mal configurado.',
			keywords: ['dns', 'ip funciona', 'mal configurado']
		},
		expectedSolution: {
			summary: 'Quitar DNS manual, dejar DNS corporativo por DHCP y probar resolución.',
			keywords: ['quitar dns manual', 'dhcp', 'probar resolución']
		},
		escalation: {
			required: false,
			when: 'Escalar si el DNS corporativo falla para varios usuarios.',
			reason: 'Corregir DNS local de un equipo es nivel 1.'
		},
		mentorHints: [
			'Si la IP responde, no estás ante una caída total de red.',
			'nslookup te separa red de nombres.',
			'La solución debe restaurar la configuración corporativa.'
		],
		closureCue: 'Resolución DNS corregida.'
	},
	{
		ticketId: 'HD-005',
		module: 'red',
		difficulty: 'media',
		estimatedMinutes: 20,
		title: 'VPN conecta pero no abre recursos',
		userMessage:
			'La VPN aparece conectada, pero no puedo abrir las carpetas de la empresa ni la intranet.',
		environment: ['Portátil remoto', 'VPN corporativa', 'Windows 11'],
		symptoms: ['VPN conectada', 'Recursos internos inaccesibles', 'Internet general funciona'],
		actions: [
			{
				id: 'confirmar-vpn',
				type: 'configuracion',
				label: 'Confirmar estado y perfil de VPN',
				result: 'La VPN está conectada con el perfil correcto.'
			},
			{
				id: 'ping-interno',
				type: 'comando',
				label: 'Probar ping a recurso interno',
				result: 'No responde por nombre ni por IP interna.'
			},
			{
				id: 'revisar-rutas',
				type: 'comando',
				label: 'Revisar rutas de red',
				result: 'No aparece la ruta corporativa de la VPN.'
			},
			{
				id: 'actualizar-cliente',
				type: 'configuracion',
				label: 'Reiniciar cliente VPN y aplicar actualización pendiente',
				result: 'Tras reiniciar el cliente aparece la ruta corporativa.'
			}
		],
		requiredActionIds: ['confirmar-vpn', 'ping-interno', 'revisar-rutas', 'actualizar-cliente'],
		expectedDiagnosis: {
			summary:
				'La VPN autentica, pero no inyecta la ruta interna hasta reiniciar/actualizar cliente.',
			keywords: ['vpn', 'ruta', 'cliente']
		},
		expectedSolution: {
			summary:
				'Reiniciar o actualizar cliente VPN, reconectar y validar acceso a intranet/carpetas.',
			keywords: ['reiniciar cliente', 'reconectar', 'validar acceso']
		},
		escalation: {
			required: false,
			when: 'Escalar si las rutas no aparecen tras reinstalar o afecta a varios usuarios.',
			reason: 'Diagnóstico básico del cliente VPN es nivel 1.'
		},
		mentorHints: [
			'Conectado no siempre significa enrutable.',
			'Distingue Internet público de recursos internos.',
			'Valida con una carpeta o intranet antes de cerrar.'
		],
		closureCue: 'VPN con rutas internas operativas.'
	},
	{
		ticketId: 'HD-006',
		module: 'impresion',
		difficulty: 'suave',
		estimatedMinutes: 14,
		title: 'Impresora en pausa',
		userMessage:
			'La impresora de recepción no imprime mis documentos, pero no sale ningún error claro.',
		environment: ['Windows 10', 'Impresora compartida', 'Cola de impresión'],
		symptoms: ['Trabajos pendientes', 'Otros usuarios imprimieron antes', 'Sin atasco visible'],
		actions: [
			{
				id: 'revisar-cola',
				type: 'configuracion',
				label: 'Revisar cola de impresión',
				result: 'La cola está en estado Pausada.'
			},
			{
				id: 'reanudar-cola',
				type: 'configuracion',
				label: 'Reanudar la cola',
				result: 'Los trabajos empiezan a salir.'
			},
			{
				id: 'pagina-prueba',
				type: 'configuracion',
				label: 'Enviar página de prueba',
				result: 'La página de prueba imprime correctamente.'
			},
			{
				id: 'cambiar-toner',
				type: 'fisico',
				label: 'Cambiar tóner',
				result: 'No es necesario: no hay aviso de consumible.'
			}
		],
		requiredActionIds: ['revisar-cola', 'reanudar-cola', 'pagina-prueba'],
		expectedDiagnosis: {
			summary: 'La cola estaba pausada, no era una avería física.',
			keywords: ['cola', 'pausada', 'no física']
		},
		expectedSolution: {
			summary:
				'Reanudar cola, imprimir prueba y pedir al usuario reenviar si falta algún documento.',
			keywords: ['reanudar', 'página de prueba', 'reenviar']
		},
		escalation: {
			required: false,
			when: 'Escalar si la cola vuelve a pausarse o el servidor de impresión falla.',
			reason: 'Reanudar cola y probar impresión es nivel 1.'
		},
		mentorHints: [
			'La cola es el primer sitio donde mirar.',
			'No cambies consumibles sin evidencia.',
			'Una página de prueba confirma el cierre.'
		],
		closureCue: 'Impresión recuperada.'
	},
	{
		ticketId: 'HD-007',
		module: 'correo',
		difficulty: 'media',
		estimatedMinutes: 16,
		title: 'Outlook sin enviar correos',
		userMessage:
			'Outlook recibe correos, pero los mensajes que envío se quedan en bandeja de salida.',
		environment: ['Outlook Microsoft 365', 'Windows 11', 'Correo corporativo'],
		symptoms: ['Recibe correo', 'Envíos atascados', 'Webmail funciona'],
		actions: [
			{
				id: 'probar-webmail',
				type: 'configuracion',
				label: 'Probar envío desde webmail',
				result: 'Desde webmail el envío funciona.'
			},
			{
				id: 'modo-sin-conexion',
				type: 'configuracion',
				label: 'Revisar modo sin conexión de Outlook',
				result: 'Outlook tiene activado Trabajar sin conexión.'
			},
			{
				id: 'desactivar-offline',
				type: 'configuracion',
				label: 'Desactivar modo sin conexión',
				result: 'La bandeja de salida se vacía y los mensajes se envían.'
			},
			{
				id: 'crear-buzon',
				type: 'configuracion',
				label: 'Crear un buzón nuevo',
				result: 'No procede: la cuenta funciona en webmail.'
			}
		],
		requiredActionIds: ['probar-webmail', 'modo-sin-conexion', 'desactivar-offline'],
		expectedDiagnosis: {
			summary: 'Outlook estaba en modo sin conexión; el servicio de correo funciona.',
			keywords: ['outlook', 'sin conexión', 'webmail funciona']
		},
		expectedSolution: {
			summary: 'Desactivar modo sin conexión, enviar/recibir y verificar salida de mensajes.',
			keywords: ['desactivar', 'enviar recibir', 'verificar']
		},
		escalation: {
			required: false,
			when: 'Escalar si webmail tampoco envía o hay error de licencia/servidor.',
			reason: 'La opción local de Outlook se resuelve en nivel 1.'
		},
		mentorHints: [
			'Webmail te dice si el problema es del servicio o del cliente.',
			'Bandeja de salida atascada suele pedir revisar estado de Outlook.',
			'El cierre debe confirmar que el correo salió.'
		],
		closureCue: 'Outlook vuelve a enviar.'
	},
	{
		ticketId: 'HD-008',
		module: 'correo',
		difficulty: 'suave',
		estimatedMinutes: 12,
		title: 'Teams sin micrófono',
		userMessage:
			'En Teams me oyen muy bajo o no me oyen. En la reunión aparece el micrófono, pero no recoge voz.',
		environment: ['Teams', 'Windows 11', 'Auriculares USB'],
		symptoms: ['Teams abre correctamente', 'Micrófono visible', 'Audio de entrada falla'],
		actions: [
			{
				id: 'probar-grabadora',
				type: 'configuracion',
				label: 'Probar micrófono en Grabadora de voz',
				result: 'Windows graba con el micrófono del portátil, no con los auriculares.'
			},
			{
				id: 'revisar-dispositivo-teams',
				type: 'configuracion',
				label: 'Revisar dispositivo de entrada en Teams',
				result: 'Teams tiene seleccionado un micrófono incorrecto.'
			},
			{
				id: 'seleccionar-usb',
				type: 'configuracion',
				label: 'Seleccionar auriculares USB como entrada',
				result: 'La prueba de llamada ya recoge voz correctamente.'
			},
			{
				id: 'borrar-cuenta',
				type: 'seguridad',
				label: 'Borrar cuenta de Teams',
				result: 'No procede para un problema de dispositivo de audio.'
			}
		],
		requiredActionIds: ['probar-grabadora', 'revisar-dispositivo-teams', 'seleccionar-usb'],
		expectedDiagnosis: {
			summary: 'Teams usaba el dispositivo de entrada incorrecto.',
			keywords: ['teams', 'micrófono incorrecto', 'entrada']
		},
		expectedSolution: {
			summary: 'Seleccionar el micrófono correcto y validar con prueba de llamada.',
			keywords: ['seleccionar', 'micrófono correcto', 'prueba de llamada']
		},
		escalation: {
			required: false,
			when: 'Escalar si Windows no detecta ningún micrófono o falla el controlador.',
			reason: 'Cambiar dispositivo de entrada en Teams es nivel 1.'
		},
		mentorHints: [
			'Prueba fuera de Teams para aislar aplicación frente a sistema.',
			'El dispositivo seleccionado importa más que que aparezca un icono.',
			'Cierra con una prueba de llamada, no solo con el cambio.'
		],
		closureCue: 'Micrófono correcto seleccionado.'
	},
	{
		ticketId: 'HD-009',
		module: 'sistema',
		difficulty: 'media',
		estimatedMinutes: 20,
		title: 'Equipo muy lento',
		userMessage:
			'El ordenador tarda muchísimo en abrir cualquier cosa desde ayer. Necesito trabajar con el ERP.',
		environment: ['Windows 11', 'Portátil con SSD', 'Usuario estándar'],
		symptoms: ['Lentitud general', 'Sin pantallazos', 'Ayer funcionaba bien'],
		actions: [
			{
				id: 'administrador-tareas',
				type: 'configuracion',
				label: 'Revisar Administrador de tareas',
				result: 'CPU normal, disco al 100% durante mucho tiempo.'
			},
			{
				id: 'espacio-disco',
				type: 'configuracion',
				label: 'Comprobar espacio libre',
				result: 'Quedan 600 MB libres en C:.'
			},
			{
				id: 'limpieza-temporales',
				type: 'configuracion',
				label: 'Liberar temporales y papelera',
				result: 'Se liberan 8 GB y el disco deja de estar al 100%.'
			},
			{
				id: 'cambiar-placa',
				type: 'fisico',
				label: 'Cambiar placa base',
				result: 'No hay evidencia de fallo físico.'
			}
		],
		requiredActionIds: ['administrador-tareas', 'espacio-disco', 'limpieza-temporales'],
		expectedDiagnosis: {
			summary: 'La lentitud se debe a falta crítica de espacio en disco.',
			keywords: ['espacio', 'disco', '600 mb']
		},
		expectedSolution: {
			summary:
				'Liberar temporales/papelera, confirmar espacio y recomendar mover archivos pesados.',
			keywords: ['liberar', 'temporales', 'espacio']
		},
		escalation: {
			required: false,
			when: 'Escalar si el disco sigue al 100% con espacio libre suficiente o hay errores SMART.',
			reason: 'Limpieza básica y comprobación inicial son nivel 1.'
		},
		mentorHints: [
			'Mide antes de actuar: CPU, memoria y disco.',
			'Menos de 1 GB libre puede hundir Windows.',
			'La recomendación evita que vuelva el mismo ticket.'
		],
		closureCue: 'Equipo usable tras liberar espacio.'
	},
	{
		ticketId: 'HD-010',
		module: 'sistema',
		difficulty: 'suave',
		estimatedMinutes: 12,
		title: 'Actualización pendiente reinicia fuera de horario',
		userMessage:
			'Me sale todo el rato que hay que reiniciar por actualizaciones. No quiero que se reinicie en plena llamada.',
		environment: ['Windows Update', 'Política corporativa', 'Portátil'],
		symptoms: ['Reinicio pendiente', 'Usuario en jornada laboral', 'No hay error de actualización'],
		actions: [
			{
				id: 'revisar-update',
				type: 'configuracion',
				label: 'Revisar estado de Windows Update',
				result: 'Hay reinicio pendiente para completar parches.'
			},
			{
				id: 'acordar-hora',
				type: 'pregunta',
				label: 'Acordar ventana segura con el usuario',
				result: 'El usuario puede reiniciar a las 14:30.'
			},
			{
				id: 'programar-reinicio',
				type: 'configuracion',
				label: 'Programar o guiar reinicio',
				result: 'El reinicio queda programado y se completan actualizaciones.'
			},
			{
				id: 'desactivar-updates',
				type: 'seguridad',
				label: 'Desactivar actualizaciones',
				result: 'No procede: rompe la política de seguridad.'
			}
		],
		requiredActionIds: ['revisar-update', 'acordar-hora', 'programar-reinicio'],
		expectedDiagnosis: {
			summary: 'Windows necesita reiniciar para completar actualizaciones corporativas.',
			keywords: ['reinicio pendiente', 'actualizaciones', 'parches']
		},
		expectedSolution: {
			summary: 'Acordar una ventana, reiniciar y confirmar que no quedan parches pendientes.',
			keywords: ['acordar', 'reiniciar', 'confirmar']
		},
		escalation: {
			required: false,
			when: 'Escalar si la actualización falla repetidamente.',
			reason: 'Programar reinicio pendiente es nivel 1.'
		},
		mentorHints: [
			'No desactives seguridad para evitar una molestia.',
			'Coordina el cambio con el usuario.',
			'Comprueba el estado tras reiniciar.'
		],
		closureCue: 'Actualización completada con ventana acordada.'
	},
	{
		ticketId: 'HD-011',
		module: 'sistema',
		difficulty: 'media',
		estimatedMinutes: 18,
		title: 'Sin acceso a carpeta compartida',
		userMessage:
			'Me han cambiado de equipo y ahora no puedo entrar a la carpeta del departamento de Finanzas.',
		environment: ['Windows 11', 'Servidor de archivos', 'Grupos de AD'],
		symptoms: [
			'Acceso denegado',
			'Otros compañeros acceden',
			'Usuario cambió de departamento hace poco'
		],
		actions: [
			{
				id: 'confirmar-ruta',
				type: 'pregunta',
				label: 'Confirmar ruta exacta y mensaje',
				result: 'La ruta es correcta y aparece Acceso denegado.'
			},
			{
				id: 'revisar-grupo',
				type: 'configuracion',
				label: 'Revisar pertenencia a grupo de permisos',
				result: 'El usuario no está en el grupo Finanzas-RW.'
			},
			{
				id: 'comprobar-solicitud',
				type: 'seguridad',
				label: 'Comprobar solicitud o aprobación del responsable',
				result: 'No consta aprobación formal del responsable.'
			},
			{
				id: 'dar-permiso-directo',
				type: 'seguridad',
				label: 'Dar permiso directo al usuario',
				result: 'No debe hacerse sin aprobación ni fuera del grupo.'
			}
		],
		requiredActionIds: ['confirmar-ruta', 'revisar-grupo', 'comprobar-solicitud'],
		expectedDiagnosis: {
			summary: 'El usuario no pertenece al grupo autorizado y falta aprobación.',
			keywords: ['grupo', 'aprobación', 'permisos']
		},
		expectedSolution: {
			summary:
				'No conceder permiso directo; pedir aprobación y escalar/derivar la solicitud de acceso.',
			keywords: ['no conceder', 'aprobación', 'solicitud de acceso']
		},
		escalation: {
			required: true,
			when: 'Se requiere alta en grupo de permisos con aprobación del responsable.',
			reason: 'Nivel 1 no debe conceder acceso a datos sensibles sin flujo de autorización.'
		},
		mentorHints: [
			'Acceso denegado no se arregla saltándose permisos.',
			'Finanzas implica datos sensibles.',
			'La respuesta correcta puede ser escalar, no resolver.'
		],
		closureCue: 'Solicitud escalada con datos completos.'
	},
	{
		ticketId: 'HD-012',
		module: 'perifericos',
		difficulty: 'suave',
		estimatedMinutes: 10,
		title: 'Teclado USB no responde',
		userMessage: 'El teclado no escribe nada desde que he movido el puesto. El ratón sí funciona.',
		environment: ['Sobremesa Windows', 'Teclado USB', 'Puesto de oficina'],
		symptoms: ['Teclado sin respuesta', 'Ratón operativo', 'Cambio físico reciente'],
		actions: [
			{
				id: 'probar-puerto',
				type: 'fisico',
				label: 'Probar otro puerto USB',
				result: 'En otro puerto el teclado funciona.'
			},
			{
				id: 'revisar-admin-dispositivos',
				type: 'configuracion',
				label: 'Revisar Administrador de dispositivos',
				result: 'No hay error de controlador cuando se conecta al puerto correcto.'
			},
			{
				id: 'marcar-puerto',
				type: 'fisico',
				label: 'Marcar puerto defectuoso para revisión',
				result: 'El puerto frontal queda identificado como defectuoso.'
			},
			{
				id: 'formatear-equipo',
				type: 'configuracion',
				label: 'Formatear equipo',
				result: 'No procede para una incidencia física simple.'
			}
		],
		requiredActionIds: ['probar-puerto', 'revisar-admin-dispositivos', 'marcar-puerto'],
		expectedDiagnosis: {
			summary: 'El teclado está bien; falla un puerto USB del equipo.',
			keywords: ['puerto usb', 'teclado funciona', 'defectuoso']
		},
		expectedSolution: {
			summary: 'Conectar a puerto operativo y registrar revisión del puerto defectuoso.',
			keywords: ['puerto operativo', 'registrar', 'defectuoso']
		},
		escalation: {
			required: false,
			when: 'Escalar a soporte de campo si hay que reparar el puerto físico.',
			reason: 'La recuperación de servicio cambiando puerto es nivel 1.'
		},
		mentorHints: [
			'Después de mover un puesto, piensa en conexiones físicas.',
			'Prueba simple antes que cambios de software.',
			'Puedes cerrar el servicio y dejar nota del puerto.'
		],
		closureCue: 'Teclado funcionando en puerto operativo.'
	},
	{
		ticketId: 'HD-013',
		module: 'seguridad',
		difficulty: 'reto',
		estimatedMinutes: 20,
		title: 'Correo sospechoso de phishing',
		userMessage:
			'Me ha llegado un correo de “Microsoft” pidiendo validar mi contraseña hoy. Tiene un enlace raro, ¿lo abro?',
		environment: ['Microsoft 365', 'Filtro antiphishing', 'Usuario final'],
		symptoms: ['Urgencia en el mensaje', 'Enlace externo', 'Pide contraseña'],
		actions: [
			{
				id: 'pedir-no-click',
				type: 'seguridad',
				label: 'Indicar que no pulse el enlace',
				result: 'El usuario confirma que no ha hecho clic.'
			},
			{
				id: 'revisar-cabeceras',
				type: 'seguridad',
				label: 'Revisar remitente/enlace sin abrirlo',
				result: 'El dominio real no pertenece a Microsoft ni a la empresa.'
			},
			{
				id: 'reportar-seguridad',
				type: 'seguridad',
				label: 'Reportar al canal de seguridad',
				result: 'El correo se envía para análisis y posible bloqueo.'
			},
			{
				id: 'abrir-enlace',
				type: 'seguridad',
				label: 'Abrir enlace para comprobar',
				result: 'Mala práctica: aumenta el riesgo.'
			}
		],
		requiredActionIds: ['pedir-no-click', 'revisar-cabeceras', 'reportar-seguridad'],
		expectedDiagnosis: {
			summary: 'Correo de phishing probable por urgencia, enlace externo y petición de contraseña.',
			keywords: ['phishing', 'enlace externo', 'contraseña']
		},
		expectedSolution: {
			summary: 'No abrir enlace, reportar a seguridad y borrar/aislar según procedimiento.',
			keywords: ['no abrir', 'reportar', 'seguridad']
		},
		escalation: {
			required: true,
			when: 'Todo phishing debe reportarse al equipo/canal de seguridad.',
			reason: 'Nivel 1 contiene el riesgo, pero seguridad decide bloqueo y alcance.'
		},
		mentorHints: [
			'No investigues phishing haciendo clic.',
			'La urgencia y pedir contraseña son señales rojas.',
			'Este caso se escala aunque hayas ayudado al usuario.'
		],
		closureCue: 'Phishing contenido y reportado.'
	},
	{
		ticketId: 'HD-014',
		module: 'seguridad',
		difficulty: 'reto',
		estimatedMinutes: 22,
		title: 'Posible malware tras descargar adjunto',
		userMessage:
			'Abrí un adjunto de un proveedor y ahora salen ventanas raras. He apagado el Wi-Fi por si acaso.',
		environment: ['Windows 11', 'Defender for Endpoint', 'Equipo corporativo'],
		symptoms: ['Ventanas emergentes', 'Adjunto reciente', 'Riesgo de compromiso'],
		actions: [
			{
				id: 'aislar-equipo',
				type: 'seguridad',
				label: 'Mantener equipo aislado de la red',
				result: 'El equipo sigue sin conexión de red.'
			},
			{
				id: 'recoger-datos',
				type: 'pregunta',
				label: 'Recoger hora, remitente y nombre del adjunto',
				result: 'El usuario aporta remitente, hora y archivo abierto.'
			},
			{
				id: 'revisar-defender',
				type: 'seguridad',
				label: 'Revisar alertas de Defender',
				result: 'Defender marca comportamiento sospechoso.'
			},
			{
				id: 'limpiar-manual',
				type: 'configuracion',
				label: 'Intentar borrar archivos manualmente',
				result: 'No procede antes de análisis de seguridad.'
			}
		],
		requiredActionIds: ['aislar-equipo', 'recoger-datos', 'revisar-defender'],
		expectedDiagnosis: {
			summary: 'Posible infección por adjunto malicioso con alerta de Defender.',
			keywords: ['malware', 'adjunto', 'defender']
		},
		expectedSolution: {
			summary: 'Mantener aislamiento, documentar evidencias y escalar a seguridad.',
			keywords: ['aislar', 'evidencias', 'escalar']
		},
		escalation: {
			required: true,
			when: 'Hay señales de malware en equipo corporativo.',
			reason: 'Nivel 1 debe contener y escalar, no limpiar sin procedimiento.'
		},
		mentorHints: [
			'Contener es más importante que “arreglar rápido”.',
			'Recoge datos antes de que se pierdan.',
			'No borres evidencias si seguridad debe investigar.'
		],
		closureCue: 'Equipo aislado y caso escalado.'
	},
	{
		ticketId: 'HD-015',
		module: 'impresion',
		difficulty: 'media',
		estimatedMinutes: 16,
		title: 'Impresora pide credenciales',
		userMessage:
			'Al imprimir en la multifunción me pide usuario y contraseña, pero ayer imprimía sin pedirme nada.',
		environment: ['Windows 11', 'Servidor de impresión', 'Multifunción departamental'],
		symptoms: [
			'Prompt de credenciales',
			'Usuario autenticado en dominio',
			'Cambio reciente de contraseña'
		],
		actions: [
			{
				id: 'confirmar-cambio-pass',
				type: 'pregunta',
				label: 'Preguntar si cambió la contraseña',
				result: 'El usuario cambió la contraseña esta mañana.'
			},
			{
				id: 'credenciales-guardadas',
				type: 'configuracion',
				label: 'Revisar credenciales guardadas de Windows',
				result: 'Hay una credencial antigua para el servidor de impresión.'
			},
			{
				id: 'eliminar-credencial',
				type: 'configuracion',
				label: 'Eliminar credencial antigua y reconectar impresora',
				result: 'Windows usa la sesión actual y la impresión funciona.'
			},
			{
				id: 'pedir-password',
				type: 'seguridad',
				label: 'Pedir la contraseña al usuario para probar',
				result: 'No se debe pedir ni conocer la contraseña del usuario.'
			}
		],
		requiredActionIds: ['confirmar-cambio-pass', 'credenciales-guardadas', 'eliminar-credencial'],
		expectedDiagnosis: {
			summary: 'Windows tenía una credencial antigua para el servidor de impresión.',
			keywords: ['credencial antigua', 'servidor de impresión', 'contraseña']
		},
		expectedSolution: {
			summary: 'Eliminar credencial guardada, reconectar y probar impresión sin pedir contraseña.',
			keywords: ['eliminar credencial', 'reconectar', 'sin pedir contraseña']
		},
		escalation: {
			required: false,
			when: 'Escalar si el servidor rechaza credenciales válidas para varios usuarios.',
			reason: 'Credenciales guardadas en un equipo se resuelven en nivel 1.'
		},
		mentorHints: [
			'Nunca pidas la contraseña al usuario.',
			'Un cambio de contraseña puede dejar credenciales antiguas guardadas.',
			'Valida imprimiendo una página o documento de prueba.'
		],
		closureCue: 'Impresión autenticada con sesión actual.'
	}
];

export function getTicketById(ticketId: string): HelpdeskTicket | undefined {
	return helpdeskTickets.find((ticket) => ticket.ticketId === ticketId);
}
