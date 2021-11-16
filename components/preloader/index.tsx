import React from 'react';

import styles from './preloader.module.css';

export interface IPreloader {}

const Preloader: React.FC<IPreloader> = () => {
    return (
        <div
            className={'w-screen h-screen grid place-items-center bg-blue-600'}>
            <div className={styles.dotFlashing} />
        </div>
    );
};

export default Preloader;
