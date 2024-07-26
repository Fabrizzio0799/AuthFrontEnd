import { useState, useEffect } from 'react';
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  VStack,
  Center,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const { signIn, user, loading, signout, dbs, setCurrentDB, currentDB, setCurrentCompany } = useAuth();
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState({
    email: '',
    psw: ''
  });
  const [cargando, setCargando] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargando(true);
      await signIn(formUser.email, formUser.psw);
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Verifique Credenciales',
      });
    } finally {
      setCargando(false);
    }
  };

  const handleOnChange = (e) => {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSignOut = (e) => {
    e.preventDefault();
    signout();
    navigate("/");
    console.log('user id SignOut');
    window.location.reload();
  };

  const handleSelect = (company) => {
    setSelectedCompany(company);
  };

  const handleSetCurrentCompany = async (e) => {
    e.preventDefault();
    if (selectedCompany) {
      try {
        await setCurrentCompany(selectedCompany);
        setCurrentDB(selectedCompany);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user && currentDB) {
      navigate("/");
    }
    console.log('Login_uf');
  }, [user, currentDB, navigate]);

  return loading ? (
    <Center>
      <Spinner />
    </Center>
  ) : (
    <Center>
      <Box width="400px" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Heading as="h1" size="lg" mb="4">Iniciar Sesión</Heading>
        {
          user && (
            <VStack spacing="4">
              <Text>Bienvenido</Text>
              <Text>{user.email}</Text>
              {!dbs && <Spinner />}
            </VStack>
          )
        }
        <form>
          {!user && (
            <VStack spacing="4">
              <FormControl>
                <FormLabel htmlFor='email'>Correo</FormLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleOnChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="psw">Contraseña</FormLabel>
                <Input
                  type="password"
                  name="psw"
                  id="psw"
                  onChange={handleOnChange}
                />
              </FormControl>
              <Button colorScheme="blue" onClick={handleSubmit}>Entrar</Button>
            </VStack>
          )}
          {dbs && (
            <FormControl mt="4">
              <FormLabel htmlFor="company">Compañía</FormLabel>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Seleccionar</Th>
                    <Th>Compañía</Th>
                    <Th>País</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dbs.map((data) => (
                    <Tr key={data.ID_COMPANY}>
                      <Td>
                        <Switch
                          id={`switch-${data.ID_COMPANY}`}
                          isChecked={selectedCompany?.ID_COMPANY === data.ID_COMPANY}
                          onChange={() => handleSelect(data)}
                        />
                      </Td>
                      <Td>{data.COMPANY_NAME}</Td>
                      <Td>{data.Pais}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </FormControl>
          )}
          {cargando && <Spinner mt="4" />}
          {user && (
            <VStack spacing="4" mt="4">
              <Button colorScheme="blue" onClick={handleSetCurrentCompany}>Entrar</Button>
              <Button colorScheme="red" onClick={handleOnSignOut}>Salir</Button>
              {cargando && <Spinner />}
            </VStack>
          )}
        </form>
      </Box>
    </Center>
  );
};

export default Login;
