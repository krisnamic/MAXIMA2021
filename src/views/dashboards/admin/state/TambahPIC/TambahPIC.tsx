import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Flex,
  Heading,
  Spacer,
  Image,
  FormControl,
  FormErrorIcon,
  Button,
} from "@chakra-ui/react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MxmContainers,
  MxmVerticalAlign,
} from "../../../../../shared/styled/containers";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "../../../../../types/enums";
import "./TambahPIC.scss";
import { MxmLogo } from "../../../../../assets";
import {
  MxmDivider,
  MxmFormErrorMessage,
  MxmFormLabel,
  MxmInput,
  MxmSelect,
} from "../../../../../shared/styled/input";
import { DashboardFooter } from "../../../../../shared/component/DashboardFooter";

const TambahPIC: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    window.confirm(JSON.stringify(data));
  };
  const handleSelectChange = (event: any) => {
    if (event.target.value !== "") {
      event.target.style.color = "black";
    }
  };

  return (
    <Flex
      width="79vw"
      height={{
        base: "100vh",
        sm: "100vh",
        md: "80vh",
        lg: "80vh",
        xl: "80vh",
      }}
      backgroundColor="#F4F4F4"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        backgroundColor="#FFFFFF"
        className="filter"
        py={{
          base: "3vh",
          sm: "3vh",
          md: "3vh",
          lg: "3vh",
          xl: "3vh",
        }}
        px={{
          base: "5vw",
          sm: "5vw",
          md: "2vw",
          lg: "2vw",
          xl: "2vw",
        }}
        my={{
          base: "1vh",
          sm: "1vh",
          md: "10vh",
          lg: "10vh",
          xl: "10vh",
        }}
        mx={{
          base: "1vw",
          sm: "1vw",
          md: "10vw",
          lg: "10vw",
          xl: "10vw",
        }}
        rounded={25}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <Heading
              mb="1vh"
              letterSpacing="0.05em"
              fontSize={{
                base: "1.2em",
                sm: "1.2em",
                md: "1.2em",
                lg: "1.3em",
                xl: "1.5em",
                "2xl": "1.5em",
              }}
            >
              Tambah PIC Organisator
            </Heading>
            <Spacer />
            <Image
              src={MxmLogo}
              alt="Logo MAXIMA 2021"
              h="100%"
              w={{
                base: "4vw",
                sm: "4vw",
                md: "2.5vw",
                lg: "2vw",
                xl: "2vw",
                "2xl": "1.2vw",
              }}
              mt="0.4vh"
              mb="1vh"
            />
          </Flex>
          <MxmDivider color="black" height="3px" margin="1vh 0 2.8vh 0" />
          <FormControl mb={3} isInvalid={errors.akunOrganisator}>
            <MxmFormLabel color="black">Akun Organisator</MxmFormLabel>
            <Autocomplete
              id="organisatorList-combo-box"
              options={organisatorList}
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <p>
                  {option.name} ({option.nim})
                </p>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  {...register("akunOrganisator", {
                    required: "Pilih Akun Organisator",
                  })}
                />
              )}
            />
            <MxmFormErrorMessage fontSize="xs" mt={1}>
              {errors.akunOrganisator && (
                <Flex flexDirection="row" alignItems="center">
                  <p>
                    <FormErrorIcon fontSize="xs" mt="-0.1em" />
                    {errors.akunOrganisator.message}
                  </p>
                </Flex>
              )}
            </MxmFormErrorMessage>
          </FormControl>
          <FormControl mb={3} isInvalid={errors.kegiatanState}>
            <MxmFormLabel color="black">Kegiatan STATE</MxmFormLabel>
            <Autocomplete
              id="stateList-combo-box"
              options={stateList}
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <Flex alignItems="center">
                  <img
                    src="https://img.freepik.com/free-psd/engraved-black-logo-mockup_125540-223.jpg?size=338&ext=jpg"
                    width={35}
                    height={35}
                    alt="logo"
                  />
                  <p
                    style={{
                      fontSize: "0.8em",
                      fontFamily: "Poppins",
                      marginLeft: "1em",
                    }}
                  >
                    {option.name} Hari ke-{option.day}
                  </p>
                </Flex>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  {...register("kegiatanState", { required: "Pilih STATE" })}
                />
              )}
            />
            <MxmFormErrorMessage fontSize="xs" mt={1}>
              {errors.kegiatanState && (
                <Flex flexDirection="row" alignItems="center">
                  <p>
                    <FormErrorIcon fontSize="xs" mt="-0.1em" />
                    {errors.kegiatanState.message}
                  </p>
                </Flex>
              )}
            </MxmFormErrorMessage>
          </FormControl>
          <Flex mt={10}>
            <Spacer />
            <Button
              backgroundColor={Palette.Cyan}
              color="white"
              padding="1em 2em 1em 2em"
              borderRadius="30px"
              boxShadow="-1.2px 4px 4px 0px rgba(0, 0, 0, 0.25)"
              type="submit"
              _hover={{ backgroundColor: "red" }}
            >
              SUBMIT
            </Button>
          </Flex>
        </form>
      </Flex>
      <DashboardFooter />
    </Flex>
  );
};

export default TambahPIC;

const stateList = [
  { name: "Ultimagz", day: "1" },
  { name: "Ultima Sonora", day: "2" },
  { name: "Teater Katak", day: "3" },
  { name: "UMN Radion", day: "4" },
];

const organisatorList = [
  { name: "Bonifasius Ariesto Adrian Finantyo", nim: "42580" },
  { name: "Bapak Budi", nim: "32580" },
  { name: "Ibu Budi", nim: "22580" },
  { name: "Ini Budi", nim: "12580" },
  { name: "Bukan Tiara Andini", nim: "52580" },
];
