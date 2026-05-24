import React from 'react';

const EXTERNAL_URL_PATTERN = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;

const isExternalLink = (href = '') =>
  EXTERNAL_URL_PATTERN.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');

const WebsiteLink = ({ href, rel, target, ...props }) => {
  const external = isExternalLink(href);

  return (
    <a
      href={href}
      target={target ?? (external ? '_blank' : undefined)}
      rel={rel ?? (external ? 'noopener noreferrer' : undefined)}
      {...props}
    />
  );
};

export default WebsiteLink;
