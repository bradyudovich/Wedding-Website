import React from 'react';

const EXTERNAL_URL_PATTERN = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;
const UNSAFE_SCHEME_PATTERN = /^\s*(?:javascript|data|vbscript):/i;

const isExternalLink = (href = '') =>
  EXTERNAL_URL_PATTERN.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');

const sanitizeHref = (href = '') => {
  if (UNSAFE_SCHEME_PATTERN.test(href)) {
    return '#';
  }
  return href;
};

const WebsiteLink = ({ href, rel, target, ...props }) => {
  const safeHref = sanitizeHref(href);
  const external = isExternalLink(safeHref);

  return (
    <a
      href={safeHref}
      target={target ?? (external ? '_blank' : undefined)}
      rel={rel ?? (external ? 'noopener noreferrer' : undefined)}
      referrerPolicy={external ? 'no-referrer' : undefined}
      {...props}
    />
  );
};

export default WebsiteLink;
