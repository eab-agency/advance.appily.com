import MainLogo from '@/components/Header/MainLogo'
import NavBar from '@/components/Header/NavBar';
import styles from '@/styles/global/components/modules/PageHeader.module.scss';
import React from 'react';

export default function PageHeader({ pageType }) {
    return (
        <header>
            <div className={styles.container}>
                {pageType !== 'results' ? (
                    <div className={styles['page-header']}>
                        <MainLogo />
                    </div>
                ) : (
                    <div className={styles['page-header-results']}>
                        <MainLogo />
                        <NavBar />
                    </div>
                )}
            </div>
        </header>
    );
}
