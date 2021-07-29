import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Flex,
  Heading,
  Input,
  FormControl,
  FormErrorIcon,
  InputLeftAddon,
  InputRightAddon,
  Divider,
  Image,
  Spacer,
  Text,
  InputRightElement,
  Button,
  createIcon,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import {
  MxmInput,
  MxmInputGroup,
  MxmFormLabel,
  MxmSelect,
  MxmFormErrorMessage,
} from "../../../shared/styled/input";
import {
  MxmContainersOrganisator,
  MxmVerticalAlign,
} from "../../../shared/styled/containers";
import { MxmButton } from "../../../shared/styled/buttons";
import { MxmWhiteLogo } from "../../../assets";
import { motion } from "framer-motion";
import { Palette } from "../../../types/enums";
import "./RegisterOrganisator.scss";
import Swal from "sweetalert2";
import authService from "../../../services/auth";
import { DataRegisterOrganisator } from "../../../types/interfaces";

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const cardVariants = {
  exit: { y: "50%", opacity: 0, transition: { delay: 0.2, ...transition } },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

const buttonVariants = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 0.2, ...transition } },
};

const IconShowPassword = createIcon({
  displayName: "ShowPassword",
  viewBox: "0 0 24 24",
  d: "M12 19C10.3599 19.0204 8.7367 18.6664 7.254 17.965C6.10469 17.4042 5.07265 16.6297 4.213 15.683C3.30243 14.7041 2.58547 13.5616 2.1 12.316L2 12L2.105 11.684C2.59082 10.4394 3.30624 9.29725 4.214 8.31698C5.07334 7.37029 6.10504 6.59584 7.254 6.03498C8.73671 5.33357 10.3599 4.97959 12 4.99998C13.6401 4.97963 15.2633 5.3336 16.746 6.03498C17.8953 6.59571 18.9274 7.37017 19.787 8.31698C20.6993 9.29453 21.4165 10.4373 21.9 11.684L22 12L21.895 12.316C20.3262 16.3998 16.3742 19.0693 12 19ZM12 6.99998C8.59587 6.89331 5.47142 8.87507 4.117 12C5.4712 15.1251 8.59579 17.1069 12 17C15.4041 17.1064 18.5284 15.1247 19.883 12C18.5304 8.87356 15.4047 6.89106 12 6.99998ZM12 15C10.5573 15.0095 9.30937 13.9973 9.02097 12.5838C8.73256 11.1702 9.48427 9.75 10.8154 9.19364C12.1465 8.63728 13.6852 9.10011 14.4885 10.2985C15.2919 11.4969 15.1354 13.0961 14.115 14.116C13.5563 14.6812 12.7948 14.9995 12 15Z",
});

const IconHidePassword = createIcon({
  displayName: "HidePassword",
  viewBox: "0 0 24 24",
  d: "M19.97 21.385L16.614 18.029C15.1661 18.6882 13.5908 19.0204 12 19.002C10.3599 19.0224 8.73671 18.6684 7.254 17.967C6.10468 17.4063 5.07264 16.6318 4.213 15.685C3.30049 14.7069 2.5833 13.5634 2.1 12.316L2 12.002L2.105 11.686C2.82781 9.84231 4.04426 8.23318 5.621 7.03501L3 4.41401L4.413 3.00201L21.382 19.971L19.972 21.385H19.97ZM7.036 8.45101C5.75792 9.34693 4.74865 10.5747 4.117 12.002C5.47142 15.1269 8.59587 17.1087 12 17.002C13.0498 17.0106 14.0936 16.8416 15.087 16.502L13.287 14.702C12.8863 14.8984 12.4462 15.001 12 15.002C10.3475 14.9916 9.01037 13.6546 9 12.002C9.00048 11.5548 9.10309 11.1136 9.3 10.712L7.036 8.45101ZM19.852 15.612L18.46 14.221C19.0456 13.5589 19.5256 12.8105 19.883 12.002C18.5304 8.87559 15.4047 6.89309 12 7.00201C11.753 7.00201 11.505 7.01101 11.265 7.02801L9.5 5.26101C10.3216 5.08525 11.1598 4.99841 12 5.00201C13.6401 4.98166 15.2633 5.33564 16.746 6.03701C17.8953 6.59775 18.9274 7.37221 19.787 8.31901C20.6991 9.29598 21.4163 10.4381 21.9 11.684L22 12.002L21.895 12.318C21.4268 13.5361 20.7342 14.6555 19.853 15.618L19.852 15.612Z",
});

const RegisterOrganisator: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSelectChange = (event: any) => {
    if (event.target.value !== "") {
      event.target.style.color = "black";
    }
  };

  useEffect(() => {
    document.title = "[Organisator] Daftar - MAXIMA 2021";
  }, []);

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: DataRegisterOrganisator) => {
    setLoading(true);
    reset();

    const dataOrganisator: DataRegisterOrganisator = {
      nim: data.nim.toString(),
      name: data.name,
      email: `${data.email}@student.umn.ac.id`,
      password: data.password,
      stateID: data.stateID,
    };

    try {
      await authService.daftarOrganisator(dataOrganisator);
      history.push("/auth/organisator/masuk", {
        status: "success",
        message: "Akun Organisator MAXIMA 2021 berhasil dibuat! Silakan masuk.",
      });
    } catch (error) {
      Swal.fire({
        title: "Perhatian!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Coba lagi",
      });
    }
  };

  return (
    <MxmContainersOrganisator>
      <motion.div initial="exit" animate="enter" exit="exit">
        <motion.div variants={cardVariants}>
          <Flex
            height={{
              base: "100vh",
              md: "80vh",
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              direction="column"
              background={`${Palette.Navy}`}
              py="2vh"
              px={{
                base: "5vw",
                md: "2vw",
              }}
              my={{
                base: "1vh",
                md: "10vh",
              }}
              mx={{
                base: "1vw",
                md: "10vw",
              }}
              rounded={25}
              style={{
                WebkitBackdropFilter: "blur(4px)",
                backdropFilter: "blur(4px)",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex>
                  <Heading
                    mb={3}
                    color="white"
                    letterSpacing="0.05em"
                    fontSize={{
                      base: "1.5em",
                      xl: "1.7em",
                    }}
                  >
                    Daftar Organisator
                  </Heading>
                  <Spacer />
                  <Image
                    src={MxmWhiteLogo}
                    alt="Logo MAXIMA 2021"
                    h="100%"
                    w={{
                      base: "4vw",
                      md: "2.5vw",
                      lg: "2vw",
                      "2xl": "1.2vw",
                    }}
                    mt={2}
                  />
                </Flex>
                <Divider
                  colorScheme="whiteAlpha"
                  style={{ border: "2px solid white" }}
                  mb={3}
                />
                <Flex
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl mb={3} mr="5" isInvalid={errors.name}>
                    <MxmFormLabel>NAMA LENGKAP</MxmFormLabel>
                    <MxmInput
                      {...register("name", {
                        required: "Isi nama lengkap kamu",
                      })}
                    />
                    <MxmFormErrorMessage fontSize="xs" mt={1}>
                      {errors.name && (
                        <Flex flexDirection="row" alignItems="center">
                          <p>
                            <FormErrorIcon fontSize="xs" mt="-0.1em" />
                            {errors.name.message}
                          </p>
                        </Flex>
                      )}
                    </MxmFormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={errors.nim}
                    mb={3}
                    w={{
                      base: "100%",
                      md: "60%",
                      xl: "50%",
                    }}
                  >
                    <MxmFormLabel>NIM Anda</MxmFormLabel>
                    <MxmInputGroup addon="left">
                      <InputLeftAddon children="000000" fontFamily="Poppins" />
                      <Input
                        type="number"
                        {...register("nim", {
                          required: "Isi NIM kamu",
                          minLength: {
                            value: 5,
                            message: "Masukkan 5 angka terakhir dari NIM kamu",
                          },
                          maxLength: {
                            value: 5,
                            message: "Masukkan 5 angka terakhir dari NIM kamu",
                          },
                        })}
                      />
                    </MxmInputGroup>
                    <MxmFormErrorMessage fontSize="xs" mt={1}>
                      {errors.nim && (
                        <Flex flexDirection="row" alignItems="center">
                          <p>
                            <FormErrorIcon fontSize="xs" mt="-0.1em" />
                            {errors.nim.message}
                          </p>
                        </Flex>
                      )}
                    </MxmFormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                >
                  <FormControl
                    w={{
                      base: "100%",
                      md: "40%",
                    }}
                    mb={3}
                    mr="5"
                    isInvalid={errors.stateID}
                  >
                    <MxmFormLabel>ID state</MxmFormLabel>
                    <MxmSelect
                      className="select"
                      {...register("stateID", {
                        required: "Isi nama kegiatan STATE",
                      })}
                      onChange={handleSelectChange}
                    >
                      <option value="" selected disabled hidden>
                        Pilih STATE
                      </option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </MxmSelect>
                    <MxmFormErrorMessage fontSize="xs" mt={1}>
                      {errors.stateID && (
                        <Flex flexDirection="row" alignItems="center">
                          <p>
                            <FormErrorIcon fontSize="xs" mt="-0.1em" />
                            {errors.stateID.message}
                          </p>
                        </Flex>
                      )}
                    </MxmFormErrorMessage>
                  </FormControl>
                  <FormControl mb={3} isInvalid={errors.email}>
                    <MxmFormLabel>Email Student</MxmFormLabel>
                    <MxmInputGroup addon="right">
                      <Input
                        {...register("email", {
                          required: "Isi email student kamu",
                          pattern: {
                            value: /^[^@]+$/g,
                            message:
                              "Alamat email tidak perlu mencantumkan domain",
                          },
                        })}
                      />
                      <InputRightAddon children="@student.umn.ac.id" />
                    </MxmInputGroup>
                    <MxmFormErrorMessage fontSize="xs" mt={1}>
                      {errors.email && (
                        <Flex flexDirection="row" alignItems="center">
                          <p>
                            <FormErrorIcon fontSize="xs" mt="-0.1em" />
                            {errors.email.message}
                          </p>
                        </Flex>
                      )}
                    </MxmFormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex
                  direction={{
                    base: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                    xl: "row",
                  }}
                >
                  <FormControl isInvalid={errors.password} mb={3} mr="5">
                    <MxmFormLabel>Password</MxmFormLabel>
                    <MxmInputGroup addon="icon">
                      <Input
                        placeholder="Password minimal 8 karakter"
                        {...register("password", {
                          required: "Isi password kamu",
                          minLength: {
                            value: 8,
                            message: "Password minimal 8 karakter",
                          },
                        })}
                        type={show ? "text" : "password"}
                      />
                      <InputRightElement>
                        <Button size="base" onClick={handleClick}>
                          {show ? <IconHidePassword /> : <IconShowPassword />}
                        </Button>
                      </InputRightElement>
                    </MxmInputGroup>
                    <MxmFormErrorMessage fontSize="xs" mt={1}>
                      {errors.password && (
                        <p>
                          <FormErrorIcon fontSize="xs" mt="-0.1em" />
                          {errors.password.message}
                        </p>
                      )}
                    </MxmFormErrorMessage>
                  </FormControl>
                  <FormControl
                    // w={{
                    //   base: "100%",
                    //   md: "95%",
                    // }}
                    mb={3}
                    isInvalid={errors.konfirmasiPassword}
                  >
                    <MxmFormLabel>Konfirmasi Password</MxmFormLabel>
                    <MxmInputGroup>
                      <Input
                        type="password"
                        {...register("konfirmasiPassword", {
                          required: "Masukkan ulang password kamu",
                          validate: (value) =>
                            value === password.current || "Password belum sama",
                        })}
                      />
                    </MxmInputGroup>
                    <MxmFormErrorMessage fontSize="xs" mt={1}>
                      {errors.konfirmasiPassword && (
                        <p>
                          <FormErrorIcon fontSize="xs" mt="-0.1em" />
                          {errors.konfirmasiPassword.message}
                        </p>
                      )}
                    </MxmFormErrorMessage>
                  </FormControl>
                </Flex>
                <Flex
                  fontFamily="Rubik"
                  fontWeight="400"
                  fontSize="0.8em"
                  mt={1}
                >
                  <MxmVerticalAlign variant="">
                    <Text color="white">
                      Sudah punya akun?{" "}
                      <Link
                        to="/auth/organisator/masuk"
                        style={{ color: `${Palette.Cyan}` }}
                      >
                        Masuk
                      </Link>
                    </Text>
                  </MxmVerticalAlign>
                  <Spacer />
                  <motion.div className="back" variants={buttonVariants}>
                    <MxmButton
                      type="submit"
                      variant="desktop"
                      colorScheme="cyan-white"
                    >
                      Daftar
                    </MxmButton>
                  </motion.div>
                </Flex>
              </form>
            </Flex>
          </Flex>
        </motion.div>
      </motion.div>
    </MxmContainersOrganisator>
  );
};

export default RegisterOrganisator;