import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';

const CustomVideoPlayer = ({
    src,
    thumbnails
}: {
    src: string;
    thumbnails?: string;
}) => {
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    // const handleVideoEnded = () => {
    //     console.log('Video ended!');
    // };

    return (
        <div>
            <MediaPlayer
                onContextMenu={handleContextMenu}
                src={src}
            // onEnded={handleVideoEnded}
            >
                <MediaProvider />
                <PlyrLayout controls={[
                    'play-large',
                    'play',
                    'progress',
                    'current-time',
                    // 'mute',
                    'volume',
                    // 'captions',
                    'settings',
                    // 'pip',
                    // 'airplay',
                    'fullscreen',
                ]} thumbnails={thumbnails} icons={plyrLayoutIcons} />
            </MediaPlayer>
        </div>
    );
}

export default CustomVideoPlayer;