import React from 'react';
import PropTypes from 'prop-types';
import DevHubLink from './dev-hub/link';
import { isPreviewMode } from '../utils/is-preview-mode';

/*
 * Note: This component is not suitable for internal page navigation:
 * https://www.gatsbyjs.org/docs/gatsby-link/#recommendations-for-programmatic-in-app-navigation
 */

// Since DOM elements <a> cannot receive activeClassName and partiallyActive,
// destructure the prop here and pass it only to GatsbyLink.
const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
    if (!to) to = '';
    // Assume that external links begin with http:// or https://
    const external = /^http(s)?:\/\//.test(to);
    const anchor = to.startsWith('#');

    // Use Gatsby Link for internal links, and <a> for others
    if (!isPreviewMode() && to && !external && !anchor) {
        if (!to.startsWith('/')) to = `/${to}`;
        return (
            <DevHubLink
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...other}
            >
                {children}
            </DevHubLink>
        );
    }
    return (
        <DevHubLink href={to} {...other}>
            {children}
        </DevHubLink>
    );
};

Link.propTypes = {
    to: PropTypes.string.isRequired,
};

export default Link;
