import React from 'react';
import Fade from 'react-reveal/Fade';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  PinterestShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon
} from 'react-share';

import './ShareButtons.css';

const ShareButtons = () => {
  const title = `${document.title} | Advanced Dontpad`;
  const url = window.location.href;
  const iconSize = 48;

  return (
    <div className="ShareButtons">
      <TwitterShareButton url={url} title={title} className="share-button">
        <Fade up><TwitterIcon size={iconSize} round /></Fade>
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title} className="share-button">
        <Fade up><FacebookIcon size={iconSize} round /></Fade>
      </FacebookShareButton>
      <GooglePlusShareButton url={url} className="share-button">
        <Fade up><GooglePlusIcon size={iconSize} round /></Fade>
      </GooglePlusShareButton>
      <LinkedinShareButton url={url} title={title} className="share-button">
        <Fade up><LinkedinIcon size={iconSize} round /></Fade>
      </LinkedinShareButton>
      <PinterestShareButton url={url} media="/favicon.ico" className="share-button">
        <Fade up><PinterestIcon size={iconSize} round /></Fade>
      </PinterestShareButton>
      <TelegramShareButton url={url} title={title} className="share-button">
        <Fade up><TelegramIcon size={iconSize} round /></Fade>
      </TelegramShareButton>
    </div>
  );
};

export default ShareButtons;
