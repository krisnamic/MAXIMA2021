import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./DashboardNavigation.scss";
import { Flex, Spacer } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import { AdminRouters } from "../../../routers";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ContactsIcon from "@material-ui/icons/Contacts";
import FlightIcon from "@material-ui/icons/Flight";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Face from "@material-ui/icons/Face";
import LinkIcon from "@material-ui/icons/Link";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

const DashboardNavigation = (props: any) => {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [isSmallerThan450px] = useMediaQuery("(max-width: 28.125em)");
  const [isLargerThan3000px] = useMediaQuery("(min-width: 3000px)");
  let isAdmin = false;

  const token: string | null = window.sessionStorage.getItem("token");
  const decoded: any = token !== null && jwtDecode(token);
  decoded.division === "D01" && (isAdmin = true);

  const location = useLocation();

  const handleLogOut = () => {
    Swal.fire({
      title:
        '<span style="font-family: Rubik, sans-serif;">Apakah Anda yakin?</sp>',
      cancelButtonText: `<span style=\"font-family: Poppins, sans-serif;\">Batalkan</span>`,
      confirmButtonText: `<span style=\"font-family: Poppins, sans-serif;\">Keluar</span>`,
      confirmButtonColor: "#e40000",
      denyButtonColor: "#fff",
      showCancelButton: true,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        window.location.href = "/auth/keluar";
      }
    });
  };

  const sidebarShown = () => {
    setSidebarShow(false);
    if (sidebarShow === false) {
      setSidebarShow(true);
    }
  };

  const closeSidebar = () => {
    setSidebarShow(false);
  };

  const sidebarDropdownActive = (event: any) => {
    try {
      if (
        event.target.parentNode
          .querySelector(".dropdown-items")
          .classList.contains("dropdown-items_open")
      ) {
        event.target.parentNode
          .querySelector(".dropdown-items")
          .classList.remove("dropdown-items_open");

        event.target.parentNode
          .querySelector(".dropdown-header")
          .classList.remove("sidebar-nav_active");
      } else {
        event.target.parentNode
          .querySelector(".dropdown-items")
          .classList.add("dropdown-items_open");

        event.target.parentNode
          .querySelector(".dropdown-header")
          .classList.add("sidebar-nav_active");
      }
    } catch {
      console.log(`target null`);
    }
  };

  const sidebarDropdownActiveSvg = (event: any) => {
    try {
      if (event.target.localName === "svg") {
        if (
          event.target.parentNode.parentNode
            .querySelector(".dropdown-items")
            .classList.contains("dropdown-items_open")
        ) {
          event.target.parentNode.parentNode
            .querySelector(".dropdown-items")
            .classList.remove("dropdown-items_open");

          event.target.parentNode.parentNode
            .querySelector(".dropdown-header")
            .classList.remove("sidebar-nav_active");
        } else {
          event.target.parentNode.parentNode
            .querySelector(".dropdown-items")
            .classList.add("dropdown-items_open");

          event.target.parentNode.parentNode
            .querySelector(".dropdown-header")
            .classList.add("sidebar-nav_active");
        }
      } else if (event.target.localName === "path") {
        if (
          event.target.parentNode.parentNode.parentNode
            .querySelector(".dropdown-items")
            .classList.contains("dropdown-items_open")
        ) {
          event.target.parentNode.parentNode.parentNode
            .querySelector(".dropdown-items")
            .classList.remove("dropdown-items_open");

          event.target.parentNode.parentNode.parentNode
            .querySelector(".dropdown-header")
            .classList.remove("sidebar-nav_active");
        } else {
          event.target.parentNode.parentNode.parentNode
            .querySelector(".dropdown-items")
            .classList.add("dropdown-items_open");

          event.target.parentNode.parentNode.parentNode
            .querySelector(".dropdown-header")
            .classList.add("sidebar-nav_active");
        }
      }
    } catch {
      console.log(`target null`);
    }
  };

  return (
    <div className="container-dashboard-main">
      <header
        className={`navbar ${
          isSmallerThan450px ? "close" : sidebarShow ? "open" : "close"
        }`}
      >
        <Flex align="center" className="navbar-flex-container">
          <button onClick={sidebarShown}>
            <MenuIcon className="navbar-menu-icon" />
          </button>

          <Flex className="navbar-menu">
            {/* <NavLink to="/admin/edit-akun">
              <Flex align="center" className="navbar-avatar">
                <div className="navbar-avatar-image">
                  <AccountCircleIcon />
                </div>
                <h4>{props.name}</h4>
              </Flex>
            </NavLink> */}

            <button className="navbar-logout-btn" onClick={handleLogOut}>
              <p>Keluar</p>
              <ExitToAppIcon />
            </button>
          </Flex>
        </Flex>
      </header>
      <aside
        className={`sidebar-container ${
          isSmallerThan450px
            ? sidebarShow
              ? "open"
              : "close"
            : sidebarShow
            ? "open"
            : "close"
        }`}
      >
        <Flex className="sidebar-header" align="center" justify="center">
          <h2>Dashboard MAXIMA 2021</h2>
          {isSmallerThan450px ? <Spacer /> : ""}
          <CloseRoundedIcon onClick={closeSidebar} />
        </Flex>
        <Flex className="sidebar-menu" direction="column">
          <NavLink to="/admin/edit-akun">
            <div className="sidebar-avatar">
              <div className="sidebar-avatar_image">
                <AccountCircleIcon />
              </div>
              <h4>{props.name}</h4>
              <h6>Panitia</h6>
            </div>
          </NavLink>
          <Flex className="sidebar-nav_header">
            <h3>MENU NAVIGASI</h3>
          </Flex>
          <Flex className="main-navigation" direction="column">
            <ul>
              <NavLink
                to="/admin/dashboard"
                activeClassName="sidebar-nav_active"
              >
                <AssessmentIcon />
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/daftar-maba"
                activeClassName="sidebar-nav_active"
              >
                <ContactsIcon />
                Daftar Mahasiswa Baru
              </NavLink>

              <li onClick={sidebarDropdownActive} className={`dropdown`}>
                <Flex className="dropdown-header">
                  <HomeRoundedIcon onClick={sidebarDropdownActiveSvg} />
                  HoME
                  <ArrowBackIosRoundedIcon onClick={sidebarDropdownActiveSvg} />
                </Flex>
                <ul className="dropdown-items">
                  <li>
                    <NavLink
                      to="/admin/tambah-home"
                      activeClassName="dropdown-item_active"
                    >
                      <RadioButtonUncheckedOutlinedIcon />
                      Tambah Data HoME
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/tambah-media"
                      activeClassName="dropdown-item_active"
                    >
                      <RadioButtonUncheckedOutlinedIcon />
                      Tambah Media HoME
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="/admin/daftar-home"
                      className={
                        location.pathname === "/admin/daftar-home"
                          ? "dropdown-item_active"
                          : ""
                      }
                    >
                      <RadioButtonUncheckedOutlinedIcon />
                      Daftar Organisasi HoME
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/daftar-narasi"
                      className={
                        location.pathname === "/admin/daftar-narasi"
                          ? "dropdown-item_active"
                          : ""
                      }
                    >
                      <RadioButtonUncheckedOutlinedIcon />
                      Daftar Narasi HoME
                    </a>
                  </li>
                </ul>
              </li>

              <li onClick={sidebarDropdownActive} className={`dropdown`}>
                <Flex className="dropdown-header">
                  <FlightIcon onClick={sidebarDropdownActiveSvg} />
                  STATE
                  <ArrowBackIosRoundedIcon onClick={sidebarDropdownActiveSvg} />
                </Flex>
                <ul className="dropdown-items">
                  <li>
                    <NavLink
                      to="/admin/tambah-state"
                      activeClassName="dropdown-item_active"
                    >
                      <RadioButtonUncheckedOutlinedIcon />
                      Tambah STATE
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="/admin/daftar-state"
                      className={
                        location.pathname === "/admin/daftar-state"
                          ? "dropdown-item_active"
                          : ""
                      }
                    >
                      <RadioButtonUncheckedOutlinedIcon />
                      Daftar STATE
                    </a>
                  </li>
                </ul>
              </li>

              <NavLink to="/shortener" activeClassName="sidebar-nav_active">
                <LinkIcon />
                Shortener
              </NavLink>

              {isAdmin && (
                <li onClick={sidebarDropdownActive} className={`dropdown`}>
                  <Flex className="dropdown-header">
                    <PersonAddIcon onClick={sidebarDropdownActiveSvg} />
                    Akun MAXIMA 2021
                    <ArrowBackIosRoundedIcon
                      onClick={sidebarDropdownActiveSvg}
                    />
                  </Flex>
                  <ul className="dropdown-items">
                    <li>
                      <NavLink
                        to="/admin/tambah-mahasiswa"
                        activeClassName="dropdown-item_active"
                      >
                        <RadioButtonUncheckedOutlinedIcon />
                        Tambah Akun Mahasiswa
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/daftar-mahasiswa"
                        activeClassName="dropdown-item_active"
                      >
                        <RadioButtonUncheckedOutlinedIcon />
                        Daftar Akun Mahasiswa
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/tambah-panitia"
                        activeClassName="dropdown-item_active"
                      >
                        <RadioButtonUncheckedOutlinedIcon />
                        Tambah Akun Panitia
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/daftar-panitia"
                        activeClassName="dropdown-item_active"
                      >
                        <RadioButtonUncheckedOutlinedIcon />
                        Daftar Akun Panitia
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/tambah-organisator"
                        activeClassName="dropdown-item_active"
                      >
                        <RadioButtonUncheckedOutlinedIcon />
                        Tambah Akun Organisator
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/admin/daftar-organisator"
                        activeClassName="dropdown-item_active"
                      >
                        <RadioButtonUncheckedOutlinedIcon />
                        Daftar Akun Organisator
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              <NavLink
                to="/admin/edit-akun"
                activeClassName="sidebar-nav_active"
              >
                <Face />
                Edit Akun Kamu
              </NavLink>
            </ul>
          </Flex>
        </Flex>
      </aside>
      <Flex
        alignItems="center"
        justifyContent="center"
        paddingRight={0}
        paddingLeft={
          isLargerThan3000px
            ? sidebarShow
              ? "40rem"
              : "0px"
            : isSmallerThan450px
            ? sidebarShow
              ? "0px"
              : "0px"
            : sidebarShow
            ? "18rem"
            : "0px"
        }
      >
        <AdminRouters show={sidebarShow} />
      </Flex>
    </div>
  );
};

export default DashboardNavigation;
