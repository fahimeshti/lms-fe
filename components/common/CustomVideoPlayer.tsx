import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import { toPlayerSrc } from '@/utils/video';

const CustomVideoPlayer = ({
    src,
    thumbnails
}: {
    src?: string | null;
    thumbnails?: string;
}) => {
    // YouTube link or direct video file URL.
    const playerSrc = toPlayerSrc(src);
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    // const handleVideoEnded = () => {
    //     console.log('Video ended!');
    // };

    if (!playerSrc) {
        return (
            <div className="flex aspect-video w-full items-center justify-center rounded-md bg-gray-100 text-gray-500">
                এই লেকচারের ভিডিও এখনো যোগ করা হয়নি
            </div>
        );
    }

    return (
        <div>
            <MediaPlayer
                onContextMenu={handleContextMenu}
                src={playerSrc}
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