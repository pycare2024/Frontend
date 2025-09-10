import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "./PsyCare.png";
import "./Nav.css";

function Nav({ isLoggedIn, isDocLoggedIn, isOperatorLoggedIn, onLogout }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const renderDropdown = (menuKey, label, links) => (
    <div
      className="nav-item"
      onMouseEnter={() => handleDropdown(menuKey)}
      onMouseLeave={() => handleDropdown(null)}
      key={menuKey}
    >
      <span className="nav-link">{label}</span>
      {openDropdown === menuKey && (
        <div className="dropdown">
          {links.map((item, idx) => (
            <Link key={idx} to={item.to} className="dropdown-link">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const renderMobileDropdown = (menuKey, label, links) => {
    const isOpen = openDropdown === menuKey;

    return (
      <div className="mobile-dropdown" key={menuKey}>
        <div
          className="mobile-link"
          onClick={() => handleDropdown(isOpen ? null : menuKey)}
        >
          {label}
        </div>

        {isOpen && (
          <div className="mobile-dropdown-nav">
            {links.map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                className="mobile-link"
                onClick={closeMobileMenu} // <-- close menu when link clicked
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null); // also close any open dropdown
  };

  const adminMenus = [
    {
      key: "corporate",
      label: "Corporates",
      links: [
        { to: "/RegisterCorporate", label: "Register a Company" },
        { to: "/RechargeCredits", label: "Recharge Credits" },
      ],
    },
    {
      key: "report",
      label: "Reports",
      links: [
        { to: "/CorporateScreeningSummary", label: "Screening Summary" },
        { to: "/DemographicInsights", label: "Demographic Insights" },
        { to: "/ClinicalImpactReport", label: "Clinical Impact" },
      ],
    },
    {
      key: "accounts",
      label: "Accounts",
      links: [{ to: "/CompanyAccountsTab", label: "PsyCare Accounts" }],
    },
    {
      key: "utilities",
      label: "Utilities",
      links: [
        { to: "/EmailPanel", label: "Send Email" },
        { to: "/PriceUpdater", label: "Update Prices" },
      ],
    },
    {
      key: "experts",
      label: "Experts",
      links: [
        { to: "/Doctors", label: "Experts List" },
        { to: "/DoctorSchedule", label: "Expert's Schedule" },
      ],
    },
    {
      key: "clients",
      label: "Clients",
      links: [
        { to: "/Patients", label: "Clients List" },
        { to: "/AdminFeedbackSender", label: "Send Feedback Forms" },
      ],
    },
    {
      key: "operators",
      label: "Operators",
      links: [
        { to: "/AddOperator", label: "Add Operator" },
        { to: "/OperatorDetails", label: "Operator Details" },
      ],
    },
  ];

  const doctorMenus = [
    {
      key: "clients",
      label: "Clients",
      links: [
        { to: "/Patients", label: "Clients List" },
        { to: "/AdminFeedbackSender", label: "Send Feedback Forms" },
      ],
    },
    {
      key: "slots",
      label: "My Slots",
      links: [{ to: "/DoctorOwnSchedule", label: "Add Slots" }],
    },
    {
      key: "appointments",
      label: "My Appointments",
      links: [{ to: "/Appointments", label: "View Appointments" }],
    },
  ];

  const operatorMenus = [
    {
      key: "corporate",
      label: "Corporates",
      links: [
        { to: "/RegisterCorporate", label: "Register a Company" },
        { to: "/RechargeCredits", label: "Recharge Credits" },
      ],
    },
    {
      key: "utilities",
      label: "Utilities",
      links: [{ to: "/EmailPanel", label: "Send Email" }],
    },
    {
      key: "experts",
      label: "Experts",
      links: [
        { to: "/Doctors", label: "Experts List" },
        { to: "/DoctorSchedule", label: "Expert's Schedule" },
      ],
    },
    {
      key: "clients",
      label: "Clients",
      links: [
        { to: "/Patients", label: "Clients List" },
        { to: "/AdminFeedbackSender", label: "Send Feedback Forms" },
      ],
    },
  ];

  return (
    <nav className="nav-glass">
      <div className="nav-container">
        <Link to="/Home" className="brand">
          <img src={logo} alt="Logo" /> PsyCare
        </Link>

        <div className="nav-links">
          {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
            <>
              <Link to="/" className="nav-link">
                HOME
              </Link>
              {renderDropdown("about", "ABOUT US", [
                { to: "/About", label: "About PsyCare" },
                { to: "/About#team", label: "Our Team" },
                { to: "/Contactus", label: "Contact Us" },
                { to: "/FAQ", label: "FAQs" },
              ])}
              {renderDropdown("partners", "PARTNERS", [
                { to: "/DoctorLogin", label: "Experts" },
                { to: "/Login", label: "Admin" },
                { to: "/OperatorLogin", label: "Operator" },
              ])}
              {renderDropdown("services", "SERVICES", [
                { to: "/IndividualTherapy", label: "Individual Therapy" },
                { to: "/CorporateWellness", label: "Corporate Wellness" },
                { to: "/StartScreeningTest", label: "Assessment" },
              ])}
              {renderDropdown("resources", "RESOURCES", [
                { to: "/Articles", label: "Articles" },
                { to: "/ABC", label: "Blog" },
              ])}
              {renderDropdown("appointment", "BOOK APPOINTMENT", [
                { to: "/CorporateBooking", label: "Corporate Employee" },
                { to: "/marketplacemain", label: "Individual Patient" },
              ])}
            </>
          )}

          {isLoggedIn &&
            adminMenus.map((menu) =>
              renderDropdown(menu.key, menu.label, menu.links)
            )}
          {isDocLoggedIn &&
            doctorMenus.map((menu) =>
              renderDropdown(menu.key, menu.label, menu.links)
            )}
          {isOperatorLoggedIn &&
            operatorMenus.map((menu) =>
              renderDropdown(menu.key, menu.label, menu.links)
            )}

          {(isLoggedIn || isDocLoggedIn || isOperatorLoggedIn) && (
            <button onClick={onLogout} className="nav-link logout-btn">
              Logout
            </button>
          )}
        </div>

        <div
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {!isLoggedIn && !isDocLoggedIn && !isOperatorLoggedIn && (
            <>
              <Link to="/" className="mobile-link" onClick={closeMobileMenu}>
                HOME
              </Link>
              {renderMobileDropdown("about", "ABOUT US", [
                { to: "/About", label: "About PsyCare" },
                { to: "/About#team", label: "Our Team" },
                { to: "/Contactus", label: "Contact Us" },
                { to: "/FAQ", label: "FAQs" },
              ])}
              {renderMobileDropdown("partners", "PARTNERS", [
                { to: "/DoctorLogin", label: "Experts" },
                { to: "/Login", label: "Admin" },
                { to: "/OperatorLogin", label: "Operator" },
              ])}
              {renderMobileDropdown("services", "SERVICES", [
                { to: "/IndividualTherapy", label: "Individual Therapy" },
                { to: "/CorporateWellness", label: "Corporate Wellness" },
                { to: "/StartScreeningTest", label: "Assessment" },
              ])}
              {renderMobileDropdown("resources", "RESOURCES", [
                { to: "/Articles", label: "Articles" },
                { to: "/ABC", label: "Blog" },
              ])}
              {renderMobileDropdown("appointment", "BOOK APPOINTMENT", [
                { to: "/CorporateBooking", label: "Corporate Employee" },
                { to: "/marketplacemain", label: "Individual Patient" },
              ])}
            </>
          )}

          {isLoggedIn &&
            adminMenus.map((menu) =>
              renderMobileDropdown(menu.key, menu.label, menu.links)
            )}
          {isDocLoggedIn &&
            doctorMenus.map((menu) =>
              renderMobileDropdown(menu.key, menu.label, menu.links)
            )}
          {isOperatorLoggedIn &&
            operatorMenus.map((menu) =>
              renderMobileDropdown(menu.key, menu.label, menu.links)
            )}

          {(isLoggedIn || isDocLoggedIn || isOperatorLoggedIn) && (
            <button onClick={onLogout} className="mobile-link logout-btn">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;