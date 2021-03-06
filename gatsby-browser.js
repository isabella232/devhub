import dlv from 'dlv';
import { hasAnchorLink } from '~utils/has-anchor-link';
import { isNewPage } from '~utils/is-new-page';

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
    const prevLocation = dlv(prevRouterProps, ['location'], {});
    const newLocation = dlv(routerProps, ['location'], {});
    return isNewPage(prevLocation, newLocation) || hasAnchorLink(newLocation);
};
