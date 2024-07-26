import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { groupBy } from 'lodash';
import { deleteAccount, getAccounts, getElements, insertAccount, updateAccount } from '../backend/accounts';
import { 
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    VStack,
    Center,
    Select,
    Grid,
    GridItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack,
    IconButton
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const Usuarios = () => {
    const { currentDB, loading } = useAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [usuarios, setUsuarios] = useState([]);
    const [perfiles, setPerfiles] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [selectedPerfil, setSelectedPerfil] = useState('');
    const [selectedModulo, setSelectedModulo] = useState('');
    const [permisosTabla, setPermisosTabla] = useState([]);
    const [nombreComercialFilter, setNombreComercialFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // States for form inputs
    const [nombreComercial, setNombreComercial] = useState('');
    const [nombreEmpresaBD, setNombreEmpresaBD] = useState('');
    const [tipoBD, setTipoBD] = useState('');
    const [ubicacionServidorBD, setUbicacionServidorBD] = useState('');
    const [ubicacionServidorPresentacion, setUbicacionServidorPresentacion] = useState('');
    const [linkPortalAcceso, setLinkPortalAcceso] = useState('');
    const [idUsuarioTenant, setIdUsuarioTenant] = useState('');
    const [claveUsuarioTenant, setClaveUsuarioTenant] = useState('');
    const [tipoLicencia, setTipoLicencia] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [estado, setEstado] = useState('');
    const [SL, setSL] = useState('');
    const [selectedId, setselectedId] = useState('');

    // State for selected user to modify
    const [selectedUser, setSelectedUser] = useState(null);

    const getUsuarios = async () => {
        try {
            const response = await getAccounts();
            setUsuarios(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const filteredUsuarios = nombreComercialFilter 
    ? usuarios.filter(usuario => usuario.NombreComercial.trim() === nombreComercialFilter.trim())
    : usuarios;
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsuarios.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
    
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const limpiarFormulario = () => {
                    // Limpiar formulario después de agregar
                    setNombreComercial('');
                    setNombreEmpresaBD('');
                    setTipoBD('');
                    setUbicacionServidorBD('');
                    setUbicacionServidorPresentacion('');
                    setLinkPortalAcceso('');
                    setIdUsuarioTenant('');
                    setClaveUsuarioTenant('');
                    setTipoLicencia('');
                    setNombreUsuario('');
                    setApellidos('');
                    setCorreoElectronico('');
                    setContrasena('');
                    setConfirmarContrasena('');
                    setEstado('');
                    setSL('');
                    setPermisosTabla([]);
    }

    const handleAddUsuario = async () => {
        try {
            // Check if passwords match
            if (contrasena !== confirmarContrasena) {
                Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
                return;
            }

            const newUsuarioData = {
                "account": {
                    nombreComercial,
                    nombreEmpresaBD,
                    tipoBD,
                    ubicacionServidorBD,
                    ubicacionServidorPresentacion,
                    linkPortalAcceso,
                    idUsuarioTenant,
                    claveUsuarioTenant,
                    tipoLicencia,
                    nombreUsuario,
                    apellidos,
                    correoElectronico,
                    contrasena,
                    confirmarContrasena,
                    SL,
                    estado,
                    permisos: permisosTabla.map(permiso => ({
                        idPerfil: permiso.idPerfil,
                        nombrePerfil: permiso.nombrePerfil,
                        idModulo: permiso.idModulo,
                        nombreModulo: permiso.nombreModulo,
                    })),
                }
            };

            if (nombreComercial === '' || nombreEmpresaBD === '' || tipoBD === '' || ubicacionServidorBD === '' || ubicacionServidorPresentacion === '' || linkPortalAcceso === '' || idUsuarioTenant === '' || claveUsuarioTenant === '' || tipoLicencia === '' || nombreUsuario === '' || apellidos === '' || correoElectronico === '' || contrasena === '' || confirmarContrasena === '' || estado === '') {
                Swal.fire('Error', 'Por favor, llena todos los campos', 'error');
                return;
            }

            if (permisosTabla.length === 0) {
                Swal.fire('Error', 'Por favor, asigna al menos un permiso', 'error');
                return;
            }

            await insertAccount(newUsuarioData);
            Swal.fire('Éxito', 'Usuario agregado correctamente', 'success');
            limpiarFormulario();

        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al agregar el usuario', 'error');
        }
    }

    const getPerfiles = async () => {
        try {
            const response = await getElements('perfiles');
            setPerfiles(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const getModulos = async () => {
        try {
            const response = await getElements('modulos');
            setModulos(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleAddPermiso = () => {
        if (selectedPerfil && selectedModulo) {
            const perfil = perfiles.find(p => p.ID === parseInt(selectedPerfil));
            const modulo = modulos.find(m => m.ID === parseInt(selectedModulo));
            const newPermiso = {
                idPerfil: selectedPerfil,
                nombrePerfil: perfil.NOMPERFIL,
                idModulo: selectedModulo,
                nombreModulo: modulo.MODULOS,
            };
            setPermisosTabla([...permisosTabla, newPermiso]);
            setSelectedPerfil('');
            setSelectedModulo('');
        } else {
            Swal.fire('Error', 'Por favor, selecciona un perfil y un módulo', 'error');
        }
    };

    useEffect(() => {
        getUsuarios();
        getPerfiles();
        getModulos();
    }, []);

    const filteredModulos = modulos.filter(modulo => {
        const perfil = perfiles.find(p => p.ID === parseInt(selectedPerfil));
        return perfil ? modulo.CATEGORIA === perfil.NOMPERFIL : true;
    });

    const uniqueNombreComercial = [...new Set(usuarios.map(usuario => usuario.NombreComercial))].filter(Boolean);





    const handleModifyClick = (usuario) => {
        setSelectedUser(usuario);
        setselectedId(usuario.UserID);
        setNombreComercial(usuario.NombreComercial);
        setNombreEmpresaBD(usuario.NombreBD);
        setTipoBD(usuario.TipoBD);
        setUbicacionServidorBD(usuario.UbicacionServidorBD);
        setUbicacionServidorPresentacion(usuario.UbicacionServidorPresentacion);
        setLinkPortalAcceso(usuario.LinkPortalAcceso);
        setIdUsuarioTenant(usuario.IDUsuarioTenant);
        setClaveUsuarioTenant(usuario.ClaveUsuarioTenant);
        setTipoLicencia(usuario.TipoLicencia);
        setNombreUsuario(usuario.FirstName);
        setApellidos(usuario.LastName);
        setCorreoElectronico(usuario.Email);
        setEstado(usuario.Status);
        setSL(usuario.SL);
        setPermisosTabla(usuario.UserPerfil && usuario.UserPerfil.map(permiso => ({
            idPerfil: permiso.IdPerfil,
            nombrePerfil: permiso.NOMPERFIL,
            idModulo: permiso.IdModulo,
            nombreModulo: permiso.MODULOS,
        })));
        onOpen();
    };

    const handleDeleteUsuario = async () => {
        try {
            await deleteAccount(selectedUser.UserID);
            Swal.fire('Éxito', 'Usuario eliminado correctamente', 'success');
            onClose();
            getUsuarios();
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al eliminar el usuario', 'error');

        }
    };

    const handleUpdateUsuario = async () => {
        try {
            updateAccount({account: {
                id: selectedUser.UserID,
                nombreComercial,
                nombreEmpresaBD,
                tipoBD,
                ubicacionServidorBD,
                ubicacionServidorPresentacion,
                linkPortalAcceso,
                idUsuarioTenant,
                claveUsuarioTenant,
                tipoLicencia,
                nombreUsuario,
                apellidos,
                SL,
                correoElectronico,
                estado,
                permisos: permisosTabla.map(permiso => ({
                    idPerfil: permiso.idPerfil,
                    nombrePerfil: permiso.nombrePerfil,
                    idModulo: permiso.idModulo,
                    nombreModulo: permiso.nombreModulo,
                })),
            }
            })
            Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
            onClose();
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al actualizar el usuario', 'error');
        }
    };

    const handleLimpiarPermisos = () => {
        setPermisosTabla([]);
    };


    return (
  
        <Center>
            <VStack spacing={4} w="full" maxW="800px">
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                    Bienvenido a la página de manejo de usuarios
                </Text>
                <FormControl>
                    <h1>Crear usuarios</h1>
                    <br />
                    <FormLabel>Información del usuario</FormLabel>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                            <FormLabel>Nombre Comercial de Empresa</FormLabel>
                            <Input 
                                type='text' 
                                placeholder='Nombre Comercial de empresa' 
                                value={nombreComercial} 
                                onChange={(e) => setNombreComercial(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Nombre de Empresa en BD</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Nombre de Empresa en BD" 
                                value={nombreEmpresaBD} 
                                onChange={(e) => setNombreEmpresaBD(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Tipo de BD</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Tipo de BD" 
                                value={tipoBD} 
                                onChange={(e) => setTipoBD(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Ubicación Servidor BD</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Ubicacion servidor BD" 
                                value={ubicacionServidorBD} 
                                onChange={(e) => setUbicacionServidorBD(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Ubicación Servidor de Presentación</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Ubicacion servidor de presentacion" 
                                value={ubicacionServidorPresentacion} 
                                onChange={(e) => setUbicacionServidorPresentacion(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Link Portal de Acceso</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Link portal de acceso" 
                                value={linkPortalAcceso} 
                                onChange={(e) => setLinkPortalAcceso(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>ID de Usuario Tenant</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="ID de usuario Tenant" 
                                value={idUsuarioTenant} 
                                onChange={(e) => setIdUsuarioTenant(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Clave Usuario Tenant</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Clave usuario Tenant" 
                                value={claveUsuarioTenant} 
                                onChange={(e) => setClaveUsuarioTenant(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Tipo de Licencia</FormLabel>
                            <Select
                                value={tipoLicencia}
                                onChange={(e) => setTipoLicencia(e.target.value)}
                                placeholder="Seleccione un tipo de licencia"
                            >
                                <option value="Profesional">Profesional</option>
                                <option value="CRM">CRM</option>
                                <option value="Indirect">Indirect</option>
                                <option value="Financiera">Financiera</option>
                                <option value="Logistiac">Logistica</option>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <FormLabel>Nombre Usuario</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Nombre usuario" 
                                value={nombreUsuario} 
                                onChange={(e) => setNombreUsuario(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Apellidos</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Apellidos" 
                                value={apellidos} 
                                onChange={(e) => setApellidos(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <Input 
                                type="email" 
                                placeholder="Correo Electrónico" 
                                value={correoElectronico} 
                                onChange={(e) => setCorreoElectronico(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Contraseña</FormLabel>
                            <Input 
                                type="password" 
                                placeholder="Contraseña" 
                                value={contrasena} 
                                onChange={(e) => setContrasena(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Confirmar Contraseña</FormLabel>
                            <Input 
                                type="password" 
                                placeholder="Confirmar Contraseña" 
                                value={confirmarContrasena} 
                                onChange={(e) => setConfirmarContrasena(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Estado</FormLabel>
                            <Select 
                                value={estado} 
                                onChange={(e) => setEstado(e.target.value)}
                                placeholder="Seleccione el estado"
                            >
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <FormLabel>SL</FormLabel>
                            <Input
                                type="text"
                                placeholder="SL"
                                value={SL}
                                onChange={(e) => setSL(e.target.value)}
                            />
                        </GridItem>
                    </Grid>
                    <br />
                    <FormLabel>Asignar permisos</FormLabel>
                    <Button colorScheme="red" style={{marginBottom:"15px"}} onClick={handleLimpiarPermisos}>
                        Limpiar permisos
                    </Button>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                            <Select 
                                value={selectedPerfil} 
                                onChange={(e) => setSelectedPerfil(e.target.value)}
                                placeholder="Seleccione un perfil"
                            >
                                {perfiles.map(perfil => (
                                    <option key={perfil.ID} value={perfil.ID}>
                                        {perfil.NOMPERFIL}
                                    </option>
                                ))}
                            </Select>
                        </GridItem>
                        <GridItem>
                            <Select 
                                value={selectedModulo} 
                                onChange={(e) => setSelectedModulo(e.target.value)}
                                placeholder="Seleccione un módulo"
                            >
                                {filteredModulos.map(modulo => (
                                    <option key={modulo.ID} value={modulo.ID}>
                                        {modulo.MODULOS}
                                    </option>
                                ))}
                            </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Button onClick={handleAddPermiso}>Añadir permiso</Button>
                        </GridItem>
                    </Grid>
                    <br />
                    <FormLabel>Permisos asignados</FormLabel>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Perfil</Th>
                                <Th>Módulo</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {permisosTabla.map((permiso, index) => (
                                <Tr key={index}>
                                    <Td>{permiso.nombrePerfil}</Td>
                                    <Td>{permiso.nombreModulo}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <br />
                    <Button colorScheme="blue" onClick={handleAddUsuario}>
                        Crear Usuario
                    </Button>
                    <Button colorScheme="red" style={{marginLeft:"20px"}} onClick={limpiarFormulario}>
                        Limpiar
                    </Button>
                </FormControl>
                <br />
                <FormControl>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                    <FormLabel>Filtrar por Nombre Comercial</FormLabel>
                    <Select 
                        value={nombreComercialFilter} 
                        onChange={(e) => setNombreComercialFilter(e.target.value)}
                        placeholder="Seleccione un Nombre Comercial"
                    >
                        {uniqueNombreComercial.map((nombre, index) => (
                            <option key={index} value={nombre}>
                                {nombre}
                            </option>
                        ))}
                    </Select>
                    </GridItem>
                    <GridItem>
                    <br></br>
                    <FormLabel style={{marginTop: '15px'}}>Usuarios - {filteredUsuarios.length}</FormLabel>
                    </GridItem>
                    </Grid>
                </FormControl>
                <Box>
                <Table variant="simple">
                    <Thead>
                    <Tr>
                        <Th>Nombre Comercial</Th>
                        <Th>Nombre Usuario</Th>
                        <Th>Correo Electrónico</Th>
                        <Th>Estado</Th>
                        <Th>Permisos</Th>
                        <Th>Acción</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {currentItems.map((usuario) => (
                        <Tr key={usuario.UserID}>
                        <Td>{usuario.NombreComercial}</Td>
                        <Td>{usuario.FirstName} {usuario.LastName}</Td>
                        <Td>{usuario.Email}</Td>
                        <Td>{usuario.Status === 1 ? 'Activo' : 'Inactivo'}</Td>
                        <Td>
                            <Table>
                            <Thead>
                                <Tr>
                                <Th>Perfil</Th>
                                <Th>Módulo</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.entries(groupBy(usuario.UserPerfil, 'nombrePerfil')).map(([perfil, permisos]) => (
                                <Tr key={perfil}>
                                    <Td>{perfil}</Td>
                                    <Td>
                                    <ul>
                                        {permisos.map((permiso, index) => (
                                        <li key={index}>{permiso.nombreModulo}</li>
                                        ))}
                                    </ul>
                                    </Td>
                                </Tr>
                                ))}
                            </Tbody>
                            </Table>
                        </Td>
                        <Td>
                            <Button colorScheme="teal" onClick={() => handleModifyClick(usuario)}>
                            Modificar
                            </Button>
                        </Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
                {filteredUsuarios.length > itemsPerPage && (
                    <HStack spacing={2} justifyContent="center" mt={4}>
                    <IconButton
                        icon={<ArrowLeftIcon />}
                        onClick={handlePreviousPage}
                        isDisabled={currentPage === 1}
                    />
                    <Box>Page {currentPage} of {totalPages}</Box>
                    <IconButton
                        icon={<ArrowRightIcon />}
                        onClick={handleNextPage}
                        isDisabled={currentPage === totalPages}
                    />
                    </HStack>
                )}
                </Box>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modificar Usuario</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                            <FormLabel>Nombre Comercial de Empresa</FormLabel>
                            <Input 
                                type='text' 
                                placeholder='Nombre Comercial de empresa' 
                                value={nombreComercial} 
                                onChange={(e) => setNombreComercial(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Nombre de Empresa en BD</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Nombre de Empresa en BD" 
                                value={nombreEmpresaBD} 
                                onChange={(e) => setNombreEmpresaBD(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Tipo de BD</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Tipo de BD" 
                                value={tipoBD} 
                                onChange={(e) => setTipoBD(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Ubicación Servidor BD</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Ubicacion servidor BD" 
                                value={ubicacionServidorBD} 
                                onChange={(e) => setUbicacionServidorBD(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Ubicación Servidor de Presentación</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Ubicacion servidor de presentacion" 
                                value={ubicacionServidorPresentacion} 
                                onChange={(e) => setUbicacionServidorPresentacion(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Link Portal de Acceso</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Link portal de acceso" 
                                value={linkPortalAcceso} 
                                onChange={(e) => setLinkPortalAcceso(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>ID de Usuario Tenant</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="ID de usuario Tenant" 
                                value={idUsuarioTenant} 
                                onChange={(e) => setIdUsuarioTenant(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Clave Usuario Tenant</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Clave usuario Tenant" 
                                value={claveUsuarioTenant} 
                                onChange={(e) => setClaveUsuarioTenant(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Tipo de Licencia</FormLabel>
                            <Select
                                value={tipoLicencia}
                                onChange={(e) => setTipoLicencia(e.target.value)}
                                placeholder="Seleccione un tipo de licencia"
                            >
                                <option value="Profesional">Profesional</option>
                                <option value="CRM">CRM</option>
                                <option value="Indirect">Indirect</option>
                                <option value="Financiera">Financiera</option>
                                <option value="Logistiac">Logistica</option>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <FormLabel>Nombre Usuario</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Nombre usuario" 
                                value={nombreUsuario} 
                                onChange={(e) => setNombreUsuario(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Apellidos</FormLabel>
                            <Input 
                                type="text" 
                                placeholder="Apellidos" 
                                value={apellidos} 
                                onChange={(e) => setApellidos(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <Input 
                                type="email" 
                                placeholder="Correo Electrónico" 
                                value={correoElectronico} 
                                onChange={(e) => setCorreoElectronico(e.target.value)} 
                            />
                        </GridItem>
                        <GridItem>
                            <FormLabel>Estado</FormLabel>
                            <Select 
                                value={estado} 
                                onChange={(e) => setEstado(e.target.value)}
                                placeholder="Seleccione el estado"
                            >
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </Select>
                        </GridItem>
                        <GridItem>
                            <FormLabel>SL</FormLabel>
                            <Input
                                type="text"
                                placeholder="SL"
                                value={SL}
                                onChange={(e) => setSL(e.target.value)}
                            />
                        </GridItem>
                    </Grid>
                    <FormLabel>Asignar permisos</FormLabel>
                    <Button colorScheme="red" style={{marginBottom:"15px"}} onClick={handleLimpiarPermisos}>
                        Limpiar permisos
                    </Button>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                            <Select 
                                value={selectedPerfil} 
                                onChange={(e) => setSelectedPerfil(e.target.value)}
                                placeholder="Seleccione un perfil"
                            >
                                {perfiles.map(perfil => (
                                    <option key={perfil.ID} value={perfil.ID}>
                                        {perfil.NOMPERFIL}
                                    </option>
                                ))}
                            </Select>
                        </GridItem>
                        <GridItem>
                            <Select 
                                value={selectedModulo} 
                                onChange={(e) => setSelectedModulo(e.target.value)}
                                placeholder="Seleccione un módulo"
                            >
                                {filteredModulos.map(modulo => (
                                    <option key={modulo.ID} value={modulo.ID}>
                                        {modulo.MODULOS}
                                    </option>
                                ))}
                            </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Button onClick={handleAddPermiso}>Añadir permiso</Button>
                        </GridItem>
                    </Grid>
                    <br />
                    <FormLabel>Permisos asignados</FormLabel>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Perfil</Th>
                                <Th>Módulo</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {permisosTabla.map((permiso, index) => (
                                <Tr key={index}>
                                    <Td>{permiso.nombrePerfil}</Td>
                                    <Td>{permiso.nombreModulo}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="red" style={{marginTop:"20px"}} onClick={handleDeleteUsuario}>
                            Eliminar
                            </Button>
                        <Button colorScheme="blue" onClick={handleUpdateUsuario} >
                            Guardar cambios
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Center>

    );
};

export default Usuarios;
