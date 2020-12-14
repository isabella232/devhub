import React from 'react';
import styled from '@emotion/styled';
import { H3 } from '../text';
import Button from '../button';
import { size } from '../theme';

const MAX_WIDTH = '600px';
const FORM_LINK = '/student-spotlight-form/';

const MaxWidthContainer = styled('div')`
    margin: 0 auto;
    max-width: ${MAX_WIDTH};
    text-align: center;
`;

const HeaderWithIncreasedMargin = styled(H3)`
    margin-bottom: ${size.medium};
`;

const ShareProjectCTA = () => (
    <MaxWidthContainer>
        <HeaderWithIncreasedMargin>
            Have an interesting MongoDB project to share? Let us know!
        </HeaderWithIncreasedMargin>
        <Button primary to={FORM_LINK}>
            Share something you're proud of
        </Button>
    </MaxWidthContainer>
);

export default ShareProjectCTA;
