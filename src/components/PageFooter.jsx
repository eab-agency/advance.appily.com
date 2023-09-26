/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import { MdHelpOutline, MdOutlinePrivacyTip } from 'react-icons/md';
import { Reoverlay } from 'reoverlay';
import styles from '@/styles/modules/PageFooter.module.scss';
import PrivacyModal from './PrivacyModal';
import HelpModal from './HelpModal';

export default function PageFooter() {
    const helpClick = () => {
        Reoverlay.showModal(HelpModal, {});
    };
    const privacyClick = () => {
        Reoverlay.showModal(PrivacyModal, {});
    };

    return (
        <footer className={styles['page-footer']}>
            <div className={styles.wrapper}>
                <figure className={styles.logo}>
                    <Image
                        src="/images/cappex-footer-logo.svg"
                        alt="Cappex Logo"
                        fill
                    />
                </figure>
                <div className="copyright">
                    <p>
                        © 2023 All rights reserved.{' '}
                        <a href="https://www.cappex.com">www.Cappex.com</a>
                    </p>
                </div>
                <div className="help-privacy">
                    <ul>
                        <li>
                            <button
                                type="button"
                                className={styles.helpPrivBtn}
                                onClick={helpClick}
                            >
                                <MdHelpOutline />
                                Help
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className={styles.helpPrivBtn}
                                onClick={privacyClick}
                            >
                                <MdOutlinePrivacyTip />
                                Privacy
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
