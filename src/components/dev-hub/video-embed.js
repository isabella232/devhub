import React from 'react';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player/lazy';
import Button from './button';
import { size } from './theme';
import PLACEHOLDER_IMAGE from '../../images/mock-video-placeholder.png';

const ReactPlayerWrapper = styled('div')`
    margin-bottom: ${size.articleContent};
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

const getVideoUrl = (provider, videoId) => {
    if (!videoId) return null;
    switch (provider) {
        case 'twitch':
            return `https://www.twitch.tv/videos/${videoId}`;
        case 'youtube':
            return `https://www.youtube.com/watch?v=${videoId}`;
        default:
            return null;
    }
};

const VideoEmbed = ({
    autoplay,
    nodeData: { argument, name: provider },
    thumbnail,
    ...props
}) => {
    const videoId = argument[0].value;
    const value = getVideoUrl(provider, videoId);
    const isYoutube = provider === 'youtube';
    const previewImage = thumbnail || isYoutube || PLACEHOLDER_IMAGE;

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
                    twitch: {
                        options: {
                            autoplay,
                            video: videoId,
                        },
                    },
                }}
                controls
                // If is youtube, use the default youtube thumbnail
                light={previewImage}
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
