import React from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';
import Button from './button';
import PLACEHOLDER_IMAGE from '../../images/mock-video-placeholder.png';

const ReactPlayerWrapper = styled('div')`
    position: relative;
    /*
    https://github.com/CookPete/react-player#responsive-player
    Set ratio to 1280x720
    */
    padding-top: 56.25%;
`;

const StyledReactPlayer = styled(ReactPlayer)`
    position: absolute;
    top: 0;
    left: 0;
    > div {
        /* Redefines stacking context, allowing play button animation to stick on top */
        position: sticky;
    }
`;

const VideoEmbed = ({ nodeData: { argument, name }, ...props }) => {
    const videoId = argument[0].value;
    const isYoutube = name === 'youtube';
    // TODO: handle other directives (twitch) once format decided
    const value = isYoutube
        ? `https://www.youtube.com/watch?v=${videoId}`
        : null;
    return (
        <ReactPlayerWrapper>
            <StyledReactPlayer
                config={{
                    youtube: {
                        playerVars: {
                            autohide: 1,
                            modestbranding: 1,
                            rel: 0,
                        },
                    },
                }}
                controls
                // If is youtube, use the default youtube thumbnail
                light={isYoutube ? true : PLACEHOLDER_IMAGE}
                playIcon={<Button play />}
                playing
                url={value}
                width="100%"
                height="100%"
                {...props}
            />
        </ReactPlayerWrapper>
    );
};

export default VideoEmbed;