import React from "react";
import image1 from "./image1.png";
import logo from "./logo.png";
import logoSaleNoti from "./logoSaleNoti.png";
import map from "./map.png";
import imageDoctor from "./doctor1.jpg";
import bannerImg from "./hero-bg.jpg";
import facebookIcon from "./facebook.png"
// import avatar from './avatar.jpg';

const Banner = () => {
  return <img src={image1} alt="banner" width="100%" height="800px" />;
};
export const Logo = () => {
  return <img src={logo} alt="logo" width="60px" height="60px" />;
};
export const LogoSaleNoti = () => {
  return <img src={logoSaleNoti} alt="logo" width="270" height="100px" />;
};
export const Map = () => {
  return <img src={map} alt="logo" width="100%" height="170px" />;
};
export const ImageDoctor = () => {
  return <img src={imageDoctor} alt="logo" width="100%" height="170px" />;
};
export const BannerImg = () => {
  return <img src={bannerImg} alt="banner" width="100%" height="auto" />;
};
export const FacebookIcon = () => {
  return <img src={facebookIcon} alt="facebookIcon" width="30px" height="30px" />;
};

export default Banner;
