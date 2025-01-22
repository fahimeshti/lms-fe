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

    return (
        <div>
            <MediaPlayer onContextMenu={handleContextMenu} title="Sprite Fight" src={src}>
                <MediaProvider />
                <PlyrLayout thumbnails={thumbnails} icons={plyrLayoutIcons} />
            </MediaPlayer>
        </div>
    );
}

export default CustomVideoPlayer;