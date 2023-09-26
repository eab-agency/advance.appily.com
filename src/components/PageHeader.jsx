import React from 'react';
import styles from '@/styles/modules/PageHeader.module.scss';
import NavBar from '@/components/Header/NavBar';
import MainLogo from '@/components/Header/MainLogo'

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
