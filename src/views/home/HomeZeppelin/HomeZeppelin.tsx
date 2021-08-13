import React, { useEffect } from "react";
import "./HomeZeppelin.scss";
import { MxmButton } from "../../../shared/styled/buttons";
import { Box, Flex, Grid, Image, useMediaQuery } from "@chakra-ui/react";
import { Palette } from "../../../types/enums";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { Home } from "../../../assets";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import GetAppIcon from "@material-ui/icons/GetApp";

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const cardVariants = {
  exit: { y: "-50%", opacity: 0, transition: { delay: 0.2, ...transition } },
  rest: { y: "50%", opacity: 0, transition: { delay: 0.2, ...transition } },
  enter: {
    y: "0%",
    opacity: 1,
    transition,
  },
};

const buttonVariants = {
  rest: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 0.2, ...transition } },
  exit: { x: -100, opacity: 1, transition: { delay: 0.2, ...transition } },
};

const buttonVariantsTwo = {
  rest: { y: 100, opacity: 0, transition },
  enter: { y: 0, opacity: 1, transition: { delay: 0.2, ...transition } },
  exit: { y: 100, opacity: 1, transition: { delay: 0.2, ...transition } },
};

const HomeZeppelin = () => {
  const history = useHistory();
  const [isSmallerThan620px] = useMediaQuery("(max-width: 620px)");

  const handleClick = () => {
    history.push("/home/finish", {
      status: true,
      message: "go to next page: finish",
    });
  };

  useEffect(() => {
    document.title = "Home Zeppelin Page";
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      animate="enter"
      exit="exit"
      style={{ overflow: "hidden" }}
    >
      <Flex
        className="home-zep-outer-container"
        h={
          isSmallerThan620px
            ? "max-content"
            : {
                base: "calc(100vh - 3.5rem)",
                md: "calc(100vh - 4rem)",
                xl: "calc(100vh - 5rem)",
              }
        }
        padding={{
          base: "1rem",
          md: "2rem",
        }}
        bg={"#FBCF10"}
      >
        <Flex
          className="home-zep-inner-container"
          background="white"
          w="100%"
          h="100%"
        >
          <Flex
            className="home-zep-header"
            color={Palette.Red}
            marginTop="2rem"
            marginBottom="1rem"
          >
            <h1 style={{ background: Palette.Yellow, borderRadius: "20px" }}>
              Zeppelin
            </h1>
          </Flex>
          <Image
            src={Home.ZeppPink}
            alt="home zeppelin"
            className="zep-illustration"
          />

          <Flex className="home-zep-desc" color={Palette.Navy}>
            <p>
              Zeppelin adalah peta konsep mimpi yang dibuat berdasarkan beberapa
              pertanyaan. Zeppelin terinspirasi dari nama sebuah balon udara
              berbentuk cerutu raksasa yang dapat terbang terarah karena
              mempunyai mesin dan kemudi. Harapannya adalah Maximers dapat
              mengetahui apa yang harus dilakukan dalam menggapai mimpi dan juga
              memiliki kemudi atas mimpi tersebut.
            </p>
          </Flex>
          <Flex className="home-zep-content-flex">
            {/* <div
                className="home-zep-content-header"
                style={{ color: Palette.Red }}
              >
                <h2>Zeppelin HoME Competition</h2>
              </div> */}
            <motion.div
              className="home-zep-regulasi-btn"
              variants={buttonVariantsTwo}
              initial="rest"
              animate="enter"
              exit="exit"
            >
              <button
                onClick={() =>
                  window.open(
                    "https://maxima2021-assets.s3.ap-southeast-1.amazonaws.com/Zeppelin+Home+Competition.pdf"
                  )
                }
              >
                <GetAppIcon />
                <p>Download Regulasi</p> <span>(pdf)</span>
              </button>
            </motion.div>
            <motion.div
              className="home-zep-bukti-btn"
              variants={buttonVariantsTwo}
              initial="rest"
              animate="enter"
              exit="exit"
            >
              <button onClick={() => window.open("http://bit.ly/FormZeppelin")}>
                <ExternalLinkIcon style={{ fontSize: "20px" }} />
                <p>Form Pengumpulan</p> <span>(Google Form)</span>
              </button>
            </motion.div>
          </Flex>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            animate="enter"
            exit="exit"
          >
            <Flex className="nav-btn-zep">
              <MxmButton
                variant="squared"
                colorScheme="navy-cyan"
                className="home-zep-back-btn"
                onClick={() => history.push("/home/twibbon")}
              >
                <span>BACK</span>
              </MxmButton>
              <MxmButton
                variant="squared"
                colorScheme="red-navy"
                className="home-zep-next-btn"
                onClick={handleClick}
              >
                <span>NEXT</span>
              </MxmButton>
            </Flex>
          </motion.div>
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default HomeZeppelin;
