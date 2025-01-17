const Skeleton = ({ className }: { className: string }) => {
    return (
        <div className={`h-32 w-full bg-gray-300 animate-pulse ${className}`}></div>
    );
}

export default Skeleton;